import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POPM Pass Rate: What to Expect and How to Prepare | Agile36",
  description:
    "SAFe POPM pass rate explained: the passing score requirement, what the exam tests, and how to prepare for the SAFe Product Owner Product Manager certification on your first attempt.",
  keywords: ["POPM pass rate", "SAFe POPM pass rate", "POPM passing score", "how hard is POPM exam", "POPM exam difficulty", "SAFe product owner exam pass rate"],
  openGraph: {
    title: "POPM Pass Rate: What to Expect and How to Prepare",
    description: "POPM exam pass rate, passing score, and first-attempt preparation strategies.",
    url: "https://www.agile36.com/blog/popm-pass-rate",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/popm-pass-rate" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The POPM exam requires a <strong>73% passing score — 33 correct out of 45 questions</strong>. You have 90 minutes. The exam is closed book, like the SSM.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The POPM exam covers <strong>both the PO and PM roles</strong>. Candidates who are experienced in one role sometimes underperform on questions about the other. Both role definitions need equal preparation.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The most frequently tested topics: <strong>backlog hierarchy (epics → features → stories)</strong>, the PM/PO collaboration model, and role-appropriate behaviors in PI Planning scenarios.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Candidates who attend live POPM training and review the SAFe Study Guide pass at high rates. The SAFe Study Guide for POPM is free on scaledagile.com and should be treated as mandatory, not optional.</span></li>
      </ul>
    </section>
  );
}

function TopicBreakdown() {
  const topics = [
    { topic: "PO Role and Team Backlog", weight: 85 },
    { topic: "PM Role and Program Backlog", weight: 75 },
    { topic: "PI Planning Participation", weight: 80 },
    { topic: "Epics → Features → Stories Hierarchy", weight: 90 },
    { topic: "PO/PM Collaboration Model", weight: 70 },
    { topic: "Lean-Agile Principles", weight: 60 },
  ];
  return (
    <section aria-label="POPM exam topic importance" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-2">POPM Exam Topic Emphasis (Relative Importance)</h3>
      <p className="text-sm text-gray-500 mb-4">Based on SAFe Study Guide content weighting and practitioner experience.</p>
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
          "The POPM exam tests both PO and PM roles with equal rigor. Most candidates are experienced in one — the exam tests both. Experienced POs should spend extra preparation time on PM-level content (program backlog, feature definition, PM-stakeholder interactions).",
          "Know the backlog hierarchy cold: portfolio epics → ART features → team stories. Know who owns each level. Know the decomposition relationship between features and stories. This appears in multiple question variants.",
          "Scenario questions about PI Planning are common. Know what POs do at PI Planning (team breakouts, iteration planning, PI Objectives) vs what PMs do (present features, business value, ART planning).",
          "The exam is closed book. The SA (Leading SAFe) exam allows reference access; POPM does not. Anything you depend on must be memorized, not looked up.",
          "Retake strategy if needed: the POPM score report flags topics where you performed below threshold. Focus your retake preparation on those specific areas rather than reviewing everything uniformly.",
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

export default function PopmPassRatePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          POPM Pass Rate: What to Expect and How to Prepare
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>POPM Pass Rate</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Exam Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          POPM Pass Rate: What to Expect and How to Prepare
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The POPM exam requires 73% to pass — 33 correct answers out of 45 questions, closed book, in 90 minutes. Like most SAFe exams, it rewards practitioners who understand the framework&apos;s model for product ownership rather than practitioners who rely on general agile knowledge or prior experience. Our{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">POPM training</Link>{" "}
            prepares practitioners for both the PO and PM content domains that the exam covers.
          </p>

          <ExecutiveSummary />

          <TopicBreakdown />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common POPM Exam Failure Patterns</h2>
          <div className="space-y-3 my-6">
            {[
              { pattern: "Answering as a PO on PM questions", detail: "Experienced POs instinctively answer at the team/story level. POPM tests PM-level behaviors around features, program backlog, and ART strategy — which require deliberate preparation." },
              { pattern: "Confusing PO and PM ceremony responsibilities", detail: "Who facilitates what in PI Planning is a frequent question source. POs run team breakouts; PMs present to the ART. Know the ceremony split precisely." },
              { pattern: "Using pre-SAFe product management knowledge", detail: "If your PM background predates SAFe, some of what you know contradicts SAFe&apos;s model. SAFe PMs don&apos;t manage roadmaps in the traditional sense — they manage program backlogs with LPM above them." },
              { pattern: "Skipping the SAFe Study Guide", detail: "The official Study Guide signals exactly what Scaled Agile considers testable content. Ignoring it is leaving points on the table." },
            ].map((item) => (
              <div key={item.pattern} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-semibold text-[#01203d] mb-1">{item.pattern}</p>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="POPM-certified Product Manager, enterprise logistics">
            I came in with 8 years of product management experience and still had to study for the POPM. My mental model for &apos;product manager&apos; didn&apos;t match SAFe&apos;s PM role exactly — especially the PO relationship and the program backlog structure. The exam is testing SAFe&apos;s model, not product management in general.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the POPM exam harder than the SSM exam?</p>
              <p className="text-lg text-gray-700">Most practitioners find them comparable in difficulty. The POPM covers two roles (PO and PM) which is a wider content scope, but neither role is particularly complex to understand. Candidates with active product ownership experience typically find the POPM more intuitive than candidates taking it from a purely technical background.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many times can I take the POPM exam?</p>
              <p className="text-lg text-gray-700">Your course registration includes one exam attempt and one retake. If you need a third attempt, you can purchase additional attempts through Scaled Agile. Most candidates pass within two attempts when they review their score report and focus retake preparation on flagged topic areas.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does exam preparation take?</p>
              <p className="text-lg text-gray-700">Attending the live POPM course provides the primary preparation. Most practitioners benefit from an additional 3-5 hours of self-study: reading the SAFe Study Guide, reviewing the POPM articles on scaledagile.com, and working through practice questions. Total time investment beyond the course: 4-8 hours.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What&apos;s the time limit on taking the exam after training?</p>
              <p className="text-lg text-gray-700">You have 30 days from your course completion to take the exam. Most practitioners take it within 1-2 weeks while the training is fresh. Waiting until day 28-30 increases the risk of having to pay for an additional attempt window if you don&apos;t pass.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does POPM certification expire?</p>
              <p className="text-lg text-gray-700">Yes — all SAFe certifications expire after one year. Renewal requires 20 PDUs and a $100 renewal fee. Attending another SAFe course (like POPM refresher or a higher-level certification) earns 16 PDUs toward renewal.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Prepare for the POPM with Live Training</p>
            <p className="mb-5">Our POPM course includes live instruction, exam preparation, and the context to answer both PO and PM questions confidently.</p>
            <Link href="/courses/product-owner-manager" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View POPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/popm-exam-questions" className="text-[#01203d] underline hover:no-underline">POPM exam questions</Link>
            {" · "}
            <Link href="/blog/popm-prerequisites" className="text-[#01203d] underline hover:no-underline">POPM prerequisites</Link>
            {" · "}
            <Link href="/blog/product-owner-vs-product-manager" className="text-[#01203d] underline hover:no-underline">Product Owner vs Product Manager</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
