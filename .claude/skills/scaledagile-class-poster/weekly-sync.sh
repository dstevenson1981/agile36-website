#!/bin/bash
# Weekly Scaled Agile calendar sync — ANALYSIS ONLY, never posts.
#
# Runs Tuesdays at 4pm via cron. Produces a dated report and a classes.csv for
# Deadra to review. Posting stays a deliberate act:
#     cd automation && node post-classes.mjs
#
# Why weekly: as people register, Deadra removes the other classes on those
# dates and marks them private. That frees capacity and closes other dates, so
# the plan is only ever true for about a week.
set -uo pipefail

cd "$(dirname "$0")" || exit 1
SKILL="$(pwd)"
REPORTS="$SKILL/reports"
mkdir -p "$REPORTS"

STAMP=$(date +%Y-%m-%d)
REPORT="$REPORTS/$STAMP.md"

# Plan the next ~10 weeks; far enough to matter, near enough to be real.
FROM=$(date +%Y-%m-%d)
TO=$(date -v+10w +%Y-%m-%d 2>/dev/null || date -d "+10 weeks" +%Y-%m-%d)

exec > >(tee "$REPORTS/$STAMP.log") 2>&1
echo "=== Scaled Agile weekly sync — $STAMP  (window $FROM → $TO) ==="

step() { echo; echo "--- $1 ---"; }

step "1/6 refresh competition (Eastern-scored, headless browser)"
node automation/fetch-competition.mjs --from "$FROM" --to "$TO" || {
  node scripts/log-run.mjs --status failed --phase "fetch-competition" --from "$FROM" --to "$TO"
  exit 1
}

step "2/6 snapshot the partner calendar"
( cd automation && node dump-portal.mjs ) || {
  echo "FAILED to read the portal — the login profile has probably expired."
  echo "Fix: cd automation && node post-classes.mjs --login"
  node scripts/log-run.mjs --status failed --phase "dump-portal (login expired?)" --from "$FROM" --to "$TO"
  exit 1
}

step "3/6 what is actually selling"
node scripts/analyze-demand.mjs --json "$REPORTS/$STAMP-demand.json"

step "4/6 uncontested Eastern dates"
node scripts/portal-to-listings.mjs --portal automation/portal-state.json --out /tmp/sa-listings.json
node scripts/find-gaps.mjs --competition competition.json \
  --portal automation/portal-state.json --from "$FROM" --to "$TO"

step "5/6 build the plan"
node scripts/diff-classes.mjs --listings /tmp/sa-listings.json --days 70 > /tmp/sa-diff.json || exit 1
node scripts/select-batch.mjs --diff /tmp/sa-diff.json --competition competition.json \
  --portal automation/portal-state.json --from "$FROM" --to "$TO" > /tmp/sa-plan.json || exit 1
node scripts/to-automation-csv.mjs --plan /tmp/sa-plan.json

step "6/6 summary"
node -e '
const p = JSON.parse(require("fs").readFileSync("/tmp/sa-plan.json","utf8"));
const portal = JSON.parse(require("fs").readFileSync("automation/portal-state.json","utf8")).listings;
const pub = portal.filter(l => !/Private/i.test(l.type||"") && l.date >= new Date().toISOString().slice(0,10));
console.log(`already listed (public, upcoming): ${pub.length}`);
console.log(`proposed new classes: ${p.classes.length}`);
const byC = {};
for (const c of p.classes) byC[c.course] = (byC[c.course]||0)+1;
for (const [c,n] of Object.entries(byC).sort((a,b)=>b[1]-a[1])) console.log(`  ${n}  ${c}`);
const byD = {};
for (const c of p.classes) (byD[c.start] ||= []).push(`${c.course} (${c.instructor})`);
console.log("");
for (const d of Object.keys(byD).sort()) console.log(`  ${d}\n     ${byD[d].join("\n     ")}`);
'

step "logging the run"
node scripts/log-run.mjs --status ok --from "$FROM" --to "$TO" \
  --plan /tmp/sa-plan.json --portal automation/portal-state.json \
  --demand "$REPORTS/$STAMP-demand.json" --report "$REPORT"

echo
echo "=== review automation/classes.csv, then run: cd automation && node post-classes.mjs ==="
cp automation/classes.csv "$REPORTS/$STAMP-classes.csv" 2>/dev/null

{
  echo "# Scaled Agile sync — $STAMP"
  echo
  echo "Window: $FROM → $TO"
  echo
  echo '```'
  cat "$REPORTS/$STAMP.log"
  echo '```'
} > "$REPORT"
echo "report: $REPORT"
