import type { Metadata } from "next";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";
export const metadata: Metadata = {
  title: "Certification Courses (2026) | Agile36 — SAFe, Agile & AI",
  description:
    "2026 course catalog: live virtual SAFe, Agile, AI, and product management certifications from Agile36, a Scaled Agile Silver Partner. Exam-included public schedules.",
  alternates: {
    canonical: "https://www.agile36.com/courses",
  },
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: "Certification Courses (2026) | Agile36",
    description:
      "Browse 2026 live virtual SAFe, Agile, and AI certification training from a Scaled Agile Silver Partner.",
    url: "https://www.agile36.com/courses",
    siteName: "Agile36",
    type: "website",
  },
};

export default function CoursesSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
