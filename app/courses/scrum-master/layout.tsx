import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 Scrum Master (SSM) Certification Training | Agile36",
  description: "Master SAFe Scrum Master skills with SAFe® SSM Certification Training. Learn team facilitation, PI planning support, impediment removal, and Agile Release Train support. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "SAFe Scrum Master",
    "SAFe SSM certification",
    "Scrum Master training",
    "SAFe 6.0 SSM",
    "team facilitation",
    "PI planning",
    "Agile Release Train",
    "impediment removal",
    "servant leadership",
    "Agile coaching",
    "Scrum Master certification",
    "SAFe SSM certification USA",
    "Scrum Master course",
    "SAFe Scrum Master certification",
    "SSM training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 Scrum Master (SSM) Certification Training | Agile36",
    description: "Master SAFe Scrum Master skills with SAFe® SSM Certification Training. Learn team facilitation, PI planning support, and Agile Release Train support. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/scrum-master",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 Scrum Master (SSM) Certification Training",
    description: "Master SAFe Scrum Master skills with SAFe® SSM Certification Training. Learn team facilitation, PI planning support, and Agile Release Train support.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/scrum-master",
  },
};

export default function ScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 Scrum Master (SSM) Certification Training",
    "description": "Master SAFe Scrum Master skills with SAFe® SSM Certification Training. Learn team facilitation, PI planning support, impediment removal, and Agile Release Train support.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe SSM",
    "educationalCredentialAwarded": "SAFe Scrum Master (SSM) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic understanding of Agile principles and Scrum practices recommended",
    "teaches": [
      "Team Facilitation",
      "Program Increment (PI) Planning Support",
      "Impediment Removal",
      "Agile Release Train Support",
      "Servant Leadership",
      "Agile Coaching",
      "Team Ceremonies",
      "Continuous Improvement"
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

