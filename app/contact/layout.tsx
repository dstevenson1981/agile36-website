import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Agile36 - Your Agile & AI Training Partner",
  description: "Get in touch with Agile36 for enterprise agile training, AI transformation services, and certification programs. Call (310) 620-7966 or email d.stevenson@agile36.com",
  keywords: [
    "contact agile36",
    "agile training support",
    "corporate training inquiry",
    "transformation consulting",
    "SAFe training contact",
    "AI training inquiry",
    "certification support"
  ],
  openGraph: {
    title: "Contact Us | Agile36",
    description: "Get in touch with Agile36 for enterprise agile training, AI transformation services, and certification programs.",
    type: "website",
    url: "https://agile36.com/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Agile36"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Agile36",
    description: "Get in touch with Agile36 for enterprise agile training, AI transformation services, and certification programs.",
    images: ["/og-contact.jpg"]
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

