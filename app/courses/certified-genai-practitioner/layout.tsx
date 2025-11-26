import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certified GenAI Practitioner™ Certification Training | GenAI Training | Agile36",
  description: "Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications in this comprehensive 4-hour course. Expert-led training.",
  keywords: [
    "GenAI Practitioner",
    "Generative AI",
    "GenAI training",
    "Prompt engineering",
    "AI ethics",
    "GenAI fundamentals",
    "AI applications",
    "Generative AI certification",
    "AI tools",
    "GenAI practitioner",
    "AI business applications",
    "GenAI course"
  ],
  openGraph: {
    title: "Certified GenAI Practitioner™ Certification Training | GenAI Training | Agile36",
    description: "Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications.",
    type: "website",
    url: "https://agile36.com/courses/certified-genai-practitioner",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certified GenAI Practitioner™ Certification Training",
    description: "Master Generative AI fundamentals with Certified GenAI Practitioner™ Certification Training. Learn prompt engineering, AI ethics, and practical applications.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/certified-genai-practitioner",
  },
};

export default function CertifiedGenAIPractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Certified GenAI Practitioner™ Certification Training",
    "description": "Certified GenAI Practitioner teaches professionals to use generative AI tools effectively. Learn prompt engineering, AI ethics, ChatGPT and Claude usage, business applications, and responsible AI implementation in a hands-on 4-hour course.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "GenAI-P",
    "educationalCredentialAwarded": "Certified GenAI Practitioner™",
    "timeRequired": "PT4H",
    "courseDuration": "4 hours",
    "coursePrerequisites": "No prerequisites required. Basic computer literacy recommended.",
    "teaches": [
      "Generative AI Fundamentals and Concepts",
      "Prompt Engineering Techniques",
      "AI Ethics and Responsible AI Practices",
      "ChatGPT and Claude for Business",
      "Practical GenAI Applications",
      "AI Tools and Integration",
      "Business Productivity with AI"
    ],
    "offers": {
      "@type": "Offer",
      "price": "299",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/certified-genai-practitioner/schedule"
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
        "name": "What is Certified GenAI Practitioner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certified GenAI Practitioner is a 4-hour certification course that teaches professionals to use generative AI tools effectively in business settings. You learn prompt engineering, AI ethics, practical applications of ChatGPT and Claude, and how to implement AI responsibly for productivity and decision-making."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need technical skills for this course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No technical or programming skills are required. The course is designed for non-technical professionals who want to use generative AI tools effectively. Basic computer literacy and familiarity with web browsers are sufficient."
        }
      },
      {
        "@type": "Question",
        "name": "What is prompt engineering?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prompt engineering is the practice of crafting effective instructions for AI tools like ChatGPT and Claude to get desired outputs. It involves understanding how to structure requests, provide context, specify format, and iterate on prompts to achieve accurate, useful responses from generative AI systems."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the certification take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Certified GenAI Practitioner course is 4 hours delivered as a live virtual session. You receive immediate certification upon completion. The course includes hands-on exercises, real-world examples, and lifetime access to course materials and prompt templates."
        }
      },
      {
        "@type": "Question",
        "name": "What AI tools will I learn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will learn to use ChatGPT, Claude, Microsoft Copilot, and other generative AI tools for business applications. The course covers practical use cases including content creation, data analysis, research, problem-solving, and workflow automation using AI."
        }
      },
      {
        "@type": "Question",
        "name": "Is this course suitable for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this course is designed for beginners with no prior AI experience. It starts with generative AI fundamentals and progressively builds to advanced prompt engineering techniques. The course is ideal for professionals looking to add AI skills to their role."
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
        "name": "Generative AI Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Certified GenAI Practitioner",
        "item": "https://www.agile36.com/courses/certified-genai-practitioner"
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

