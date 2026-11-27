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
  title: courseTitle("certified-ai-product-manager"),
  description: "2026 live cohorts: Build and ship a working app in class. Certified AI Product Manager™ is a 2-day build course — Cursor, v0, Bolt, Lovable — not a lecture on using AI across the product lifecycle. Rated 4.9/5 from Agile36 learners.",
  keywords: [
    "AI Product Manager",
    "AI Product Management",
    "build AI apps",
    "Cursor for product managers",
    "v0 Bolt Lovable",
    "ship a product in class",
    "Product Manager certification",
    "AI product development",
    "no-code app building",
    "stakeholder demo live app",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("certified-ai-product-manager"),
    description: "2026: Leave class with a working app you built. Certified AI Product Manager™ is a 2-day build course, not a lifecycle lecture.",
    type: "website",
    url: "https://www.agile36.com/courses/certified-ai-product-manager",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("certified-ai-product-manager"),
    description: "2026: Build and ship a working app in two days. Certified AI Product Manager™.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/certified-ai-product-manager",
  },
};

export default async function CertifiedAIProductManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts(
    "certified-ai-product-manager"
  );
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "certified-ai-product-manager",
      canonical: "https://www.agile36.com/courses/certified-ai-product-manager",
      schedulePath: "/courses/certified-ai-product-manager/schedule",
      courseDisplayName: "Certified AI Product Manager™ Certification Training",
      description:
        "Certified AI Product Manager is a 2-day build class. Product managers ship a working app with Cursor, v0, Bolt, and Lovable, put an AI feature inside the product, deploy a live URL, and demo it. This is not a course on using AI across the product lifecycle.",
      teaches: [
        "Shipping a working app in class",
        "Building with Cursor, v0, Bolt, and Lovable",
        "Data, auth, and a completable user path",
        "Putting AI features inside the product",
        "Product decisions while you build",
        "Deploying a live URL",
        "Stakeholder demos from the working app",
        "Repeating the build loop at work",
      ],
      breadcrumbLeafName: "Certified AI Product Manager",
      coursesCrumbLabel: "AI Product Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "AI-PM",
      coursePrerequisites:
        "Product management or product owner experience recommended. No coding required.",
      educationalCredentialAwarded: "Certified AI Product Manager™",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("certified-ai-product-manager");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

