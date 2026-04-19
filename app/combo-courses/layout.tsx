import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combo Courses (2026) | Save on SAFe, PMP & AI | Agile36",
  description:
    "2026 combo bundles: earn multiple certifications faster with Agile36 — SAFe + PMP + AI paths, discounted pricing, and coordinated live schedules.",
  alternates: {
    canonical: "https://www.agile36.com/combo-courses",
  },
  openGraph: {
    title: "Combo Courses (2026) | Agile36",
    description:
      "2026 bundled SAFe, PMP, and AI certification combos — save with coordinated live training.",
    url: "https://www.agile36.com/combo-courses",
    type: "website",
  },
};

export default function ComboCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
