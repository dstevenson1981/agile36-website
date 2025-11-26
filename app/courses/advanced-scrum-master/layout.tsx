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
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 Advanced Scrum Master (SASM) Certification Training",
    "description": "SAFe Advanced Scrum Master (SASM) certification teaches experienced Scrum Masters advanced facilitation, program-level coaching, and enterprise Agile leadership. Learn to facilitate PI Planning, coach multiple teams, drive organizational change, and support Agile Release Trains at scale.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "SASM",
    "educationalCredentialAwarded": "SAFe Advanced Scrum Master (SASM) Certification",
    "timeRequired": "P2D",
    "courseDuration": "16 hours",
    "coursePrerequisites": "SAFe Scrum Master (SSM) certification and Scrum Master experience required",
    "teaches": [
      "Advanced Program-Level Coaching",
      "PI Planning Facilitation",
      "Coaching Multiple Agile Teams",
      "Advanced Servant Leadership",
      "Enterprise Agile Transformation",
      "Advanced Facilitation Techniques",
      "Organizational Change Management",
      "Scaling Agile Practices"
    ],
    "offers": {
      "@type": "Offer",
      "price": "950",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/advanced-scrum-master/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "198",
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
        "name": "What is SAFe Advanced Scrum Master (SASM)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe Advanced Scrum Master (SASM) is a 2-day advanced certification for experienced Scrum Masters working in SAFe environments. You learn program-level coaching, facilitating PI Planning for entire ARTs, coaching multiple teams simultaneously, driving enterprise Agile transformation, and advanced servant leadership practices for organizational scale."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between SAFe Scrum Master and Advanced Scrum Master?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe Scrum Master (SSM) teaches team-level facilitation within SAFe. Advanced Scrum Master (SASM) teaches program-level responsibilities: facilitating PI Planning events, coaching multiple teams across an ART, driving organizational change, advanced conflict resolution, and supporting Release Train Engineers in large-scale Agile implementation."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need SSM before taking SASM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SAFe Scrum Master (SSM) certification is a prerequisite for Advanced Scrum Master (SASM). You must also have practical Scrum Master experience in a SAFe environment. SASM builds on SSM foundations with advanced facilitation, coaching, and organizational change skills."
        }
      },
      {
        "@type": "Question",
        "name": "What does an Advanced Scrum Master do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An Advanced Scrum Master facilitates PI Planning for 50-125+ people, coaches multiple Scrum Masters and teams, removes program-level impediments, drives continuous improvement across the ART, supports organizational Agile transformation, mentors other Scrum Masters, and partners with Release Train Engineers to optimize value flow."
        }
      },
      {
        "@type": "Question",
        "name": "How much experience do I need for SASM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You need SAFe Scrum Master certification plus at least 6-12 months of Scrum Master experience in a SAFe environment. You should have facilitated team ceremonies, participated in multiple PI Planning events, and understand ART dynamics before taking Advanced Scrum Master training."
        }
      },
      {
        "@type": "Question",
        "name": "Is SASM worth it for my career?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Advanced Scrum Masters earn $120,000-$155,000 annually. The certification positions you for senior Scrum Master, Agile Coach, and RTE (Release Train Engineer) roles. It demonstrates advanced facilitation skills and program-level Agile leadership needed for enterprise-scale Agile transformation."
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
        "name": "SAFe Advanced Scrum Master",
        "item": "https://www.agile36.com/courses/advanced-scrum-master"
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

