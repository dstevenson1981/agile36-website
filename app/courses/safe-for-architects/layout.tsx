import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { faqPageJsonLd } from "@/app/lib/faq-page-jsonld";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("safe-for-architects"),
  description:
    "2026 live cohorts: Earn your SAFe for Architects (ARCH) certification with Agile36. 3-day live training covering Agile architecture, architectural runway, solution intent, and PI planning. SAFe Silver Partner. Exam included. Enroll now. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "SAFe for Architects",
    "SAFe ARCH certification",
    "SAFe Architects training",
    "SAFe 6.0 Architects",
    "Agile architecture",
    "architectural runway",
    "solution intent",
    "system architect SAFe",
    "enterprise architect certification",
    "solution architect training",
    "SAFe ARCH certification USA",
    "SAFe for Architects course",
    "ARCH training online",
    "SAFe certification training",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("safe-for-architects"),
    description:
      "2026: Master SAFe for Architects (ARCH) Certification Training. Learn Agile architecture, architectural runway, and solution intent. Earn 24 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/safe-for-architects",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("safe-for-architects"),
    description:
      "2026: Master SAFe for Architects (ARCH) Certification Training. Learn Agile architecture, architectural runway, and solution intent.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/safe-for-architects",
  },
};

export default async function SafeForArchitectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("safe-for-architects");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "safe-for-architects",
      canonical: "https://www.agile36.com/courses/safe-for-architects",
      schedulePath: "/courses/safe-for-architects/schedule",
      courseDisplayName: "SAFe® 6.0 for Architects (ARCH) Certification Training",
      description:
        "SAFe for Architects (ARCH) certification teaches system, solution, and enterprise architects how to align architecture with business value, plan architectural runway, contribute to PI Planning, and lead Agile architecture in a Lean-Agile enterprise.",
      teaches: [
        "Agile Architecture and the SAFe Architect role",
        "Architecture for DevOps and Release on Demand",
        "Aligning architecture with business value",
        "Solution Vision, Solution Intent, and roadmaps",
        "Architectural runway and enabler epics",
        "Preparing architecture for PI Planning",
        "Supporting continuous delivery during PI execution",
        "Leading as an Architect during Lean-Agile transformation",
      ],
      breadcrumbLeafName: "SAFe for Architects",
      coursesCrumbLabel: "SAFe Courses",
      defaultPrice: 1399,
      defaultCurrency: "USD",
      timeRequired: "PT24H",
      courseCode: "ARCH",
      coursePrerequisites:
        "Experience as a system, solution, or enterprise architect recommended. Prior SAFe course helpful but not required.",
      educationalCredentialAwarded: "SAFe for Architects (ARCH) Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("safe-for-architects");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
