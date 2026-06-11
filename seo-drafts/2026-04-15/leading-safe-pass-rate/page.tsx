import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leading SAFe Pass Rate: SA Exam Score and First-Attempt Tips | Agile36",
  description:
    "Leading SAFe (SA) exam pass rate explained: passing score, how the open-book format works, what topics appear most, and how to pass the SA exam on your first attempt.",
  keywords: ["Leading SAFe pass rate", "SA exam pass rate", "SAFe Agilist pass rate", "Leading SAFe exam score", "SA exam passing score", "how hard is Leading SAFe exam"],
  openGraph: {
    title: "Leading SAFe Pass Rate: SA Exam Score and First-Attempt Tips",
    description: "Leading SAFe exam pass rate, open-book format explained, and first-attempt preparation strategy.",
    url: "https://www.agile36.com/blog/leading-safe-pass-rate",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/leading-safe-pass-rate" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Leading SAFe (SA) exam requires <strong>73% to pass — 33 correct out of 45 questions</strong>. You have 90 minutes. Unlike the SSM, the SA exam is <strong>open book</strong> — you can access the SAFe website during the exam.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Being open book does not make the exam easy. The 90 minutes <strong>is not enough time</strong> to look up every answer from scratch. Practitioners who rely entirely on the open-book access often don&apos;t finish.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>First-attempt pass rates for practitioners who attend live Leading SAFe training are high. The exam rewards <strong>understanding SAFe&apos;s leadership model</strong> — Lean-Agile mindset, principles, and how leadership enables vs. blocks transformation.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The SA exam is most commonly taken by <strong>managers, executives, and program leaders</strong> moving into SAFe environments. Unlike the SSM, it focuses on leadership behavior and organizational change rather than team-level facilitation.</span></li>
      </ul>
    </section>
  );
}

function ExamFacts() {
  return (
    <section aria-label="SA exam facts" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Leading SAFe Exam: Key Facts</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Questions", value: "45" },
          { label: "Time", value: "90 min" },
          { label: "Pass Score", value: "73%" },
          { label: "Format", value: "Open book" },
        ].map((fact) => (
          <div key={fact.label} className="bg-[#01203d] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-yellow-400 mb-1">{fact.value}</p>
            <p className="text-sm text-gray-300">{fact.label}</p>
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
          "The open-book format helps with factual questions (exact percentages, specific role definitions) but not with scenario questions that require understanding SAFe's leadership philosophy. Don't assume open-book means low preparation.",
          "The SA exam is primarily about leadership behavior in SAFe contexts — not technical delivery details. Questions focus on how leaders enable or block transformation, how Lean-Agile principles apply to decisions, and what the SA's role is in the organization.",
          "Effective open-book strategy: know the SAFe website structure well enough to find content in 30-60 seconds. Tabbing through pages during the exam burns time. Know where the Lean-Agile Principles, Core Values, and role descriptions live.",
          "Scenario questions are the hardest part of the SA exam. They typically present a leadership decision or transformation challenge and ask what the correct SAFe-aligned behavior is. Practice with the case study examples in the SAFe Study Guide.",
          "You have one included retake. Most practitioners who fail once do so because they underestimated preparation requirements for an 'open book' exam. A focused 4-hour review of the Study Guide before the retake typically resolves this.",
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

export default function LeadingSafePassRatePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Leading SAFe Pass Rate: SA Exam Score and First-Attempt Tips
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Leading SAFe Pass Rate</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Exam Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Leading SAFe Pass Rate: SA Exam Score and First-Attempt Tips
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Leading SAFe exam requires 73% to pass and has one significant advantage over other SAFe exams: it&apos;s open book. But open book doesn&apos;t mean easy — the 90-minute time limit combined with scenario-heavy questions means you can&apos;t look up every answer. Practitioners who attend live{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe training</Link>{" "}
            and prepare properly pass at strong rates — but those who assume "open book" means "no preparation" consistently underperform.
          </p>

          <ExecutiveSummary />

          <ExamFacts />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How the Open-Book Format Actually Works</h2>
          <p className="text-lg text-gray-700 mb-4">
            During the SA exam, you can access scaledagile.com in a separate browser tab. This helps with factual questions — specific percentages, exact definitions, role descriptions. But the majority of SA exam questions are scenario-based, testing how a SAFe leader should behave in specific situations. Those require understanding the principles, not looking them up.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-3">Open book helps with...</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Exact percentages (e.g., ART predictability targets)</li>
                <li>• Specific role definitions you haven&apos;t memorized</li>
                <li>• Names of specific SAFe elements you can&apos;t recall</li>
                <li>• Double-checking a factual answer you&apos;re unsure about</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="text-red-800 font-bold mb-3">Open book doesn&apos;t help with...</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Scenario questions requiring principle application</li>
                <li>• Questions where all options are on the website</li>
                <li>• Time pressure — looking up every answer burns the clock</li>
                <li>• Questions about leadership mindset and behavior</li>
              </ul>
            </div>
          </div>

          <PullQuote attribution="SA-certified VP of Engineering, enterprise software">
            I thought &apos;open book&apos; meant I could wing it. I finished 38 out of 45 questions before time ran out. The ones I didn&apos;t finish were the ones where I went to the website instead of thinking through what I&apos;d learned. On my retake I barely used the open-book access — and finished in 65 minutes with time to review. The exam tests understanding, not lookup speed.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What percentage of people pass the SA exam on the first try?</p>
              <p className="text-lg text-gray-700">Scaled Agile does not publish official pass rates. Practitioners who attend live training and prepare with the Study Guide pass at high rates. Candidates who self-study without a course or underestimate the scenario-based questions have lower first-attempt success. Our training programs consistently produce strong first-attempt results because of the preparation emphasis.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long after training should I take the SA exam?</p>
              <p className="text-lg text-gray-700">Within 1-2 weeks while content is fresh is optimal. You have 30 days from course completion to take the first attempt. Waiting until week 4 increases forgetting and reduces confidence. Most practitioners who attend a live course are ready to take the exam within a few days of completing it.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the Leading SAFe exam harder than the SSM exam?</p>
              <p className="text-lg text-gray-700">Different, not inherently harder. The SSM is closed book with team-level scenarios. The SA is open book with leadership and transformation scenarios. Practitioners who think in terms of leadership philosophy and organizational change find the SA more natural. Those who prefer process and ceremony facilitation sometimes find the SA less intuitive.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What topics appear most on the SA exam?</p>
              <p className="text-lg text-gray-700">Leadership behaviors that enable vs. block SAFe transformation, Lean-Agile principles application, SAFe Core Values, PI Planning leadership responsibilities, the Business Agility model, and how leaders develop and sustain a Lean-Agile mindset. Lean-Agile leadership development questions are the most conceptually demanding.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I take the SA exam without attending a course?</p>
              <p className="text-lg text-gray-700">Scaled Agile requires course attendance to receive the exam attempt — you can&apos;t self-study your way to the SA exam without registering for a Leading SAFe course. The course provides the exam attempt token. Some practitioners find value in self-studying the SAFe Big Picture and Study Guide before the course to maximize their learning time in the 2-day session.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get SA Certified with Confidence</p>
            <p className="mb-5">Our Leading SAFe course prepares you for the exam and the leadership skills that actually change how organizations deliver.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/leading-safe-exam-questions" className="text-[#01203d] underline hover:no-underline">Leading SAFe exam questions</Link>
            {" · "}
            <Link href="/blog/leading-safe-exam-tips" className="text-[#01203d] underline hover:no-underline">Leading SAFe exam tips</Link>
            {" · "}
            <Link href="/blog/safe-agilist-salary" className="text-[#01203d] underline hover:no-underline">SAFe Agilist salary guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
