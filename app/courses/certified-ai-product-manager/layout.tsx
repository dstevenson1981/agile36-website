import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certified AI Product Manager™ Training | AI Product Development & Prototyping | Agile36",
  description: "Master AI-powered product management! Learn to use AI throughout the product lifecycle, build prototypes, and validate ideas with stakeholders. Earn your Certified AI Product Manager™ certification. 2-day intensive course.",
  keywords: [
    "AI Product Manager",
    "AI Product Management",
    "Product Management AI",
    "AI prototyping",
    "Product development AI",
    "AI product strategy",
    "Product Manager certification",
    "AI product lifecycle",
    "Stakeholder validation",
    "Rapid prototyping",
    "AI roadmapping",
    "Product analytics AI"
  ],
  openGraph: {
    title: "Certified AI Product Manager™ Training | AI Product Development & Prototyping | Agile36",
    description: "Master AI-powered product management! Use AI throughout the product lifecycle, build prototypes, and validate ideas with stakeholders.",
    type: "website",
    url: "https://agile36.com/courses/certified-ai-product-manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certified AI Product Manager™ Training",
    description: "Master AI-powered product management! Build prototypes and validate ideas with AI tools.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/certified-ai-product-manager",
  },
};

export default function CertifiedAIProductManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Certified AI Product Manager™ Certification Training",
    "description": "Certified AI Product Manager teaches product managers to use AI throughout the product development lifecycle. Learn AI-powered user research, rapid prototyping, stakeholder validation, product analytics, and how to build working prototypes to demonstrate concepts.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "AI-PM",
    "educationalCredentialAwarded": "Certified AI Product Manager™",
    "timeRequired": "P2D",
    "courseDuration": "10 hours",
    "coursePrerequisites": "Product management or product owner experience recommended. No coding required.",
    "teaches": [
      "AI Product Strategy and Roadmapping",
      "Rapid Prototyping with No-Code AI Tools",
      "AI-Powered User Research and Validation",
      "Product Lifecycle AI Integration",
      "Stakeholder Demos and Validation",
      "AI Product Analytics and Metrics",
      "Competitive Analysis with AI",
      "Product Documentation with AI"
    ],
    "offers": {
      "@type": "Offer",
      "price": "555",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/certified-ai-product-manager/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Certified AI Product Manager?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certified AI Product Manager is a 2-day certification that teaches product managers to use AI throughout the entire product development lifecycle. You learn to conduct AI-powered user research, build rapid prototypes without coding, validate ideas with stakeholders, analyze product data with AI, and demonstrate concepts through working demos."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need coding skills for this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No coding skills are required. The course teaches no-code and low-code AI tools for product managers. You'll learn to build prototypes using tools like ChatGPT, Claude, Figma with AI plugins, and no-code platforms without writing any code."
        }
      },
      {
        "@type": "Question",
        "name": "What is AI-powered rapid prototyping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI-powered rapid prototyping uses generative AI tools to quickly create working product demos and mockups. Product managers use AI to generate UI designs, write copy, create user flows, and build interactive prototypes in hours instead of weeks, enabling faster stakeholder validation and iteration."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from traditional product management training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional product management focuses on manual processes for research, documentation, and stakeholder communication. AI Product Manager training adds AI capabilities: automated user research analysis, AI-generated PRDs, rapid prototype creation, predictive analytics, and AI-assisted roadmapping, dramatically accelerating the product lifecycle."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take this certification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This certification is ideal for Product Managers, Product Owners, Business Analysts, UX Designers transitioning to product roles, and technical leaders responsible for product strategy. Anyone defining, building, or managing digital products can benefit from AI-powered product management skills."
        }
      },
      {
        "@type": "Question",
        "name": "What AI tools will I learn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll learn ChatGPT, Claude, Microsoft Copilot, Figma AI plugins, no-code prototyping tools, AI analytics platforms, and specialized product management AI tools. The course teaches practical integration of these tools into your daily product management workflow."
        }
      }
    ]
  };

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
        "name": "AI Product Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Certified AI Product Manager",
        "item": "https://www.agile36.com/courses/certified-ai-product-manager"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}

