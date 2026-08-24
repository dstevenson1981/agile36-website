#!/usr/bin/env node
/**
 * Set timezone and city on existing portal listings.
 *
 *   node retime-classes.mjs --dry-run     # report only, changes nothing
 *   node retime-classes.mjs               # apply
 *   node retime-classes.mjs --from 2026-09-01
 *
 * Deadra changed both on 2026-08-19: timezone is plain "Eastern Standard Time"
 * (the "…- New York" option does not work for her), and every class is listed
 * under Miami, Atlanta, or Los Angeles — never New York. This walks the
 * upcoming public listings and rewrites those two fields.
 *
 * Nothing is cancelled, no dates move, no instructor changes. Two fields only.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const FROM = opt("from", new Date().toISOString().slice(0, 10));

const PORTAL = "https://community.scaledagile.com/s/course-admin";
const config = JSON.parse(readFileSync("../config.json", "utf8"));
const TZ = config.timezonePortalLabels["America/New_York"];
const CITIES = config.postingPolicy.cities;

const listings = (JSON.parse(readFileSync("portal-state.json", "utf8")).listings ?? [])
  .filter((l) => l.date >= FROM && !/Private/i.test(l.type ?? ""))
  .sort((a, b) => a.date.localeCompare(b.date));

// Rotate cities by position so the calendar does not read as one city.
const targets = listings.map((l, i) => ({ ...l, city: CITIES[i % CITIES.length] }));

const log = (s) => console.log(s);
log(`${targets.length} listings from ${FROM}${DRY ? "  (DRY RUN)" : ""}`);
log(`timezone → "${TZ}"   cities → ${CITIES.join(", ")}\n`);

if (DRY) {
  for (const t of targets) log(`  ${t.date}  ${String(t.name).slice(0, 42).padEnd(42)}  → ${t.city}`);
  log(`\n${targets.length} would be updated. Nothing changed.`);
  process.exit(0);
}

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: false,
  viewport: { width: 1500, height: 950 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());

const loadGrid = async () => {
  await page.goto(PORTAL, { waitUntil: "domcontentloaded" });
  for (let i = 0; i < 12; i++) {
    const c = page.getByRole("button", { name: /cancel and close/i });
    if (await c.count()) await c.first().click().catch(() => {});
    if ((await page.getByRole("row").count()) > 3) return;
    await page.waitForTimeout(3000);
  }
};

/** Portal grid prints dates as "Sep 12, 2026". */
const gridDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const results = [];
for (const t of targets) {
  const label = `${t.date}  ${String(t.name).slice(0, 40)}  → ${t.city}`;
  try {
    await loadGrid();
    const row = page
      .getByRole("row")
      .filter({ hasText: t.name })
      .filter({ hasText: gridDate(t.date) });
    const n = await row.count();
    if (n === 0) {
      log(`SKIP  ${label}  (row not found)`);
      results.push({ ...t, status: "not-found" });
      continue;
    }
    if (n > 1) throw new Error(`${n} rows match — too ambiguous to edit safely`);

    await row.first().getByRole("link").first().click();
    await page.waitForURL(/\/s\/ilt-course\//, { timeout: 30000 });
    await page.waitForTimeout(4000);
    await page.getByRole("button", { name: /Basic Info/i }).first().click();
    await page.waitForTimeout(3500);

    // Timezone is a custom combobox: a button that opens a listbox, not a
    // <select>. Clicking the option by name is the only reliable path.
    const tzBtn = page.getByRole("button", { name: /Time Zone|Timezone/i }).first();
    if (await tzBtn.count()) {
      await tzBtn.click();
      await page.waitForTimeout(800);
      // The portal writes "GMT−05:00 Eastern Standard Time" with a Unicode minus
      // (U+2212), so an exact string match silently finds nothing.
      const tzPattern = new RegExp(
        TZ.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[-\u2212]/g, "[-\u2212]"),
        "i"
      );
      await page.getByRole("option", { name: tzPattern }).first().click();
      await page.waitForTimeout(500);
    }

    const cityField = page.getByRole("textbox", { name: /^City$/i }).first();
    if (await cityField.count()) await cityField.fill(t.city);

    await page.getByRole("button", { name: /^Save/i }).first().click();
    await page.waitForTimeout(5000);

    const body = await page.locator("body").innerText();
    if (!body.includes(t.city)) throw new Error(`saved but city ${t.city} not visible`);
    log(`OK    ${label}`);
    results.push({ ...t, status: "updated" });
  } catch (err) {
    log(`FAIL  ${label}\n      ${err.message}`);
    results.push({ ...t, status: "failed", error: err.message });
  }
}

const count = (s) => results.filter((r) => r.status === s).length;
log(`\nupdated ${count("updated")} | not-found ${count("not-found")} | failed ${count("failed")}`);
writeFileSync("retime-results.json", JSON.stringify(results, null, 2));
await ctx.close();
