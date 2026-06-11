import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leading SAFe Exam Tips: How to Pass the SA Certification on Your First Try | Agile36",
  description:
    "Practical tips for passing the Leading SAFe (SA) exam. What to study, how the questions are structured, common traps, and what most candidates get wrong.",
  keywords: ["leading SAFe exam tips", "SA exam tips", "how to pass leading SAFe exam", "SAFe agilist exam prep", "SA certification tips", "leading SAFe study guide"],
  openGraph: {
    title: "Leading SAFe Exam Tips: How to Pass the SA Certification on Your First Try",
    description: "What to study, how to read SA exam questions, and how to avoid the most common traps.",
    url: "https://www.agile36.com/blog/leading-safe-exam-tips",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/leading-safe-exam-tips" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Leading SAFe exam is <strong>45 questions, 90 minutes, 73% pass rate required</strong> — meaning you need to answer at least 33 questions correctly. It is an open-book, online exam.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most tested topic areas are: <strong>Lean-Agile Mindset, SAFe Principles, Business Agility, and PI Planning</strong>. These four areas account for roughly 50–60% of questions.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Questions are scenario-based — they describe a situation and ask what the "SAFe answer" is. <strong>Recognizing Lean-Agile thinking patterns</strong> matters more than memorizing definitions.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Most failures come from: <strong>not reading the question carefully</strong>, picking intuitively correct answers that aren&apos;t the SAFe answer, and running out of time on the last 10 questions.</span></li>
      </ul>
    </section>
  );
}

function TopicWeightBars() {
  const topics = [
    { topic: "Lean-Agile Mindset & Principles", pct: 88, weight: "~25%" },
    { topic: "Business Agility & Leadership", pct: 70, weight: "~18%" },
    { topic: "PI Planning & ART Execution", pct: 75, weight: "~20%" },
    { topic: "SAFe Roles & Events", pct: 65, weight: "~17%" },
    { topic: "Portfolio & Value Streams", pct: 50, weight: "~12%" },
    { topic: "Continuous Delivery & DevOps", pct: 32, weight: "~8%" },
  ];
  return (
    <section aria-label="Leading SAFe exam topic weights" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Approximate Topic Distribution (SA Exam)</h3>
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
      <p className="text-xs text-gray-500 mt-2">Based on SAFe exam content outline and candidate reports. Topic weights shift slightly between SAFe versions.</p>
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
    "Read every question twice. SA exam questions often contain key constraints — 'in the current PI', 'as the RTE', 'at the ART level' — that eliminate 2 of 4 answer options immediately.",
    "The SAFe answer is usually the most collaborative, most incremental, most Lean-Agile option. If you're torn between two answers, the one that emphasizes early feedback, decentralized decisions, and servant leadership is usually correct.",
    "Know the 10 Lean-Agile Principles cold. Questions map scenarios to principles constantly — 'which principle does this behavior reflect?' is a common question format.",
    "Don't over-study the Big Picture visual. Know the three levels (Team, Program, Portfolio), the key roles and events at each, and how they connect. Granular memorization of every icon is not what's tested.",
    "Use the open-book permission strategically. Have the SAFe website open in a second window. For definition questions, it's faster to search than to guess. But don't use it for every question — time management is the constraint.",
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

export default function LeadingSAFEExamTipsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Leading SAFe Exam Tips: How to Pass the SA Certification on Your First Try
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Leading SAFe Exam Tips</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Exam Prep</span>
          <span className="text-sm text-[#718aa5]">Study Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Leading SAFe Exam Tips: How to Pass the SA Certification on Your First Try
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Leading SAFe (SA) exam is not a memorization test — it&apos;s a pattern-recognition test. Questions present scenarios and ask you to identify the Lean-Agile response. Candidates who pass on their first attempt don&apos;t necessarily know more SAFe content than those who fail — they read questions more carefully and understand what the exam is actually measuring. This guide covers the specific preparation strategies that work, from someone who runs{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe training</Link>{" "}
            and has seen hundreds of candidates go through the exam.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Exam Format: What You&apos;re Actually Facing</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SA exam is 45 questions with a 90-minute time limit. You need 73% — 33 correct answers — to pass. The exam is administered online through Scaled Agile&apos;s testing platform and is open-book: you can have SAFe materials open in another browser tab. This doesn&apos;t make it easy — it means you have 2 minutes per question on average, which isn&apos;t enough time to look up everything.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Questions are multiple-choice, single-answer. There&apos;s no partial credit and no negative marking, so guessing is better than skipping. All questions are scenario-based — you won&apos;t see "define this term" questions. You&apos;ll see "a team is struggling with X, the RTE should do Y" questions.
          </p>

          <TopicWeightBars />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What to Study (Prioritized)</h2>
          <p className="text-lg text-gray-700 mb-4">
            Based on the exam content outline and candidate feedback, study in this order:
          </p>
          <div className="space-y-4 my-6">
            {[
              { priority: "1", topic: "Lean-Agile Mindset and Principles", desc: "Know all 10 principles and their source (Lean, agile, Reinertsen, systems thinking). Be able to identify which principle a scenario reflects or violates. This is the single most-tested area." },
              { priority: "2", topic: "PI Planning", desc: "Know the two-day flow: vision, team breakouts, draft plan review, final plan, confidence vote. Know who does what and when. Know what happens if PI Planning is skipped or done poorly." },
              { priority: "3", topic: "Business Agility", desc: "Know the seven core competencies of the Lean Enterprise and what Business Agility means beyond IT. Know the difference between technical agility and business agility." },
              { priority: "4", topic: "ART roles and events", desc: "RTE, Product Management, System Architect, Business Owner — know what each does and what they don't do. Know System Demo and Inspect & Adapt in detail." },
              { priority: "5", topic: "Lean Portfolio Management basics", desc: "Know Portfolio Kanban, value stream funding, and how portfolio connects to ART. You don't need LPM-depth for the SA exam, but you need the concepts." },
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

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common Traps and How to Avoid Them</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SA exam has predictable traps. Recognizing them before the exam makes the difference between a first-pass and a retake.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="text-red-800 font-bold mb-2">Common traps</h4>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• Picking the "common sense" answer, not the SAFe answer</li>
                <li>• Confusing team-level and ART-level scope (reading "SM" as "RTE")</li>
                <li>• Ignoring constraints in the question ("in the current PI…")</li>
                <li>• Spending 5+ minutes on one question and rushing the last 10</li>
                <li>• Over-relying on open-book access and running out of time</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-2">Winning strategies</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Read the question stem last, after reading all 4 options</li>
                <li>• Mark difficult questions and return — don&apos;t stall</li>
                <li>• Eliminate answers that are command-and-control or top-down</li>
                <li>• When in doubt, pick the most collaborative, servant-leader answer</li>
                <li>• Do 2 full practice exams before sitting the real one</li>
              </ul>
            </div>
          </div>

          <PullQuote attribution="SA-certified Agile Coach">
            The exam asks what a Lean-Agile leader would do, not what most managers do. Most managers centralize, control, and report. Most SAFe exam answers decentralize, empower, and inspect-and-adapt. Once I understood that distinction, the exam became much more predictable.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the pass rate for the Leading SAFe exam?</p>
              <p className="text-lg text-gray-700">SAFe publishes a 73% passing score requirement (33/45 questions), not a pass rate for candidates. Based on trainer feedback and community reports, most candidates who complete the 2-day training and do 1–2 practice exams pass on their first attempt. Candidates who take the exam immediately after class without additional study have higher fail rates.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many retakes do I get?</p>
              <p className="text-lg text-gray-700">The first retake is free within 30 days. Subsequent retakes require a fee. Most candidates who fail once pass on the second attempt after targeted study of the areas they struggled with in the first exam. The exam platform gives you a domain breakdown after your attempt.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I take the exam immediately after the course?</p>
              <p className="text-lg text-gray-700">You have 30 days after the course to take the exam. Most candidates perform best when they take 1–2 days after the course for review, then sit the exam. Taking it same-day or next-day works for some candidates; waiting more than 2 weeks without additional study tends to reduce retention of the course-specific content.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the SA exam harder than the SSM exam?</p>
              <p className="text-lg text-gray-700">Different in scope, similar in difficulty. The SSM exam tests team-level Scrum facilitation in SAFe. The SA exam tests enterprise-level leadership, principles, and transformation — a broader conceptual range. Candidates with strong agile coaching backgrounds often find the SA exam more natural than the SSM, while practitioners coming from team roles sometimes find the SA more challenging.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Prepare with Expert-Led Training</p>
            <p className="mb-5">Our Leading SAFe course includes exam preparation, practice questions, and trainer guidance on the most-tested content areas.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/leading-safe-exam-questions" className="text-[#01203d] underline hover:no-underline">Leading SAFe practice questions</Link>
            {" · "}
            <Link href="/blog/safe-principles-explained" className="text-[#01203d] underline hover:no-underline">SAFe principles explained</Link>
            {" · "}
            <Link href="/blog/safe-agilist-salary" className="text-[#01203d] underline hover:no-underline">SAFe Agilist salary</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
