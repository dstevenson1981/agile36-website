import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Generative AI for Project Managers Certification Training | AI Project Management Course (2026) | Agile36",
  description: "2026 live cohorts: Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, apply AI-assisted risk analysis, and integrate GenAI across Agile, hybrid, and traditional methodologies. Expert-led training.",
  keywords: [
    "Generative AI for Project Managers",
    "AI Project Management",
    "Project Management AI",
    "AI Project Planning",
    "AI Project Tools",
    "GenAI Project Management",
    "AI-Assisted Planning",
    "Project Workflow Automation",
    "AI Risk Management",
    "Prompt Engineering",
    "AI Project Artifacts",
    "AI Project Certification"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: "Generative AI for Project Managers Certification Training | AI Project Management Course (2026) | Agile36",
    description: "2026: Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, and integrate GenAI across various methodologies.",
    type: "website",
    url: "https://www.agile36.com/courses/generative-ai-project-managers",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: "Generative AI for Project Managers Certification Training (2026)",
    description: "2026: Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, and integrate GenAI across various methodologies.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/generative-ai-project-managers",
  },
};

export default async function GenerativeAIProjectManagersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts(
    "generative-ai-project-managers"
  );
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "generative-ai-project-managers",
      canonical: "https://www.agile36.com/courses/generative-ai-project-managers",
      schedulePath: "/courses/generative-ai-project-managers/schedule",
      courseDisplayName:
        "Generative AI for Project Managers Certification Training",
      description:
        "Generative AI for Project Managers teaches project managers to use AI for planning, scheduling, risk analysis, and artifact creation. Learn prompt engineering, AI-assisted decision-making, and how to integrate generative AI into Agile, Waterfall, and hybrid methodologies.",
      teaches: [
        "Generative AI Fundamentals for Project Management",
        "AI-Assisted Planning and Scheduling",
        "AI for Risk Analysis and Mitigation",
        "Creating Project Artifacts with AI (charters, plans, status reports)",
        "Prompt Engineering for Project Managers",
        "AI in Agile, Scrum, and Waterfall",
        "Integrating AI into PM Tools (Jira, MS Project, Asana)",
        "Ethical AI Implementation and Governance",
      ],
      breadcrumbLeafName: "Generative AI for Project Managers",
      coursesCrumbLabel: "Generative AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "GAI-PM",
      coursePrerequisites: "Project management experience recommended",
      educationalCredentialAwarded:
        "Generative AI for Project Managers Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 187,
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
        "name": "What is Generative AI for Project Managers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generative AI for Project Managers is a 2-day certification teaching project managers to use AI tools for planning, scheduling, risk management, and artifact creation. You learn to generate project charters, timelines, status reports, and risk analyses using ChatGPT, Claude, and specialized PM AI tools across Agile, Waterfall, and hybrid methodologies."
        }
      },
      {
        "@type": "Question",
        "name": "How can AI help with project management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI helps project managers by automating documentation, generating risk analyses, creating project plans, scheduling tasks, analyzing data for insights, drafting status reports, identifying dependencies, predicting delays, and accelerating decision-making. AI reduces administrative overhead and allows PMs to focus on strategic leadership and stakeholder management."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need prior project management credentials?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No formal project management certification is required. The course is designed for project managers, project coordinators, program managers, and anyone managing projects. Basic project management experience is helpful but not mandatory. The course teaches AI skills that enhance any project management methodology."
        }
      },
      {
        "@type": "Question",
        "name": "What AI tools will I learn for project management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll learn ChatGPT, Claude, Microsoft Copilot, Jira AI features, and specialized project management AI tools. The course teaches prompt engineering for creating project artifacts, integrating AI into existing PM workflows, and using AI for risk analysis, resource planning, and stakeholder communications."
        }
      },
      {
        "@type": "Question",
        "name": "Can AI replace project managers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. AI augments project managers but cannot replace human leadership, stakeholder management, conflict resolution, and strategic thinking. This course teaches you to use AI as a productivity multiplier while maintaining the critical human elements of project leadership that require judgment, empathy, and relationship building."
        }
      },
      {
        "@type": "Question",
        "name": "Is this course compatible with Agile and Waterfall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The course covers AI applications across Agile, Scrum, Waterfall, and hybrid methodologies. You learn to use AI for sprint planning in Agile, creating WBS in Waterfall, managing backlogs, generating Gantt charts, and adapting AI tools to any project management framework your organization uses."
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
