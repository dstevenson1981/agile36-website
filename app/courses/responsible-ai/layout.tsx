import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achieving Responsible AI with SAFe Micro-credential Course | Responsible AI Training | Agile36",
  description: "Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, communication strategies, and epic hypothesis statement writing. Expert-led training.",
  keywords: [
    "Responsible AI",
    "AI with SAFe",
    "RAI policies",
    "AI transformation",
    "SAFe AI",
    "Responsible AI training",
    "AI ethics",
    "SAFe micro-credential",
    "AI stakeholder management",
    "RAI epic hypothesis",
    "AI governance",
    "SAFe AI integration"
  ],
  openGraph: {
    title: "Achieving Responsible AI with SAFe Micro-credential Course | Responsible AI Training | Agile36",
    description: "Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, and communication strategies.",
    type: "website",
    url: "https://agile36.com/courses/responsible-ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achieving Responsible AI with SAFe Micro-credential Course",
    description: "Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, and communication strategies.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/responsible-ai",
  },
};

export default function ResponsibleAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Achieving Responsible AI with SAFe™ Micro-credential Course",
    "description": "Responsible AI with SAFe micro-credential teaches ethical AI implementation within Scaled Agile Framework. Learn to identify RAI stakeholders, evaluate AI policies, write epic hypotheses for AI initiatives, communicate AI risks, and integrate responsible AI practices into Agile Release Trains.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "RAI",
    "educationalCredentialAwarded": "Achieving Responsible AI with SAFe™ Micro-credential",
    "timeRequired": "P2D",
    "courseDuration": "10 hours",
    "coursePrerequisites": "SAFe knowledge helpful. Open to product managers, architects, leaders involved in AI initiatives.",
    "teaches": [
      "Responsible AI Stakeholder Identification",
      "RAI Policy Evaluation and Compliance",
      "Communicating AI Risks and Ethics",
      "Writing RAI Epic Hypothesis Statements",
      "AI Transformation with SAFe Framework",
      "Responsible AI Governance and Oversight"
    ],
    "offers": {
      "@type": "Offer",
      "price": "350",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/responsible-ai/schedule"
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
        "name": "What is Responsible AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Responsible AI (RAI) is the practice of developing and deploying artificial intelligence systems ethically, transparently, and with accountability. It includes ensuring fairness, preventing bias, protecting privacy, maintaining security, providing explainability, and aligning AI systems with human values and societal norms."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Responsible AI with SAFe micro-credential?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Achieving Responsible AI with SAFe is a 2-day micro-credential teaching how to implement ethical AI within SAFe. You learn to identify RAI stakeholders, evaluate AI policies, write epic hypotheses for AI projects, communicate risks, and integrate responsible AI governance into Agile Release Trains and value streams."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This course is for Product Managers, Product Owners, Solution Architects, Business Owners, executives, and anyone involved in AI initiative planning or implementation within SAFe environments. No technical AI background required—focus is on governance, ethics, and stakeholder management."
        }
      },
      {
        "@type": "Question",
        "name": "What are RAI epic hypotheses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RAI epic hypotheses are statements defining AI initiatives with measurable outcomes and responsible AI criteria. They articulate the business value, technical approach, ethical considerations, success metrics, and responsible AI guardrails for AI epics moving through portfolio Kanban in SAFe."
        }
      },
      {
        "@type": "Question",
        "name": "Is this course technical?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, this is not a technical AI course. It focuses on responsible AI governance, policy evaluation, stakeholder management, and integrating RAI practices into SAFe workflows. You don't need programming or data science skills—the course is designed for business and leadership roles."
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
        "name": "Responsible AI with SAFe",
        "item": "https://www.agile36.com/courses/responsible-ai"
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

