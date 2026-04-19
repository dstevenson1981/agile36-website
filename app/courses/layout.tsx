import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Agile36",
  description:
    "Browse live virtual SAFe, Agile, AI, and product management certification courses from Agile36, a Scaled Agile Silver Partner.",
  alternates: {
    canonical: "https://www.agile36.com/courses",
  },
  openGraph: {
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
