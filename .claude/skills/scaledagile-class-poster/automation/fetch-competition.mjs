#!/usr/bin/env node
/**
 * Fetch every partner's listings from the Training Finder → competition.json
 *
 *   node fetch-competition.mjs --from 2026-10-01 --to 2026-10-31
 *
 * The API sits behind a bot checkpoint, so curl gets nothing — but a real
 * browser works, and no login is needed (the Training Finder is public). This
 * is the Playwright version of scripts/fetch-competition.browser.js so a cron
 * run can refresh the data without anyone opening a tab.
 *
 * Counts EXCLUDE Agile36 and are split Eastern vs worldwide. Score on Eastern:
 * a class in another timezone is not competing for the same seat.
 */
import { chromium } from "playwright";
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, "..", "config.json"), "utf8"));

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const FROM = opt("from", new Date().toISOString().slice(0, 10));
const TO = opt("to", "2027-12-31");
const OUT = opt("out", join(here, "..", "competition.json"));

const OURS = Object.values(config.courses).map((c) => c.safeName);

// No profile: this is public data, and a clean context avoids fighting the
// posting profile's singleton lock.
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("https://training.scaledagile.com", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);

const data = await page.evaluate(
  async ({ FROM, TO, OURS }) => {
    const ours = new Set(OURS);
    const agg = {};
    let total = 0;
    for (let p = 1; p <= 40; p++) {
      const r = await fetch(`/api/search?sort=default&page=${p}&limit=100`);
      if (!r.ok) break;
      const j = await r.json();
      const res = j.results || [];
      total += res.length;
      for (const c of res) {
        if (!ours.has(c.courseType)) continue;
        if (!(c.startDate >= FROM && c.startDate <= TO)) continue;
        if ((c.partnerName || "").toLowerCase().includes("agile36")) continue;
        const k = `${c.startDate}|${c.courseType}`;
        agg[k] = agg[k] || { all: 0, eastern: 0 };
        agg[k].all++;
        if (c.standardizedTimezone === "America/New_York") agg[k].eastern++;
      }
      if (res.length < 100) break;
    }
    return { agg, total };
  },
  { FROM, TO, OURS }
);

await browser.close();

if (!data.total) {
  console.error("fetched 0 listings — the Training Finder may have changed or blocked us");
  process.exit(1);
}

writeFileSync(
  OUT,
  JSON.stringify(
    {
      source: "training.scaledagile.com /api/search",
      window: `${FROM}..${TO}`,
      fetchedListings: data.total,
      note: "Counts EXCLUDE Agile36. A missing key means NO DATA, not zero rivals.",
      data: data.agg,
    },
    null,
    2
  )
);

const keys = Object.keys(data.agg);
const eastern = keys.filter((k) => data.agg[k].eastern > 0).length;
console.log(`scanned ${data.total} listings → ${OUT}`);
console.log(`${keys.length} course/date combinations in ${FROM}..${TO}; ${eastern} have Eastern rivals`);
