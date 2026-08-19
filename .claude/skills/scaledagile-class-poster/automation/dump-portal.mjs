#!/usr/bin/env node
/**
 * Snapshot what is currently on the partner calendar → portal-state.json
 *
 * The planner needs this: the 4-per-day cap counts EVERYTHING already listed,
 * not just what a run is adding. Stacking four new classes onto a date that
 * already had one is what produced five classes on Sept 12.
 *
 *   node dump-portal.mjs
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { readInstructors } from "./lib-instructors.mjs";

const PORTAL = "https://community.scaledagile.com/s/course-admin";

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: true,
  viewport: { width: 1500, height: 950 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto(PORTAL, { waitUntil: "domcontentloaded" });

/** Scrape every row currently in the DOM, descending through shadow roots. */
const scrape = () =>
  page.evaluate(() => {
    const out = [];
    const walk = (r) => {
      r.querySelectorAll('[role="row"]').forEach((x) => {
        const c = [...x.querySelectorAll('[role="gridcell"],[role="rowheader"]')].map((v) =>
          v.innerText.trim().replace(/\s+/g, " ")
        );
        if (c.length >= 6) out.push({ name: c[0], date: c[2], instructors: Number(c[5]) || 0 });
      });
      r.querySelectorAll("*").forEach((e) => e.shadowRoot && walk(e.shadowRoot));
    };
    walk(document);
    return out;
  });

let rows = [];
for (let i = 0; i < 15; i++) {
  const c = page.getByRole("button", { name: /cancel and close/i });
  if (await c.count()) await c.first().click().catch(() => {});
  rows = await scrape();
  if (rows.length) break;
  await page.waitForTimeout(4000);
}

// The grid paginates: a <c-lwc-pager> in a shadow root with a page-size select
// (25/50/100) and two chevron buttons, reporting "1-25 of 1955" — 79 pages.
// Reading only page one compared Deadra's whole schedule against 25 listings
// and proposed classes that were already live (2026-08-19 Agile Product
// Management, which she caught). Scrolling does nothing here; the pager must be
// driven. Rows come back newest-first, so paging walks backwards in time —
// stop once the oldest loaded row predates today, because everything still to
// come has loaded by then.

/** Reach into the pager's shadow root; it is not reachable by CSS from document. */
const pagerDo = (action) =>
  page.evaluate((act) => {
    let pager = null;
    const walk = (r) => {
      r.querySelectorAll("*").forEach((e) => {
        if (e.tagName === "C-LWC-PAGER" && e.shadowRoot && !pager) pager = e;
        if (e.shadowRoot) walk(e.shadowRoot);
      });
    };
    walk(document);
    if (!pager) return "no-pager";
    const root = pager.shadowRoot;

    if (act === "maxPageSize") {
      const sel = root.querySelector("select");
      if (!sel) return "no-select";
      const biggest = [...sel.options].map((o) => Number(o.value)).sort((a, b) => b - a)[0];
      sel.value = String(biggest);
      sel.dispatchEvent(new Event("change", { bubbles: true }));
      return `size=${biggest}`;
    }

    // The last chevron is "next"; a disabled one is parked with pointer-events:none.
    const btns = [...root.querySelectorAll("lightning-button")];
    const next = btns[btns.length - 1];
    if (!next) return "no-next";
    if ((next.getAttribute("style") || "").includes("pointer-events: none")) return "exhausted";
    const inner = next.shadowRoot && next.shadowRoot.querySelector("button");
    (inner || next).click();
    return "clicked";
  }, action);

const oldestLoaded = async () => {
  const times = (await scrape())
    .map((r) => new Date(r.date).getTime())
    .filter((n) => !isNaN(n));
  return times.length ? new Date(Math.min(...times)).toISOString().slice(0, 10) : null;
};

console.log(`page size: ${await pagerDo("maxPageSize")}`);
await page.waitForTimeout(3000);
rows = await scrape();

const todayIso = new Date().toISOString().slice(0, 10);
const seen = new Map();
const keep = (rs) => rs.forEach((r) => seen.set(`${r.name}|${r.date}`, r));
keep(rows);

for (let i = 0; i < 40; i++) {
  const oldest = await oldestLoaded();
  if (oldest && oldest < todayIso) break;
  const res = await pagerDo("next");
  if (res !== "clicked") break;
  await page.waitForTimeout(2500);
  const batch = await scrape();
  if (!batch.length) break;
  keep(batch);
}
rows = [...seen.values()];
console.log(`grid rows after paging: ${rows.length}`);
// Instructor NAMES for upcoming classes. The planner needs these, not just a
// count: a trainer already teaching a live class that day cannot take a new
// one, and nobody teaches two classes at once.
const today = new Date().toISOString().slice(0, 10);
const upcoming = rows.filter((r) => {
  const d = new Date(r.date);
  return !isNaN(d) && d.toISOString().slice(0, 10) >= today && r.instructors > 0;
});
for (const r of upcoming) {
  try {
    await page.goto(PORTAL, { waitUntil: "domcontentloaded" });
    for (let i = 0; i < 12; i++) {
      const c = page.getByRole("button", { name: /cancel and close/i });
      if (await c.count()) await c.first().click().catch(() => {});
      if ((await page.getByRole("row").count()) > 3) break;
      await page.waitForTimeout(3000);
    }
    const row = page.getByRole("row").filter({ hasText: r.name }).filter({ hasText: r.date });
    if ((await row.count()) !== 1) continue;
    await row.first().getByRole("link").first().click();
    await page.waitForURL(/ilt-course/, { timeout: 30000 });
    await page.waitForTimeout(3500);
    // Instructor rows are the ones carrying an email address. Attendee rows do
    // too, so stop at the Attendees heading.
    // End date matters: a class running 9/16-9/18 occupies its trainer for all
    // three days, so overlap must be checked across the whole span, not just
    // the start date.
    const info = await page.locator("body").innerText();
    const m = info.match(/End Date\s*\n?\s*(\d{1,2}\/\d{1,2}\/\d{4})/);
    if (m) {
      const [mm, dd, yy] = m[1].split("/");
      r.endDate = `${yy}-${String(+mm).padStart(2, "0")}-${String(+dd).padStart(2, "0")}`;
    }
    // Only PUBLIC classes count toward the cap and the overlap rule — a
    // trainer may run a private class alongside a public one.
    r.type = (info.match(/Type\s*\n?\s*(Remote Public Course|Remote Private Course|Public Course|Private Course)/) || [])[1] || "";
    r.trainers = await readInstructors(page);
  } catch {
    /* leave trainers undefined; the planner just loses one clash check */
  }
}

await ctx.close();

if (!rows.length) {
  console.error("could not read the grid — run: node post-classes.mjs --login");
  process.exit(1);
}

// "Sep 12, 2026" → "2026-09-12" using local components (never Date→ISO, which
// shifts a day in US timezones).
const iso = (s) => {
  const d = new Date(s);
  if (isNaN(d)) return s;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const listings = rows.map((r) => ({ ...r, date: iso(r.date) })).sort((a, b) => a.date.localeCompare(b.date));
writeFileSync("portal-state.json", JSON.stringify({ capturedRows: listings.length, listings }, null, 2));

const byDate = {};
for (const l of listings) byDate[l.date] = (byDate[l.date] || 0) + 1;
console.log(`wrote portal-state.json — ${listings.length} listings`);
const over = Object.entries(byDate).filter(([, n]) => n > 4);
console.log(over.length ? `OVER CAP: ${over.map(([d, n]) => `${d}=${n}`).join(", ")}` : "no date over the 4-class cap");
