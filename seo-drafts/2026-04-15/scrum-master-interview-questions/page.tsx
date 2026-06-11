import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Interview Questions: What to Expect and How to Answer | Agile36",
  description:
    "Real Scrum Master interview questions with strong answers. What hiring managers ask, what they're listening for, and how to demonstrate servant leadership in an interview.",
  keywords: ["scrum master interview questions", "scrum master interview", "SM interview questions and answers", "agile scrum master interview", "scrum master job interview", "SAFe scrum master interview"],
  openGraph: {
    title: "Scrum Master Interview Questions: What to Expect and How to Answer",
    description: "The real Scrum Master interview questions and what strong answers look like.",
    url: "https://www.agile36.com/blog/scrum-master-interview-questions",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-interview-questions" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Scrum Master interviews test three things: <strong>agile knowledge</strong> (do you know Scrum?), <strong>servant leadership behavior</strong> (do you coach or direct?), and <strong>situational judgment</strong> (how do you handle real problems?).</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The biggest mistake candidates make is giving textbook answers. Interviewers want to hear <strong>specific situations</strong> — what happened, what you did, and what changed as a result (STAR format).</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>For SAFe SM roles, expect questions about <strong>PI Planning, Scrum of Scrums, ART-level coordination, and the SM&apos;s relationship with the RTE</strong> — team-only Scrum knowledge is insufficient.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Always have a prepared answer for: "tell me about an impediment you removed" and "how do you handle a Product Owner and development team in conflict." These appear in nearly every SM interview.</span></li>
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
          "Every behavioral question should be answered with a specific story — not a process description. 'When this happened, I did this, and the result was…' is the format that lands.",
          "Servant leadership is the through-line. Every answer should demonstrate that you empower, coach, and protect — not assign, control, or manage up.",
          "Prepare 5–7 situations from your experience in advance: an impediment you removed, a conflict you mediated, a sprint you rescued, a team dynamic you changed, and a stakeholder you managed.",
          "For SAFe SM roles, be prepared to explain what you do differently at PI Planning, how you participate in Scrum of Scrums, and how you interact with the RTE when things go wrong.",
          "Asking strong questions at the end of the interview signals seniority: 'How does this ART handle cross-team dependencies?' or 'What does the RTE expect from Scrum Masters at PI Planning?' shows you know what you're walking into.",
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
    q: "What's the difference between a Scrum Master and a project manager?",
    strong: "A project manager owns the plan and tracks individuals against it. I own the process and help the team own the outcomes. As a Scrum Master, I don't assign tasks, manage individual performance, or create project status reports. My job is to remove impediments so the team can self-organize effectively. In my last role at [company], I specifically had to hold this boundary when a VP tried to use our sprint reviews as project status updates. I redirected those conversations to the Product Owner, which protected the team and made the sprint reviews genuinely useful.",
    weak: "The Scrum Master focuses on agile practices while the project manager focuses on traditional delivery."
  },
  {
    q: "Tell me about an impediment you removed that had organizational significance.",
    strong: "We had a team at [company] that was waiting 2–3 weeks for infrastructure provisioning every sprint. I mapped the end-to-end process, identified that the bottleneck was a manual approval step requiring a VP signature, and brought it to the RTE's attention. Together, we got pre-approved capacity limits that the team could use without manual sign-off. Provisioning time dropped from weeks to hours. That team's velocity increased 40% over the next two PIs because they stopped building workarounds for what they couldn't get.",
    weak: "I regularly identified impediments in retrospectives and created action items to address them."
  },
  {
    q: "How do you handle a situation where the Product Owner is adding scope to a sprint mid-sprint?",
    strong: "This happened with a PO who had strong business pressure. My first step was a private conversation — not calling it out in front of the team. I explained that mid-sprint scope changes force the team to either compromise quality or miss the sprint goal, and that neither outcome serves the business well. We agreed on a rule: any new request that came in mid-sprint went to the backlog and was evaluated at the next sprint planning. Twice when the PO still pushed, I involved the team in a transparent conversation about tradeoffs. The team's ownership of the sprint goal was the most effective protection.",
    weak: "I would remind the Product Owner that the sprint backlog is locked during the sprint."
  },
  {
    q: "How have you improved team velocity or throughput?",
    strong: "I try to be careful here — velocity is a planning tool, not a performance target, so I don't talk about 'increasing velocity' as a goal. What I focus on is removing the things that slow teams down. At [company], our throughput improved 30% when I worked with the team to improve story quality in refinement. Stories that came to sprint planning poorly defined created rework and dependency problems mid-sprint. Better stories led to fewer interruptions — and throughput went up as a natural result. The improvement came from process quality, not pressure.",
    weak: "I helped the team increase their velocity by 20% by focusing on better estimation."
  },
  {
    q: "What do you do when a key developer is consistently missing stand-ups?",
    strong: "I'd start with curiosity, not correction. I'd have a private conversation to understand what's happening — is the time inconvenient, are they disengaged, are stand-ups not valuable to them? In one case, I learned a developer felt the stand-up format wasn't useful for remote work. We changed the format to async updates via a shared tool and a shorter focused discussion, and attendance improved naturally. If there were performance issues underlying the avoidance, I'd involve the team's functional manager — that's not my role to manage.",
    weak: "I would remind the developer of the importance of stand-ups and escalate to their manager if it continued."
  },
  {
    q: "For a SAFe role: What does a Scrum Master do at PI Planning?",
    strong: "At PI Planning, I'm one of the most active people in the room. I facilitate my team's breakout: helping us draft our Team PI Objectives, identify dependencies on the Program Board, flag risks with our ROAM exercise, and build a realistic iteration plan for the PI. I also make sure my team is realistic about capacity — accounting for holidays, team events, and known technical work. During the final plan review and confidence vote, I'm coaching my team to be honest about what they can commit to. After PI Planning, I make sure our objectives and the dependencies we own are visible and tracked.",
    weak: "The Scrum Master supports the team during PI Planning by attending and helping the team plan."
  },
];

export default function ScrumMasterInterviewQuestionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Interview Questions: What to Expect and How to Answer
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Interview Questions</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career</span>
          <span className="text-sm text-[#718aa5]">Interview Prep · 10 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Interview Questions: What to Expect and How to Answer
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Scrum Master interviews are harder to fake than most people expect. Interviewers who know the role can tell the difference between someone who understands servant leadership and someone who has read about it. This guide covers the questions that actually get asked — and what strong versus weak answers look like. If you&apos;re pursuing an enterprise SAFe SM role, certification through the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe SSM course</Link>{" "}
            gives you the vocabulary and framework employers are evaluating.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Questions with Strong and Weak Answer Examples</h2>

          <div className="space-y-8">
            {QUESTIONS.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-5 border-b border-gray-200">
                  <p className="text-sm font-bold text-[#01203d] mb-1">Question {idx + 1}</p>
                  <p className="text-[17px] font-semibold text-gray-900">{item.q}</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-green-800 mb-2">✓ STRONG ANSWER</p>
                    <p className="text-sm text-green-900 leading-relaxed">{item.strong}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-red-800 mb-2">✗ WEAK ANSWER (too generic)</p>
                    <p className="text-sm text-red-900 leading-relaxed">{item.weak}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="Hiring Manager, enterprise technology">
            I can tell in the first 10 minutes whether a Scrum Master candidate has actually done the job or just knows the theory. The tell is whether they give me a process or a story. Process answers sound like a textbook. Story answers sound like someone who has had to make hard calls.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Questions to Ask the Interviewer</h2>
          <p className="text-lg text-gray-700 mb-4">
            Strong candidates ask questions that show they understand the role. These are the best questions to close an SM interview with:
          </p>
          <div className="space-y-3 my-6">
            {[
              "How does this ART handle cross-team dependencies — is there a Program Board, and how often are dependencies reviewed?",
              "What&apos;s the relationship between the Scrum Masters and the RTE on this ART?",
              "What does &apos;done&apos; look like for a sprint here — do teams have a documented Definition of Done?",
              "How are impediments escalated when they&apos;re outside the team&apos;s control?",
              "What&apos;s the biggest challenge this team is currently facing that the Scrum Master role can help address?",
            ].map((q, i) => (
              <div key={i} className="flex gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-[#01203d] font-bold flex-shrink-0">Q{i + 1}</span>
                <p className="text-gray-700 text-sm">{q}</p>
              </div>
            ))}
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get the Credential That Backs Your Interview</p>
            <p className="mb-5">The SAFe SSM certification gives you the vocabulary, framework, and exam preparation that enterprise hiring managers are screening for.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
            {" · "}
            <Link href="/blog/scrum-master-salary-2026" className="text-[#01203d] underline hover:no-underline">Scrum Master salary 2026</Link>
            {" · "}
            <Link href="/blog/ssm-exam-tips" className="text-[#01203d] underline hover:no-underline">SSM exam tips</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
