# Agile36 scheduling rules

## The purpose: post new dates

This tool exists to **get Agile36's unlisted classes onto the partner
calendar**. It diffs the live schedule against what is already listed and
posts the gap. That is the whole job.

It is **not** an analysis tool for classes that are already running. A cohort
with registrants is doing fine and needs nothing — do not study it, do not
report on it, and never treat it as a problem to solve.

**The registrant rule governs which *new* dates may be filled, not whether an
existing cohort may be listed.** Every proposal already comes from Supabase, so
it is a real class Deadra decided to run; listing it is correct even when
another class that day is booked. Getting this backwards on 2026-08-19 produced
a "fix" that would have permanently suppressed two real Agile Product
Management classes from the calendar because other classes on overlapping days
had registrants. Her words: "Both are running, with registrants, who cares."

Deadra's rules for what may go on the Scaled Agile partner calendar. Every one
of these came from her correcting a real mistake — none are inferred, and none
should be relaxed without asking. The machine-readable versions live in
`config.json`; this file explains *why*, which the JSON cannot.

## Never cancel a class

**A class is never cancelled or deleted. Ever.** If a listing is surplus,
mis-dated, or on an over-booked day, its **date changes** — that is the only
remedy. Do not offer deletion as an option. `automation/move-classes.mjs`
exists for this.

Instructors *can* be removed from a class (`remove-instructor.mjs`). Classes
cannot.

## Four classes per day, counting what is already there

Agile36 has four trainers and nobody is in two places at once, so **four
public listings on a date is the ceiling** — and the count includes classes
already on the calendar, not just what a run is adding. Stacking four new
classes onto a date that already had one is how Sept 12 ended up with five.

## Trainers cannot overlap, across whole date spans

A trainer is occupied for **every day their class spans**, not just the start
date. A class running 9/16–9/18 means that trainer takes nothing on 9/16,
9/17, or 9/18. Agile Product Management is three days, so this bites often.
Always compare full ranges; comparing start dates alone is wrong.

## Only public classes count

Private classes are invisible to the partner calendar. They do not count
toward the per-day cap and do not create an overlap — the same trainer may run
a private class alongside a public one. Check the class **Type** before
reporting a conflict.

## Who can teach what

| Trainer | May teach |
|---|---|
| Deadra Stevenson | anything |
| Marcus Ball | anything **except** Lean Portfolio Management |
| Joseph Puoci | anything |
| Martina Svoboda | **only** Product Owner/Product Manager and Leading SAFe |

Lean Portfolio Management is certified to **Deadra and Joseph only**.

The portal spells him **Joseph Puoci**; Supabase says "Joe". Search the
instructor directory by **surname** — first names differ between systems.

## A registrant closes the whole date

Once **any** class has `total_registrants` > 0, that entire date is closed to
everything else — Deadra runs the class that is selling and schedules nothing
against it. The block covers every day the class spans and applies to any
course with enrolments, including the non-SAFe AI ones, which never reach the
partner calendar themselves but still close their dates.

A light date is therefore **not** a scheduling gap. Never report it as one and
never offer to fill it.

## Course cadence

- **Anchors** — Lean Portfolio, Product Owner/Manager, Scrum Master — run on
  cohort days (Mon/Tue, Thu/Fri, Sat/Sun).
- **Floaters** — Leading SAFe, Advanced Scrum Master — rotate into the spare slot.
- **Agile Product Management** — about three a month. It runs *alone* on its
  dates; nothing else is scheduled against it.
- **SAFe for Teams** — roughly twice a month.
- **DevOps** — never post it. It draws no registrations.

## Revenue is owner-supplied

Never infer a revenue ranking from how often a course runs, or from Deadra
calling something an anchor — those are delivery-rhythm decisions. As of
2026-08-10 the actuals were Product Owner $11,614 (24 orders), Agile Product
Management $11,075 (10), Lean Portfolio $7,278 (8), Leading SAFe $3,367 (7),
Advanced Scrum Master $2,422 (7), Scrum Master $2,384 (5), SAFe for Teams $589
(1). Ask for fresh numbers rather than guessing.

## Competition is Eastern-only

Score competition on **America/New_York listings only**. That is the bucket
Agile36 sells into and the one buyers filter on; a class in another timezone is
not competing for the same seat. Counting worldwide roughly triples the
apparent competition and once led to advice to drop Product Owner — which is
the top earner and, in Eastern terms, barely contested at all.

Also: an absent competition entry means **no data**, not "no rivals."

## Class setup

Every Agile36 class is a **Remote Public Course**, named
`{Course}- Guaranteed to Run`. There is no Guaranteed-to-Run checkbox — the
name is what conveys it. Timezone is always the **New York** option, never
plain "Eastern Standard Time", which buyers cannot filter on. Language is
always English; ignore the Portuguese/Chinese/French/German learning plans.

## The portal is the source of truth for what exists

The public Training Finder lags and can show a **different start date** for the
same class. Reconcile against the portal's My Courses grid, never the Finder,
or you will create duplicates and burn listings.

## Listing quota

The Course Admin header shows **Calendar Listings Available** (base + earned −
scheduled). Read it before planning a batch. Deadra has said the number is not
a hard blocker in practice — but report it, and never silently plan past it.

## Delivery is the board, not the disk

Deadra does not read chat transcripts, terminal output, or files in `reports/`.
**If it is not on the Multica board, it did not happen.** A run that produced a
correct CSV and left it on disk is a failed run — that is exactly what happened
on 2026-08-18, when the sync wrote `classes.csv` at 17:18 and she saw nothing.

Every run ends by posting to the issue it was triggered from: a plain-language
summary plus the CSV attached, and an explicit line saying nothing has reached
the partner calendar yet. She approves by replying `approved` on that issue.

Never ask her to go and find a file.

## Supabase decides what may exist at all

Two things follow from the same principle, and neither needs Deadra to
restate them:

**A date with no cohort is a decision.** She is off that day. Sept 5-6 2026
is the example — not an oversight.

**A cancelled cohort is not a class.** If the status is anything other than
`active`, or the row is `hidden`, it must never reach the spreadsheet, even
though the date exists in Supabase.

Both are enforced at `scripts/diff-classes.mjs`, which whitelists rather than
blacklists — `if (r.status !== "active" || r.hidden) return false;` — before
any candidate is built. A whitelist is the right shape here: any future status
she invents is excluded by default rather than silently allowed through.

Verified 2026-08-18: all 11 proposed dates existed in Supabase, none invented.
The API returned 460 rows, all `active`, so the cancelled path is correct but
has not yet been exercised against real cancelled data.

## An empty date in Supabase is a decision, not a gap

Supabase is the source of truth for which dates exist at all. **If a date has
no cohort there, it is because Deadra is not working that day** — she takes
time off, and the absence is deliberate. Sept 5–6 2026 is the example: not an
oversight, she is off.

The pipeline already honours this structurally — `diff-classes.mjs` builds
candidates by diffing the live schedule API against the partner calendar, so a
date with no cohort never becomes a candidate. Verified 2026-08-18: all 11
proposed dates existed in Supabase, zero invented.

Do not "fill" an empty date, do not treat a quiet week as an opportunity, and
never add a hardcoded blackout to paper over this — the absence in Supabase is
already the instruction. If a future change starts generating candidate dates
from cohort-day patterns instead of from Supabase rows, that change is wrong.

## The portal grid is paginated — read all of it

`dump-portal.mjs` reads the Course Admin **My Courses** grid, which paginates
at 25 rows via a `<c-lwc-pager>` inside a shadow root, reporting counts like
"1-25 of 1955". **Scrolling does nothing.** The pager has a page-size select
(25/50/100) and two chevron buttons; both must be driven from script.

Reading page one only compared Deadra's whole schedule against 25 listings and
proposed classes that were already live — `2026-08-19 Agile Product Management`
was on the calendar the entire time. After the fix the snapshot holds 100
listings back to July, and that class is present.

**Everything is in the grid, past and future.** If a class appears missing,
the snapshot is incomplete — check the row count against the pager's total
before concluding anything. Verify by measuring the live grid, not by reading
the scraper.

## An empty date cannot conflict

Nothing on a date with **zero registrants** is a conflict. Not two classes
stacked, not Agile Product Management sharing a date, not a trainer appearing
twice. Until someone registers, the listing is speculative and costs nothing.

So **do not flag conflicts on empty dates** — not in a CSV summary, not as a
warning, not as a question. It reads as a problem and it is not one.

"Agile Product Management runs alone on its dates" and the per-day cap describe
what happens **once a date has registrants**: Deadra then protects the class
that is selling and clears the rest. Before that, they are not constraints on
what may be proposed. Asked about Oct 8 on 2026-08-19: "i have no one registered
for that date. until people register it doesnt matter."

## Supabase is accurate — do not debate it

What is in Supabase is correct. Deadra set it. Do not question a cohort's
date, trainer, course, or absence; do not "verify" it against the site or
anything else; do not report it back to her as a possible problem.

The job is to take that schedule and post what is not yet on the partner
calendar. Every minute spent litigating the source data is a minute not spent
doing that.
