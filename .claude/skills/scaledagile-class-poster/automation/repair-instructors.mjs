#!/usr/bin/env node
/**
 * Attach an instructor to every class that has none.
 *
 * A class with no instructor consumes a calendar listing but never appears on
 * Scaled Agile's training calendar — it is invisible to buyers. Any class
 * created by a run that died at the instructor step ends up in this state.
 *
 *   node repair-instructors.mjs [--dry-run]
 *
 * Respects the same trainer rules as the planner:
 *   - Lean Portfolio Management: Deadra Stevenson or Joe Puoci only
 *   - Martina Svoboda: Product Owner/Manager and Leading SAFe only
 *   - nobody teaches two classes on the same date
 */
import { chromium } from "playwright";
import { readInstructors } from "./lib-instructors.mjs";
import { readFileSync } from "node:fs";

const DRY = process.argv.includes("--dry-run");
const PORTAL = "https://community.scaledagile.com/s/course-admin";
const config = JSON.parse(readFileSync("../config.json", "utf8"));
const T = config.postingPolicy.trainers;
const ALL = [...T.rotation, ...Object.keys(T.restricted)];

/** Which trainers may teach the course this class name refers to. */
function eligible(className) {
  const name = className.toLowerCase();
  // Course whitelists win over everything.
  for (const [slug, allowed] of Object.entries(T.courseRestrictions ?? {})) {
    const words = slug.split("-").filter((w) => w.length > 3);
    if (words.every((w) => name.includes(w))) return allowed;
  }
  // Otherwise the rotation, plus any restricted trainer approved for it.
  const extra = Object.entries(T.restricted)
    .filter(([, r]) =>
      r.courses.some((slug) => {
        const words = slug.split("-").filter((w) => w.length > 3);
        return words.every((w) => name.includes(w));
      })
    )
    .map(([n]) => n);
  return [...T.rotation, ...extra];
}

const log = (...a) => console.log(...a);

async function loadGrid(page) {
  await page.goto(PORTAL, { waitUntil: "domcontentloaded" });
  for (let i = 0; i < 15; i++) {
    const c = page.getByRole("button", { name: /cancel and close/i });
    if (await c.count()) await c.first().click().catch(() => {});
    const rows = await page.evaluate(() => {
      const out = [];
      const walk = (r) => {
        r.querySelectorAll('[role="row"]').forEach((x) => {
          const c = [...x.querySelectorAll('[role="gridcell"],[role="rowheader"]')].map((v) =>
            v.innerText.trim().replace(/\s+/g, " ")
          );
          if (c.length >= 6) out.push({ name: c[0], date: c[2], inst: Number(c[5]) || 0 });
        });
        r.querySelectorAll("*").forEach((e) => e.shadowRoot && walk(e.shadowRoot));
      };
      walk(document);
      return out;
    });
    if (rows.length) return rows;
    await page.waitForTimeout(4000);
  }
  throw new Error("course grid never rendered");
}

async function openClass(page, name, date) {
  await loadGrid(page);
  const row = page.getByRole("row").filter({ hasText: name }).filter({ hasText: date });
  if ((await row.count()) !== 1) throw new Error(`expected 1 row for ${name} ${date}`);
  await row.first().getByRole("link").first().click();
  await page.waitForURL(/\/s\/ilt-course\//, { timeout: 30000 });
  await page.waitForTimeout(5000);
}

/** Instructor names already attached to the class on screen.
 *  Scoped to the Instructors table — the page header shows the logged-in
 *  user's name ("Deadra Stevenson"), which would otherwise mark her busy on
 *  every single date and make her unassignable. */
async function currentInstructors(page) {
  return readInstructors(page);
}

async function attach(page, name) {
  const trigger = page.getByRole("button", { name: /^\+?\s*Instructor$/i });
  await trigger.first().click({ timeout: 20000 });
  await page.waitForTimeout(1500);
  if ((await trigger.count()) > 1) await trigger.last().click().catch(() => {});
  await page.waitForTimeout(1500);

  const search = page.getByPlaceholder("Search").last();
  await search.click();
  await search.fill("");
  // Search by SURNAME. First names differ between our records and theirs
  // (we say "Joe Puoci"; the directory may hold "Joseph"), and a surname is
  // more distinctive anyway.
  const surname = name.split(" ").slice(-1)[0];
  await search.pressSequentially(surname, { delay: 60 });
  const btn = page.getByRole("button", { name: "Search", exact: true });
  await btn.waitFor({ state: "visible", timeout: 10000 });
  for (let i = 0; i < 20 && !(await btn.isEnabled()); i++) await page.waitForTimeout(500);
  await btn.click();

  // Match on surname too, so "Joe" vs "Joseph" doesn't miss the row.
  const row = page.getByRole("row").filter({ hasText: surname });
  await row.first().waitFor({ timeout: 25000 });
  await row.first().getByRole("button", { name: "Add" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Cancel" }).first().click().catch(() => {});
  await page.waitForTimeout(1500);
  if (await page.getByText(/1 instructor is required/i).count()) {
    throw new Error("warning still present after add");
  }
}

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: false,
  viewport: { width: 1500, height: 950 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());

const grid = await loadGrid(page);
const broken = grid.filter((r) => r.inst === 0 && /2026/.test(r.date));
log(`${grid.length} classes on the portal | ${broken.length} with no instructor\n`);

// A trainer is occupied for EVERY day their class spans, not just its start
// date. The grid only carries a start date, so expand it by the course's
// duration. Matching `r.date === b.date` instead — which is what this did —
// left a 10/14-10/16 class looking free on 10/15, and would have put Deadra on
// Agile Product Management 10/14-10/16 while she already had Lean Portfolio
// 10/15-10/16.
const DURATIONS = config.postingPolicy.courseDurationDays ?? {};
function spanOf(className, startDate) {
  const slugs = Object.keys(DURATIONS).filter((k) => k !== "default" && k !== "_note");
  const name = String(className).toLowerCase();
  const slug = slugs.find((s) =>
    s.split("-").filter((w) => w.length > 3).every((w) => name.includes(w))
  );
  const len = DURATIONS[slug] ?? DURATIONS.default ?? 2;
  const out = [];
  const d = new Date(`${startDate}T00:00:00`);
  if (isNaN(d)) return [String(startDate)];
  for (let i = 0; i < len; i++) {
    out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return out;
}
const overlaps = (a, b) => a.some((d) => b.includes(d));

// Who is already committed across each affected span, so nobody is double-booked.
const busy = new Map(); // trainer -> Set of occupied days
for (const r of grid) {
  const rSpan = spanOf(r.name, r.date);
  if (r.inst > 0 && broken.some((b) => overlaps(rSpan, spanOf(b.name, b.date)))) {
    try {
      await openClass(page, r.name, r.date);
      const names = await currentInstructors(page);
      for (const n of names) {
        if (!busy.has(n)) busy.set(n, new Set());
        rSpan.forEach((d) => busy.get(n).add(d));
      }
      log(`  ${r.date} (${rSpan.join(", ")})  ${r.name} → ${names.join(", ") || "(unreadable)"}`);
    } catch {
      /* if we cannot read it, fall through — the clash check just gets weaker */
    }
  }
}

log("");
const results = [];
for (const b of broken) {
  const bSpan = spanOf(b.name, b.date);
  const pool = eligible(b.name).filter(
    (n) => !bSpan.some((d) => busy.get(n)?.has(d))
  );
  const label = `${b.date}  ${b.name}`;
  if (!pool.length) {
    log(`SKIP  ${label}  (no eligible trainer free across ${bSpan.join(", ")})`);
    results.push({ ...b, status: "no-trainer" });
    continue;
  }
  const pick = pool[0];
  if (DRY) {
    log(`[dry-run] ${label} → ${pick}   (eligible: ${eligible(b.name).join(", ")})`);
    results.push({ ...b, status: "dry-run", trainer: pick });
    continue;
  }
  try {
    await openClass(page, b.name, b.date);
    await attach(page, pick);
    // Confirm it actually landed — the add can report success and not stick.
    // Verify by surname: the directory may spell the first name differently
    // than our records ("Joseph Puoci" vs our "Joe Puoci").
    const surname = pick.split(" ").slice(-1)[0];
    const after = await currentInstructors(page);
    if (!after.some((n) => n.includes(surname))) {
      throw new Error(`${pick} did not persist on the class (found: ${after.join(", ") || "none"})`);
    }
    if (!after.includes(pick)) log(`      (portal lists them as "${after.find((n) => n.includes(surname))}")`);
    // Book them across the whole span, so a second broken class that overlaps
    // this one cannot be handed the same trainer.
    if (!busy.has(pick)) busy.set(pick, new Set());
    bSpan.forEach((d) => busy.get(pick).add(d));
    log(`FIXED ${label} → ${pick}   (booked ${bSpan.join(", ")})`);
    results.push({ ...b, status: "fixed", trainer: pick });
  } catch (err) {
    log(`FAIL  ${label}\n      ${err.message}`);
    results.push({ ...b, status: "failed", error: err.message });
  }
}

const n = (s) => results.filter((r) => r.status === s).length;
log(`\nfixed ${n("fixed")} | failed ${n("failed")} | no-trainer ${n("no-trainer")}`);
await ctx.close();
