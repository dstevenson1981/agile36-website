import Link from 'next/link';
import type { Metadata } from 'next';
import { AI_ACADEMY_CASE_STUDIES } from '@/app/lib/academy/ai-academy';

export const metadata: Metadata = {
  title: 'Case Studies | AI Academy | Agile36',
  description:
    'Case studies from Agile36 AI Academy — agents, workflows, and real delivery outcomes.',
  alternates: { canonical: 'https://www.agile36.com/academy/case-studies' },
};

export default function AiAcademyCaseStudiesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
        <Link href="/academy" className="hover:text-[#1f2c4a]">
          AI Academy
        </Link>
        <span>/</span>
        <span className="text-[#1f2c4a]">Case studies</span>
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
        AI Academy
      </p>
      <h1 className="text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
        Case studies
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
        Stories from class labs and client delivery — how agent teams and n8n workflows get used in
        the wild. New write-ups land here as they ship.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {AI_ACADEMY_CASE_STUDIES.map((study) => {
          const inner = (
            <>
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
                ) : (
                  <span className="shrink-0 rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#d97706]">
                    Published
                  </span>
                )}
              </div>
              <h2 className="text-base font-semibold text-[#1f2c4a]">{study.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{study.summary}</p>
            </>
          );

          if (study.href && study.status === 'published') {
            return (
              <Link
                key={study.id}
                href={study.href}
                className="rounded-2xl border border-[#1f2c4a]/12 bg-white p-5 shadow-sm transition hover:border-[#1f2c4a]/25 hover:shadow-md"
              >
                {inner}
              </Link>
            );
          }

          return (
            <article
              key={study.id}
              className="rounded-2xl border border-[#1f2c4a]/10 bg-white/70 p-5 shadow-sm"
            >
              {inner}
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-4 text-sm text-[#475569]">
        <strong className="font-semibold text-[#1f2c4a]">Looking for agents?</strong>{' '}
        <Link href="/academy/ai-agents/agents" className="font-medium text-[#1f2c4a] underline-offset-2 hover:underline">
          Open the class agent marketplace
        </Link>{' '}
        or start from the{' '}
        <Link href="/academy/ai-agents" className="font-medium text-[#1f2c4a] underline-offset-2 hover:underline">
          AI Agents class hub
        </Link>
        .
      </div>
    </main>
  );
}
