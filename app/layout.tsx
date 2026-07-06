import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import {
  SCHEMA_DEFAULT_OG_IMAGE_HEIGHT,
  SCHEMA_DEFAULT_OG_IMAGE_URL,
  SCHEMA_DEFAULT_OG_IMAGE_WIDTH,
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_ORGANIZATION_LOGO_HEIGHT,
  SCHEMA_ORGANIZATION_LOGO_URL,
  SCHEMA_ORGANIZATION_LOGO_WIDTH,
  SCHEMA_WEBSITE_ID,
  SCALED_AGILE_TRAINING_FEEDBACK_URL,
} from "@/app/lib/schema-site";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agile36.com"),
  title: "Agile36 - Expert Training in Agile, AI, and Product Management",
  description: "Take the next step in your career with a global leader in SAFe, Generative AI, AI Product, and PMI training. Start your learning journey today.",
  icons: {
    icon: [
      { url: "/Favicon/favicon.ico", sizes: "any" },
      { url: "/Favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/Favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/Favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    siteName: "Agile36",
    type: "website",
    images: [
      {
        url: SCHEMA_DEFAULT_OG_IMAGE_URL,
        width: SCHEMA_DEFAULT_OG_IMAGE_WIDTH,
        height: SCHEMA_DEFAULT_OG_IMAGE_HEIGHT,
        alt: "Agile36 — SAFe, Agile, and AI training",
      },
    ],
  },
  verification: {
    google: "uvoTYHwVpjLfOgpwChNX0GLOqog9pAb9iKyJW1jiTP8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Organization + WebSite graph (logo on org + site; articles use /og default in blog JSON-LD)
  const organizationNode = {
    "@type": "EducationalOrganization",
    "@id": SCHEMA_ORGANIZATION_ID,
    "name": "Agile36",
    "alternateName": "Agile 36",
    "url": "https://www.agile36.com",
    "logo": {
      "@type": "ImageObject",
      "url": SCHEMA_ORGANIZATION_LOGO_URL,
      "width": SCHEMA_ORGANIZATION_LOGO_WIDTH,
      "height": SCHEMA_ORGANIZATION_LOGO_HEIGHT,
    },
    "description": "Agile36 provides enterprise Agile and AI training including SAFe, Scrum, Generative AI, and AI Product certifications. Scaled Agile Silver Partner offering expert-led courses for organizational transformation and professional development.",
    "telephone": "310-620-7966",
    "email": "d.stevenson@agile36.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1000 Brickell Ave, Suite 715",
      "addressLocality": "Miami",
      "addressRegion": "Florida",
      "postalCode": "3313",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/agile36",
      SCALED_AGILE_TRAINING_FEEDBACK_URL,
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide",
      "description":
        "Live virtual instructor-led training open to learners globally; instruction and materials are in English (US-based provider).",
    },
    "knowsAbout": [
      "SAFe (Scaled Agile Framework)",
      "Scrum and Agile Methodologies",
      "Generative AI and AI Product Management",
      "Enterprise Agile Transformation",
      "DevOps and Continuous Delivery",
      "Lean Portfolio Management",
      "Project Management Professional (PMP)",
      "AI-Driven Scrum and Product Management",
    ],
  };

  const webSiteNode = {
    "@type": "WebSite",
    "@id": SCHEMA_WEBSITE_ID,
    url: "https://www.agile36.com",
    name: "Agile36",
    inLanguage: "en-US",
    publisher: { "@id": SCHEMA_ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.agile36.com/blog?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    image: {
      "@type": "ImageObject",
      url: SCHEMA_ORGANIZATION_LOGO_URL,
      width: SCHEMA_ORGANIZATION_LOGO_WIDTH,
      height: SCHEMA_ORGANIZATION_LOGO_HEIGHT,
    },
  };

  const rootSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [organizationNode, webSiteNode],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchemaGraph) }}
        />
        <script
          src="/hyper-agent.js"
          data-rb2b="GNLKQH7LPW6Q"
          async
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
        
        {/* Apollo Tracking */}
        <Script
          id="apollo-tracking"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){
                var n=Math.random().toString(36).substring(7),
                o=document.createElement("script");
                o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,
                o.async=!0,
                o.defer=!0,
                o.onload=function(){
                  window.trackingFunctions.onLoad({appId:"66e98c7650b08605385dda54"})
                },
                document.head.appendChild(o)
              }
              initApollo();
            `,
          }}
        />
        
        <Analytics />
      </body>
    </html>
  );
}
