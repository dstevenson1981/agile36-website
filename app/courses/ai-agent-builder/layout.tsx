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
  title: courseTitle("ai-agent-builder"),
  description:
    "Build a fleet of AI agents, a voice agent, and a working app in two live days. Combine GrokBot, RAG, Claude Code, Codex, n8n, and voice AI — 8 hours, 4 hours per day. Rated 4.9/5 from Agile36 learners.",
  keywords: [
    "No-code AI agents",
    "AI automation",
    "GrokBot",
    "RAG",
    "Voice AI",
    "Claude Code",
    "Codex",
    "n8n training",
    "AI workflow automation",
    "Human-in-the-loop AI",
    "No-code automation",
    "Business process automation",
    "AI for non-programmers",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("ai-agent-builder"),
    description:
      "Build a fleet of AI agents, a voice agent, and a working app in two live days. Combine GrokBot, RAG, Claude Code, Codex, n8n, and voice AI — 8 hours, 4 hours per day.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-agent-builder",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("ai-agent-builder"),
    description:
      "Build a fleet of AI agents, a voice agent, and a working app. GrokBot, RAG, Claude Code, Codex, n8n, and voice AI. 8 hours over two days.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/ai-agent-builder",
  },
};

export default async function AIAgentBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("ai-agent-builder");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "ai-agent-builder",
      canonical: "https://www.agile36.com/courses/ai-agent-builder",
      schedulePath: "/courses/ai-agent-builder/schedule",
      courseDisplayName: "No-Code AI Agents & Automation™ Certification Training",
      description:
        "This is not another course about prompting AI. Over two live, hands-on days you build a connected fleet of business agents, an AI voice agent, and a working application planned and built by Claude Code or Codex — using GrokBot, RAG, n8n, and voice AI.",
      teaches: [
        "Building a fleet of specialized agents",
        "Grounding agents in company knowledge with RAG",
        "Agent handoffs and human approvals",
        "Connecting workflows with n8n",
        "Building a voice agent",
        "Using Claude Code or Codex to build a working application",
        "Connecting agents, knowledge, voice, and software into one system",
      ],
      breadcrumbLeafName: "No-Code AI Agents & Automation",
      coursesCrumbLabel: "AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "PT8H",
      courseCode: "AI-Agents",
      coursePrerequisites:
        "No prerequisites. Designed for professionals without a software development background.",
      educationalCredentialAwarded: "No-Code AI Agents & Automation™ Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("ai-agent-builder");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
