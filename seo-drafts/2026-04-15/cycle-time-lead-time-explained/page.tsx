import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cycle Time vs Lead Time: What They Measure and Why Both Matter | Agile36",
  description:
    "Cycle time vs lead time explained for agile teams. What each measures, how to calculate them, what good looks like, and how to use them to improve flow.",
  keywords: ["cycle time vs lead time", "cycle time agile", "lead time agile", "cycle time explained", "lead time explained", "agile flow metrics"],
  openGraph: {
    title: "Cycle Time vs Lead Time: What They Measure and Why Both Matter",
    description: "Cycle time and lead time explained with examples and how to use both to improve delivery flow.",
    url: "https://www.agile36.com/blog/cycle-time-lead-time-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/cycle-time-lead-time-explained" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span><strong>Cycle time</strong> measures how long active work takes — from when a team starts working on an item to when it&apos;s done. <strong>Lead time</strong> measures total time from customer request to delivery, including wait time.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The gap between lead time and cycle time is <strong>queue time</strong> — the time work sits waiting before anyone touches it. Long queues are where delivery speed is most often lost.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Cycle time is the metric most directly actionable by the team. Lead time is the metric that matters most to customers. Both are essential for a complete picture of delivery performance.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>In SAFe, feature cycle time (time from feature entering the Program Backlog to delivery) is an ART-level flow metric that the RTE and Product Management use to assess portfolio throughput.</span></li>
      </ul>
    </section>
  );
}

function TimelineVisual() {
  return (
    <section aria-label="Lead time vs cycle time visual" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-6">Lead Time vs Cycle Time: Where Each Starts and Ends</h3>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 overflow-x-auto">
        <div className="min-w-[480px]">
          <div className="flex items-center gap-0 mb-4">
            <div className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-2 rounded-l-full">Customer Request</div>
            <div className="flex-1 bg-blue-100 border-y-2 border-blue-300 h-8 flex items-center justify-center">
              <span className="text-xs text-blue-700 font-semibold">← Wait / Queue Time →</span>
            </div>
            <div className="bg-[#01203d] text-white text-xs font-bold px-3 py-2">Work Starts</div>
            <div className="flex-1 bg-[#01203d] bg-opacity-80 h-8 flex items-center justify-center">
              <span className="text-xs text-yellow-400 font-bold">← Cycle Time →</span>
            </div>
            <div className="bg-[#01203d] text-yellow-400 text-xs font-bold px-3 py-2 rounded-r-full">Done</div>
          </div>
          <div className="flex items-center gap-0">
            <div className="w-32 border-t-4 border-blue-500" />
            <div className="flex-1 border-t-4 border-b-0 border-transparent" />
            <div className="flex-[2] border-t-4 border-transparent" />
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span className="text-blue-700 font-bold">← Lead Time (total customer experience) →</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-4">Lead time = cycle time + wait/queue time. Reducing queue time reduces lead time without changing how fast the team works.</p>
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
          "Long lead times are almost always a queue problem, not a working speed problem. Before trying to make teams work faster, examine how long work sits in the backlog waiting to be started.",
          "Cycle time is the team's direct control lever. The biggest cycle time improvements come from smaller stories, clearer acceptance criteria, and better WIP limits — not from working longer hours.",
          "Cycle time percentile analysis is more useful than averages. If 85% of stories complete in 3 days or less, you can make reliable commitments. If the standard deviation is high, your process has unpredictable elements worth examining.",
          "Feature cycle time (in SAFe) is the measure of ART-level flow. Features that spend weeks in the Program Backlog before being picked up represent a queue problem at the ART level — a Product Management and capacity issue, not a team issue.",
          "Tracking both metrics together reveals the diagnosis: high cycle time + low lead time = the team is the bottleneck. Low cycle time + high lead time = the queue is the bottleneck. Each requires a different fix.",
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

export default function CycleTimeLeadTimeExplainedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Cycle Time vs Lead Time: What They Measure and Why Both Matter
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Cycle Time vs Lead Time</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Metrics</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Cycle Time vs Lead Time: What They Measure and Why Both Matter
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Cycle time and lead time are two of the most useful agile flow metrics — and two of the most confused. Teams often track one and not the other, or define them inconsistently. Understanding both is essential for diagnosing delivery problems and improving throughput. For Scrum Masters and RTEs, these metrics are covered as part of SAFe&apos;s{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">continuous delivery practices</Link>{" "}
            and flow management training.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Simple Definitions</h2>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Cycle time</strong> is how long it takes from when work starts to when it&apos;s done. For a story, that might be from when a developer picks it up to when it passes review and QA. For a feature, it might be from when the team starts work to when it&apos;s deployed.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Lead time</strong> is the total time from when a customer or stakeholder requests something to when it&apos;s delivered. Lead time includes everything: time in the backlog waiting to be prioritized, time waiting to be started, time in development, and time in review and deployment. Lead time = cycle time + queue time.
          </p>

          <TimelineVisual />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Measure Each</h2>
          <p className="text-lg text-gray-700 mb-4">
            Most agile tools (Jira, Azure DevOps, Linear) can calculate both automatically if your workflow states are configured correctly. The key is consistent column definitions:
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#01203d] text-white">
                  <th className="p-3 text-left">Metric</th>
                  <th className="p-3 text-left">Starts when...</th>
                  <th className="p-3 text-left">Ends when...</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Cycle Time (story)", start: "Story moved to 'In Progress'", end: "Story moved to 'Done' (meets DoD)" },
                  { metric: "Lead Time (story)", start: "Story created or added to backlog", end: "Story moved to 'Done'" },
                  { metric: "Cycle Time (feature)", start: "Feature started by ART team", end: "Feature deployed to production" },
                  { metric: "Lead Time (feature)", start: "Feature requested by stakeholder / added to Program Backlog", end: "Feature deployed to production" },
                ].map((r, i) => (
                  <tr key={r.metric} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 font-semibold text-[#01203d] border-b border-gray-100">{r.metric}</td>
                    <td className="p-3 text-gray-700 border-b border-gray-100">{r.start}</td>
                    <td className="p-3 text-gray-700 border-b border-gray-100">{r.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Good Looks Like</h2>
          <p className="text-lg text-gray-700 mb-4">
            There are no universal benchmarks — good cycle time and lead time depend entirely on the type of work and the team&apos;s context. What matters is the trend and the predictability:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[
              { label: "Improving trend", sign: "✓", desc: "Cycle time and lead time decreasing over 3+ months signals improving flow, even if absolute numbers are still high.", color: "bg-green-50 border-green-200" },
              { label: "Low variance", sign: "✓", desc: "Consistent cycle times (low standard deviation) mean the team can make reliable delivery commitments. High variance means the process has unpredictable elements.", color: "bg-green-50 border-green-200" },
              { label: "Lead time >> cycle time", sign: "⚠", desc: "Work is sitting in queues much longer than it takes to do. This is a backlog management or capacity problem, not a team speed problem.", color: "bg-yellow-50 border-yellow-200" },
              { label: "Cycle time spikes", sign: "⚠", desc: "Specific stories taking much longer than typical signals unclear requirements, unexpected complexity, or blocked dependencies.", color: "bg-yellow-50 border-yellow-200" },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl p-4 border ${item.color}`}>
                <p className="font-bold text-sm mb-1">{item.sign} {item.label}</p>
                <p className="text-xs text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, software product company">
            We spent a year trying to reduce cycle time by making developers faster. Then we measured lead time and realized that most of our time was in the backlog — stories sitting for 3 weeks before anyone touched them. Reducing cycle time by 20% would have meant nothing. Addressing the queue reduced lead time by 60%.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which metric should I track — cycle time or lead time?</p>
              <p className="text-lg text-gray-700">Both, if possible. Cycle time is the team&apos;s internal performance metric — it tells them where to improve their process. Lead time is the customer-facing metric — it tells them how long customers wait. Teams that only track cycle time miss queue problems. Teams that only track lead time can&apos;t diagnose whether the bottleneck is in their process or in the backlog.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is there an agile tool that calculates these automatically?</p>
              <p className="text-lg text-gray-700">Yes. Jira has a built-in Control Chart in Scrum and Kanban boards that shows cycle time distribution. Azure DevOps has Cycle Time and Lead Time charts in their Analytics section. Linear, Shortcut, and most modern agile tools offer similar capabilities. The key is consistent workflow state definitions — garbage in, garbage out.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does cycle time relate to story points?</p>
              <p className="text-lg text-gray-700">Story points estimate relative effort; cycle time measures actual elapsed time. There&apos;s often correlation (higher story point stories have longer cycle times) but it&apos;s imperfect. Teams that track both together can identify stories where estimation significantly missed reality — useful information for improving estimation accuracy.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn Flow Metrics in SAFe Context</p>
            <p className="mb-5">Cycle time, lead time, throughput, and WIP management taught in SAFe SSM and RTE certification training.</p>
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
            <Link href="/blog/kanban-vs-scrum" className="text-[#01203d] underline hover:no-underline">Kanban vs Scrum</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
