import type { Metadata } from "next";
import PracticeExamUpsellBanner from "@/app/components/PracticeExamUpsellBanner";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { mergeCourseAeoGraph } from "@/app/lib/course-aeo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("lean-portfolio-management"),
  description: "2026 live cohorts: Earn your SAFe LPM certification with Agile36. 2-day live training in portfolio strategy, Lean budgeting, and Agile governance. SAFe Silver Partner. Exam included. Enroll now. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "SAFe Lean Portfolio Management",
    "SAFe LPM certification",
    "Lean Portfolio Management training",
    "SAFe 6.0 LPM",
    "portfolio strategy",
    "investment funding",
    "lean governance",
    "portfolio flow",
    "portfolio Kanban",
    "SAFe LPM certification USA",
    "Agile Portfolio Management course",
    "SAFe Portfolio Manager certification",
    "LPM training online",
    "SAFe certification training"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("lean-portfolio-management"),
    description: "2026: Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy and investment funding. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/lean-portfolio-management",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("lean-portfolio-management"),
    description: "2026: Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy and investment funding.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/lean-portfolio-management",
  },
};

export default async function LeanPortfolioManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "lean-portfolio-management-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd(
    "lean-portfolio-management-certification-training",
    {
      courseDisplayName: "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training",
      description:
        "SAFe Lean Portfolio Management (LPM) certification teaches portfolio-level strategy and investment management in SAFe. Learn to align strategy and execution, manage portfolio Kanban, establish lean budgets, govern value streams, and optimize portfolio flow for maximum business value.",
      courseCode: "LPM",
      coursePrerequisites:
        "Executive, portfolio manager, or program manager role. Leading SAFe certification recommended.",
      teaches: [
        "Portfolio Strategy and Investment Funding",
        "Lean Governance and Compliance",
        "Portfolio Kanban Management",
        "Epic Prioritization and Management",
        "Value Stream Coordination",
        "Lean Budget Guardrails",
        "Portfolio Flow Optimization",
        "Strategic Themes and OKRs",
      ],
      breadcrumbLeafName: "Lean Portfolio Management",
      coursesCrumbLabel: "SAFe Courses",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );


  const pageSchema = mergeCourseAeoGraph(courseGraphLd, getCatalogLanding("lean-portfolio-management"));

  return (
    <>
      <PracticeExamUpsellBanner courseSlug="lean-portfolio-management" schedulePath="/courses/lean-portfolio-management/schedule" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  );
}



