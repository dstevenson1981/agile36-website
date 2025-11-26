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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "AI-Driven Scrum Master™ Certification Training",
    "description": "Enhance your Scrum Master skills with AI-powered tools and practices. Learn AI-enhanced backlog refinement, sprint planning, daily Scrum facilitation, and team coaching.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "AI-SM",
    "timeRequired": "P1D",
    "coursePrerequisites": "Basic understanding of Scrum fundamentals and Agile principles recommended",
    "teaches": [
      "AI-Enhanced Scrum Practices",
      "AI for Backlog Refinement",
      "AI-Driven Sprint Planning",
      "AI for Daily Scrum and Flow",
      "AI-Supported Testing and Quality",
      "Coaching & Facilitation with AI",
      "AI in Jira and Confluence",
      "Ethics and Responsible AI in Agile Teams"
    ],
    "offers": {
      "@type": "Offer",
      "price": "515",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "234"
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
