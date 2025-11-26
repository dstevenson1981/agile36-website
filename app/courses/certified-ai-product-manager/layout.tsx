import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certified AI Product Manager™ Training | AI Product Development & Prototyping | Agile36",
  description: "Master AI-powered product management! Learn to use AI throughout the product lifecycle, build prototypes, and validate ideas with stakeholders. Earn your Certified AI Product Manager™ certification. 2-day intensive course.",
  keywords: [
    "AI Product Manager",
    "AI Product Management",
    "Product Management AI",
    "AI prototyping",
    "Product development AI",
    "AI product strategy",
    "Product Manager certification",
    "AI product lifecycle",
    "Stakeholder validation",
    "Rapid prototyping",
    "AI roadmapping",
    "Product analytics AI"
  ],
  openGraph: {
    title: "Certified AI Product Manager™ Training | AI Product Development & Prototyping | Agile36",
    description: "Master AI-powered product management! Use AI throughout the product lifecycle, build prototypes, and validate ideas with stakeholders.",
    type: "website",
    url: "https://agile36.com/courses/certified-ai-product-manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certified AI Product Manager™ Training",
    description: "Master AI-powered product management! Build prototypes and validate ideas with AI tools.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/certified-ai-product-manager",
  },
};

export default function CertifiedAIProductManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Certified AI Product Manager™ Certification Training",
    "description": "Master AI-powered product management! Learn to use AI throughout the product lifecycle, build prototypes, validate ideas with stakeholders, and earn your certification in this comprehensive 2-day intensive course.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "AI-Product-Manager",
    "timeRequired": "PT10H",
    "coursePrerequisites": "Product management experience helpful but not required. No coding experience needed.",
    "teaches": [
      "AI Product Strategy",
      "Rapid Prototyping with AI",
      "AI-Powered User Research",
      "Product Lifecycle AI Integration",
      "Stakeholder Validation",
      "AI Product Analytics"
    ],
    "offers": {
      "@type": "Offer",
      "price": "450",
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

