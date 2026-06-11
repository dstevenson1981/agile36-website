import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Lean-Agile Principles Explained: All 10 and How They Apply | Agile36",
  description:
    "The 10 SAFe Lean-Agile Principles explained with practical examples. How each principle shapes team behavior, ART design, and portfolio decisions.",
  keywords: ["SAFe principles explained", "lean agile principles SAFe", "SAFe 10 principles", "SAFe lean agile mindset", "safe framework principles", "safe guiding principles"],
  openGraph: {
    title: "SAFe Lean-Agile Principles Explained: All 10 and How They Apply",
    description: "All 10 SAFe Lean-Agile Principles with practical examples for teams and program leaders.",
    url: "https://www.agile36.com/blog/safe-principles-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-principles-explained" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SAFe&apos;s 10 Lean-Agile Principles draw from <strong>Lean manufacturing, agile software development, systems thinking, and product development flow</strong> — primarily from Don Reinertsen&apos;s work on flow.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The principles are the <strong>"why" behind SAFe practices</strong>. Understanding them helps practitioners adapt SAFe to their context rather than following ceremonies mechanically.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Principles like <strong>"Apply cadence, synchronize with cross-domain planning"</strong> and <strong>"Visualize and limit WIP"</strong> are especially critical for RTEs and Product Managers designing ART-level systems.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>SAFe Leading exam tests understanding of these principles — expect 5–8 questions connecting a scenario to the underlying principle it reflects or violates.</span></li>
      </ul>
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
    "The principles aren't a checklist — they're a lens. When a SAFe practice seems arbitrary, understanding the principle it embodies explains why it works.",
    "Economic thinking (Principle 1) is the foundation. Every other principle is in service of optimizing the economic decisions that determine whether a product succeeds.",
    "WIP limits and queue management (Principles 6 and 8) are where most organizations fail. Teams add work constantly; the principles explain why overloading the system destroys throughput.",
    "Decentralizing decision-making (Principle 9) is the hardest cultural shift in SAFe transformations. The principle gives practitioners the vocabulary to explain why command-and-control slows delivery.",
    "Exam preparation: know the source of each principle — Lean, agile manifesto, Reinertsen's flow economics, or systems thinking — because SA exam questions often test provenance.",
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

const PRINCIPLES = [
  {
    num: "01",
    title: "Take an economic view",
    src: "Lean / Don Reinertsen",
    body: "All decisions — what to build, when to deliver, how to sequence work — are economic decisions. SAFe teams learn to use the Cost of Delay framework to prioritize work based on its time-sensitive economic value, not just effort or urgency. The principle challenges the instinct to maximize utilization (which delays everything) in favor of maximizing flow and throughput."
  },
  {
    num: "02",
    title: "Apply systems thinking",
    src: "Systems thinking",
    body: "Optimizing one part of a system often sub-optimizes the whole. A team that completes stories faster than the next team can integrate them creates a queue, not value. Systems thinking in SAFe means looking at the whole value stream — from customer request to customer value — and optimizing for end-to-end flow, not team-level metrics."
  },
  {
    num: "03",
    title: "Assume variability; preserve options",
    src: "Lean product development",
    body: "Requirements are uncertain. Locking in a design at the beginning — when you know the least — creates expensive rework when reality diverges from the plan. SAFe encourages set-based design and staged commitment: hold options open until the cost of deciding outweighs the cost of waiting. This explains why PI Planning produces ranges in PI Objectives, not fixed commitments."
  },
  {
    num: "04",
    title: "Build incrementally with fast, integrated learning cycles",
    src: "Agile / Lean",
    body: "Short feedback loops produce better decisions than long cycles. Building in iterations and integrating continuously — rather than integrating at the end — surfaces problems while they're small and cheap to fix. This principle underlies why System Demos happen every sprint, not at the end of the PI."
  },
  {
    num: "05",
    title: "Base milestones on objective evaluation of working systems",
    src: "Lean / Agile",
    body: "Traditional stage-gate milestones measure documents and plans — not working software. SAFe milestones (like the System Demo and PI boundaries) are based on demonstrating real, integrated functionality. This shift from document-based to system-based evaluation reduces the risk of discovering fundamental problems late in delivery."
  },
  {
    num: "06",
    title: "Visualize and limit WIP, reduce batch sizes, and manage queue lengths",
    src: "Lean / Kanban / Reinertsen",
    body: "This is Reinertsen's most practical contribution to SAFe. Large batches create large queues. Large queues create long wait times. Long wait times delay feedback. Limiting WIP and reducing batch sizes — at the story, feature, and solution level — is how SAFe teams achieve faster throughput without adding headcount. The IP sprint is partly there to drain the queue before PI Planning overloads the system again."
  },
  {
    num: "07",
    title: "Apply cadence, synchronize with cross-domain planning",
    src: "Lean / Music theory analogy",
    body: "Cadence creates predictability. When all teams sprint on the same schedule and PI Planning synchronizes all teams at the beginning of each PI, the coordination overhead of managing dependencies drops dramatically. Without cadence, cross-team dependency management becomes a full-time job for the RTE. With cadence, dependencies surface naturally at PI Planning and are managed on the board."
  },
  {
    num: "08",
    title: "Unlock the intrinsic motivation of knowledge workers",
    src: "Lean / Motivation research",
    body: "Knowledge workers aren't motivated by pay alone — they're motivated by autonomy, mastery, and purpose (Daniel Pink's research). SAFe practices that decentralize decisions, give teams ownership of their backlog, and connect team work to mission-level outcomes are all rooted in this principle. Micromanagement and excessive reporting undermine it."
  },
  {
    num: "09",
    title: "Decentralize decision-making",
    src: "Lean / Agile",
    body: "Centralized decision-making creates queues at the point of authority. In SAFe, the goal is to push decisions as close to the point of action as possible — while reserving strategic and high-stakes decisions for the appropriate level. The framework distinguishes between decisions that should be decentralized (how to build the story) and those that need centralization (which value streams to fund)."
  },
  {
    num: "10",
    title: "Organize around value",
    src: "Lean / Value stream thinking",
    body: "Traditional organizations are organized by function — engineering, design, QA, operations — each with separate management chains. Value stream organizations align people around the products and customer journeys they serve together. The ART is the operational construct of this principle: it brings cross-functional teams together to deliver a value stream end-to-end."
  },
];

export default function SAFePrinciplesExplainedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Lean-Agile Principles Explained: All 10 and How They Apply
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Principles Explained</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Framework</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 11 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Lean-Agile Principles Explained: All 10 and How They Apply
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            SAFe practices — PI Planning, ARTs, System Demos — can look arbitrary if you don&apos;t understand the principles underneath them. The 10 SAFe Lean-Agile Principles explain why the framework is built the way it is, and why copying only the ceremonies without the principles usually fails. This guide is essential reading for the{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Agilist (SA) certification</Link>{" "}
            and for practitioners who want to adapt SAFe intelligently rather than follow it rigidly.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Where the Principles Come From</h2>
          <p className="text-lg text-gray-700 mb-4">
            SAFe&apos;s principles don&apos;t come from a single source. They synthesize Lean manufacturing (Toyota Production System), agile software development (the Agile Manifesto), Don Reinertsen&apos;s product development flow economics, and systems thinking. Understanding the source of a principle helps practitioners apply it correctly: Reinertsen&apos;s economics tells you how to sequence features; systems thinking tells you not to optimize team velocity at the expense of value stream throughput.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The 10 Principles</h2>
          <div className="space-y-8">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-[#01203d] text-white p-4 flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-xl min-w-[32px]">{p.num}</span>
                  <div>
                    <p className="font-bold text-lg">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Source: {p.src}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 text-[16px] leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="SAFe Program Consultant, enterprise transformation">
            Most failed SAFe implementations copy the ceremonies without the principles. Teams do PI Planning but skip Cost of Delay. They have ARTs but don&apos;t limit WIP. The principles are the theory that makes the practices work — skip them and you&apos;re just adding meetings.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many SAFe principles are tested on the SA exam?</p>
              <p className="text-lg text-gray-700">The Leading SAFe exam tests understanding of all 10 principles, but focuses especially on economic thinking, systems thinking, WIP limits, and decentralized decision-making. Expect 5–8 questions that ask you to identify which principle applies to a given scenario, or which behavior violates a principle.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Are the SAFe principles the same as the Agile Manifesto principles?</p>
              <p className="text-lg text-gray-700">No — they overlap but are distinct. The Agile Manifesto has 12 principles; SAFe has 10 Lean-Agile principles. SAFe's principles extend the manifesto with Lean economics, flow management, and systems thinking that the manifesto doesn't address directly. Both inform SAFe practice.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is Cost of Delay and why does it matter?</p>
              <p className="text-lg text-gray-700">Cost of Delay is the economic value lost by deferring delivery of a feature. It's the practical tool for Principle 1 (economic view). Teams that understand Cost of Delay prioritize differently than teams that use effort-only estimation — they factor in how quickly value decays if the feature ships late.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which principle is most commonly violated in SAFe implementations?</p>
              <p className="text-lg text-gray-700">Principle 6 (visualize and limit WIP) and Principle 9 (decentralize decision-making) are the most commonly violated. Organizations add work to the system without removing anything (violating WIP limits) and push decisions up to senior leadership on timelines that create delays teams can't control (violating decentralization).</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Earn Your SAFe Agilist Certification</p>
            <p className="mb-5">The Leading SAFe course covers all 10 principles in depth — with facilitated scenarios and exam prep included.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SA course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-framework-explained" className="text-[#01203d] underline hover:no-underline">SAFe framework explained</Link>
            {" · "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">Agile Release Train explained</Link>
            {" · "}
            <Link href="/blog/leading-safe-exam-questions" className="text-[#01203d] underline hover:no-underline">Leading SAFe exam questions</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
