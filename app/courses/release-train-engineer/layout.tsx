import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SAFe® AI-Empowered Release Train Engineer (RTE) Certification (2026) | Agile36",
  description:
    "2026 live cohorts: SAFe® AI-Empowered RTE training: ART facilitation and PI planning plus practical use of generative AI for dependency sense-making, PI readiness, and stakeholder communication—always with human judgment, privacy, and Scaled Agile exam alignment. Earn 21 PDUs. Expert-led course.",
  keywords: [
    "AI-Empowered SAFe RTE",
    "SAFe Release Train Engineer",
    "SAFe RTE certification",
    "AI for PI planning",
    "Release Train Engineer training",
    "SAFe 6.0 RTE",
    "ART facilitation",
    "PI planning",
    "Agile Release Train",
    "program-level coaching",
    "generative AI for RTE",
    "stakeholder management",
    "Agile program management",
    "RTE certification",
    "SAFe RTE certification USA",
    "Release Train Engineer course",
    "SAFe Release Train Engineer certification",
    "RTE training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® AI-Empowered Release Train Engineer (RTE) Certification (2026) | Agile36",
    description:
    "2026: RTE certification training with an AI-empowered curriculum: strengthen PI planning, dependency management, and facilitation using responsible AI practices alongside official SAFe outcomes.",
    type: "website",
    url: "https://www.agile36.com/courses/release-train-engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® AI-Empowered Release Train Engineer (RTE) (2026)",
    description:
      "AI-empowered RTE training: ART facilitation, PI planning, and practical AI-assisted workflows with exam-aligned SAFe outcomes.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/release-train-engineer",
  },
};

export default async function ReleaseTrainEngineerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "release-train-engineer-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd(
    "release-train-engineer-certification-training",
    {
      courseDisplayName:
        "SAFe® AI-Empowered Release Train Engineer (RTE) Certification Training",
      description:
        "SAFe® RTE certification training with an AI-empowered lens: ART facilitation, PI planning, program coaching, and responsible use of generative AI for planning support, communication, and flow insights.",
      courseCode: "SAFe RTE",
      coursePrerequisites:
        "Experience with Agile practices and understanding of SAFe framework recommended",
      teaches: [
        "Agile Release Train (ART) Facilitation",
        "Program Increment (PI) Planning",
        "Program-Level Coaching",
        "Responsible AI Use for RTE Workflows",
        "AI-Assisted PI Readiness and Dependency Sense-Making",
        "Stakeholder Management",
        "Dependency Management",
        "Flow Optimization",
        "Value Delivery",
        "Continuous Improvement",
      ],
      breadcrumbLeafName: "Release Train Engineer",
      coursesCrumbLabel: "SAFe Courses",
      aggregateRating: { ratingValue: 4.9, reviewCount: 180, bestRating: 5, worstRating: 1 },
    },
    scheduleResult
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }}
      />
      {children}
    </>
  );
}

