import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No-Code AI Agents & Automation™ Training | AI Automation for Non-Programmers | Agile36",
  description: "Master no-code AI agents and automation without programming! Learn to build intelligent workflows, automate tasks, and optimize productivity. 25+ hands-on projects. Perfect for non-technical professionals. 2-day intensive course.",
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
    title: "No-Code AI Agents & Automation™ Training | AI Automation for Non-Programmers | Agile36",
    description: "Master no-code AI agents and automation without programming! Build intelligent workflows, automate tasks, and supercharge productivity with 25+ hands-on projects.",
    type: "website",
    url: "https://agile36.com/courses/ai-agent-builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "No-Code AI Agents & Automation™ Training",
    description: "Master no-code AI agents and automation without programming! Build intelligent workflows with 25+ hands-on projects.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/ai-agent-builder",
  },
};

export default function AIAgentBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "No-Code AI Agents & Automation™ Certification Training",
    "description": "Master no-code AI agents and automation without programming! Learn to build intelligent workflows, automate tasks, and optimize productivity with 25+ hands-on projects in this comprehensive 2-day intensive course.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "No-Code-AI-Automation",
    "timeRequired": "PT10H",
    "coursePrerequisites": "No prerequisites! Designed for non-technical professionals. No coding experience required.",
    "teaches": [
      "No-Code AI Automation",
      "AI Agent Development",
      "Workflow Optimization",
      "ChatGPT API Integration",
      "Business Process Automation",
      "n8n, Make.com, Langflow Platforms"
    ],
    "offers": {
      "@type": "Offer",
      "price": "699",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}

