import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leading SAFe® 6.0 Certification Training | SAFe Agilist (SA) | Agile36",
  description: "Master Leading SAFe® 6.0 Certification Training. Become a SAFe Agilist (SA). Learn enterprise Agile transformation, Agile Release Trains, PI Planning, and value streams. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "Leading SAFe",
    "SAFe Agilist",
    "SAFe SA certification",
    "SAFe 6.0 training",
    "Leading SAFe certification",
    "SAFe Agilist training",
    "SAFe certification USA",
    "Agile Release Train",
    "PI Planning",
    "value streams",
    "enterprise Agile transformation",
    "SAFe training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "Leading SAFe® 6.0 Certification Training | SAFe Agilist (SA) | Agile36",
    description: "Master Leading SAFe® 6.0 Certification Training. Become a SAFe Agilist (SA). Learn enterprise Agile transformation and value streams.",
    type: "website",
    url: "https://agile36.com/courses/leading-safe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leading SAFe® 6.0 Certification Training | SAFe Agilist (SA)",
    description: "Master Leading SAFe® 6.0 Certification Training. Become a SAFe Agilist (SA). Learn enterprise Agile transformation.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/leading-safe",
  },
};

export default function LeadingSafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Leading SAFe® 6.0 Certification Training",
    "description": "Master Leading SAFe® 6.0 Certification Training. Become a SAFe Agilist (SA). Learn enterprise Agile transformation, Agile Release Trains, PI Planning, and value streams.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe SA",
    "educationalCredentialAwarded": "SAFe Agilist (SA) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic understanding of Agile principles recommended",
    "teaches": [
      "SAFe Principles",
      "Agile Release Trains",
      "PI Planning",
      "Value Streams",
      "Enterprise Agile Transformation",
      "Lean-Agile Leadership"
    ],
    "offers": {
      "@type": "Offer",
      "price": "555.55",
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



