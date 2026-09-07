#!/usr/bin/env tsx
/**
 * Generate course brochure PDFs into public/brochures/.
 *
 *   npx tsx scripts/build-brochures.ts              # every course
 *   npx tsx scripts/build-brochures.ts popm ssm     # named slugs only
 *
 * Content is read from the live catalog landing data plus the supplements in
 * content/brochures/lib/courses.ts, so a brochure cannot state a price,
 * schedule, or outcome the website does not already publish.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { BROCHURE_COURSES } from "@/content/brochures/lib/courses";
import { renderBrochure } from "@/content/brochures/lib/template";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/brochures");
const htmlDir = path.join(root, "content/brochures/generated");

/** Stable public filename per course. Changing one orphans an existing link. */
export const BROCHURE_FILE: Record<string, string> = {
  "product-owner-manager": "AI-Empowered-SAFe-POPM-Brochure-Agile36",
  "leading-safe": "AI-Empowered-Leading-SAFe-Brochure-Agile36",
  "scrum-master": "AI-Empowered-SAFe-Scrum-Master-Brochure-Agile36",
  "advanced-scrum-master": "AI-Empowered-SAFe-Advanced-Scrum-Master-Brochure-Agile36",
  "safe-for-teams": "AI-Empowered-SAFe-for-Teams-Brochure-Agile36",
  "release-train-engineer": "AI-Empowered-SAFe-RTE-Brochure-Agile36",
  "lean-portfolio-management": "SAFe-Lean-Portfolio-Management-Brochure-Agile36",
  "agile-product-management": "SAFe-Agile-Product-Management-Brochure-Agile36",
  "safe-for-architects": "SAFe-for-Architects-Brochure-Agile36",
  devops: "SAFe-DevOps-Brochure-Agile36",
  "value-stream-mapping": "Value-Stream-Mapping-Brochure-Agile36",
  "responsible-ai": "Responsible-AI-Brochure-Agile36",
};

async function main() {
  const want = process.argv.slice(2);
  const slugs = Object.keys(BROCHURE_COURSES).filter(
    (s) => !want.length || want.some((w) => s.includes(w)),
  );
  if (!slugs.length) {
    console.error(`no brochure course matched: ${want.join(", ")}`);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(htmlDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const slug of slugs) {
    const course = BROCHURE_COURSES[slug];
    const landing = getCatalogLanding(slug);
    const html = renderBrochure(course, landing);

    const htmlPath = path.join(htmlDir, `${slug}.html`);
    fs.writeFileSync(htmlPath, html);

    const file = BROCHURE_FILE[slug];
    if (!file) throw new Error(`no public filename registered for ${slug}`);
    const pdfPath = path.join(outDir, `${file}.pdf`);

    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: pdfPath,
      format: "Letter",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    const kb = (fs.statSync(pdfPath).size / 1024).toFixed(0);
    console.log(`${slug.padEnd(28)} -> public/brochures/${file}.pdf (${kb} KB)`);
  }

  await browser.close();
}

main();
