#!/usr/bin/env node
/**
 * Independent check that classes after a cutoff really are private.
 *
 *   node audit-private.mjs [--after 2026-11-18]
 *
 * Deliberately separate from privatize-classes.mjs. PORTAL-NOTES.md records
 * why: a timezone run verified its own work with the same loose string it had
 * written with, reported 37 OK, and had in fact put 41 live classes on
 * Australian time. A change is only confirmed by a pass that re-reads the page
 * on its own terms.
 *
 * Reads each class's live detail page — not portal-state.json, not the run's
 * own results file.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const AFTER = opt("after", "2026-11-18");

const listings = (JSON.parse(readFileSync("portal-state.json", "utf8")).listings ?? [])
  .filter((l) => l.href && l.date > AFTER)
  .sort((a, b) => a.date.localeCompare(b.date));

console.log(`auditing ${listings.length} listings after ${AFTER}\n`);

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: true,
  viewport: { width: 1500, height: 1000 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());
const rows = [];

for (const l of listings) {
  let body = "";
  try {
    await page.goto(l.href, { waitUntil: "domcontentloaded" });
    for (let i = 0; i < 25; i++) {
      body = await page.locator("body").innerText().catch(() => "");
      if (/Provider Name/i.test(body)) break;
      await page.waitForTimeout(2000);
    }
  } catch {
    /* fall through to unknown */
  }
  // Read the type off the page itself rather than trusting anything cached.
  const type = (body.match(/Type\s*\n\s*(Remote Private Course|Remote Public Course|Private Course|Public Course)/) || [])[1] || "unknown";
  const att = Number((body.match(/Total Attendees\s*\n\s*(\d+)/) || [])[1] || 0);
  rows.push({ date: l.date, name: l.name, type, attendees: att, href: l.href });
  const flag = type === "Remote Private Course" ? "private" : type === "unknown" ? "UNKNOWN" : "PUBLIC";
  console.log(`  ${l.date}  ${String(l.name).slice(0, 44).padEnd(44)}  ${flag}${att ? `  (${att} attendees)` : ""}`);
}

await ctx.close();

const priv = rows.filter((r) => r.type === "Remote Private Course");
const pub = rows.filter((r) => r.type === "Remote Public Course" || r.type === "Public Course");
const unknown = rows.filter((r) => r.type === "unknown");

console.log(`\nprivate ${priv.length} | still public ${pub.length} | unreadable ${unknown.length}`);
if (pub.length) {
  console.log("\nSTILL PUBLIC:");
  for (const r of pub)
    console.log(`  ${r.date}  ${String(r.name).slice(0, 46)}${r.attendees ? `  (${r.attendees} attendees — type is locked)` : ""}`);
}
writeFileSync("audit-private.json", JSON.stringify(rows, null, 2));
