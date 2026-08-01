# Agile36

Marketing and enrollment site for Agile36, which sells SAFe/agile certification
training. **This is a live storefront with paying customers.** Course pages take
real money through Stripe and real enrollments through Supabase. Treat anything
touching price, schedule, or checkout as production.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript, `strict: true`
- Tailwind CSS
- Supabase (`@supabase/supabase-js`) — enrollments, contacts
- Stripe — checkout and payments
- SendGrid — transactional and marketing email

Routes live in `app/`, shared code in `lib/`, DB migrations and edge functions
in `supabase/`, marketing copy and drafts in `content/` and `marketing/`.

## Design system

Light "soft cinematic" theme — a training company, so not dark, but not plain
white either. The site was dark once; `scripts/flip-to-light-theme.py` converted
it. Any dark-palette guidance you find is stale.

**The one trap that breaks everything:** Tailwind's `black` is remapped in the
`@theme` block of `app/globals.css` to pale blue-white `#f6f9fd`. So `bg-black`
and `from-black` render *light*. Never use `text-black` for copy — it produces
near-white text. Use the literal navy below.

| Role | Value |
|---|---|
| Headings / emphasis | navy `#1f2c4a`, `font-normal`, letter-spacing `-0.03em` |
| Body copy | slate `#475569` |
| Secondary text | `#64748b` |
| De-emphasized | `#94a3b8` |
| Accent | deep amber `#d97706` |
| Primary button | `bg-[#1f2c4a] text-white`, hover `#16243f` |
| Surfaces | navy-alpha tints `bg-[#1f2c4a]/[0.03..0.1]`, borders `/10..20` |
| Frosted panels | `.liquid-glass` — white `rgba(255,255,255,0.72)` + blur(18px) |

The logo's amber `#fbbf24` is too pale for text on a light background — use
`#d97706` instead. The `--cine-*` variables in `globals.css` are legacy and
referenced nowhere in `app/`; don't reach for them.

**The homepage hero is the deliberate exception** — fullscreen video with white
text (`app/components/home/HomeExperience.tsx`). It stays dark-on-video and
dissolves into the light page. Don't "fix" it.

Two CSS gotchas: never hand-write `-webkit-backdrop-filter` in `globals.css`
(LightningCSS merges it and emits only the prefixed form), and marquee logos use
a `grayscale` filter — `brightness-0 invert` makes them invisible on light.

Taste: cinematic and awwwards-level but approachable. Bento grids are welcome.
No scrolling text tickers, no oversized face photos (avatars ~64px circles), no
dark reading surfaces. The trusted-by logo marquee sits right under the hero and
stays prominent.

## Definition of done

Before you report a task complete, both of these must pass:

```
npm run build
npm run lint
```

A change that doesn't build is not done. Say so plainly if you can't get it
green — do not describe a broken change as finished.

## Rules that are easy to get wrong

**Never change a price, a course date, or a schedule unless explicitly asked.**
These are revenue-critical and are set deliberately. POPM is $545 as of July 2026.

**Statistics on the site are owner-sourced, not invented.** Figures like the 78%
reimbursement rate and 3,200 LPMs came from real data Deadra has. If a number
looks unverifiable, do not delete it — flag it and ask, or reframe it with
attribution.

**Don't run the production data scripts.** `sync-stripe-names`, `enrich-apollo`,
and `land-expand` hit live Stripe, Apollo, and email systems. They are blocked in
`.claude/settings.json`; don't work around that.

**Don't commit secrets.** `.env.local` holds live keys. It's gitignored — keep it
that way, and never paste its contents into a file, a commit, or a report.

**`app/(legacy)` and the `*-temp` route folders** are superseded or in-flight
experiments. Don't refactor them as a side effect of other work.

## Working alongside other agents

Several agents may be running at once, each in its own git worktree under
`../agile36-website-worktrees/<name>` on a branch `agent/<name>`.

- Stay in your own worktree. Never edit files in another agent's directory or in
  the main checkout.
- Commit your work to your own branch. Don't merge to `main` yourself — merging
  happens through review via `agent-wt done <name>`.
- If your task needs a change that's outside your scope, say so in your summary
  rather than reaching over and making it.
