import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Lean-Agile Principles: All 10 Explained | Agile36",
  description:
    "All 10 SAFe Lean-Agile principles explained: what each principle means, where it comes from, and how it applies to enterprise agile delivery at scale.",
  keywords: ["SAFe lean agile principles", "SAFe 10 principles", "SAFe principles explained", "lean agile principles guide", "SAFe principles list", "SAFe foundational principles"],
  openGraph: {
    title: "SAFe Lean-Agile Principles: All 10 Explained",
    description: "What SAFe's 10 Lean-Agile principles are, where they come from, and how they shape enterprise delivery practice.",
    url: "https://www.agile36.com/blog/safe-lean-agile-principles-guide",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-lean-agile-principles-guide" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SAFe&apos;s 10 Lean-Agile principles are the <strong>philosophical foundation</strong> of the entire framework — they explain why SAFe practices exist, not just what to do. Understanding the principles makes SAFe practitioners more effective and adaptable than those who know the practices without the theory.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The principles draw from <strong>three intellectual traditions</strong>: Lean manufacturing (Toyota Production System), Agile software development (Agile Manifesto), and systems thinking (Deming, Senge). SAFe synthesizes these into a coherent enterprise framework.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The most frequently tested principles in SAFe exams: <strong>Take an economic view</strong> (Principle 1), <strong>Apply systems thinking</strong> (Principle 2), and <strong>Assume variability, preserve options</strong> (Principle 3). These three underpin most of SAFe&apos;s distinctive governance and planning choices.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Principles 8–10 address the <strong>organizational and cultural dimensions</strong> of agile: unlocking the intrinsic motivation of knowledge workers, decentralizing decision-making, and organizing around value. These are the leadership-facing principles that SAFe certs for executives emphasize.</span></li>
      </ul>
    </section>
  );
}

function PrinciplesList() {
  const principles = [
    { num: "01", title: "Take an economic view", summary: "Sequence jobs to maximize flow and economic outcomes. Use Cost of Delay to prioritize." },
    { num: "02", title: "Apply systems thinking", summary: "Optimize the whole system, not individual parts. Systems have properties that emerge from component interactions." },
    { num: "03", title: "Assume variability; preserve options", summary: "Use set-based design and delay commitment until the last responsible moment to preserve flexibility." },
    { num: "04", title: "Build incrementally with fast, integrated learning cycles", summary: "Deliver value in small increments. Integration points provide objective evidence and enable course correction." },
    { num: "05", title: "Base milestones on objective evaluation of working systems", summary: "Measure progress by evaluating working software, not plan compliance or document completion." },
    { num: "06", title: "Make value flow without interruptions", summary: "Identify and eliminate waste that interrupts flow. Apply Lean thinking to software delivery value streams." },
    { num: "07", title: "Apply cadence, synchronize with cross-domain planning", summary: "Cadence reduces the cost of coordination. PI Planning synchronizes multiple teams around shared goals." },
    { num: "08", title: "Unlock the intrinsic motivation of knowledge workers", summary: "Autonomy, mastery, and purpose drive performance. Command-and-control undermines knowledge work quality." },
    { num: "09", title: "Decentralize decision-making", summary: "Push decisions to the lowest competent level. Centralize only strategic and irreversible decisions." },
    { num: "10", title: "Organize around value", summary: "Structure teams around value delivery (value streams) rather than technical domains or functional silos." },
  ];
  return (
    <section aria-label="SAFe principles" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">All 10 SAFe Lean-Agile Principles</h3>
      <div className="space-y-3">
        {principles.map((p) => (
          <div key={p.num} className="flex gap-4 bg-gray-50 rounded-xl p-4 items-start">
            <span className="text-yellow-500 font-bold text-lg min-w-[32px]">{p.num}</span>
            <div>
              <p className="font-bold text-[#01203d] mb-1">{p.title}</p>
              <p className="text-sm text-gray-600">{p.summary}</p>
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
          "Principle 1 (Take an economic view) is the most practically powerful principle for prioritization decisions. Cost of Delay quantifies the economic impact of deferring features — making it possible to compare dissimilar items and sequence the portfolio backlog for maximum economic value.",
          "Principle 3 (Assume variability, preserve options) is the theoretical basis for SAFe's rejection of Big Design Up Front. Set-based design and the last responsible moment for commitment are practical applications of this principle in enterprise software development.",
          "Principle 7 (Cadence, synchronize) is why PI Planning exists. Without synchronized cadence across multiple teams, dependencies create coordination chaos. The PI cadence creates the predictable rhythm that allows cross-team planning to be efficient.",
          "Principle 9 (Decentralize decision-making) is often the hardest for leaders to operationalize. It requires developing frameworks for which decisions should be centralized (strategic, high-cost-to-reverse) vs. decentralized (operational, frequent, time-sensitive).",
          "Principle 10 (Organize around value) is the conceptual foundation for the Agile Release Train and value stream identification. It explains why SAFe doesn't organize teams around technology layers and why value stream mapping precedes ART design.",
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

export default function SafeLeanAgilePrinciplesGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Lean-Agile Principles: All 10 Explained
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Lean-Agile Principles</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Framework</span>
          <span className="text-sm text-[#718aa5]">Reference Guide · 10 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Lean-Agile Principles: All 10 Explained
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            SAFe&apos;s 10 Lean-Agile principles are the intellectual foundation of the framework — the &quot;why&quot; beneath every ceremony, role, and artifact. Practitioners who understand only the practices are effective in contexts where those practices apply directly. Practitioners who understand the principles can reason about novel situations and adapt SAFe appropriately. The{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe certification</Link>{" "}
            develops both the principles and the practices, which is why it&apos;s the recommended starting point for leaders and coaches entering SAFe environments.
          </p>

          <ExecutiveSummary />

          <PrinciplesList />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Intellectual Sources of the Principles</h2>
          <p className="text-lg text-gray-700 mb-4">
            SAFe&apos;s principles synthesize three intellectual traditions. Lean manufacturing contributes the flow thinking, waste elimination, and economic prioritization (Principles 1, 6, 9). The Agile Manifesto and its refinements contribute the incremental delivery, working software evaluation, and knowledge worker motivation principles (Principles 4, 5, 8). Systems thinking — particularly Deming&apos;s quality work and Senge&apos;s learning organizations — contributes the systems view, variability management, and organizational design principles (Principles 2, 3, 10).
          </p>

          <PullQuote attribution="SAFe Program Consultant, government services">
            I&apos;ve trained hundreds of practitioners in SAFe. The ones who understand Principle 9 — decentralize decision-making — are the ones who actually change their organizations. They stop asking for approval for team-level decisions. They create frameworks that push authority down. They know which decisions to escalate and which to make themselves. The principle doesn&apos;t just describe a behavior; it provides the permission structure that enables it.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Are the SAFe principles tested on SAFe exams?</p>
              <p className="text-lg text-gray-700">Yes — all SAFe certifications (SA, SSM, POPM, LPM, RTE) test principle application. Exam questions often present scenarios where understanding which principle applies helps identify the correct answer. Principles 1, 3, 7, and 10 appear most frequently because they underpin the most distinctive SAFe practices.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is Cost of Delay and why is it important?</p>
              <p className="text-lg text-gray-700">Cost of Delay (CoD) is the economic impact of deferring a feature — the value lost per unit of time by not delivering it sooner. CoD quantifies prioritization decisions, making it possible to compare dissimilar items in the portfolio backlog. Dividing CoD by job duration (CD3) produces a prioritization score that sequences work for maximum economic output.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the last responsible moment?</p>
              <p className="text-lg text-gray-700">The last responsible moment is the latest point at which a decision can be made without losing important options — the moment just before making the decision would cause irreversible consequences. SAFe applies this concept to design decisions, feature scope, and investment commitments, allowing teams to preserve options while market and technical conditions become clearer.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do the principles relate to the Agile Manifesto?</p>
              <p className="text-lg text-gray-700">The SAFe principles are an extension and enterprise-scaling of Agile Manifesto values. Where the Manifesto focuses on software team practices, SAFe&apos;s principles address the enterprise context — portfolio economics, multi-team coordination, organizational design, and the leadership behaviors needed at scale. SAFe is built on the Manifesto, not competing with it.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which principle is most commonly violated in SAFe transformations?</p>
              <p className="text-lg text-gray-700">Principle 9 (Decentralize decision-making) is the most commonly violated. Organizations that adopt SAFe ceremonies while maintaining centralized approval chains for team-level decisions are applying SAFe practices without the principle that gives them meaning. Teams end up waiting for approvals that Principle 9 says they should own themselves.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn SAFe From First Principles</p>
            <p className="mb-5">Leading SAFe develops both the 10 principles and the enterprise framework they underpin — for leaders building the organizational conditions that agile at scale requires.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-principles-explained" className="text-[#01203d] underline hover:no-underline">SAFe principles explained</Link>
            {" · "}
            <Link href="/blog/safe-framework-explained" className="text-[#01203d] underline hover:no-underline">SAFe framework explained</Link>
            {" · "}
            <Link href="/blog/agile-transformation-mistakes" className="text-[#01203d] underline hover:no-underline">Agile transformation mistakes</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
