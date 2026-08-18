#!/usr/bin/env node
/**
 * Remove ONE instructor from a class. Classes are never deleted at Agile36 —
 * this only ever touches the Instructors table.
 *
 *   node remove-instructor.mjs [--dry-run]
 *
 * Edit REMOVALS below. Each entry is (class name, date, trainer to remove).
 * Refuses to act if it would leave the class with no instructor at all, since
 * a class with none is invisible on the training calendar.
 */
import { chromium } from "playwright";
import { readInstructors } from "./lib-instructors.mjs";

const DRY = process.argv.includes("--dry-run");
const PORTAL = "https://community.scaledagile.com/s/course-admin";

// A verification misfire made the fallback add a second instructor on top of
// the first. Drop the surplus one and leave the originally-assigned trainer.
const REMOVALS = [
  {
    name: "SAFe for Teams 6.0-Guaranteed to Run",
    date: "Sep 26, 2026",
    remove: "Marcus Ball",
  },
  {
    name: "Advanced Scrum Master-Guaranteed to Run",
    date: "Sep 28, 2026",
    remove: "Marcus Ball",
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

async function instructorRows(page) {
  return readInstructors(page);
}

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: false,
  viewport: { width: 1500, height: 950 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());

for (const r of REMOVALS) {
  const label = `${r.date}  ${r.name}  −${r.remove}`;
  try {
    await loadGrid(page);
    const row = page.getByRole("row").filter({ hasText: r.name }).filter({ hasText: r.date });
    if ((await row.count()) !== 1) throw new Error(`expected exactly 1 matching class row`);
    await row.first().getByRole("link").first().click();
    await page.waitForURL(/ilt-course/, { timeout: 30000 });
    await page.waitForTimeout(5000);

    const before = await instructorRows(page);
    const surname = r.remove.split(" ").slice(-1)[0];
    if (!before.some((n) => n.includes(surname))) {
      log(`SKIP  ${label}  (not on this class — already removed?)`);
      continue;
    }
    if (before.length <= 1) {
      log(`REFUSE ${label}  (would leave the class with no instructor)`);
      continue;
    }
    if (DRY) {
      log(`[dry-run] ${label}   (currently: ${before.join(", ")})`);
      continue;
    }

    // The Instructors table's last column is a delete (trash) control.
    const target = page.getByRole("row").filter({ hasText: surname }).filter({ hasText: "@" });
    await target.first().getByRole("button").last().click();
    await page.waitForTimeout(2500);
    // Some orgs show a confirm step.
    const confirm = page.getByRole("button", { name: /^(delete|remove|confirm|yes)$/i });
    if (await confirm.count()) await confirm.first().click().catch(() => {});
    await page.waitForTimeout(3000);

    const after = await instructorRows(page);
    if (after.some((n) => n.includes(surname))) throw new Error("still listed after delete");
    if (!after.length) throw new Error("class now has NO instructor — investigate immediately");
    log(`REMOVED ${label}   (remaining: ${after.join(", ")})`);
  } catch (err) {
    log(`FAIL  ${label}\n      ${err.message}`);
  }
}

log("\nonly instructors were touched — no class was cancelled or deleted");
await ctx.close();
