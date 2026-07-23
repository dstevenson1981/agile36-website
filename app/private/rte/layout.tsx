import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private RTE Enrollment | Agile36",
  robots: { index: false, follow: false },
};

export default function PrivateRteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
