import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTE Exam Questions: Practice Q&A for the SAFe Release Train Engineer Cert | Agile36",
  description:
    "Practice questions and detailed answers for the SAFe Release Train Engineer (RTE) certification exam. Covers ART facilitation, PI Planning, impediment removal, and Lean-Agile leadership.",
  keywords: ["RTE exam questions", "SAFe RTE certification questions", "release train engineer exam", "RTE practice questions", "SAFe RTE exam prep", "release train engineer certification"],
  openGraph: {
    title: "RTE Exam Questions: Practice Q&A for the SAFe Release Train Engineer Cert",
    description: "Practice questions with explanations for the SAFe RTE certification exam.",
    url: "https://www.agile36.com/blog/rte-exam-questions",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/rte-exam-questions" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The RTE exam is <strong>45 questions, 90 minutes</strong>, with a 73% pass rate (33/45). It tests ART-level facilitation, servant leadership, impediment escalation, and PI Planning orchestration.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The highest-weight topics are: <strong>RTE Responsibilities, PI Planning Facilitation, ART Execution, and Servant Leadership at Scale</strong>. Together these account for ~65% of questions.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The RTE exam is scenario-based — every question describes a situation the RTE faces and asks what to do. The correct answer is always the most <strong>servant-leader, systemic, and empowering</strong> option.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The RTE certification requires prior <strong>SAFe SA certification</strong> as a prerequisite — candidates must demonstrate Leading SAFe fluency before pursuing the RTE credential.</span></li>
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
  return (
    <section aria-label="Key takeaways" className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">Key takeaways</p>
      <ol className="space-y-5">
        {[
          "The RTE role is not a project manager. Every exam question that points toward assignment, control, or reporting is a trap. The RTE coaches, facilitates, and removes systemic impediments.",
          "Know PI Planning orchestration in detail — who does what on Day 1 vs Day 2, what the RTE facilitates vs what Product Management owns, and how confidence votes work.",
          "Scrum of Scrums is the RTE's primary weekly coordination tool. Know the difference between what SMs bring to the Scrum of Scrums and what escalates to the RTE's direct attention.",
          "The Inspect & Adapt workshop is RTE-led and has three specific phases: quantitative assessment, problem-solving workshop, and improvement backlog creation. Know the flow.",
          "For tricky questions: the answer that reduces hierarchy and increases team empowerment is usually correct. If an answer involves creating a new reporting structure or escalating to executives, it's usually wrong.",
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

const QUESTIONS = [
  {
    q: "During PI Planning, two teams identify a dependency that will require significant coordination. Neither team has allocated time for this. What should the RTE do?",
    options: ["A. Add the dependency to the Program Board and facilitate a cross-team discussion during the team breakout to resolve it", "B. Assign one team as the owner and instruct them to deliver the dependency", "C. Escalate the issue to the Product Management team for resolution", "D. Remove the dependency from the PI scope to avoid the coordination risk"],
    answer: "A",
    explanation: "The RTE facilitates — not decides. The Program Board is the tool for visualizing dependencies, and cross-team discussions during breakouts are the SAFe mechanism for resolving them. Assigning ownership (B) is directive, not servant leadership. Escalating to Product Management (C) is for business priority questions, not dependency resolution. Removing scope (D) is a Product Management decision, not an RTE decision."
  },
  {
    q: "An Agile team's velocity has dropped 30% for the past two sprints. The team's Scrum Master has been unable to identify the cause. As the RTE, what is the appropriate response?",
    options: ["A. Request a weekly velocity report from each Scrum Master and track trends at the ART level", "B. Meet with the Scrum Master to understand what they've tried, and offer coaching on impediment identification techniques", "C. Assign a senior developer to investigate and report back with a root cause analysis", "D. Reduce the team's sprint commitment for the next sprint to account for reduced capacity"],
    answer: "B",
    explanation: "The RTE coaches Scrum Masters — especially on challenges they haven't been able to resolve alone. Meeting to understand what's been tried and offering coaching is servant leadership. Requesting reports (A) creates overhead without solving the problem. Assigning a senior developer (C) bypasses the SM and the team. Reducing commitment (D) might be appropriate later but isn't the immediate RTE response."
  },
  {
    q: "At the end of PI Planning, the ART's confidence vote results in a 3 out of 5. What should the RTE do?",
    options: ["A. Accept the plan and proceed — a 3 is above average and indicates reasonable confidence", "B. Identify the primary concerns driving the low confidence score and work with teams and Product Management to address them before finalizing the plan", "C. Ask Business Owners to increase business value scores to improve team motivation", "D. Remove the lowest-priority features from the plan until confidence reaches 4 or 5"],
    answer: "B",
    explanation: "A confidence vote below 4 is a signal, not an outcome. The RTE facilitates identifying what's driving the low confidence and addresses those concerns — whether through scope adjustment, de-risking, or clarifying assumptions. A 3 is not acceptable for a robust plan (A is wrong). Business Owner scores don't change team confidence (C is wrong). Feature removal is Product Management's decision, not the RTE's to make unilaterally (D is wrong)."
  },
  {
    q: "Which of the following best describes the RTE's responsibility during the Inspect & Adapt workshop?",
    options: ["A. Facilitate the quantitative assessment, problem-solving workshop, and improvement backlog creation", "B. Present the PI metrics to Business Owners and defend the ART's performance", "C. Identify the root cause of each PI defect and assign corrective actions to team leads", "D. Approve the improvement items before they're added to the Program Backlog"],
    answer: "A",
    explanation: "The RTE facilitates the entire I&A workshop — all three phases. Defending performance (B) is not servant leadership and is not the RTE's posture. Assigning corrective actions to team leads (C) is directive, not coaching. Approving improvement items (D) is not the RTE's role — the ART owns its improvements, and Product Management/Product Owners prioritize the backlog."
  },
  {
    q: "A Scrum Master reports that an external dependency with another team outside the ART is consistently blocking their team's work. What should the RTE do?",
    options: ["A. Add the dependency to the Program Board and monitor it weekly", "B. Ask the Scrum Master to manage the external relationship directly", "C. Escalate the dependency to the appropriate ART-level or portfolio-level coordination mechanism and work to resolve it systemically", "D. Reduce the team's sprint velocity expectations to account for the external dependency"],
    answer: "C",
    explanation: "External dependencies that cross ART boundaries are system-level impediments — exactly the kind the RTE exists to remove. Escalating to the right coordination level (Solution Train, portfolio, or direct executive sponsor) is the appropriate systemic response. Just monitoring it (A) doesn't remove it. Asking the SM to manage external relationships (B) misuses the SM role. Adjusting velocity expectations (D) accepts the impediment rather than removing it."
  },
  {
    q: "During the System Demo, a Business Owner is dissatisfied with the progress on a key feature. They request that the team deprioritize their current sprint goal to focus on the feature. As the RTE, how should you respond?",
    options: ["A. Immediately reprioritize the team's sprint backlog to accommodate the Business Owner's request", "B. Explain that sprint goals are protected within the sprint and route the priority change to Product Management to address in the next PI Planning or backlog refinement", "C. Add the feature to the current sprint as additional scope", "D. Ask the team to work overtime to complete both the current sprint goal and the Business Owner's feature"],
    answer: "B",
    explanation: "Sprint goals are protected within the sprint — this is a SAFe principle. Business Owner priority changes are routed through Product Management and the Program Backlog, not imposed mid-sprint. Reprioritizing mid-sprint (A) destroys sprint goal integrity. Adding scope mid-sprint (C) does the same. Overtime (D) violates sustainable pace, a core Lean-Agile principle."
  },
  {
    q: "What is the primary difference between the RTE's role and a traditional Program Manager?",
    options: ["A. The RTE manages a larger budget than a traditional Program Manager", "B. The RTE focuses on servant leadership, team empowerment, and systemic impediment removal — not task assignment, reporting, or individual performance management", "C. The RTE has authority over individual team members that a Program Manager does not", "D. The RTE reports directly to the CEO while Program Managers report to middle management"],
    answer: "B",
    explanation: "This is the definitional distinction. The RTE is a servant leader who coaches teams and removes systemic impediments — not a command-and-control manager. Budget size (A), reporting structure (D), and individual authority (C) are irrelevant to the role distinction."
  },
  {
    q: "An ART has completed three consecutive PIs but velocity is not improving. The RTE wants to address this at the next Inspect & Adapt. What is the most appropriate approach?",
    options: ["A. Present a velocity improvement target and ask teams to commit to reaching it by the next PI", "B. Facilitate a structured problem-solving workshop to identify root causes of the velocity plateau and generate ART-level improvement backlog items", "C. Replace the lowest-performing teams with higher-velocity teams", "D. Reduce the scope of PI Planning to make ART commitments more achievable"],
    answer: "B",
    explanation: "The I&A problem-solving workshop is exactly the mechanism for this. Systemic issues like velocity plateaus require structured root cause analysis, not mandated targets (A is backwards — velocity targets from the top create gaming). Replacing teams (C) destroys the institutional knowledge that eventually drives velocity. Reducing scope at PI Planning (D) doesn't address the root cause."
  },
];

export default function RTEExamQuestionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          RTE Exam Questions: Practice Q&A for SAFe Release Train Engineer Cert
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>RTE Exam Questions</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Exam Prep</span>
          <span className="text-sm text-[#718aa5]">Practice Questions · 11 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          RTE Exam Questions: Practice Q&A for SAFe Release Train Engineer Cert
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe Release Train Engineer certification tests advanced ART leadership — PI Planning facilitation, servant leadership at scale, systemic impediment removal, and Inspect &amp; Adapt orchestration. These practice questions reflect the scenario-based format of the real exam. For candidates preparing for the{" "}
            <Link href="/courses/release-train-engineer" className="text-[#01203d] font-semibold underline hover:no-underline">RTE certification course</Link>,{" "}
            this guide covers the highest-yield content areas with explanations that go deeper than the correct answer.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Practice Questions with Explanations</h2>

          <div className="space-y-8">
            {QUESTIONS.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-5 border-b border-gray-200">
                  <p className="text-sm font-bold text-[#01203d] mb-3">Question {idx + 1}</p>
                  <p className="text-[16px] text-gray-900 leading-relaxed">{item.q}</p>
                </div>
                <div className="p-5">
                  <div className="space-y-2 mb-4">
                    {item.options.map((opt) => (
                      <div key={opt} className={`flex gap-2 text-sm p-2 rounded ${opt.startsWith(item.answer) ? "bg-green-50 border border-green-200" : "text-gray-600"}`}>
                        <span className={`font-bold flex-shrink-0 ${opt.startsWith(item.answer) ? "text-green-700" : "text-gray-400"}`}>{opt.charAt(0)}.</span>
                        <span className={opt.startsWith(item.answer) ? "text-green-800 font-medium" : ""}>{opt.slice(3)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#01203d] text-white rounded-lg p-4">
                    <p className="text-xs font-bold text-yellow-400 mb-2">EXPLANATION</p>
                    <p className="text-sm leading-relaxed text-gray-100">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="SAFe RTE, global telecommunications">
            Every RTE exam question I got wrong was one where I picked the intuitive answer instead of the servant-leader answer. My instinct was to solve the problem — the exam wanted me to empower the team to solve it. That one reframe changed my score significantly.
          </PullQuote>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Certify as a Release Train Engineer</p>
            <p className="mb-5">Expert-led RTE training covering ART launch, PI Planning facilitation, and the full RTE certification exam.</p>
            <Link href="/courses/release-train-engineer" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View RTE course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/rte-career-path" className="text-[#01203d] underline hover:no-underline">RTE career path</Link>
            {" · "}
            <Link href="/blog/rte-salary" className="text-[#01203d] underline hover:no-underline">RTE salary guide</Link>
            {" · "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">ART explained</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
