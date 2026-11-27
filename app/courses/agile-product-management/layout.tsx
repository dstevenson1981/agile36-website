import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { faqPageJsonLd } from "@/app/lib/faq-page-jsonld";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("agile-product-management"),
  description: "2026 live cohorts: Earn your SAFe APM certification with Agile36. 3-day live training covering continuous exploration, product strategy, and design thinking. SAFe Silver Partner. Exam included. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "SAFe Agile Product Management",
    "SAFe APM certification",
    "Agile Product Management training",
    "SAFe 6.0 APM",
    "design thinking",
    "continuous exploration",
    "empathy-driven design",
    "product strategy",
    "product vision",
    "roadmap creation",
    "market segmentation",
    "Lean UX",
    "customer-centric product development",
    "innovation in value streams",
    "SAFe APM certification USA",
    "Agile Product Management course",
    "SAFe Product Manager certification",
    "APM training online",
    "SAFe certification training"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("agile-product-management"),
    description: "2026: Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, and product strategy. Earn 24 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/agile-product-management",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("agile-product-management"),
    description: "2026: Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, and product strategy.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/agile-product-management",
  },
};

export default async function AgileProductManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "agile-product-management-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd(
    "agile-product-management-certification-training",
    {
      courseDisplayName: "SAFe® 6.0 Agile Product Management (APM) Certification Training",
      description:
        "SAFe Agile Product Management (APM) certification teaches strategic product management at scale. Learn design thinking, continuous exploration, product vision and strategy, roadmap creation, market segmentation, Lean UX, and customer-centric product development across multiple Agile Release Trains.",
      courseCode: "APM",
      coursePrerequisites:
        "Product management or Product Owner experience recommended. Leading SAFe helpful.",
      teaches: [
        "Design Thinking and Customer Empathy",
        "Continuous Exploration of Markets and Users",
        "Product Vision and Strategy Definition",
        "Strategic Roadmap Creation",
        "Market Segmentation and Personas",
        "Innovation and Product Evolution",
        "Lean UX and Hypothesis-Driven Development",
        "Product Lifecycle Management",
        "Value Stream Coordination",
      ],
      breadcrumbLeafName: "Agile Product Management",
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

  const faqSchema = faqPageJsonLd("agile-product-management");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}



