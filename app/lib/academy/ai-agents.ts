export type AcademyModule = {
  id: string;
  title: string;
  summary: string;
  tools: string[];
  status: 'ready' | 'coming-soon';
  href?: string;
};

export const AI_AGENTS_ACADEMY = {
  slug: 'ai-agents',
  title: 'AI Agents Academy',
  courseName: 'No-Code AI Agents & Automation™',
  courseHref: '/courses/ai-agent-builder',
  badge: '/Logo_Agents.png',
  tagline: 'Build agents that do real work — with Claude Code, Codex, and n8n.',
  description:
    "Class materials, installable agent packs, n8n templates, and the software-team capstone for Agile36's No-Code AI Agents training.",
};

export const AI_AGENTS_MODULES: AcademyModule[] = [
  {
    id: 'n8n-workflows',
    title: 'Class n8n templates',
    summary:
      'Curated importable workflows for labs — enough to teach, not the full business inventory.',
    tools: ['n8n'],
    status: 'ready',
    href: '/academy/ai-agents/n8n-workflows',
  },
  {
    id: 'agents-marketplace',
    title: 'Class agent marketplace',
    summary:
      'Install PM, Designer, Dev, and Tester agents into Claude Code or Codex — skip inventing prompts on a limited plan.',
    tools: ['Claude Code', 'Codex'],
    status: 'ready',
    href: '/academy/ai-agents/agents',
  },
  {
    id: 'capstone',
    title: 'Capstone: Software Engineering Agent Team',
    summary:
      'Stand up PM, Designer, Dev, and Tester from the class marketplace. Use n8n for handoffs; use agents for judgment.',
    tools: ['n8n', 'Claude Code', 'Codex'],
    status: 'ready',
    href: '/academy/ai-agents/agents',
  },
];
