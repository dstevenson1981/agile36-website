import type { Metadata } from "next";
import {
  buildLiveScheduleCourseGraphLd,
  fetchScheduleJsonLdCohorts,
} from "@/app/lib/live-schedule-course-jsonld";

import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/app/lib/og-defaults";
import { courseLong, courseOgTitle, courseTitle } from "@/app/lib/course-seo";
import { faqPageJsonLd } from "@/app/lib/faq-page-jsonld";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: courseTitle("devops"),
  description: "2026 live cohorts: Earn your SAFe DevOps Practitioner certification with Agile36. 2-day training covering continuous delivery pipeline, DevOps culture, and release on demand. Exam included. Rated 4.9/5 from Agile36 learners, with the highest feedback score on Scaled Agile.",
  keywords: [
    "SAFe DevOps",
    "SAFe SDP certification",
    "DevOps training",
    "SAFe 6.0 DevOps",
    "continuous delivery",
    "deployment automation",
    "DevOps pipeline",
    "CI/CD",
    "infrastructure as code",
    "DevOps practices",
    "DevOps certification",
    "SAFe DevOps certification USA",
    "DevOps course",
    "SAFe DevOps certification",
    "SDP training online",
    "SAFe certification training"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("devops"),
    description: "2026: Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://www.agile36.com/courses/devops",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("devops"),
    description: "2026: Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/devops",
  },
};

export default async function DevOpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts("devops");
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "devops",
      canonical: "https://www.agile36.com/courses/devops",
      schedulePath: "/courses/devops/schedule",
      courseDisplayName: "SAFe® 6.0 DevOps (SDP) Certification Training",
      description:
        "SAFe DevOps Practitioner (SDP) certification teaches DevOps practices within SAFe. Learn to build continuous delivery pipelines, automate deployments, implement CI/CD, practice infrastructure as code, enable release on demand, and integrate DevOps into Agile Release Trains.",
      teaches: [
        "Continuous Delivery Pipeline Design",
        "CI/CD Implementation and Automation",
        "Infrastructure as Code (IaC)",
        "Testing Automation Strategies",
        "Release on Demand",
        "DevSecOps and Security Integration",
        "Value Stream Optimization",
        "DevOps Culture and Collaboration",
      ],
      breadcrumbLeafName: "SAFe DevOps",
      coursesCrumbLabel: "SAFe Courses",
      defaultPrice: 599,
      defaultCurrency: "USD",
      timeRequired: "P2D",
      courseCode: "SDP",
      coursePrerequisites:
        "Software development, operations, or DevOps experience recommended",
      educationalCredentialAwarded:
        "SAFe DevOps Practitioner (SDP) Certification",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 2500,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("devops");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}



