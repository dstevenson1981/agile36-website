#!/usr/bin/env node
/**
 * Change the date of existing portal classes.
 *
 * Classes are NEVER cancelled or deleted at Agile36 — moving the date is the
 * only remedy for a listing that is surplus, mis-dated, or on an over-booked
 * day. This script exists so that rule is easy to follow.
 *
 *   node move-classes.mjs [--dry-run]
 *
 * Edit MOVES below. Each entry finds the row by (name, from) in the My Courses
 * grid, opens it, edits Basic Info, and rewrites the start/end dates.
 * Only move a class to a date where Supabase actually has that cohort.
 */
import { chromium } from "playwright";

const DRY = process.argv.includes("--dry-run");
const PORTAL = "https://community.scaledagile.com/s/course-admin";

// Sept 12-13 is Agile Product Management only. The four classes stacked onto
// it move to dates that have room and a matching Supabase cohort.
const MOVES = [
  {
    name: "Product Owner/Product Manager 6.0 - Guaranteed to Run",
    from: "Sep 12, 2026",
    start: "9/17/2026",
    end: "9/18/2026",
  },
  {
    name: "Scrum Master- Guaranteed to Run",
    from: "Sep 12, 2026",
    start: "9/17/2026",
    end: "9/18/2026",
  },
  {
    name: "Lean Portfolio Management-Guaranteed to Run",
    from: "Sep 12, 2026",
    start: "9/19/2026",
    end: "9/20/2026",
  },
  {
    name: "Advanced Scrum Master-Guaranteed to Run",
    from: "Sep 12, 2026",
    start: "9/19/2026",
    end: "9/20/2026",
  },
];

const log = (...a) => console.log(...a);

async function loadGrid(page) {
  await page.goto(PORTAL, { waitUntil: "domcontentloaded" });
  for (let i = 0; i < 15; i++) {
    const c = page.getByRole("button", { name: /cancel and close/i });
    if (await c.count()) await c.first().click().catch(() => {});
    if ((await page.getByRole("row").count()) > 3) return;
    await page.waitForTimeout(4000);
  }
  throw new Error("course grid never rendered");
}

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: false,
  viewport: { width: 1500, height: 950 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());

log(`${MOVES.length} classes to move${DRY ? "  (DRY RUN)" : ""}\n`);
const results = [];

for (const m of MOVES) {
  const label = `${m.name}  ${m.from} → ${m.start}`;
  try {
    await loadGrid(page);
    const row = page
      .getByRole("row")
      .filter({ hasText: m.name })
      .filter({ hasText: m.from });
    const count = await row.count();
    if (count === 0) {
      log(`SKIP  ${label}  (not found — already moved?)`);
      results.push({ ...m, status: "not-found" });
      continue;
    }
    if (count > 1) throw new Error(`${count} rows match — too ambiguous to edit safely`);

    await row.first().getByRole("link").first().click();
    await page.waitForURL(/\/s\/ilt-course\//, { timeout: 30000 });
    await page.waitForTimeout(5000);

    await page.getByRole("button", { name: /Basic Info/i }).first().click();
    await page.waitForTimeout(4000);

    const startField = page.getByRole("textbox", { name: "Start Date" });
    const endField = page.getByRole("textbox", { name: "End Date" });
    await startField.waitFor({ timeout: 15000 });

    if (DRY) {
      log(`[dry-run] ${label}  (current ${await startField.inputValue()})`);
      results.push({ ...m, status: "dry-run" });
      continue;
    }

    await startField.fill(m.start);
    await endField.fill(m.end);
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /^Save/i }).first().click();
    await page.waitForTimeout(6000);

    // Confirm the portal actually stored the new date.
    const body = await page.locator("body").innerText();
    const want = m.start.replace(/\b0/g, "");
    if (!body.includes(want) && !body.includes(m.start)) {
      throw new Error(`saved but new start date ${m.start} not visible on the page`);
    }
    log(`MOVED ${label}`);
    results.push({ ...m, status: "moved" });
  } catch (err) {
    log(`FAIL  ${label}\n      ${err.message}`);
    results.push({ ...m, status: "failed", error: err.message });
  }
}

const n = (s) => results.filter((r) => r.status === s).length;
log(`\nmoved ${n("moved")} | not-found ${n("not-found")} | failed ${n("failed")}`);
log("nothing was cancelled or deleted — dates only");
await ctx.close();
