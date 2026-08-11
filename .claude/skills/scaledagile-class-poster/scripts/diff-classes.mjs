#!/usr/bin/env node
/**
 * Diff Agile36's live course schedule against what is already posted on the
 * Scaled Agile Training Finder, and print the classes that need posting.
 *
 * Usage:
 *   node diff-classes.mjs --listings <path-to-listings.json> [--days 60]
 *
 * <path-to-listings.json> is the output of fetch-listings.browser.js
 * (run in a browser tab on training.scaledagile.com — see SKILL.md).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, "..", "config.json"), "utf8"));

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const listingsPath = getArg("listings");
const horizonDays = Number(getArg("days", config.postHorizonDays));
if (!listingsPath) {
  console.error("Missing --listings <path>. Run fetch-listings.browser.js first (see SKILL.md).");
  process.exit(1);
}

const listings = JSON.parse(readFileSync(listingsPath, "utf8"));

const res = await fetch(config.agile36ScheduleApi);
if (!res.ok) throw new Error(`agile36 schedule API returned ${res.status}`);
const site = (await res.json()).data ?? [];

const today = new Date();
today.setUTCHours(0, 0, 0, 0);
const horizon = new Date(today.getTime() + horizonDays * 24 * 60 * 60 * 1000);
const day = (iso) => (iso || "").slice(0, 10);

// Normalize course names so "SAFe Lean Portfolio Management" and
// "Lean Portfolio Management" compare equal.
const norm = (s) =>
  (s || "").toLowerCase().replace(/^safe\s+/, "").replace(/[^a-z0-9]+/g, " ").trim();

const listedKeys = new Set(listings.map((l) => `${norm(l.course)}|${l.start}`));

const cohorts = site.filter((r) => {
  if (r.status !== "active" || r.hidden) return false;
  if (!config.courses[r.course_slug]) return false; // SAFe courses only
  const d = new Date(day(r.start_date) + "T00:00:00Z");
  return d >= today && d <= horizon;
});

const toPost = [];
for (const c of cohorts) {
  const meta = config.courses[c.course_slug];
  const key = `${norm(meta.safeName)}|${day(c.start_date)}`;
  if (listedKeys.has(key)) continue;
  toPost.push({
    course: meta.safeName,
    start: day(c.start_date),
    end: day(c.end_date),
    startTime: c.start_time,
    endTime: c.end_time,
    timezone: c.timezone,
    portalTimezoneLabel: config.timezonePortalLabels[c.timezone] || c.timezone,
    instructor: c.instructor_name,
    language: c.language || "English",
    price: c.price,
    currency: c.currency || "USD",
    seats: c.total_seats,
    registrants: c.total_registrants ?? 0,
    registrationUrl: meta.regUrl,
  });
}

// Cohorts that already have people enrolled. Supabase lists every course on
// every date (run-what-fills catalog), so registrants are what separate a
// real, committed class from a speculative catalog row. A date carrying a
// committed class is deliberately light — it is NOT a scheduling gap — and
// its instructor is spoken for that day.
const committed = site
  .filter((r) => (r.total_registrants ?? 0) > 0 && day(r.start_date) >= day(today.toISOString()))
  .map((r) => ({
    date: day(r.start_date),
    endDate: day(r.end_date),
    course: config.courses[r.course_slug]?.safeName ?? r.course_slug,
    courseSlug: r.course_slug,
    instructor: r.instructor_name,
    registrants: r.total_registrants,
    seats: r.total_seats,
    onSafeCalendar: listedKeys.has(
      `${norm(config.courses[r.course_slug]?.safeName ?? "")}|${day(r.start_date)}`
    ),
  }))
  .sort((a, b) => a.date.localeCompare(b.date));
toPost.sort((a, b) => a.start.localeCompare(b.start));

// Listings with no matching site cohort (stale or date-mismatched).
const siteKeys = new Set(
  cohorts.map((c) => `${norm(config.courses[c.course_slug].safeName)}|${day(c.start_date)}`)
);
const allSiteKeys = new Set(
  site
    .filter((r) => config.courses[r.course_slug])
    .map((r) => `${norm(config.courses[r.course_slug].safeName)}|${day(r.start_date)}`)
);
const stale = listings.filter((l) => !allSiteKeys.has(`${norm(l.course)}|${l.start}`));

// Listings whose registration URL doesn't match the configured one.
const regByName = Object.fromEntries(
  Object.values(config.courses).map((m) => [norm(m.safeName), m.regUrl])
);
const badUrl = listings.filter((l) => {
  const expected = regByName[norm(l.course)];
  return expected && l.reg && l.reg.replace(/\/$/, "") !== expected.replace(/\/$/, "");
});

// Listings stuck in the plain "Eastern Standard Time" bucket buyers can't filter on.
const badTz = listings.filter(
  (l) => /eastern standard time$/i.test((l.tzLabel || "").trim())
);

const report = {
  horizonDays,
  siteCohortsInHorizon: cohorts.length,
  alreadyListed: cohorts.length - toPost.length,
  toPost,
  committed,
  // Our courses already live on the partner calendar. A date carrying one of
  // these is covered for that course — downstream must not call it a gap.
  alreadyListed: listings
    .filter((l) => Object.values(config.courses).some((m) => norm(m.safeName) === norm(l.course)))
    .map((l) => ({ date: l.start, course: l.course }))
    .sort((a, b) => a.date.localeCompare(b.date)),
  warnings: {
    staleListings: stale,
    wrongRegistrationUrl: badUrl,
    plainEasternTimezone: badTz,
  },
};
console.log(JSON.stringify(report, null, 2));
