import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agile Leadership Guide: How Leaders Enable Agile Teams | Agile36",
  description:
    "Agile leadership explained: what leaders do differently in agile organizations, the mindset shifts required, and how to develop Lean-Agile leadership behaviors that enable team performance.",
  keywords: ["agile leadership", "agile leader behaviors", "lean agile leadership", "how to lead agile teams", "agile management style", "agile leadership skills"],
  openGraph: {
    title: "Agile Leadership Guide: How Leaders Enable Agile Teams",
    description: "What agile leadership looks like in practice — mindset, behaviors, and the shifts leaders need to make.",
    url: "https://www.agile36.com/blog/agile-leadership-guide",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/agile-leadership-guide" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Agile leadership is not about <strong>managing the work</strong> — it&apos;s about <strong>managing the system</strong> that produces the work. Leaders who micromanage stories while calling themselves agile are practicing agile theater, not agile leadership.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>SAFe&apos;s Lean-Agile Leadership competency identifies <strong>three dimensions</strong>: modeling Lean-Agile mindset, leading by example, and developing people. Leaders must actively demonstrate all three — not just mandate agile practices below them.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The hardest leadership shift: from <strong>predictive authority</strong> (I decide based on my experience) to <strong>empirical authority</strong> (the team shows me with working software what&apos;s possible). Leaders who can&apos;t make this shift become blockers.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The clearest signal of genuine agile leadership: how leaders <strong>behave under pressure</strong>. Agile principles are easy when things are going well. The test is whether leaders revert to command-and-control when timelines are at risk.</span></li>
      </ul>
    </section>
  );
}

function LeadershipShifts() {
  const shifts = [
    { from: "\"Why isn't this done?\"", to: "\"What does the team need to finish this?\"" },
    { from: "Assign tasks to individuals", to: "Assign outcomes to teams" },
    { from: "Measure activity (hours, velocity)", to: "Measure outcomes (value delivered, customer satisfaction)" },
    { from: "Make all significant decisions", to: "Create the conditions for team decision-making" },
    { from: "Hold people accountable for failures", to: "Hold systems accountable; people responsible for learning" },
    { from: "Plan once, execute to the plan", to: "Plan, execute, inspect, adapt — continuously" },
  ];
  return (
    <section aria-label="Agile leadership shifts" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Agile Leadership: From → To</h3>
      <div className="space-y-3">
        {shifts.map((s, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 items-center bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-red-700 bg-red-50 rounded-lg p-2 border border-red-200">{s.from}</p>
            <span className="text-gray-400 font-bold text-center hidden md:block">→</span>
            <p className="text-sm text-green-700 bg-green-50 rounded-lg p-2 border border-green-200">{s.to}</p>
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
          "Agile leaders don't opt out of leadership — they lead differently. The shift from directive to enabling leadership is a change in method, not a reduction in accountability. Leaders are still accountable for outcomes; they change how they produce them.",
          "Attending PI Planning as a Business Owner is one of the most important things an agile leader can do. Showing up signals that the team's work matters, that leadership is listening, and that the organization is willing to invest 2 days in alignment rather than 2 months of misalignment.",
          "The Lean-Agile Leadership mindset requires confronting deeply held assumptions about control. Many leaders believe that if they don't stay close to the details, things will go wrong. Agile leadership requires trusting systems and people — and building the systems worth trusting.",
          "Leaders who say they support agility but maintain annual budgeting, stage-gate reviews, and activity-based performance management are not agile leaders. Organizational structures tell the true story of leadership values, not stated commitments to agile.",
          "Leading SAFe certification (SA) is the right credential for leaders making this transition. It develops both the conceptual framework and the practical behaviors that agile leadership requires at scale.",
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

export default function AgileLeadershipGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Agile Leadership Guide: How Leaders Enable Agile Teams
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Agile Leadership Guide</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Leadership</span>
          <span className="text-sm text-[#718aa5]">Leadership Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Agile Leadership Guide: How Leaders Enable Agile Teams
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Agile transformations fail most often not because teams can&apos;t adopt Scrum, but because leaders don&apos;t change their own behaviors. Teams that self-organize report to managers who micromanage. Agile values transparency while leadership culture punishes it. The{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe certification</Link>{" "}
            exists specifically to address this — developing leaders who understand both what agile requires of them and how to build the organizational conditions that make it work.
          </p>

          <ExecutiveSummary />

          <LeadershipShifts />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">SAFe&apos;s Lean-Agile Leadership Competency</h2>
          <p className="text-lg text-gray-700 mb-4">
            SAFe identifies Lean-Agile Leadership as one of its seven core competencies for Business Agility. It describes three dimensions: leaders who embody a Lean-Agile mindset (understanding why agile exists and how Lean thinking applies to their domain), leaders who lead by example (demonstrating agile behaviors visibly), and leaders who develop people (coaching, developing capability, and creating conditions for growth).
          </p>
          <p className="text-lg text-gray-700 mb-4">
            These aren&apos;t separate programs — they&apos;re integrated into how leaders approach every decision. A leader who understands Lean thinking but doesn&apos;t lead by example creates the organizational cognitive dissonance that teams describe when they say &quot;management says they want agile but acts differently.&quot;
          </p>

          <PullQuote attribution="VP of Product Engineering, enterprise healthcare">
            The hardest thing I did as a leader was stop asking for weekly status reports after we went SAFe. I was genuinely anxious. But when I replaced status reports with attending sprint reviews, I actually had better information — and the teams spent time delivering instead of updating PowerPoints. The anxiety was real. The outcome was better. That&apos;s the leadership transition in one experience.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What does an agile leader do differently day to day?</p>
              <p className="text-lg text-gray-700">Agile leaders attend sprint reviews to listen rather than direct. They ask questions in planning conversations rather than assigning solutions. They remove organizational impediments that teams escalate rather than delegating the escalation back down. They track outcomes (features shipped, customer satisfaction, deployment frequency) rather than activity (hours worked, tickets closed).</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can traditional managers become agile leaders?</p>
              <p className="text-lg text-gray-700">Yes — and most successful agile transformations require it. The transition isn't a personality change; it's a behavioral one. Leaders who have been directive their entire careers can develop enabling behaviors with coaching and deliberate practice. What it requires: genuine belief that team autonomy produces better outcomes, willingness to tolerate short-term uncertainty in exchange for long-term improvement.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the biggest mistake agile leaders make?</p>
              <p className="text-lg text-gray-700">Mandating agile behaviors while maintaining traditional governance structures. If your teams run sprints but you review quarterly budget reports, measure individual developer productivity, and require sign-offs for every significant decision, you haven't created an agile organization — you've created an agile veneer over a traditional organization. The structural changes are where agile leadership actually happens.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is Leading SAFe the right certification for leaders?</p>
              <p className="text-lg text-gray-700">Yes — it's specifically designed for executives, managers, and program leaders entering SAFe environments. It develops the framework vocabulary, leadership behaviors, and organizational change skills that agile leadership requires. Most enterprise SAFe implementations run their leadership team through Leading SAFe before or alongside the first ART launches.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does it take to develop agile leadership behaviors?</p>
              <p className="text-lg text-gray-700">The behaviors can be developed in months with deliberate practice and coaching. The mindset shift takes longer — it requires confronting assumptions about control, authority, and how work gets done that have been reinforced over entire careers. Most practitioners who report genuine mindset change describe a 12-24 month process of sustained practice and reflection.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Develop Lean-Agile Leadership</p>
            <p className="mb-5">Leading SAFe certification develops the leadership behaviors and organizational thinking that SAFe transformations require from the top.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/servant-leadership-in-agile" className="text-[#01203d] underline hover:no-underline">Servant leadership in agile</Link>
            {" · "}
            <Link href="/blog/agile-transformation-mistakes" className="text-[#01203d] underline hover:no-underline">Agile transformation mistakes</Link>
            {" · "}
            <Link href="/blog/psychological-safety-agile-teams" className="text-[#01203d] underline hover:no-underline">Psychological safety in agile teams</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
