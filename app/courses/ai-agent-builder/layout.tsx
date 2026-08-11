import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "No-Code AI Agents & Automation™ — Build AI Agents That Actually Do Work | Agile36",
  description:
    "Live hands-on training: build practical AI agents and automate real workflows with Claude, Claude Code, Codex, and n8n — no programming background required.",
  keywords: [
    "No-code AI agents",
    "AI automation",
    "Claude agents",
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
    title: "No-Code AI Agents & Automation™ — Build AI Agents That Actually Do Work | Agile36",
    description:
      "Live hands-on training: build practical AI agents and automate real workflows with Claude, Claude Code, Codex, and n8n — no programming background required.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-agent-builder",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: "No-Code AI Agents & Automation™ — Build AI Agents That Actually Do Work",
    description:
      "Build practical AI agents and automate workflows with Claude, Claude Code, Codex, and n8n. No programming background required.",
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
        "Learn how to build practical AI agents and automate real business workflows using Claude, Claude Code, Codex, and n8n — without needing to be a programmer. Go beyond prompting to give agents instructions, tools, context, and workflows that complete real work.",
      teaches: [
        "Building AI Agents Without Traditional Coding",
        "Building Agents with Claude",
        "Building with Claude Code and Codex",
        "Automating Workflows with n8n",
        "Connecting Agents to Tools and Data",
        "Human-in-the-Loop Workflow Design",
        "Multi-Step and Multi-Agent Workflows",
        "Turning Business Processes into AI Workflows",
      ],
      breadcrumbLeafName: "No-Code AI Agents & Automation",
      coursesCrumbLabel: "AI Product Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P2D",
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
          text: "No-Code AI Agents & Automation™ is a live, hands-on certification that teaches you to build practical AI agents and automate real business workflows using Claude, Claude Code, Codex, and n8n — without needing to be a programmer.",
        },
      },
      {
        "@type": "Question",
        name: "What tools will I use in this course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You’ll work with Claude, Claude Code, Codex, n8n, APIs and integrations, and AI agent tools and connectors to build agents that complete real work across applications and processes.",
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
          text: "You’ll build research and information-gathering agents, workflow automation agents, document and data processing agents, customer and employee support workflows, multi-application agents, human approval and escalation workflows, multi-agent workflows, and end-to-end business process automation.",
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
          text: "Most AI courses teach you how to use ChatGPT or write better prompts. This course teaches you how to build AI-powered systems that perform work by combining AI agents, workflow automation, business applications, data, and human decision points.",
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
