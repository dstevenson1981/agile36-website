# Scaled Agile class poster — built 2026-08-10/11

**What it is:** an agent that keeps the Scaled Agile partner calendar
(`community.scaledagile.com/s/course-admin`) in sync with Agile36's real
schedule. Runs weekly, proposes classes, Deadra approves, it posts them.

**Where it lives:**
`~/Desktop/agile36-website/.claude/skills/scaledagile-class-poster/`

**Runs:** Tuesdays 4pm via cron (`weekly-sync.sh`). Analysis only — it never
posts on its own.

## Start here

| File | What it holds |
|---|---|
| `SKILL.md` | the 5-phase workflow |
| `RULES.md` | every scheduling rule Deadra gave, and why |
| `PORTAL-NOTES.md` | the portal's form, its traps, the Learning Plan mapping |
| `config.json` | machine-readable policy: trainers, cadence, restrictions |
| `reports/` | one dated report per weekly run |

## What happened

Started as "post my classes to Scaled Agile". Most of the two days went into
discovering the scheduling rules, none of which were written down anywhere:

- Nothing is ever cancelled — a wrong listing gets its **date changed**.
- Max 4 classes a day, **counting what is already on the calendar** (4 trainers,
  nobody in two places).
- A trainer is booked for a class's **whole span**, not its start date.
- **Private classes don't count** toward the cap or overlaps.
- Once any class has a registrant, that **whole date closes** to everything else.
- Lean Portfolio: **Deadra or Joseph only**. Martina: **POPM and Leading SAFe only**.
- Agile Product Management runs **alone** on its dates, ~3 a month.
- DevOps never posts — zero registrations, ever.

## Two things that cost the most time

**Hand-driving the portal.** Creating one class is ~12 UI steps across two
stages, and Salesforce menus close between tool calls. One class took ~25 tool
calls. Rebuilt as Playwright batch automation — that was Deadra's call and it
was right.

**Posting before she reviewed the plan.** Several rules only surfaced when she
saw what had been posted. The workflow now stops at a CSV for her review, which
is the single most important part of the design.

## Gotchas that will bite again

- A class with **no instructor never reaches the training calendar** — it burns
  a listing and shows nobody. Always finish stage 2.
- The portal spells him **Joseph Puoci**; Supabase says "Joe". Search by surname.
- The class detail page has two tables with email addresses — Instructors and
  Attendees. Read only the Instructors table or students appear as trainers.
- Score competition **Eastern-only**. Worldwide roughly triples it and once led
  to advice to drop Product Owner, the top earner.
- The **portal grid** is the authority on what exists, not the public Training
  Finder — the Finder lags and has shown a different start date for the same class.

## Where it stands

25 upcoming public classes on the calendar, verified: no trainer overlaps
across date spans, every class has an instructor, no date over the cap.
Product Owner went from 2 listings to 6.

## Open

- The Supabase `agent_runs` table (migration written, **not applied**) would
  give a cross-agent run history. Decided against Paperclip for now — it solves
  coordination, not "did it run".
- This agent is not yet a Buzz relay agent. Adding it means a persona in
  `~/.buzz-agents/personas/` so it sits next to Casey and can be talked to.
