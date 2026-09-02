import type { Metadata } from "next";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";

const SITE = "https://www.agile36.com";

export function cityDisplayFromSlug(city: string): string {
  return city
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export type LocationSegment =
  | "leading-safe-certification-training"
  | "scrum-master-certification-training"
  | "release-train-engineer-certification-training"
  | "safe-for-teams-certification-training"
  | "lean-portfolio-management-certification-training"
  | "safe-product-owner-product-manager-certification-training"
  | "agile-product-management-certification-training";

/**
 * Two-field location SEO (same pattern as COURSE_SEO):
 * - `title` — shorter SERP base (city appended in builder)
 * - `long`  — H1 / og:title base (city appended in builder)
 */
const META: Record<
  LocationSegment,
  { title: string; long: string; descriptionLead: string }
> = {
  "leading-safe-certification-training": {
    title: "Leading SAFe® 6.0 Certification Training",
    long: "AI-Empowered Leading SAFe® 6.0 Training with SAFe Agilist Certification",
    descriptionLead: "Live virtual Leading SAFe 6.0 training",
  },
  "scrum-master-certification-training": {
    title: "SAFe Scrum Master Certification Training",
    long: "AI-Empowered SAFe® 6.0 Scrum Master (SSM) Certification Training",
    descriptionLead: "Live virtual SAFe Scrum Master (SSM) training",
  },
  "release-train-engineer-certification-training": {
    title: "SAFe Release Train Engineer Certification Training",
    long: "AI-Empowered SAFe® Release Train Engineer (RTE) Certification Training",
    descriptionLead: "Live virtual SAFe Release Train Engineer (RTE) training",
  },
  "safe-for-teams-certification-training": {
    title: "SAFe for Teams (SP) Certification Training",
    long: "AI-Empowered SAFe® 6.0 for Teams Certification Training",
    descriptionLead: "Live virtual SAFe for Teams / SAFe Practitioner training",
  },
  "lean-portfolio-management-certification-training": {
    title: "SAFe Lean Portfolio Management Certification Training",
    long: "AI-Empowered SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training",
    descriptionLead: "Live virtual SAFe Lean Portfolio Management (LPM) training",
  },
  "safe-product-owner-product-manager-certification-training": {
    title: "SAFe Product Owner/Manager Certification Training",
    long: "AI-Empowered SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training",
    descriptionLead: "Live virtual SAFe POPM training",
  },
  "agile-product-management-certification-training": {
    title: "SAFe Agile Product Management Certification Training",
    long: "AI-Empowered SAFe® 6.0 Agile Product Management (APM) Certification Training",
    descriptionLead: "Live virtual SAFe Agile Product Management training",
  },
};

export function getLocationCourseTitle(segment: LocationSegment): {
  title: string;
  long: string;
} {
  const { title, long } = META[segment];
  return { title, long };
}

/** @deprecated Prefer getLocationCourseTitle(segment).long */
export function getLocationCourseTitleString(segment: LocationSegment): string {
  return META[segment].title;
}

export function buildLocationTrainingMetadata(
  segment: LocationSegment,
  citySlug: string
): Metadata {
  const cityDisplay = cityDisplayFromSlug(citySlug);
  const { title, long, descriptionLead } = META[segment];
  const canonical = `${SITE}/${segment}/${citySlug}`;
  const documentTitle = `${title} (2026) in ${cityDisplay} | Agile36`;
  const ogTitle = `${long} (2026) in ${cityDisplay} | Agile36`;

  return {
    title: documentTitle,
    description: `2026 schedule: ${descriptionLead} for ${cityDisplay}-area professionals. Live virtual cohorts — no travel. SAFe Silver Partner instructors; certification-focused delivery.`,
    alternates: {
      canonical,
    },
    openGraph: {
      images: [...DEFAULT_OG_IMAGES],
      title: ogTitle,
      url: canonical,
      siteName: "Agile36",
      type: "website",
    },
    ...(segment === "release-train-engineer-certification-training"
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
