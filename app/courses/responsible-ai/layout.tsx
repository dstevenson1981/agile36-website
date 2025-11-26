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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Achieving Responsible AI with SAFe Micro-credential Course",
    "description": "Master Responsible AI practices with Achieving Responsible AI with SAFe Micro-credential Course. Learn stakeholder identification, RAI policy evaluation, communication strategies, and epic hypothesis statement writing.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "AI-SAFe",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic understanding of Agile principles and SAFe recommended",
    "teaches": [
      "Stakeholder Identification",
      "RAI Policy Evaluation",
      "Communicating RAI Needs",
      "RAI Epic Hypothesis Statement Writing",
      "AI Transformation with SAFe",
      "Responsible AI Governance"
    ],
    "offers": {
      "@type": "Offer",
      "price": "325",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}

