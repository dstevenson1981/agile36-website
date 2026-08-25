#!/usr/bin/env node
/**
 * Set timezone and city/state on existing portal listings.
 *
 *   node retime-classes.mjs --dry-run      # list what would change
 *   node retime-classes.mjs --limit 1      # prove it on one class first
 *   node retime-classes.mjs                # the whole batch
 *
 * This reuses the interaction pattern from post-classes.mjs, which has always
 * worked. Earlier versions of this file failed for a whole day because they
 * invented their own: they scoped to the page instead of the dialog, matched
 * `lightning-combobox` elements instead of the combobox ROLE, and typed into
 * fields instead of filling them (which appended — "New YorkMiami").
 *
 * Nothing is cancelled, no dates move, no instructors change. Two fields only.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const FROM = opt("from", "2026-08-27");
const LIMIT = Number(opt("limit", "0")) || Infinity;

const config = JSON.parse(readFileSync("../config.json", "utf8"));
const TZ = config.timezonePortalLabels["America/New_York"];
const CITIES = config.postingPolicy.cities;

const RETRY = args.includes("--retry");
const targets = RETRY
  ? JSON.parse(readFileSync("retry.json", "utf8"))
  : (JSON.parse(readFileSync("portal-state.json", "utf8")).listings ?? [])
      .filter((l) => l.href && l.date >= FROM)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((l, i) => ({ ...l, ...CITIES[i % CITIES.length] }))
      .slice(0, LIMIT);

const log = (s) => console.log(s);
log(`${targets.length} listings from ${FROM}${DRY ? "  (DRY RUN)" : ""}`);
log(`timezone → "${TZ}"   cities → ${CITIES.map((c) => `${c.city}, ${c.state}`).join(" / ")}\n`);

if (DRY) {
  for (const t of targets)
    log(`  ${t.date}  ${String(t.name).slice(0, 40).padEnd(40)}  → ${t.city}, ${t.state}`);
  process.exit(0);
}

/** Straight from post-classes.mjs — the version that works. */
async function pickCombo(scope, label, optionText) {
  // Match the DOM name attribute, not the accessible name. The create modal
  // exposes these as labelled comboboxes; the edit panel does not, so
  // getByRole({name}) matches nothing and times out.
  // The [name] element is the lightning-combobox host, which has no box of its
  // own — clicking it times out. The real control is the button inside.
  const host = scope.locator(`[name="${label}"]`).first();
  const combo = host.locator("button, input").first();
  await combo.scrollIntoViewIfNeeded().catch(() => {});
  await combo.click({ timeout: 12000 }).catch(async () => {
    await host.click({ force: true, timeout: 12000 });
  });
  await scope.page().waitForTimeout(400);
  // The portal renders "GMT−05:00" with a Unicode minus (U+2212), so a literal
  // "GMT-05:00 …" never matches. Match on the distinctive words instead.
  // Stripping the GMT prefix to dodge the Unicode minus made "Eastern Standard
  // Time" match "GMT+10:00 AUSTRALIAN Eastern Standard Time" — which is what it
  // picked, and the verification checked the same loose string so it passed.
  // Anchor on the offset with either dash, and exclude Australian explicitly.
  const want =
    optionText instanceof RegExp
      ? optionText
      : new RegExp(
          "^" + String(optionText).replace(/[-\u2212\u2013]/g, "[-\u2212\u2013]") + "$",
          "i"
        );
  await scope.page().getByRole("option", { name: want }).first().click({ timeout: 15000 });
  await scope.page().waitForTimeout(400);
}

const ctx = await chromium.launchPersistentContext(".profile", {
  headless: true,
  viewport: { width: 1500, height: 1000 },
});
const page = ctx.pages()[0] ?? (await ctx.newPage());
const results = [];

for (const t of targets) {
  const label = `${t.date}  ${String(t.name).slice(0, 38)}  → ${t.city}, ${t.state}`;
  try {
    await page.goto(t.href, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(6000);

    const body = await page.locator("body").innerText();
    if (/Remote Private Course/.test(body)) {
      log(`SKIP  ${label}  (private)`);
      results.push({ ...t, status: "skipped-private" });
      continue;
    }

    // The edit panel IS a dialog — the failures were the combobox names. In the
    // create modal they resolve by label ("Timezone"); here they resolve by
    // Salesforce API name (Timezone__c, State_Province__c). Same fields, same
    // container type, different accessible names.
    await page.getByText(/^Basic Info$/i).first().click({ timeout: 20000 });
    await page.waitForTimeout(2500);
    const dialog = (await page.getByRole("dialog").count())
      ? page.getByRole("dialog").first()
      : page.locator("body");
    await page.waitForTimeout(2000);
    console.log(`      [diag] dialogs=${await page.getByRole("dialog").count()} ` +
      `comboboxes=${await page.getByRole("combobox").count()} ` +
      `tzAttr=${await page.locator('[name="Timezone__c"]').count()}`);

    await pickCombo(dialog, "Timezone__c", TZ);

    // fill() replaces; typing appends onto the existing value.
    await dialog.getByRole("textbox", { name: "City" }).fill(t.city);
    await page.waitForTimeout(800);
    await pickCombo(dialog, "State_Province__c", t.state);

    // post-classes.mjs learned this the hard way: the timezone silently
    // reverts if focus moves too quickly. Check and re-pick before saving.
    const tz = await dialog.locator('[name="Timezone__c"]').first().innerText().catch(() => "");
    if (!/Eastern Standard Time/i.test(tz) || /Australian|GMT\+/i.test(tz)) await pickCombo(dialog, "Timezone__c", TZ);

    await dialog.getByRole("button", { name: /^Save/i }).first().click();
    // The detail page repaints asynchronously after save; verifying at 5s
    // reported false failures on classes that had in fact saved correctly.
    let after = "";
    for (let i = 0; i < 8; i++) {
      await page.waitForTimeout(2500);
      after = await page.locator("body").innerText();
      if (/Eastern Standard Time/i.test(after) && !/Australian|GMT\+/i.test(after) && after.includes(t.city)) break;
    }
    if (!/Eastern Standard Time/i.test(after) || /Australian Eastern Standard/i.test(after))
      throw new Error(`saved but timezone wrong: ${(after.match(/GMT[^\n]{0,40}/) || ["?"])[0]}`);
    if (!after.includes(t.city)) throw new Error(`saved but city ${t.city} missing`);

    log(`OK    ${label}`);
    results.push({ ...t, status: "updated" });
  } catch (err) {
    log(`FAIL  ${label}\n      ${err.message.split("\n")[0]}`);
    results.push({ ...t, status: "failed", error: err.message.split("\n")[0] });
  }
}

const n = (s) => results.filter((r) => r.status === s).length;
log(`\nupdated ${n("updated")} | private ${n("skipped-private")} | failed ${n("failed")}`);
writeFileSync("retime-results.json", JSON.stringify(results, null, 2));
await ctx.close();
