import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POPM Exam Questions: SAFe Product Owner Product Manager Prep Guide | Agile36",
  description:
    "SAFe POPM exam questions with answer rationale. Covers vision, roadmaps, PI Planning, customer centricity, and the exact format of the POPM certification test.",
  keywords: [
    "POPM exam questions",
    "SAFe Product Owner Product Manager exam",
    "POPM certification exam prep",
    "SAFe POPM practice questions",
    "POPM exam format",
    "SAFe product management certification",
  ],
  openGraph: {
    title: "POPM Exam Questions: SAFe Product Owner Product Manager Prep Guide",
    description:
      "SAFe POPM exam questions with answer rationale. Covers vision, roadmaps, PI Planning, customer centricity, and the exact format of the POPM certification test.",
    url: "https://www.agile36.com/blog/popm-exam-questions",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/popm-exam-questions" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The POPM exam is <strong>45 questions, 90 minutes, closed book</strong>, proctored online. Passing score is 73% (33/45).</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Questions test <strong>Product Manager and Product Owner roles</strong> — their responsibilities in PI Planning, backlog management, vision, roadmap, and customer centricity.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The highest-weight topic is the <strong>distinction between PM and PO</strong> — most exam failures stem from confusing these two distinct SAFe roles.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Candidates with product or BA background typically need <strong>2–3 days of post-class study</strong> to pass comfortably on first attempt.</span></li>
      </ul>
    </section>
  );
}

function TopicBars() {
  const topics = [
    { label: "Product Management vs. Product Owner Distinction", pct: 30 },
    { label: "PI Planning: PM and PO Roles", pct: 25 },
    { label: "Customer Centricity & Design Thinking", pct: 20 },
    { label: "Vision, Roadmap, and Program Backlog", pct: 15 },
    { label: "Release on Demand & DevOps Integration", pct: 10 },
  ];
  return (
    <section aria-label="POPM exam topic distribution" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">POPM Exam Topic Distribution</h3>
      <div className="space-y-3">
        {topics.map((t) => (
          <div key={t.label}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{t.label}</span><span className="font-bold">{t.pct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div className="h-5 rounded-full bg-[#01203d]" style={{ width: `${t.pct * 3.2}%` }} />
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
  const items = [
    "The PM-PO distinction is the single highest-leverage topic on the POPM exam — know both roles cold before walking in.",
    "PI Planning is tested heavily — specifically what Product Managers and Product Owners do differently during the event.",
    "Customer centricity questions require you to understand Design Thinking concepts, not just product backlog mechanics.",
    "The exam is closed book with 90 minutes for 45 questions — study for reasoning, not memorization.",
    "Agile36's Pro plan includes practice exams and a free retake — critical if you're in a role without much SAFe context.",
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

export default function PopmExamQuestionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          POPM Exam Questions: SAFe Product Owner Product Manager Prep Guide
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>POPM Exam Questions</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Exam Prep · 10 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          POPM Exam Questions: SAFe Product Owner Product Manager Prep Guide
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The <strong>POPM exam</strong> — SAFe Product Owner / Product Manager — consistently surprises candidates who expect it to be a straightforward product management test. The exam doesn't test product theory in the abstract. It tests how Product Managers and Product Owners operate inside an Agile Release Train, and that requires understanding two distinct roles and how they interact at PI Planning, during iterations, and at the program level. The{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">POPM course</Link>{" "}
            covers both roles in depth — this guide helps you understand what the exam tests and how to prepare effectively.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Exam Format</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {[
              { label: "Questions", value: "45" },
              { label: "Time", value: "90 min" },
              { label: "Pass Score", value: "73%" },
              { label: "To Pass", value: "33 / 45" },
              { label: "Format", value: "Closed book" },
              { label: "Delivery", value: "Online proctored" },
            ].map((s) => (
              <div key={s.label} className="bg-[#01203d] text-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{s.value}</div>
                <div className="text-sm mt-1 text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>

          <TopicBars />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Representative POPM Exam Questions</h2>
          <div className="space-y-8 my-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q1. During PI Planning, which role is responsible for presenting the product vision and roadmap?</p>
              <p className="text-gray-700 mb-3">A) Product Owner<br/>B) Product Manager<br/>C) Release Train Engineer<br/>D) Business Owner</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: B</p>
                <p className="text-green-800 text-sm mt-1">Product Managers own the vision and roadmap at the program level and present it on Day 1 of PI Planning. Product Owners own the team backlog and translate program-level features into team-level stories. This distinction is tested repeatedly.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q2. A Product Owner's primary responsibility during iteration execution is:</p>
              <p className="text-gray-700 mb-3">A) Updating the program roadmap<br/>B) Defining the product vision<br/>C) Accepting or rejecting completed stories and managing team backlog priority<br/>D) Coordinating across multiple teams</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: C</p>
                <p className="text-green-800 text-sm mt-1">POs own the team backlog and story-level acceptance. PMs own the program backlog and feature-level prioritization. Both roles participate in PI Planning, but their day-to-day execution scope is different.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q3. Which Design Thinking element involves rapid prototype testing with actual customers?</p>
              <p className="text-gray-700 mb-3">A) Empathize<br/>B) Define<br/>C) Prototype<br/>D) Test</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: D</p>
                <p className="text-green-800 text-sm mt-1">The SAFe POPM exam tests basic Design Thinking literacy. The five stages are: Empathize, Define, Ideate, Prototype, Test. Test is where actual customer feedback informs whether the prototype solves the right problem.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q4. What is the purpose of the Program Backlog?</p>
              <p className="text-gray-700 mb-3">A) To hold all user stories for the current sprint<br/>B) To capture all team-level impediments<br/>C) To hold prioritized features waiting to be implemented by the ART<br/>D) To document the PI objectives</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: C</p>
                <p className="text-green-800 text-sm mt-1">The Program Backlog is owned by the Product Manager and contains prioritized features (not stories). Features get broken down into stories by Product Owners. Confusing the program and team backlog levels is a common exam mistake.</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <p className="font-bold text-gray-900 mb-2">Q5. An ART is releasing features but customers report the features don't solve their actual problems. Which practice would most directly address this?</p>
              <p className="text-gray-700 mb-3">A) Increasing velocity by reducing iteration length<br/>B) Adding more Business Owners to PI Planning<br/>C) Applying Design Thinking to deeply understand customer needs before building<br/>D) Implementing SAFe DevOps practices</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">Correct: C</p>
                <p className="text-green-800 text-sm mt-1">This is a classic customer centricity question. The problem is upstream — requirements are being defined without sufficient customer understanding. Design Thinking's Empathize and Define stages address this before the build cycle starts.</p>
              </div>
            </div>
          </div>

          <PullQuote attribution="POPM-certified Product Manager, healthcare IT">
            The PM-PO distinction was the entire exam. I knew product management — I didn&apos;t know the SAFe-specific split of responsibilities. Once I understood that, everything else clicked.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How PM and PO Roles Split in SAFe</h2>
          <p className="text-lg text-gray-700 mb-4">
            The most important concept for passing the POPM exam is the clear division between Product Manager (program-level) and Product Owner (team-level) responsibilities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-[#01203d] text-white rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-3">Product Manager (Program Level)</h4>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>• Owns product vision and roadmap</li>
                <li>• Presents vision at PI Planning</li>
                <li>• Prioritizes and manages Program Backlog</li>
                <li>• Works with customers, sales, and leadership</li>
                <li>• Defines features (not stories)</li>
                <li>• Coordinates across multiple teams</li>
              </ul>
            </div>
            <div className="bg-[#134263] text-white rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-3">Product Owner (Team Level)</h4>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>• Owns and prioritizes team backlog</li>
                <li>• Writes and refines user stories</li>
                <li>• Accepts or rejects completed stories</li>
                <li>• Participates in team iteration events</li>
                <li>• Clarifies requirements for the team</li>
                <li>• Bridges team and program levels</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the POPM exam harder than Leading SAFe?</p>
              <p className="text-lg text-gray-700">Comparable difficulty. POPM goes deeper on product roles and Design Thinking, while Leading SAFe covers broader leadership topics. Candidates with strong product backgrounds often find POPM easier; those with leadership backgrounds may find Leading SAFe more intuitive.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I take POPM without taking Leading SAFe first?</p>
              <p className="text-lg text-gray-700">Yes. POPM has no prerequisite chain. But candidates who take Leading SAFe first have stronger SAFe framework context and typically perform better on POPM. For product professionals new to SAFe, Leading SAFe → POPM is a smart sequence.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many questions can I miss?</p>
              <p className="text-lg text-gray-700">You need 33 correct out of 45 to pass (73%). That means you can miss up to 12. Flag uncertain questions and return to them — the 90-minute window is sufficient for most candidates.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's the most effective way to prepare?</p>
              <p className="text-lg text-gray-700">Study the PM-PO distinction deeply. Review the PI Planning agenda from both a PM and PO perspective. Understand Design Thinking's five stages. Take a full practice test 3 days after class. Our Pro plan practice exams are calibrated to the actual question style.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long is the POPM certification valid?</p>
              <p className="text-lg text-gray-700">One year from the date of passing. Annual renewal requires a fee and continuing education credits. Scaled Agile will send renewal reminders before expiration.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Register for SAFe POPM</p>
            <p className="mb-5">Live virtual and in-person. Pro plan includes practice exams and a free retake.</p>
            <Link href="/courses/product-owner-manager" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View POPM course dates
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-lpm-vs-popm" className="text-[#01203d] underline hover:no-underline">SAFe LPM vs POPM</Link>
            {" · "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] underline hover:no-underline">PI Planning explained</Link>
            {" · "}
            <Link href="/courses/leading-safe" className="text-[#01203d] underline hover:no-underline">Leading SAFe course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
