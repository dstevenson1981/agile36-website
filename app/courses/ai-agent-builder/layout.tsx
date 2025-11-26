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
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "No-Code AI Agents & Automation™ Certification Training",
    "description": "No-Code AI Agents & Automation teaches professionals to build AI-powered automation without programming. Learn to create intelligent agents, automate workflows using n8n and Make.com, integrate ChatGPT APIs, and build 25+ practical automations for business productivity.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "AI-Agents",
    "educationalCredentialAwarded": "No-Code AI Agents & Automation™ Certification",
    "timeRequired": "P2D",
    "courseDuration": "10 hours",
    "coursePrerequisites": "No prerequisites. Designed for non-technical professionals. No coding required.",
    "teaches": [
      "Building No-Code AI Agents",
      "Multi-Step Workflow Automation",
      "ChatGPT and Claude API Integration",
      "n8n, Make.com, and Langflow Platforms",
      "Business Process Automation",
      "Lead Qualification and Outreach Automation",
      "Content Generation Pipelines",
      "AI-Enhanced Coding (Low-Code)"
    ],
    "offers": {
      "@type": "Offer",
      "price": "699",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/ai-agent-builder/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.agile36.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Product Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "No-Code AI Agents & Automation",
        "item": "https://www.agile36.com/courses/ai-agent-builder"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

