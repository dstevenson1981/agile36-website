import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSM Exam Tips: How to Pass the SAFe Scrum Master Certification | Agile36",
  description:
    "Practical SSM exam tips from SAFe trainers. What to study, how the questions work, how to manage time, and what most candidates get wrong on the first attempt.",
  keywords: ["SSM exam tips", "SAFe scrum master exam tips", "how to pass SSM exam", "safe scrum master certification tips", "SSM study guide", "SAFe SSM exam prep"],
  openGraph: {
    title: "SSM Exam Tips: How to Pass the SAFe Scrum Master Certification",
    description: "What to study and how to read SSM exam questions to pass on your first attempt.",
    url: "https://www.agile36.com/blog/ssm-exam-tips",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/ssm-exam-tips" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The SSM exam is <strong>45 questions, 90 minutes, closed book</strong>, with a 73% pass rate required (33/45). No open-book access — everything you need must be in your head or eliminated by logic.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most-tested topics are: <strong>Scrum in SAFe, Team Events, Servant Leadership, SAFe Principles at the team level, and the SM&apos;s role in PI Planning</strong>. Together these account for ~60% of questions.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Questions are scenario-based. The correct answer is almost always the one that reflects <strong>servant leadership, team empowerment, and removing impediments</strong> — not the one that fixes the problem directly.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>With 45 questions and 90 minutes, you have exactly <strong>2 minutes per question</strong>. Time management is the constraint most candidates underestimate — especially because closed-book means no safety net.</span></li>
      </ul>
    </section>
  );
}

function TopicWeightBars() {
  const topics = [
    { topic: "Scrum in SAFe (team-level ceremonies)", pct: 90, weight: "~24%" },
    { topic: "SM Role & Servant Leadership", pct: 80, weight: "~20%" },
    { topic: "SAFe Principles (team focus)", pct: 68, weight: "~18%" },
    { topic: "PI Planning (SM responsibilities)", pct: 62, weight: "~16%" },
    { topic: "Team Kanban & Flow", pct: 45, weight: "~12%" },
    { topic: "Scrum of Scrums & ART Events", pct: 38, weight: "~10%" },
  ];
  return (
    <section aria-label="SSM exam topic weights" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Approximate Topic Distribution (SSM Exam)</h3>
      <div className="space-y-3">
        {topics.map((t) => (
          <div key={t.topic} className="flex items-center gap-3">
            <div className="w-60 text-right text-sm font-medium text-gray-700 hidden md:block">{t.topic}</div>
            <div className="w-full md:flex-1 bg-gray-100 rounded-full h-8">
              <div className="h-8 rounded-full bg-[#01203d] flex items-center justify-between px-3" style={{ width: `${t.pct}%` }}>
                <span className="text-yellow-400 text-xs font-bold">{t.weight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Estimated based on SAFe exam content outline and post-exam candidate reports. Always verify against the current exam study guide at scaledagile.com.</p>
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
          "The SSM exam is closed-book — you can't look things up. Memorize the SAFe event sequence, the SM's role at each event, and the servant leadership behaviors. No shortcuts.",
          "The most important prep habit: read practice questions and identify why the wrong answers are wrong. Understanding the logic of SAFe traps is more valuable than memorizing correct answers.",
          "Know the difference between SM scope and PO scope. A common question type: 'who is responsible for X?' — and the answer hinges on knowing where the SM's role ends and the PO's begins.",
          "Closed-book changes the time math. You can't recover lost minutes by looking something up. If you're spending more than 90 seconds on a question, mark it and move on. Return with fresh eyes.",
          "Do at least two full timed practice exams before the real one. The discipline of 45 questions in 90 minutes is its own skill — build the exam muscle before the stakes are real.",
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

export default function SSMExamTipsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SSM Exam Tips: How to Pass the SAFe Scrum Master Certification
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SSM Exam Tips</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Exam Prep</span>
          <span className="text-sm text-[#718aa5]">Study Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SSM Exam Tips: How to Pass the SAFe Scrum Master Certification
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SSM exam has one feature that surprises most candidates: it&apos;s closed book. Unlike the Leading SAFe (SA) exam where you can reference the SAFe website, the SSM requires everything from memory — 45 questions, 90 minutes, no aids. Candidates who pass consistently say the same thing: the content isn&apos;t the hard part, the time pressure and question framing are. This guide, from Agile36&apos;s{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe SSM trainers</Link>,{" "}
            covers exactly how to prepare.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Closed-Book Difference</h2>
          <p className="text-lg text-gray-700 mb-4">
            Most agile certifications are open-book — you can search definitions during the exam. The SSM is not. This changes your preparation strategy completely. You need to internalize the SAFe event flow, the SM&apos;s responsibilities at each event, servant leadership behaviors, and team-level practices well enough to answer without reference.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The upside of closed-book: the questions are designed for closed-book. They test recognition and application, not recall of obscure definitions. You won&apos;t be asked to define terms — you&apos;ll be asked what to do in a situation. Knowing the pattern of correct answers matters more than knowing every detail.
          </p>

          <TopicWeightBars />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What "Servant Leadership" Means on the Exam</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SM role in SAFe is a servant leader — the SM facilitates, removes impediments, and coaches, but doesn&apos;t direct. This is the lens through which most SSM exam questions are answered. When a question asks what the SM should do, the correct answer is almost always one of:
          </p>
          <div className="space-y-3 my-6">
            {[
              { action: "Facilitate a conversation", not: "make the decision for the team" },
              { action: "Remove the impediment", not: "work around it or accept it" },
              { action: "Coach the team to self-organize", not: "assign the work yourself" },
              { action: "Escalate to RTE if cross-team", not: "try to solve cross-team issues alone" },
              { action: "Protect the sprint goal", not: "add scope when stakeholders push" },
            ].map((a) => (
              <div key={a.action} className="flex gap-3 bg-gray-50 rounded-xl p-4 items-start">
                <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                <div>
                  <span className="font-semibold text-gray-900">{a.action}</span>
                  <span className="text-gray-500 text-sm"> — not: {a.not}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What to Memorize (Priority Order)</h2>
          <p className="text-lg text-gray-700 mb-4">
            Given the closed-book format, focus your memorization on the highest-yield areas:
          </p>
          <div className="space-y-4 my-6">
            {[
              { priority: "1", topic: "The 5 Scrum events in SAFe and what the SM does at each", desc: "Sprint Planning, Daily Stand-up, Sprint Review, Sprint Retrospective, Backlog Refinement. Know who facilitates, who attends, what the output is, and what problems the SM watches for." },
              { priority: "2", topic: "The SM's role in PI Planning", desc: "The SM is not silent at PI Planning — they facilitate team breakouts, help write Team PI Objectives, identify risks, and surface dependencies. Know the difference between SM and PO roles during PI Planning specifically." },
              { priority: "3", topic: "Servant leadership behaviors (the SM does/doesn't do list)", desc: "The SM empowers, facilitates, and coaches. The SM doesn't assign work, make product decisions, or manage individuals. Know the line clearly because many questions test exactly this boundary." },
              { priority: "4", topic: "Scrum of Scrums and ART-level SM coordination", desc: "How SMs collaborate across the ART, what they bring to Scrum of Scrums, and what the RTE's role is vs the SM's role at ART-level events." },
            ].map((s) => (
              <div key={s.priority} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">{s.priority}</div>
                <div>
                  <strong className="block text-gray-900 text-sm mb-1">{s.topic}</strong>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="SAFe SSM, manufacturing sector">
            I failed my first attempt by 2 questions. I&apos;d read the content but hadn&apos;t practiced under time pressure. Second attempt, I did two timed practice exams beforehand and passed easily. The discipline of answering quickly is a skill — practice it.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the SSM exam really closed book?</p>
              <p className="text-lg text-gray-700">Yes. Unlike the SA (Leading SAFe) exam, which is open-book, the SSM exam does not allow reference materials during the exam. You should be familiar with SAFe team-level content well enough to answer without referencing the SAFe website or course slides.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should I study after the course before taking the exam?</p>
              <p className="text-lg text-gray-700">Most candidates benefit from 1–3 days of review after the 2-day course. Review your course slides, do practice questions, and take a full timed practice exam before sitting the real one. Taking the exam same-day as the course is possible but risky — retention is better after a short review period.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text="gray-900 mb-2">What happens if I fail the SSM exam?</p>
              <p className="text-lg text-gray-700">You get one free retake within 30 days of your first attempt. Additional retakes require a fee. After a failed attempt, you receive a domain breakdown showing which areas to study. Focus your retake preparation on the lowest-scoring domains rather than reviewing everything equally.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get Trainer-Led SSM Preparation</p>
            <p className="mb-5">Our SAFe SSM course includes exam prep exercises, practice questions, and trainer guidance on the specific patterns tested in the closed-book exam.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-scrum-master-prerequisites" className="text-[#01203d] underline hover:no-underline">SSM prerequisites</Link>
            {" · "}
            <Link href="/blog/ssm-salary" className="text-[#01203d] underline hover:no-underline">SSM salary guide</Link>
            {" · "}
            <Link href="/blog/safe-advanced-scrum-master-vs-ssm" className="text-[#01203d] underline hover:no-underline">SSM vs SASM comparison</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
