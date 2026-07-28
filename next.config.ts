import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Parent ~/package-lock.json makes Turbopack pick the wrong root and 404 nested routes.
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingIncludes: {
    "/*": ["./content/blog/**/*", "./data/**/*", "./app/**/*.ts", "./app/**/*.tsx", "./mcp/**/*"],
  },
  async redirects() {
    return [
      // learn.agile36.com → main site (same paths)
      {
        source: "/:path*",
        has: [{ type: "host", value: "learn.agile36.com" }],
        destination: "https://www.agile36.com/:path*",
        permanent: true,
      },
      // Blog consolidation: duplicate LPM explainer merged into the main guide
      {
        source: '/blog/what-is-lean-portfolio-management',
        destination: '/blog/lean-portfolio-management',
        permanent: true,
      },
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
        source: '/safe-lean-portfolio-management-training',
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
        destination: '/courses/release-train-engineer',
        permanent: true,
      },
      {
        source: '/courses/safe-release-train-engineer',
        destination: '/courses/release-train-engineer',
        permanent: true,
      },
      // AI Agents deck: keep /brochures alias working; canonical file is at site root
      {
        source: '/brochures/Agile36-AI-Agents-Workshop-Deck.pdf',
        destination: '/Agile36-AI-Agents-Workshop-Deck.pdf',
        permanent: false,
      },
      // RTE open schedule retired — private enrollment lives at /private/rte
      {
        source: '/courses/release-train-engineer/schedule/checkout',
        destination: '/private/rte/checkout',
        permanent: false,
      },
      {
        source: '/courses/release-train-engineer/schedule/checkout/:path*',
        destination: '/private/rte/checkout/:path*',
        permanent: false,
      },
      {
        source: '/safe-value-stream-mapping-microcredential-course',
        destination: '/courses/value-stream-mapping',
        permanent: true,
      },
      {
        source: '/safe-agile-product-management-course',
        destination: '/courses/agile-product-management',
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
      // PMP retired — send old URLs to the course catalog
      {
        source: '/pmp-certification',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/pmp-certification',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/pmp-certification/:path*',
        destination: '/courses',
        permanent: true,
      },
      // Public Pro practice banks → free /test mocks only (Pro exams stay in /account)
      {
        source: '/test/leading-safe-pro',
        destination: '/test/leading-safe',
        permanent: true,
      },
      {
        source: '/leading-safepro',
        destination: '/test/leading-safe',
        permanent: true,
      },
      {
        source: '/leading-safe-pro-temp',
        destination: '/test/leading-safe',
        permanent: true,
      },
      {
        source: '/leading-safe-pro-temp-2',
        destination: '/test/leading-safe',
        permanent: true,
      },
      {
        source: '/ssmpro',
        destination: '/test/scrum-master',
        permanent: true,
      },
      {
        source: '/scrum-master-pro-temp',
        destination: '/test/scrum-master',
        permanent: true,
      },
      {
        source: '/scrum-master-pro-temp-2',
        destination: '/test/scrum-master',
        permanent: true,
      },
      {
        source: '/sasm-practice',
        destination: '/courses/advanced-scrum-master',
        permanent: true,
      },
      {
        source: '/test/advanced-scrum-master',
        destination: '/courses/advanced-scrum-master',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
