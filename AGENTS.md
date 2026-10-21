# AGENTS.md

Project-wide guidance for AI agents lives in `CLAUDE.md` (stack, design system,
revenue-critical rules, definition of done). Read it first. This file adds only
Cursor Cloud specific operating notes.

## Cursor Cloud specific instructions

Agile36 is a Next.js 16 (App Router) marketing + enrollment site. There is a
single app (no separate backend service); external data/services are Supabase,
Stripe, and SendGrid, reached over the network.

### Run / build / lint

- Dev server: `npm run dev` — serves on **port 3001** (the root `README.md` says
  3000, that is stale; the port is pinned in `package.json`).
- Build and lint (the definition of done in `CLAUDE.md`): `npm run build` and
  `npm run lint`.
- `npm run lint` currently reports many pre-existing errors, concentrated in
  `seo-drafts/`, `supabase/functions/`, and some sales scripts. These are not
  caused by environment setup — do not try to "fix" the repo to make lint clean
  unless your task is specifically about that. `npm run build` succeeds.

### Environment variables / what runs without secrets

- The app boots and all static marketing + course catalog/detail pages render
  **without any environment variables**. Env vars are read lazily, so a missing
  key does not crash the server — it degrades per-feature.
- Supabase-backed features require `.env.local` (see `ENVIRONMENT_VARIABLES.md`
  for the full list). Without `NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`, endpoints like
  `/api/course-schedules` return HTTP 500 `{"error":"Database not configured"}`,
  and the schedules → checkout → enroll funnel, accounts/auth, and admin will not
  function.
- Stripe checkout/payment routes need `STRIPE_SECRET_KEY` /
  `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (and `STRIPE_WEBHOOK_SECRET` for webhooks);
  SendGrid email is fully optional. The app connects to a **hosted** Supabase
  project — there is no local Supabase/Docker config in the repo, and the core
  `course_schedules` table is defined in root-level ad-hoc `supabase-*.sql`
  files, not in `supabase/migrations/`.

### Smoke testing without secrets

- The free practice exams under `/test/*` (e.g. `/test/leading-safe`) are fully
  client-side (hardcoded questions, in-browser scoring, no backend). They are a
  reliable way to exercise real interactive functionality end to end when no
  Supabase/Stripe credentials are configured.

### Guardrails

- Do not run the production data scripts (`sync-stripe-names`, `enrich-apollo`,
  `land-expand`) — they hit live systems and are blocked in
  `.claude/settings.json`. Never commit secrets or `.env.local`.
