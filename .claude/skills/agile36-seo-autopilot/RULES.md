# What the SEO autopilot may and may not change

This agent edits agile36.com **unattended and pushes to production**. Deadra does
not review its work and does not want status updates. That only stays safe
because the blast radius is small and enforced by a script, not by good
intentions.

`guard.mjs` blocks a commit that breaks any rule below. If the guard trips, the
run aborts and changes are discarded — it never "fixes" its way past the guard.

## It may change

- `metadata` exports and `generateMetadata` — title, description, keywords,
  canonical, Open Graph, Twitter card
- `alt` text on images
- JSON-LD helpers in `app/lib/*-jsonld.ts` — Course, Organization, FAQ,
  BreadcrumbList structure
- `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`
- Heading text where the fix is a demonstrable SEO defect (a missing `h1`, a
  duplicate `h1`) and the visible words stay the same in meaning

## It must never change

**Money, dates, and checkout.** Anything under `app/api/`, anything Stripe or
Supabase, `app/lib/course-catalog.ts`, `app/lib/schedule-display.ts`,
`app/lib/course-hero-schedule-pricing.ts`, `app/lib/course-promo-caps.ts`.
A price or a course date is never an SEO decision. POPM is $545 and stays $545
unless Deadra says otherwise.

**Owner-sourced statistics.** The 78% reimbursement rate, 3,200 LPMs, and the
revenue figures came from Deadra's real data. An unverifiable-looking number is
not a bug. Leave it exactly as written — do not delete, round, soften, or
re-attribute it.

**In-flight and superseded routes.** `app/(legacy)/` and every `*-temp` folder.
They are experiments; editing them creates confusing diffs for whoever picks
them back up.

**The homepage hero.** `app/components/home/HomeExperience.tsx` is deliberately
dark-on-video, the one exception to the light theme. It is not a contrast bug.

**The design system.** Tailwind's `black` is remapped to `#f6f9fd`, so `bg-black`
renders light and `text-black` produces near-white text. Never touch colour
classes for "accessibility" reasons — a contrast finding against this site is
almost always the audit misreading the remap.

## How much it may change at once

Twenty files per run, sixty changed lines per file. A larger diff means the
agent has misread something, and the guard stops it. Nothing about SEO needs a
hundred-file commit.

## It must prove the site still builds

`npm run build` and `npm run lint` both have to pass before anything is
committed. A change that does not build is not an improvement — it is an
outage on a storefront that takes real money.

## What it does with what it cannot fix

Nothing visible. Findings outside the allowlist are appended to
`reports/deferred.md` in this skill folder and left there. No issue, no email,
no dashboard. If Deadra ever wants to know what has been piling up, that file
is the answer.

## It grades its own work, and reverts what broke

Every commit is prefixed `SEO:` so the whole history of this agent is one
command away:

```bash
git log --grep="^SEO:" --oneline
```

That prefix is what makes the work reversible. Any single change can be undone
with `git revert <sha>` without untangling it from anyone else's commit, and
Vercel keeps every deploy if a faster rollback is needed.

The agent reverts a page **on sight** when it broke something unambiguous — the
URL fell out of the index, started 404ing, or its structured data stopped
validating. It does **not** revert because a ranking moved. Rankings are judged
on a four-week window, and a page it edited is left alone for four weeks so the
change is attributable to something.

## When it fails

A failed build, a tripped guard, or a failed push aborts the run and leaves the
working tree clean. Failure is the **only** condition that surfaces anywhere —
it is written to `reports/failures.log`. Silence means it worked.
