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
  title: courseTitle("generative-ai-project-managers"),
  description: "2026 live cohorts: Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, apply AI-assisted risk analysis, and integrate GenAI across Agile, hybrid, and traditional methodologies. Expert-led training. Rated 4.9/5 from Agile36 learners.",
  keywords: [
    "Generative AI for Project Managers",
    "AI Project Management",
    "Project Management AI",
    "AI Project Planning",
    "AI Project Tools",
    "GenAI Project Management",
    "AI-Assisted Planning",
    "Project Workflow Automation",
    "AI Risk Management",
    "Prompt Engineering",
    "AI Project Artifacts",
    "AI Project Certification"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("generative-ai-project-managers"),
    description: "2026: Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, and integrate GenAI across various methodologies.",
    type: "website",
    url: "https://www.agile36.com/courses/generative-ai-project-managers",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("generative-ai-project-managers"),
    description: "2026: Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, and integrate GenAI across various methodologies.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/generative-ai-project-managers",
  },
};

export default async function GenerativeAIProjectManagersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts(
    "generative-ai-project-managers"
  );
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "generative-ai-project-managers",
      canonical: "https://www.agile36.com/courses/generative-ai-project-managers",
      schedulePath: "/courses/generative-ai-project-managers/schedule",
      courseDisplayName:
        "Generative AI for Project Managers Certification Training",
      description:
        "Generative AI for Project Managers teaches project managers to use AI for planning, scheduling, risk analysis, and artifact creation. Learn prompt engineering, AI-assisted decision-making, and how to integrate generative AI into Agile, Waterfall, and hybrid methodologies.",
      teaches: [
        "Generative AI Fundamentals for Project Management",
        "AI-Assisted Planning and Scheduling",
        "AI for Risk Analysis and Mitigation",
        "Creating Project Artifacts with AI (charters, plans, status reports)",
        "Prompt Engineering for Project Managers",
        "AI in Agile, Scrum, and Waterfall",
        "Integrating AI into PM Tools (Jira, MS Project, Asana)",
        "Ethical AI Implementation and Governance",
      ],
      breadcrumbLeafName: "Generative AI for Project Managers",
      coursesCrumbLabel: "Generative AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "GAI-PM",
      coursePrerequisites: "Project management experience recommended",
      educationalCredentialAwarded:
        "Generative AI for Project Managers Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 187,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );


  const pageSchema = mergeCourseAeoGraph(courseGraphLd, getCatalogLanding("generative-ai-project-managers"));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  );
}
