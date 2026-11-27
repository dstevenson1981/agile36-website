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
  title: courseTitle("ai-workflow-automation"),
  description:
    "Turn manual business processes into working automations. Live two-day training with n8n, Claude, APIs, and webhooks — 8 hours, 4 hours per day. No traditional programming required. Rated 4.9/5 from Agile36 learners.",
  keywords: [
    "AI workflow automation",
    "n8n training",
    "Claude automation",
    "business process automation",
    "webhooks",
    "API workflows",
    "no-code automation",
    "human-in-the-loop automation",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("ai-workflow-automation"),
    description:
      "Turn manual business processes into working automations. Live two-day training with n8n, Claude, APIs, and webhooks — 8 hours, 4 hours per day.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-workflow-automation",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("ai-workflow-automation"),
    description:
      "Build complete workflows with n8n, Claude, APIs, and webhooks. 8 hours over two days. No traditional programming required.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/ai-workflow-automation",
  },
};

export default async function AIWorkflowAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("ai-workflow-automation");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "ai-workflow-automation",
      canonical: "https://www.agile36.com/courses/ai-workflow-automation",
      schedulePath: "/courses/ai-workflow-automation/schedule",
      courseDisplayName: "AI Workflow Automation™ Certification Training",
      description:
        "Live, hands-on training to map a manual business process and build a working automation with n8n, Claude, APIs, webhooks, and human approvals. Eight hours over two days.",
      teaches: [
        "Finding high-value automation opportunities",
        "Mapping complete workflows",
        "Building with n8n",
        "Adding Claude to business processes",
        "Connecting applications with APIs and webhooks",
        "Human approvals and escalation",
        "Building reliable automations",
      ],
      breadcrumbLeafName: "AI Workflow Automation",
      coursesCrumbLabel: "AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "PT8H",
      courseCode: "AI-Workflow",
      coursePrerequisites: "No traditional programming experience is required.",
      educationalCredentialAwarded: "AI Workflow Automation™ Certification",
    },
    scheduleResult
  );


  const pageSchema = mergeCourseAeoGraph(courseGraphLd, getCatalogLanding("ai-workflow-automation"));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {children}
    </>
  );
}
