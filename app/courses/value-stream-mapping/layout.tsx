import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SAFe Value Stream Mapping Certification Training (2026) | Agile36",
  description: "2026 live cohorts: Learn SAFe Value Stream Mapping with Agile36. Expert-led training covering current and future state mapping, flow optimization, and value stream identification. Enroll now.",
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
    title: "SAFe® Value Stream Mapping Course | SAFe VSM Training (2026) | Agile36",
    description: "2026: Master value stream mapping with Value Stream Mapping Micro-credential Course. Learn to map value streams, identify bottlenecks, and optimize flow.",
    type: "website",
    url: "https://www.agile36.com/courses/value-stream-mapping",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: "SAFe® Value Stream Mapping Course (2026)",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Value Stream Mapping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Value Stream Mapping (VSM) is a Lean technique for visualizing the steps required to deliver value to customers. It maps the flow of materials, information, and value through a process from start to finish, identifying delays, waste, and bottlenecks. VSM helps teams optimize processes for faster delivery and higher quality."
        }
      },
      {
        "@type": "Question",
        "name": "What is a value stream in SAFe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In SAFe, a value stream is the series of steps an organization uses to deliver a solution to a customer. There are operational value streams (delivering products/services) and development value streams (building solutions). Value streams include people, processes, and systems that create customer value."
        }
      },
      {
        "@type": "Question",
        "name": "What are the 8 types of waste in VSM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 8 types of waste (DOWNTIME) are: Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, and Extra-processing. Value Stream Mapping identifies these wastes to eliminate them, reduce lead time, improve flow, and increase value delivery to customers."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take Value Stream Mapping training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This course is for Value Stream Engineers, Product Managers, Solution Architects, Release Train Engineers, Lean-Agile Leaders, and anyone responsible for optimizing delivery processes. No technical background required—focus is on process analysis and improvement."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure value stream flow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Value stream flow is measured by Lead Time (total time from request to delivery), Cycle Time (active work time), Process Time (value-add time), Wait Time (delays between steps), and Percent Complete and Accurate (%C&A). These metrics identify where improvements will have the greatest impact."
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

