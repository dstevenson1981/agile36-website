import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // SAFe Courses - Old URL structure to new structure
      {
        source: '/safe-agilist-leading-safe',
        destination: '/courses/leading-safe',
        permanent: true,
      },
      {
        source: '/safe-product-owner-product-manager-course',
        destination: '/courses/product-owner-manager',
        permanent: true,
      },
      {
        source: '/safe-lean-portfolio-management-course',
        destination: '/courses/lean-portfolio-management',
        permanent: true,
      },
      {
        source: '/safe-scrum-master-course',
        destination: '/courses/scrum-master',
        permanent: true,
      },
      {
        source: '/safe-for-teams-course',
        destination: '/courses/safe-for-teams',
        permanent: true,
      },
      {
        source: '/safe-responsible-ai-course',
        destination: '/courses/responsible-ai',
        permanent: true,
      },
      {
        source: '/safe-devops-certification-training',
        destination: '/courses/devops',
        permanent: true,
      },
      {
        source: '/safe-advanced-scrum-master-certification-course',
        destination: '/courses/advanced-scrum-master',
        permanent: true,
      },
      {
        source: '/safe-release-train-engineer-rte-certification-training',
        destination: '/release-train-engineer-certification-training',
        permanent: true,
      },
      {
        source: '/safe-value-stream-mapping-microcredential-course',
        destination: '/courses/value-stream-mapping',
        permanent: true,
      },
      // AI Courses
      {
        source: '/certified-ai-product-manager-pmai',
        destination: '/courses/certified-ai-product-manager',
        permanent: true,
      },
      {
        source: '/certified-genai-practitioner',
        destination: '/courses/certified-genai-practitioner',
        permanent: true,
      },
      // Additional AI courses (for consistency)
      {
        source: '/ai-driven-scrum-master',
        destination: '/courses/ai-driven-scrum-master',
        permanent: true,
      },
      {
        source: '/executive-genai-leadership',
        destination: '/courses/executive-genai-leadership',
        permanent: true,
      },
      {
        source: '/generative-ai-project-managers',
        destination: '/courses/generative-ai-project-managers',
        permanent: true,
      },
      {
        source: '/ai-agent-builder',
        destination: '/courses/ai-agent-builder',
        permanent: true,
      },
      // Agile courses
      {
        source: '/agile-product-management',
        destination: '/courses/agile-product-management',
        permanent: true,
      },
      {
        source: '/pmp-certification',
        destination: '/courses/pmp-certification',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
