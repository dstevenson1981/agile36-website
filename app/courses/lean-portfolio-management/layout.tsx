import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training | Agile36",
  description: "Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy, investment funding, lean governance, and portfolio flow. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "SAFe Lean Portfolio Management",
    "SAFe LPM certification",
    "Lean Portfolio Management training",
    "SAFe 6.0 LPM",
    "portfolio strategy",
    "investment funding",
    "lean governance",
    "portfolio flow",
    "portfolio Kanban",
    "SAFe LPM certification USA",
    "Agile Portfolio Management course",
    "SAFe Portfolio Manager certification",
    "LPM training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training | Agile36",
    description: "Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy and investment funding. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/lean-portfolio-management",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training",
    description: "Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy and investment funding.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/lean-portfolio-management",
  },
};

export default function LeanPortfolioManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 Lean Portfolio Management (LPM) Certification Training",
    "description": "Master SAFe Lean Portfolio Management (LPM) Certification Training. Learn portfolio strategy, investment funding, lean governance, and portfolio flow.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe LPM",
    "educationalCredentialAwarded": "SAFe Lean Portfolio Management (LPM) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic understanding of Agile principles and portfolio management experience recommended",
    "teaches": [
      "Portfolio Strategy",
      "Investment Funding",
      "Lean Governance",
      "Portfolio Flow",
      "Portfolio Kanban",
      "Epic Management",
      "Value Stream Management"
    ],
    "offers": {
      "@type": "Offer",
      "price": "1095",
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



