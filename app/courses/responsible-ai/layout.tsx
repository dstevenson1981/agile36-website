import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("responsible-ai"),
  description: "2026 live cohorts: Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, communication strategies, and epic hypothesis statement writing. Expert-led training.",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Responsible AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Responsible AI (RAI) is the practice of developing and deploying artificial intelligence systems ethically, transparently, and with accountability. It includes ensuring fairness, preventing bias, protecting privacy, maintaining security, providing explainability, and aligning AI systems with human values and societal norms."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Responsible AI with SAFe micro-credential?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Achieving Responsible AI with SAFe is a 2-day micro-credential teaching how to implement ethical AI within SAFe. You learn to identify RAI stakeholders, evaluate AI policies, write epic hypotheses for AI projects, communicate risks, and integrate responsible AI governance into Agile Release Trains and value streams."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This course is for Product Managers, Product Owners, Solution Architects, Business Owners, executives, and anyone involved in AI initiative planning or implementation within SAFe environments. No technical AI background required—focus is on governance, ethics, and stakeholder management."
        }
      },
      {
        "@type": "Question",
        "name": "What are RAI epic hypotheses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RAI epic hypotheses are statements defining AI initiatives with measurable outcomes and responsible AI criteria. They articulate the business value, technical approach, ethical considerations, success metrics, and responsible AI guardrails for AI epics moving through portfolio Kanban in SAFe."
        }
      },
      {
        "@type": "Question",
        "name": "Is this course technical?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, this is not a technical AI course. It focuses on responsible AI governance, policy evaluation, stakeholder management, and integrating RAI practices into SAFe workflows. You don't need programming or data science skills—the course is designed for business and leadership roles."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

