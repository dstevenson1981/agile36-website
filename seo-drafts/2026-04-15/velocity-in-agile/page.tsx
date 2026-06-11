import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velocity in Agile: What It Is, How to Calculate It, and What It Means | Agile36",
  description:
    "Agile velocity explained: how to calculate it, why it matters for sprint planning and release forecasting, and the most common velocity mistakes teams make.",
  keywords: ["velocity in agile", "agile velocity", "what is velocity scrum", "how to calculate velocity", "sprint velocity", "team velocity agile"],
  openGraph: {
    title: "Velocity in Agile: What It Is, How to Calculate It, and What It Means",
    description: "How to calculate velocity, use it for planning, and avoid the common velocity mistakes.",
    url: "https://www.agile36.com/blog/velocity-in-agile",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/velocity-in-agile" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Velocity is the <strong>sum of story points completed per sprint</strong>. It's calculated after each sprint by totaling the points of fully done stories — not started, not "mostly done."</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>A stable velocity (averaging over 3–5 sprints) is the most reliable input for <strong>sprint planning</strong> and release date forecasting.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Velocity is a <strong>team-level planning tool</strong>, not a productivity metric. Comparing velocity across teams or using it to evaluate individual performance destroys its usefulness.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>In SAFe, velocity feeds into <strong>PI Planning</strong> — teams use their historical velocity to size PI objectives and determine how much they can realistically commit to per Program Increment.</span></li>
      </ul>
    </section>
  );
}

function VelocityChart() {
  const sprints = [
    { sprint: "Sprint 1", pts: 28, pct: 43 },
    { sprint: "Sprint 2", pts: 35, pct: 54 },
    { sprint: "Sprint 3", pts: 40, pct: 62 },
    { sprint: "Sprint 4", pts: 42, pct: 65 },
    { sprint: "Sprint 5", pts: 38, pct: 58 },
    { sprint: "Sprint 6", pts: 41, pct: 63 },
    { sprint: "Sprint 7", pts: 43, pct: 66 },
    { sprint: "Sprint 8", pts: 40, pct: 62 },
  ];
  return (
    <section aria-label="Sample team velocity over 8 sprints" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-2">Sample Team Velocity — 8 Sprints</h3>
      <p className="text-sm text-gray-500 mb-4">Average velocity stabilizes after sprint 3 (~40 pts). Planning to 38–43 is appropriate.</p>
      <div className="space-y-2">
        {sprints.map((s) => (
          <div key={s.sprint} className="flex items-center gap-3">
            <div className="w-20 text-sm text-gray-700">{s.sprint}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-7">
              <div className="h-7 rounded-full bg-[#134263] flex items-center justify-end pr-2" style={{ width: `${s.pct}%` }}>
                <span className="text-white text-xs font-bold">{s.pts}</span>
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
  const items = [
    "Velocity is a planning input, not a performance score. Use it to forecast — not to judge.",
    "Only count story points for stories that fully meet the Definition of Done. Partial credit invalidates the metric.",
    "Velocity naturally varies 10–20% sprint to sprint. Large variations signal a systemic issue worth exploring in retrospective.",
    "In SAFe PI Planning, teams use their velocity to validate how many story points they can commit across the 5 iterations (minus one for Innovation & Planning).",
    "New teams should wait 3–5 sprints before using velocity for external commitments. Early velocity is highly unstable.",
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

export default function VelocityInAgilePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Velocity in Agile: What It Is, How to Calculate It, and What It Means
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Velocity in Agile</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Metrics</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Velocity in Agile: What It Is, How to Calculate It, and What It Means
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Velocity is one of the most useful metrics a Scrum team has — and also one of the most abused. Used correctly, it makes sprint planning more predictable and release forecasting more honest. Used incorrectly, it becomes a pressure tool that pushes teams to game their estimates and erodes trust. Every{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master</Link>{" "}
            needs to understand both dimensions — the mechanics and the dysfunctions.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Calculate Velocity</h2>
          <p className="text-lg text-gray-700 mb-4">
            Velocity calculation is straightforward: at the end of each sprint, add up the story points of every story that fully meets your Definition of Done. Partially complete stories count zero. Stories completed but not accepted by the Product Owner count zero.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 my-6">
            <div className="font-mono text-sm text-gray-700 space-y-2">
              <p>Sprint 4 completed stories:</p>
              <p className="pl-4">User registration: 5 pts ✓</p>
              <p className="pl-4">Email confirmation: 3 pts ✓</p>
              <p className="pl-4">Password reset: 5 pts ✓</p>
              <p className="pl-4">Login history: 8 pts — not completed</p>
              <p className="pl-4">Profile edit: 2 pts ✓</p>
              <div className="border-t border-gray-300 mt-2 pt-2 font-bold text-[#01203d]">Sprint 4 Velocity = 15 pts (login history excluded)</div>
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            The rolling average of the last 3–5 sprints is the most useful velocity number for planning. Don't use just the last sprint (too volatile) or all sprints ever (too slow to reflect team changes).
          </p>

          <VelocityChart />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Using Velocity for Release Forecasting</h2>
          <p className="text-lg text-gray-700 mb-4">
            If your team averages 40 story points per sprint and your remaining backlog has 200 points, you can forecast roughly 5 more sprints to completion. This is far more honest than a Gantt chart based on assumed hours.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In SAFe, teams use velocity to size PI objectives. During PI Planning, teams calculate how many story points they can commit across 4 delivery iterations (in a 5-iteration PI, one is the Innovation & Planning iteration). A team with 40-point average velocity can commit to roughly 4 × 38 = 152 points per PI as a planning ceiling. Our{" "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] font-semibold underline hover:no-underline">PI Planning guide</Link>{" "}
            covers the full calculation.
          </p>

          <PullQuote attribution="RTE, enterprise financial services program">
            When a manager tells me they want to increase the team&apos;s velocity by 20%, I know they think velocity is output. I have to explain that velocity is a measuring tape — you don&apos;t measure something to make the tape longer.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why Velocity Drops — And When to Worry</h2>
          <p className="text-lg text-gray-700 mb-4">
            Normal velocity variation is 10–20% sprint to sprint. Larger variations are worth understanding. Common causes of significant velocity drops:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {[
              { cause: "New team member onboarding", normal: true, note: "Expected 2–3 sprints" },
              { cause: "Team member PTO or illness", normal: true, note: "Account in capacity planning" },
              { cause: "PI Planning sprint (Innovation & Planning)", normal: true, note: "Expected in SAFe cadence" },
              { cause: "Tech debt spike", normal: false, note: "Address in retrospective" },
              { cause: "Unrefined stories entering sprint", normal: false, note: "Fix backlog refinement practice" },
              { cause: "Scope creep mid-sprint", normal: false, note: "Protect sprint commitment" },
            ].map((c) => (
              <div key={c.cause} className={`rounded-xl p-4 border ${c.normal ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <div className={`font-bold text-sm mb-1 ${c.normal ? "text-green-700" : "text-red-700"}`}>
                  {c.normal ? "✓ Normal" : "⚠ Investigate"}: {c.cause}
                </div>
                <div className="text-xs text-gray-600">{c.note}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should velocity go up every sprint?</p>
              <p className="text-lg text-gray-700">No. Velocity should be stable, not continuously increasing. Improving team practices sometimes raises velocity, but it's not the goal. A team that delivers 40 points of high-quality work consistently is more valuable than one that delivers 60 points with mounting technical debt.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can you compare velocity between two teams?</p>
              <p className="text-lg text-gray-700">No. Teams calibrate their story points independently. A team averaging 80 points per sprint is not twice as productive as a team averaging 40 — they've simply calibrated their estimates at a different scale.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's a good velocity for a new team?</p>
              <p className="text-lg text-gray-700">There's no universal "good" velocity. New teams typically have unstable velocity for 3–5 sprints while they calibrate estimates and learn to work together. Focus on delivery consistency rather than velocity numbers until the team stabilizes.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does SAFe use team velocity?</p>
              <p className="text-lg text-gray-700">In SAFe PI Planning, teams use their historical velocity to calculate how many story points they can commit to per iteration and per Program Increment. This prevents over-committing PI objectives and ensures the ART's Program Predictability Measure stays healthy.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What happens to velocity during PI Innovation & Planning sprints?</p>
              <p className="text-lg text-gray-700">Velocity typically drops in the IP iteration because teams are doing PI retrospectives, innovation work, and next-PI preparation rather than delivering stories. This is expected and should be accounted for in PI objective planning. Don't count IP sprint in velocity averages unless you're tracking it separately.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn Agile Metrics in SAFe Context</p>
            <p className="mb-5">Velocity, capacity planning, and PI Planning metrics covered in live SAFe SSM training.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/story-points-explained" className="text-[#01203d] underline hover:no-underline">Story points explained</Link>
            {" · "}
            <Link href="/blog/burndown-chart-explained" className="text-[#01203d] underline hover:no-underline">Burndown chart explained</Link>
            {" · "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] underline hover:no-underline">Advanced Scrum Master</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
