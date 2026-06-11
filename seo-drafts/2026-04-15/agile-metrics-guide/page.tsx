import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agile Metrics Guide: Which Metrics Matter and How to Use Them | Agile36",
  description:
    "The essential agile metrics guide: velocity, cycle time, lead time, throughput, predictability, and team health. Which metrics to track and which to avoid.",
  keywords: ["agile metrics guide", "agile team metrics", "what metrics to track in agile", "agile delivery metrics", "scrum metrics", "SAFe metrics"],
  openGraph: {
    title: "Agile Metrics Guide: Which Metrics Matter and How to Use Them",
    description: "The agile metrics that drive improvement and how to avoid the ones that create gaming.",
    url: "https://www.agile36.com/blog/agile-metrics-guide",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/agile-metrics-guide" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The most useful agile metrics are <strong>flow metrics</strong> (cycle time, throughput, WIP) and <strong>outcome metrics</strong> (value delivered, predictability). Activity metrics like velocity and lines of code are proxies, not measures of value.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Any metric that can be <strong>gamed</strong> will be gamed under pressure. Velocity targets, story point quotas, and bugs-closed counts all produce behavior change — rarely in the direction you want.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>In SAFe, ART-level metrics include: <strong>PI predictability</strong> (achieved vs. committed objectives), <strong>feature cycle time</strong>, and <strong>business value delivered</strong> — not team velocity comparisons.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The DORA metrics — deployment frequency, lead time for changes, change failure rate, and mean time to restore — are the most meaningful engineering metrics for DevOps and flow measurement.</span></li>
      </ul>
    </section>
  );
}

function MetricCards() {
  const metrics = [
    { name: "Velocity", use: "Planning", good: "Forecasting sprint capacity for the same team", bad: "Comparing teams, setting velocity targets, or converting to hours" },
    { name: "Cycle Time", use: "Flow", good: "Understanding how long stories take from start to done; identifying systemic delays", bad: "Comparing individuals; using as a productivity metric" },
    { name: "Lead Time", use: "Flow", good: "Measuring total time from customer request to delivery; process efficiency baseline", bad: "Using without segmenting by type of work" },
    { name: "Throughput", use: "Flow", good: "Counting items completed per sprint/week; more stable than velocity for planning", bad: "Maximizing throughput at expense of quality or WIP discipline" },
    { name: "PI Predictability", use: "ART-level", good: "Measuring ART planning maturity; target 80%+; tracks over multiple PIs", bad: "Using to rank teams or penalize ARTs; setting as a target that creates sandbagging" },
    { name: "Defect Escape Rate", use: "Quality", good: "Measuring quality getting to production; trend more useful than absolute number", bad: "Using to track individual developers; bugs as performance metric" },
  ];
  return (
    <section aria-label="Agile metrics overview" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Key Agile Metrics: Good and Bad Uses</h3>
      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m.name} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-[#01203d] text-white p-3 flex items-center justify-between">
              <span className="font-bold">{m.name}</span>
              <span className="text-xs bg-[#134263] px-2 py-0.5 rounded-full">{m.use} metric</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs font-bold text-green-800 mb-1">✓ Good use</p>
                <p className="text-sm text-green-700">{m.good}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs font-bold text-red-800 mb-1">✗ Bad use</p>
                <p className="text-sm text-red-700">{m.bad}</p>
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
          "Measure outcomes, not outputs. Delivered features and velocity are outputs. Customer value realized and problems solved are outcomes. Build metrics that point toward outcomes.",
          "Goodhart's Law applies relentlessly in agile: 'When a measure becomes a target, it ceases to be a good measure.' Velocity targets, bug count goals, and deployment frequency mandates all eventually get gamed.",
          "Team-self-metrics and organizational-reporting metrics should be different. Teams track cycle time and WIP to improve their process. Organizations track PI predictability and value delivery for portfolio decisions.",
          "The DORA metrics (deployment frequency, lead time for changes, change failure rate, MTTR) are the most research-validated agile engineering metrics. High-performing engineering teams score well on all four simultaneously.",
          "Metrics conversations are coaching opportunities. When a metric looks bad, the question isn't 'who do we blame?' — it's 'what does this tell us about the system?'",
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

export default function AgileMetricsGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Agile Metrics Guide: Which Metrics Matter and How to Use Them
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Agile Metrics Guide</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Metrics</span>
          <span className="text-sm text-[#718aa5]">Reference Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Agile Metrics Guide: Which Metrics Matter and How to Use Them
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Most agile teams measure too many things and improve from none of them. Good agile metrics drive behavior change and continuous improvement; bad ones create gaming, anxiety, and misleading dashboards that executives use to make poor decisions. Whether you&apos;re a{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Scrum Master</Link>{" "}
            building a team improvement system or an RTE designing ART-level reporting, this guide covers the metrics that actually work — and how to avoid the ones that don&apos;t.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Metrics Hierarchy: Outcome → Flow → Activity</h2>
          <p className="text-lg text-gray-700 mb-4">
            Agile metrics fall into three categories, and the higher you go in this hierarchy, the more genuinely useful the metric is:
          </p>
          <div className="space-y-3 my-6">
            {[
              { level: "Outcome metrics", examples: "Customer satisfaction, NPS, revenue impact, defect escape rate, time to value", desc: "These tell you whether the work actually mattered. Hardest to collect but most important." },
              { level: "Flow metrics", examples: "Cycle time, lead time, throughput, WIP, deployment frequency", desc: "These tell you how efficiently work flows through the system. Highly actionable — they point directly to bottlenecks." },
              { level: "Activity metrics", examples: "Velocity, story points completed, bugs closed, commits per day", desc: "These tell you how busy the team was. Often misleading as proxies for value or quality." },
            ].map((l) => (
              <div key={l.level} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-[#01203d] text-sm">{l.level}</p>
                <p className="text-xs text-gray-500 mt-0.5 mb-2">Examples: {l.examples}</p>
                <p className="text-gray-700 text-sm">{l.desc}</p>
              </div>
            ))}
          </div>

          <MetricCards />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The DORA Metrics</h2>
          <p className="text-lg text-gray-700 mb-4">
            The DevOps Research and Assessment (DORA) metrics are the most research-validated engineering delivery metrics available. They measure four dimensions of software delivery performance:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[
              { metric: "Deployment Frequency", desc: "How often code is successfully deployed to production. Elite teams deploy multiple times per day. Measures delivery capability and batch size." },
              { metric: "Lead Time for Changes", desc: "Time from code commit to running in production. Measures process efficiency and feedback loop speed." },
              { metric: "Change Failure Rate", desc: "Percentage of deployments causing production failures requiring remediation. Measures deployment quality and testing effectiveness." },
              { metric: "Mean Time to Restore (MTTR)", desc: "How quickly production failures are recovered from. Measures system resilience and team incident response capability." },
            ].map((d) => (
              <div key={d.metric} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-[#01203d] text-sm mb-2">{d.metric}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, enterprise financial services">
            I spent two years trying to improve team velocity. Then I switched to tracking cycle time — how long it actually took a story to go from &apos;started&apos; to &apos;done&apos;. Within six weeks I identified three bottlenecks nobody had seen before: code review wait times, environment provisioning, and a QA queue. Fixing those improved throughput 35% without touching velocity at all.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should teams share their velocity with other teams?</p>
              <p className="text-lg text-gray-700">No. Velocity is calibrated to each team's story point scale, team composition, and work type. Comparing velocities across teams produces no actionable information and typically creates morale problems. ART-level metrics like PI predictability and feature throughput are the appropriate cross-team comparison tools.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is a good sprint velocity?</p>
              <p className="text-lg text-gray-700">There is no universally good velocity number — it depends on team size, story point calibration, and work type. What matters is velocity stability (low variance between sprints) and predictability (actual matches forecast). A consistent 30-point team is more valuable to plan against than a team that swings between 20 and 50.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What metrics should I show leadership?</p>
              <p className="text-lg text-gray-700">Show outcome metrics (value delivered, time to market, quality escapes) and flow metrics (cycle time trends, PI predictability). Avoid showing velocity, story points, or bugs-in-progress to leadership — they invite misinterpretation and create pressure to optimize the metric rather than the outcome.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Build Your Agile Metrics Capability</p>
            <p className="mb-5">Metrics, measurement, and continuous improvement practices taught in SAFe SSM and RTE training.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                SSM training
              </Link>
              <Link href="/courses/release-train-engineer" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                RTE certification
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/velocity-in-agile" className="text-[#01203d] underline hover:no-underline">Velocity in agile</Link>
            {" · "}
            <Link href="/blog/burndown-chart-explained" className="text-[#01203d] underline hover:no-underline">Burndown chart explained</Link>
            {" · "}
            <Link href="/blog/cycle-time-lead-time-explained" className="text-[#01203d] underline hover:no-underline">Cycle time vs lead time</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
