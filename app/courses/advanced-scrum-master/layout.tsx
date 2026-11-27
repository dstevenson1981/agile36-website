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
  title: courseTitle("advanced-scrum-master"),
  description:
    "2026 live cohorts: AI-Empowered SAFe Advanced Scrum Master (SASM) training: flow, high-performing teams, multi-team collaboration, and conflict skills on the ART—with AI-empowered facilitation. Expert-led course; exam included. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "AI-Empowered SAFe Advanced Scrum Master",
    "SASM certification",
    "AI-Empowered SAFe",
    "AI-Empowered SASM",
    "Advanced Scrum Master training",
    "Scaled Agile SASM",
    "Agile Release Train",
    "SAFe Scrum Master prerequisite SSM",
    "flow optimization SAFe",
    "SAFe Studio",
    "SAFe CoPilot",
    "Advanced Scrum Master exam",
    "SASM course online",
    "AI-Empowered SAFe Advanced Scrum Master certification"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("advanced-scrum-master"),
    description:
    "2026: Become an AI-Empowered SAFe Advanced Scrum Master: improve flow, build high-performing teams, manage cross-team conflict, and strengthen ART performance—with responsible AI practices. Exam included.",
    type: "website",
    url: "https://www.agile36.com/courses/advanced-scrum-master",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("advanced-scrum-master"),
    description:
      "Flow, high-performing teams, conflict skills, and ART performance—plus AI fundamentals and SAFe CoPilot-style guidance for the SASM role.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/advanced-scrum-master",
  },
};

export default async function AdvancedScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("advanced-scrum-master");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "advanced-scrum-master",
      canonical: "https://www.agile36.com/courses/advanced-scrum-master",
      schedulePath: "/courses/advanced-scrum-master/schedule",
      courseDisplayName:
        "AI-Empowered SAFe® Advanced Scrum Master (SASM) Certification Training",
      description:
        "The AI-Empowered SAFe Advanced Scrum Master (SASM) course elevates experienced Scrum Masters to improve flow, build high-performing teams, manage multi-team conflict, and strengthen ART performance—using AI fundamentals, prompting, and SAFe Studio resources responsibly, per Scaled Agile.",
      teaches: [
        "Cross-team collaboration on the ART",
        "Optimizing team flow (XP, Kanban, built-in quality)",
        "High-performing teams and powerful questions",
        "Conflict analysis, interest-based problem solving, reframing",
        "ART performance: IP iteration, I&A, problem-solving workshop",
        "AI fundamentals and prompting for the SASM role",
        "SAFe CoPilot and responsible, human-in-the-loop AI use",
      ],
      breadcrumbLeafName: "AI-Empowered SAFe Advanced Scrum Master",
      coursesCrumbLabel: "SAFe Courses",
      defaultPrice: 599,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "SASM",
      coursePrerequisites:
        "SAFe Scrum Master (SSM) certification and Scrum Master experience required",
      educationalCredentialAwarded:
        "SAFe Advanced Scrum Master (SASM) Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("advanced-scrum-master");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

