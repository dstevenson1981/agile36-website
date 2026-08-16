import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AGENCY_AGENTS_CLASS_CATALOG } from '@/app/lib/academy/agency-agents';
import { AI_AGENTS_ACADEMY, AI_AGENTS_MODULES } from '@/app/lib/academy/ai-agents';
import { N8N_CLASS_CATALOG } from '@/app/lib/academy/n8n-workflows';

export const metadata: Metadata = {
  title: 'AI Agents Academy | Agile36',
  description: AI_AGENTS_ACADEMY.description,
  alternates: { canonical: 'https://www.agile36.com/academy/ai-agents' },
};

export default function AiAgentsAcademyPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#1f2c4a]/10 bg-gradient-to-br from-[#eef3f9] via-[#f6f9fd] to-[#f8fafc]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">
              Home
            </Link>
            <span>/</span>
            <Link href="/academy" className="hover:text-[#1f2c4a]">
              Academy
            </Link>
            <span>/</span>
            <span className="text-[#1f2c4a]">AI Agents</span>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">Academy</p>
              <h1
                className="text-3xl font-normal text-[#1f2c4a] sm:text-4xl"
                style={{ letterSpacing: '-0.03em' }}
              >
                {AI_AGENTS_ACADEMY.title}
              </h1>
              <p className="mt-4 text-lg text-[#475569]">{AI_AGENTS_ACADEMY.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#64748b]">{AI_AGENTS_ACADEMY.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/academy/ai-agents/agents"
                  className="inline-flex items-center justify-center rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16243f]"
                >
                  Class agents
                </Link>
                <Link
                  href="/academy/ai-agents/n8n-workflows"
                  className="inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.04]"
                >
                  Class n8n templates
                </Link>
                <Link
                  href={AI_AGENTS_ACADEMY.courseHref}
                  className="inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.04]"
                >
                  Course page
                </Link>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 rounded-2xl border border-[#1f2c4a]/10 bg-white/80 p-6 backdrop-blur-sm">
              <Image
                src={AI_AGENTS_ACADEMY.badge}
                alt="No-Code AI Agents badge"
                width={140}
                height={140}
                className="h-28 w-28 object-contain"
              />
              <p className="max-w-[11rem] text-center text-xs text-[#64748b]">
                Companion hub for {AI_AGENTS_ACADEMY.courseName}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
          Class modules
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
          Stack for this academy: Claude Code, Codex, and n8n — no Make.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {AI_AGENTS_MODULES.map((mod) => {
            const inner = (
              <>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-[#1f2c4a]">{mod.title}</h3>
                  {mod.status === 'coming-soon' ? (
                    <span className="shrink-0 rounded-full bg-[#1f2c4a]/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#64748b]">
                      Soon
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#d97706]">
                      Ready
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-[#64748b]">{mod.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mod.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-[#1f2c4a]/10 bg-[#f8fafc] px-2 py-0.5 text-[11px] font-medium text-[#475569]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </>
            );

            if (mod.href) {
              return (
                <Link
                  key={mod.id}
                  href={mod.href}
                  className="rounded-2xl border border-[#1f2c4a]/12 bg-white p-5 shadow-sm transition hover:border-[#1f2c4a]/25 hover:shadow-md"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <div
                key={mod.id}
                className="rounded-2xl border border-[#1f2c4a]/10 bg-white/70 p-5 shadow-sm"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[#1f2c4a]/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
            Class marketplaces
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
            {AGENCY_AGENTS_CLASS_CATALOG.agents.length} installable agents and{' '}
            {N8N_CLASS_CATALOG.workflows.length} n8n workflows for labs. Full business inventories
            stay owner-only under the internal libraries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/academy/ai-agents/agents"
              className="inline-flex items-center rounded-lg bg-[#1f2c4a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#16243f]"
            >
              Open class agents
            </Link>
            <Link
              href="/academy/ai-agents/n8n-workflows"
              className="inline-flex items-center rounded-lg border border-[#1f2c4a]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.04]"
            >
              Open class templates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
