import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Scrum Master Certification Path | Agile36",
  description: "Master advanced SAFe Scrum Master skills with the Advanced Scrum Master Certification Path. Learn program-level coaching, facilitation, and advanced Agile Release Train support. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "SAFe Advanced Scrum Master",
    "SAFe A-CSM certification",
    "Advanced Scrum Master training",
    "SAFe 6.0 A-CSM",
    "program-level coaching",
    "advanced facilitation",
    "Agile Release Train",
    "servant leadership",
    "advanced Agile coaching",
    "Advanced Scrum Master certification",
    "SAFe A-CSM certification USA",
    "Advanced Scrum Master course",
    "SAFe Advanced Scrum Master certification",
    "A-CSM training online",
    "SAFe advanced certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 Advanced Scrum Master (A-CSM) Certification Training | Agile36",
    description: "Master advanced SAFe Scrum Master skills with SAFe® Advanced Scrum Master Certification Training. Learn program-level coaching, facilitation, and advanced Agile Release Train support. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/advanced-scrum-master",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 Advanced Scrum Master (A-CSM) Certification Training",
    description: "Master advanced SAFe Scrum Master skills with SAFe® Advanced Scrum Master Certification Training. Learn program-level coaching, facilitation, and advanced Agile Release Train support.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/advanced-scrum-master",
  },
};

export default function AdvancedScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Advanced Scrum Master Certification Path",
    "description": "Master advanced SAFe Scrum Master skills with the Advanced Scrum Master Certification Path. Learn program-level coaching, facilitation, and advanced Agile Release Train support.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe A-CSM",
    "educationalCredentialAwarded": "SAFe Advanced Scrum Master (A-CSM) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "SAFe Scrum Master (SSM) certification required",
    "teaches": [
      "Program-Level Coaching",
      "Advanced Facilitation",
      "Agile Release Train Support",
      "Advanced Servant Leadership",
      "Advanced Agile Coaching",
      "Team Ceremonies",
      "Continuous Improvement",
      "Organizational Change"
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
      "reviewCount": "198"
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

