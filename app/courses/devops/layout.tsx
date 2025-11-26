import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe® 6.0 DevOps (SDP) Certification Training | Agile36",
  description: "Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe. Earn 16 PDUs & SEUs. Expert-led 2-day course. Enroll now!",
  keywords: [
    "SAFe DevOps",
    "SAFe SDP certification",
    "DevOps training",
    "SAFe 6.0 DevOps",
    "continuous delivery",
    "deployment automation",
    "DevOps pipeline",
    "CI/CD",
    "infrastructure as code",
    "DevOps practices",
    "DevOps certification",
    "SAFe DevOps certification USA",
    "DevOps course",
    "SAFe DevOps certification",
    "SDP training online",
    "SAFe certification training"
  ],
  openGraph: {
    title: "SAFe® 6.0 DevOps (SDP) Certification Training | Agile36",
    description: "Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe. Earn 16 PDUs & SEUs.",
    type: "website",
    url: "https://agile36.com/courses/devops",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFe® 6.0 DevOps (SDP) Certification Training",
    description: "Master DevOps practices with SAFe® DevOps Certification Training. Learn continuous delivery pipelines, deployment automation, and DevOps practices in SAFe.",
  },
  alternates: {
    canonical: "https://agile36.com/courses/devops",
  },
};

export default function DevOpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAFe® 6.0 DevOps (SDP) Certification Training",
    "description": "SAFe DevOps Practitioner (SDP) certification teaches DevOps practices within SAFe. Learn to build continuous delivery pipelines, automate deployments, implement CI/CD, practice infrastructure as code, enable release on demand, and integrate DevOps into Agile Release Trains.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Agile36",
      "url": "https://www.agile36.com",
      "telephone": "310-620-7966",
      "email": "d.stevenson@agile36.com"
    },
    "courseCode": "SDP",
    "educationalCredentialAwarded": "SAFe DevOps Practitioner (SDP) Certification",
    "timeRequired": "P2D",
    "courseDuration": "16 hours",
    "coursePrerequisites": "Software development, operations, or DevOps experience recommended",
    "teaches": [
      "Continuous Delivery Pipeline Design",
      "CI/CD Implementation and Automation",
      "Infrastructure as Code (IaC)",
      "Testing Automation Strategies",
      "Release on Demand",
      "DevSecOps and Security Integration",
      "Value Stream Optimization",
      "DevOps Culture and Collaboration"
    ],
    "offers": {
      "@type": "Offer",
      "price": "599",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.agile36.com/courses/devops/schedule"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "234",
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
        "name": "What is SAFe DevOps Practitioner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SAFe DevOps Practitioner (SDP) is a 2-day certification teaching DevOps practices within Scaled Agile Framework. You learn to build continuous delivery pipelines, automate CI/CD, implement infrastructure as code, enable release on demand, integrate security (DevSecOps), and create DevOps culture across Agile Release Trains."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Continuous Delivery Pipeline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Continuous Delivery Pipeline (CDP) is an automated workflow that moves code from development through testing to production. It includes continuous exploration, integration, deployment, and release on demand. The pipeline automates builds, tests, security scans, and deployments to enable frequent, reliable software releases."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to be a developer to take SAFe DevOps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, but technical experience helps. SAFe DevOps is for developers, operations engineers, release managers, QA automation engineers, site reliability engineers, and technical leaders. Understanding software development lifecycles, deployment processes, and infrastructure basics is beneficial."
        }
      },
      {
        "@type": "Question",
        "name": "What is Infrastructure as Code (IaC)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Infrastructure as Code (IaC) is managing and provisioning infrastructure through code instead of manual configuration. Using tools like Terraform, CloudFormation, or Ansible, teams define servers, networks, and configurations as version-controlled code, enabling automated, repeatable, and consistent infrastructure deployments."
        }
      },
      {
        "@type": "Question",
        "name": "What tools are covered in SAFe DevOps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The course covers DevOps principles applicable to any toolset. Common tools discussed include Jenkins, GitLab CI/CD, Docker, Kubernetes, Terraform, Ansible, Git, monitoring tools, and testing frameworks. Focus is on practices and patterns rather than specific tool implementation."
        }
      },
      {
        "@type": "Question",
        "name": "How is SAFe DevOps different from regular DevOps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional DevOps focuses on single team or product workflows. SAFe DevOps applies DevOps at enterprise scale across multiple teams on Agile Release Trains. It addresses coordination of 50-125+ people, shared pipelines, program-level releases, and integrating DevOps with SAFe ceremonies like PI Planning."
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
        "name": "SAFe Courses",
        "item": "https://www.agile36.com/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "SAFe DevOps",
        "item": "https://www.agile36.com/courses/devops"
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



