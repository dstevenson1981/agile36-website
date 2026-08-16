import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  AI_ACADEMY,
  AI_ACADEMY_CASE_STUDIES,
  AI_ACADEMY_TOOLS,
} from '@/app/lib/academy/ai-academy';
import { AI_AGENTS_ACADEMY } from '@/app/lib/academy/ai-agents';

export const metadata: Metadata = {
  title: 'AI Academy | Agile36',
  description: AI_ACADEMY.description,
  alternates: { canonical: 'https://www.agile36.com/academy' },
};

export default function AiAcademyPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#1f2c4a]/10 bg-gradient-to-br from-[#eef3f9] via-[#f6f9fd] to-[#f8fafc]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
            Agile36
          </p>
          <h1
            className="text-3xl font-normal text-[#1f2c4a] sm:text-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {AI_ACADEMY.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#475569]">{AI_ACADEMY.tagline}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
            {AI_ACADEMY.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/academy/ai-agents/agents"
              className="inline-flex items-center justify-center rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16243f]"
            >
              Class agent marketplace
            </Link>
            <Link
              href="/academy/ai-agents"
              className="inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.04]"
            >
              AI Agents class hub
            </Link>
            <Link
              href={AI_AGENTS_ACADEMY.courseHref}
              className="inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.04]"
            >
              Course page
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
          Featured course
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
          Focus for now: No-Code AI Agents. AI Product Manager stays in the catalog separately.
        </p>

        <Link
          href="/academy/ai-agents"
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-[#1f2c4a]/12 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(31,44,74,0.35)] transition hover:border-[#1f2c4a]/25 sm:flex-row sm:items-center"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc]">
            <Image
              src={AI_AGENTS_ACADEMY.badge}
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-[#1f2c4a]">{AI_AGENTS_ACADEMY.title}</h3>
            <p className="mt-1 text-sm text-[#64748b]">{AI_AGENTS_ACADEMY.tagline}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-[#94a3b8]">
              Companion to {AI_AGENTS_ACADEMY.courseName}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1f2c4a]">
            Open
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </span>
        </Link>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            href="/academy/ai-agents/agents"
            className="rounded-xl border border-[#1f2c4a]/12 bg-white p-4 transition hover:border-[#1f2c4a]/25"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
              Install
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1f2c4a]">Class agent marketplace</p>
            <p className="mt-1 text-xs text-[#64748b]">
              PM, Designer, Dev, and Tester agents plus companion skills for Claude Code &amp; Codex.
            </p>
          </Link>
          <Link
            href="/academy/ai-agents/n8n-workflows"
            className="rounded-xl border border-[#1f2c4a]/12 bg-white p-4 transition hover:border-[#1f2c4a]/25"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
              Import
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1f2c4a]">Class n8n templates</p>
            <p className="mt-1 text-xs text-[#64748b]">Curated workflows for labs — not the full warehouse.</p>
          </Link>
        </div>
      </section>

      <section className="border-t border-[#1f2c4a]/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
            Class tools
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
            Set these up before class. Stack for AI Agents: Claude Code, Cursor, Codex, and n8n.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {AI_ACADEMY_TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#1f2c4a]/12 bg-[#f6f9fd] p-5 transition hover:border-[#1f2c4a]/25 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
                      {tool.role}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-[#1f2c4a]">{tool.name}</h3>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-[#64748b] group-hover:text-[#1f2c4a]">
                    Open ↗
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{tool.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1f2c4a]/10">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                className="text-xl font-semibold text-[#1f2c4a]"
                style={{ letterSpacing: '-0.03em' }}
              >
                Case studies
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
                Real builds from class and client work — how agents and workflows land in practice.
              </p>
            </div>
            <Link
              href="/academy/case-studies"
              className="text-sm font-semibold text-[#1f2c4a] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {AI_ACADEMY_CASE_STUDIES.map((study) => (
              <article
                key={study.id}
                className="rounded-2xl border border-[#1f2c4a]/12 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  {study.industry ? (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
                      {study.industry}
                    </p>
                  ) : (
                    <span />
                  )}
                  {study.status === 'coming-soon' ? (
                    <span className="shrink-0 rounded-full bg-[#1f2c4a]/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#64748b]">
                      Soon
                    </span>
                  ) : null}
                </div>
                <h3 className="text-sm font-semibold text-[#1f2c4a]">{study.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{study.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
