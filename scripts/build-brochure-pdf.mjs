#!/usr/bin/env node
/**
 * Render a course brochure from content/brochures/<name>.html to a print-ready
 * PDF in public/brochures/. Uses the Chromium that ships with Playwright.
 *
 *   node scripts/build-brochure-pdf.mjs popm-brochure AI-Empowered-SAFe-POPM-Brochure-Agile36
 */
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const [source, outName] = process.argv.slice(2);
if (!source) {
  console.error("usage: build-brochure-pdf.mjs <html-basename> [pdf-basename]");
  process.exit(1);
}

const htmlPath = path.join(root, "content/brochures", `${source}.html`);
if (!fs.existsSync(htmlPath)) {
  console.error(`no such brochure source: ${htmlPath}`);
  process.exit(1);
}

const outDir = path.join(root, "public/brochures");
fs.mkdirSync(outDir, { recursive: true });
const pdfPath = path.join(outDir, `${outName || source}.pdf`);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: pdfPath,
  format: "Letter",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});
await browser.close();

const kb = (fs.statSync(pdfPath).size / 1024).toFixed(0);
console.log(`wrote ${path.relative(root, pdfPath)} (${kb} KB)`);
