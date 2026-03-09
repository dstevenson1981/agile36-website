import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combo Courses | Save on SAFe, PMP & AI Certifications | Agile36",
  description:
    "Earn multiple certifications faster and affordably. Agile36 combo courses bundle SAFe, PMP, and AI certifications with discounted pricing. Leading SAFe + SSM, PMP + SAFe, AI combos and more.",
  alternates: {
    canonical: "https://www.agile36.com/combo-courses",
  },
  openGraph: {
    title: "Combo Courses | Save on SAFe, PMP & AI Certifications | Agile36",
    description:
      "Earn multiple certifications faster and affordably. Bundled SAFe, PMP, and AI combo courses with discounted pricing.",
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
