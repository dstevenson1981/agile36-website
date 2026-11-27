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
  title: courseTitle("responsible-ai"),
  description: "2026 live cohorts: Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, communication strategies, and epic hypothesis statement writing. Expert-led training. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "Responsible AI",
    "AI with SAFe",
    "RAI policies",
    "AI transformation",
    "SAFe AI",
    "Responsible AI training",
    "AI ethics",
    "SAFe micro-credential",
    "AI stakeholder management",
    "RAI epic hypothesis",
    "AI governance",
    "SAFe AI integration"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("responsible-ai"),
    description: "2026: Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, and communication strategies.",
    type: "website",
    url: "https://www.agile36.com/courses/responsible-ai",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("responsible-ai"),
    description: "2026: Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, and communication strategies.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/responsible-ai",
  },
};

export default async function ResponsibleAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("responsible-ai");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "responsible-ai",
      canonical: "https://www.agile36.com/courses/responsible-ai",
      schedulePath: "/courses/responsible-ai/schedule",
      courseDisplayName: "Achieving Responsible AI with SAFe™ Micro-credential Course",
      description:
        "Responsible AI with SAFe micro-credential teaches ethical AI implementation within Scaled Agile Framework. Learn to identify RAI stakeholders, evaluate AI policies, write epic hypotheses for AI initiatives, communicate AI risks, and integrate responsible AI practices into Agile Release Trains.",
      teaches: [
        "Responsible AI Stakeholder Identification",
        "RAI Policy Evaluation and Compliance",
        "Communicating AI Risks and Ethics",
        "Writing RAI Epic Hypothesis Statements",
        "AI Transformation with SAFe Framework",
        "Responsible AI Governance and Oversight",
      ],
      breadcrumbLeafName: "Responsible AI with SAFe",
      coursesCrumbLabel: "SAFe Courses",
      defaultPrice: 350,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "RAI",
      coursePrerequisites:
        "SAFe knowledge helpful. Open to product managers, architects, leaders involved in AI initiatives.",
      educationalCredentialAwarded:
        "Achieving Responsible AI with SAFe™ Micro-credential",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("responsible-ai");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

