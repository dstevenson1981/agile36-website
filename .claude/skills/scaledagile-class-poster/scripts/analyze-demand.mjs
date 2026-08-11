#!/usr/bin/env node
/**
 * What actually sells — from Supabase, not from assumptions.
 *
 *   node analyze-demand.mjs [--json demand.json]
 *
 * Supabase carries every course on every date, so cohort COUNT means nothing.
 * The only signals that matter are `total_registrants` (a class that is really
 * running) and registrants x price (what it earns). Run this BEFORE building a
 * posting plan so the batch is weighted toward what converts.
 *
 * Never infer revenue from how often a course appears on the calendar — that
 * is a delivery-rhythm decision. Ask Deadra for actuals when in doubt; the
 * last set she gave is stored in config.json under actualRevenue.
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

const res = await fetch(config.agile36ScheduleApi);
if (!res.ok) throw new Error(`schedule API returned ${res.status}`);
const rows = (await res.json()).data ?? [];

const today = new Date().toISOString().slice(0, 10);
const day = (s) => (s || "").slice(0, 10);
const upcoming = rows.filter((r) => r.status === "active" && day(r.start_date) >= today);

// --- per course: cohorts offered vs cohorts actually selling
const byCourse = {};
for (const r of upcoming) {
  const slug = r.course_slug;
  const b = (byCourse[slug] ??= {
    slug,
    name: config.courses[slug]?.safeName ?? slug,
    isSafe: Boolean(config.courses[slug]),
    cohorts: 0,
    running: 0,
    registrants: 0,
    revenue: 0,
    seats: 0,
    price: r.price ?? 0,
  });
  b.cohorts++;
  b.seats += r.total_seats ?? 0;
  const reg = r.total_registrants ?? 0;
  if (reg > 0) {
    b.running++;
    b.registrants += reg;
    b.revenue += reg * (r.price ?? 0);
  }
}

// --- the individual cohorts that are really running
const running = upcoming
  .filter((r) => (r.total_registrants ?? 0) > 0)
  .map((r) => ({
    date: day(r.start_date),
    endDate: day(r.end_date),
    course: config.courses[r.course_slug]?.safeName ?? r.course_slug,
    slug: r.course_slug,
    instructor: r.instructor_name,
    registrants: r.total_registrants,
    seats: r.total_seats,
    price: r.price,
    revenue: (r.total_registrants ?? 0) * (r.price ?? 0),
    isSafe: Boolean(config.courses[r.course_slug]),
  }))
  .sort((a, b) => a.date.localeCompare(b.date));

const ranked = Object.values(byCourse)
  .filter((b) => b.isSafe)
  .sort((a, b) => b.revenue - a.revenue || b.registrants - a.registrants);

const owner = config.actualRevenue?.byCourse ?? {};

console.log(`Upcoming cohorts in Supabase: ${upcoming.length}`);
console.log(`Actually running (>=1 registrant): ${running.length}`);
console.log(
  `Booked revenue in the pipeline: $${running.reduce((a, r) => a + r.revenue, 0).toLocaleString()}\n`
);

console.log("=== SAFe courses: offered vs selling ===");
console.log("  cohorts  running  regs  pipeline$   owner-reported$  course");
for (const b of ranked) {
  const o = owner[b.slug];
  console.log(
    `  ${String(b.cohorts).padStart(7)}  ${String(b.running).padStart(7)}  ${String(
      b.registrants
    ).padStart(4)}  ${("$" + b.revenue).padStart(9)}   ${(o ? "$" + o.revenue + " / " + o.orders + " ord" : "—").padStart(15)}  ${b.name}`
  );
}

if (running.length) {
  console.log("\n=== cohorts actually running (these dates are CLOSED to anything else) ===");
  for (const r of running) {
    console.log(
      `  ${r.date} → ${r.endDate}  ${String(r.registrants)}/${r.seats}  $${r.revenue.toLocaleString().padStart(6)}  ${r.course} (${r.instructor})${r.isSafe ? "" : "  [non-SAFe]"}`
    );
  }
}

const dead = ranked.filter((b) => b.running === 0);
if (dead.length) {
  console.log(
    `\nNo enrolments at all: ${dead.map((b) => b.name).join(", ")}`
  );
  console.log("  (weight the batch away from these unless Deadra says otherwise)");
}

const outPath = opt("json");
if (outPath) {
  writeFileSync(outPath, JSON.stringify({ ranked, running, generated: today }, null, 2));
  console.log(`\nwrote ${outPath}`);
}
