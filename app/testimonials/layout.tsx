import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";
export const metadata: Metadata = {
  title: "Student Testimonials (2026) | Agile36 SAFe & AI Training Reviews",
  description:
    "Read verified-style student feedback on Agile36 SAFe, Scrum, and AI certification training — live virtual classes with SPC-led instruction.",
  alternates: {
    canonical: "https://www.agile36.com/testimonials",
  },
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: "Student Testimonials | Agile36",
    description:
      "Reviews and outcomes from Agile36 certification cohorts — SAFe, AI, and product training.",
    url: "https://www.agile36.com/testimonials",
    siteName: "Agile36",
    type: "website",
  },
};

export default function TestimonialsLayout({ children }: { children: ReactNode }) {
  return children;
}
