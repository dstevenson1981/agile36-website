import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPM Exam Questions: What to Expect on the SAFe LPM Certification Test | Agile36",
  description:
    "SAFe LPM exam questions explained: the types of questions tested, key topic areas, how to prepare, and what makes the LPM exam different from other SAFe certifications.",
  keywords: ["LPM exam questions", "SAFe LPM exam", "lean portfolio management exam questions", "LPM certification exam", "SAFe LPM test questions", "LPM exam preparation"],
  openGraph: {
    title: "LPM Exam Questions: What to Expect on the SAFe LPM Certification Test",
    description: "What the LPM exam tests, sample question types, and how to prepare for the SAFe Lean Portfolio Management certification.",
    url: "https://www.agile36.com/blog/lpm-exam-questions",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/lpm-exam-questions" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The LPM exam is <strong>45 questions, 90 minutes, 73% passing score</strong>. Like most SAFe exams, it&apos;s closed book and scenario-based. The exam tests <strong>portfolio-level thinking</strong>, not team-level agile delivery.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most heavily tested topics: <strong>Lean Budgets and guardrails, value stream identification, portfolio Kanban, and strategic portfolio theme development</strong>. These differ fundamentally from the SAFe topics tested in SSM or SA exams.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>LPM question scenarios are typically at the <strong>executive or VP level</strong> — decisions about portfolio investment, governance, and organizational strategy rather than sprint-level delivery or team behavior.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The LPM exam is the <strong>most strategically advanced</strong> SAFe certification. It assumes familiarity with the Leading SAFe (SA) framework — most candidates have SA or equivalent before attempting LPM.</span></li>
      </ul>
    </section>
  );
}

function TopicWeights() {
  const topics = [
    { topic: "Lean Portfolio Management function", weight: 90 },
    { topic: "Lean Budgets and guardrails", weight: 88 },
    { topic: "Value stream identification and organization", weight: 85 },
    { topic: "Portfolio Kanban", weight: 80 },
    { topic: "Strategic themes and OKRs", weight: 75 },
    { topic: "Participatory budgeting", weight: 70 },
    { topic: "Portfolio epic lifecycle", weight: 72 },
  ];
  return (
    <section aria-label="LPM exam topics" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">LPM Exam Topic Emphasis</h3>
      <div className="space-y-3">
        {topics.map((t) => (
          <div key={t.topic}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">{t.topic}</span>
              <span className="text-xs text-gray-500">{t.weight}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#01203d] h-2 rounded-full" style={{ width: `${t.weight}%` }} />
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
          "The LPM exam tests strategy, governance, and portfolio economics — not sprints or ceremonies. Candidates who prepare with an SSM or SA mindset are often surprised by the level of business strategy content.",
          "Know Lean Budgets cold: what they are, why they replace project-based funding, how guardrails work, and how participatory budgeting differs from traditional capital allocation. This is the highest-density exam topic.",
          "Portfolio Kanban distinguishes LPM from other SAFe certifications. Know the states in the portfolio Kanban (funnel, review, analysis, portfolio backlog, implementing, done), who manages each state, and what analysis is required before an epic moves to implementing.",
          "Value stream identification questions ask you to distinguish operational from development value streams and to reason about what makes a good vs. poor value stream boundary. These appeared heavily in practitioner feedback about the exam.",
          "Strategic themes and OKRs connect the enterprise strategy to portfolio and ART decisions. Know how they flow down from the portfolio level and how they inform PI Planning priorities.",
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

export default function LpmExamQuestionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          LPM Exam Questions: What to Expect on the SAFe LPM Certification Test
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>LPM Exam Questions</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Exam Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          LPM Exam Questions: What to Expect on the SAFe LPM Certification Test
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe Lean Portfolio Management (LPM) exam is the most strategically advanced SAFe certification — and the most distinct from other SAFe exams. Where the SSM tests team-level agile behavior and the SA tests leadership transformation principles, the LPM tests portfolio economics, value stream management, and Lean governance. Our{" "}
            <Link href="/courses/lean-portfolio-management" className="text-[#01203d] font-semibold underline hover:no-underline">LPM certification course</Link>{" "}
            prepares practitioners for exactly the portfolio-level thinking the exam tests.
          </p>

          <ExecutiveSummary />

          <TopicWeights />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">LPM Question Types and Scenarios</h2>
          <p className="text-lg text-gray-700 mb-4">
            LPM exam scenarios are typically at the executive or program level. A typical question presents a portfolio management situation and asks what a Lean Portfolio Manager, Business Owner, or Enterprise Architect should do. Wrong answers often represent traditional project management behaviors that LPM is designed to replace.
          </p>
          <div className="space-y-4 my-6">
            {[
              { type: "Lean Budget allocation", example: "An ART needs additional investment to pursue a new market opportunity. A Business Owner requests a budget exception. How should the LPM team respond under Lean Portfolio Management?" },
              { type: "Portfolio Kanban management", example: "An epic has been in the 'Analyzing' state for 3 PIs. What should the LPM team do, and what does this pattern signal about the portfolio process?" },
              { type: "Value stream design", example: "An organization is organizing into ARTs. Two options are presented: one organized by technology layer, one by customer value stream. Which should they choose and why?" },
              { type: "Strategic theme development", example: "The executive team wants to accelerate a market pivot. How should strategic themes be developed and how should they influence portfolio and ART decisions?" },
            ].map((item) => (
              <div key={item.type} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-semibold text-[#01203d] mb-2">{item.type}</p>
                <p className="text-gray-600 text-sm italic">{item.example}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="LPM-certified Enterprise Architect, healthcare system">
            The LPM exam was the most challenging SAFe certification I&apos;ve taken — not because the concepts are complex, but because they require shifting completely away from project thinking. Every wrong answer option looks like something a reasonable project manager would do. Passing requires internalizing Lean Portfolio Management well enough to recognize the difference instinctively.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the LPM exam harder than Leading SAFe?</p>
              <p className="text-lg text-gray-700">For most practitioners, yes — the LPM requires a more significant shift in mental model. Leading SAFe builds on leadership behaviors most practitioners have some exposure to. LPM requires understanding portfolio economics, value stream organization, and Lean governance at a depth that's genuinely new for most candidates.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need SA certification before taking LPM?</p>
              <p className="text-lg text-gray-700">Scaled Agile doesn't require SA as a formal prerequisite for LPM enrollment, but the LPM course assumes familiarity with the SAFe framework. Practitioners who take LPM without SA or equivalent foundation often struggle with context — the course doesn't explain the SAFe fundamentals that LPM builds on.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should I spend preparing for the LPM exam?</p>
              <p className="text-lg text-gray-700">Beyond the 2-day course, plan 4-6 hours of focused study: read the SAFe LPM article and related portfolio articles on scaledagile.com, review the Study Guide, and work through the sample questions. The LPM requires more preparation than most practitioners expect based on their SA or SSM experience.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the LPM exam open or closed book?</p>
              <p className="text-lg text-gray-700">The LPM exam is closed book — the same as SSM and POPM. You cannot access the SAFe website during the exam. This requires more thorough content preparation than the SA exam, which is open book.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the career impact of LPM certification?</p>
              <p className="text-lg text-gray-700">LPM targets practitioners in or moving toward portfolio management, enterprise architecture, or senior agile leadership roles. It's most impactful for those with influence over organizational structure, investment decisions, or SAFe transformation governance. Portfolio Managers, Enterprise Architects, and VPs typically benefit most.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get LPM Certified</p>
            <p className="mb-5">Our LPM course covers Lean Portfolio Management in full — from value stream design to Lean Budgets to portfolio governance.</p>
            <Link href="/courses/lean-portfolio-management" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View LPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/lpm-prerequisites" className="text-[#01203d] underline hover:no-underline">LPM prerequisites</Link>
            {" · "}
            <Link href="/blog/safe-value-streams-explained" className="text-[#01203d] underline hover:no-underline">SAFe value streams explained</Link>
            {" · "}
            <Link href="/blog/lpm-salary" className="text-[#01203d] underline hover:no-underline">LPM salary guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
