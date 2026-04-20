import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SAFe Agile Product Management (APM) Certification Training (2026) | Agile36",
  description: "2026 live cohorts: Earn your SAFe APM certification with Agile36. 3-day live training covering continuous exploration, product strategy, and design thinking. SAFe Silver Partner. Exam included.",
  keywords: [
    "SAFe Agile Product Management",
    "SAFe APM certification",
    "Agile Product Management training",
    "SAFe 6.0 APM",
    "design thinking",
    "continuous exploration",
    "empathy-driven design",
    "product strategy",
    "product vision",
    "roadmap creation",
    "market segmentation",
    "Lean UX",
    "customer-centric product development",
    "innovation in value streams",
    "SAFe APM certification USA",
    "Agile Product Management course",
    "SAFe Product Manager certification",
    "APM training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 Agile Product Management (APM) Certification Training (2026) | Agile36",
    description: "2026: Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, and product strategy. Earn 24 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/agile-product-management",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 Agile Product Management (APM) Certification Training (2026)",
    description: "2026: Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, and product strategy.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/agile-product-management",
  },
};

export default async function AgileProductManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "agile-product-management-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd(
    "agile-product-management-certification-training",
    {
      courseDisplayName: "SAFe® 6.0 Agile Product Management (APM) Certification Training",
      description:
        "SAFe Agile Product Management (APM) certification teaches strategic product management at scale. Learn design thinking, continuous exploration, product vision and strategy, roadmap creation, market segmentation, Lean UX, and customer-centric product development across multiple Agile Release Trains.",
      courseCode: "APM",
      coursePrerequisites:
        "Product management or Product Owner experience recommended. Leading SAFe helpful.",
      teaches: [
        "Design Thinking and Customer Empathy",
        "Continuous Exploration of Markets and Users",
        "Product Vision and Strategy Definition",
        "Strategic Roadmap Creation",
        "Market Segmentation and Personas",
        "Innovation and Product Evolution",
        "Lean UX and Hypothesis-Driven Development",
        "Product Lifecycle Management",
        "Value Stream Coordination",
      ],
      breadcrumbLeafName: "Agile Product Management",
      coursesCrumbLabel: "SAFe Courses",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
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
        "name": "What is SAFe Agile Product Management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe Agile Product Management (APM) is a 3-day certification teaching strategic product management at scale. You learn design thinking, continuous exploration of markets and customers, defining product vision and strategy, creating roadmaps, managing product lifecycles, and coordinating across multiple Agile Release Trains and value streams."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between SAFe APM and POPM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe APM (Agile Product Management) focuses on strategic product vision, market research, design thinking, and portfolio-level product strategy. POPM (Product Owner/Product Manager) focuses on program execution, backlog management, and feature delivery. APM is strategic; POPM is tactical and executional."
        }
      },
      {
        "@type": "Question",
        "name": "What is continuous exploration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Continuous Exploration is the SAFe practice of constantly researching markets, understanding customer needs, exploring solution options, and defining features before development. It includes customer research, market analysis, design thinking, prototyping, and validating assumptions to ensure teams build the right solutions."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need POPM before taking APM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, POPM is not required before APM. However, product management or Product Owner experience is helpful. APM focuses on strategic product management while POPM focuses on execution. Many professionals take POPM first to understand tactical execution before learning strategic product management in APM."
        }
      },
      {
        "@type": "Question",
        "name": "What is design thinking in SAFe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Design thinking in SAFe is a customer-centric innovation approach combining empathy, ideation, and experimentation. It includes understanding customer problems deeply, generating creative solutions, rapid prototyping, testing assumptions, and iterating based on feedback to ensure solutions deliver real customer value."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take SAFe APM certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe APM is for Product Managers, Chief Product Officers, Product Marketing Managers, Solution Managers, Business Owners, and anyone defining product strategy at organizational scale. It's ideal for leaders responsible for product vision, roadmaps, and coordinating product strategy across multiple teams."
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



