import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("ai-app-builder"),
  description:
    "Build apps you can sell, or use to grow your own business. Live two-day no-code AI app builder training: 8 hours, 4 hours per day. No coding experience required.",
  keywords: [
    "no-code AI app builder",
    "no-code app training",
    "AI app builder certification",
    "build apps without coding",
    "small business applications",
    "client portals",
    "booking systems",
    "sell no-code apps",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("ai-app-builder"),
    description:
      "Build apps you can sell, or use to grow your own business. Live two-day training with AI-powered no-code tools. 8 hours, 4 hours per day.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-app-builder",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("ai-app-builder"),
    description:
      "Turn a real business problem into a working application without writing code. 8 hours over two days. No coding experience required.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/ai-app-builder",
  },
};

export default async function AIAppBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("ai-app-builder");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "ai-app-builder",
      canonical: "https://www.agile36.com/courses/ai-app-builder",
      schedulePath: "/courses/ai-app-builder/schedule",
      courseDisplayName: "No-Code AI App Builder™ Certification Training",
      description:
        "Live, hands-on training to turn a real business problem into a working application using AI-powered no-code tools. Eight hours over two days. No coding experience required.",
      teaches: [
        "Finding business problems worth solving",
        "Turning client needs into app requirements",
        "Building a working app without coding",
        "Adding data, users, workflows, and integrations",
        "Customizing and branding apps for different businesses",
        "Publishing and demonstrating the finished product",
        "Packaging the app as a service you can sell",
      ],
      breadcrumbLeafName: "No-Code AI App Builder",
      coursesCrumbLabel: "AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "PT8H",
      courseCode: "AI-App-Builder",
      coursePrerequisites: "No coding experience is required.",
      educationalCredentialAwarded: "No-Code AI App Builder™ Certification",
    },
    scheduleResult
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is No-Code AI App Builder™ Certification Training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A live, two-day hands-on course. You turn a real business problem into a working application using AI-powered no-code tools. Eight hours total, four hours per day. No coding experience is required.",
        },
      },
      {
        "@type": "Question",
        name: "What will I build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A working application that could be sold to a small business or used inside your own company, such as a client portal, booking system, lead manager, operations tool, or membership portal.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need coding experience?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No coding experience is required. You build the interface, features, data, and business rules while AI handles the technical implementation.",
        },
      },
      {
        "@type": "Question",
        name: "Is there an exam?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No exam. You leave with a published application and a repeatable process for turning one successful build into a client service.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
