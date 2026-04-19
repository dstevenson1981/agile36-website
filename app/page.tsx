import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Agile36 — Expert Training in Agile, AI, and Product Management",
  description:
    "Live virtual SAFe, Agile, AI, and product management certification training. Scaled Agile Silver Partner. Taught by certified SAFe Program Consultants.",
  alternates: {
    canonical: "https://www.agile36.com/",
  },
  openGraph: {
    url: "https://www.agile36.com/",
    siteName: "Agile36",
    type: "website",
  },
};

export default function Page() {
  return <HomePageClient />;
}
