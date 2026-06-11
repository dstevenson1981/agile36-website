import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Definition of Done Examples: How to Write a DoD That Actually Works | Agile36",
  description:
    "Real Definition of Done examples for software teams, SAFe ARTs, and regulated environments. How to write a DoD that enforces quality without slowing delivery.",
  keywords: [
    "definition of done examples",
    "how to write definition of done",
    "agile definition of done",
    "SAFe definition of done",
    "DoD agile",
    "definition of done checklist",
  ],
  openGraph: {
    title: "Definition of Done Examples: How to Write a DoD That Actually Works",
    description: "Real DoD examples for software teams, SAFe ARTs, and regulated environments.",
    url: "https://www.agile36.com/blog/definition-of-done-examples",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/definition-of-done-examples" },
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
        <div className="flex gap-1">{[...Array(12)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />)}</div>
      </div>
    </>
  );
}

function ExecutiveSummary() {
  return (
    <section aria-label="At a glance" className="bg-gray-50 border-l-4 border-[#01203d] p-6 md:p-8 my-10 rounded-r-lg">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#01203d] font-bold mb-4">At a glance</p>
      <ul className="space-y-3 text-gray-800 text-[17px] leading-relaxed">
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Definition of Done is the team's shared quality standard — every story that gets called "complete" must meet all DoD criteria. It's not a goal; it's a gate.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>A DoD that's too long slows delivery. A DoD that's too short ships broken software. The right DoD is the <strong>minimum quality standard</strong> that produces a genuinely releasable increment.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>In SAFe, teams maintain a team-level DoD. The ART may also maintain a <strong>program-level DoD</strong> for PI increments — covering things like integration testing and system demo readiness.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>A DoD should be reviewed and updated at <strong>retrospectives</strong> — not written once and forgotten. Teams evolve their quality standards as they mature.</span></li>
      </ul>
    </section>
  );
}

function DodExampleGrid() {
  const examples = [
    {
      context: "Software Development Team (Standard)",
      items: ["Code reviewed by at least one other developer", "Unit tests written and passing", "Acceptance criteria verified by PO", "No critical/high bugs introduced", "Code merged to main branch", "Feature deployed to staging", "Documentation updated if applicable"],
    },
    {
      context: "SAFe ART Program-Level DoD",
      items: ["All team-level DoDs met for all stories", "Integration tests passing in shared environment", "System Demo-ready (feature demonstrated end-to-end)", "Performance benchmarks met", "Security scan completed with no new critical findings", "PI objectives contribution confirmed"],
    },
  ];
  return (
    <section aria-label="Definition of Done examples" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Real DoD Examples</h3>
      <div className="space-y-6">
        {examples.map((e) => (
          <div key={e.context} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-[#01203d] text-white p-4 font-bold">{e.context}</div>
            <div className="p-5">
              <ul className="space-y-2">
                {e.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution: string }) {
  return (
    <blockquote className="border-l-4 border-yellow-400 pl-6 md:pl-8 my-12">
      <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug italic">{children}</p>
      <footer className="text-sm text-gray-600 mt-3 not-italic">— {attribution}</footer>
    </blockquote>
  );
}

function KeyTakeaways() {
  const items = [
    "The DoD is the team's quality contract with itself and with stakeholders. Violating it erodes trust over time.",
    "If the team routinely skips DoD criteria 'just this sprint,' those criteria aren't real — either enforce them or remove them and be honest about your quality bar.",
    "A DoD that grows over time reflects a maturing team. Start simple (code reviewed, tests passing, PO accepted) and add criteria as the team improves.",
    "The DoD and acceptance criteria work together — acceptance criteria define what the story does; the DoD defines the quality it must meet.",
    "In SAFe programs, team DoDs contribute to the ART's ability to demonstrate working software at the System Demo. An incomplete team DoD is an ART-level risk.",
  ];
  return (
    <section aria-label="Key takeaways" className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">Key takeaways</p>
      <ol className="space-y-5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="text-yellow-400 font-bold text-lg min-w-[28px]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[17px] leading-relaxed text-gray-100">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function DefinitionOfDoneExamplesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Definition of Done Examples: How to Write a DoD That Actually Works
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Definition of Done Examples</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Definition of Done Examples: How to Write a DoD That Actually Works
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            A weak Definition of Done is how technical debt accumulates invisibly until it collapses a sprint. A DoD that's too long becomes a bureaucratic checklist that teams quietly ignore. Getting it right requires understanding what the DoD is actually for — and what it isn't. For{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Scrum Masters</Link>{" "}
            facilitating team quality conversations, the DoD is one of the most powerful tools in the toolkit when used well.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What the DoD Is For</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Definition of Done exists to prevent one of the most common agile anti-patterns: calling work "done" when it's only "done-ish." In Scrum, an increment is only releasable if it meets the DoD. That means every story added to the sprint review as complete must pass every DoD criterion — not most of them.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This matters because the alternative — negotiating "done" per story based on time pressure — systematically accumulates hidden technical debt, unverified quality, and eventually, production failures. The DoD is what allows teams to sprint at a sustainable pace without storing up problems.
          </p>

          <DodExampleGrid />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Write Your Team&apos;s First DoD</h2>
          <p className="text-lg text-gray-700 mb-4">
            The best DoDs are written collaboratively during a retrospective or team workshop. Here's the sequence:
          </p>
          <div className="space-y-4 my-6">
            {[
              { step: "1", action: "Brainstorm quality criteria", desc: "Ask the team: 'What would have to be true about a story for you to call it done without worry?' Capture everything on a whiteboard or Miro board." },
              { step: "2", action: "Categorize as DoD or acceptance criteria", desc: "Story-specific checks (e.g., 'the discount calculation is correct') are acceptance criteria. Cross-story quality standards (e.g., 'code reviewed') belong in the DoD." },
              { step: "3", action: "Eliminate aspirational criteria", desc: "Remove anything the team currently can't reliably execute. A DoD you skip is worse than a shorter DoD you follow. Add aspirational items as team maturity increases." },
              { step: "4", action: "Write it down and make it visible", desc: "Post the DoD where the team can see it — sprint board, team wiki, physical wall. It's not real if it only lives in the SM's head." },
              { step: "5", action: "Review at retrospectives", desc: "Ask at each retro: 'Did we meet our DoD for every story? Should we add anything?' Evolve it deliberately." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">{s.step}</div>
                <div>
                  <strong className="block text-gray-900 text-sm mb-1">{s.action}</strong>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, enterprise software">
            The teams that argue most about whether something is done are the ones without a clear DoD. The agreement has to happen before the sprint starts, not after someone calls a story complete.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">DoD in SAFe: Two Levels</h2>
          <p className="text-lg text-gray-700 mb-4">
            In a SAFe Agile Release Train, quality operates at two levels. Teams maintain a team-level DoD (story-level quality) and the ART maintains a program-level DoD (increment-level quality for System Demos and PI milestones). The program DoD typically includes integration testing, performance benchmarks, and cross-team verification that no single team can validate alone.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Scrum Masters who work on ARTs should ensure their team's DoD contributes to the ART's ability to demonstrate a working, integrated system at each System Demo. Stories that meet team DoD but create integration failures at the program level suggest the DoDs are misaligned. Our{" "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] font-semibold underline hover:no-underline">PI Planning explained guide</Link>{" "}
            covers how System Demos fit in the PI cadence.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who creates the Definition of Done?</p>
              <p className="text-lg text-gray-700">The development team creates the DoD, often with input from the Scrum Master and Product Owner. The Scrum Master facilitates the conversation. The PO provides context on what quality means for users. But the team owns the DoD — it represents their commitment to their own standards.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's the difference between DoD and acceptance criteria?</p>
              <p className="text-lg text-gray-700">Acceptance criteria are specific to each story — they define what the story accomplishes. The DoD is universal — it defines the quality bar every story must meet regardless of content. Both must be satisfied for a story to be truly complete.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can the DoD vary between stories?</p>
              <p className="text-lg text-gray-700">No. If the DoD varies by story, it's not a definition — it's a negotiation. The DoD should be consistent. Stories with genuinely different quality requirements (e.g., documentation-heavy regulated work) might have additional acceptance criteria, but the base DoD applies to everything.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What happens if a story fails the DoD at sprint review?</p>
              <p className="text-lg text-gray-700">It's not accepted. The work returns to the backlog as incomplete. This is uncomfortable but correct — calling incomplete work "done" stores up risk. The Scrum Master's job in this moment is to facilitate an honest conversation about what happened and why, not to soften the standard.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should "deploy to production" be in the DoD?</p>
              <p className="text-lg text-gray-700">If you have continuous delivery, yes — "deployed to production" is the cleanest DoD criterion. If you release on a cadence (e.g., quarterly), then "deployed to staging and production-ready" is more realistic. The goal is to separate "done" from "in the release queue."</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Train Your Scrum Masters in Agile Quality Practices</p>
            <p className="mb-5">DoD, acceptance criteria, retrospectives, and sprint facilitation — covered in live SAFe SSM training.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/user-story-writing-guide" className="text-[#01203d] underline hover:no-underline">User story writing guide</Link>
            {" · "}
            <Link href="/blog/sprint-planning-best-practices" className="text-[#01203d] underline hover:no-underline">Sprint planning best practices</Link>
            {" · "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] underline hover:no-underline">Advanced Scrum Master</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
