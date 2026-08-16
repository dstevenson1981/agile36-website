export type AiAcademyTool = {
  id: string;
  name: string;
  summary: string;
  href: string;
  role: string;
};

export type AiAcademyCaseStudy = {
  id: string;
  title: string;
  summary: string;
  industry?: string;
  status: 'published' | 'coming-soon';
  href?: string;
};

export const AI_ACADEMY = {
  title: 'AI Academy',
  tagline: 'Hands-on AI training for building agents that ship real work.',
  description:
    'Start here for Agile36 AI courses. Today the focus is No-Code AI Agents & Automation — class agents, n8n templates, and the tools you will use in class.',
};

/** Stack links students need before / during class. */
export const AI_ACADEMY_TOOLS: AiAcademyTool[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    summary: 'Anthropic’s coding agent in the terminal and IDE — primary agent runtime in class.',
    href: 'https://claude.com/product/claude-code',
    role: 'Agents',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    summary: 'AI-native editor. Use it alongside Claude Code for repo work and reviews.',
    href: 'https://cursor.com',
    role: 'Editor',
  },
  {
    id: 'codex',
    name: 'Codex',
    summary: 'OpenAI’s coding agent — second runtime for the software-team capstone.',
    href: 'https://openai.com/codex',
    role: 'Agents',
  },
  {
    id: 'n8n',
    name: 'n8n',
    summary: 'Workflow automation for handoffs, triggers, and known paths between agents.',
    href: 'https://n8n.io',
    role: 'Workflows',
  },
];

/**
 * Case studies for the AI Academy. Add published entries here as they land;
 * coming-soon placeholders keep the section visible for students.
 */
export const AI_ACADEMY_CASE_STUDIES: AiAcademyCaseStudy[] = [
  {
    id: 'se-team-capstone',
    title: 'Software engineering agent team',
    summary:
      'How a PM → Designer → Dev → Tester agent pack ships a small product with n8n handoffs.',
    industry: 'Product / Engineering',
    status: 'coming-soon',
  },
  {
    id: 'ops-automation',
    title: 'Ops automation with agents + n8n',
    summary:
      'Where fixed workflows win, where agent judgment wins, and how the two connect in delivery.',
    industry: 'Operations',
    status: 'coming-soon',
  },
  {
    id: 'client-delivery',
    title: 'Client delivery pack',
    summary:
      'A curated agent + workflow set used on a real Agile36 client engagement (details coming).',
    industry: 'Consulting',
    status: 'coming-soon',
  },
];
