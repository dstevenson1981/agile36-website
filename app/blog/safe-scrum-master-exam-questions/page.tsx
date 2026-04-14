import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Scrum Master Exam Questions: Format, Sample Topics, Prep Tips | Agile36",
  description:
    "What SAFe Scrum Master exam questions actually look like: format, passing score, sample topics, and a preparation plan from an SPC who teaches the course.",
  keywords: [
    "SAFe Scrum Master exam questions",
    "SSM exam questions",
    "SSM exam format",
    "SAFe SSM sample questions",
    "SAFe Scrum Master exam prep",
    "SSM practice exam",
  ],
  openGraph: {
    title: "SAFe Scrum Master Exam Questions: Format, Topics, and How to Prep",
    description:
      "What SAFe Scrum Master exam questions actually look like: format, passing score, sample topics, and a preparation plan from an SPC who teaches the course.",
    url: "https://www.agile36.com/blog/safe-scrum-master-exam-questions",
    siteName: "Agile36",
    type: "article",
  },
  alternates: {
    canonical: "https://www.agile36.com/blog/safe-scrum-master-exam-questions",
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

/* --- Deloitte-style components --- */

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
            The SSM exam is <strong>45 multiple-choice questions in 90 minutes</strong>.
            You need 73% — 33 of 45 correct — to pass.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">02</span>
          <span>
            It is <strong>closed book</strong>. There is no reference lookup
            during the exam. Material must be internalized before you start.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">03</span>
          <span>
            Questions are scenario-based, not definition-based. Most items ask
            what a Scrum Master should do <em>first</em> given an ART situation.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">04</span>
          <span>
            Six domains, weighted roughly as shown below. PI Planning
            facilitation and Agile Release Train mechanics carry the most weight.
          </span>
        </li>
      </ul>
    </section>
  );
}

function ExamFormatStats() {
  return (
    <section
      aria-label="SAFe Scrum Master exam format at a glance"
      className="my-10"
    >
      <svg
        role="img"
        aria-label="SAFe Scrum Master exam format overview showing 45 questions, 90 minutes, 73 percent to pass, and closed-book"
        viewBox="0 0 960 300"
        className="w-full h-auto rounded-xl border border-gray-200"
      >
        <rect width="960" height="300" fill="#ffffff" />
        <rect x="24" y="24" width="216" height="252" rx="14" fill="#01203d" />
        <rect x="252" y="24" width="216" height="252" rx="14" fill="#134263" />
        <rect x="480" y="24" width="216" height="252" rx="14" fill="#01203d" />
        <rect x="708" y="24" width="228" height="252" rx="14" fill="#134263" />

        <text x="132" y="100" textAnchor="middle" fill="#facc15" fontSize="54" fontWeight="700" fontFamily="system-ui,sans-serif">45</text>
        <text x="132" y="136" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600" fontFamily="system-ui,sans-serif">Questions</text>
        <text x="132" y="164" textAnchor="middle" fill="#d1d5db" fontSize="12" fontFamily="system-ui,sans-serif">multiple choice</text>

        <text x="360" y="100" textAnchor="middle" fill="#facc15" fontSize="54" fontWeight="700" fontFamily="system-ui,sans-serif">90</text>
        <text x="360" y="136" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600" fontFamily="system-ui,sans-serif">Minutes</text>
        <text x="360" y="164" textAnchor="middle" fill="#d1d5db" fontSize="12" fontFamily="system-ui,sans-serif">~2 min per question</text>

        <text x="588" y="100" textAnchor="middle" fill="#facc15" fontSize="54" fontWeight="700" fontFamily="system-ui,sans-serif">73%</text>
        <text x="588" y="136" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600" fontFamily="system-ui,sans-serif">To pass</text>
        <text x="588" y="164" textAnchor="middle" fill="#d1d5db" fontSize="12" fontFamily="system-ui,sans-serif">33 of 45 correct</text>

        <text x="822" y="94" textAnchor="middle" fill="#facc15" fontSize="36" fontWeight="700" fontFamily="system-ui,sans-serif">Closed</text>
        <text x="822" y="132" textAnchor="middle" fill="#facc15" fontSize="36" fontWeight="700" fontFamily="system-ui,sans-serif">Book</text>
        <text x="822" y="164" textAnchor="middle" fill="#d1d5db" fontSize="12" fontFamily="system-ui,sans-serif">no reference lookup</text>
      </svg>
    </section>
  );
}

function TopicDistribution() {
  return (
    <section
      aria-label="Approximate distribution of SAFe Scrum Master exam topics across six domains"
      className="my-10"
    >
      <svg
        role="img"
        aria-label="Approximate distribution of SAFe Scrum Master exam topics across six domains"
        viewBox="0 0 960 430"
        className="w-full h-auto rounded-xl border border-gray-200"
      >
        <rect width="960" height="430" fill="#f8fafc" />
        <text x="480" y="42" textAnchor="middle" fill="#01203d" fontSize="22" fontWeight="700" fontFamily="system-ui,sans-serif">
          Where your 45 questions come from
        </text>
        <text x="480" y="66" textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="system-ui,sans-serif">
          Approximate distribution (Scaled Agile does not publish exact weights)
        </text>

        <rect x="60" y="92" width="840" height="42" rx="8" fill="#e2e8f0" />
        <rect x="60" y="92" width="184" height="42" rx="8" fill="#01203d" />
        <text x="70" y="118" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">Agile Release Train · ~10Q · 22%</text>

        <rect x="60" y="148" width="840" height="42" rx="8" fill="#e2e8f0" />
        <rect x="60" y="148" width="168" height="42" rx="8" fill="#134263" />
        <text x="70" y="174" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">SAFe principles &amp; Scrum in SAFe · ~9Q · 20%</text>

        <rect x="60" y="204" width="840" height="42" rx="8" fill="#e2e8f0" />
        <rect x="60" y="204" width="168" height="42" rx="8" fill="#01203d" />
        <text x="70" y="230" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">PI Planning facilitation · ~9Q · 20%</text>

        <rect x="60" y="260" width="840" height="42" rx="8" fill="#e2e8f0" />
        <rect x="60" y="260" width="134" height="42" rx="8" fill="#134263" />
        <text x="70" y="286" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">Iteration planning &amp; execution · ~7Q · 16%</text>

        <rect x="60" y="316" width="840" height="42" rx="8" fill="#e2e8f0" />
        <rect x="60" y="316" width="109" height="42" rx="8" fill="#01203d" />
        <text x="70" y="342" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">Coaching &amp; continuous improvement · ~6Q · 13%</text>

        <rect x="60" y="372" width="840" height="34" rx="8" fill="#e2e8f0" />
        <rect x="60" y="372" width="76" height="34" rx="8" fill="#134263" />
        <text x="70" y="394" fill="#ffffff" fontSize="12" fontWeight="600" fontFamily="system-ui,sans-serif">Built-in quality &amp; DevOps · ~4Q · 9%</text>
      </svg>
    </section>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution: string }) {
  return (
    <blockquote className="border-l-4 border-yellow-400 pl-6 md:pl-8 my-12">
      <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug italic">
        {children}
      </p>
      <footer className="text-sm text-gray-600 mt-3 not-italic">
        — {attribution}
      </footer>
    </blockquote>
  );
}

function SampleQuestionBox() {
  return (
    <section
      aria-label="Sample SAFe Scrum Master style question"
      className="border border-gray-200 rounded-xl overflow-hidden my-10"
    >
      <div className="bg-[#01203d] px-6 py-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold">
          Sample question style
        </p>
      </div>
      <div className="p-6 md:p-8">
        <p className="text-base md:text-lg text-gray-900 font-semibold mb-4">
          During PI Planning, a team realizes that three of their PI
          objectives depend on a capability from another team that has not
          committed to delivering it this PI. What should the Scrum Master do
          first?
        </p>
        <ol className="list-[lower-alpha] pl-6 text-base text-gray-800 space-y-2 mb-6">
          <li>Remove the dependent objectives from the team&apos;s plan.</li>
          <li>Escalate to the Release Train Engineer to resolve the dependency.</li>
          <li>
            Help the team make the dependency visible on the program board and
            discuss it in the scrum of scrums.
          </li>
          <li>
            Reduce the team&apos;s business value commitment to reflect the risk.
          </li>
        </ol>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#01203d] font-bold mb-2">
            Best answer: c
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Scrum Masters make dependencies visible and facilitate the
            conversation; escalation to the RTE or rework of objectives only
            happens if the scrum of scrums discussion doesn&apos;t resolve it.
            All four options are plausible — that&apos;s the pattern. The word{" "}
            <em>first</em> changes the answer.
          </p>
        </div>
      </div>
    </section>
  );
}

function SevenDayPlan() {
  const days: Array<{ day: string; focus: string; detail: string }> = [
    {
      day: "Day 1-2",
      focus: "Re-read the workbook",
      detail:
        "Cover to cover. Highlight anything you weren't confident on in class.",
    },
    {
      day: "Day 3",
      focus: "External references",
      detail:
        "Read the Scrum Guide (14 pages). Skim the SAFe 6.0 Big Picture on scaledagileframework.com.",
    },
    {
      day: "Day 4",
      focus: "First timed practice exam",
      detail:
        "Full-length, under exam conditions. Review every wrong answer.",
    },
    {
      day: "Day 5",
      focus: "Close the gaps",
      detail:
        "Re-study the two weakest domains from your practice-exam result.",
    },
    {
      day: "Day 6",
      focus: "Second practice exam",
      detail:
        "If you're above 80% under timed conditions, you're ready.",
    },
    {
      day: "Day 7",
      focus: "Light review and sit the exam",
      detail:
        "Quiet room, strong wifi, water. No cramming. Clear head beats more content.",
    },
  ];
  return (
    <section
      aria-label="Seven day SSM exam preparation plan"
      className="my-10"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#01203d] font-bold mb-4">
        7-day preparation plan
      </p>
      <div className="grid gap-3">
        {days.map((d, i) => (
          <div
            key={i}
            className="flex items-start gap-5 p-5 border border-gray-200 rounded-lg hover:border-[#01203d] transition-colors"
          >
            <div className="flex-shrink-0 w-20 md:w-24">
              <p className="text-xs uppercase tracking-wider text-gray-500">Prep</p>
              <p className="text-lg font-bold text-[#01203d]">{d.day}</p>
            </div>
            <div className="flex-1 border-l border-gray-200 pl-5">
              <p className="text-base font-semibold text-gray-900 mb-1">
                {d.focus}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{d.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function KeyTakeaways() {
  const items = [
    "Closed book. Plan for it. The people who pass cleanly know the material cold — they don't rely on references they won't have.",
    "Two minutes per question. Skip, flag, come back. Don't burn four minutes on the first hard question.",
    "Qualifier words change answers: first, best, most, primary. Read them deliberately.",
    "Scrum Masters rarely escalate first. If the option says 'escalate immediately,' it's usually wrong.",
    "Take the exam within 7-10 days of class. Longer gaps hurt more than they help.",
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
            <span className="text-[17px] leading-relaxed text-gray-100">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function SafeScrumMasterExamQuestionsBlogPost() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Scrum Master Exam Questions: What to Expect and How to Prepare
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link>
          <span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link>
          <span>/</span>
          <span>SSM exam questions</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">
            SAFe
          </span>
          <span className="text-sm text-[#718aa5]">Exam Prep · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Scrum Master Exam Questions: What to Expect and How to Prepare
        </h1>
        <p className="text-base text-gray-500 mb-10">
          By Agile36 · SAFe Silver Partner · Updated April 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The most common question I get in the last hour of SSM class is
            some version of &quot;what will the <strong>SAFe Scrum Master
            exam questions</strong> actually look like?&quot; Fair. You just
            sat through 16 hours of training, the exam opens the moment you
            leave, and you want to know what you&apos;re walking into. Full
            details on the{" "}
            <Link
              href="/courses/scrum-master"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              SAFe Scrum Master course
            </Link>{" "}
            are on the course page — this article focuses on the exam itself.
          </p>
          <p className="text-lg text-gray-700 mb-2 leading-relaxed">
            Short version: 45 questions, 90 minutes, 73% to pass, <strong>closed
            book</strong>, and the questions map cleanly to the six domains you
            learned in class. I&apos;ve walked hundreds of Scrum Masters through
            this exam as an SPC. Here&apos;s the full picture — format, topic
            weight, sample question, traps, and the 7-day prep plan I hand every
            student.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Exam Format at a Glance
          </h2>
          <ExamFormatStats />
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>
              <strong>Web-based</strong>, administered through the Scaled Agile
              community platform
            </li>
            <li>
              <strong>Closed book</strong> — no reference materials, no workbook
              lookup, no open browser tabs
            </li>
            <li>
              <strong>First attempt included</strong> with course registration.
              Retake: $50 (free with the Agile36 Pro plan)
            </li>
            <li>
              <strong>Annual renewal</strong> with 10 continuing education units
              plus a renewal fee
            </li>
          </ul>
          <p className="text-lg text-gray-700 mb-2">
            &quot;Closed book&quot; is the most important change to internalize.
            Older prep advice on the internet treats this as open book — that
            is outdated. Plan your study accordingly.
          </p>

          <PullQuote attribution="Advice I give every SSM class on the last day">
            Know the material cold. You won&apos;t be looking it up mid-exam.
            Two minutes per question isn&apos;t enough time to learn content on
            the fly.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            What Topics Do SAFe Scrum Master Exam Questions Cover?
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Scaled Agile doesn&apos;t publish exact weights, but the content
            breaks into six domains. Based on hundreds of class exam debriefs,
            here&apos;s roughly where your 45 questions come from.
          </p>

          <TopicDistribution />

          <p className="text-lg font-semibold text-gray-900 mb-2">
            SAFe principles and Scrum in SAFe context (~9 questions)
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The 10 SAFe Lean-Agile principles. How Scrum operates inside SAFe
            — which parts stay identical and which adapt. The Scrum
            Master&apos;s role in a SAFe environment versus single-team Scrum.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            The Agile Release Train (~10 questions)
          </p>
          <p className="text-lg text-gray-700 mb-4">
            ART roles, artifacts, and events. Who does what. How the Release
            Train Engineer relates to individual Scrum Masters. How feature
            delivery flows from program backlog to team backlog.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            Iteration planning and execution (~7 questions)
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Iteration planning, daily stand-ups, iteration review, iteration
            retrospective, and backlog refinement within a SAFe context. Sprint
            goal connection to PI objectives.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            PI Planning facilitation (~9 questions)
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The two-day event and the Scrum Master&apos;s role in it. Team
            breakout facilitation, dependency mapping, risk ROAM, confidence
            votes, and the management review &amp; problem-solving meeting. We
            cover this event end-to-end in{" "}
            <Link
              href="/blog/pi-planning-explained"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              PI Planning explained
            </Link>
            .
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            Coaching and continuous improvement (~6 questions)
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Servant leadership. Coaching individual teams versus coaching at the
            ART level. The Inspect &amp; Adapt workshop. Solving anti-patterns.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            Built-in quality and DevOps mindset (~4 questions)
          </p>
          <p className="text-lg text-gray-700 mb-6">
            The role of built-in quality practices, continuous integration,
            continuous deployment, and how Scrum Masters enable DevOps within
            their teams.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Sample Question Style
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Scaled Agile doesn&apos;t release official practice questions, and
            sharing the real exam is against their rules. What I can share is
            the <em>style</em> of question — scenario-based, not
            definition-based. Below is a representative example written in the
            same voice as real exam items.
          </p>

          <SampleQuestionBox />

          <p className="text-lg text-gray-700 mb-2">
            Notice how all four options are plausible. That&apos;s the pattern.
            The exam rarely asks &quot;what is a PI?&quot; — it asks
            &quot;given this situation, what should the Scrum Master do{" "}
            <em>first</em>?&quot; The word <em>first</em> matters.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Traps and How to Avoid Them
          </h2>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Trap 1: Answering from pre-SAFe Scrum experience
          </p>
          <p className="text-lg text-gray-700 mb-4">
            If you&apos;ve been a Scrum Master in non-SAFe environments, your
            gut will pull you toward single-team answers. The exam wants SAFe
            answers — ART-aware, PI-aware, dependency-aware. Read every question
            assuming the context is a full Agile Release Train.
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Trap 2: Treating it as open book
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The SSM exam is <strong>closed book</strong>. You cannot have your
            workbook open, a second monitor with notes, or the SAFe website in
            another tab. If your prep plan assumes lookup during the test,
            rebuild it. Study for recall, not reference.
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Trap 3: Missing qualifier words
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <em>First</em>, <em>best</em>, <em>most</em>, and <em>primary</em>{" "}
            change the answer. Two options may both be reasonable — one is the
            reasonable <em>first</em> step.
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Trap 4: Choosing the &quot;always escalate&quot; answer
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Scrum Masters are servant-leaders. The right answer is almost never
            &quot;escalate immediately&quot; unless the scenario explicitly
            shows coaching has failed.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            7-Day Preparation Plan
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Take the exam within 7-10 days of class. Here&apos;s the plan I
            hand every student.
          </p>

          <SevenDayPlan />

          <p className="text-lg text-gray-700 mb-4">
            Agile36&apos;s Pro plan includes two practice exams modeled on the
            real format, plus a free exam retake if the first attempt
            doesn&apos;t land. See the{" "}
            <Link
              href="/courses/scrum-master"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              SAFe Scrum Master course
            </Link>{" "}
            for what&apos;s included.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Common Questions
          </h2>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            How many questions are on the SAFe Scrum Master exam?
          </p>
          <p className="text-lg text-gray-700 mb-4">
            45 multiple-choice questions. You have 90 minutes and need to
            answer 33 correctly (73%) to pass.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            Is the SSM exam open-book?
          </p>
          <p className="text-lg text-gray-700 mb-4">
            No. The SSM exam is <strong>closed book</strong>. No reference
            materials, no workbook lookup, no outside resources. Plan to know
            the content from memory.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            What happens if I fail the SSM exam?
          </p>
          <p className="text-lg text-gray-700 mb-4">
            You can retake for $50 per attempt. Agile36 Pro plan students get
            the first retake free. Most people who fail the first attempt pass
            the second after targeted review.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            How long should I study?
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Plan 10-15 hours across 7 days after class — closed-book prep takes
            more review time than old open-book advice suggests. More than
            15 hours usually means you&apos;re re-reading material you already
            know.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            Are there free SSM practice questions online?
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Some free question banks exist, but accuracy varies. Many were
            written by people who took the exam years ago, before it went
            closed book. Treat them as concept reviews, not format simulation.
            Compare options against{" "}
            <Link
              href="/blog/ssm-vs-csm"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              SSM vs CSM
            </Link>{" "}
            if you&apos;re still choosing a certification.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            How often is the SSM exam updated?
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Scaled Agile updates exam content with major SAFe versions
            (currently SAFe 6.0). Always confirm the current exam matches the
            version you trained on.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-2">
            Is SSM worth taking if I already have another Scrum certification?
          </p>
          <p className="text-lg text-gray-700 mb-4">
            If you work in or are targeting a SAFe environment, yes. It teaches
            multi-team coordination that other Scrum certs don&apos;t. Review{" "}
            <Link
              href="/blog/is-safe-certification-worth-it-2026"
              className="text-[#01203d] font-semibold underline hover:no-underline"
            >
              our SAFe certification ROI breakdown
            </Link>{" "}
            for the full picture.
          </p>

          <KeyTakeaways />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
            Ready to Sit for the Exam?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            The exam is included with Agile36&apos;s SSM course. Class plus
            disciplined prep gets you there — we&apos;ve trained Scrum Masters
            at Fortune 500 companies and federal agencies through this exact
            process.
          </p>
          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get the SSM with a real trainer</p>
            <p className="mb-5">
              Live virtual and in-person SSM classes with an SPC-certified
              instructor. Pro plan adds practice exams, free retake, resume
              rewrite, and interview prep.
            </p>
            <Link
              href="/courses/scrum-master"
              className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300"
            >
              View SSM course details
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link
              href="/blog/pi-planning-explained"
              className="text-[#01203d] underline hover:no-underline"
            >
              PI Planning explained
            </Link>
            {" · "}
            <Link
              href="/blog/leading-safe-certification-cost-2026"
              className="text-[#01203d] underline hover:no-underline"
            >
              Leading SAFe cost
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
