#!/usr/bin/env node
/**
 * portal-state.json → listings.json (the shape diff-classes.mjs expects)
 *
 * The portal is the authority on what exists; the public Training Finder lags
 * and has shown a different start date for the same class. Feeding the diff
 * from the portal instead of the Finder is what stops duplicate posts.
 *
 *   node portal-to-listings.mjs --portal ../automation/portal-state.json --out listings.json
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, "..", "config.json"), "utf8"));

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};

const listings = JSON.parse(readFileSync(opt("portal"), "utf8")).listings;
const slugByClassName = Object.fromEntries(
  Object.entries(config.portal.courseMap).map(([slug, m]) => [m.className.trim().toLowerCase(), slug])
);

const out = [];
for (const l of listings) {
  // Private classes are invisible to the partner calendar and must not be
  // treated as "already listed".
  if (/Private/i.test(l.type || "")) continue;
  const slug = slugByClassName[l.name.trim().toLowerCase()];
  if (!slug) continue;
  out.push({
    course: config.courses[slug].safeName,
    start: l.date,
    end: l.endDate ?? l.date,
    tz: "America/New_York",
    tzLabel: "GMT–04:00 Eastern Daylight Time - New York",
    reg: config.courses[slug].regUrl,
  });
}

writeFileSync(opt("out", "listings.json"), JSON.stringify(out, null, 2));
console.log(`wrote ${out.length} public listings → ${opt("out", "listings.json")}`);
