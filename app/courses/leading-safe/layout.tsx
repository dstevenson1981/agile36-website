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
  // Course Schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Leading SAFe® 6.0 Certification Training",
    "description": "Leading SAFe 6.0 certification training teaches enterprise Agile transformation. Learn to implement SAFe framework, lead Agile Release Trains, facilitate PI Planning, and manage value streams at scale.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    },
    "courseCode": "SAFe SA",
    "educationalCredentialAwarded": "SAFe Agilist (SA) Certification",
    "timeRequired": "P2D",
    "courseDuration": "16 hours",
    "coursePrerequisites": "Basic understanding of Agile and Scrum recommended",
    "teaches": [
      "SAFe Principles and Values",
      "Agile Release Train (ART) Implementation",
      "Program Increment (PI) Planning",
      "Value Stream Mapping",
      "Enterprise Agile Transformation",
      "Lean-Agile Leadership",
      "Portfolio Management",
      "DevOps and Continuous Delivery"
    ],
    "offers": {
      "@type": "Offer",
      "price": "555.55",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/leading-safe/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "234",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT16H"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Leading SAFe certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leading SAFe (SAFe Agilist or SA) certification validates your knowledge of the Scaled Agile Framework. It teaches you to lead enterprise Agile transformations, implement Agile Release Trains, facilitate PI Planning, and manage value streams at scale. The certification is earned by completing a 2-day course and passing the SAFe Agilist exam."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get Leading SAFe certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Leading SAFe course is 2 days (16 hours). After completing the course, you receive one free exam attempt that must be taken within 30 days. The exam takes 90 minutes and most students pass on their first attempt. Total time from start to certification is typically 2-3 days."
        }
      },
      {
        "@type": "Question",
        "name": "What does a SAFe Agilist do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A SAFe Agilist (SA) leads enterprise Agile transformations. They implement the SAFe framework, coordinate Agile Release Trains, facilitate Program Increment Planning events, manage value streams, coach teams and leadership, and ensure alignment between strategy and execution at organizational scale."
        }
      },
      {
        "@type": "Question",
        "name": "Is Leading SAFe certification worth it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SAFe Agilists earn an average salary of $115,000 to $145,000 annually. The certification is recognized by Fortune 500 companies and is required for many enterprise Agile roles. It validates your ability to scale Agile practices across large organizations and lead organizational transformation."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Leading SAFe and CSM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leading SAFe focuses on scaling Agile across entire enterprises with multiple teams. CSM (Certified Scrum Master) focuses on facilitating a single Scrum team. Leading SAFe covers organizational strategy, portfolio management, and coordinating 50-125+ people. CSM covers team-level Scrum practices for 5-9 people."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need Agile experience for Leading SAFe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic Agile and Scrum knowledge is recommended but not required. Understanding Agile principles, Scrum roles, and iterative development helps you grasp SAFe concepts faster. However, the course covers foundational Agile concepts, making it accessible to those new to Agile methodologies."
        }
      },
      {
        "@type": "Question",
        "name": "How much does Leading SAFe certification cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leading SAFe certification through Agile36 costs $555.55. This includes the 2-day live training, course materials, one-year SAFe Community Platform access, exam fee, one free exam retake, and 16 PDUs/SEUs. The certification is valid for one year and can be renewed."
        }
      },
      {
        "@type": "Question",
        "name": "What is an Agile Release Train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An Agile Release Train (ART) is a long-lived team of 50-125 Agile teams who work together to deliver value. The ART operates on a fixed schedule (Program Increment) of 8-12 weeks, holds regular PI Planning events, and synchronizes multiple teams toward common objectives using SAFe practices."
        }
      }
    ]
  };

  // Breadcrumb Schema
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
        "name": "Leading SAFe Certification",
        "item": "https://www.agile36.com/courses/leading-safe"
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Agile36",
    "url": "https://www.agile36.com",
    "logo": "https://www.agile36.com/logo.png",
    "description": "Agile36 provides enterprise Agile and AI training including SAFe, Scrum, and Generative AI certifications. Scaled Agile Silver Partner offering expert-led courses for organizational transformation.",
    "telephone": "310-620-7966",
    "email": "d.stevenson@agile36.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/agile36"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {children}
    </>
  );
}



