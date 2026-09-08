#!/usr/bin/env node
/**
 * Flip existing portal listings from Remote Public Course to Remote Private
 * Course, so they come off the public Training Finder.
 *
 *   node privatize-classes.mjs --dry-run          # list what would change
 *   node privatize-classes.mjs --limit 1          # prove it on one class first
 *   node privatize-classes.mjs                    # the whole batch
 *   node privatize-classes.mjs --after 2026-11-18 # cutoff (exclusive)
 *
 * This is NOT cancelling. RULES.md is absolute that a class is never cancelled
 * or deleted — the Actions menu's "Cancel Course" is never touched here. Making
 * a class private leaves the class intact and reversible; it only removes it
 * from the public calendar and frees its calendar listing.
 *
 * "Change Type" does NOT commit anything. It swaps the form and drops you into
 * "Edit Remote Private Course" with a required field the public record type
 * does not have — Remote Attendees Company — sitting empty. The type is only
 * written when THAT form is saved. A first version of this script checked the
 * class type right after clicking Change Type, saw it still Public, and
 * reported failure on a class that was mid-edit.
 *
 * So one flow, not two steps:
 *   Show menu → Change Course Type → Remote Private Course → Change Type
 *   → Remote Attendees Company = "Agile36, LLC" → Save
 *
 * Per PORTAL-NOTES.md, this script's own verification is not trusted as the
 * only check — run audit-private.mjs afterwards for an independent pass.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const AFTER = opt("after", "2026-11-18");
const LIMIT = Number(opt("limit", "0")) || Infinity;
const COMPANY = "Agile36, LLC";
const PRIVATE_TYPE = "Remote Private Course";

const listings = JSON.parse(readFileSync("portal-state.json", "utf8")).listings ?? [];
const inWindow = listings
  .filter((l) => l.href && l.date > AFTER)
  .filter((l) => l.type !== PRIVATE_TYPE && l.type !== "Private Course")
  .sort((a, b) => a.date.localeCompare(b.date));

// The portal refuses the save outright: "Course type cannot change once
// attendee(s) have been added." A class that has sold a seat stays public,
// which matches how Deadra works anyway — a date with a registrant is the
// class she is running. These are reported, never attempted.
const locked = inWindow.filter((l) => l.attendees > 0);
// --only re-runs a single class after a failure, without walking the batch
// again just to skip 40 classes that are already done. Matches on href, or on
// any substring of "<date> <name>".
const ONLY = opt("only", "");
const targets = inWindow
  .filter((l) => !l.attendees)
  .filter((l) => !ONLY || l.href === ONLY || `${l.date} ${l.name}`.includes(ONLY))
  .slice(0, LIMIT);

const log = (s) => console.log(s);
log(`${inWindow.length} listings after ${AFTER}${DRY ? "  (DRY RUN)" : ""}`);
log(`  ${targets.length} to privatize | ${locked.length} locked by registrants`);
log(`type → "${PRIVATE_TYPE}"   remote attendees company → "${COMPANY}"\n`);

if (locked.length) {
  log("LOCKED — has attendees, portal will not change the type:");
  for (const l of locked) log(`  ${l.date}  ${String(l.name).slice(0, 46)}  (${l.attendees})`);
  log("");
}

if (DRY) {
  for (const t of targets) log(`  ${t.date}  ${String(t.name).slice(0, 50)}`);
  process.exit(0);
}

/** Wait until the detail page has actually rendered its record body. */
async function settle(page) {
  for (let i = 0; i < 25; i++) {
    const t = await page.locator("body").innerText().catch(() => "");
    if (/Provider Name/i.test(t)) return t;
    await page.waitForTimeout(2000);
  }
  throw new Error("detail page never rendered");
}

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: true,
  viewport: { width: 1500, height: 1000 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());
const results = [];

for (const t of targets) {
  const label = `${t.date}  ${String(t.name).slice(0, 44)}`;
  try {
    await page.goto(t.href, { waitUntil: "domcontentloaded" });
    let body = await settle(page);

    if (new RegExp(`Type\\s*\\n?\\s*${PRIVATE_TYPE}`).test(body)) {
      log(`SKIP  ${label}  (already private)`);
      results.push({ ...t, status: "already-private" });
      continue;
    }

    // --- step 1: change the record type -----------------------------------
    await page.getByRole("button", { name: /show menu/i }).first().click({ timeout: 20000 });
    await page.waitForTimeout(1500);
    await page
      .getByRole("menuitem", { name: /Change Course Type/i })
      .first()
      .click({ timeout: 20000 });
    await page.waitForTimeout(3500);

    const dlg = page.getByRole("dialog").first();
    // The radios carry Salesforce record-type ids as their values and have no
    // accessible name, so pick by the label text sitting next to them. Confirm
    // the radio actually took — the Change Type button stays disabled until a
    // type other than the current one is selected.
    await dlg.getByText(new RegExp(`^${PRIVATE_TYPE}$`)).first().click({ timeout: 15000 });
    await page.waitForTimeout(1000);
    const changeBtn = dlg.getByRole("button", { name: /^Change Type$/i }).first();
    if (!(await changeBtn.isEnabled().catch(() => false)))
      throw new Error("Remote Private Course radio did not select");
    await changeBtn.click({ timeout: 15000 });

    // --- the edit form the type change opens -------------------------------
    // Wait for the private form specifically. Its heading is the only reliable
    // signal that the swap happened — the detail page behind it still reads
    // "Remote Public Course" until this form is saved.
    const edit = page.getByRole("dialog").first();
    let opened = false;
    for (let i = 0; i < 12; i++) {
      await page.waitForTimeout(2000);
      const t = await edit.innerText().catch(() => "");
      if (/Edit Remote Private Course|Remote Private Course Information/i.test(t)) {
        opened = true;
        break;
      }
    }
    if (!opened) throw new Error("Change Type did not open the private course form");

    // Required on the private record type, empty after the swap. It is a plain
    // text field, not a Salesforce lookup — the "Agile36, LLC / Manage
    // Addresses…" dropdown that appears when you type into it by hand is
    // Chrome's autofill, which does not exist here. So just write the value.
    const company = page.locator('[name="Remote_Attendees_Company__c"]').first();
    await company.waitFor({ timeout: 20000 });
    if (!((await company.inputValue().catch(() => "")) || "").trim()) {
      await company.fill(COMPANY);
      await page.waitForTimeout(800);
      const got = (await company.inputValue().catch(() => "")) || "";
      if (got.trim() !== COMPANY) throw new Error(`company field reads "${got}"`);
    }

    // The Save button sits in the form footer, outside the dialog's own a11y
    // subtree — scoping this to the dialog finds nothing.
    await page.getByRole("button", { name: /^Save$/i }).first().click({ timeout: 15000 });

    // The detail page does not repaint itself after this save — it keeps
    // showing the old type until the page is reloaded (Deadra: "once you make
    // the changes and save it you will have to refresh the screen"). Reading
    // the live DOM here would report failure on every class that did save.
    await page.waitForTimeout(6000);
    let after = "";
    for (let i = 0; i < 4; i++) {
      await page.reload({ waitUntil: "domcontentloaded" });
      after = await settle(page);
      if (new RegExp(`Type\\s*\\n?\\s*${PRIVATE_TYPE}`).test(after)) break;
      await page.waitForTimeout(3000);
    }
    if (!new RegExp(`Type\\s*\\n?\\s*${PRIVATE_TYPE}`).test(after))
      throw new Error("saved but type is still not Remote Private Course after reload");

    log(`OK    ${label}`);
    results.push({ ...t, status: "privatized" });
  } catch (err) {
    log(`FAIL  ${label}\n      ${err.message.split("\n")[0]}`);
    results.push({ ...t, status: "failed", error: err.message.split("\n")[0] });
  }
}

const n = (s) => results.filter((r) => r.status === s).length;
log(
  `\nprivatized ${n("privatized")} | already private ${n("already-private")} | failed ${n("failed")}`
);
log("nothing was cancelled or deleted — course type only");
writeFileSync("privatize-results.json", JSON.stringify(results, null, 2));
await ctx.close();
