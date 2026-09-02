---
name: agile36-seo-autopilot
description: Audit agile36.com with the local `seo` CLI, apply the SEO fixes that are safe to make unattended, verify the site still builds, and push to production. Runs weekly with no report and no approval step — Deadra sees nothing unless it fails. Trigger on "run the SEO autopilot", "seo autopilot", "fix the site's SEO", or the weekly autopilot firing.
---

# Agile36 SEO autopilot

Fixes agile36.com's SEO instead of reporting on it. **No summary, no issue, no
dashboard.** Deadra asked for updates to be made, not described.

**Read `RULES.md` first.** It defines the only edits allowed to reach production
unattended. `guard.mjs` enforces it and will abort the run rather than let a
price, a class date, or an owner-sourced statistic through.

## Before anything else

Prerequisites, checked in this order — stop if one fails:

```bash
seo telemetry status          # should say disabled
git -C ~/Desktop/agile36-website status --porcelain   # must be empty
```

An unclean tree means a human is mid-edit. Abort; do not stash, do not commit
someone else's work.

## 0 — Grade last week before doing anything new

The run always starts by marking its own homework. An agent that only ever
adds changes and never checks them is how a site quietly gets worse.

```bash
seo crawl-diff                # what moved since the last crawl
seo change-log                # what this agent changed, and when
```

For every URL this agent edited in a previous run, decide one of three things:

- **Regressed hard** — the page fell out of the index, started 404ing or
  redirecting, or its structured data no longer validates. **Revert it now**,
  before any new work:
  ```bash
  git revert --no-edit <sha> && npm run build && git push origin main
  ```
  Log the revert to `reports/failures.log`. A hard regression is the one thing
  worth undoing immediately, because it is unambiguous.

- **Ranking moved** — up or down. **Do nothing yet.** SEO changes take weeks to
  settle, and one week of Search Console data is noise. Judge position and click
  movement on a **four-week window**, and only then, only against the URLs this
  agent touched. See `config.json → grading`.

- **Nothing to say** — the normal case. Move on.

Never revert a change because a ranking dipped once. Never re-edit a page this
agent already edited within the last four weeks; let it settle or you will
never know which change did what.

## 1 — Audit

```bash
cd ~/Desktop/agile36-website
seo report --json
```

The saved project profile `agile36` is the default, so no `--site` is needed
and nothing prompts. It resolves to the `https://www.agile36.com/` Search
Console property, which Deadra owns, with `agile36` and `agile 36` excluded as
branded terms — otherwise her own name dominates every query report and buries
the non-branded opportunities that actually matter.

Note that `https://learn.agile36.com/` is a **separate property** and is not in
scope. Do not crawl or edit it from this repo.

Read the findings and sort them into two piles: fixable under `RULES.md`, and
everything else. The second pile is appended to `reports/deferred.md` and then
forgotten.

## 2 — Fix

Work on `main`, from a current pull:

```bash
git checkout main && git pull --ff-only
```

Apply only allowlisted fixes. Prefer the smallest correct edit — a wrong
`<title>` is one line, not a refactor. Some judgement worth having:

- **Titles and descriptions** — write for the buyer, not the crawler. These are
  course pages for working professionals; keep the voice the site already has.
- **Duplicate metadata** across the `*-pro` course variants is usually real and
  worth fixing, but check whether the pages genuinely differ before rewriting.
- **JSON-LD** — the Course schema pulls live schedule data. Change the *shape*
  if it is malformed; never hand-write a date or price into it.
- **Contrast and colour findings are almost always wrong** on this site. See
  `RULES.md` for why. Defer them.

## 3 — Prove it still works

Both must pass. This is the site's definition of done and it is not optional
when nobody is watching:

```bash
npm run build
npm run lint
```

A failure here ends the run: `git checkout .` and log to
`reports/failures.log`. Do not attempt a second, cleverer fix — a build that
broke once unattended has earned a human.

## 4 — Guard, then push

```bash
git add -A
node .claude/skills/agile36-seo-autopilot/guard.mjs
```

If the guard blocks, `git reset && git checkout .`, append the reasons to
`reports/failures.log`, and stop. **Never edit around the guard**, never stage
selectively to slip past it, and never widen `config.json` to make a run pass.
The guard being wrong is a conversation with Deadra, not a config change.

If it clears:

```bash
git commit -m "SEO: <what changed, in one line>"
git push origin main
```

Vercel deploys from `main`, so the push is the deploy.

## 5 — Say nothing

Do not open an issue. Do not write a summary. Do not message Deadra. A clean
run leaves only a commit.

The one exception is failure, which goes to `reports/failures.log` and nowhere
else.

## Files

| File | What it is |
|---|---|
| `RULES.md` | What may and may not be changed, and why |
| `config.json` | The machine-readable allowlist, denylist, and blast radius |
| `guard.mjs` | Enforces all of the above against the staged diff |
| `reports/deferred.md` | Findings it chose not to act on |
| `reports/failures.log` | The only thing that ever surfaces |
