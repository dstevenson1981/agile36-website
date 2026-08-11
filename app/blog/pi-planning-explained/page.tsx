import Link from "next/link";
import type { Metadata } from "next";
import EditorialBlogSchemaBlock from "@/app/components/blog/EditorialBlogSchemaBlock";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";
export const metadata: Metadata = {
  title: "PI Planning Explained: How SAFe's 2-Day Event Actually Works | Agile36",
  description:
    "PI Planning explained by an SPC who has run it for dozens of ARTs: the 2-day agenda, roles, outputs, common failure modes, and what separates good PIs from bad.",
  keywords: [
    "PI planning explained",
    "what is PI planning",
    "SAFe PI planning",
    "program increment planning",
    "PI planning agenda",
    "PI planning outputs",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title:
      "PI Planning Explained: How SAFe's 2-Day Planning Event Actually Works",
    description:
      "PI Planning explained by an SPC who has run it for dozens of ARTs: the 2-day agenda, roles, outputs, common failure modes, and what separates good PIs from bad.",
    url: "https://www.agile36.com/blog/pi-planning-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: {
    canonical: "https://www.agile36.com/blog/pi-planning-explained",
  },
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
      </div>
    </>
  );
}

/* --- Deloitte-style inline components --- */

function ExecutiveSummary() {
  return (
    <section
      aria-label="At a glance"
      className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 md:p-8 my-10"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400 font-bold mb-4">
        At a glance
      </p>
      <ul className="space-y-3 text-gray-300 text-[17px] leading-relaxed">
        <li className="flex gap-3">
          <span className="text-amber-400 font-bold">01</span>
          <span>
            <strong>PI Planning</strong> is a cadence-based, two-day event where
            every team on an Agile Release Train plans the next 8–12 week
            Program Increment together.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-amber-400 font-bold">02</span>
          <span>
            Typical scale: <strong>5–12 teams, 50–125 people</strong>, all in
            the same virtual or physical room at the same time.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-amber-400 font-bold">03</span>
          <span>
            Four outputs matter:{" "}
            <strong>PI objectives, program board, ROAMed risks,</strong> and a
            real <strong>confidence vote</strong>. Everything else is exhaust.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-amber-400 font-bold">04</span>
          <span>
            Great PI Planning isn&apos;t about having a perfect plan — it&apos;s
            about having a plan an entire ART believes in and will course-correct
            from.
          </span>
        </li>
      </ul>
    </section>
  );
}

function AgendaTimeline() {
  return (
    <section
      aria-label="PI Planning two-day agenda"
      className="my-10"
    >
      <svg
        role="img"
        aria-label="PI Planning 2-day agenda from business context through final plan review"
        viewBox="0 0 960 460"
        className="w-full h-auto rounded-xl border border-white/10"
      >
        <rect width="960" height="460" fill="rgba(255,255,255,0.03)" />
        <text x="480" y="40" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="700" fontFamily="system-ui,sans-serif">PI Planning: 2-Day Agenda</text>

        <rect x="48" y="76" width="864" height="166" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <text x="74" y="108" fill="#fbbf24" fontSize="18" fontWeight="700" fontFamily="system-ui,sans-serif">Day 1 — Context &amp; Draft Plans</text>
        <text x="74" y="138" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Business context (executive)</text>
        <text x="74" y="162" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Product / solution vision</text>
        <text x="74" y="186" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Architecture vision &amp; development practices</text>
        <text x="74" y="210" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Team breakouts — draft plans, dependencies, risks</text>
        <text x="500" y="138" fill="#fbbf24" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">Afternoon focus:</text>
        <text x="500" y="162" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Draft plan review</text>
        <text x="500" y="186" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Management review &amp; problem solving</text>

        <rect x="48" y="262" width="864" height="166" rx="12" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.15)" />
        <text x="74" y="294" fill="#fbbf24" fontSize="18" fontWeight="700" fontFamily="system-ui,sans-serif">Day 2 — Finalize &amp; Commit</text>
        <text x="74" y="324" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Planning adjustments from Day 1</text>
        <text x="74" y="348" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Team breakouts — finalize PI objectives</text>
        <text x="74" y="372" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Final plan review (team by team)</text>
        <text x="74" y="396" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Program risks ROAMed</text>
        <text x="500" y="324" fill="#fbbf24" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">End-of-day decision:</text>
        <text x="500" y="348" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Confidence vote (1–5)</text>
        <text x="500" y="372" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Rework if average is too low</text>
        <text x="500" y="396" fill="#ffffff" fontSize="14" fontFamily="system-ui,sans-serif">• Retrospective + moving forward</text>
      </svg>
    </section>
  );
}

function OutputsGrid() {
  return (
    <section
      aria-label="Four outputs of PI Planning"
      className="my-10"
    >
      <svg
        role="img"
        aria-label="Four primary outputs of PI Planning: PI objectives, program board, risks, and confidence vote"
        viewBox="0 0 960 330"
        className="w-full h-auto rounded-xl border border-white/10"
      >
        <rect width="960" height="330" fill="rgba(255,255,255,0.03)" />
        <text x="480" y="40" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="700" fontFamily="system-ui,sans-serif">The 4 Outputs That Matter</text>

        <rect x="24" y="72" width="220" height="230" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <text x="134" y="118" textAnchor="middle" fill="#fbbf24" fontSize="26" fontWeight="700" fontFamily="system-ui,sans-serif">PI Objectives</text>
        <text x="134" y="154" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Team + program objectives</text>
        <text x="134" y="174" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Business value scored 1-10</text>
        <text x="134" y="194" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Stretch objectives flagged</text>

        <rect x="256" y="72" width="220" height="230" rx="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.15)" />
        <text x="366" y="118" textAnchor="middle" fill="#fbbf24" fontSize="26" fontWeight="700" fontFamily="system-ui,sans-serif">Program Board</text>
        <text x="366" y="154" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Features by iteration</text>
        <text x="366" y="174" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Dependencies made visible</text>
        <text x="366" y="194" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Shared single source of truth</text>

        <rect x="488" y="72" width="220" height="230" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <text x="598" y="118" textAnchor="middle" fill="#fbbf24" fontSize="26" fontWeight="700" fontFamily="system-ui,sans-serif">ROAMed Risks</text>
        <text x="598" y="154" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Resolved / Owned</text>
        <text x="598" y="174" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Accepted / Mitigated</text>
        <text x="598" y="194" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Owners named before commit</text>

        <rect x="720" y="72" width="216" height="230" rx="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.15)" />
        <text x="828" y="118" textAnchor="middle" fill="#fbbf24" fontSize="26" fontWeight="700" fontFamily="system-ui,sans-serif">Confidence Vote</text>
        <text x="828" y="154" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">1-5 fingers per person</text>
        <text x="828" y="174" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Average target: 3+</text>
        <text x="828" y="194" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="system-ui,sans-serif">Low vote triggers rework</text>
      </svg>
    </section>
  );
}

function ScaleStats() {
  const stats: Array<{ num: string; label: string }> = [
    { num: "8–12", label: "Weeks per Program Increment" },
    { num: "5–12", label: "Teams per ART" },
    { num: "50–125", label: "People in the room" },
    { num: "≥ 3", label: "Avg confidence vote to commit" },
  ];
  return (
    <section aria-label="PI Planning by the numbers" className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white/[0.06] border border-white/15 rounded-2xl p-5 text-center"
          >
            <p className="text-3xl md:text-4xl font-bold text-amber-400 leading-none">
              {s.num}
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mt-3">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-4 border-white/20 pl-6 md:pl-8 py-2">
      <p className="text-xl md:text-2xl font-semibold text-gray-100 leading-snug italic">
        &ldquo;{children}&rdquo;
      </p>
    </blockquote>
  );
}

function KeyTakeaways() {
  const pts: string[] = [
    "PI Planning creates alignment without control — teams plan their own work inside a shared context.",
    "Dependencies only become manageable when every team puts them on the same program board at the same time.",
    "Confidence votes are the leading indicator — treat anything below 3 as a plan problem, not a cultural one.",
    "Remote PI Planning works, but only with one shared digital board, strict time discipline, and video on in breakouts.",
    "Skip Inspect &amp; Adapt and every future PI repeats the same mistakes — the cadence is plan → execute → inspect.",
  ];
  return (
    <section
      aria-label="Key takeaways"
      className="rounded-2xl border border-white/15 bg-white/[0.06] text-white p-6 md:p-8 my-10"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400 font-bold mb-4">
        Key takeaways
      </p>
      <ul className="space-y-3">
        {pts.map((p, i) => (
          <li key={i} className="flex gap-3 text-[17px] leading-relaxed">
            <span className="text-amber-400 font-bold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span dangerouslySetInnerHTML={{ __html: p }} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FailureCard({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="border border-white/15 rounded-2xl p-5 bg-white/[0.06]">
      <p className="text-amber-400 font-bold text-xs tracking-[0.18em] uppercase mb-2">
        Failure {num}
      </p>
      <p className="text-amber-400 font-bold text-lg mb-2">{title}</p>
      <p className="text-gray-300 text-[15px] leading-relaxed">{body}</p>
    </div>
  );
}

export default async function PiPlanningExplainedBlogPost() {
  return (
    <>
      <EditorialBlogSchemaBlock slug="pi-planning-explained" />
      <main className="min-h-screen bg-black text-white">
      <div className="w-full h-64 bg-white/[0.04] border-b border-white/10 relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white text-center px-8 relative z-10">
          PI Planning Explained: The 2-Day Event That Makes SAFe Work
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <span>/</span>
          <span>PI Planning explained</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="border border-white/15 bg-white/[0.06] text-amber-400 text-sm font-semibold px-4 py-1 rounded-full">
            SAFe
          </span>
          <span className="text-sm text-gray-400">Guide · 12 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white mb-8 leading-tight">
          PI Planning Explained: The 2-Day Event That Makes SAFe Work
        </h1>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            If SAFe has a heartbeat, <strong>PI Planning</strong> is it. Every
            8–12 weeks, an entire Agile Release Train — typically 50 to 125
            people across 5–12 teams — gathers for two days to plan the next
            Program Increment together. Out of those two days comes a concrete
            plan: who&apos;s building what, in which iteration, with which
            dependencies mapped and which risks owned. The event is covered in
            depth in the{" "}
            <Link
              href="/courses/leading-safe"
              className="text-amber-400 font-semibold underline hover:no-underline"
            >
              Leading SAFe course
            </Link>{" "}
            and is central to the Scrum Master and RTE roles.
          </p>

          <ExecutiveSummary />

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            This guide is <em>PI Planning explained</em> from the perspective
            of someone who has facilitated it for dozens of ARTs — the agenda,
            who does what, the four outputs that actually matter, how remote
            and hybrid events differ, the common failure modes, and how to tell
            a great PI Planning event from one that&apos;s going through the
            motions.
          </p>

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            What is PI Planning?
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            PI Planning is a cadence-based, face-to-face (or face-to-screen)
            event where every team on an Agile Release Train plans the next
            Program Increment together. A Program Increment (PI) is a fixed
            timebox — usually 8–12 weeks, made up of 4–6 iterations including a
            final Innovation &amp; Planning (IP) iteration.
          </p>

          <ScaleStats />

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The core idea: teams plan their own work, but they plan it together
            in the same room. That&apos;s what separates it from command-and-
            control planning where someone hands down a plan from above.
          </p>

          <PullQuote>
            The thing that makes PI Planning work isn&apos;t the plan — it&apos;s
            the fact that 100 people built it in the same room.
          </PullQuote>

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            Why it matters
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-300">
            <li>
              <strong>Alignment without control.</strong> Business context and
              architecture vision are communicated to everyone at the same
              time. Teams plan within that context.
            </li>
            <li>
              <strong>Dependencies become visible.</strong> Eight teams all
              working on the same system have cross-team dependencies — PI
              Planning forces those into the open on the program board where
              they can be negotiated.
            </li>
            <li>
              <strong>Risk management in public.</strong> Risks get ROAMed
              (Resolved, Owned, Accepted, Mitigated) in front of everyone —
              no quiet hope that it works out.
            </li>
            <li>
              <strong>Team commitment is real.</strong> Teams set their own PI
              objectives and take a confidence vote. Plans that come out of
              this event carry more weight than plans built by a project
              manager alone.
            </li>
          </ul>

          <SafeScrumMasterLink />

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            The 2-day agenda
          </h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Every well-run PI Planning follows the same basic structure. The
            timing varies by time zone and ART size, but the flow is the flow.
          </p>

          <AgendaTimeline />

          <p className="text-lg font-semibold text-white mb-2">
            Day 1 morning: Set the context
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
            <li>
              <strong>Business context</strong> — a senior executive opens with
              the current state of the business and what success looks like
            </li>
            <li>
              <strong>Product / solution vision</strong> — Product Management
              walks through top features, changes, and priorities
            </li>
            <li>
              <strong>Architecture vision &amp; dev practices</strong> — the
              System Architect covers architectural enablers and tech approach
            </li>
            <li>
              <strong>Planning context</strong> — the Release Train Engineer
              sets expectations, process, and logistics
            </li>
          </ul>

          <p className="text-lg font-semibold text-white mb-2">
            Day 1 afternoon: First team breakouts
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Teams split off and build a draft plan — features pulled from the
            program backlog, broken into stories, sized, and placed in
            iterations. Scrum Masters facilitate, Product Owners prioritize,
            dependencies go up on the program board. The ART scrum of scrums
            meets at least once to surface cross-team issues.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            Day 1 end: Draft plan review + management review
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Each team presents their draft plan, including risks and
            dependencies. After teams leave, leadership meets to make
            adjustments — scope changes, capacity shifts, descoped objectives
            — so teams come back Day 2 with the tradeoffs already made.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            Day 2 morning: Planning adjustments + second breakouts
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            The RTE announces any changes. Teams incorporate them, finalize
            their PI objectives, and refine the program board. This is where
            rough plans become committed plans.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            Day 2 afternoon: Final plan review + confidence vote
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Each team presents its finalized PI objectives, business value
            scores from Business Owners, and program-level risks. Program
            risks are ROAMed live. Then every individual votes 1–5 fingers on
            confidence in the plan. Average under 3 triggers rework. Average 3
            or above — plan is committed.
          </p>

          <p className="text-lg font-semibold text-white mb-8 leading-relaxed">
            The event closes with a short planning retrospective and a
            &quot;moving forward&quot; section — who&apos;s doing what starting
            Monday.
          </p>

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            Who&apos;s in the room
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-300">
            <li>
              <strong>Release Train Engineer (RTE)</strong> — the senior
              facilitator, owns the event
            </li>
            <li>
              <strong>Business Owners</strong> — executives accountable for
              business value; score objectives
            </li>
            <li>
              <strong>Product Management</strong> — brings the prioritized
              program backlog, owns the vision
            </li>
            <li>
              <strong>System Architect / Engineering</strong> — architectural
              runway and technical guidance
            </li>
            <li>
              <strong>Product Owners</strong> — one per team, prioritize team
              work during breakouts
            </li>
            <li>
              <strong>Scrum Masters</strong> — facilitate team-level planning,
              help surface dependencies and risks
            </li>
            <li>
              <strong>Team members</strong> — the people who will actually do
              the work, sizing their own stories
            </li>
            <li>
              <strong>Shared Services &amp; SMEs</strong> — security, UX, data,
              compliance representatives available to consult
            </li>
          </ul>

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            The 4 outputs that matter
          </h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Many teams leave PI Planning with a thick document that no one
            ever reads. The four things that actually matter:
          </p>

          <OutputsGrid />

          <ol className="list-decimal pl-6 mb-8 space-y-3 text-gray-300">
            <li>
              <strong>PI Objectives</strong> — a concise list per team, plus
              program-level objectives. Each has a business value score from
              Business Owners (1–10). Stretch objectives are called out
              separately.
            </li>
            <li>
              <strong>The Program Board</strong> — a visual (physical sticky
              wall or Miro / Mural board) showing features by iteration, team,
              and dependencies mapped with strings or lines. The single most
              valuable artifact.
            </li>
            <li>
              <strong>ROAMed Program Risks</strong> — every significant program
              risk categorized as Resolved, Owned, Accepted, or Mitigated, with
              an owner where needed.
            </li>
            <li>
              <strong>Confidence Vote</strong> — a real-time read of whether
              the plan is achievable. Average ≥ 3 means the ART has committed.
            </li>
          </ol>

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            Remote and hybrid PI Planning
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Since 2020, most ARTs run PI Planning fully remote or hybrid.
            It works when three things are true:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
            <li>
              A single digital program board (Miro, Mural, or similar) that
              every team uses — one source of truth for dependencies
            </li>
            <li>
              Video on in all team breakouts — facilitation is harder without
              faces
            </li>
            <li>
              Breaks every 90 minutes — Zoom fatigue kills plan quality after
              hour four
            </li>
          </ul>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Hybrid events (some rooms in person, some teams remote) are the
            hardest to run well. If you can&apos;t commit to either fully
            remote or fully in-person, consider scheduling the event over
            three half-days rather than two full days.
          </p>

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            Common failure modes
          </h2>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <FailureCard
              num="01"
              title="Underprepared program backlog"
              body={
                <>
                  If Product Management shows up with a vague, half-prioritized
                  backlog, teams plan against noise. Features should be ready —
                  sized, with acceptance criteria and dependencies flagged — at
                  least a week before the event.
                </>
              }
            />
            <FailureCard
              num="02"
              title="No real executives in the room"
              body={
                <>
                  Business Owners who skip the event or send delegates send a
                  signal: this work doesn&apos;t matter at the top. It also
                  means the business-value conversation happens after the fact.
                </>
              }
            />
            <FailureCard
              num="03"
              title="Scrum Masters planning for the team"
              body={
                <>
                  Teams own their plan. Scrum Masters facilitate, surface
                  blockers, and keep time — they don&apos;t assign stories.
                  When the Scrum Master is the one typing, confidence votes
                  are not meaningful.
                </>
              }
            />
            <FailureCard
              num="04"
              title="Fake confidence votes"
              body={
                <>
                  A confidence vote that somehow always lands at 4.2 is not a
                  real vote. Anonymous polling tools help remote events. Low
                  votes get talked through, not talked over.
                </>
              }
            />
            <FailureCard
              num="05"
              title="No Inspect &amp; Adapt at the end"
              body={
                <>
                  The cadence is plan → execute → inspect &amp; adapt. If the
                  I&amp;A workshop gets cut, every future PI Planning repeats
                  the same mistakes. I&amp;A is non-negotiable.
                </>
              }
            />
            <FailureCard
              num="06"
              title="Ignoring the program board after Day 2"
              body={
                <>
                  The board is the living contract of the PI. If it gets dusty
                  by iteration 2, the event was theater. RTEs should update
                  and review it in every Scrum of Scrums.
                </>
              }
            />
          </div>

          <KeyTakeaways />

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            Common questions
          </h2>

          <p className="text-lg font-semibold text-white mb-2">
            How often does PI Planning happen?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Once per Program Increment — usually every 8–12 weeks, matching the
            PI cadence.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            How long is PI Planning?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Two days. Some remote events split it into three half-days, but
            the total facilitated time is still roughly 16 hours.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            Who facilitates PI Planning?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            The Release Train Engineer owns the event. Scrum Masters facilitate
            team breakouts. The RTE role is covered in depth in the{" "}
            <Link
              href="/courses/release-train-engineer"
              className="text-amber-400 font-semibold underline hover:no-underline"
            >
              SAFe Release Train Engineer course
            </Link>
            .
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            What&apos;s the difference between PI Planning and Sprint Planning?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Sprint Planning is for one team, one sprint (1–2 weeks). PI
            Planning is for an entire ART (5–12 teams), one PI (8–12 weeks).
            Teams still do Sprint Planning at the start of each iteration —
            PI Planning sets the broader context for all of them.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            Can you do PI Planning without SAFe?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            You can run a similar event — many orgs do — but calling it PI
            Planning implies the SAFe structure (ART, PI cadence, program
            backlog, Business Owners). Without those pieces, you&apos;re doing
            something else. Before you decide on a framework, compare the{" "}
            <Link
              href="/blog/ssm-vs-csm"
              className="text-amber-400 font-semibold underline hover:no-underline"
            >
              SSM vs CSM certification paths
            </Link>{" "}
            to see which fits your organization.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            What does a successful PI Planning look like?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Finalized PI objectives that every team believes in, a program
            board with dependencies visibly mapped, risks ROAMed with owners, a
            confidence vote averaging 3 or higher, and a planning retrospective
            that produced one or two concrete improvements. If any of those are
            missing, the event didn&apos;t land.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            How do remote PI Planning events differ?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            The agenda is identical. The logistics are harder: one shared
            digital program board, stricter time discipline, video on in
            breakouts, anonymous polling for confidence votes. Well-run remote
            PI Planning is as effective as in-person — but it requires more
            preparation, not less.
          </p>

          <p className="text-lg font-semibold text-white mb-2">
            Is PI Planning covered in SSM training?
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Yes. A meaningful portion of{" "}
            <Link
              href="/blog/safe-scrum-master-exam-questions"
              className="text-amber-400 font-semibold underline hover:no-underline"
            >
              SAFe Scrum Master exam questions
            </Link>{" "}
            involve PI Planning facilitation. The RTE and Leading SAFe
            certifications cover it in more depth.
          </p>

          <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
            Where to go from here
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            If you&apos;re planning to facilitate PI Planning, the Release
            Train Engineer certification is the right path. If you&apos;re
            planning to lead your organization toward adopting SAFe, start with
            Leading SAFe.
          </p>
          <div className="rounded-2xl border border-white/15 bg-white/[0.06] text-white p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn SAFe from a real SPC</p>
            <p className="mb-5">
              Agile36 runs Leading SAFe, SSM, and RTE classes taught by
              practitioners who&apos;ve facilitated PI Planning at scale. Live
              virtual or in-person.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/courses/leading-safe"
                className="inline-block bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-100"
              >
                Leading SAFe
              </Link>
              <Link
                href="/courses/release-train-engineer"
                className="inline-block bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-100"
              >
                RTE Certification
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Related reading:{" "}
            <Link
              href="/blog/safe-lpm-vs-popm"
              className="text-amber-400 underline hover:no-underline"
            >
              SAFe LPM vs POPM
            </Link>
            {" · "}
            <Link
              href="/blog/is-safe-certification-worth-it-2026"
              className="text-amber-400 underline hover:no-underline"
            >
              Is SAFe certification worth it
            </Link>
          </p>
        </div>
      </article>
    </main>
    </>
  );
}

function SafeScrumMasterLink() {
  return (
    <p className="text-lg text-gray-300 mb-4 italic border-l-4 border-white/20 pl-4">
      Scrum Masters play a critical facilitation role during PI Planning. Full
      role coverage is in the{" "}
      <Link
        href="/courses/scrum-master"
        className="text-amber-400 font-semibold underline hover:no-underline"
      >
        SAFe Scrum Master course
      </Link>
      .
    </p>
  );
}
