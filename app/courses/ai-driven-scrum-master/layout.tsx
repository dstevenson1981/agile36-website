import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { mergeCourseAeoGraph } from "@/app/lib/course-aeo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("ai-driven-scrum-master"),
  description: "2026 live cohorts: Two days, 4 hours per day. Build reusable AI skills and automated Scrum workflows, then leave with the AI-Driven Scrum Master™ certification issued through Accredible. Rated 4.9/5 from Agile36 learners.",
  keywords: [
    "AI-Driven Scrum Master",
    "AI Scrum Master",
    "Scrum Master AI",
    "AI-enhanced Scrum",
    "Agile AI tools",
    "AI team facilitation",
    "AI backlog refinement",
    "AI sprint planning",
    "Scrum Master training",
    "AI coaching",
    "Generative AI for Scrum",
    "AI Scrum practices"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("ai-driven-scrum-master"),
    description: "2026: Two days, 4 hours per day. Build reusable AI skills and automated Scrum workflows. Leave with the AI-Driven Scrum Master™ certification.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-driven-scrum-master",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("ai-driven-scrum-master"),
    description: "2026: Two days, 4 hours per day. Build reusable AI skills and automated Scrum workflows. Leave with the AI-Driven Scrum Master™ certification.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/ai-driven-scrum-master",
  },
};

export default async function AIDrivenScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("ai-driven-scrum-master");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "ai-driven-scrum-master",
      canonical: "https://www.agile36.com/courses/ai-driven-scrum-master",
      schedulePath: "/courses/ai-driven-scrum-master/schedule",
      courseDisplayName: "AI-Driven Scrum Master™ Certification Training",
      description:
        "Live two-day AI-Driven Scrum Master™ certification. Day 1 is AI skills for Scrum Masters. Day 2 is reusable skills, automated workflows, and a capstone system. Issued through Accredible. No exam.",
      teaches: [
        "The AI-Empowered Scrum Master",
        "Working Effectively with AI",
        "Sprint and Team Intelligence",
        "AI-Powered Scrum Events",
        "Backlog and Story Analysis",
        "AI for Coaching and Facilitation",
        "Creating Reusable AI Skills",
        "Sprint Health Skill",
        "Facilitation and Retrospective Skills",
        "Designing Automated Workflows",
        "Automating Scrum Master Work",
        "Capstone: Build Your AI Scrum Master System",
      ],
      breadcrumbLeafName: "AI-Driven Scrum Master",
      coursesCrumbLabel: "Generative AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "AI-SM",
      coursePrerequisites:
        "Scrum Master experience or Agile facilitation background recommended",
      educationalCredentialAwarded: "AI-Driven Scrum Master™ Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 234,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );


  const pageSchema = mergeCourseAeoGraph(courseGraphLd, getCatalogLanding("ai-driven-scrum-master"));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  );
}
