import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leading SAFe Exam Questions: What to Expect & How to Prepare | Agile36",
  description:
    "Practice Leading SAFe exam questions with answer rationale. Covers SAFe principles, PI Planning, ART roles, and the exact format of the SA certification test.",
  keywords: [
    "Leading SAFe exam questions",
    "SAFe Agilist exam questions",
    "Leading SAFe exam prep",
    "SA certification exam",
    "Leading SAFe practice test",
    "SAFe exam tips",
  ],
  openGraph: {
    title: "Leading SAFe Exam Questions: What to Expect & How to Prepare",
    description:
      "Practice Leading SAFe exam questions with answer rationale. Covers SAFe principles, PI Planning, ART roles, and the exact format of the SA certification test.",
    url: "https://www.agile36.com/blog/leading-safe-exam-questions",
    siteName: "Agile36",
    type: "article",
  },
  alternates: {
    canonical: "https://www.agile36.com/blog/leading-safe-exam-questions",
  },
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
      </div>
    </>
  );
}

function ExecutiveSummary() {
  return (
    <section
      aria-label="At a glance"
      className="bg-gray-50 border-l-4 border-[#01203d] p-6 md:p-8 my-10 rounded-r-lg"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#01203d] font-bold mb-4">
        At a glance
      </p>
      <ul className="space-y-3 text-gray-800 text-[17px] leading-relaxed">
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">01</span>
          <span>
            The Leading SAFe exam has <strong>45 multiple-choice questions</strong>, a 90-minute time limit, and requires 73% (33/45) to pass — it is web-based and proctored online.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">02</span>
          <span>
            Questions focus on <strong>SAFe principles, Lean-Agile mindset, PI Planning mechanics, ART roles, and value streams</strong> — not rote memorization of SAFe diagrams.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">03</span>
          <span>
            Most candidates who study the SAFe Big Picture, attend the 2-day class, and complete one full practice test pass on the first attempt.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">04</span>
          <span>
            Agile36's Pro plan includes practice exams and a <strong>free exam retake</strong>, eliminating the $50 retake fee if you fall short.
          </span>
        </li>
      </ul>
    </section>
  );
}

function ExamTopicGrid() {
  const topics = [
    { label: "Lean-Agile Mindset & SAFe Principles", pct: 28, color: "#01203d" },
    { label: "Team & Technical Agility", pct: 20, color: "#134263" },
    { label: "Agile Product Delivery & PI Planning", pct: 22, color: "#01203d" },
    { label: "Enterprise Solution Delivery", pct: 15, color: "#134263" },
    { label: "Lean Portfolio Management", pct: 10, color: "#01203d" },
    { label: "Leading Change", pct: 5, color: "#134263" },
  ];
  return (
    <section aria-label="Leading SAFe exam topic breakdown" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Exam Topic Distribution</h3>
      <div className="space-y-3">
        {topics.map((t) => (
          <div key={t.label}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{t.label}</span>
              <span className="font-bold">{t.pct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div
                className="h-5 rounded-full"
                style={{ width: `${t.pct * 3.5}%`, backgroundColor: t.color }}
              />
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
      <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug italic">
        {children}
      </p>
      <footer className="text-sm text-gray-600 mt-3 not-italic">— {attribution}</footer>
    </blockquote>
  );
}

function KeyTakeaways() {
  const items = [
    "The Leading SAFe exam tests application of principles, not diagram recall — study by reasoning through scenarios.",
    "73% passing score means you can miss 12 questions and still pass. Time management matters more than perfection.",
    "PI Planning, ART roles, and Lean-Agile leadership are the highest-weighted topics and the safest places to invest study time.",
    "Take the exam within 30 days of class while the material is fresh — first-attempt pass rates drop significantly beyond 60 days.",
    "If you don't pass, Agile36's Pro plan covers your retake and adds practice exams, LinkedIn optimization, and interview prep.",
  ];
  return (
    <section
      aria-label="Key takeaways"
      className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">
        Key takeaways
      </p>
      <ol className="space-y-5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="text-yellow-400 font-bold text-lg min-w-[28px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[17px] leading-relaxed text-gray-100">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function LeadingSafeExamQuestionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Leading SAFe Exam Questions: What to Expect & How to Prepare
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link>
          <span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link>
          <span>/</span>
          <span>Leading SAFe Exam Questions</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">
            SAFe Certification
          </span>
          <span className="text-sm text-[#718aa5]">Exam Prep · 10 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Leading SAFe Exam Questions: What to Expect & How to Prepare
        </h1>
        <p className="text-base text-gray-500 mb-10">
          By Agile36 · SAFe Silver Partner · Updated April 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The <strong>Leading SAFe exam</strong> trips up practitioners who study the wrong things. After training over 25,000 professionals at Agile36, the pattern is consistent: candidates who fail spent too much time memorizing the SAFe Big Picture diagram and not enough time reasoning through how SAFe principles apply in real enterprise scenarios. The{" "}
            <Link
              href="/courses/leading-safe"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              Leading SAFe course
            </Link>{" "}
            is designed to build that reasoning — but you still need a deliberate prep strategy.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            This guide covers the actual exam format, the topics that carry the most weight, representative practice questions with answer rationale, and the study approach that consistently produces first-attempt passes.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Exam Format: The Basics
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            The Leading SAFe (SA) exam is a closed-book, web-based proctored assessment delivered through Scaled Agile's online platform. Here are the specifics:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {[
              { label: "Questions", value: "45" },
              { label: "Time Limit", value: "90 min" },
              { label: "Passing Score", value: "73%" },
              { label: "Questions to Pass", value: "33 / 45" },
              { label: "Format", value: "Multiple choice" },
              { label: "Attempts Included", value: "1 (first)" },
            ].map((s) => (
              <div key={s.label} className="bg-[#01203d] text-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{s.value}</div>
                <div className="text-sm mt-1 text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700 mb-4">
            You have 90 minutes to answer 45 questions — that's exactly 2 minutes per question. The pace is manageable if you're prepared. Questions you're unsure about can be flagged and revisited. Most candidates finish with 15–20 minutes to spare.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Retakes cost $50 if not covered. The{" "}
            <Link
              href="/courses/leading-safe"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              Agile36 Pro plan
            </Link>{" "}
            includes a free retake, practice exams, and resume review for the full certification path.
          </p>

          <ExamTopicGrid />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Representative Exam Questions with Rationale
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            These are representative of the style and difficulty you'll encounter. Scaled Agile does not release official practice questions, but after years of training SA candidates we've mapped the pattern closely.
          </p>

          <div className="space-y-8 my-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q1. What is the primary purpose of PI Planning?</p>
              <p className="text-gray-700 mb-3">A) To assign work to individual contributors<br/>B) To align teams on a common mission and coordinate dependencies<br/>C) To create the program backlog<br/>D) To evaluate team velocity</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: B</p>
                <p className="text-green-800 text-sm mt-1">PI Planning is a face-to-face or virtual event that aligns all ART teams on a shared mission and vision. Dependency coordination is a core output — not individual task assignment. This is Lean-Agile leadership applied at scale.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q2. Which SAFe principle directly addresses the challenge of large-scale coordination delays?</p>
              <p className="text-gray-700 mb-3">A) Apply systems thinking<br/>B) Assume variability; preserve options<br/>C) Organize around value<br/>D) Decentralize decision-making</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: D</p>
                <p className="text-green-800 text-sm mt-1">Decentralizing decision-making pushes decisions to the team or program level where information exists, eliminating wait time caused by escalation. This is one of the 10 SAFe principles — know all 10.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q3. An ART is consistently delivering features that don't match business priorities. What is the most likely root cause?</p>
              <p className="text-gray-700 mb-3">A) Teams are not following Scrum events<br/>B) The RTE is not running PI Planning correctly<br/>C) The portfolio is not connected to enterprise strategy<br/>D) Business owners are not participating in PI Planning</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: D</p>
                <p className="text-green-800 text-sm mt-1">Business Owners play a specific PI Planning role: they assign business value to team PI objectives, ensuring alignment between delivery and strategy. When they're absent, technical priorities drift from business value.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q4. What does the SAFe "House of Lean" emphasize as the primary goal?</p>
              <p className="text-gray-700 mb-3">A) Quality<br/>B) Innovation<br/>C) Value<br/>D) Continuous improvement</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: C</p>
                <p className="text-green-800 text-sm mt-1">The SAFe House of Lean has "Value" at the roof — the ultimate goal. The four pillars (respect for people and culture, flow, innovation, relentless improvement) support it. Leaders often confuse pillars with the goal.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q5. Which measure best indicates an ART is achieving business agility?</p>
              <p className="text-gray-700 mb-3">A) Sprint velocity trending upward<br/>B) Time to market for new capabilities decreasing<br/>C) Team satisfaction scores improving<br/>D) Number of completed features per PI</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: B</p>
                <p className="text-green-800 text-sm mt-1">Business agility is measured by speed to value delivery, not internal team metrics. Time to market for capabilities directly reflects how quickly the organization responds to customer and market needs — the SAFe definition of success.</p>
              </div>
            </div>
          </div>

          <PullQuote attribution="Senior SPC, Agile36 instructor">
            The candidates who fail aren&apos;t slow — they&apos;re answering a different exam. They're looking for diagram details when the questions want principle application.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            The Topics That Carry the Most Weight
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Based on the official SA study guide and years of debriefs with candidates, these are the highest-leverage areas:
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">1. The 10 SAFe Principles</h3>
          <p className="text-lg text-gray-700 mb-4">
            Know all 10 by number and concept. Questions don't just ask you to identify a principle — they present a scenario and ask which principle explains what should happen next. Common traps: mixing up Principle 4 (Build incrementally with fast, integrated learning cycles) with Principle 3 (Assume variability; preserve options).
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">2. PI Planning Mechanics</h3>
          <p className="text-lg text-gray-700 mb-4">
            Know the two-day PI Planning agenda cold: Day 1 vision, architecture briefing, team breakouts; Day 2 draft plan review, risk board, final plans with confidence vote. Know what Business Owners, RTEs, Product Managers, and System Architects do during the event. The{" "}
            <Link
              href="/blog/pi-planning-explained"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              PI Planning explained guide
            </Link>{" "}
            walks through the full cadence.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">3. Lean-Agile Leadership Behaviors</h3>
          <p className="text-lg text-gray-700 mb-4">
            This section tests whether leaders know how to model Lean-Agile behaviors — not just understand them. Questions often present a leadership failure and ask which behavior would address it. Servant leadership, psychological safety, and creating a culture of relentless improvement are recurring themes.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">4. Value Streams and ARTs</h3>
          <p className="text-lg text-gray-700 mb-4">
            Know the difference between operational and development value streams. Understand how ARTs are sized (50–125 people) and structured. Questions test whether you can identify when a value stream is poorly organized and what reorganizing around value would look like. Our{" "}
            <Link
              href="/blog/safe-agile-release-train-explained"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              Agile Release Train explainer
            </Link>{" "}
            covers this in depth.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Study Plan: 3 Days to Pass
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            If you've attended the 2-day class, 3 additional days of focused prep is usually enough. Here's the sequence:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-4">
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
              <div><strong>Day 1:</strong> Review the 10 SAFe Principles with examples. Write out 2–3 real-world scenarios where each principle applies. Don't memorize — reason.</div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
              <div><strong>Day 2:</strong> Walk through the PI Planning agenda and draw from memory. Study ART roles and their responsibilities during PI. Review the Lean Portfolio Management layer.</div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
              <div><strong>Day 3:</strong> Take a full practice test under timed conditions. Review every missed question — not just the right answer, but why each distractor is wrong. Schedule the exam for the following day.</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the Leading SAFe exam open book?</p>
              <p className="text-lg text-gray-700">No. The SA exam is closed book and proctored online. You cannot access the SAFe website, your notes, or any other materials during the exam. Prepare accordingly — the concepts need to be internalized.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long is the Leading SAFe exam valid?</p>
              <p className="text-lg text-gray-700">The SA certification is valid for one year from the date you pass. Renewal requires a $95 fee and continuing education units. Scaled Agile sends renewal reminders 60 days before expiration.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What happens if I don't pass?</p>
              <p className="text-lg text-gray-700">The first retake costs $50 through Scaled Agile. Agile36's Pro plan includes a free retake for students. Wait at least 24 hours before reattempting, review your weak areas, and schedule within 30 days while the material is fresh.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many questions can I miss and still pass?</p>
              <p className="text-lg text-gray-700">You need 33 correct out of 45 (73%). That means you can miss up to 12 questions. Questions aren't weighted by difficulty — each is worth one point.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I take the exam the same day as the class?</p>
              <p className="text-lg text-gray-700">No. The class ends Day 2 — you're exhausted and haven't reviewed. Take 2–5 days to study, then schedule the exam. Beyond 30 days, pass rates decline as material fades.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Are there official Scaled Agile practice tests?</p>
              <p className="text-lg text-gray-700">Scaled Agile does not publish official practice tests. The Agile36 Pro plan includes proprietary practice exams. Various third-party sets exist online, but quality varies — focus on official study materials and reasoning over memorizing question banks.</p>
            </div>
          </div>

          <KeyTakeaways />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Ready to Earn Your SA?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            The Leading SAFe course at Agile36 runs virtually and in-person with a certified SPC trainer — not a pre-recorded video. Live instruction is the single best predictor of first-attempt pass rates, because scenarios get debated in real time.
          </p>
          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Register for Leading SAFe</p>
            <p className="mb-5">Live virtual and in-person sessions. Pro plan includes practice exams and a free retake.</p>
            <Link
              href="/courses/leading-safe"
              className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300"
            >
              View upcoming sessions
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] underline hover:no-underline">
              PI Planning explained
            </Link>
            {" · "}
            <Link href="/blog/leading-safe-certification-cost-2026" className="text-[#01203d] underline hover:no-underline">
              Leading SAFe certification cost
            </Link>
            {" · "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] underline hover:no-underline">
              SAFe Advanced Scrum Master
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
