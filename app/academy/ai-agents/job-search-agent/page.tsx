import Link from 'next/link';
import type { Metadata } from 'next';
import CopyPastePrompt from './CopyPastePrompt';

export const metadata: Metadata = {
  title: 'Day 1 · Job Search Agent | AI Agents Academy',
  description:
    'Day 1 foundation for the Job Search Agent — copy-paste prompt, CLAUDE.md contract, skills stubs, and folder structure for Claude Code / Codex.',
  alternates: { canonical: 'https://www.agile36.com/academy/ai-agents/job-search-agent' },
};

const STEPS = [
  {
    title: '1. Open the build folder',
    body: 'In Claude Code or Codex, open the Job Search Agent folder so the agent can see CLAUDE.md and the skill stubs.',
  },
  {
    title: '2. Copy the prompt below',
    body: 'Paste it into a new chat. Attach your resume (or put it in context/resume.md and say so).',
  },
  {
    title: '3. Foundation only today',
    body: 'Responsibilities, never-dos, context, tools, skills list, folder structure, CLAUDE.md. Do not build search + scoring + HTML all at once.',
  },
  {
    title: '4. Fill your context files',
    body: 'Paste resume into context/resume.md and target roles into context/preferences.md before any real job search.',
  },
];

const NEVER = [
  'Submit an application',
  'Message a recruiter or hiring manager',
  'Invent experience not on the resume',
  'Trust a “Remote” search filter without reading the posting',
  'Require paid APIs or site logins for the core loop',
];

const SKILLS = [
  { id: 'job-search', label: 'Job search', detail: 'LinkedIn + Dice, last 7 days' },
  { id: 'remote-verify', label: 'Remote verify', detail: 'Confirm from posting text' },
  { id: 'fit-scoring', label: 'Fit scoring', detail: 'Gaps first, honest score' },
  { id: 'tailor-materials', label: 'Tailor materials', detail: 'Draft only' },
  { id: 'application-tracker', label: 'Application tracker', detail: 'Local markdown log' },
  { id: 'results-page', label: 'Results page', detail: 'Clickable output/jobs.html' },
];

export default function JobSearchAgentDay1Page() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#1f2c4a]/10 bg-gradient-to-br from-[#eef3f9] via-[#f6f9fd] to-[#f8fafc]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">
              Home
            </Link>
            <span>/</span>
            <Link href="/academy" className="hover:text-[#1f2c4a]">
              AI Academy
            </Link>
            <span>/</span>
            <Link href="/academy/ai-agents" className="hover:text-[#1f2c4a]">
              AI Agents
            </Link>
            <span>/</span>
            <span className="text-[#1f2c4a]">Job Search Agent</span>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
            Day 1 · Class build
          </p>
          <h1
            className="text-3xl font-normal text-[#1f2c4a] sm:text-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Job Search Agent
          </h1>
          <p className="mt-4 text-lg text-[#475569]">
            Find recent LinkedIn and Dice roles, verify remote from the posting, score fit against
            your real resume, draft materials, and track applications — without submitting anything
            for you.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
            Today is foundation only: agent contract, context, tools, skills, and folder structure.
            Walk it step by step.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/academy/ai-agents/builds/job-search-agent/CLAUDE.md"
              className="inline-flex items-center justify-center rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16243f]"
            >
              Open CLAUDE.md
            </a>
            <a
              href="/academy/ai-agents/builds/job-search-agent/COPY-PASTE-PROMPT.md"
              className="inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.04]"
            >
              Prompt file
            </a>
            <a
              href="/academy/ai-agents/builds/job-search-agent/README.md"
              className="inline-flex items-center justify-center rounded-lg border border-[#1f2c4a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.04]"
            >
              Walkthrough
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
          Step by step (Day 1)
        </h2>
        <ol className="mt-6 space-y-4">
          {STEPS.map((step) => (
            <li
              key={step.title}
              className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-[#1f2c4a]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-[#1f2c4a]/10 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
            Copy-paste prompt
          </h2>
          <CopyPastePrompt />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
          What this agent never does
        </h2>
        <ul className="mt-4 space-y-2">
          {NEVER.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-[#475569]">
              <span className="text-[#d97706]">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2
          className="mt-12 text-xl font-semibold text-[#1f2c4a]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Skills to create
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <a
              key={skill.id}
              href={`/academy/ai-agents/builds/job-search-agent/skills/${skill.id}/SKILL.md`}
              className="rounded-xl border border-[#1f2c4a]/12 bg-white p-4 transition hover:border-[#1f2c4a]/25"
            >
              <p className="text-sm font-semibold text-[#1f2c4a]">{skill.label}</p>
              <p className="mt-1 text-xs text-[#64748b]">{skill.detail}</p>
            </a>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#64748b]">
          Build files live under{' '}
          <code className="rounded bg-[#1f2c4a]/5 px-1.5 py-0.5 text-[12px] text-[#1f2c4a]">
            /academy/ai-agents/builds/job-search-agent/
          </code>
          . Download or clone that tree into Claude Code as the project root.
        </p>
      </section>
    </main>
  );
}
