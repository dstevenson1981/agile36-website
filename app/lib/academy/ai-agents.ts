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
    "Class materials, workflow templates, and the software-team capstone for Agile36's No-Code AI Agents training. Start with the mental model, practice in n8n, then ship a multi-agent team.",
};

export const AI_AGENTS_MODULES: AcademyModule[] = [
  {
    id: 'foundations',
    title: 'Foundations: Agent = LLM + Context + Tools',
    summary:
      'The core loop every agent runs: observe, decide, act, check. Separate judgment (agents) from orchestration (workflows).',
    tools: ['Claude', 'Claude Code', 'Codex'],
    status: 'ready',
  },
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
    id: 'agent-vs-workflow',
    title: 'Workflows vs Agents',
    summary:
      'Same business goal, two implementations: a fixed n8n path vs Claude Code / Codex deciding mid-task. See where each wins.',
    tools: ['n8n', 'Claude Code', 'Codex'],
    status: 'coming-soon',
  },
  {
    id: 'capstone',
    title: 'Capstone: Software Engineering Agent Team',
    summary:
      'Stand up PM, Designer, Dev, and Tester agents. Use n8n for handoffs and status; use coding agents for judgment inside each role.',
    tools: ['n8n', 'Claude Code', 'Codex'],
    status: 'coming-soon',
  },
];
