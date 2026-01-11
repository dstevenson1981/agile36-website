import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMP® Certification Training | Project Management Professional Exam Prep | Agile36",
  description: "Master PMP certification with comprehensive exam prep training. Learn PMBOK Guide, project management processes, Agile practices, and exam strategies. 5-day intensive course prepares you to pass the PMP exam. Enroll now!",
  keywords: [
    "PMP Certification",
    "PMP Training",
    "PMP Exam Prep",
    "Project Management Professional",
    "PMBOK Guide",
    "PMP Course",
    "Project Management Certification",
    "PMP Certification Training",
    "PMI Certification",
    "PMP Bootcamp",
    "Project Management Training",
    "PMP Exam Preparation"
  ],
  openGraph: {
    title: "PMP® Certification Training | Project Management Professional Exam Prep | Agile36",
    description: "Master PMP certification with comprehensive exam prep training. Learn PMBOK Guide, project management processes, and exam strategies. 5-day intensive course.",
    type: "website",
    url: "https://www.agile36.com/courses/pmp-certification",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMP® Certification Training | Project Management Professional",
    description: "Master PMP certification with comprehensive exam prep training. Learn PMBOK Guide and project management processes.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/pmp-certification",
  },
};

export default function PMPCertificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "PMP® Certification Training - Project Management Professional Exam Prep",
    "description": "PMP Certification Training prepares you to pass the Project Management Professional exam. Learn PMBOK Guide 7th edition, project management processes, Agile and hybrid approaches, exam strategies, and best practices for leading projects successfully.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "PMP",
    "educationalCredentialAwarded": "PMP® Exam Preparation Certificate",
    "timeRequired": "P5D",
    "courseDuration": "40 hours",
    "coursePrerequisites": "3 years of project management experience and 35 contact hours of project management education (provided by this course) required to sit for PMP exam.",
    "teaches": [
      "PMBOK Guide 7th Edition",
      "Project Management Processes and Knowledge Areas",
      "Agile and Hybrid Project Management",
      "PMP Exam Strategies and Techniques",
      "Predictive, Adaptive, and Hybrid Approaches",
      "Project Integration Management",
      "Stakeholder Engagement",
      "Risk Management",
      "Schedule and Cost Management",
      "Quality and Resource Management"
    ],
    "offers": {
      "@type": "Offer",
      "price": "1100",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/pmp-certification/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "187",
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
        "name": "What is PMP certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PMP (Project Management Professional) is a globally recognized certification from PMI (Project Management Institute). It validates your knowledge of project management processes, methodologies, and best practices. PMP demonstrates you can lead projects successfully using predictive, Agile, and hybrid approaches based on PMBOK Guide standards."
        }
      },
      {
        "@type": "Question",
        "name": "What are the PMP requirements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To sit for the PMP exam, you need either: 1) A 4-year degree plus 36 months of project management experience and 35 hours of PM education, OR 2) A high school diploma plus 60 months of project management experience and 35 hours of PM education. The 35 contact hours are provided by this training course."
        }
      },
      {
        "@type": "Question",
        "name": "How hard is the PMP exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The PMP exam is challenging with a 50-60% first-time pass rate. It has 180 questions taken over 230 minutes covering three domains: People, Process, and Business Environment. The exam tests situational judgment, not memorization. Proper preparation through training courses significantly increases pass rates to 85-90%."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get PMP certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With this 5-day intensive training, you can be exam-ready in 1-2 weeks. The course provides 35 contact hours. After training, most students study 2-4 weeks (80-120 hours total) before taking the exam. From starting the course to earning certification typically takes 6-8 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Is PMP worth it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. PMP-certified project managers earn 16-23% more than non-certified peers (average $108,000-$142,000 annually). PMP is recognized globally, required by many Fortune 500 companies, and demonstrates mastery of project management across industries. It significantly enhances career opportunities and credibility."
        }
      },
      {
        "@type": "Question",
        "name": "What is the PMBOK Guide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PMBOK (Project Management Body of Knowledge) Guide is PMI's foundational standard for project management. The 7th edition focuses on principles, performance domains, and tailoring rather than rigid processes. It covers project delivery across predictive (Waterfall), Agile (Scrum, Kanban), and hybrid methodologies."
        }
      },
      {
        "@type": "Question",
        "name": "Does PMP cover Agile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The current PMP exam includes 50% Agile and hybrid content. The course teaches predictive (traditional Waterfall), Agile (Scrum, Kanban, XP), and hybrid approaches. You learn when to use each methodology and how to adapt project management practices to different project contexts."
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
        "name": "Project Management Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "PMP Certification Training",
        "item": "https://www.agile36.com/courses/pmp-certification"
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



















