import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 Agile Product Management (APM) Certification Training | Agile36",
  description: "Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, empathy-driven design, product strategy, and roadmap creation. Earn 24 PDUs & SEUs. Expert-led 3-day course. Enroll now!",
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
    title: "SAFe® 6.0 Agile Product Management (APM) Certification Training | Agile36",
    description: "Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, and product strategy. Earn 24 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/agile-product-management",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 Agile Product Management (APM) Certification Training",
    description: "Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, and product strategy.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/agile-product-management",
  },
};

export default function AgileProductManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 Agile Product Management (APM) Certification Training",
    "description": "Master Agile Product Management with SAFe® APM Certification Training. Learn design thinking, continuous exploration, empathy-driven design, product strategy, and roadmap creation.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe APM",
    "educationalCredentialAwarded": "SAFe Agile Product Management (APM) Certification",
    "timeRequired": "P3D",
    "coursePrerequisites": "Basic understanding of Agile principles and product management experience recommended",
    "teaches": [
      "Design Thinking",
      "Continuous Exploration of Markets and Users",
      "Empathy-driven Design",
      "Product Vision and Strategy",
      "Roadmap Creation",
      "Market Segmentation Strategies",
      "Innovation in Value Streams",
      "Customer-centric Product Development",
      "Lean UX Principles"
    ],
    "offers": {
      "@type": "Offer",
      "price": "1150",
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



