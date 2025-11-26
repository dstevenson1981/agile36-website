import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training | Agile36",
  description: "Master SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership, backlog management, epic management, and product strategy in SAFe. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
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
    title: "SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training | Agile36",
    description: "Master SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership and backlog management. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/product-owner-manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training",
    description: "Master SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership and backlog management.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/product-owner-manager",
  },
};

export default function ProductOwnerManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 Product Owner/Product Manager (POPM) Certification Training",
    "description": "Master SAFe Product Owner/Product Manager (POPM) Certification Training. Learn product ownership, backlog management, epic management, and product strategy in SAFe.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe POPM",
    "educationalCredentialAwarded": "SAFe Product Owner/Product Manager (POPM) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic understanding of Agile principles and product management experience recommended",
    "teaches": [
      "Product Ownership in SAFe",
      "Backlog Management",
      "Epic Management",
      "Product Strategy",
      "Continuous Exploration",
      "Stakeholder Collaboration",
      "Value Delivery"
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



