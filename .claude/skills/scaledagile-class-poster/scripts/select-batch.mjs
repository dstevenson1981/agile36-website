#!/usr/bin/env node
/**
 * Pick the subset of `toPost` classes that should actually go on the partner
 * calendar, per the posting policy in config.json.
 *
 * Supabase lists every course on every date (run-what-fills catalog), so the
 * raw diff is far denser than a public calendar can credibly show. The policy:
 *   - anchors (LPM, POPM, Scrum Master) run on every cohort day
 *   - one floater (Leading SAFe / Advanced Scrum Master) rotates into the 4th
 *     slot, so no day exceeds maxClassesPerDay
 *   - Agile Product Management runs twice a month
 *   - excluded courses (DevOps) never post
 *   - trainers rotate, nobody is double-booked on a date, and restricted
 *     trainers only take their permitted courses
 *
 * Usage:
 *   node select-batch.mjs --diff <diff.json> [--from 2026-09-01] [--to 2026-09-30]
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, "..", "config.json"), "utf8"));
const policy = config.postingPolicy;
const tiers = policy.courseTiers;

const args = process.argv.slice(2);
const getArg = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const diffPath = getArg("diff");
if (!diffPath) {
  console.error("Missing --diff <path to diff-classes.mjs output>");
  process.exit(1);
}
const from = getArg("from", "0000-00-00");
const to = getArg("to", "9999-99-99");

// Optional: output of fetch-competition.browser.js. When present, the
// floater and twice-a-month slots are steered onto the dates where the
// fewest other partners are running the same course.
const competitionPath = getArg("competition");
const competition = competitionPath
  ? JSON.parse(readFileSync(competitionPath, "utf8")).data
  : null;
// Agile36 sells into the Eastern / New York bucket, and that is what buyers
// filter on — a class in another timezone is not competing for the same seat.
// So score on Eastern listings only; `all` is kept for reporting.
const scope = policy.competitionScope || "eastern";
const rivals = (date, course) => {
  if (!competition) return 0;
  const c = competition[`${date}|${course}`];
  if (!c) return 0;
  return scope === "all" ? c.all : c.eastern;
};

// safeName -> slug, so policy tiers (keyed by slug) can match diff rows.
const slugOf = Object.fromEntries(
  Object.entries(config.courses).map(([slug, m]) => [m.safeName, slug])
);

const diff = JSON.parse(readFileSync(diffPath, "utf8"));
const all = diff.toPost.filter(
  (c) => c.start >= from && c.start <= to && !tiers.excluded.includes(slugOf[c.course])
);

// Cohorts with people already enrolled. Their dates are deliberately light —
// a real class is running — so they are never "gaps", and their instructor is
// unavailable for anything else that day.
// Courses already live on the calendar, keyed date|slug — already covered.
const norm = (s) =>
  (s || "").toLowerCase().replace(/^safe\s+/, "").replace(/[^a-z0-9]+/g, " ").trim();
const listedAlready = new Set(
  (diff.alreadyListed ?? []).map((l) => {
    const slug = Object.entries(config.courses).find(
      ([, m]) => norm(m.safeName) === norm(l.course)
    )?.[0];
    return `${l.date}|${slug}`;
  })
);

// Once ANY class has a registrant, that whole day belongs to it: Deadra runs
// the class that is selling and schedules nothing else against it. So the date
// is removed from consideration entirely — not merely that instructor. Covers
// every day the class spans, and any course with registrants, SAFe or not.
const committed = diff.committed ?? [];
const blockedDates = new Set();
for (const c of committed) {
  const end = new Date(`${c.endDate ?? c.date}T00:00:00Z`);
  for (
    let d = new Date(`${c.date}T00:00:00Z`);
    d <= end;
    d.setUTCDate(d.getUTCDate() + 1)
  ) {
    blockedDates.add(d.toISOString().slice(0, 10));
  }
}
// Dates Deadra has explicitly told us to keep clear.
for (const d of policy.blackoutDates ?? []) blockedDates.add(d);

// What is ALREADY on the partner calendar (automation/dump-portal.mjs).
// The per-day cap counts these too — Agile36 has four trainers, so four
// listings on a date is the ceiling no matter who put them there.
// Competition data must actually cover the planning window. A missing entry
// reads as "no rivals", so a stale file silently makes every date look
// uncontested and skews the whole plan. Refuse rather than plan on air.
if (competition) {
  const days = Object.keys(competition).map((k) => k.split("|")[0]).sort();
  const covered = days.filter((d) => d >= from && d <= to);
  if (!covered.length) {
    console.error(
      `competition.json has no data for ${from}..${to} ` +
        `(it covers ${days[0] ?? "nothing"} to ${days[days.length - 1] ?? "nothing"}).\n` +
        `Re-run scripts/fetch-competition.browser.js in a training.scaledagile.com browser tab\n` +
        `with FROM/TO set to this window, save the JSON, then plan again.\n` +
        `Their API blocks curl, so this step only works from a browser.`
    );
    process.exit(1);
  }
}

const portalPath = getArg("portal");
const portalListings = portalPath
  ? JSON.parse(readFileSync(portalPath, "utf8")).listings
  : [];
const usedPerDay = new Map();
for (const l of portalListings) {
  usedPerDay.set(l.date, (usedPerDay.get(l.date) || 0) + 1);
}
// Portal class name → our course slug, so a class that exists in the portal
// but has not yet reached the public Training Finder is still recognised.
// Without this the planner re-posts the same course on the same day.
const slugByClassName = Object.fromEntries(
  Object.entries(config.portal.courseMap).map(([slug, m]) => [m.className.trim().toLowerCase(), slug])
);
const portalCourseOnDate = new Set(
  portalListings
    .map((l) => {
      const slug = slugByClassName[l.name.trim().toLowerCase()];
      return slug ? `${l.date}|${slug}` : null;
    })
    .filter(Boolean)
);
// A date already running an exclusive course (Agile Product Management) takes
// nothing else at all.
const exclusiveSlugs = tiers.exclusiveCourses ?? [];
const exclusiveNames = exclusiveSlugs.map((s) => config.portal.courseMap[s]?.className ?? "");
for (const l of portalListings) {
  if (exclusiveNames.some((n) => n && l.name.trim() === n)) blockedDates.add(l.date);
}

const capacityFor = (date) =>
  Math.max(0, policy.maxClassesPerDay - (usedPerDay.get(date) || 0));

// Trainers already teaching a LIVE class on a date. They cannot take another
// one that day — Agile36's trainers never overlap.
/** Every ISO day a row occupies, inclusive — trainers are booked across spans. */
const spanOf = (row) => {
  const out = [];
  const d = new Date(`${row.start}T00:00:00Z`);
  const last = new Date(`${row.end || row.start}T00:00:00Z`);
  while (d <= last) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
};

const liveBusy = new Map();
for (const l of portalListings) {
  for (const t of l.trainers ?? []) {
    if (!liveBusy.has(l.date)) liveBusy.set(l.date, new Set());
    liveBusy.get(l.date).add(t);
  }
}

const committedInWindow = committed.filter((c) => c.date >= from && c.date <= to);

// A class starting today cannot usefully be listed — the calendar needs lead
// time before day one. This is a small guard, NOT a duplicate check: duplicates
// are caught by diffing against a complete portal snapshot. (An earlier version
// of this comment claimed the grid hides classes on their start date. That was
// wrong — the grid holds everything; the scraper was reading page 1 of 79.)
const leadFloor = new Date(Date.now() + (policy.minLeadDays ?? 1) * 864e5)
  .toISOString()
  .slice(0, 10);

const byDate = new Map();
for (const row of all) {
  if (row.start < leadFloor) continue;
  if (blockedDates.has(row.start)) continue;
  if (!byDate.has(row.start)) byDate.set(row.start, []);
  byDate.get(row.start).push(row);
}
const has = (date, slug) => byDate.get(date)?.some((r) => slugOf[r.course] === slug);
const get = (date, slug) => byDate.get(date).find((r) => slugOf[r.course] === slug);

// Cohort days are the ones that carry anchor courses; the rest are light days
// that only offer the twice-a-month course.
const dates = [...byDate.keys()].sort();
const cohortDates = dates.filter((d) => tiers.anchors.some((s) => has(d, s)));
const lightDates = dates.filter((d) => !cohortDates.includes(d));

let selected = [];
const gaps = [];
const floaterUsed = new Map();

// Anchors first: they run on every cohort day regardless of competition.
const slots = []; // one entry per open floater slot
for (const date of cohortDates) {
  let room = capacityFor(date);
  // Posting an exclusive course claims the whole day.
  for (const slug of tiers.anchors) {
    if (room <= 0) break;
    if (listedAlready.has(`${date}|${slug}`) || portalCourseOnDate.has(`${date}|${slug}`)) {
      continue; // this course already runs that day
    }
    if (has(date, slug)) {
      selected.push(get(date, slug));
      room--;
    } else if (!blockedDates.has(date)) {
      gaps.push({ date, missingAnchor: config.courses[slug].safeName });
    }
  }
  for (let i = 0; i < room; i++) slots.push(date);
}

// Budgeted floaters (SAFe for Teams, twice a month) claim the dates where
// they face the least competition.
const budgeted = tiers.floaters.filter((s) => tiers.floaterBudgets?.[s] !== undefined);
for (const slug of budgeted) {
  const name = config.courses[slug].safeName;
  const open = [...new Set(slots)]
    .filter((d) => has(d, slug) && !portalCourseOnDate.has(`${d}|${slug}`))
    .sort((a, b) => rivals(a, name) - rivals(b, name) || a.localeCompare(b));
  for (const date of open.slice(0, tiers.floaterBudgets[slug])) {
    selected.push(get(date, slug));
    floaterUsed.set(slug, (floaterUsed.get(slug) || 0) + 1);
    slots.splice(slots.indexOf(date), 1);
  }
}

// Remaining slots split between the unbudgeted floaters. Each date goes to
// whichever floater is less crowded there, with a cap so both still appear.
const free = tiers.floaters.filter((s) => tiers.floaterBudgets?.[s] === undefined);
const cap = Math.ceil(slots.length / free.length);
const usedFree = new Map();
slots
  // Settle the lopsided dates first — where one floater is clearly quieter.
  .sort((a, b) => {
    const spread = (d) => {
      const v = free.map((s) => rivals(d, config.courses[s].safeName));
      return Math.max(...v) - Math.min(...v);
    };
    return spread(b) - spread(a);
  })
  .forEach((date) => {
    const usable = (s) =>
      has(date, s) &&
      !selected.includes(get(date, s)) &&
      !portalCourseOnDate.has(`${date}|${s}`); // never twice on one day
    const options = free.filter(usable).filter((s) => (usedFree.get(s) || 0) < cap);
    const pool = options.length ? options : free.filter(usable);
    if (!pool.length) return;
    pool.sort(
      (a, b) =>
        rivals(date, config.courses[a].safeName) - rivals(date, config.courses[b].safeName) ||
        (usedFree.get(a) || 0) - (usedFree.get(b) || 0)
    );
    const slug = pool[0];
    selected.push(get(date, slug));
    usedFree.set(slug, (usedFree.get(slug) || 0) + 1);
  });

// Twice-a-month course, spaced across the light days.
for (const slug of tiers.twicePerMonth) {
  const name = config.courses[slug].safeName;
  const open = lightDates
    .filter((d) => has(d, slug))
    .sort((a, b) => rivals(a, name) - rivals(b, name) || a.localeCompare(b));
  // Two least-contested dates, kept a week apart where possible.
  const picks = [];
  for (const date of open) {
    if (picks.length >= 2) break;
    const tooClose = picks.some(
      (p) => Math.abs(new Date(date) - new Date(p)) < 7 * 864e5
    );
    if (tooClose && open.length > 2) continue;
    picks.push(date);
  }
  for (const date of picks) selected.push(get(date, slug));
}

selected.sort((a, b) => a.start.localeCompare(b.start) || a.course.localeCompare(b.course));

// --- Trainer assignment.
const rotation = policy.trainers.rotation;
const restricted = Object.entries(policy.trainers.restricted).map(([name, r]) => ({
  name,
  courses: r.courses,
}));
const courseRestrictions = policy.trainers.courseRestrictions ?? {};
const eligibleFor = (row) => {
  const slug = slugOf[row.course];
  // A course whitelist overrides everything — only Deadra and Joseph are
  // certified for Lean Portfolio Management, for example.
  if (courseRestrictions[slug]) return [...courseRestrictions[slug]];
  const extra = restricted.filter((r) => r.courses.includes(slug)).map((r) => r.name);
  return [...rotation, ...extra];
};

const perCourse = new Map(); // `${trainer}|${course}` -> count
const perTrainer = new Map();
const bump = (m, k) => m.set(k, (m.get(k) || 0) + 1);

// Preferred ceiling on any one trainer's share of a single course, so a
// trainer eligible for only a couple of courses doesn't absorb all of them.
// Relaxed automatically when a day can't otherwise be staffed.
const courseCap = new Map();
for (const row of selected) {
  if (courseCap.has(row.course)) continue;
  const total = selected.filter((r) => r.course === row.course).length;
  courseCap.set(row.course, Math.ceil(total / eligibleFor(row).length));
}

const dateGroups = new Map();
for (const row of selected) {
  if (!dateGroups.has(row.start)) dateGroups.set(row.start, []);
  dateGroups.get(row.start).push(row);
}

for (const date of [...dateGroups.keys()].sort()) {
  const rows = dateGroups.get(date);
  // Seed with whoever is already committed on the live calendar that day.
  const taken = new Set(liveBusy.get(date) ?? []);
  // Staff the most constrained rows (fewest eligible trainers) first.
  // Most-constrained first, then by what the course actually earns. SAFe for
  // Teams has taken $589 across one order; Scrum Master $2,384. Ordering on
  // constraint alone let SAFe for Teams take the last free trainer on 10/08 and
  // leave Scrum Master with nobody.
  const revenueOf = (row) =>
    config.actualRevenue?.byCourse?.[slugOf[row.course]]?.revenue ?? 0;
  const order = [...rows].sort(
    (a, b) => eligibleFor(a).length - eligibleFor(b).length || revenueOf(b) - revenueOf(a)
  );

  for (const row of order) {
    // Free means free on EVERY day this class runs, not just its first.
    const free = eligibleFor(row).filter(
      (n) => !taken.has(n) && !spanOf(row).some((d) => liveBusy.get(d)?.has(n))
    );
    if (!free.length) continue;
    const underCap = free.filter(
      (n) => (perCourse.get(`${n}|${row.course}`) || 0) < courseCap.get(row.course)
    );
    const candidates = underCap.length ? underCap : free;
    candidates.sort((a, b) => {
      const ca = perCourse.get(`${a}|${row.course}`) || 0;
      const cb = perCourse.get(`${b}|${row.course}`) || 0;
      if (ca !== cb) return ca - cb;
      const ta = perTrainer.get(a) || 0;
      const tb = perTrainer.get(b) || 0;
      if (ta !== tb) return ta - tb;
      return a.localeCompare(b);
    });
    const name = candidates[0];
    row.trainer = name;
    taken.add(name);
    // A trainer is occupied for EVERY day their class spans, and dates are
    // processed one group at a time — so an Agile Product Management class on
    // Oct 7-9 has to block that trainer on the 8th and 9th too, in the groups
    // that have not been staffed yet. Without this, Deadra was rostered for
    // APM 10/07-10/09 and Scrum Master 10/08-10/09; Supabase allows it but the
    // partner portal rejects the second class as a double booking.
    for (const d of spanOf(row)) {
      if (!liveBusy.has(d)) liveBusy.set(d, new Set());
      liveBusy.get(d).add(name);
    }
    bump(perCourse, `${name}|${row.course}`);
    bump(perTrainer, name);
  }
}

const unstaffed = selected.filter((r) => !r.trainer);
// A class with no instructor never reaches the training calendar — it burns a
// listing and shows nobody. Report it, never emit it.
selected = selected.filter((r) => r.trainer);

const tally = (rows, key) =>
  Object.entries(rows.reduce((a, r) => ((a[r[key]] = (a[r[key]] || 0) + 1), a), {}))
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => ({ [key]: k, n }));

const report = {
  window: { from, to },
  candidatesInWindow: all.length,
  selectedCount: selected.length,
  maxPerDay: policy.maxClassesPerDay,
  byCourse: tally(selected, "course"),
  byTrainer: tally(selected.filter((r) => r.trainer), "trainer"),
  anchorGaps: gaps,
  unstaffed,
  competitionUsed: Boolean(competition),
  competitionScope: scope,
  committedClasses: committedInWindow,
  blockedDates: [...blockedDates].filter((d) => d >= from && d <= to).sort(),
  classes: selected.map((r) => ({
    ...r,
    instructor: r.trainer,
    rivalsSameDay: competition
      ? (competition[`${r.start}|${r.course}`] ?? { all: 0, eastern: 0 })
      : null,
  })),
};
console.log(JSON.stringify(report, null, 2));
