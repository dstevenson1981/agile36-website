import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SAFe for Teams Certification — SAFe Practitioner (SP) Training | Agile36",
  description: "Earn your SAFe Practitioner (SP) certification in a live 2-day SAFe for Teams course taught by certified SPCs. Exam included, weekday and weekend cohorts, 16 PDUs.",
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
    images: [...DEFAULT_OG_IMAGES],
    title: "SAFe for Teams Certification — SAFe Practitioner (SP) Training | Agile36",
    description: "Live 2-day SAFe for Teams (SP) course taught by certified SPCs. Exam included, weekday and weekend cohorts, 16 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/safe-for-teams",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: "SAFe for Teams Certification — SAFe Practitioner (SP) Training",
    description: "Live 2-day SAFe for Teams (SP) course taught by certified SPCs. Exam included, weekday and weekend cohorts.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/safe-for-teams",
  },
};

export default async function SafeForTeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "safe-for-teams-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd("safe-for-teams-certification-training", {
    courseDisplayName: "SAFe® 6.0 for Teams Certification Training",
    description:
      "SAFe for Teams (SAFe Practitioner) certification teaches Agile team members to work effectively in SAFe. Learn iteration planning, PI Planning participation, team collaboration, defining stories, estimating work, and delivering value as part of an Agile Release Train.",
    courseCode: "SP",
    coursePrerequisites:
      "None. Open to all team members including developers, testers, business analysts, and technical writers.",
    teaches: [
      "Team Collaboration in SAFe",
      "Iteration Planning and Execution",
      "Program Increment (PI) Planning Participation",
      "Writing and Refining User Stories",
      "Agile Release Train Dynamics",
      "Continuous Integration and DevOps Basics",
      "Team Ceremonies and Events",
      "Cross-Functional Team Practices",
    ],
    breadcrumbLeafName: "SAFe for Teams",
    coursesCrumbLabel: "SAFe Courses",
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 2500,
      bestRating: 5,
      worstRating: 1,
    },
  },
  scheduleResult);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}



