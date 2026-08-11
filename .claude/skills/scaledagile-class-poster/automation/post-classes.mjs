#!/usr/bin/env node
/**
 * Batch-create Agile36 classes on the SAFe partner portal.
 *
 *   node post-classes.mjs --csv classes.csv [--dry-run] [--limit N] [--login]
 *
 * Auth: uses a persistent Chromium profile at ./.profile, so you log in ONCE.
 *   node post-classes.mjs --login      → opens the portal, you sign in, press Enter
 * After that the session cookie persists and runs are unattended.
 *
 * Idempotent: reads the existing My Courses grid first and skips any class
 * whose (course name, start date) is already there. Safe to re-run after a
 * partial failure — it will not double-post.
 *
 * Every class needs BOTH stages: create the course, then attach an instructor.
 * A course with no instructor never reaches the training calendar, so the
 * script treats a missing instructor as a failure, not a warning.
 */
import { chromium } from "playwright";
import { readInstructors } from "./lib-instructors.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import readline from "node:readline";

const here = dirname(fileURLToPath(import.meta.url));
const PROFILE = join(here, ".profile");
const PORTAL = "https://community.scaledagile.com/s/course-admin";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const DRY = flag("dry-run");
const LIMIT = Number(opt("limit", Infinity));
const CSV = resolve(here, opt("csv", "classes.csv"));

// ---------------------------------------------------------------- CSV
function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift().map((h) => h.trim());
  return rows
    .filter((r) => r.some((v) => v.trim()))
    .map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? "").trim()])));
}

const usDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${+m}/${+d}/${y}`;
};

/** Normalise any date to YYYY-MM-DD for comparison.
 *  `new Date("2026-09-12")` is parsed as UTC midnight and shifts a day back in
 *  US timezones, while `new Date("Sep 12, 2026")` is parsed as local — so the
 *  two sides must never be compared via Date objects. */
const dayKey = (v) => {
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  if (isNaN(d)) return s.toLowerCase();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

// ------------------------------------------------------------- helpers
const log = (...a) => console.log(...a);

async function dismissCssError(page) {
  // Salesforce throws a transient "Sorry to interrupt / CSS Error" modal.
  const cancel = page.getByRole("button", { name: /cancel and close/i });
  if (await cancel.count()) await cancel.first().click().catch(() => {});
}

/** Existing (name, startDate) pairs already in the portal grid. */
async function readExisting(page) {
  await page.goto(PORTAL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(6000);
  await dismissCssError(page);
  const scrape = () =>
    page.evaluate(() => {
      const out = [];
      const walk = (root) => {
        root.querySelectorAll('[role="row"]').forEach((r) => {
          const cells = [...r.querySelectorAll('[role="gridcell"],[role="rowheader"]')]
            .map((c) => c.innerText.trim().replace(/\s+/g, " "));
          // Columns: Name | Learning Plan | Start Date | City | Attendees | Instructors
          if (cells.length >= 3) {
            const link = r.querySelector('a[href*="/s/ilt-course/"]');
            out.push({
              name: cells[0],
              date: cells[2],
              instructors: Number(cells[5] ?? 0) || 0,
              href: link ? link.href : null,
            });
          }
        });
        root.querySelectorAll("*").forEach((el) => el.shadowRoot && walk(el.shadowRoot));
      };
      walk(document);
      return out;
    });

  // The Lightning datatable renders well after DOMContentLoaded and its timing
  // varies a lot, so poll instead of sleeping a fixed amount.
  let rows = [];
  for (let i = 0; i < 15; i++) {
    await dismissCssError(page);
    rows = await scrape();
    if (rows.length) break;
    await page.waitForTimeout(4000);
  }

  // Try to widen to 100 rows — the default 25 can hide classes that already
  // exist and cause a re-run to post them twice. Keep whichever read is
  // bigger, since re-rendering the grid sometimes returns nothing mid-flight.
  const widened = await page.evaluate(() => {
    const sels = [];
    const walk = (root) => {
      root.querySelectorAll("select").forEach((s) => sels.push(s));
      root.querySelectorAll("*").forEach((el) => el.shadowRoot && walk(el.shadowRoot));
    };
    walk(document);
    const sel = sels.find((s) => [...s.options].some((o) => o.value === "100"));
    if (!sel) return false;
    sel.value = "100";
    sel.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  });
  if (widened) {
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(2500);
      const more = await scrape();
      if (more.length > rows.length) rows = more;
      if (rows.length > 25) break;
    }
  }
  return rows;
}

/** Open Add New → Remote Public Course. The menu closes on stray focus, so
 *  click both in one go and verify the dialog actually opened. */
async function openCreateDialog(page) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    await page.getByRole("button", { name: "Add New" }).click();
    await page.waitForTimeout(600);
    const item = page.getByText("Remote Public Course", { exact: true });
    if (await item.count()) {
      await item.first().click();
      const dialog = page.getByRole("dialog");
      try {
        await dialog.waitFor({ state: "visible", timeout: 8000 });
        return dialog;
      } catch { /* fall through and retry */ }
    }
    await page.waitForTimeout(1000);
  }
  throw new Error("could not open the Create Remote Public Course dialog");
}

/** Lightning comboboxes are button + listbox, not <select>. */
async function pickCombo(dialog, label, optionText) {
  const combo = dialog.getByRole("combobox", { name: label });
  await combo.click();
  await dialog.page().waitForTimeout(400);
  await dialog
    .page()
    .getByRole("option", { name: optionText, exact: false })
    .first()
    .click();
  await dialog.page().waitForTimeout(400);
}

async function createClass(page, c) {
  const dialog = await openCreateDialog(page);

  await dialog.locator("select").first().selectOption({ label: c.learning_plan });
  await dialog.getByRole("textbox", { name: "ILT Course Name" }).fill(c.class_name);
  await dialog.getByRole("textbox", { name: "Start Date" }).fill(usDate(c.start));
  await dialog.getByRole("textbox", { name: "End Date" }).fill(usDate(c.end));
  await dialog.getByRole("combobox", { name: "Start Time" }).fill(c.start_time);

  await pickCombo(dialog, "Timezone", c.timezone);
  await pickCombo(dialog, "Language", "English");

  // City must be filled before the State picklist renders.
  await dialog.getByRole("textbox", { name: "City" }).fill(c.city);
  await page.waitForTimeout(800);
  await pickCombo(dialog, "State", c.state);

  await dialog.getByRole("textbox", { name: "Registration URL" }).fill(c.registration_url);

  // Timezone silently reverts if focus moved too fast — verify before saving.
  const tz = await dialog.getByRole("combobox", { name: "Timezone" }).innerText();
  if (!/Eastern Daylight Time - New York/i.test(tz)) {
    await pickCombo(dialog, "Timezone", c.timezone);
  }

  if (DRY) {
    log("      [dry-run] filled, not saving");
    await dialog.getByRole("button", { name: "Close" }).click().catch(() => {});
    return null;
  }

  await dialog.getByRole("button", { name: /Save & View Remote Public Course/i }).click();
  await page.waitForURL(/\/s\/ilt-course\//, { timeout: 30000 });
  await page.waitForTimeout(2500);
  return page.url();
}

/** Read back what the portal actually stored. A listing that saved with the
 *  wrong registration URL sends buyers to the wrong course page — that has
 *  happened before, so verify rather than trust the form. */
async function verifySaved(page, c) {
  const text = await page.locator("body").innerText();
  const problems = [];
  if (!text.includes(c.registration_url)) {
    problems.push(`registration URL not stored as ${c.registration_url}`);
  }
  if (!text.includes(usDate(c.start))) problems.push(`start date not ${usDate(c.start)}`);
  if (!text.includes(usDate(c.end))) problems.push(`end date not ${usDate(c.end)}`);
  if (!/Eastern Daylight Time - New York/i.test(text)) {
    problems.push("timezone is not the New York bucket");
  }
  if (!text.includes(c.class_name)) problems.push("class name mismatch");
  if (problems.length) throw new Error("saved wrong: " + problems.join("; "));
}

/** Who may teach what. Martina Svoboda is only approved for Product
 *  Owner/Product Manager and Leading SAFe; the other three teach anything. */
const ROTATION = ["Deadra Stevenson", "Marcus Ball", "Joe Puoci", "Martina Svoboda"];
const RESTRICTED = { "Martina Svoboda": [/product owner/i, /leading safe/i] };

function eligibleTrainers(className, preferred) {
  const ok = (t) => {
    const limits = RESTRICTED[t];
    return !limits || limits.some((re) => re.test(className));
  };
  // Preferred first, then the rest of the rotation as fallbacks.
  return [preferred, ...ROTATION.filter((t) => t !== preferred)].filter(ok);
}

/** Attach one instructor. Tries the assigned trainer, then falls back through
 *  the rotation only if that trainer genuinely cannot be found — a UI blip
 *  retries the same person rather than silently swapping who teaches. */
/** Trainers currently listed on the open class (Instructors table rows carry
 *  an email; the page header does not). */
async function attachedTrainers(page) {
  return readInstructors(page);
}

async function addInstructor(page, className, preferred) {
  const candidates = eligibleTrainers(className, preferred);
  let lastErr;

  for (const name of candidates) {
    // Never stack a second instructor onto a class. A verification misfire
    // once made the fallback ADD Marcus on top of Deadra instead of replacing
    // her — if someone valid is already attached, we are done.
    const already = await attachedTrainers(page).catch(() => []);
    if (already.length) return already[0];
    try {
      await openInstructorDialog(page);
      const search = page.getByPlaceholder("Search").last();
      await search.click();
      await search.fill("");
      // Lightning enables Search off real input events, so type, don't fill.
      await search.pressSequentially(name.split(" ")[0], { delay: 60 });
      const btn = page.getByRole("button", { name: "Search", exact: true });
      await btn.waitFor({ state: "visible", timeout: 10000 });
      for (let i = 0; i < 20 && !(await btn.isEnabled()); i++) {
        await page.waitForTimeout(500);
      }
      await btn.click();

      // Match the full name's row — "Martina" also returns Elvira Martina.
      const row = page.getByRole("row").filter({ hasText: name });
      await row.first().waitFor({ timeout: 20000 });
      await row.first().getByRole("button", { name: "Add" }).click();
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Cancel" }).first().click().catch(() => {});
      await page.waitForTimeout(1500);

      // Confirm by reading the table, not by the warning banner — the banner
      // can lag and previously caused a good add to look like a failure.
      const now = await attachedTrainers(page);
      const surname = name.split(" ").slice(-1)[0];
      if (!now.some((n) => n.includes(surname))) {
        throw new Error(`not attached (table shows: ${now.join(", ") || "none"})`);
      }
      if (name !== preferred) {
        log(`      NOTE: ${preferred} unavailable — assigned ${name} instead`);
      }
      return name;
    } catch (err) {
      lastErr = err;
      await page.getByRole("button", { name: "Cancel" }).first().click().catch(() => {});
      await page.waitForTimeout(1000);
    }
  }
  throw new Error(
    `no instructor could be attached (tried ${candidates.join(", ")}): ${lastErr?.message}`
  );
}

async function openInstructorDialog(page) {
  const trigger = page.getByRole("button", { name: /^\+?\s*Instructor$/i });
  await trigger.first().click({ timeout: 20000 });
  await page.waitForTimeout(1500);
  if ((await trigger.count()) > 1) {
    await trigger.last().click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.getByPlaceholder("Search").last().waitFor({ timeout: 15000 });
}

// ---------------------------------------------------------------- main
const classes = parseCsv(readFileSync(CSV, "utf8"));
log(`${classes.length} classes in ${CSV}${DRY ? "  (DRY RUN)" : ""}\n`);

// Chromium hands off to an already-running instance on the same profile and
// then exits, which looks like "nothing happened". Catch it with a clear message.
if (existsSync(join(PROFILE, "SingletonLock"))) {
  log("A browser is already open on this profile, so a new run cannot start.");
  log("Close that window (or: pkill -f 'automation/.profile') and try again.\n");
  process.exit(1);
}

const ctx = await chromium.launchPersistentContext(PROFILE, {
  headless: false,
  viewport: { width: 1500, height: 950 },
  args: ["--disable-blink-features=AutomationControlled"],
});
const page = ctx.pages()[0] ?? (await ctx.newPage());

if (flag("login")) {
  await page.goto(PORTAL);
  log("Sign in in the browser window that just opened.");
  log("Waiting for the Course Administration page (up to 10 minutes)...\n");
  // Poll rather than waiting on stdin, so this can run unattended in the
  // background while Deadra signs in.
  const deadline = Date.now() + 10 * 60 * 1000;
  let ok = false;
  while (Date.now() < deadline) {
    await page.waitForTimeout(5000);
    if (/community\.scaledagile\.com\/s\/course-admin/.test(page.url())) {
      const grid = await page.getByText("Calendar Listings Available").count().catch(() => 0);
      if (grid) { ok = true; break; }
    }
  }
  // Close cleanly so Chromium flushes cookies to disk AND releases the profile
  // lock. A browser left open on this profile makes every later run hand off
  // to it ("Opening in existing browser session") and die with no output.
  await page.waitForTimeout(2000);
  await ctx.close();
  log(ok ? "\nLogin saved. Ready to post." : "\nTimed out — did not reach Course Administration.");
  process.exit(ok ? 0 : 1);
}

const existing = await readExisting(page);
if (!existing.length) {
  log("Could not read the course grid — you are probably logged out.");
  log("Run:  node post-classes.mjs --login\n");
  await ctx.close();
  process.exit(1);
}
log(`portal shows ${existing.length} existing classes\n`);

const byKey = new Map(
  existing.map((e) => [`${e.name.trim().toLowerCase()}|${dayKey(e.date)}`, e])
);
const seen = new Set(byKey.keys());

const results = [];
let n = 0;
for (const c of classes) {
  if (n >= LIMIT) break;
  const key = `${c.class_name.trim().toLowerCase()}|${dayKey(c.start)}`;
  const label = `${c.start}  ${c.class_name}`;
  if (seen.has(key)) {
    const row = byKey.get(key);
    // A class created without an instructor consumes a listing but never
    // reaches the training calendar. Repair those instead of skipping them
    // forever — otherwise a mid-run failure leaves them invisible.
    if (row && row.instructors === 0 && row.href && !DRY) {
      log(`REPAIR ${label}  (exists, no instructor)`);
      try {
        await page.goto(row.href, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(4000);
        const used = await addInstructor(page, c.class_name, c.trainer);
        log(`      instructor added: ${used}`);
        results.push({ ...c, status: "repaired", trainer_used: used });
      } catch (err) {
        log(`      REPAIR FAILED: ${err.message}`);
        results.push({ ...c, status: "failed", error: err.message });
      }
      await page.goto(PORTAL, { waitUntil: "domcontentloaded" }).catch(() => {});
      await page.waitForTimeout(4000);
      continue;
    }
    log(`SKIP   ${label}  (already in portal)`);
    results.push({ ...c, status: "skipped" });
    continue;
  }
  n++;
  try {
    log(`[${n}] ${label}`);
    const url = await createClass(page, c);
    let used = c.trainer;
    if (!DRY) {
      await verifySaved(page, c);
      used = await addInstructor(page, c.class_name, c.trainer);
      log(`      created + ${used} + link verified`);
    }
    results.push({ ...c, status: DRY ? "dry-run" : "created", url, trainer_used: used });
    seen.add(key);
  } catch (err) {
    log(`      FAILED: ${err.message}`);
    results.push({ ...c, status: "failed", error: err.message });
    // Get back to a known state before the next class.
    await page.goto(PORTAL, { waitUntil: "domcontentloaded" }).catch(() => {});
    await page.waitForTimeout(4000);
  }
}

writeFileSync(join(here, "results.json"), JSON.stringify(results, null, 2));
const by = (s) => results.filter((r) => r.status === s).length;
log(
  `\ncreated ${by("created")} | repaired ${by("repaired")} | skipped ${by("skipped")} | failed ${by("failed")}`
);
const swapped = results.filter((r) => r.trainer_used && r.trainer_used !== r.trainer);
if (swapped.length) {
  log("trainer substitutions:");
  for (const r of swapped) log(`  ${r.start} ${r.class_name}: ${r.trainer} → ${r.trainer_used}`);
}
if (by("failed")) log("failures are listed in results.json — re-run to retry them");
await ctx.close();
