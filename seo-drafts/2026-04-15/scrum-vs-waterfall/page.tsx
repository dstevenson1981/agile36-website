import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum vs Waterfall: Key Differences and When to Use Each | Agile36",
  description:
    "Scrum vs waterfall explained: how they differ in planning, delivery, feedback loops, and risk management — and which approach fits different project contexts.",
  keywords: ["scrum vs waterfall", "agile vs waterfall", "scrum waterfall comparison", "when to use scrum vs waterfall", "waterfall methodology vs agile", "scrum waterfall difference"],
  openGraph: {
    title: "Scrum vs Waterfall: Key Differences and When to Use Each",
    description: "How Scrum and waterfall differ in planning, delivery, and risk — and when each makes sense.",
    url: "https://www.agile36.com/blog/scrum-vs-waterfall",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-vs-waterfall" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Waterfall works best when <strong>requirements are stable, well-understood, and unlikely to change</strong>. Scrum works best when requirements will evolve and fast feedback from working software is valuable.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most important difference: in waterfall, <strong>delivery happens at the end</strong>. In Scrum, working software is delivered every sprint — creating feedback opportunities and reducing the risk of building the wrong thing for 12 months.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Waterfall is <strong>not inherently inferior</strong> — it&apos;s a different risk model. For construction, hardware manufacturing, or compliance-heavy projects with genuinely fixed requirements, waterfall&apos;s sequential predictability is appropriate.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Most organizations don&apos;t choose one or the other purely — they use <strong>hybrid approaches</strong> where product development is agile but infrastructure, legal, and procurement phases follow sequential processes.</span></li>
      </ul>
    </section>
  );
}

function ComparisonBars() {
  const dimensions = [
    { dim: "Flexibility to change requirements", scrum: 90, waterfall: 20 },
    { dim: "Upfront planning certainty", scrum: 40, waterfall: 85 },
    { dim: "Speed to first customer feedback", scrum: 90, waterfall: 10 },
    { dim: "Predictability at project start", scrum: 45, waterfall: 80 },
    { dim: "Risk of building the wrong thing", scrum: 25, waterfall: 85 },
  ];
  return (
    <section aria-label="Scrum vs waterfall comparison" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Scrum vs Waterfall: Capability Comparison</h3>
      <p className="text-xs text-gray-500 mb-4">Higher bars = more of that dimension. Neither approach is universally better — it depends on project context.</p>
      <div className="space-y-5">
        {dimensions.map((d) => (
          <div key={d.dim}>
            <p className="text-sm font-semibold text-gray-700 mb-2">{d.dim}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-600 w-16 text-right">Scrum</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${d.scrum}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-8">{d.scrum}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-16 text-right">Waterfall</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-500 h-3 rounded-full" style={{ width: `${d.waterfall}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-8">{d.waterfall}%</span>
              </div>
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
  return (
    <section aria-label="Key takeaways" className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">Key takeaways</p>
      <ol className="space-y-5">
        {[
          "Scrum's iterative cycle (plan → build → review → retro) is designed to surface wrong assumptions early, when the cost of changing course is low. Waterfall surfaces wrong assumptions at delivery, when the cost of change is maximum.",
          "Waterfall's advantage is clear: when requirements are genuinely fixed and the solution path is well-understood, sequential phases produce predictable timelines and budgets. The weakness is that those conditions are rare in software development.",
          "Most teams migrating from waterfall to Scrum struggle with the transition to sprint commitments — where the team commits to scope rather than a deadline. This is a fundamental mindset shift, not just a process change.",
          "SAFe doesn't abandon planning — it replaces annual project planning with PI Planning, which produces 10-12 week commitments. This gives organizations planning predictability within agile delivery cycles.",
          "The 'waterfall vs agile' debate is largely settled in software development contexts. The relevant question for most practitioners today is: 'how do we implement agile effectively?' — which is what SAFe addresses.",
        ].map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="text-yellow-400 font-bold text-lg min-w-[28px]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[17px] leading-relaxed text-gray-100">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ScrumVsWaterfallPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum vs Waterfall: Key Differences and When to Use Each
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum vs Waterfall</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile vs Traditional</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum vs Waterfall: Key Differences and When to Use Each
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The scrum vs waterfall comparison is foundational context for anyone entering agile practice — or explaining agile to organizations considering a transition. The argument is not that waterfall is always wrong; it&apos;s that most software development involves enough uncertainty that iterative delivery is better suited than sequential phases. This is the core premise behind SAFe and why certifications like the{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe</Link>{" "}
            are structured around cycles of learning rather than upfront specification.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How Each Approach Works</h2>
          <p className="text-lg text-gray-700 mb-4">
            Waterfall divides a project into sequential phases: requirements, design, build, test, deploy. Each phase completes before the next begins. The logic is that a complete specification at the start enables predictable execution. The weakness is that specifications are rarely complete or correct — and discovering that in test phase means expensive rework.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Scrum divides delivery into sprints — typically 2-week cycles where a team plans, builds, and delivers working software. Each sprint produces something real that stakeholders can see and react to. Requirements evolve based on what was learned. The tradeoff is that full-scope predictability is lower, but the risk of delivering the wrong thing is dramatically reduced.
          </p>

          <ComparisonBars />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">When Waterfall Is the Right Choice</h2>
          <p className="text-lg text-gray-700 mb-4">
            Waterfall suits projects where requirements are fixed and legally or contractually obligated, where sequential dependencies make parallel development impossible (physical construction, hardware), or where the cost of rework after delivery is extremely high. Nuclear plant control systems, bridge construction, and aerospace software for flight systems often use rigorous sequential methodologies — not because Scrum is unavailable, but because the failure modes of those environments require exhaustive upfront specification.
          </p>

          <PullQuote attribution="SAFe Program Consultant, logistics enterprise">
            The most honest framing is: waterfall assumes you know what you&apos;re building before you build it. Scrum assumes you&apos;ll discover it as you go. The software industry has decades of evidence that the second assumption is more accurate for most product development. That&apos;s not agile dogma — it&apos;s empirical.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can Scrum and waterfall coexist in the same organization?</p>
              <p className="text-lg text-gray-700">Yes, and they often do. An enterprise might use Scrum for software product development while maintaining waterfall processes for infrastructure projects, procurement cycles, or regulatory compliance work. SAFe's portfolio management layer is designed to manage investment across both approaches, allocating funding to value streams that may use different delivery models.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the biggest challenge in transitioning from waterfall to Scrum?</p>
              <p className="text-lg text-gray-700">Mindset, not process. Teams transitioning from waterfall often struggle with sprint commitment (defining scope rather than timelines), accepting that requirements will change, and doing demo-ready work every two weeks rather than building toward a single big release. These are cultural changes that training and coaching address — process changes alone don't produce them.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does SAFe use waterfall elements?</p>
              <p className="text-lg text-gray-700">SAFe retains planning predictability through PI Planning — which produces a 10-12 week plan with committed PI Objectives. This is more structured than pure Scrum but fully iterative. The result is "planned agility": organizations get business predictability from PI planning and delivery flexibility from sprint-level execution.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is waterfall easier to manage than Scrum?</p>
              <p className="text-lg text-gray-700">Waterfall is easier to manage in a Gantt chart — milestones, phases, and dates are defined upfront. Scrum is harder to measure against fixed timelines but produces more frequent evidence of actual progress. Most managers find Scrum harder to communicate to executives until they shift from reporting phase completion to reporting customer value delivered.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is this comparison on the SSM exam?</p>
              <p className="text-lg text-gray-700">Not directly as a comparison, but understanding why agile exists — the problems it solves relative to sequential approaches — provides useful context for scenario questions about agile values and principles. The exam assumes you understand why Scrum is structured the way it is, which requires understanding the alternative.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Transition Your Organization to Agile</p>
            <p className="mb-5">Leading SAFe training covers agile principles, transformation strategy, and how to build organizational agility at scale.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/kanban-vs-scrum" className="text-[#01203d] underline hover:no-underline">Kanban vs Scrum</Link>
            {" · "}
            <Link href="/blog/agile-transformation-mistakes" className="text-[#01203d] underline hover:no-underline">Agile transformation mistakes</Link>
            {" · "}
            <Link href="/blog/safe-framework-explained" className="text-[#01203d] underline hover:no-underline">SAFe framework explained</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
