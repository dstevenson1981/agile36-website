import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("certified-ai-product-manager"),
  description: "2026 live cohorts: Master AI-powered product management! Learn to use AI throughout the product lifecycle, build prototypes, and validate ideas with stakeholders. Earn your Certified AI Product Manager™ certification. 2-day intensive course.",
  keywords: [
    "AI Product Manager",
    "AI Product Management",
    "Product Management AI",
    "AI prototyping",
    "Product development AI",
    "AI product strategy",
    "Product Manager certification",
    "AI product lifecycle",
    "Stakeholder validation",
    "Rapid prototyping",
    "AI roadmapping",
    "Product analytics AI"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("certified-ai-product-manager"),
    description: "2026: Master AI-powered product management! Use AI throughout the product lifecycle, build prototypes, and validate ideas with stakeholders.",
    type: "website",
    url: "https://www.agile36.com/courses/certified-ai-product-manager",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("certified-ai-product-manager"),
    description: "2026: Master AI-powered product management! Build prototypes and validate ideas with AI tools.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/certified-ai-product-manager",
  },
};

export default async function CertifiedAIProductManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts(
    "certified-ai-product-manager"
  );
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "certified-ai-product-manager",
      canonical: "https://www.agile36.com/courses/certified-ai-product-manager",
      schedulePath: "/courses/certified-ai-product-manager/schedule",
      courseDisplayName: "Certified AI Product Manager™ Certification Training",
      description:
        "Certified AI Product Manager teaches product managers to use AI throughout the product development lifecycle. Learn AI-powered user research, rapid prototyping, stakeholder validation, product analytics, and how to build working prototypes to demonstrate concepts.",
      teaches: [
        "AI Product Strategy and Roadmapping",
        "Rapid Prototyping with No-Code AI Tools",
        "AI-Powered User Research and Validation",
        "Product Lifecycle AI Integration",
        "Stakeholder Demos and Validation",
        "AI Product Analytics and Metrics",
        "Competitive Analysis with AI",
        "Product Documentation with AI",
      ],
      breadcrumbLeafName: "Certified AI Product Manager",
      coursesCrumbLabel: "AI Product Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "AI-PM",
      coursePrerequisites:
        "Product management or product owner experience recommended. No coding required.",
      educationalCredentialAwarded: "Certified AI Product Manager™",
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
        "name": "What is Certified AI Product Manager?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certified AI Product Manager is a 2-day certification that teaches product managers to use AI throughout the entire product development lifecycle. You learn to conduct AI-powered user research, build rapid prototypes without coding, validate ideas with stakeholders, analyze product data with AI, and demonstrate concepts through working demos."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need coding skills for this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No coding skills are required. The course teaches no-code and low-code AI tools for product managers. You'll learn to build prototypes using tools like ChatGPT, Claude, Figma with AI plugins, and no-code platforms without writing any code."
        }
      },
      {
        "@type": "Question",
        "name": "What is AI-powered rapid prototyping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI-powered rapid prototyping uses generative AI tools to quickly create working product demos and mockups. Product managers use AI to generate UI designs, write copy, create user flows, and build interactive prototypes in hours instead of weeks, enabling faster stakeholder validation and iteration."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from traditional product management training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional product management focuses on manual processes for research, documentation, and stakeholder communication. AI Product Manager training adds AI capabilities: automated user research analysis, AI-generated PRDs, rapid prototype creation, predictive analytics, and AI-assisted roadmapping, dramatically accelerating the product lifecycle."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take this certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This certification is ideal for Product Managers, Product Owners, Business Analysts, UX Designers transitioning to product roles, and technical leaders responsible for product strategy. Anyone defining, building, or managing digital products can benefit from AI-powered product management skills."
        }
      },
      {
        "@type": "Question",
        "name": "What AI tools will I learn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll learn ChatGPT, Claude, Microsoft Copilot, Figma AI plugins, no-code prototyping tools, AI analytics platforms, and specialized product management AI tools. The course teaches practical integration of these tools into your daily product management workflow."
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

