import type { Metadata } from "next";
import { fetchScheduleJsonLdCohortsForSegment } from "@/app/lib/live-schedule-course-jsonld";
import { buildSafCourseHubGraphLd } from "@/app/lib/saf-course-hub-graph";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI-Empowered SAFe Scrum Master (SSM) Certification Training (2026) | Agile36 | SAFe Silver Partner",
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
    title: "AI-Empowered SAFe Scrum Master (SSM) Certification Training (2026) | Agile36 | SAFe Silver Partner",
    description: "2026: Earn your AI-Empowered SAFe Scrum Master (SSM) certification with Agile36, a SAFe Silver Partner. 2-day live training, exam included, taught by Fortune 100-experienced SPCs.",
    type: "website",
    url: "https://www.agile36.com/courses/scrum-master",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 AI-Empowered Scrum Master (SSM) Certification Training (2026)",
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
          "text": "Yes. Your first exam attempt is included in your Agile36 course fee. The exam must be taken within 30 days of completing the course."
        }
      },
      {
        "@type": "Question",
        "name": "How long does SAFe Scrum Master certification last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "One year. Renewal requires earning 24 Continuing Education Units (CEUs) and paying the $195 annual renewal fee to Scaled Agile."
        }
      },
      {
        "@type": "Question",
        "name": "Can I take the SAFe SSM exam online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The exam is delivered online through the SAFe Community Platform and can be taken from anywhere within 30 days of course completion."
        }
      },
      {
        "@type": "Question",
        "name": "What is the passing score for the SAFe Scrum Master exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You need to answer at least 33 out of 45 questions correctly (73%) to pass."
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

