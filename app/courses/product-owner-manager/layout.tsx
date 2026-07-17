import type { Metadata } from "next";
import PracticeExamUpsellBanner from "@/app/components/PracticeExamUpsellBanner";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI-Empowered SAFe POPM Certification Training | Product Owner Product Manager (2026) | Agile36",
  description: "2026 live cohorts: Get AI-Empowered SAFe POPM certified with Agile36. 2-day live training covering backlog management, PI Planning, and Lean-Agile product delivery. SAFe Silver Partner. Exam included.",
  keywords: [
    "SAFe Product Owner",
    "SAFe Product Manager",
    "SAFe POPM certification",
    "SAFe 6.0 POPM",
    "Product Owner training",
    "Product Manager training",
    "SAFe POPM certification USA",
    "Agile Product Owner course",
    "SAFe Product Owner certification",
    "POPM training online",
    "SAFe certification training",
    "backlog management",
    "epic management",
    "product strategy",
    "continuous exploration"
  ],
  openGraph: {
    title: "AI-Empowered SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training (2026) | Agile36",
    description: "2026: Master AI-Empowered SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership and backlog management. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/product-owner-manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Empowered SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training (2026)",
    description: "2026: Master AI-Empowered SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership and backlog management.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/product-owner-manager",
  },
};

export default async function ProductOwnerManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "safe-product-owner-product-manager-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd(
    "safe-product-owner-product-manager-certification-training",
    {
      courseDisplayName: "SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training",
      description:
        "SAFe Product Owner/Product Manager (POPM) certification teaches product ownership at scale. Learn to define and prioritize program backlogs, manage epics and features, execute PI Planning, collaborate with stakeholders, and deliver customer value through Agile Release Trains.",
      courseCode: "POPM",
      coursePrerequisites:
        "Product Owner, Product Manager, or Business Analyst experience recommended",
      teaches: [
        "Product Ownership in SAFe",
        "Program Backlog Management",
        "Epic and Feature Management",
        "Product Strategy and Vision",
        "Continuous Exploration",
        "PI Planning Execution",
        "Stakeholder Collaboration",
        "Value Stream Delivery",
      ],
      breadcrumbLeafName: "SAFe Product Owner/Product Manager",
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
        "name": "What is SAFe Product Owner/Product Manager (POPM)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe POPM is a 2-day certification teaching Product Owners and Product Managers to work at program level within SAFe. You learn to define product vision, prioritize program backlogs, collaborate with stakeholders, manage epics and features, participate in PI Planning, and deliver customer value through Agile Release Trains with 50-125 team members."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Product Owner and Product Manager in SAFe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In SAFe, Product Owner focuses on team-level backlog and execution within a single Agile team. Product Manager works at program level across multiple teams, defining features, managing program backlog, and coordinating with stakeholders. Both roles often overlap and the POPM certification covers both responsibilities."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to be a Certified Scrum Product Owner first?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, CSPO is not required. SAFe POPM is a standalone certification. However, understanding basic Product Owner responsibilities and Agile principles is helpful. The course teaches SAFe-specific product management at scale, which differs from single-team Product Owner practices."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Program Backlog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Program Backlog is a prioritized list of features and enablers for an Agile Release Train. Product Managers maintain this backlog, which feeds work to multiple Agile teams. Features are broken down from epics, refined through continuous exploration, and prioritized based on WSJF (Weighted Shortest Job First) to maximize value delivery."
        }
      },
      {
        "@type": "Question",
        "name": "What does a SAFe Product Owner do in PI Planning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "During PI Planning, Product Owners present team backlogs, clarify feature acceptance criteria, prioritize stories, collaborate with teams on capacity and dependencies, participate in breakout sessions, and commit to PI Objectives. They serve as the voice of the customer and ensure teams understand what needs to be delivered."
        }
      },
      {
        "@type": "Question",
        "name": "How much does SAFe POPM certification cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe POPM certification through Agile36 costs $515. This includes 2-day live training, course materials, exam fee, one free retake, one-year SAFe Community Platform access, and 16 PDUs/SEUs. The certification is valid for one year and can be renewed."
        }
      }
    ]
  };

  return (
    <>
      <PracticeExamUpsellBanner courseSlug="product-owner-manager" schedulePath="/courses/product-owner-manager/schedule" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}



