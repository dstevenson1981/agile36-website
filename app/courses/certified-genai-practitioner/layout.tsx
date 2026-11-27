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
  title: courseTitle("certified-genai-practitioner"),
  description: "2026 live cohorts: Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications in this comprehensive 4-hour course. Expert-led training. Rated 4.9/5 from Agile36 learners.",
  keywords: [
    "GenAI Practitioner",
    "Generative AI",
    "GenAI training",
    "Prompt engineering",
    "AI ethics",
    "GenAI fundamentals",
    "AI applications",
    "Generative AI certification",
    "AI tools",
    "GenAI practitioner",
    "AI business applications",
    "GenAI course"
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: courseOgTitle("certified-genai-practitioner"),
    description: "2026: Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications.",
    type: "website",
    url: "https://www.agile36.com/courses/certified-genai-practitioner",
  },
  twitter: {
    images: [...DEFAULT_TWITTER_IMAGES],
    card: "summary_large_image",
    title: courseLong("certified-genai-practitioner"),
    description: "2026: Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications.",
  },
  alternates: {
    canonical: "https://www.agile36.com/courses/certified-genai-practitioner",
  },
};

export default async function CertifiedGenAIPractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheduleResult = await fetchScheduleJsonLdCohorts(
    "certified-genai-practitioner"
  );
  const courseGraphLd = buildLiveScheduleCourseGraphLd(
    {
      courseSlug: "certified-genai-practitioner",
      canonical: "https://www.agile36.com/courses/certified-genai-practitioner",
      schedulePath: "/courses/certified-genai-practitioner/schedule",
      courseDisplayName: "Certified GenAI Practitioner™ Certification Training",
      description:
        "Certified GenAI Practitioner teaches professionals to use generative AI tools effectively. Learn prompt engineering, AI ethics, ChatGPT and Claude usage, business applications, and responsible AI implementation in a hands-on 4-hour course.",
      teaches: [
        "Generative AI Fundamentals and Concepts",
        "Prompt Engineering Techniques",
        "AI Ethics and Responsible AI Practices",
        "ChatGPT and Claude for Business",
        "Practical GenAI Applications",
        "AI Tools and Integration",
        "Business Productivity with AI",
      ],
      breadcrumbLeafName: "Certified GenAI Practitioner",
      coursesCrumbLabel: "Generative AI Courses",
      defaultPrice: 400,
      defaultCurrency: "USD",
      timeRequired: "PT4H",
      courseCode: "GenAI-P",
      coursePrerequisites:
        "No prerequisites required. Basic computer literacy recommended.",
      educationalCredentialAwarded: "Certified GenAI Practitioner™",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1,
      },
    },
    scheduleResult
  );

  const faqSchema = faqPageJsonLd("certified-genai-practitioner");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseGraphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

