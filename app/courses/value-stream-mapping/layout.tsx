import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® Value Stream Mapping Course | SAFe VSM Training | Agile36",
  description: "Master value stream mapping with SAFe Value Stream Mapping course. Learn to map value streams, identify bottlenecks, eliminate waste, and optimize flow in SAFe environments. Expert-led SAFe training.",
  keywords: [
    "Value Stream Mapping",
    "VSM",
    "Value Stream",
    "Process Optimization",
    "Lean Practices",
    "SAFe Value Stream",
    "Value Stream Training",
    "Flow Optimization",
    "Waste Elimination",
    "SAFe micro-credential",
    "Value Stream Engineer",
    "Process Improvement",
    "Lead Time Reduction",
    "Cycle Time Optimization"
  ],
  openGraph: {
    title: "SAFe® Value Stream Mapping Course | SAFe VSM Training | Agile36",
    description: "Master value stream mapping with Value Stream Mapping Micro-credential Course. Learn to map value streams, identify bottlenecks, and optimize flow.",
    type: "website",
    url: "https://agile36.com/courses/value-stream-mapping",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® Value Stream Mapping Course",
    description: "Master value stream mapping with Value Stream Mapping Micro-credential Course. Learn to map value streams, identify bottlenecks, and optimize flow.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/value-stream-mapping",
  },
};

export default function ValueStreamMappingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® Value Stream Mapping Course",
    "description": "Master value stream mapping with SAFe Value Stream Mapping course. Learn to map value streams, identify bottlenecks, eliminate waste, and optimize flow in SAFe environments.",
    "provider": {
      "@type": "Organization",
      "name": "Agile36",
      "url": "https://agile36.com"
    },
    "courseCode": "VSM-SAFe",
    "timeRequired": "P1D",
    "coursePrerequisites": "Basic understanding of Agile principles and SAFe recommended",
    "teaches": [
      "Value Stream Mapping",
      "Current State Mapping",
      "Future State Design",
      "Bottleneck Identification",
      "Waste Elimination",
      "Flow Optimization",
      "Lead Time Reduction",
      "Process Improvement"
    ],
    "offers": {
      "@type": "Offer",
      "price": "325",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "142"
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

