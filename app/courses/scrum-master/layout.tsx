import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("scrum-master"),
  description: "2026 live cohorts: Earn your AI-Empowered SAFe Scrum Master (SSM) certification with Agile36, a SAFe Silver Partner. 2-day live training, exam included, taught by Fortune 100-experienced SPCs. Enroll today.",
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
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("scrum-master"),
    description: "2026: Earn your AI-Empowered SAFe Scrum Master (SSM) certification with Agile36, a SAFe Silver Partner. 2-day live training, exam included, taught by Fortune 100-experienced SPCs.",
    type: "website",
    url: "https://www.agile36.com/courses/scrum-master",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("scrum-master"),
    description: "2026: Master SAFe Scrum Master skills with AI-Empowered SAFe® SSM Certification Training. Learn team facilitation, PI planning support, and Agile Release Train support.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/scrum-master",
  },
};

export default async function ScrumMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohortsForSegment(
    "scrum-master-certification-training"
  );
  const courseGraphLd = buildSafCourseHubGraphLd("scrum-master-certification-training", {
    courseDisplayName: "SAFe® 6.0 AI-Empowered Scrum Master (SSM) Certification Training",
    description:
      "SAFe Scrum Master (SSM) certification teaches Scrum Masters to facilitate Agile teams within SAFe. Learn team ceremonies, PI Planning participation, impediment removal, servant leadership, ART support, and how to coach teams in large-scale Agile environments.",
    courseCode: "SSM",
    coursePrerequisites: "Scrum Master experience or Agile team facilitation recommended",
    teaches: [
      "Team Facilitation in SAFe",
      "Program Increment (PI) Planning Support",
      "Impediment Removal and Escalation",
      "Agile Release Train Coordination",
      "Servant Leadership Practices",
      "Agile Team Coaching",
      "Scrum Ceremonies at Scale",
      "Continuous Improvement and Inspect & Adapt",
    ],
    breadcrumbLeafName: "SAFe Scrum Master",
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
        "name": "How is the SAFe Scrum Master different from a regular Scrum Master?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SAFe Scrum Master operates at enterprise scale — supporting not just one team but an entire Agile Release Train (ART). You'll learn PI Planning, program-level ceremonies, and how to coordinate across multiple teams, which goes well beyond traditional Scrum."
        }
      },
      {
        "@type": "Question",
        "name": "Is the SAFe SSM exam included in the course price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Your first two exam attempts are included for courses taken after April 14, 2026, and must be completed within 60 days of the course. After that, Scaled Agile lists a $50 unproctored retake."
        }
      },
      {
        "@type": "Question",
        "name": "How long does SAFe Scrum Master certification last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SSM certification page says a minimum of 24 CEUs within the two-year certification cycle, which it says amounts to 12 CEUs annually. The August 14, 2026 renewal article lists SSM with the foundational certifications that require 12 CEUs and does not say per year in that sentence."
        }
      },
      {
        "@type": "Question",
        "name": "Can I take the SAFe SSM exam online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The exam is delivered online through the SAFe Community Platform and can be taken from anywhere within 60 days of course completion."
        }
      },
      {
        "@type": "Question",
        "name": "What is the passing score for the SAFe Scrum Master exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SSM exam is 90 minutes and 45 questions. Official Scaled Agile pages do not agree on a pass mark, so this page does not state a percent."
        }
      },
      {
        "@type": "Question",
        "name": "Does Agile36 offer corporate/team training for SAFe Scrum Master?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Agile36 specializes in enterprise and Fortune 100 training. Contact us for private group pricing and custom scheduling."
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

