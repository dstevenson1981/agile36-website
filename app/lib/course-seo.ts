/**
 * Course SEO: one registry, two explicit fields (never derive by string surgery).
 *
 * - `title` — ≤ ~60 chars including " | Agile36" → <title> / SERP
 * - `long`  — full commercial name → og:title (+ " | Agile36"), twitter:title, H1
 */

export const COURSE_SEO = {
  "lean-portfolio-management": {
    title: "SAFe Lean Portfolio Management (LPM) Certification | Agile36",
    long: "AI-Empowered SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training (2026)",
  },
  "product-owner-manager": {
    title: "SAFe Product Owner/Manager (POPM) Certification | Agile36",
    long: "AI-Empowered SAFe® Product Owner / Product Manager (POPM) Certification Training",
  },
  "agile-product-management": {
    title: "SAFe Agile Product Management (APM) Certification | Agile36",
    long: "AI-Empowered SAFe® 6.0 Agile Product Management (APM) Certification Training (2026)",
  },
  "safe-for-architects": {
    title: "SAFe for Architects (ARCH) Certification | Agile36",
    long: "SAFe® 6.0 for Architects (ARCH) Certification Training (2026)",
  },
  devops: {
    title: "SAFe DevOps Practitioner (SDP) Certification | Agile36",
    long: "AI-Empowered SAFe® 6.0 DevOps (SDP) Certification Training (2026)",
  },
  "value-stream-mapping": {
    title: "SAFe Value Stream Mapping Certification | Agile36",
    long: "SAFe® Value Stream Mapping Certification Training (2026)",
  },
  "advanced-scrum-master": {
    title: "SAFe Advanced Scrum Master (SASM) Certification | Agile36",
    long: "AI-Empowered SAFe® 6.0 Advanced Scrum Master (SASM) Certification Training (2026)",
  },
  "leading-safe": {
    title: "Leading SAFe® 6.0 Agilist (SA) Certification | Agile36",
    long: "AI-Empowered Leading SAFe® 6.0 Training with SAFe Agilist Certification (2026)",
  },
  "scrum-master": {
    title: "SAFe Scrum Master (SSM) Certification Training | Agile36",
    long: "AI-Empowered SAFe® 6.0 Scrum Master (SSM) Certification Training (2026)",
  },
  "release-train-engineer": {
    title: "SAFe Release Train Engineer (RTE) Certification | Agile36",
    long: "AI-Empowered SAFe® Release Train Engineer (RTE) Certification Training (2026)",
  },
  "safe-for-teams": {
    title: "SAFe for Teams (SP) Certification Training | Agile36",
    long: "AI-Empowered SAFe® 6.0 for Teams Certification Training (2026)",
  },
  "ai-agent-builder": {
    title: "No-Code AI Agents & Automation™ Certification | Agile36",
    long: "No-Code AI Agents & Automation™ Certification Training (2026)",
  },
  "ai-driven-scrum-master": {
    title: "AI-Driven Scrum Master™ Certification | Agile36",
    long: "AI-Driven Scrum Master™ Certification Training (2026)",
  },
  "certified-ai-product-manager": {
    title: "Certified AI Product Manager™ Training | Agile36",
    long: "Certified AI Product Manager™ Certification Training (2026)",
  },
  "certified-genai-practitioner": {
    title: "Certified GenAI Practitioner™ Training | Agile36",
    long: "Certified GenAI Practitioner™ Certification Training (2026)",
  },
  "executive-genai-leadership": {
    title: "Executive GenAI Leadership™ Certification | Agile36",
    long: "Executive GenAI Leadership™ Certification Training (2026)",
  },
  "generative-ai-project-managers": {
    title: "Generative AI for Project Managers Training | Agile36",
    long: "Generative AI for Project Managers Certification Training (2026)",
  },
  "responsible-ai": {
    title: "Responsible AI with SAFe Micro-credential | Agile36",
    long: "Achieving Responsible AI with SAFe Micro-credential Course (2026)",
  },
} as const;

export type CourseSeoSlug = keyof typeof COURSE_SEO;

export function courseTitle(slug: CourseSeoSlug): string {
  return COURSE_SEO[slug].title;
}

/** Long form for H1 and twitter:title (no brand suffix). */
export function courseLong(slug: CourseSeoSlug): string {
  return COURSE_SEO[slug].long;
}

/** Long form + brand — for openGraph.title. */
export function courseOgTitle(slug: CourseSeoSlug): string {
  return `${COURSE_SEO[slug].long} | Agile36`;
}

/** Char lengths for SERP audits (title includes " | Agile36"). */
export function courseTitleCharCount(slug: CourseSeoSlug): number {
  return COURSE_SEO[slug].title.length;
}
