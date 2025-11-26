import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® Release Train Engineer (RTE) Certification Training | Agile36",
  description: "Master SAFe Release Train Engineer skills with SAFe® RTE Certification Training. Learn ART facilitation, PI planning, program-level coaching, and value delivery optimization. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "SAFe Release Train Engineer",
    "SAFe RTE certification",
    "Release Train Engineer training",
    "SAFe 6.0 RTE",
    "ART facilitation",
    "PI planning",
    "Agile Release Train",
    "program-level coaching",
    "stakeholder management",
    "Agile program management",
    "RTE certification",
    "SAFe RTE certification USA",
    "Release Train Engineer course",
    "SAFe Release Train Engineer certification",
    "RTE training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® Release Train Engineer (RTE) Certification Training | Agile36",
    description: "Master SAFe Release Train Engineer skills with SAFe® RTE Certification Training. Learn ART facilitation, PI planning, and program-level coaching. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/release-train-engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® Release Train Engineer (RTE) Certification Training",
    description: "Master SAFe Release Train Engineer skills with SAFe® RTE Certification Training. Learn ART facilitation, PI planning, and program-level coaching.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/release-train-engineer",
  },
};

export default function ReleaseTrainEngineerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® Release Train Engineer (RTE) Certification Training",
    "description": "Master SAFe Release Train Engineer skills with SAFe® RTE Certification Training. Learn ART facilitation, PI planning, program-level coaching, and value delivery optimization.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe RTE",
    "educationalCredentialAwarded": "SAFe Release Train Engineer (RTE) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "Experience with Agile practices and understanding of SAFe framework recommended",
    "teaches": [
      "Agile Release Train (ART) Facilitation",
      "Program Increment (PI) Planning",
      "Program-Level Coaching",
      "Stakeholder Management",
      "Dependency Management",
      "Flow Optimization",
      "Value Delivery",
      "Continuous Improvement"
    ],
    "offers": {
      "@type": "Offer",
      "price": "1299",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "180"
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

