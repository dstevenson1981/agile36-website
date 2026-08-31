import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("safe-for-architects"),
  description:
    "2026 live cohorts: Earn your SAFe for Architects (ARCH) certification with Agile36. 3-day live training covering Agile architecture, architectural runway, solution intent, and PI planning. SAFe Silver Partner. Exam included. Enroll now.",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is SAFe for Architects (ARCH)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SAFe for Architects (ARCH) is a 3-day certification teaching system, solution, and enterprise architects how to practice Agile architecture in the Scaled Agile Framework. You learn to align architecture with business strategy, plan architectural runway, contribute to PI Planning, manage nonfunctional requirements, and lead architecture during Lean-Agile transformation.",
        },
      },
      {
        "@type": "Question",
        name: "Who should take SAFe for Architects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ARCH is designed for System Architects, Solution Architects, Enterprise Architects, technical leaders, and senior engineers who guide architectural decisions across Agile Release Trains and Solution Trains. It is also useful for technical managers supporting architecture in a SAFe enterprise.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need Leading SAFe before taking ARCH?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leading SAFe is recommended but not required. There are no formal prerequisites. Experience as an architect and familiarity with SAFe principles, Agile Release Trains, and PI Planning help you apply the course faster.",
        },
      },
      {
        "@type": "Question",
        name: "What is architectural runway in SAFe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Architectural runway is the existing code, components, and technical infrastructure needed to implement near-term features without excessive delay or redesign. Architects maintain runway by contributing enabler epics and features that keep delivery flowing across Program Increments.",
        },
      },
      {
        "@type": "Question",
        name: "How long is SAFe for Architects training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SAFe for Architects training is 3 days (24 hours). After completing the course, you take the online ARCH exam within 30 days. The exam is 45 questions in 90 minutes with a 71% passing score (32 of 45). The first exam attempt is included with enrollment.",
        },
      },
      {
        "@type": "Question",
        name: "How much does SAFe for Architects cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Agile36's SAFe for Architects course is $1,399 and includes 3 days of live instructor-led training, official course materials, one ARCH exam attempt, and one year of access to the SAFe Community Platform.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
