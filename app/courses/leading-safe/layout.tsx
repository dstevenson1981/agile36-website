import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI-Empowered Leading SAFe® 6.0 Certification (2026) | SAFe Agilist (SA) | Agile36",
  description:
    "2026 live cohorts: AI-Empowered Leading SAFe (SAFe Agilist) with Agile36, a SAFe Silver Partner. 2-day virtual training, exam included, SPC instructors. Lead enterprise Agile transformation with current SAFe practices.",
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
    title: "AI-Empowered Leading SAFe® 6.0 Certification (2026) | SAFe Agilist (SA) | Agile36",
    description:
      "2026 Leading SAFe training: become a SAFe Agilist (SA) with live expert instruction, exam included, and enterprise transformation focus.",
    type: "website",
    url: "https://www.agile36.com/courses/leading-safe",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: "AI-Empowered Leading SAFe® 6.0 (2026) | SAFe Agilist (SA)",
    description:
      "2026 SAFe Agilist path: AI-Empowered Leading SAFe live training and certification exam with Agile36.",
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
        "2-day live virtual Leading SAFe 6.0 training leading to the SAFe Agilist (SA) certification. Includes 16 PDUs/SEUs, certification exam, and lifetime material access.",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Leading SAFe certification?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leading SAFe (SAFe Agilist or SA) certification validates your knowledge of the Scaled Agile Framework. It teaches you to lead enterprise Agile transformations, implement Agile Release Trains, facilitate PI Planning, and manage value streams at scale. The certification is earned by completing a 2-day course and passing the SAFe Agilist exam.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get Leading SAFe certified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Leading SAFe course is 2 days (16 hours). After completing the course, you receive one free exam attempt that must be taken within 30 days. The exam takes 90 minutes and most students pass on their first attempt. Total time from start to certification is typically 2-3 days.",
        },
      },
      {
        "@type": "Question",
        name: "What does a SAFe Agilist do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A SAFe Agilist (SA) leads enterprise Agile transformations. They implement the SAFe framework, coordinate Agile Release Trains, facilitate Program Increment Planning events, manage value streams, coach teams and leadership, and ensure alignment between strategy and execution at organizational scale.",
        },
      },
      {
        "@type": "Question",
        name: "Is Leading SAFe certification worth it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For many enterprise organizations, Leading SAFe is worth it when the role touches scaled delivery: ARTs, PI Planning, and portfolio alignment. Compensation varies by title and location; compare verified sources such as the U.S. Bureau of Labor Statistics Occupational Employment and Wage Statistics (OEWS) and Scaled Agile's published certification information. The credential is widely recognized where SAFe is in use and validates foundational knowledge of the Scaled Agile Framework.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Leading SAFe and CSM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leading SAFe focuses on scaling Agile across entire enterprises with multiple teams. CSM (Certified Scrum Master) focuses on facilitating a single Scrum team. Leading SAFe covers organizational strategy, portfolio management, and coordinating 50-125+ people. CSM covers team-level Scrum practices for 5-9 people.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need Agile experience for Leading SAFe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Basic Agile and Scrum knowledge is recommended but not required. Understanding Agile principles, Scrum roles, and iterative development helps you grasp SAFe concepts faster. However, the course covers foundational Agile concepts, making it accessible to those new to Agile methodologies.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Leading SAFe certification cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leading SAFe certification through Agile36 costs $515. This includes the 2-day live training, course materials, one-year SAFe Community Platform access, exam fee, one free exam retake, and 16 PDUs/SEUs. The certification is valid for one year and can be renewed.",
        },
      },
      {
        "@type": "Question",
        name: "What is an Agile Release Train?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Agile Release Train (ART) is a long-lived team of 50-125 Agile teams who work together to deliver value. The ART operates on a fixed schedule (Program Increment) of 8-12 weeks, holds regular PI Planning events, and synchronizes multiple teams toward common objectives using SAFe practices.",
        },
      },
    ],
  };

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
