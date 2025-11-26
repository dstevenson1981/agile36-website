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
  // Service Schema for AI SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise Agile and AI Training Services",
    "description": "Agile36 provides enterprise Agile training, private group training, Agile transformation consulting, and AI transformation services. We deliver customized training solutions for Fortune 100 companies implementing SAFe, Scrum, DevOps, and Generative AI at organizational scale.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "areaServed": "Worldwide",
    "serviceType": [
      "Enterprise Agile Training",
      "Private Group Training",
      "Agile Transformation Consulting",
      "AI Transformation Services",
      "SAFe Implementation",
      "Custom Corporate Training Programs"
    ]
  };

  // FAQ Schema for Corporate Services
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is enterprise Agile training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enterprise Agile training teaches organizations to implement Agile methodologies at scale across multiple teams and departments. It includes SAFe (Scaled Agile Framework) training, DevOps practices, Lean Portfolio Management, and organizational change management to transform how large companies deliver value."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in private group training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Private group training provides customized courses delivered exclusively to your organization. It includes tailored curriculum to your industry and challenges, flexible scheduling, on-site or virtual delivery, dedicated instructors, group discounts, and post-training support. Minimum 8-10 participants typically required."
        }
      },
      {
        "@type": "Question",
        "name": "What is Agile transformation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agile transformation is the process of changing an organization's culture, processes, and structures to adopt Agile methodologies at scale. It includes leadership coaching, team training, process redesign, tool implementation, and organizational change management to enable faster delivery, better quality, and improved business outcomes."
        }
      },
      {
        "@type": "Question",
        "name": "What are AI transformation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI transformation services help organizations integrate generative AI and AI capabilities strategically. Services include AI strategy development, governance framework creation, team training on AI tools, use case identification, pilot program implementation, change management, and scaling AI adoption across the enterprise."
        }
      },
      {
        "@type": "Question",
        "name": "How long does Agile transformation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agile transformation typically takes 12-24 months for enterprise organizations. The timeline includes assessment (1-2 months), pilot programs (3-6 months), scaling across teams (6-12 months), and continuous improvement (ongoing). Timeframes vary based on organization size, culture, and commitment level."
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
        "name": "Corporate Services",
        "item": "https://www.agile36.com/corporate"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

