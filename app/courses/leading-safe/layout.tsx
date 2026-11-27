import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { faqPageJsonLd } from "@/app/lib/faq-page-jsonld";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("leading-safe"),
  description:
    "Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile. 2026 live cohorts: AI-Empowered Leading SAFe (SAFe Agilist) with Agile36, a SAFe Silver Partner. 2-day virtual training, exam included, SPC instructors.",
  keywords: [
    "Leading SAFe",
    "SAFe Agilist",
    "SAFe SA certification",
    "SAFe 6.0 training",
    "Leading SAFe certification",
    "SAFe Agilist training",
    "SAFe certification USA",
    "Agile Release Train",
    "PI Planning",
    "value streams",
    "enterprise Agile transformation",
    "SAFe training online",
    "SAFe certification training",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("leading-safe"),
    description:
      "2026 Leading SAFe training: become a SAFe Agilist (SA). Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
    type: "website",
    url: "https://www.agile36.com/courses/leading-safe",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("leading-safe"),
    description:
      "2026 SAFe Agilist path: AI-Empowered Leading SAFe. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/leading-safe",
  },
};

export default async function LeadingSafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "leading-safe-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd(
    "leading-safe-certification-training",
    {
      courseDisplayName:
        "AI-Empowered Leading SAFe® 6.0 Certification (SAFe Agilist)",
      description:
        "Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile. 2-day live virtual Leading SAFe 6.0 training leading to the SAFe Agilist (SA) certification. Includes 16 PDUs/SEUs, certification exam, and lifetime material access.",
      imageUrl: "https://www.agile36.com/LeadingSAFeHome.jpg",
      eventImageUrl: "https://www.agile36.com/LeadingSAFeHome.jpg",
      coursePrerequisites:
        "Basic knowledge of Agile or Scrum recommended; 5+ years experience in software development, testing, business analysis, product, or project management beneficial.",
      teaches: [
        "Scaled Agile Framework fundamentals",
        "Lean-Agile mindset and principles",
        "Leading SAFe transformations",
        "Agile Release Train execution",
        "Portfolio-level value delivery",
      ],
      breadcrumbLeafName: "Leading SAFe Agilist",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
      },
      offerExtras: {
        validFrom: "2026-04-19",
        priceValidUntil: "2027-04-19",
        courseOfferUrl: "https://www.agile36.com/courses/leading-safe",
        category: "Training / Certification",
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("leading-safe");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
