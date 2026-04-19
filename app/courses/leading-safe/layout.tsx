import type { Metadata } from "next";
import { SCHEMA_ORGANIZATION_ID } from "@/app/lib/schema-site";

export const metadata: Metadata = {
  title: "AI-Empowered Leading SAFe® 6.0 Certification | SAFe Agilist (SA) | Agile36",
  description:
    "Get AI-Empowered Leading SAFe certified with Agile36, a SAFe Silver Partner. 2-day live training, exam included. Learn to lead enterprise Agile transformation with AI-empowered practices. Expert SPCs. Enroll now.",
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
    "SAFe certification training",
  ],
  openGraph: {
    title: "AI-Empowered Leading SAFe® 6.0 Certification | SAFe Agilist (SA) | Agile36",
    description:
      "Master AI-Empowered Leading SAFe® 6.0 Certification Training. Become a SAFe Agilist (SA). Learn enterprise Agile transformation and value streams.",
    type: "website",
    url: "https://www.agile36.com/courses/leading-safe",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Empowered Leading SAFe® 6.0 Certification | SAFe Agilist (SA)",
    description:
      "Master AI-Empowered Leading SAFe® 6.0 Certification Training. Become a SAFe Agilist (SA). Learn enterprise Agile transformation.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/leading-safe",
  },
};

export default function LeadingSafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseGraphLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.agile36.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Courses",
            item: "https://www.agile36.com/courses",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Leading SAFe Agilist",
            item: "https://www.agile36.com/courses/leading-safe",
          },
        ],
      },
      {
        "@type": "Course",
        "@id": "https://www.agile36.com/courses/leading-safe#course",
        name: "AI-Empowered Leading SAFe® 6.0 Certification (SAFe Agilist)",
        url: "https://www.agile36.com/courses/leading-safe",
        description:
          "2-day live virtual Leading SAFe 6.0 training leading to the SAFe Agilist (SA) certification. Includes 16 PDUs/SEUs, certification exam, and lifetime material access.",
        image: "https://www.agile36.com/LeadingSAFeHome.jpg",
        provider: {
          "@id": SCHEMA_ORGANIZATION_ID,
        },
        educationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          name: "SAFe Agilist (SA) Certification",
          credentialCategory: "certification",
          recognizedBy: {
            "@type": "Organization",
            name: "Scaled Agile, Inc.",
            url: "https://scaledagile.com",
          },
        },
        coursePrerequisites:
          "Basic knowledge of Agile or Scrum recommended; 5+ years experience in software development, testing, business analysis, product, or project management beneficial.",
        teaches: [
          "Scaled Agile Framework fundamentals",
          "Lean-Agile mindset and principles",
          "Leading SAFe transformations",
          "Agile Release Train execution",
          "Portfolio-level value delivery",
        ],
        timeRequired: "PT16H",
        inLanguage: "en-US",
        offers: {
          "@type": "Offer",
          price: 515,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          validFrom: "2026-04-19",
          priceValidUntil: "2027-04-19",
          url: "https://www.agile36.com/courses/leading-safe",
          category: "Training / Certification",
        },
        hasCourseInstance: [
          {
            "@type": "CourseInstance",
            courseMode: "online",
            courseWorkload: "PT16H",
            startDate: "2026-04-20",
            endDate: "2026-04-21",
            location: {
              "@type": "VirtualLocation",
              url: "https://www.agile36.com/courses/leading-safe",
            },
            instructor: {
              "@type": "Person",
              name: "Joe Puoci",
              jobTitle: "SAFe Program Consultant (SPC)",
            },
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          },
          {
            "@type": "CourseInstance",
            courseMode: "online",
            courseWorkload: "PT16H",
            startDate: "2026-04-23",
            endDate: "2026-04-24",
            location: {
              "@type": "VirtualLocation",
              url: "https://www.agile36.com/courses/leading-safe",
            },
            instructor: {
              "@type": "Person",
              name: "Marcus Ball",
              jobTitle: "SAFe Program Consultant (SPC)",
            },
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          },
        ],
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Leading SAFe certification?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leading SAFe (SAFe Agilist or SA) certification validates your knowledge of the Scaled Agile Framework. It teaches you to lead enterprise Agile transformations, implement Agile Release Trains, facilitate PI Planning, and manage value streams at scale. The certification is earned by completing a 2-day course and passing the SAFe Agilist exam.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get Leading SAFe certified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Leading SAFe course is 2 days (16 hours). After completing the course, you receive one free exam attempt that must be taken within 30 days. The exam takes 90 minutes and most students pass on their first attempt. Total time from start to certification is typically 2-3 days.",
        },
      },
      {
        "@type": "Question",
        name: "What does a SAFe Agilist do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A SAFe Agilist (SA) leads enterprise Agile transformations. They implement the SAFe framework, coordinate Agile Release Trains, facilitate Program Increment Planning events, manage value streams, coach teams and leadership, and ensure alignment between strategy and execution at organizational scale.",
        },
      },
      {
        "@type": "Question",
        name: "Is Leading SAFe certification worth it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. SAFe Agilists earn an average salary of $115,000 to $145,000 annually. The certification is recognized by Fortune 500 companies and is required for many enterprise Agile roles. It validates your ability to scale Agile practices across large organizations and lead organizational transformation.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Leading SAFe and CSM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leading SAFe focuses on scaling Agile across entire enterprises with multiple teams. CSM (Certified Scrum Master) focuses on facilitating a single Scrum team. Leading SAFe covers organizational strategy, portfolio management, and coordinating 50-125+ people. CSM covers team-level Scrum practices for 5-9 people.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need Agile experience for Leading SAFe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Basic Agile and Scrum knowledge is recommended but not required. Understanding Agile principles, Scrum roles, and iterative development helps you grasp SAFe concepts faster. However, the course covers foundational Agile concepts, making it accessible to those new to Agile methodologies.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Leading SAFe certification cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leading SAFe certification through Agile36 costs $515. This includes the 2-day live training, course materials, one-year SAFe Community Platform access, exam fee, one free exam retake, and 16 PDUs/SEUs. The certification is valid for one year and can be renewed.",
        },
      },
      {
        "@type": "Question",
        name: "What is an Agile Release Train?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Agile Release Train (ART) is a long-lived team of 50-125 Agile teams who work together to deliver value. The ART operates on a fixed schedule (Program Increment) of 8-12 weeks, holds regular PI Planning events, and synchronizes multiple teams toward common objectives using SAFe practices.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
