import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Inspect and Adapt: How to Run an Effective I&A Workshop | Agile36",
  description:
    "How to run a SAFe Inspect and Adapt workshop that produces real improvements. The three phases, facilitation tips, and how to make I&A action items stick across the ART.",
  keywords: ["SAFe inspect and adapt", "inspect and adapt workshop", "I&A SAFe", "agile inspect and adapt", "PI retrospective SAFe", "safe inspect adapt workshop"],
  openGraph: {
    title: "SAFe Inspect and Adapt: How to Run an Effective I&A Workshop",
    description: "The three I&A phases, facilitation moves that work, and how to make improvements stick across the ART.",
    url: "https://www.agile36.com/blog/safe-inspect-and-adapt",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-inspect-and-adapt" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Inspect &amp; Adapt (I&amp;A) workshop has three phases: <strong>PI System Demo, quantitative measurement, and problem-solving workshop</strong>. Each phase is distinct — skipping any one weakens the whole event.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The I&amp;A is the <strong>ART-level retrospective</strong> — it surfaces systemic issues that no single team can fix alone. Team-level retrospectives continue independently throughout the PI; the I&amp;A addresses cross-team and organizational issues.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The problem-solving workshop uses a structured <strong>5-step root cause analysis</strong> (often fishbone diagram or 5 Whys), not an open brainstorm. Structure matters because unstructured brainstorms at scale produce surface-level ideas.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>I&amp;A improvements that aren&apos;t added to the <strong>Program Backlog as features or stories</strong> almost never happen. Visibility and ownership are what make I&amp;A improvements stick.</span></li>
      </ul>
    </section>
  );
}

function PhaseFlow() {
  const phases = [
    { num: "1", name: "PI System Demo", time: "1–2 hours", desc: "The whole ART demonstrates integrated, working software from the PI. Business Owners, stakeholders, and leadership attend. Teams show what was built — not just what was planned. This is the evidence base for the quantitative assessment that follows." },
    { num: "2", name: "Quantitative Measurement", time: "30–45 min", desc: "Review PI metrics: planned vs. achieved PI Objectives, predictability score, team velocities, and any other ART-level KPIs. The goal is an honest, data-grounded view of ART performance — not a defense of it. Predictability of 80%+ is generally the target." },
    { num: "3", name: "Problem-Solving Workshop", time: "2–3 hours", desc: "The core of the I&A. The team identifies 1–3 priority problems from the PI, applies root cause analysis (fishbone, 5 Whys), generates improvement solutions, and creates improvement backlog items for the next PI. RTE facilitates; whole ART participates." },
  ];
  return (
    <section aria-label="I&A three phases" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">The Three I&amp;A Phases</h3>
      <div className="space-y-4">
        {phases.map((p) => (
          <div key={p.num} className="flex gap-4 bg-gray-50 rounded-xl p-5 items-start">
            <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg">{p.num}</div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <strong className="text-gray-900">{p.name}</strong>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{p.time}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{p.desc}</p>
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
          "The I&A is not a celebration event — it's a working session. Teams that treat it as a retrospective party produce weak improvement backlogs. The problem-solving workshop phase requires real work.",
          "Predictability is the key I&A metric: (achieved PI points / committed PI points) × 100. An ART with 80%+ predictability over multiple PIs has a reliable planning engine. Below 60% is a systemic problem worth addressing.",
          "Root cause analysis, not symptom treatment, is the goal of the problem-solving workshop. If your I&A improvement list is 'write better stories' and 'communicate more' every PI, you're not going deep enough.",
          "I&A improvements must have owners and must appear in the Program Backlog. Without visibility and ownership, improvement items disappear in the gap between PIs.",
          "The PI System Demo is distinct from iteration System Demos. The PI demo shows the integrated capability built over the entire PI — a holistic business demonstration, not a sprint review rollup.",
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

export default function SAFeInspectAndAdaptPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Inspect and Adapt: How to Run an Effective I&A Workshop
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Inspect and Adapt</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Inspect and Adapt: How to Run an Effective I&amp;A Workshop
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Inspect &amp; Adapt workshop is where SAFe ARTs improve — or fail to. Done well, it surfaces the systemic issues that no sprint retrospective can address and produces actionable improvements that compound across PIs. Done poorly, it becomes a ritual box-check that produces improvement lists nobody tracks. For{" "}
            <Link href="/courses/release-train-engineer" className="text-[#01203d] font-semibold underline hover:no-underline">RTEs</Link>{" "}
            running their first I&amp;A or trying to improve established ones, this guide covers the structural and facilitation elements that make the difference.
          </p>

          <ExecutiveSummary />

          <PhaseFlow />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Problem-Solving Workshop in Detail</h2>
          <p className="text-lg text-gray-700 mb-4">
            The problem-solving workshop is the I&amp;A phase that most ARTs run poorly — because it requires structured facilitation, not just a big room and sticky notes. The five-step process SAFe recommends:
          </p>
          <div className="space-y-3 my-6">
            {[
              { step: "1", action: "Agree on the biggest problem", desc: "Dot-vote or affinity mapping to identify the 1–3 most significant issues from the PI. Avoid the temptation to work on 10 things — the problem-solving workshop produces one robust solution better than 10 shallow ones." },
              { step: "2", action: "Apply root cause analysis", desc: "Use a fishbone (Ishikawa) diagram or 5 Whys to get below the surface symptom. 'Our deployments took too long' is a symptom. 'We have no automated pipeline and every deployment requires manual steps from 3 teams' is a root cause." },
              { step: "3", action: "Identify the biggest root cause", desc: "Dot-vote on the highest-leverage root cause — the one that, if fixed, would reduce the most downstream problems. This becomes the focus of solution generation." },
              { step: "4", action: "Generate solutions", desc: "Brainstorm solutions for the root cause — not the symptom. Time-box to 20 minutes. Quantity first, quality filter second." },
              { step: "5", action: "Create improvement backlog items", desc: "Convert the best solutions into specific, owned backlog items. Each item should be specific enough to be planned, small enough to fit within a PI, and owned by a named person or team." },
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

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Good Predictability Looks Like</h2>
          <p className="text-lg text-gray-700 mb-4">
            Predictability is calculated as: (sum of achieved PI Objective points) / (sum of committed PI Objective points) × 100. An ART with 85% predictability over three consecutive PIs has a mature planning engine — stakeholders can reliably forecast delivery. An ART oscillating between 50% and 120% has a planning accuracy problem that the I&amp;A should address directly.
          </p>
          <div className="grid grid-cols-3 gap-4 my-6 text-center">
            {[
              { range: "80–100%", label: "Target Zone", color: "bg-green-50 border-green-200 text-green-800" },
              { range: "60–79%", label: "Improving", color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
              { range: "<60%", label: "Systemic Issue", color: "bg-red-50 border-red-200 text-red-800" },
            ].map((r) => (
              <div key={r.range} className={`border rounded-xl p-4 ${r.color}`}>
                <p className="text-xl font-bold mb-1">{r.range}</p>
                <p className="text-xs font-semibold">{r.label}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="RTE, global financial institution">
            Our I&amp;A workshops were good gatherings but produced nothing that changed. The turning point was when we started tracking improvement items in the Program Backlog just like features. Once they were visible in the same tool as everything else, they got prioritized, planned, and delivered. Out of sight is out of mind — even for improvements you genuinely care about.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should the I&A workshop take?</p>
              <p className="text-lg text-gray-700">A half-day (4 hours) is the minimum for a productive I&A. A full day allows more depth in the problem-solving workshop, especially for large ARTs or complex PIs. The PI System Demo can be run separately the day before if stakeholder schedules require it, but the measurement and problem-solving phases should be together.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who should attend the I&A workshop?</p>
              <p className="text-lg text-gray-700">The entire ART: all team members, Scrum Masters, Product Owners, the RTE, Product Management, System Architect, and Business Owners. The I&A is whole-ART — it's not a leadership meeting or a representative sample. The power comes from everyone seeing the same data and contributing to the same improvement conversation.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What if the ART's PI System Demo isn't integrated?</p>
              <p className="text-lg text-gray-700">A PI System Demo where teams demo in silos is not a PI System Demo — it's a collection of sprint reviews. The ART's ability to demonstrate integrated, working software is itself a maturity indicator. If integration is still a problem at the PI level, it's a systemic issue that should go into the problem-solving workshop as a priority item.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Prepare Your RTE for Excellence</p>
            <p className="mb-5">I&A facilitation, PI predictability measurement, and ART-level coaching covered in the SAFe RTE certification course.</p>
            <Link href="/courses/release-train-engineer" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View RTE course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-pi-planning-tips" className="text-[#01203d] underline hover:no-underline">PI Planning tips</Link>
            {" · "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">ART explained</Link>
            {" · "}
            <Link href="/blog/sprint-retrospective-guide" className="text-[#01203d] underline hover:no-underline">Sprint retrospective guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
