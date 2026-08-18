# Agile36 scheduling rules

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
