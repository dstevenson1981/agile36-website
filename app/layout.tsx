import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FingerprintTracker from "./components/FingerprintTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agile36 - Expert Training in Agile, AI, and Product Management",
  description: "Take the next step in your career with a global leader in SAFe, Generative AI, AI Product, and PMI training. Start your learning journey today.",
  verification: {
    google: "uvoTYHwVpjLfOgpwChNX0GLOqog9pAb9iKyJW1jiTP8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Organization Schema for AI SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Agile36",
    "alternateName": "Agile 36",
    "url": "https://www.agile36.com",
    "logo": "https://www.agile36.com/logo.png",
    "description": "Agile36 provides enterprise Agile and AI training including SAFe, Scrum, Generative AI, and AI Product certifications. Scaled Agile Silver Partner offering expert-led courses for organizational transformation and professional development.",
    "telephone": "310-620-7966",
    "email": "d.stevenson@agile36.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/agile36"
    ],
    "areaServed": "Worldwide",
    "knowsAbout": [
      "SAFe (Scaled Agile Framework)",
      "Scrum and Agile Methodologies",
      "Generative AI and AI Product Management",
      "Enterprise Agile Transformation",
      "DevOps and Continuous Delivery",
      "Lean Portfolio Management",
      "Project Management Professional (PMP)",
      "AI-Driven Scrum and Product Management"
    ]
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        
        {/* FingerprintJS Visitor Tracking */}
        <FingerprintTracker />
        
        {/* Crisp Live Chat Widget */}
        <Script
          id="crisp-chat"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="fa52d23e-ef39-4fdb-8ecd-8c568cd46d15";
              (function(){
                d=document;
                s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
