import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generative AI for Project Managers Certification Training | AI Project Management Course | Agile36",
  description: "Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, apply AI-assisted risk analysis, and integrate GenAI across Agile, hybrid, and traditional methodologies. Expert-led training.",
  keywords: [
    "Generative AI for Project Managers",
    "AI Project Management",
    "Project Management AI",
    "AI Project Planning",
    "AI Project Tools",
    "GenAI Project Management",
    "AI-Assisted Planning",
    "Project Workflow Automation",
    "AI Risk Management",
    "Prompt Engineering",
    "AI Project Artifacts",
    "AI Project Certification"
  ],
  openGraph: {
    title: "Generative AI for Project Managers Certification Training | AI Project Management Course | Agile36",
    description: "Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, and integrate GenAI across various methodologies.",
    type: "website",
    url: "https://agile36.com/courses/generative-ai-project-managers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative AI for Project Managers Certification Training",
    description: "Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, and integrate GenAI across various methodologies.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/generative-ai-project-managers",
  },
};

export default function GenerativeAIProjectManagersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Generative AI for Project Managers Certification Training",
    "description": "Transform your project management with AI-powered tools and practices. Learn to create project artifacts using AI, develop efficient prompting techniques, apply AI-assisted risk analysis, and integrate GenAI across Agile, hybrid, and traditional methodologies.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "GAI-PM",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic project management experience recommended",
    "teaches": [
      "Generative AI Fundamentals for Project Management",
      "AI-Assisted Planning and Scheduling",
      "AI for Risk Management and Mitigation",
      "Creating Project Artifacts with AI",
      "Prompt Engineering for Project Managers",
      "AI in Agile and Scrum Practices",
      "Integrating AI into Project Management Tools",
      "Ethical AI Implementation"
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
      "reviewCount": "187"
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
