import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { getCatalogLanding } from "@/app/lib/catalog-landing-courses";
import { mergeCourseAeoGraph } from "@/app/lib/course-aeo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("value-stream-mapping"),
  description: "2026 live cohorts: Learn SAFe Value Stream Mapping with Agile36. Expert-led training covering current and future state mapping, flow optimization, and value stream identification. Enroll now. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "Value Stream Mapping",
    "VSM",
    "Value Stream",
    "Process Optimization",
    "Lean Practices",
    "SAFe Value Stream",
    "Value Stream Training",
    "Flow Optimization",
    "Waste Elimination",
    "SAFe micro-credential",
    "Value Stream Engineer",
    "Process Improvement",
    "Lead Time Reduction",
    "Cycle Time Optimization"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("value-stream-mapping"),
    description: "2026: Master value stream mapping with Value Stream Mapping Micro-credential Course. Learn to map value streams, identify bottlenecks, and optimize flow.",
    type: "website",
    url: "https://www.agile36.com/courses/value-stream-mapping",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("value-stream-mapping"),
    description: "2026: Master value stream mapping with Value Stream Mapping Micro-credential Course. Learn to map value streams, identify bottlenecks, and optimize flow.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/value-stream-mapping",
  },
};

export default async function ValueStreamMappingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("value-stream-mapping");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "value-stream-mapping",
      canonical: "https://www.agile36.com/courses/value-stream-mapping",
      schedulePath: "/courses/value-stream-mapping/schedule",
      courseDisplayName: "SAFe® Value Stream Mapping Micro-credential Course",
      description:
        "SAFe Value Stream Mapping micro-credential teaches how to visualize and optimize value streams. Learn current state mapping, identify bottlenecks and waste, design future states, measure flow metrics, and accelerate delivery through value stream optimization in SAFe.",
      teaches: [
        "Value Stream Mapping Fundamentals",
        "Current State Mapping Techniques",
        "Future State Design",
        "Bottleneck and Constraint Identification",
        "Waste Elimination (8 Types of Waste)",
        "Flow Metrics and Measurement",
        "Lead Time and Cycle Time Reduction",
        "Continuous Process Improvement",
      ],
      breadcrumbLeafName: "Value Stream Mapping",
      coursesCrumbLabel: "SAFe Courses",
      defaultPrice: 350,
      defaultCurrency: "USD",
      timeRequired: "P1D",
      courseCode: "VSM",
      coursePrerequisites:
        "Basic SAFe knowledge helpful. Open to product managers, architects, and leaders.",
      educationalCredentialAwarded: "SAFe Value Stream Mapping Micro-credential",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );


  const pageSchema = mergeCourseAeoGraph(courseGraphLd, getCatalogLanding("value-stream-mapping"));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  );
}

