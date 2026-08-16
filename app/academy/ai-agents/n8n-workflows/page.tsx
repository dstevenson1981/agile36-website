import Link from 'next/link';
import type { Metadata } from 'next';
import N8nWorkflowsBrowser from './N8nWorkflowsBrowser';
import { N8N_CLASS_CATALOG } from '@/app/lib/academy/n8n-workflows';

export const metadata: Metadata = {
  title: 'Class n8n Templates | AI Agents Academy | Agile36',
  description:
    'Curated n8n workflow templates for Agile36 AI Agents Academy class labs — not the full business inventory.',
  alternates: { canonical: 'https://www.agile36.com/academy/ai-agents/n8n-workflows' },
};

export default function N8nWorkflowsPage() {
  const n = N8N_CLASS_CATALOG.workflows.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
        <Link href="/academy" className="hover:text-[#1f2c4a]">
          Academy
        </Link>
        <span>/</span>
        <Link href="/academy/ai-agents" className="hover:text-[#1f2c4a]">
          AI Agents
        </Link>
        <span>/</span>
        <span className="text-[#1f2c4a]">Class templates</span>
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
        For class
      </p>
      <h1 className="text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
        Class n8n templates
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
        {n} teaching-ready workflows for labs — curated so students aren&apos;t lost in thousands of
        files. Download JSON and import in n8n (Menu → Import).
      </p>

      <div className="mt-4 rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3 text-sm text-[#475569]">
        <strong className="font-semibold text-[#1f2c4a]">Class tip:</strong> run a workflow first to
        show a known path, then replace a step with Claude Code or Codex to show agent judgment.
      </div>

      <div className="mt-8">
        <N8nWorkflowsBrowser catalog={N8N_CLASS_CATALOG} />
      </div>
    </main>
  );
}
