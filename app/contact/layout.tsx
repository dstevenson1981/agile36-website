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
  // LocalBusiness Schema for AI SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Agile36",
    "description": "Enterprise Agile and AI training provider offering SAFe, Scrum, Generative AI, and project management certifications worldwide.",
    "url": "https://www.agile36.com",
    "telephone": "310-620-7966",
    "email": "d.stevenson@agile36.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0522",
      "longitude": "-118.2437"
    },
    "areaServed": "Worldwide",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://www.linkedin.com/company/agile36"
    ]
  };

  // FAQ Schema for Contact Page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I contact Agile36?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Contact Agile36 by phone at 310-620-7966, email d.stevenson@agile36.com, or through the contact form on the website. For corporate training inquiries, use the consultation form. For immediate assistance, use the live chat widget available on all pages."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Agile36 located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agile36 operates worldwide with a global presence. We deliver training virtually and on-site internationally. Our headquarters are in the United States, and we serve clients across North America, Europe, Asia, and beyond."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer on-site training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Agile36 offers on-site private group training at your location worldwide. Minimum group size typically 8-10 participants. Contact us for custom quotes, scheduling, and logistics for on-site delivery at your office or preferred venue."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly will I get a response?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We respond to inquiries within 1-2 business hours during business hours (Monday-Friday, 9 AM - 6 PM EST). For immediate assistance, use the live chat widget. For urgent matters, call 310-620-7966 directly."
        }
      }
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.agile36.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": "https://www.agile36.com/contact"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

