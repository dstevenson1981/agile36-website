import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSM Pass Rate: What It Is and How to Pass on Your First Try | Agile36",
  description:
    "SAFe Scrum Master (SSM) pass rate explained: what score you need, how hard the exam is, and the strategies that help practitioners pass on the first attempt.",
  keywords: ["SSM pass rate", "SAFe Scrum Master pass rate", "SSM exam pass rate", "how hard is SSM exam", "SSM passing score", "SAFe Scrum Master exam difficulty"],
  openGraph: {
    title: "SSM Pass Rate: What It Is and How to Pass on Your First Try",
    description: "SSM pass rate, passing score requirements, and strategies for first-attempt success.",
    url: "https://www.agile36.com/blog/ssm-pass-rate",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/ssm-pass-rate" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The SSM passing score is <strong>73% (33 out of 45 questions)</strong>. The exam is closed book, 45 questions, 90 minutes. You have one included retake with your course registration if you don&apos;t pass the first time.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Practitioners who attend a live SSM course and review the SAFe Study Guide pass at <strong>high rates</strong> — the exam rewards understanding of SAFe principles and the SM role, not memorization of the Big Picture.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The most common reasons for failing: <strong>confusing SAFe-specific behaviors with generic Scrum behaviors</strong>, and selecting answers based on what you do at work rather than what SAFe prescribes.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The SSM exam is <strong>not open book</strong>. Unlike the SA (Leading SAFe) exam, you cannot access the SAFe website during the test. This requires more thorough preparation.</span></li>
      </ul>
    </section>
  );
}

function ScoreVisual() {
  return (
    <section aria-label="SSM exam score breakdown" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SSM Exam: Score Requirements</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Questions", value: "45", color: "bg-gray-50 border-gray-200" },
          { label: "Questions Needed to Pass", value: "33", color: "bg-green-50 border-green-200" },
          { label: "Passing Score", value: "73%", color: "bg-[#01203d] text-white border-[#01203d]" },
        ].map((item) => (
          <div key={item.label} className={`rounded-xl border p-6 text-center ${item.color}`}>
            <p className={`text-4xl font-bold mb-2 ${item.color.includes("01203d") ? "text-yellow-400" : "text-[#01203d]"}`}>{item.value}</p>
            <p className={`text-sm font-semibold ${item.color.includes("01203d") ? "text-gray-300" : "text-gray-600"}`}>{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between mb-2 text-sm font-semibold">
          <span className="text-gray-600">0 correct</span>
          <span className="text-green-700">33 correct = Pass</span>
          <span className="text-gray-600">45 correct</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 relative">
          <div className="bg-red-400 h-4 rounded-l-full" style={{ width: "71%" }} />
          <div className="absolute top-0 h-4 bg-green-400 rounded-r-full" style={{ left: "71%", width: "29%" }} />
        </div>
        <p className="text-xs text-gray-500 mt-2">Red = below passing threshold · Green = passing range</p>
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
          "The SSM exam is closed book — you cannot use the SAFe website, notes, or any reference material during the exam. This distinguishes it from the SA (Leading SAFe) exam, which is open book.",
          "The exam tests how a Scrum Master should behave in SAFe scenarios — not abstract framework knowledge. The question pattern is almost always: given this situation, what does the SM do? Practice scenario reasoning, not fact memorization.",
          "The most reliable preparation: attend a live SSM course (not just self-study), review the SAFe Study Guide, and work through practice questions until scenario reasoning feels automatic.",
          "Wrong answer patterns to watch for: answers that are technically correct Scrum behaviors but ignore SAFe's ART context; answers where the SM does something the PO or RTE should do; answers where the SM solves problems the team should solve.",
          "You have one included retake. If you don't pass on the first try, review the topic areas flagged in your results feedback and focus your retake preparation on those areas specifically.",
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

export default function SsmPassRatePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SSM Pass Rate: What It Is and How to Pass on Your First Try
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SSM Pass Rate</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Exam Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SSM Pass Rate: What It Is and How to Pass on Your First Try
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe Scrum Master (SSM) exam requires a 73% passing score — 33 correct answers out of 45 questions in a 90-minute closed-book exam. For practitioners who attend a live course and prepare properly, the pass rate is high. But &quot;closed book&quot; is where candidates are often caught off-guard — unlike the Leading SAFe exam, the SSM does not permit reference to the SAFe website during the test. Our{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM training</Link>{" "}
            prepares practitioners for exactly this exam format.
          </p>

          <ExecutiveSummary />

          <ScoreVisual />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why People Fail the SSM Exam</h2>
          <div className="space-y-4 my-6">
            {[
              { reason: "Generic Scrum answers in SAFe context", explanation: "Many candidates answer based on general Scrum knowledge rather than SAFe's specific SM role definition. SAFe Scrum Masters operate within an ART — their behaviors in PI Planning, ART sync, and cross-team scenarios differ from standalone Scrum." },
              { reason: "Answering from personal work experience", explanation: "What works at your job may not be what SAFe prescribes. Exam scenarios test SAFe&apos;s model of best practice, not context-specific pragmatism. Practicing with official SAFe materials before the exam helps recalibrate." },
              { reason: "Insufficient scenario practice", explanation: "The exam is scenario-based, not factual recall. Candidates who study the framework but don&apos;t practice applying it to specific situations underperform relative to their preparation effort." },
              { reason: "Not reviewing the Study Guide", explanation: "Scaled Agile provides a free Study Guide for every certification. Practitioners who skip it frequently encounter questions they could have prepared for — it signals what SAFe considers the most important topics." },
            ].map((item) => (
              <div key={item.reason} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-semibold text-[#01203d] mb-2">{item.reason}</p>
                <p className="text-gray-700 text-sm">{item.explanation}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="SSM-certified practitioner, retail technology">
            I failed my first attempt because I kept second-guessing the SAFe answer with what I actually do at work. The exam doesn&apos;t care that my company does it differently — it tests the framework. Once I reframed my thinking to &apos;what does SAFe say?&apos; instead of &apos;what do I do?&apos; the retake was straightforward.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long do I have to take the SSM exam after training?</p>
              <p className="text-lg text-gray-700">You have 30 days from the course end date to attempt the exam. This window is enough time for preparation, but don&apos;t delay — most practitioners perform better when course material is fresh. If your attempt window expires, you can purchase additional attempts through Scaled Agile.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What happens if I fail the SSM exam?</p>
              <p className="text-lg text-gray-700">Your course registration includes one retake attempt. If you fail the first attempt, use the detailed score report to identify weak topic areas, review those sections in the SAFe Study Guide, and schedule your retake. Most practitioners who fail once pass on the retake with focused preparation.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the SSM exam harder than CSM?</p>
              <p className="text-lg text-gray-700">Most practitioners find the SSM exam comparable in difficulty to CSM but with different content — the SSM tests SAFe-specific behaviors and ART context rather than standalone Scrum. Candidates with existing Scrum experience adapt quickly to the SAFe framing. The closed-book format is the primary surprise for candidates expecting an open-book test.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many questions can I get wrong and still pass?</p>
              <p className="text-lg text-gray-700">You can miss up to 12 questions and still pass (45 × 73% = 32.85, rounded to 33 correct). This means you have a meaningful buffer. Candidates who know the SM role well typically answer 35-40 correctly — the exam is manageable for prepared practitioners.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What topics appear most on the SSM exam?</p>
              <p className="text-lg text-gray-700">The exam emphasizes: SM role in SAFe ceremonies (PI Planning, ART sync, I&A), servant leadership behaviors, impediment removal and escalation, team dynamics and coaching, and how the SM supports the PO and development team. Scenario questions about what the SM should do in specific sprint or ART situations are the dominant question type.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Prepare to Pass First Time</p>
            <p className="mb-5">Our SSM course includes live instruction, exam preparation, and one included attempt — with strong first-time pass rates for prepared candidates.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/ssm-exam-tips" className="text-[#01203d] underline hover:no-underline">SSM exam tips</Link>
            {" · "}
            <Link href="/blog/ssm-renewal" className="text-[#01203d] underline hover:no-underline">SSM certification renewal</Link>
            {" · "}
            <Link href="/blog/scrum-master-salary-2026" className="text-[#01203d] underline hover:no-underline">Scrum Master salary 2026</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
