---
name: scaledagile-class-poster
description: Post Agile36's SAFe classes to the Scaled Agile partner calendar. Analyses what actually sells (Supabase enrolments + revenue), finds uncontested Eastern-timezone dates, builds a CSV for Deadra to review, then batch-creates the classes via Playwright. Trigger on "post classes to scaled agile", "sync the SAFe calendar", "training finder", "partner calendar", "add classes for <month>", or "what classes are missing from scaled agile".
---

# Scaled Agile class poster

Keeps the Scaled Agile partner calendar in sync with Agile36's real schedule.

## It already runs weekly

`weekly-sync.sh` runs **every Tuesday at 4pm** via cron and does phases 1–3 on
its own: refreshes competition, snapshots the portal, analyses demand, finds
gaps, and writes `automation/classes.csv` plus a dated report in `reports/`.

**It never posts.** Deadra reviews the CSV, then posting is run deliberately.

Weekly matters because the calendar decays: as people register, Deadra removes
the other classes on those dates and marks them private. That both frees
capacity (private classes stop counting toward the 4-per-day cap) and closes
dates (a registrant closes its whole span). A plan is only true for about a
week.

When she asks about the sync, read the newest file in `reports/` first — it
has the demand analysis, the gap list, and what was proposed.

**Read `RULES.md` before doing anything.** Those rules were learned the hard
way and several of them are non-obvious. Getting one wrong means public
listings under Deadra's partner account are wrong.

## The workflow

Five phases. **Phase 3 is a hard stop — Deadra reviews the CSV before
anything is posted.** Skipping that review is what turned a 20-minute job
into a multi-hour one last time.

```bash
cd .claude/skills/scaledagile-class-poster
```

### 1 — Analyse what actually sells

```bash
node scripts/analyze-demand.mjs
```

Supabase carries every course on every date, so the number of cohorts means
nothing. This reports which cohorts have real enrolments, what they earn, and
which courses have never sold. Weight the batch toward what converts, and tell
Deadra what you found — she may have fresher numbers than `actualRevenue` in
`config.json`.

### 2 — Find the gaps (Eastern only)

**`competition.json` is per-window and goes stale. Re-fetch it every run.**
It cannot be fetched with curl — the API sits behind a bot checkpoint, so this
only works from a browser:

1. Open `https://training.scaledagile.com` in the Browser pane.
2. Edit `FROM`/`TO` in `scripts/fetch-competition.browser.js` to the month you
   are planning.
3. Run its contents with the javascript tool on that tab.
4. Save the returned JSON as `competition.json`.

`select-batch.mjs` refuses to run if the file does not cover the window, so a
stale file fails loudly instead of quietly planning as though every date were
uncontested.

```bash
cd automation && node dump-portal.mjs && cd ..          # what we already have
node scripts/find-gaps.mjs --competition competition.json \
  --portal automation/portal-state.json --from 2026-10-01 --to 2026-10-31
```

Shows dates where Supabase has the cohort, we are not listed, and few or no
other partners are running it **in the Eastern/New York bucket**.

### 3 — Build the CSV and STOP

```bash
node scripts/select-batch.mjs --diff <diff.json> --competition competition.json \
  --portal automation/portal-state.json --from 2026-10-01 --to 2026-10-31 > plan.json
node scripts/to-automation-csv.mjs --plan plan.json
```

Then **send `automation/classes.csv` to Deadra and wait.** Show her, in the
message: how many classes, on which dates, which trainer, and how many
already-listed classes each date carries. Do not post until she says go.

Every rule in `RULES.md` should already be satisfied by the CSV. Verify before
sending — per-day cap counting existing listings, no trainer on overlapping
date spans, course/trainer restrictions, blackout and registrant-closed dates.

### 4 — Post

```bash
cd automation
node post-classes.mjs --login      # first time only; Deadra signs in herself
node post-classes.mjs --dry-run    # fills every form, saves nothing
node post-classes.mjs              # the real run
```

Idempotent — it reads the portal first and skips anything already there, so
re-running after a partial failure is safe and retries only the failures.
A click timeout on the create dialog fires perhaps half the time; just run it
again.

### 5 — Verify

```bash
node dump-portal.mjs
```

Confirm: no date over the cap, no trainer on overlapping spans, every class
has an instructor. **A class with no instructor never reaches the training
calendar** — it burns a listing and shows nobody. `repair-instructors.mjs`
fixes any that are missing one.

## The scripts

| Script | Does |
|---|---|
| `scripts/analyze-demand.mjs` | Supabase: what runs, enrolments, revenue |
| `scripts/fetch-competition.browser.js` | every partner's listings (browser tab) |
| `scripts/find-gaps.mjs` | uncontested Eastern dates worth targeting |
| `scripts/diff-classes.mjs` | site schedule vs public Training Finder |
| `scripts/select-batch.mjs` | applies the posting policy → plan.json |
| `scripts/to-automation-csv.mjs` | plan.json → `automation/classes.csv` |
| `automation/dump-portal.mjs` | snapshot the calendar → `portal-state.json` |
| `automation/post-classes.mjs` | batch-create classes + attach instructors |
| `automation/repair-instructors.mjs` | fix classes missing an instructor |
| `automation/remove-instructor.mjs` | drop a wrongly-added instructor |
| `automation/move-classes.mjs` | change a class's dates (never delete) |

`PORTAL-NOTES.md` documents the portal's form, its field quirks, and the
Learning Plan mapping. `RULES.md` is the scheduling policy.

## Do not

- **Do not hand-drive the portal** through Claude in Chrome to create classes.
  One class is ~12 UI steps across two stages and the Salesforce menus close
  between tool calls; 26 classes took hours that way. Use the batch runner and
  reserve the browser for investigating a changed form.
- **Do not post before Deadra has seen the CSV.**
- **Do not enter credentials.** `--login` exists so she signs in herself.
- **Do not cancel or delete a class.** Change its date instead.
