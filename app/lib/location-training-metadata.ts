import type { Metadata } from "next";

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

const META: Record<
  LocationSegment,
  { titleCourse: string; descriptionLead: string }
> = {
  "leading-safe-certification-training": {
    titleCourse: "Leading SAFe® 6.0 Certification Training",
    descriptionLead: "Live virtual Leading SAFe 6.0 training",
  },
  "scrum-master-certification-training": {
    titleCourse: "SAFe Scrum Master Certification Training",
    descriptionLead: "Live virtual SAFe Scrum Master (SSM) training",
  },
  "release-train-engineer-certification-training": {
    titleCourse: "SAFe Release Train Engineer Certification Training",
    descriptionLead: "Live virtual SAFe Release Train Engineer (RTE) training",
  },
  "safe-for-teams-certification-training": {
    titleCourse: "SAFe for Teams (SAFe Practitioner) Certification Training",
    descriptionLead: "Live virtual SAFe for Teams / SAFe Practitioner training",
  },
  "lean-portfolio-management-certification-training": {
    titleCourse: "SAFe Lean Portfolio Management Certification Training",
    descriptionLead: "Live virtual SAFe Lean Portfolio Management (LPM) training",
  },
  "safe-product-owner-product-manager-certification-training": {
    titleCourse: "SAFe Product Owner / Product Manager Certification Training",
    descriptionLead: "Live virtual SAFe POPM training",
  },
  "agile-product-management-certification-training": {
    titleCourse: "SAFe Agile Product Management Certification Training",
    descriptionLead: "Live virtual SAFe Agile Product Management training",
  },
};

export function getLocationCourseTitle(segment: LocationSegment): string {
  return META[segment].titleCourse;
}

export function buildLocationTrainingMetadata(
  segment: LocationSegment,
  citySlug: string
): Metadata {
  const cityDisplay = cityDisplayFromSlug(citySlug);
  const { titleCourse, descriptionLead } = META[segment];
  const canonical = `${SITE}/${segment}/${citySlug}`;

  return {
    title: `${titleCourse} (2026) in ${cityDisplay} | Agile36`,
    description: `2026 schedule: ${descriptionLead} for ${cityDisplay}-area professionals. Live virtual cohorts — no travel. SAFe Silver Partner instructors; certification-focused delivery.`,
    alternates: {
      canonical,
    },
    openGraph: {
      url: canonical,
      siteName: "Agile36",
      type: "website",
    },
  };
}
