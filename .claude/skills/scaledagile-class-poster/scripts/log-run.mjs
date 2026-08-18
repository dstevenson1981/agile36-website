#!/usr/bin/env node
/**
 * Record one sync run in Supabase → public.safe_sync_runs
 *
 *   node log-run.mjs --status ok --from 2026-08-11 --to 2026-10-20 \
 *     --plan /tmp/sa-plan.json --portal automation/portal-state.json \
 *     --demand reports/2026-08-11-demand.json --report reports/2026-08-11.md
 *
 * Reads SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY from the site's .env.local.
 * Never prints the key. If Supabase is unreachable the run still succeeds —
 * losing the log entry must not fail the sync.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const ENV = join(here, "..", "..", "..", "..", ".env.local");

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const readJson = (p) => (p && existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null);

// Parse .env.local without pulling in a dependency, and without echoing it.
function env(key) {
  if (process.env[key]) return process.env[key];
  if (!existsSync(ENV)) return null;
  for (const line of readFileSync(ENV, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && m[1] === key) return m[2].replace(/^["']|["']$/g, "");
  }
  return null;
}

const url = env("NEXT_PUBLIC_SUPABASE_URL") || env("SUPABASE_URL");
const key = env("SUPABASE_SERVICE_ROLE_KEY");
if (!url || !key) {
  console.log("(no Supabase credentials found — skipping run log)");
  process.exit(0);
}

const plan = readJson(opt("plan"));
const portalFile = readJson(opt("portal"));
const demand = readJson(opt("demand"));

const today = new Date().toISOString().slice(0, 10);
const publicUpcoming = (portalFile?.listings ?? []).filter(
  (l) => !/Private/i.test(l.type || "") && l.date >= today
);

const byCourse = {};
for (const c of plan?.classes ?? []) byCourse[c.course] = (byCourse[c.course] || 0) + 1;

const row = {
  status: opt("status", "ok"),
  phase: opt("phase", null),
  window_from: opt("from", null),
  window_to: opt("to", null),
  listed_public: publicUpcoming.length,
  proposed: plan?.classes?.length ?? 0,
  posted: Number(opt("posted", 0)),
  failed: Number(opt("failed", 0)),
  running_cohorts: demand?.running?.length ?? null,
  pipeline_revenue: demand?.running?.reduce((a, r) => a + (r.revenue ?? 0), 0) ?? null,
  by_course: byCourse,
  notes: opt("notes", null),
  report_path: opt("report", null),
};

try {
  const res = await fetch(`${url}/rest/v1/safe_sync_runs`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const body = await res.text();
    // 404 = table not created yet; say so plainly rather than failing the sync.
    console.log(
      res.status === 404
        ? "(safe_sync_runs table not found — apply supabase/migrations/20260811_safe_sync_runs.sql)"
        : `(run log failed: ${res.status} ${body.slice(0, 120)})`
    );
  } else {
    console.log(
      `logged run to Supabase: ${row.status}, ${row.proposed} proposed, ${row.listed_public} already listed`
    );
  }
} catch (err) {
  console.log(`(run log skipped: ${err.message})`);
}
