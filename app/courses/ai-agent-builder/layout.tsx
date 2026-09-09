import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("ai-agent-builder"),
  description:
    "Build a fleet of AI agents, a voice agent, and a working app in two live days. Combine GrokBot, RAG, Claude Code, Codex, n8n, and voice AI — 8 hours, 4 hours per day.",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is No-Code AI Agents & Automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No-Code AI Agents & Automation™ is a live, two-day hands-on certification. You build a connected fleet of business agents, a RAG knowledge system, a voice agent, and a working application using GrokBot, RAG, Claude Code, Codex, n8n, and voice AI. Eight hours total, four hours per day.",
        },
      },
      {
        "@type": "Question",
        name: "What tools will I use in this course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You’ll work with GrokBot, RAG, Claude Code, Codex, n8n, and voice AI to build an agent fleet, a voice agent, and a working application.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need programming skills?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No programming background is required. The course teaches you how AI coding agents like Claude Code and Codex can build applications, agents, integrations, and automations even if you are not a software developer.",
        },
      },
      {
        "@type": "Question",
        name: "What will I build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You’ll build a fleet of specialized agents, a RAG knowledge system, connected workflows with handoffs and human approvals, a voice agent, a working application planned and built by an AI agent, and one complete workflow connecting agents, knowledge, voice, and software.",
        },
      },
      {
        "@type": "Question",
        name: "Who should take this course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This course is ideal for business professionals, Product Managers and Product Owners, Project and Program Managers, operations professionals, consultants, entrepreneurs, marketing and sales professionals, customer support teams, process improvement professionals, and anyone responsible for improving how work gets done.",
        },
      },
      {
        "@type": "Question",
        name: "How is this different from prompt-writing courses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You will not spend eight hours watching AI demonstrations. You will build with AI: Company Challenge → Agent Fleet → RAG Knowledge → Voice Agent → AI-Built Application → Working Business System.",
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
