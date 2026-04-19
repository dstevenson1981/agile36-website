import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Agile36 (2026) — Expert SAFe, Agile, AI & Product Management Training",
  description:
    "2026 live virtual cohorts: SAFe, Agile, AI, and product management certification training. Scaled Agile Silver Partner. Instructor-led by certified SAFe Program Consultants (SPCs).",
  alternates: {
    canonical: "https://www.agile36.com/",
  },
  openGraph: {
    title: "Agile36 (2026) — SAFe, Agile, AI & Product Training",
    description:
      "2026 live virtual cohorts: SAFe, Agile, AI, and product management certification training. Scaled Agile Silver Partner.",
    url: "https://www.agile36.com/",
    siteName: "Agile36",
    type: "website",
  },
};

export default function Page() {
  return <HomePageClient />;
}
