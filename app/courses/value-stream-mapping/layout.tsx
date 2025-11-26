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
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® Value Stream Mapping Micro-credential Course",
    "description": "SAFe Value Stream Mapping micro-credential teaches how to visualize and optimize value streams. Learn current state mapping, identify bottlenecks and waste, design future states, measure flow metrics, and accelerate delivery through value stream optimization in SAFe.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "VSM",
    "educationalCredentialAwarded": "SAFe Value Stream Mapping Micro-credential",
    "timeRequired": "P1D",
    "courseDuration": "8 hours",
    "coursePrerequisites": "Basic SAFe knowledge helpful. Open to product managers, architects, and leaders.",
    "teaches": [
      "Value Stream Mapping Fundamentals",
      "Current State Mapping Techniques",
      "Future State Design",
      "Bottleneck and Constraint Identification",
      "Waste Elimination (8 Types of Waste)",
      "Flow Metrics and Measurement",
      "Lead Time and Cycle Time Reduction",
      "Continuous Process Improvement"
    ],
    "offers": {
      "@type": "Offer",
      "price": "350",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/value-stream-mapping/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "142",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Value Stream Mapping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Value Stream Mapping (VSM) is a Lean technique for visualizing the steps required to deliver value to customers. It maps the flow of materials, information, and value through a process from start to finish, identifying delays, waste, and bottlenecks. VSM helps teams optimize processes for faster delivery and higher quality."
        }
      },
      {
        "@type": "Question",
        "name": "What is a value stream in SAFe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In SAFe, a value stream is the series of steps an organization uses to deliver a solution to a customer. There are operational value streams (delivering products/services) and development value streams (building solutions). Value streams include people, processes, and systems that create customer value."
        }
      },
      {
        "@type": "Question",
        "name": "What are the 8 types of waste in VSM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 8 types of waste (DOWNTIME) are: Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, and Extra-processing. Value Stream Mapping identifies these wastes to eliminate them, reduce lead time, improve flow, and increase value delivery to customers."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take Value Stream Mapping training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This course is for Value Stream Engineers, Product Managers, Solution Architects, Release Train Engineers, Lean-Agile Leaders, and anyone responsible for optimizing delivery processes. No technical background required—focus is on process analysis and improvement."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure value stream flow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Value stream flow is measured by Lead Time (total time from request to delivery), Cycle Time (active work time), Process Time (value-add time), Wait Time (delays between steps), and Percent Complete and Accurate (%C&A). These metrics identify where improvements will have the greatest impact."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.agile36.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "SAFe Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Value Stream Mapping",
        "item": "https://www.agile36.com/courses/value-stream-mapping"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

