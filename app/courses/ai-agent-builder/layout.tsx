import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "No-Code AI Agents & Automation™ Training | AI Automation for Non-Programmers (2026) | Agile36",
  description: "2026 live cohorts: Master no-code AI agents and automation without programming! Learn to build intelligent workflows, automate tasks, and optimize productivity. 25+ hands-on projects. Perfect for non-technical professionals. 2-day intensive course.",
  keywords: [
    "No-code AI",
    "AI automation",
    "No-code automation",
    "AI agents",
    "Workflow automation",
    "ChatGPT automation",
    "n8n training",
    "Make.com",
    "Langflow",
    "Business automation",
    "AI for non-programmers",
    "Automation training"
  ],
  openGraph: {
    title: "No-Code AI Agents & Automation™ Training | AI Automation for Non-Programmers (2026) | Agile36",
    description: "2026: Master no-code AI agents and automation without programming! Build intelligent workflows, automate tasks, and supercharge productivity with 25+ hands-on projects.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-agent-builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "No-Code AI Agents & Automation™ Training (2026)",
    description: "2026: Master no-code AI agents and automation without programming! Build intelligent workflows with 25+ hands-on projects.",
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
        "No-Code AI Agents & Automation teaches professionals to build AI-powered automation without programming. Learn to create intelligent agents, automate workflows using n8n and Make.com, integrate ChatGPT APIs, and build 25+ practical automations for business productivity.",
      teaches: [
        "Building No-Code AI Agents",
        "Multi-Step Workflow Automation",
        "ChatGPT and Claude API Integration",
        "n8n, Make.com, and Langflow Platforms",
        "Business Process Automation",
        "Lead Qualification and Outreach Automation",
        "Content Generation Pipelines",
        "AI-Enhanced Coding (Low-Code)",
      ],
      breadcrumbLeafName: "No-Code AI Agents & Automation",
      coursesCrumbLabel: "AI Product Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "AI-Agents",
      coursePrerequisites:
        "No prerequisites. Designed for non-technical professionals. No coding required.",
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is No-Code AI Agents & Automation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No-Code AI Agents & Automation is a 2-day certification teaching professionals to build AI-powered automation without programming. You learn to create intelligent agents using tools like n8n, Make.com, and Langflow, automate repetitive tasks, integrate ChatGPT and Claude APIs, and build 25+ practical business automations through hands-on projects."
        }
      },
      {
        "@type": "Question",
        "name": "What is an AI agent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI agent is an autonomous software system that performs tasks without human intervention. AI agents can research information, make decisions, execute actions, send emails, generate content, and complete multi-step workflows by using AI models like ChatGPT or Claude to process information and determine next steps."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need programming skills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No programming skills are required. The course uses no-code platforms with visual workflow builders. You'll drag-and-drop components to create automations. The course includes optional AI-enhanced coding sections where AI helps write code snippets, but this is not required for certification."
        }
      },
      {
        "@type": "Question",
        "name": "What can I automate with no-code AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can automate lead qualification, email outreach sequences, content generation, data entry, report creation, customer onboarding, meeting scheduling, document processing, social media posting, research tasks, and any repetitive digital work. The course includes 25+ real-world automation examples you build during training."
        }
      },
      {
        "@type": "Question",
        "name": "What is n8n and Make.com?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "n8n and Make.com are no-code automation platforms that connect different apps and services. They provide visual workflow builders where you drag-and-drop nodes to create automations. Both integrate with hundreds of tools (Gmail, Slack, databases, APIs) and support AI models for intelligent automation."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This course is ideal for business professionals, operations managers, marketers, salespeople, customer success teams, and anyone handling repetitive digital tasks who wants to boost productivity with AI automation. No technical background needed—if you can use a web browser, you can build AI agents."
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

