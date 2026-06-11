import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Value Stream Mapping Explained: How to Map and Improve Flow | Agile36",
  description:
    "Value stream mapping explained: what it is, how to create a current-state map, how to identify waste, and how VSM connects to SAFe's value stream organization.",
  keywords: ["value stream mapping explained", "value stream mapping agile", "VSM lean agile", "how to do value stream mapping", "value stream map SAFe", "value stream mapping guide"],
  openGraph: {
    title: "Value Stream Mapping Explained: How to Map and Improve Flow",
    description: "What value stream mapping is, how to create one, and how it connects to SAFe organization.",
    url: "https://www.agile36.com/blog/value-stream-mapping-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/value-stream-mapping-explained" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Value stream mapping (VSM) is a <strong>Lean technique</strong> for visualizing the steps in a delivery process, identifying where value is added and where time is wasted, and designing improvements. It originated in manufacturing and applies directly to software delivery.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>VSM creates two maps: the <strong>current-state map</strong> (how work flows today) and the <strong>future-state map</strong> (how it should flow after improvements). The gap between them defines the improvement roadmap.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The most common finding in software delivery VSMs: <strong>waiting time dominates</strong>. Work in a typical feature delivery spends more time waiting for review, approval, or handoff than being actively developed.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>In SAFe, value stream mapping is used to <strong>identify development value streams</strong> and design ART boundaries. The mapping exercise reveals where organizational structure creates flow problems that team-level agile practices can&apos;t solve.</span></li>
      </ul>
    </section>
  );
}

function VSMSteps() {
  const steps = [
    { num: "01", step: "Identify the value stream", detail: "Define the beginning (customer trigger) and end (customer outcome) of the process you're mapping" },
    { num: "02", step: "Map current-state steps", detail: "Walk the process and document every step — including waiting, approval, and handoff steps that aren't delivering value" },
    { num: "03", step: "Measure process times", detail: "Record lead time (total elapsed time) and process time (active work time) for each step" },
    { num: "04", step: "Calculate flow efficiency", detail: "Process time ÷ lead time = flow efficiency. Below 40% is common; world-class is 80%+" },
    { num: "05", step: "Identify waste", detail: "Find delays, redundant approvals, handoffs, rework cycles, and waiting — the sources of flow inefficiency" },
    { num: "06", step: "Design future-state map", detail: "Redesign the process to eliminate waste, reduce handoffs, and improve flow toward the future state" },
  ];
  return (
    <section aria-label="VSM steps" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">How to Do Value Stream Mapping</h3>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.num} className="flex gap-4 bg-gray-50 rounded-xl p-4 items-start">
            <span className="text-yellow-500 font-bold text-lg min-w-[32px]">{s.num}</span>
            <div>
              <p className="font-bold text-[#01203d] mb-1">{s.step}</p>
              <p className="text-sm text-gray-600">{s.detail}</p>
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
          "Flow efficiency is the key metric from a VSM exercise. Most software delivery processes are 15–30% flow efficient — meaning work spends 70–85% of its total time waiting rather than being worked on. Improving flow efficiency is the primary goal.",
          "VSM makes invisible work visible. Waiting for code review, waiting for QA environment, waiting for product approval — these don't show up in sprint velocity or story point metrics. VSM surfaces them as the delivery bottlenecks they are.",
          "The future-state map isn't a wish list — it's a design constraint. It should represent a realistic improvement target for a specific time horizon, not an ideal state. Future states that require too many simultaneous organizational changes fail for the same reasons transformations fail.",
          "In SAFe organizations, value stream mapping is typically the first step in designing ART boundaries. ARTs organized around technology layers (UI, backend, data) instead of end-to-end value streams create the handoffs that VSM exists to eliminate.",
          "VSM workshops require the people who do the work, not just the managers who describe it. The current-state map created by practitioners is almost always more complex, slower, and more wasteful than the map managers believe exists.",
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

export default function ValueStreamMappingExplainedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Value Stream Mapping Explained: How to Map and Improve Flow
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Value Stream Mapping Explained</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Lean Practices</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Value Stream Mapping Explained: How to Map and Improve Flow
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Value stream mapping is the most practical Lean tool for diagnosing why software delivery is slower than it should be. When teams are running clean sprints but customers still wait months for features, the problem isn&apos;t in the sprint — it&apos;s in the system surrounding the sprint. VSM makes that system visible. The technique is foundational to{" "}
            <Link href="/courses/lean-portfolio-management" className="text-[#01203d] font-semibold underline hover:no-underline">Lean Portfolio Management</Link>{" "}
            and the organizational design work that precedes SAFe ART launches.
          </p>

          <ExecutiveSummary />

          <VSMSteps />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Eight Types of Waste in Software Delivery</h2>
          <p className="text-lg text-gray-700 mb-4">
            Mary and Tom Poppendieck&apos;s adaptation of Lean to software identifies eight forms of waste commonly found in software delivery value streams. VSM helps teams identify and quantify each:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
            {["Partially done work", "Extra features", "Relearning", "Handoffs", "Task switching", "Delays", "Defects", "Management overhead"].map((w) => (
              <div key={w} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
                <p className="text-sm font-semibold text-[#01203d]">{w}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, enterprise logistics">
            We mapped our feature delivery value stream and found that a feature took an average of 47 days from backlog to production. Only 4 of those days were active development — the rest was waiting: waiting for review, waiting for environments, waiting for approvals. Every sprint was running fine. The problem was the space between sprints and between teams. VSM made the invisible visible.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does a value stream mapping workshop take?</p>
              <p className="text-lg text-gray-700">A focused VSM workshop for a single development value stream typically takes 2-3 days: one day for current-state mapping, one day for analysis and waste identification, and half to one day for future-state design. Larger or more complex value streams take longer. The preparation (gathering data, identifying participants) often takes more time than the workshop itself.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What tools do you use for value stream mapping?</p>
              <p className="text-lg text-gray-700">Large sticky notes and whiteboards work well for in-person workshops — the physical nature encourages participation. For virtual workshops, Miro and Mural have VSM templates. The output should be a document that the team can revisit and update as improvements are made — digital tools make ongoing iteration easier than physical maps.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does VSM relate to SAFe?</p>
              <p className="text-lg text-gray-700">SAFe uses value stream identification — which builds on VSM concepts — to design ART boundaries. Before launching an ART, organizations should map their development value streams to understand where teams and work naturally group around end-to-end delivery. VSM is the analytical foundation for this organizational design work.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is flow efficiency and why does it matter?</p>
              <p className="text-lg text-gray-700">Flow efficiency = process time (active work) ÷ lead time (total elapsed time). A feature that takes 5 days to build but 30 days to move from idea to production has 17% flow efficiency. Higher flow efficiency means features reach customers faster with less organizational friction. SAFe's Flow Accelerators are specifically designed to improve this ratio.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is VSM the same as value stream identification in SAFe?</p>
              <p className="text-lg text-gray-700">Related but different. VSM is a Lean technique for mapping and improving the flow of work through a defined process. Value stream identification in SAFe is the organizational design exercise of deciding how to structure ARTs around development value streams. VSM informs value stream identification by revealing where flow bottlenecks exist and how teams and work naturally cluster.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn Lean Portfolio Management</p>
            <p className="mb-5">LPM certification covers value stream identification, flow metrics, and Lean governance at portfolio scale.</p>
            <Link href="/courses/lean-portfolio-management" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View LPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-value-streams-explained" className="text-[#01203d] underline hover:no-underline">SAFe value streams explained</Link>
            {" · "}
            <Link href="/blog/cycle-time-lead-time-explained" className="text-[#01203d] underline hover:no-underline">Cycle time vs lead time</Link>
            {" · "}
            <Link href="/blog/agile-metrics-guide" className="text-[#01203d] underline hover:no-underline">Agile metrics guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
