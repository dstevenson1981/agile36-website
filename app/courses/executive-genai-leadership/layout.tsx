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
  title: courseTitle("executive-genai-leadership"),
  description: "2026 live cohorts: Lead your organization's AI transformation with strategic GenAI leadership. Learn GenAI strategy development, executive AI decision-making frameworks, ethical AI implementation, and organizational transformation. Expert-led training. Rated 4.9/5 from Agile36 learners.",
  keywords: [
    "Executive GenAI Leadership",
    "GenAI Leadership",
    "Executive AI Leadership",
    "GenAI Strategy",
    "AI Executive Training",
    "AI Leadership",
    "GenAI Decision Making",
    "AI Transformation Leadership",
    "Executive AI Training",
    "GenAI Governance",
    "AI Strategy Development",
    "Executive AI Certification"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("executive-genai-leadership"),
    description: "2026: Lead your organization's AI transformation with strategic GenAI leadership. Learn GenAI strategy development, executive AI decision-making frameworks, and ethical AI implementation.",
    type: "website",
    url: "https://www.agile36.com/courses/executive-genai-leadership",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("executive-genai-leadership"),
    description: "2026: Lead your organization's AI transformation with strategic GenAI leadership. Learn GenAI strategy development, executive AI decision-making frameworks, and ethical AI implementation.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/executive-genai-leadership",
  },
};

export default async function ExecutiveGenAILeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts(
    "executive-genai-leadership"
  );
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "executive-genai-leadership",
      canonical: "https://www.agile36.com/courses/executive-genai-leadership",
      schedulePath: "/courses/executive-genai-leadership/schedule",
      courseDisplayName: "Executive GenAI Leadership™ Certification Training",
      description:
        "Executive GenAI Leadership teaches C-suite and senior leaders to drive AI transformation. Learn to develop AI strategy, build governance frameworks, assess AI risks, measure ROI, and lead organizational change for generative AI adoption.",
      teaches: [
        "GenAI Strategy Development and Planning",
        "Executive AI Decision-Making Frameworks",
        "AI Transformation Leadership",
        "Ethical AI Implementation and Governance",
        "AI Risk Management and Mitigation",
        "Measuring AI ROI and Business Value",
        "Building Organizational AI Capabilities",
        "Change Management for AI Adoption",
      ],
      breadcrumbLeafName: "Executive GenAI Leadership",
      coursesCrumbLabel: "Generative AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P1D",
      courseCode: "EGL",
      coursePrerequisites: "Executive, VP, or senior leadership role recommended",
      educationalCredentialAwarded: "Executive GenAI Leadership™ Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );


  const pageSchema = mergeCourseAeoGraph(courseGraphLd, getCatalogLanding("executive-genai-leadership"));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  );
}
