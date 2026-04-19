import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Internal / demo routes — not intended for organic search. */
export const metadata: Metadata = {
  title: "Practice test demos (internal) | Agile36",
  description:
    "Internal practice-test demo pages for Agile36 — not part of the public certification catalog.",
  robots: { index: false, follow: false },
};

export default function TestSegmentLayout({ children }: { children: ReactNode }) {
  return children;
}
