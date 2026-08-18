#!/usr/bin/env node
/**
 * Where Agile36 could stand alone on the Eastern calendar.
 *
 *   node find-gaps.mjs --competition competition.json \
 *                      --portal ../automation/portal-state.json \
 *                      --from 2026-10-01 --to 2026-10-31
 *
 * A "gap" is a date where Supabase has the cohort, we are not listed, and few
 * or no other partners are running that course in the Eastern/New York bucket.
 * Eastern only: a class in another timezone is not competing for the same seat,
 * and counting worldwide roughly triples the apparent competition.
 *
 * Run this before assembling the CSV so the batch targets the quiet dates.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, "..", "config.json"), "utf8"));
const policy = config.postingPolicy;

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const from = opt("from", new Date().toISOString().slice(0, 10));
const to = opt("to", "9999-12-31");

const competition = opt("competition")
  ? JSON.parse(readFileSync(opt("competition"), "utf8")).data
  : {};
const portal = opt("portal") ? JSON.parse(readFileSync(opt("portal"), "utf8")).listings : [];

const res = await fetch(config.agile36ScheduleApi);
const rows = (await res.json()).data ?? [];
const day = (s) => (s || "").slice(0, 10);

// Dates already closed: a registrant on any class, or an explicit blackout.
const closed = new Set(policy.blackoutDates ?? []);
for (const r of rows) {
  if ((r.total_registrants ?? 0) <= 0) continue;
  for (
    let d = new Date(day(r.start_date) + "T00:00:00Z");
    d <= new Date(day(r.end_date || r.start_date) + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + 1)
  ) {
    closed.add(d.toISOString().slice(0, 10));
  }
}

// What we already have listed, and how full each day is.
const slugByClassName = Object.fromEntries(
  Object.entries(config.portal.courseMap).map(([slug, m]) => [m.className.trim().toLowerCase(), slug])
);
const listed = new Set();
const perDay = new Map();
for (const l of portal) {
  if (/Private/i.test(l.type || "")) continue; // private classes do not count
  perDay.set(l.date, (perDay.get(l.date) || 0) + 1);
  const slug = slugByClassName[l.name.trim().toLowerCase()];
  if (slug) listed.add(`${l.date}|${slug}`);
}

const excluded = new Set(policy.courseTiers.excluded ?? []);
const gaps = [];
for (const r of rows) {
  const slug = r.course_slug;
  const meta = config.courses[slug];
  if (!meta || excluded.has(slug)) continue;
  const d = day(r.start_date);
  if (d < from || d > to) continue;
  if (r.status !== "active" || r.hidden) continue;
  if (closed.has(d)) continue;
  if (listed.has(`${d}|${slug}`)) continue;
  if ((perDay.get(d) || 0) >= policy.maxClassesPerDay) continue;

  const c = competition[`${d}|${meta.safeName}`];
  gaps.push({
    date: d,
    endDate: day(r.end_date),
    slug,
    course: meta.safeName,
    // No entry means we have no data for that date, NOT that nobody is
    // running it. Treating unknown as zero makes every out-of-window date
    // look uncontested and quietly skews the whole plan.
    known: Boolean(c),
    eastern: c ? c.eastern : null,
    worldwide: c ? c.all : null,
    price: r.price,
    dayUsed: perDay.get(d) || 0,
  });
}

const unknown = gaps.filter((g) => !g.known);
if (unknown.length) {
  const dates = [...new Set(unknown.map((g) => g.date))].sort();
  console.log(
    `WARNING: no competition data for ${dates.length} date(s) (${dates[0]} … ${dates[dates.length - 1]}).`
  );
  console.log("Re-run scripts/fetch-competition.browser.js with FROM/TO covering this window.\n");
}
gaps.sort(
  (a, b) =>
    Number(!a.known) - Number(!b.known) ||
    (a.eastern ?? 99) - (b.eastern ?? 99) ||
    b.price - a.price ||
    a.date.localeCompare(b.date)
);

const owner = config.actualRevenue?.byCourse ?? {};
console.log(`Window ${from} → ${to}`);
console.log(`Open slots found: ${gaps.length}\n`);
console.log("=== best opportunities (fewest Eastern rivals, highest value first) ===");
console.log("  ESTrivals  world  price   day  course                                date");
for (const g of gaps.slice(0, 30)) {
  console.log(
    `  ${String(g.known ? g.eastern : "?").padStart(9)}  ${String(g.known ? g.worldwide : "?").padStart(5)}  $${String(g.price).padStart(5)}  ${g.dayUsed}/4  ${g.course.padEnd(36)} ${g.date} → ${g.endDate}`
  );
}

const clean = gaps.filter((g) => g.known && g.eastern === 0);
console.log(
  `\n${clean.length} of ${gaps.filter((g) => g.known).length} slots WITH DATA have zero Eastern competition — Agile36 would be the only listing.`
);
const byCourse = {};
for (const g of clean) byCourse[g.course] = (byCourse[g.course] || 0) + 1;
for (const [c, n] of Object.entries(byCourse).sort((a, b) => b[1] - a[1])) {
  const o = Object.entries(config.courses).find(([, m]) => m.safeName === c)?.[0];
  const rev = owner[o] ? ` — earns $${owner[o].revenue} / ${owner[o].orders} orders` : "";
  console.log(`  ${String(n).padStart(3)} uncontested dates  ${c}${rev}`);
}
