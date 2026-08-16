import Link from 'next/link';
import type { Metadata } from 'next';
import AgencyAgentsBrowser from './AgencyAgentsBrowser';
import {
  AGENCY_AGENTS_CLASS_CATALOG,
  AGENCY_AGENTS_CLASS_SKILLS,
} from '@/app/lib/academy/agency-agents';

export const metadata: Metadata = {
  title: 'Class Agent Marketplace | AI Agents Academy | Agile36',
  description:
    'Curated Product Manager, Designer, Developer, and Tester agents plus companion skills for Agile36 AI Agents Academy — install into Claude Code or Codex without inventing prompts.',
  alternates: { canonical: 'https://www.agile36.com/academy/ai-agents/agents' },
};

export default function ClassAgentsMarketplacePage() {
  const n = AGENCY_AGENTS_CLASS_CATALOG.agents.length;
  const skillCount = AGENCY_AGENTS_CLASS_SKILLS.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
        <Link href="/academy" className="hover:text-[#1f2c4a]">
          AI Academy
        </Link>
        <span>/</span>
        <Link href="/academy/ai-agents" className="hover:text-[#1f2c4a]">
          AI Agents
        </Link>
        <span>/</span>
        <span className="text-[#1f2c4a]">Class agents</span>
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
        For class
      </p>
      <h1 className="text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
        Class agent marketplace
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
        {n} teaching-ready roles and {skillCount} companion skills for the software-team capstone —
        PM, Design, Dev, and Tester seats you install instead of inventing on a $20 plan.
      </p>

      <div className="mt-4 rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3 text-sm text-[#475569]">
        <strong className="font-semibold text-[#1f2c4a]">Capstone tip:</strong> start with Product
        Manager → UI Designer → Frontend Developer → Reality Checker. Download each role&apos;s
        skills with the agent. Use n8n for handoffs; use agents + skills for judgment.
      </div>

      <div className="mt-8">
        <AgencyAgentsBrowser catalog={AGENCY_AGENTS_CLASS_CATALOG} mode="class" />
      </div>
    </main>
  );
}
