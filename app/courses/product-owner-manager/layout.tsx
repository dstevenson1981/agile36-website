import type { Metadata } from "next";
import PracticeExamUpsellBanner from "@/app/components/PracticeExamUpsellBanner";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { faqPageJsonLd } from "@/app/lib/faq-page-jsonld";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("product-owner-manager"),
  description: "2026 live cohorts: Get AI-Empowered SAFe POPM certified with Agile36. 2-day live training covering backlog management, PI Planning, and Lean-Agile product delivery. SAFe Silver Partner. Exam included. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "SAFe Product Owner",
    "SAFe Product Manager",
    "SAFe POPM certification",
    "SAFe 6.0 POPM",
    "Product Owner training",
    "Product Manager training",
    "SAFe POPM certification USA",
    "Agile Product Owner course",
    "SAFe Product Owner certification",
    "POPM training online",
    "SAFe certification training",
    "backlog management",
    "epic management",
    "product strategy",
    "continuous exploration"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("product-owner-manager"),
    description: "2026: Master AI-Empowered SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership and backlog management. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/product-owner-manager",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("product-owner-manager"),
    description: "2026: Master AI-Empowered SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership and backlog management.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/product-owner-manager",
  },
};

export default async function ProductOwnerManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "safe-product-owner-product-manager-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd(
    "safe-product-owner-product-manager-certification-training",
    {
      courseDisplayName: "SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training",
      description:
        "SAFe Product Owner/Product Manager (POPM) certification teaches product ownership at scale. Learn to define and prioritize program backlogs, manage epics and features, execute PI Planning, collaborate with stakeholders, and deliver customer value through Agile Release Trains.",
      courseCode: "POPM",
      coursePrerequisites:
        "Product Owner, Product Manager, or Business Analyst experience recommended",
      teaches: [
        "Product Ownership in SAFe",
        "Program Backlog Management",
        "Epic and Feature Management",
        "Product Strategy and Vision",
        "Continuous Exploration",
        "PI Planning Execution",
        "Stakeholder Collaboration",
        "Value Stream Delivery",
      ],
      breadcrumbLeafName: "SAFe Product Owner/Product Manager",
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

  const faqSchema = faqPageJsonLd("product-owner-manager", [
    {
      q: "What is SAFe POPM certification training?",
      a: "A two-day live class that makes you eligible for the SAFe POPM exam. The tuition includes two exam attempts.",
    },
    {
      q: "Product Owner and Product Manager are not the same job",
      a: "The Product Owner owns the team backlog and splits features into stories. The Product Manager owns the ART backlog, the vision, and the roadmap. The Product Manager names the feature. The Product Owner breaks it into stories and stays with the team until it ships.",
    },
  ]);

  return (
    <>
      <PracticeExamUpsellBanner courseSlug="product-owner-manager" schedulePath="/courses/product-owner-manager/schedule" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}



