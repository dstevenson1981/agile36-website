import Link from 'next/link';
import type { Metadata } from 'next';
import {
  SCRUM_SKILLS,
  SCRUM_SKILLS_INSTALL,
  SCRUM_SKILLS_REPO,
} from '@/app/lib/academy/scrum-master-skills';
import SkillsBrowser, { HowToAddSkills, CopyCommand } from './SkillsBrowser';

const TITLE = 'Scrum Master AI Skills Library';
const DESCRIPTION =
  'Free AI skills for Scrum Masters: every Scrum and SAFe event, facilitation, team conflict, risks, backlog, metrics and stakeholders. Use them in Claude, GitHub Copilot, ChatGPT or any AI assistant.';

export const metadata: Metadata = {
  title: `${TITLE} | Agile36`,
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.agile36.com/academy/scrum-master-skills' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.agile36.com/academy/scrum-master-skills' },
};

const SPRINT_EVENTS = [
  { when: 'Ongoing', event: 'Refinement', slug: 'backlog-refinement' },
  { when: 'Day 1', event: 'Sprint Planning', slug: 'sprint-plan' },
  { when: 'Every day', event: 'Daily Scrum', slug: 'daily-scrum' },
  { when: '2–3× a week', event: 'Scrum of Scrums', slug: 'scrum-of-scrums' },
  { when: 'Last day', event: 'Sprint Review', slug: 'sprint-review' },
  { when: 'Last day', event: 'Retrospective', slug: 'scrum-retrospective' },
];

const SAFE_EVENTS = [
  { when: 'PI start', event: 'PI Planning', slug: 'pi-planning' },
  { when: 'Weekly', event: 'Coach, PO & ART Sync', slug: 'art-sync' },
  { when: 'PI end', event: 'Inspect & Adapt', slug: 'inspect-and-adapt' },
];

function EventStrip({ items, cols }: { items: typeof SPRINT_EVENTS; cols: string }) {
  return (
    <nav className={`grid overflow-hidden rounded-2xl border border-[#111111]/12 bg-white ${cols}`}>
      {items.map((e) => (
        <a
          key={e.slug}
          href={`#skill-${e.slug}`}
          className="flex min-w-0 flex-col gap-1 border-[#111111]/10 p-4 transition hover:bg-[#111111]/[0.03] [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">{e.when}</span>
          <span className="text-sm font-semibold text-[#111111]">{e.event}</span>
          <span className="truncate font-mono text-xs text-[#B8860B]">{e.slug}</span>
        </a>
      ))}
    </nav>
  );
}

export default function ScrumMasterSkillsPage() {
  const core = SCRUM_SKILLS.filter((s) => !s.optional).length;
  const withFiles = SCRUM_SKILLS.filter((s) => s.hasFiles).length;
  const categories = new Set(SCRUM_SKILLS.map((s) => s.category)).size;

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#111111]/10 bg-gradient-to-br from-[#eef3f9] via-[#f6f9fd] to-[#f8fafc]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#111111]">Home</Link>
            <span>/</span>
            <Link href="/academy" className="hover:text-[#111111]">AI Academy</Link>
            <span>/</span>
            <span className="text-[#111111]">Scrum Master Skills</span>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Free for Scrum Masters</p>
          <h1 className="max-w-3xl text-3xl font-normal text-[#111111] sm:text-5xl" style={{ letterSpacing: '-0.03em' }}>
            {TITLE}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#475569]">
            AI skills for the work a Scrum Master does every sprint. Each one teaches your AI assistant how to help
            with one job: plan a Sprint Review, run a pre-mortem, prep PI Planning, handle a conflict.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
            Works in Claude, GitHub Copilot, ChatGPT, Gemini and any other assistant. Copy one, download one, or
            install them all with one command.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[#64748b]">
            <span><b className="font-semibold text-[#111111]">{core}</b> core skills</span>
            <span><b className="font-semibold text-[#111111]">{SCRUM_SKILLS.length - core}</b> optional</span>
            <span><b className="font-semibold text-[#111111]">{categories}</b> categories</span>
            <span><b className="font-semibold text-[#111111]">{withFiles}</b> ready to copy or download</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#how-to"
              className="inline-flex items-center justify-center rounded-lg bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#000000]"
            >
              How to add a skill
            </a>
            <a
              href="#skills"
              className="inline-flex items-center justify-center rounded-lg border border-[#111111]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#111111] transition hover:bg-[#111111]/[0.04]"
            >
              Browse the skills
            </a>
            <a
              href={SCRUM_SKILLS_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-[#111111]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#111111] transition hover:bg-[#111111]/[0.04]"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">A skill for every event</p>
        <h2 className="mt-2 text-2xl font-normal text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
          The sprint, event by event
        </h2>
        <div className="mt-6">
          <EventStrip items={SPRINT_EVENTS} cols="grid-cols-1 sm:grid-cols-3 lg:grid-cols-6" />
        </div>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
          And across the Planning Interval in SAFe
        </p>
        <div className="mt-3">
          <EventStrip items={SAFE_EVENTS} cols="grid-cols-1 sm:grid-cols-3" />
        </div>
      </section>

      <section id="how-to" className="scroll-mt-24 border-y border-[#111111]/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Step by step</p>
          <h2 className="mt-2 text-2xl font-normal text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
            How to add a skill to your AI assistant
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
            A skill is a short instruction file, called SKILL.md, that teaches an assistant how to do one job.
            Pick your tool:
          </p>
          <div className="mt-6">
            <HowToAddSkills />
          </div>

          <div className="mt-10 rounded-2xl border border-[#111111]/10 bg-[#f8fafc] p-5">
            <h3 className="text-sm font-semibold text-[#111111]">Want all of them at once?</h3>
            <p className="mt-1 text-sm text-[#64748b]">
              On a Mac or Linux terminal, this installs every core skill into Claude Code. Add{' '}
              <code className="rounded bg-[#111111]/[0.06] px-1.5 py-0.5 font-mono text-xs text-[#111111]">--target zip</code>,{' '}
              <code className="rounded bg-[#111111]/[0.06] px-1.5 py-0.5 font-mono text-xs text-[#111111]">--target copilot</code> or{' '}
              <code className="rounded bg-[#111111]/[0.06] px-1.5 py-0.5 font-mono text-xs text-[#111111]">--target plain</code>{' '}
              at the end for the other tools.
            </p>
            <div className="mt-3">
              <CopyCommand command={SCRUM_SKILLS_INSTALL} />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">The library</p>
        <h2 className="mt-2 text-2xl font-normal text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
          Every skill, by job
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
          Each card has a prompt to try it with. Use a made-up team when you practice, never real names or company
          data.
        </p>
        <div className="mt-6">
          <SkillsBrowser skills={SCRUM_SKILLS} install={SCRUM_SKILLS_INSTALL} />
        </div>
      </section>

      <section className="border-t border-[#111111]/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
              Learn to use them in class
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
              These skills come from Agile36&apos;s Scrum Master training, where students also build, test and
              share skills of their own.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/scrum-master-certification-training"
                className="inline-flex items-center justify-center rounded-lg bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#000000]"
              >
                SAFe Scrum Master training
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center justify-center rounded-lg border border-[#111111]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#111111] transition hover:bg-[#111111]/[0.04]"
              >
                AI Academy
              </Link>
            </div>
          </div>
          <div className="text-sm leading-relaxed text-[#64748b]">
            <h2 className="text-xl font-semibold text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
              Credits and licenses
            </h2>
            <p className="mt-2">
              Skills marked Agile36 are written by Agile36 and shared under{' '}
              <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#111111] underline-offset-2 hover:underline">
                CC BY 4.0
              </a>
              . Skills from other authors keep their own licenses; each card links to its source. Skills that
              aren&apos;t ours to republish link to their author&apos;s repository instead of offering a copy.
            </p>
            <p className="mt-2">
              SAFe is a registered trademark of Scaled Agile, Inc. The SAFe skills describe practice in
              Agile36&apos;s own words.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
