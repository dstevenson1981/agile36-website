import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("ai-driven-scrum-master"),
  description: "2026 live cohorts: Enhance your Scrum Master skills with AI-powered tools and practices. Learn AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching. Expert-led training.",
  keywords: [
    "AI-Driven Scrum Master",
    "AI Scrum Master",
    "Scrum Master AI",
    "AI-enhanced Scrum",
    "Agile AI tools",
    "AI team facilitation",
    "AI backlog refinement",
    "AI sprint planning",
    "Scrum Master training",
    "AI coaching",
    "Generative AI for Scrum",
    "AI Scrum practices"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("ai-driven-scrum-master"),
    description: "2026: Enhance your Scrum Master skills with AI-powered tools and practices. Learn AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-driven-scrum-master",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("ai-driven-scrum-master"),
    description: "2026: Enhance your Scrum Master skills with AI-powered tools and practices. Learn AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/ai-driven-scrum-master",
  },
};

export default async function AIDrivenScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("ai-driven-scrum-master");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "ai-driven-scrum-master",
      canonical: "https://www.agile36.com/courses/ai-driven-scrum-master",
      schedulePath: "/courses/ai-driven-scrum-master/schedule",
      courseDisplayName: "AI-Driven Scrum Master™ Certification Training",
      description:
        "AI-Driven Scrum Master certification teaches Scrum Masters to use generative AI for sprint planning, retrospectives, backlog management, and team coaching. Learn prompt engineering, AI-assisted facilitation, and automated workflow optimization.",
      teaches: [
        "AI-Enhanced Scrum Practices",
        "AI for Backlog Refinement",
        "AI-Driven Sprint Planning",
        "AI-Powered Retrospectives",
        "AI for Daily Scrum and Flow Metrics",
        "Coaching and Facilitation with AI",
        "Prompt Engineering for Agile Coaches",
        "Ethics and Responsible AI in Agile Teams",
      ],
      breadcrumbLeafName: "AI-Driven Scrum Master",
      coursesCrumbLabel: "Generative AI Courses",
      defaultPrice: 555,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "AI-SM",
      coursePrerequisites:
        "Scrum Master experience or Agile facilitation background recommended",
      educationalCredentialAwarded: "AI-Driven Scrum Master™ Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 234,
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
        "name": "What is AI-Driven Scrum Master certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI-Driven Scrum Master certification teaches Scrum Masters to integrate generative AI tools into Agile practices. You learn to use AI for sprint planning, facilitate AI-assisted retrospectives, automate repetitive tasks, and enhance team coaching with AI-generated insights. The certification combines traditional Scrum Master skills with practical AI implementation."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to be a Scrum Master to take this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this course is designed for existing Scrum Masters or those with Agile facilitation experience. You should understand Scrum roles, events, and artifacts before learning to augment these practices with AI. If you're new to Scrum, consider taking SAFe Scrum Master or Certified Scrum Master first."
        }
      },
      {
        "@type": "Question",
        "name": "What AI tools will I learn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll learn to use ChatGPT, Claude, Microsoft Copilot, and specialized Agile AI tools for sprint planning, backlog refinement, retrospective facilitation, and team analytics. The course teaches prompt engineering techniques specific to Scrum ceremonies and practical integration into daily Scrum Master activities."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from regular Scrum Master training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional Scrum Master training focuses on facilitating Scrum events manually. AI-Driven Scrum Master adds generative AI capabilities: automated sprint reports, AI-generated retrospective insights, predictive team analytics, automated documentation, and AI-assisted coaching. It enhances Scrum Master skills with AI efficiency."
        }
      },
      {
        "@type": "Question",
        "name": "Will AI replace Scrum Masters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. AI augments Scrum Masters but cannot replace the human elements of coaching, facilitation, conflict resolution, and emotional intelligence. This course teaches you to use AI as a productivity tool while maintaining the servant leadership role that requires human judgment and empathy."
        }
      },
      {
        "@type": "Question",
        "name": "How long is the AI-Driven Scrum Master course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The course is 2 days (16 hours) delivered as live virtual training. It includes hands-on practice with AI tools, real-world scenarios, group exercises, and certification upon completion. You receive lifetime access to course materials and AI prompt templates."
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
