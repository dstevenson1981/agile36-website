import type { Metadata } from "next";
import PracticeExamUpsellBanner from "@/app/components/PracticeExamUpsellBanner";

export const metadata: Metadata = {
  title: "SAFe Lean Portfolio Management (LPM) Certification Training (2026) | Agile36",
  description: "2026 live cohorts: Earn your SAFe LPM certification with Agile36. 2-day live training in portfolio strategy, Lean budgeting, and Agile governance. SAFe Silver Partner. Exam included. Enroll now.",
  keywords: [
    "SAFe Lean Portfolio Management",
    "SAFe LPM certification",
    "Lean Portfolio Management training",
    "SAFe 6.0 LPM",
    "portfolio strategy",
    "investment funding",
    "lean governance",
    "portfolio flow",
    "portfolio Kanban",
    "SAFe LPM certification USA",
    "Agile Portfolio Management course",
    "SAFe Portfolio Manager certification",
    "LPM training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training (2026) | Agile36",
    description: "2026: Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy and investment funding. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/lean-portfolio-management",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training (2026)",
    description: "2026: Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy and investment funding.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/lean-portfolio-management",
  },
};

export default function LeanPortfolioManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training",
    "description": "SAFe Lean Portfolio Management (LPM) certification teaches portfolio-level strategy and investment management in SAFe. Learn to align strategy and execution, manage portfolio Kanban, establish lean budgets, govern value streams, and optimize portfolio flow for maximum business value.",
    "provider": {
      "@id": "https://www.agile36.com/#organization"
    },
    "courseCode": "LPM",
    "educationalCredentialAwarded": "SAFe Lean Portfolio Management (LPM) Certification",
    "timeRequired": "P3D",
    "courseDuration": "24 hours",
    "coursePrerequisites": "Executive, portfolio manager, or program manager role. Leading SAFe certification recommended.",
    "teaches": [
      "Portfolio Strategy and Investment Funding",
      "Lean Governance and Compliance",
      "Portfolio Kanban Management",
      "Epic Prioritization and Management",
      "Value Stream Coordination",
      "Lean Budget Guardrails",
      "Portfolio Flow Optimization",
      "Strategic Themes and OKRs"
    ],
    "offers": {
      "@type": "Offer",
      "price": "950",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/lean-portfolio-management/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2500",
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
        "name": "What is Lean Portfolio Management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lean Portfolio Management (LPM) is the highest level of SAFe, aligning strategy and execution. It manages portfolio vision and strategy, investment funding across value streams, lean governance, portfolio Kanban for epic management, and ensures portfolio work delivers maximum business value through continuous flow and feedback."
        }
      },
      {
        "@type": "Question",
        "name": "What does an LPM do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Lean Portfolio Manager establishes portfolio strategy, allocates budgets to value streams, manages portfolio Kanban, prioritizes epics, governs investment decisions, tracks portfolio metrics, facilitates strategic planning, coordinates across value streams, and ensures alignment between business strategy and execution."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need Leading SAFe before taking LPM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leading SAFe is recommended but not required. Understanding SAFe principles, Agile Release Trains, PI Planning, and value streams helps you grasp portfolio-level concepts faster. LPM builds on SAFe foundation, adding portfolio strategy, investment management, and enterprise-level governance."
        }
      },
      {
        "@type": "Question",
        "name": "What is Portfolio Kanban?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Portfolio Kanban is a visual workflow system for managing epics from idea through implementation. It includes states like Funnel, Reviewing, Analyzing, Portfolio Backlog, Implementing, and Done. Epics move through Portfolio Kanban based on WSJF prioritization, capacity, and strategic alignment."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take LPM certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LPM certification is for executives, portfolio managers, program managers, business owners, enterprise architects, and leaders responsible for strategic planning, investment decisions, value stream management, or aligning organizational strategy with Agile execution across multiple ARTs."
        }
      },
      {
        "@type": "Question",
        "name": "How long is SAFe LPM training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe LPM training is 3 days (24 hours). After completing the course, you take the online LPM exam within 30 days. The exam takes 120 minutes. Upon passing, you earn the LPM certification valid for one year. The certification demonstrates enterprise-level SAFe portfolio management expertise."
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
        "name": "SAFe Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Lean Portfolio Management",
        "item": "https://www.agile36.com/courses/lean-portfolio-management"
      }
    ]
  };

  return (
    <>
      <PracticeExamUpsellBanner courseSlug="lean-portfolio-management" schedulePath="/courses/lean-portfolio-management/schedule" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}



