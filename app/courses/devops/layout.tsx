import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 DevOps (SDP) Certification Training | Agile36",
  description: "Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "SAFe DevOps",
    "SAFe SDP certification",
    "DevOps training",
    "SAFe 6.0 DevOps",
    "continuous delivery",
    "deployment automation",
    "DevOps pipeline",
    "CI/CD",
    "infrastructure as code",
    "DevOps practices",
    "DevOps certification",
    "SAFe DevOps certification USA",
    "DevOps course",
    "SAFe DevOps certification",
    "SDP training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 DevOps (SDP) Certification Training | Agile36",
    description: "Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/devops",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 DevOps (SDP) Certification Training",
    description: "Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/devops",
  },
};

export default function DevOpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 DevOps (SDP) Certification Training",
    "description": "Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "SAFe SDP",
    "educationalCredentialAwarded": "SAFe DevOps (SDP) Certification",
    "timeRequired": "P2D",
    "coursePrerequisites": "Basic understanding of Agile principles and software development recommended",
    "teaches": [
      "Continuous Delivery Pipelines",
      "Deployment Automation",
      "DevOps Practices",
      "Infrastructure as Code",
      "CI/CD Implementation",
      "Testing Automation",
      "Release on Demand",
      "Continuous Improvement"
    ],
    "offers": {
      "@type": "Offer",
      "price": "599",
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



