import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 for Teams Certification Training | Agile36",
  description: "Master SAFe team member skills with SAFe® for Teams Certification Training. Learn team collaboration, iteration planning and execution, PI planning participation, and value delivery in Lean-Agile environments. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "SAFe for Teams",
    "SAFe Practitioner certification",
    "SAFe SP certification",
    "SAFe 6.0 for Teams",
    "team collaboration",
    "iteration planning",
    "Agile Release Train",
    "PI planning",
    "Lean-Agile",
    "Agile team member",
    "SAFe Practitioner certification USA",
    "SAFe for Teams course",
    "SAFe for Teams certification",
    "SP training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 for Teams Certification Training | Agile36",
    description: "Master SAFe team member skills with SAFe® for Teams Certification Training. Learn team collaboration, iteration planning and execution, and PI planning participation. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/safe-for-teams",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 for Teams Certification Training",
    description: "Master SAFe team member skills with SAFe® for Teams Certification Training. Learn team collaboration, iteration planning and execution, and PI planning participation.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/safe-for-teams",
  },
};

export default function SafeForTeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 for Teams Certification Training",
    "description": "Master SAFe team member skills with SAFe® for Teams Certification Training. Learn team collaboration, iteration planning and execution, PI planning participation, and value delivery in Lean-Agile environments.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe SP",
    "educationalCredentialAwarded": "SAFe Practitioner (SP) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic understanding of Agile principles recommended",
    "teaches": [
      "Team Collaboration",
      "Iteration Planning and Execution",
      "Program Increment (PI) Planning Participation",
      "Value Delivery in Lean-Agile Environments",
      "Agile Release Train Participation",
      "Continuous Improvement",
      "Team Ceremonies",
      "Cross-functional Team Work"
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



