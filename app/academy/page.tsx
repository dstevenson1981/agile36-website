import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AI_AGENTS_ACADEMY } from '@/app/lib/academy/ai-agents';

export const metadata: Metadata = {
  title: 'Academy | Agile36',
  description: 'Agile36 academies for hands-on AI and agile training.',
  alternates: { canonical: 'https://www.agile36.com/academy' },
};

export default function AcademyIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">Agile36</p>
      <h1 className="text-3xl font-normal tracking-tight text-[#1f2c4a] sm:text-4xl" style={{ letterSpacing: '-0.03em' }}>
        Academy
      </h1>
      <p className="mt-3 max-w-2xl text-base text-[#64748b]">
        Class hubs with materials, labs, and templates. Start with AI Agents — more academies will land here over time.
      </p>

      <div className="mt-10">
        <Link
          href={`/academy/${AI_AGENTS_ACADEMY.slug}`}
          className="group flex flex-col gap-5 rounded-2xl border border-[#1f2c4a]/12 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(31,44,74,0.35)] transition hover:border-[#1f2c4a]/25 sm:flex-row sm:items-center"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc]">
            <Image src={AI_AGENTS_ACADEMY.badge} alt="" width={72} height={72} className="h-16 w-16 object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold text-[#1f2c4a] group-hover:text-[#16243f]">
              {AI_AGENTS_ACADEMY.title}
            </h2>
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
      </div>
    </main>
  );
}
