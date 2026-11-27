import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { faqPageJsonLd } from "@/app/lib/faq-page-jsonld";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("safe-for-teams"),
  description: "Earn your SAFe Practitioner (SP) certification in a live 2-day SAFe for Teams course taught by certified SPCs. Exam included, weekday and weekend cohorts, 16 PDUs. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "SAFe for Teams",
    "SAFe Practitioner certification",
    "SAFe SP certification",
    "SAFe 6.0 for Teams",
    "team collaboration",
    "iteration planning",
    "Agile Release Train",
    "PI planning",
    "Lean-Agile",
    "Agile team member",
    "SAFe Practitioner certification USA",
    "SAFe for Teams course",
    "SAFe for Teams certification",
    "SP training online",
    "SAFe certification training"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("safe-for-teams"),
    description: "Live 2-day SAFe for Teams (SP) course taught by certified SPCs. Exam included, weekday and weekend cohorts, 16 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/safe-for-teams",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("safe-for-teams"),
    description: "Live 2-day SAFe for Teams (SP) course taught by certified SPCs. Exam included, weekday and weekend cohorts.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/safe-for-teams",
  },
};

export default async function SafeForTeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "safe-for-teams-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd("safe-for-teams-certification-training", {
    courseDisplayName: "SAFe® 6.0 for Teams Certification Training",
    description:
      "SAFe for Teams (SAFe Practitioner) certification teaches Agile team members to work effectively in SAFe. Learn iteration planning, PI Planning participation, team collaboration, defining stories, estimating work, and delivering value as part of an Agile Release Train.",
    courseCode: "SP",
    coursePrerequisites:
      "None. Open to all team members including developers, testers, business analysts, and technical writers.",
    teaches: [
      "Team Collaboration in SAFe",
      "Iteration Planning and Execution",
      "Program Increment (PI) Planning Participation",
      "Writing and Refining User Stories",
      "Agile Release Train Dynamics",
      "Continuous Integration and DevOps Basics",
      "Team Ceremonies and Events",
      "Cross-Functional Team Practices",
    ],
    breadcrumbLeafName: "SAFe for Teams",
    coursesCrumbLabel: "SAFe Courses",
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 2500,
      bestRating: 5,
      worstRating: 1,
    },
  },
  scheduleResult);

  const faqSchema = faqPageJsonLd("safe-for-teams");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}



