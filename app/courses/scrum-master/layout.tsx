import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { mergeCourseAeoGraph } from "@/app/lib/course-aeo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("scrum-master"),
  description: "SAFe Scrum Master (SSM) costs $515. Two-day live online class with two exam attempts included. Scaled Agile Silver Partner. Next dates are on this page. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "SAFe Scrum Master",
    "SAFe SSM certification",
    "Scrum Master training",
    "SAFe 6.0 SSM",
    "team facilitation",
    "PI planning",
    "Agile Release Train",
    "impediment removal",
    "servant leadership",
    "Agile coaching",
    "Scrum Master certification",
    "SAFe SSM certification USA",
    "Scrum Master course",
    "SAFe Scrum Master certification",
    "SSM training online",
    "SAFe certification training"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("scrum-master"),
    description: "SAFe Scrum Master (SSM) costs $515. Two-day live online class with two exam attempts included.",
    type: "website",
    url: "https://www.agile36.com/courses/scrum-master",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("scrum-master"),
    description: "SAFe Scrum Master (SSM) costs $515. Two-day live online class with two exam attempts included.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/scrum-master",
  },
};

export default async function ScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "scrum-master-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd("scrum-master-certification-training", {
    courseDisplayName: "SAFe® 6.0 AI-Empowered Scrum Master (SSM) Certification Training",
    description:
      "SAFe Scrum Master (SSM) certification teaches Scrum Masters to facilitate Agile teams within SAFe. Learn team ceremonies, PI Planning participation, impediment removal, servant leadership, ART support, and how to coach teams in large-scale Agile environments.",
    courseCode: "SSM",
    coursePrerequisites: "Scrum Master experience or Agile team facilitation recommended",
    teaches: [
      "Team Facilitation in SAFe",
      "Program Increment (PI) Planning Support",
      "Impediment Removal and Escalation",
      "Agile Release Train Coordination",
      "Servant Leadership Practices",
      "Agile Team Coaching",
      "Scrum Ceremonies at Scale",
      "Continuous Improvement and Inspect & Adapt",
    ],
    breadcrumbLeafName: "SAFe Scrum Master",
    coursesCrumbLabel: "SAFe Courses",
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 2500,
      bestRating: 5,
      worstRating: 1,
    },
  },
  scheduleResult);


  const pageSchema = mergeCourseAeoGraph(courseGraphLd, getCatalogLanding("scrum-master"));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  );
}

