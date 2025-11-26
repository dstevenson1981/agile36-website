import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Agile & AI Training Solutions | Agile36 Corporate Services",
  description: "Transform your organization with world-class enterprise agile training, private group training, and AI transformation services. Trusted by Fortune 100 companies.",
  keywords: [
    "enterprise agile training",
    "corporate training",
    "private group training",
    "agile transformation",
    "AI transformation services",
    "SAFe enterprise training",
    "organizational transformation",
    "agile consulting",
    "AI consulting",
    "Fortune 100 training"
  ],
  openGraph: {
    title: "Enterprise Agile & AI Training Solutions | Agile36",
    description: "Transform your organization with world-class enterprise agile training, private group training, and AI transformation services.",
    type: "website",
    url: "https://agile36.com/corporate",
    images: [
      {
        url: "/og-corporate.jpg",
        width: 1200,
        height: 630,
        alt: "Agile36 Corporate Training Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Agile & AI Training Solutions | Agile36",
    description: "Transform your organization with world-class enterprise agile training, private group training, and AI transformation services.",
    images: ["/og-corporate.jpg"]
  }
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

