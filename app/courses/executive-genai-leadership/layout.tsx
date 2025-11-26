import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive GenAI Leadership™ Certification Training | GenAI Leadership Course | Agile36",
  description: "Lead your organization's AI transformation with strategic GenAI leadership. Learn GenAI strategy development, executive AI decision-making frameworks, ethical AI implementation, and organizational transformation. Expert-led training.",
  keywords: [
    "Executive GenAI Leadership",
    "GenAI Leadership",
    "Executive AI Leadership",
    "GenAI Strategy",
    "AI Executive Training",
    "AI Leadership",
    "GenAI Decision Making",
    "AI Transformation Leadership",
    "Executive AI Training",
    "GenAI Governance",
    "AI Strategy Development",
    "Executive AI Certification"
  ],
  openGraph: {
    title: "Executive GenAI Leadership™ Certification Training | GenAI Leadership Course | Agile36",
    description: "Lead your organization's AI transformation with strategic GenAI leadership. Learn GenAI strategy development, executive AI decision-making frameworks, and ethical AI implementation.",
    type: "website",
    url: "https://agile36.com/courses/executive-genai-leadership",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive GenAI Leadership™ Certification Training",
    description: "Lead your organization's AI transformation with strategic GenAI leadership. Learn GenAI strategy development, executive AI decision-making frameworks, and ethical AI implementation.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/executive-genai-leadership",
  },
};

export default function ExecutiveGenAILeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Executive GenAI Leadership™ Certification Training",
    "description": "Executive GenAI Leadership teaches C-suite and senior leaders to drive AI transformation. Learn to develop AI strategy, build governance frameworks, assess AI risks, measure ROI, and lead organizational change for generative AI adoption.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "EGL",
    "educationalCredentialAwarded": "Executive GenAI Leadership™ Certification",
    "timeRequired": "P2D",
    "courseDuration": "10 hours",
    "coursePrerequisites": "Executive, VP, or senior leadership role recommended",
    "teaches": [
      "GenAI Strategy Development and Planning",
      "Executive AI Decision-Making Frameworks",
      "AI Transformation Leadership",
      "Ethical AI Implementation and Governance",
      "AI Risk Management and Mitigation",
      "Measuring AI ROI and Business Value",
      "Building Organizational AI Capabilities",
      "Change Management for AI Adoption"
    ],
    "offers": {
      "@type": "Offer",
      "price": "950",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/executive-genai-leadership/schedule"
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
        "name": "What is Executive GenAI Leadership certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Executive GenAI Leadership is a 2-day certification for C-suite and senior leaders driving AI transformation. You learn to develop AI strategy, build governance frameworks, assess risks, measure ROI, manage organizational change, and lead enterprise-wide generative AI adoption from the executive level."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take Executive GenAI Leadership?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This certification is designed for CEOs, CTOs, CIOs, VPs, Directors, and Board Members responsible for organizational AI strategy and transformation. It's ideal for executives making strategic AI investment decisions and leading enterprise-wide AI initiatives."
        }
      },
      {
        "@type": "Question",
        "name": "What is AI governance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI governance is the framework of policies, procedures, and controls that guide ethical and responsible AI use within an organization. It includes risk management, compliance, data privacy, bias mitigation, transparency, accountability, and ensuring AI aligns with business values and regulatory requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure AI ROI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI ROI is measured by comparing AI implementation costs (technology, training, change management) against business value generated (productivity gains, cost savings, revenue increase, faster time-to-market). Key metrics include efficiency improvements, error reduction, customer satisfaction, and competitive advantage."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need technical skills for this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No technical or programming skills are required. The course focuses on strategic leadership, decision-making frameworks, governance, and organizational transformation. You'll learn to evaluate AI capabilities, ask the right questions, and lead AI initiatives without needing technical implementation knowledge."
        }
      },
      {
        "@type": "Question",
        "name": "What is AI transformation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI transformation is the strategic integration of artificial intelligence across an organization to fundamentally change how work is done. It involves updating processes, reskilling employees, adopting new technologies, changing culture, and aligning AI capabilities with business objectives to create competitive advantage."
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
        "name": "Executive GenAI Leadership",
        "item": "https://www.agile36.com/courses/executive-genai-leadership"
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
