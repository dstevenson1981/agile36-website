# Runbook — Scaled Agile partner calendar

Keeping Agile36's classes on `training.scaledagile.com`. The agent does the
analysis; Deadra approves; the agent posts.

**Everything lives in**
`~/Desktop/agile36-website/.claude/skills/scaledagile-class-poster/`

Read `RULES.md` there before changing anything. Those rules are not guessable
and getting one wrong puts a wrong listing on a public calendar.

## The weekly rhythm

Cron runs `weekly-sync.sh` **Tuesdays at 4pm**. It refreshes competition data,
snapshots the calendar, works out what is selling, finds uncontested dates,
and writes a plan — then stops.

Nothing posts without Deadra seeing `automation/classes.csv` first.

```bash
cd ~/Desktop/agile36-website/.claude/skills/scaledagile-class-poster
cat reports/$(date +%Y-%m-%d).md      # what the last run found
```

Then, once she has approved the CSV:

```bash
cd ~/Desktop/agile36-website/.claude/skills/scaledagile-class-poster/automation
node post-classes.mjs
```

Safe to re-run — it skips anything already on the calendar. A click timeout on
the create dialog fires perhaps half the time; run it again.

## When something is wrong

| Symptom | Fix |
|---|---|
| Sync failed at "dump-portal" | login expired → `node post-classes.mjs --login` |
| Class posted but not on the public calendar | it has no instructor → `node repair-instructors.mjs` |
| Wrong person on a class | `node remove-instructor.mjs` (instructors can be removed; classes cannot) |
| Class on the wrong day | `node move-classes.mjs` — **change the date, never cancel** |
| Everything looks uncontested | competition data is stale for that window; re-fetch |

## Things that are true and easy to forget

- Four classes a day maximum, counting what is already listed.
- A trainer is booked for the whole span of their class.
- Private classes count for nothing.
- A registrant closes that entire date.
- Only ever change dates. Never cancel a class.

## Why weekly

As people register, Deadra removes the competing classes on those dates and
marks them private. That frees capacity and closes other dates, so a plan is
only true for about a week.
