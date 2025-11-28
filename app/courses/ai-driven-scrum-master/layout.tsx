import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Driven Scrum Master™ Certification Training | AI Scrum Master Course | Agile36",
  description: "Enhance your Scrum Master skills with AI-powered tools and practices. Learn AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching. Expert-led training.",
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
    title: "AI-Driven Scrum Master™ Certification Training | AI Scrum Master Course | Agile36",
    description: "Enhance your Scrum Master skills with AI-powered tools and practices. Learn AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching.",
    type: "website",
    url: "https://agile36.com/courses/ai-driven-scrum-master",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Driven Scrum Master™ Certification Training",
    description: "Enhance your Scrum Master skills with AI-powered tools and practices. Learn AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/ai-driven-scrum-master",
  },
};

export default function AIDrivenScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "AI-Driven Scrum Master™ Certification Training",
    "description": "AI-Driven Scrum Master certification teaches Scrum Masters to use generative AI for sprint planning, retrospectives, backlog management, and team coaching. Learn prompt engineering, AI-assisted facilitation, and automated workflow optimization.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "AI-SM",
    "educationalCredentialAwarded": "AI-Driven Scrum Master™ Certification",
    "timeRequired": "P2D",
    "courseDuration": "16 hours",
    "coursePrerequisites": "Scrum Master experience or Agile facilitation background recommended",
    "teaches": [
      "AI-Enhanced Scrum Practices",
      "AI for Backlog Refinement",
      "AI-Driven Sprint Planning",
      "AI-Powered Retrospectives",
      "AI for Daily Scrum and Flow Metrics",
      "Coaching and Facilitation with AI",
      "Prompt Engineering for Agile Coaches",
      "Ethics and Responsible AI in Agile Teams"
    ],
    "offers": {
      "@type": "Offer",
      "price": "555",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/ai-driven-scrum-master/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "234",
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
        "name": "Generative AI Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AI-Driven Scrum Master",
        "item": "https://www.agile36.com/courses/ai-driven-scrum-master"
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
