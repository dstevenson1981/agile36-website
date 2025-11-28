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
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 for Teams Certification Training",
    "description": "SAFe for Teams (SAFe Practitioner) certification teaches Agile team members to work effectively in SAFe. Learn iteration planning, PI Planning participation, team collaboration, defining stories, estimating work, and delivering value as part of an Agile Release Train.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "SP",
    "educationalCredentialAwarded": "SAFe Practitioner (SP) Certification",
    "timeRequired": "P2D",
    "courseDuration": "16 hours",
    "coursePrerequisites": "None. Open to all team members including developers, testers, business analysts, and technical writers.",
    "teaches": [
      "Team Collaboration in SAFe",
      "Iteration Planning and Execution",
      "Program Increment (PI) Planning Participation",
      "Writing and Refining User Stories",
      "Agile Release Train Dynamics",
      "Continuous Integration and DevOps Basics",
      "Team Ceremonies and Events",
      "Cross-Functional Team Practices"
    ],
    "offers": {
      "@type": "Offer",
      "price": "599",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/safe-for-teams/schedule"
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
        "name": "What is SAFe for Teams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe for Teams (also called SAFe Practitioner or SP) is a 2-day certification for Agile team members working in SAFe. You learn iteration planning, PI Planning participation, story writing, estimation, team collaboration, and how to deliver value as part of an Agile Release Train with 50-125 people."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take SAFe for Teams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe for Teams is designed for developers, testers, business analysts, UX designers, technical writers, architects, and any team member working on an Agile Release Train. No prior SAFe experience required. It teaches individual contributors how to work effectively in scaled Agile environments."
        }
      },
      {
        "@type": "Question",
        "name": "Is SAFe for Teams the same as SAFe Practitioner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SAFe for Teams and SAFe Practitioner (SP) are the same certification. SAFe for Teams is the course name, and upon passing the exam, you earn the SAFe Practitioner (SP) certification. Both terms refer to the same credential."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need this if I already know Scrum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, if you work in a SAFe environment. While Scrum teaches team-level practices, SAFe for Teams teaches how your team fits into larger organizational structures: coordinating with other teams, participating in PI Planning, understanding ARTs, managing dependencies, and delivering within Program Increments."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between SAFe for Teams and SAFe Scrum Master?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe for Teams is for team members (developers, testers, analysts) participating in SAFe. SAFe Scrum Master is for facilitators leading teams. If you're a contributor executing work, take SAFe for Teams. If you're facilitating ceremonies and removing impediments, take SAFe Scrum Master."
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
        "name": "SAFe for Teams",
        "item": "https://www.agile36.com/courses/safe-for-teams"
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



