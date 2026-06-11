import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Burndown Chart Explained: How to Read and Use Sprint Burndown | Agile36",
  description:
    "Burndown chart explained clearly: what it shows, how to read it, what burndown patterns mean, and when a burndown chart is useful versus misleading.",
  keywords: ["burndown chart explained", "sprint burndown chart", "how to read burndown chart", "agile burndown chart", "scrum burndown", "burndown vs burnup"],
  openGraph: {
    title: "Burndown Chart Explained: How to Read and Use Sprint Burndown",
    description: "What burndown charts show, how to read them, and what patterns indicate problems.",
    url: "https://www.agile36.com/blog/burndown-chart-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/burndown-chart-explained" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>A burndown chart shows <strong>remaining work over time</strong>. The ideal line runs from total sprint story points on day 1 to zero on the last day. The actual line shows where the team really is.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Burndown charts are most useful as <strong>early warning signals</strong> — a flat actual line on day 5 of a 10-day sprint is a problem the team can still fix. A flat line on day 9 is not.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Burndown charts <strong>hide scope changes</strong>. If stories are added mid-sprint, the actual line may burn down correctly while total scope grew. Burnup charts are better for showing scope change.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>No chart predicts sprint success better than a well-understood sprint goal. Teams can hit 100% burndown and miss the sprint goal if they finished the wrong stories first.</span></li>
      </ul>
    </section>
  );
}

function BurndownVisual() {
  const patterns = [
    { name: "Ideal", color: "bg-gray-400", pcts: [100, 80, 60, 40, 20, 0], desc: "Steady linear progress" },
    { name: "Healthy", color: "bg-green-500", pcts: [100, 75, 55, 38, 18, 0], desc: "Slightly uneven but finishes" },
    { name: "Late Spike", color: "bg-yellow-500", pcts: [100, 95, 90, 60, 30, 0], desc: "Slow start, rushed finish" },
    { name: "At Risk", color: "bg-red-500", pcts: [100, 98, 95, 80, 65, 45], desc: "Not finishing — needs action" },
  ];
  return (
    <section aria-label="Burndown chart patterns" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Common Burndown Patterns (Sprint Progress Day 1→End)</h3>
      <div className="space-y-4">
        {patterns.map((p) => (
          <div key={p.name} className="flex items-center gap-4">
            <div className="w-24 text-right text-sm font-semibold text-gray-700 hidden sm:block">{p.name}</div>
            <div className="flex-1 flex items-end gap-1 h-12">
              {p.pcts.map((pct, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-12">
                  <div className={`w-full rounded-t ${p.color} opacity-70`} style={{ height: `${pct * 0.12}rem` }} />
                </div>
              ))}
            </div>
            <div className="w-48 text-xs text-gray-500 hidden md:block">{p.desc}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Each column represents a sprint day. Height = remaining work (higher = more remaining). Ideal pattern is steady decline to zero.</p>
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
          "Burndown is a progress tool, not a performance metric. Never use burndown data to evaluate individual developers or teams against each other.",
          "A flat burndown line means work isn't getting completed — not that no work is being done. The SM's job is to ask why: unclear stories, blocked items, or hidden work all produce flat lines.",
          "Burnup charts are better than burndown for sprint tracking because they show both completion progress and scope changes simultaneously. Burndown hides scope growth.",
          "The most actionable moment on a burndown chart is the midpoint of the sprint. At day 5 of a 10-day sprint, the team should be at roughly 50% remaining work. A significantly higher actual line gives 5 days to recover.",
          "Teams that never have flat burndown lines have either very small stories (good) or are burning down in large chunks (worth examining). Story size and burndown shape are correlated — smaller stories produce smoother curves.",
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

export default function BurndownChartExplainedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Burndown Chart Explained: How to Read and Use Sprint Burndown
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Burndown Chart Explained</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Metrics</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Burndown Chart Explained: How to Read and Use Sprint Burndown
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The burndown chart is one of the oldest agile artifacts — and one of the most misread. Teams use it as a performance metric when it&apos;s a progress signal, and managers use it to compare teams when it&apos;s only meaningful within a single team&apos;s context. This guide explains what burndown actually shows, how to read the patterns that matter, and when a burnup chart serves you better. For Scrum Masters, understanding when to use burndown and when not to is part of the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM curriculum</Link>.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How a Burndown Chart Works</h2>
          <p className="text-lg text-gray-700 mb-4">
            At the start of a sprint, the team commits to a certain number of story points (or stories, or tasks). The burndown chart plots remaining work on the Y-axis against time on the X-axis. An "ideal" line runs from the total committed work on day 1 to zero on the last day of the sprint. The "actual" line is updated daily as work is completed.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            When the actual line is above the ideal line, the team is behind planned pace. When it&apos;s below, they&apos;re ahead. When it&apos;s flat, no work is being completed. When it suddenly drops steeply, a large story was just finished (or stories were removed from scope).
          </p>

          <BurndownVisual />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Each Burndown Pattern Tells You</h2>
          <div className="space-y-4 my-6">
            {[
              { pattern: "Flat line (no burn)", signal: "Work isn't getting completed. Common causes: blocked items, stories that are larger than estimated, unclear acceptance criteria, or team members working on untracked tasks." },
              { pattern: "Slow burn early, steep burn late", signal: "Late-sprint heroics. The sprint might finish, but it&apos;s a pattern that creates technical debt and unsustainable delivery pressure. Improve story decomposition so work is more even." },
              { pattern: "Actual line below ideal throughout", signal: "Team under-committed (capacity planning issue) or stories are being inflated in estimation. Adjust sprint planning to increase scope challenge." },
              { pattern: "Actual line spikes upward mid-sprint", signal: "Scope was added to the sprint. Burndown hides this — the remaining work went up, then back down. This is where burnup charts are more honest." },
              { pattern: "Line drops to zero before sprint ends", signal: "Either under-commitment (plan more next sprint) or stories were moved out (surface that at retrospective to understand why)." },
            ].map((item) => (
              <div key={item.pattern} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-semibold text-[#01203d] text-sm mb-1">{item.pattern}</p>
                <p className="text-gray-600 text-sm">{item.signal}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Scrum Master, e-commerce platform">
            I stopped using burndown charts the day I realized my team&apos;s burndown looked perfect but we were never actually finishing the most important stories. We&apos;d burn down by completing the easiest stories first. Switching to a sprint board walk and tracking in-progress stories changed my visibility entirely.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Burndown vs Burnup: When to Use Each</h2>
          <p className="text-lg text-gray-700 mb-4">
            Burndown shows remaining work decreasing to zero. Burnup shows completed work increasing from zero to the total — and crucially, it shows when the total changes. This makes burnup more honest for sprints with scope changes. For release planning over multiple sprints, burnup is almost always better than burndown.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="font-bold text-[#01203d] mb-2">Use Burndown when:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Sprint scope is stable (no mid-sprint additions)</li>
                <li>• Team is tracking by story points in a stable Scrum cadence</li>
                <li>• You want a simple daily progress signal</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="font-bold text-[#01203d] mb-2">Use Burnup when:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Scope frequently changes mid-sprint</li>
                <li>• Tracking a release over multiple sprints</li>
                <li>• Stakeholders need to see progress AND scope changes together</li>
              </ul>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Master Agile Metrics with SAFe Training</p>
            <p className="mb-5">Burndown, burnup, cycle time, and flow metrics covered in context of real SAFe team delivery.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/agile-metrics-guide" className="text-[#01203d] underline hover:no-underline">Agile metrics guide</Link>
            {" · "}
            <Link href="/blog/velocity-in-agile" className="text-[#01203d] underline hover:no-underline">Velocity in agile</Link>
            {" · "}
            <Link href="/blog/cycle-time-lead-time-explained" className="text-[#01203d] underline hover:no-underline">Cycle time vs lead time</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
