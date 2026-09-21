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
  description: "2026 live cohorts: Two days, 9:00 AM–2:00 PM Eastern. Build reusable AI skills and automated Scrum workflows, then leave with the AI-Driven Scrum Master™ certification issued through Accredible.",
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
    description: "2026: Two days, 9:00 AM–2:00 PM Eastern. Build reusable AI skills and automated Scrum workflows. Leave with the AI-Driven Scrum Master™ certification.",
    type: "website",
    url: "https://www.agile36.com/courses/ai-driven-scrum-master",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("ai-driven-scrum-master"),
    description: "2026: Two days, 9:00 AM–2:00 PM Eastern. Build reusable AI skills and automated Scrum workflows. Leave with the AI-Driven Scrum Master™ certification.",
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
        "Live two-day AI-Driven Scrum Master™ certification. Day 1 is AI skills for Scrum Masters. Day 2 is reusable skills, automated workflows, and a capstone system. Issued through Accredible. No exam.",
      teaches: [
        "The AI-Empowered Scrum Master",
        "Working Effectively with AI",
        "Sprint and Team Intelligence",
        "AI-Powered Scrum Events",
        "Backlog and Story Analysis",
        "AI for Coaching and Facilitation",
        "Creating Reusable AI Skills",
        "Sprint Health Skill",
        "Facilitation and Retrospective Skills",
        "Designing Automated Workflows",
        "Automating Scrum Master Work",
        "Capstone: Build Your AI Scrum Master System",
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
          "text": "AI-Driven Scrum Master™ certification is a live two-day class. Day 1 is AI skills for Scrum Masters: judgment, prompting, sprint intelligence, every event, backlog quality, and coaching. Day 2 is reusable AI skills, automated workflows, and a capstone system. You leave with the credential, issued through Accredible. There is no exam."
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
          "text": "You'll learn to work with AI on documents and team data, build reusable skills, and automate sprint summaries, blocker tracking, action follow-up, and stakeholder updates. The course is not a vendor tour — it is the Scrum Master job with AI in the loop."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from regular Scrum Master training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional Scrum Master training teaches you to run the events by hand. This class adds reusable AI skills and automated workflows around those events: sprint health, facilitation prep, retros, summaries, and follow-up. You still keep coaching, conflict, and judgment."
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
          "text": "The course is 2 days, 9:00 AM–2:00 PM Eastern each day (5 hours per day, 10 hours total), delivered as live virtual training. It includes hands-on practice with AI tools, real-world scenarios, group exercises, and certification upon completion. You receive lifetime access to course materials and AI prompt templates."
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
