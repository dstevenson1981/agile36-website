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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Executive GenAI Leadership™ Certification Training",
    "description": "Lead your organization's AI transformation with strategic GenAI leadership. Learn GenAI strategy development, executive AI decision-making frameworks, ethical AI implementation, and organizational transformation.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "EGL",
    "timeRequired": "P1D",
    "coursePrerequisites": "Executive or senior leadership role recommended",
    "teaches": [
      "GenAI Strategy Development",
      "Executive AI Decision-Making",
      "AI Transformation Leadership",
      "Ethical AI Implementation",
      "AI Risk Management",
      "AI Governance",
      "Measuring AI ROI",
      "Building AI Capabilities"
    ],
    "offers": {
      "@type": "Offer",
      "price": "950",
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
