import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Public free Basic practice mocks — Pro banks stay under /account/practice-exams. */
export const metadata: Metadata = {
  title: "Free SAFe Practice Tests | Agile36",
  description:
    "Free SAFe practice tests for Leading SAFe, POPM, LPM, Scrum Master, DevOps, APM, and SAFe for Teams. Exam-style questions with explanations.",
  robots: { index: false, follow: false },
};

export default function TestSegmentLayout({ children }: { children: ReactNode }) {
  return children;
}
