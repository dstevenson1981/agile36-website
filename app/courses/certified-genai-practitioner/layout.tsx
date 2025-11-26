import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certified GenAI Practitioner™ Certification Training | GenAI Training | Agile36",
  description: "Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications in this comprehensive 4-hour course. Expert-led training.",
  keywords: [
    "GenAI Practitioner",
    "Generative AI",
    "GenAI training",
    "Prompt engineering",
    "AI ethics",
    "GenAI fundamentals",
    "AI applications",
    "Generative AI certification",
    "AI tools",
    "GenAI practitioner",
    "AI business applications",
    "GenAI course"
  ],
  openGraph: {
    title: "Certified GenAI Practitioner™ Certification Training | GenAI Training | Agile36",
    description: "Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications.",
    type: "website",
    url: "https://agile36.com/courses/certified-genai-practitioner",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certified GenAI Practitioner™ Certification Training",
    description: "Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/certified-genai-practitioner",
  },
};

export default function CertifiedGenAIPractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Certified GenAI Practitioner™ Certification Training",
    "description": "Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications in this comprehensive 4-hour course.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "GenAI-Practitioner",
    "timeRequired": "PT4H",
    "coursePrerequisites": "No prerequisites required. Basic computer literacy recommended.",
    "teaches": [
      "GenAI Fundamentals",
      "Prompt Engineering",
      "AI Ethics and Responsible Implementation",
      "Practical GenAI Applications",
      "AI Tools and Techniques",
      "Business AI Solutions"
    ],
    "offers": {
      "@type": "Offer",
      "price": "299",
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

