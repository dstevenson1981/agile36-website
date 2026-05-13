import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI-Empowered SAFe Advanced Scrum Master (SASM) Certification (2026) | Agile36",
  description:
    "2026 live cohorts: AI-Empowered SAFe Advanced Scrum Master (SASM) training: flow, high-performing teams, multi-team collaboration, and conflict skills on the ART—with AI-empowered facilitation. Expert-led course; exam included.",
  keywords: [
    "AI-Empowered SAFe Advanced Scrum Master",
    "SASM certification",
    "AI-Empowered SAFe",
    "AI-Empowered SASM",
    "Advanced Scrum Master training",
    "Scaled Agile SASM",
    "Agile Release Train",
    "SAFe Scrum Master prerequisite SSM",
    "flow optimization SAFe",
    "SAFe Studio",
    "SAFe CoPilot",
    "Advanced Scrum Master exam",
    "SASM course online",
    "AI-Empowered SAFe Advanced Scrum Master certification"
  ],
  openGraph: {
    title: "AI-Empowered SAFe® Advanced Scrum Master (SASM) Certification (2026) | Agile36",
    description:
    "2026: Become an AI-Empowered SAFe Advanced Scrum Master: improve flow, build high-performing teams, manage cross-team conflict, and strengthen ART performance—with responsible AI practices. Exam included.",
    type: "website",
    url: "https://www.agile36.com/courses/advanced-scrum-master",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Empowered SAFe® Advanced Scrum Master (SASM) (2026)",
    description:
      "Flow, high-performing teams, conflict skills, and ART performance—plus AI fundamentals and SAFe CoPilot-style guidance for the SASM role.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/advanced-scrum-master",
  },
};

export default async function AdvancedScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("advanced-scrum-master");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "advanced-scrum-master",
      canonical: "https://www.agile36.com/courses/advanced-scrum-master",
      schedulePath: "/courses/advanced-scrum-master/schedule",
      courseDisplayName:
        "AI-Empowered SAFe® Advanced Scrum Master (SASM) Certification Training",
      description:
        "The AI-Empowered SAFe Advanced Scrum Master (SASM) course elevates experienced Scrum Masters to improve flow, build high-performing teams, manage multi-team conflict, and strengthen ART performance—using AI fundamentals, prompting, and SAFe Studio resources responsibly, per Scaled Agile.",
      teaches: [
        "Cross-team collaboration on the ART",
        "Optimizing team flow (XP, Kanban, built-in quality)",
        "High-performing teams and powerful questions",
        "Conflict analysis, interest-based problem solving, reframing",
        "ART performance: IP iteration, I&A, problem-solving workshop",
        "AI fundamentals and prompting for the SASM role",
        "SAFe CoPilot and responsible, human-in-the-loop AI use",
      ],
      breadcrumbLeafName: "AI-Empowered SAFe Advanced Scrum Master",
      coursesCrumbLabel: "SAFe Courses",
      defaultPrice: 950,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "SASM",
      coursePrerequisites:
        "SAFe Scrum Master (SSM) certification and Scrum Master experience required",
      educationalCredentialAwarded:
        "SAFe Advanced Scrum Master (SASM) Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is AI-Empowered SAFe Advanced Scrum Master (SASM)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI-Empowered SAFe Advanced Scrum Master (SASM) is a 2-day advanced certification for experienced Scrum Masters working in SAFe environments. You learn program-level coaching, facilitating PI Planning for entire ARTs, coaching multiple teams simultaneously, driving enterprise Agile transformation, and advanced servant leadership practices for organizational scale."
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

