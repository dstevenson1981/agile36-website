#!/usr/bin/env node
/**
 * Turn a select-batch.mjs plan into the CSV that automation/post-classes.mjs
 * consumes — mapping each course to its portal Learning Plan and the
 * "{Course}- Guaranteed to Run" class name from config.json.
 *
 *   node to-automation-csv.mjs --plan <sept-plan.json> --out ../automation/classes.csv
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, "..", "config.json"), "utf8"));

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const planPath = opt("plan");
if (!planPath) {
  console.error("Missing --plan <select-batch output>");
  process.exit(1);
}
const outPath = resolve(here, opt("out", "../automation/classes.csv"));

const slugOf = Object.fromEntries(
  Object.entries(config.courses).map(([slug, m]) => [m.safeName, slug])
);

// 24h "09:00:00" → "9:00 AM", which is what the portal's time field expects.
const ampm = (t) => {
  const [h, m] = (t || "09:00:00").split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
};

const plan = JSON.parse(readFileSync(planPath, "utf8"));
const rows = plan.classes.map((c) => {
  const slug = slugOf[c.course];
  const map = config.portal.courseMap[slug];
  if (!map) throw new Error(`no portal courseMap entry for ${c.course}`);
  return {
    start: c.start,
    end: c.end,
    class_name: map.className,
    learning_plan: map.learningPlan,
    start_time: ampm(c.startTime),
    timezone: c.portalTimezoneLabel,
    city: "New York",
    state: "New York",
    trainer: c.instructor,
    registration_url: c.registrationUrl,
  };
});

const head = Object.keys(rows[0]);
const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
writeFileSync(
  outPath,
  [head.join(","), ...rows.map((r) => head.map((h) => esc(r[h])).join(","))].join("\n") + "\n"
);
console.log(`wrote ${rows.length} classes → ${outPath}`);
