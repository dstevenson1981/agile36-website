import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 AI-Empowered Scrum Master (SSM) Certification Training | Agile36",
  description: "Master SAFe Scrum Master skills with AI-Empowered SAFe® SSM Certification Training. Learn team facilitation, PI planning support, impediment removal, and Agile Release Train support. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
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
    title: "SAFe® 6.0 AI-Empowered Scrum Master (SSM) Certification Training | Agile36",
    description: "Master SAFe Scrum Master skills with AI-Empowered SAFe® SSM Certification Training. Learn team facilitation, PI planning support, and Agile Release Train support. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/scrum-master",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 AI-Empowered Scrum Master (SSM) Certification Training",
    description: "Master SAFe Scrum Master skills with AI-Empowered SAFe® SSM Certification Training. Learn team facilitation, PI planning support, and Agile Release Train support.",
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
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 AI-Empowered Scrum Master (SSM) Certification Training",
    "description": "SAFe Scrum Master (SSM) certification teaches Scrum Masters to facilitate Agile teams within SAFe. Learn team ceremonies, PI Planning participation, impediment removal, servant leadership, ART support, and how to coach teams in large-scale Agile environments.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "SSM",
    "educationalCredentialAwarded": "SAFe Scrum Master (SSM) Certification",
    "timeRequired": "P2D",
    "courseDuration": "16 hours",
    "coursePrerequisites": "Scrum Master experience or Agile team facilitation recommended",
    "teaches": [
      "Team Facilitation in SAFe",
      "Program Increment (PI) Planning Support",
      "Impediment Removal and Escalation",
      "Agile Release Train Coordination",
      "Servant Leadership Practices",
      "Agile Team Coaching",
      "Scrum Ceremonies at Scale",
      "Continuous Improvement and Inspect & Adapt"
    ],
    "offers": {
      "@type": "Offer",
      "price": "555",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/scrum-master/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "234",
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
        "name": "What is SAFe Scrum Master (SSM)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe Scrum Master (SSM) is a 2-day certification teaching Scrum Masters to facilitate Agile teams within the Scaled Agile Framework. You learn to support teams on Agile Release Trains, participate in PI Planning, remove impediments at scale, coach teams in SAFe practices, and coordinate with other teams and stakeholders in large organizations."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between CSM and SAFe Scrum Master?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CSM (Certified Scrum Master) focuses on facilitating a single Scrum team using basic Scrum framework. SAFe Scrum Master adds enterprise-scale responsibilities: coordinating with other teams on an Agile Release Train, participating in PI Planning, managing dependencies across teams, and facilitating Scrum within a larger SAFe context with 50-125+ people."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need CSM before taking SAFe Scrum Master?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, CSM is not required for SAFe Scrum Master. SSM is a standalone certification. However, understanding basic Scrum roles, events, and artifacts is helpful. If you're new to Scrum, consider taking CSM first or ensure you understand Scrum fundamentals before learning to scale it with SAFe."
        }
      },
      {
        "@type": "Question",
        "name": "What does a SAFe Scrum Master do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A SAFe Scrum Master facilitates Scrum events (daily standup, sprint planning, retrospectives), removes impediments, coaches the team in Agile practices, participates in PI Planning, coordinates with other teams on the ART, supports the Product Owner, escalates cross-team issues, and fosters continuous improvement within the SAFe framework."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get SAFe Scrum Master certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SAFe Scrum Master course is 2 days (16 hours). After completing the course, you take the online SSM exam within 30 days. The exam takes 90 minutes with 45 questions. Most students pass on their first attempt. Total time from start to certification is typically 2-3 days."
        }
      },
      {
        "@type": "Question",
        "name": "How much does SAFe Scrum Master cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe Scrum Master certification through Agile36 costs $555. This includes 2-day live training, course materials, exam fee, one free retake, one-year SAFe Community Platform access, and 16 PDUs/SEUs. The certification is valid for one year and can be renewed annually."
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
        "name": "SAFe Scrum Master",
        "item": "https://www.agile36.com/courses/scrum-master"
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

