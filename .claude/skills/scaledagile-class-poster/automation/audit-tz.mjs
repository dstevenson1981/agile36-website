import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const all = JSON.parse(readFileSync("portal-state.json","utf8")).listings
  .filter(l=>l.href && l.date>="2026-08-27").sort((a,b)=>a.date.localeCompare(b.date));
const ctx = await chromium.launchPersistentContext(".profile",{headless:true,viewport:{width:1500,height:1000}});
const page = ctx.pages()[0] ?? await ctx.newPage();
const out=[];
for (const c of all) {
  try {
    await page.goto(c.href,{waitUntil:"domcontentloaded"});
    await page.waitForTimeout(7000);
    for (let i=0;i<6;i++){ if(/Timezone/.test(await page.locator("body").innerText())) break; await page.waitForTimeout(2000); }
    const b = await page.locator("body").innerText();
    const tz = ((b.match(/Timezone\s*\n?\s*(.{0,46})/)||[])[1]||"").trim().split("\n")[0];
    const city = ((b.match(/\bCity\s*\n?\s*([A-Za-z ]{0,24})/)||[])[1]||"").trim();
    const bad = /Australian|GMT\+/i.test(tz) || !/Eastern Standard Time/i.test(tz);
    out.push({...c, tz, city, bad});
    console.log(`${bad?"BAD ":"ok  "} ${c.date}  ${tz.slice(0,42).padEnd(42)} ${city}`);
  } catch(e){ out.push({...c, tz:"ERR", bad:true}); console.log(`ERR  ${c.date}`); }
}
writeFileSync("audit-tz.json",JSON.stringify(out,null,2));
console.log(`\nBAD: ${out.filter(x=>x.bad).length} of ${out.length}`);
await ctx.close();
