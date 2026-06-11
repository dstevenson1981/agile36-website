import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe DevOps Exam Guide: How to Pass the SDP Certification | Agile36",
  description:
    "SAFe DevOps Practitioner exam guide: exam format, key topics, preparation strategies, and what makes the SDP exam different from other SAFe certifications.",
  keywords: ["SAFe DevOps exam", "SDP exam guide", "SAFe DevOps Practitioner exam", "SDP certification exam", "how to pass SAFe DevOps exam", "SAFe DevOps exam topics"],
  openGraph: {
    title: "SAFe DevOps Exam Guide: How to Pass the SDP Certification",
    description: "What the SAFe DevOps Practitioner exam tests and how to prepare for it effectively.",
    url: "https://www.agile36.com/blog/safe-devops-exam",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-devops-exam" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The SDP exam is <strong>45 questions, 90 minutes, closed book, 73% passing score</strong> (33/45 correct). Like most SAFe exams, it uses scenario-based questions where you apply CDP framework knowledge to technical delivery situations.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most heavily tested topics: <strong>the four CDP aspects</strong> (Continuous Exploration, Integration, Deployment, Release on Demand), the <strong>CALMS model</strong>, and the <strong>agile testing pyramid</strong>. These three areas cover the majority of exam questions.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The SDP exam is <strong>unique among SAFe certifications</strong> in being explicitly technical — it tests pipeline concepts, deployment patterns, test automation strategy, and feature toggle implementation. Non-technical candidates without DevOps experience typically need more preparation time.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The exam is <strong>taken online</strong> through Scaled Agile after completing the 2-day SDP course. Most candidates have 5 days from course completion to take the exam. Study time beyond the course: plan 3-5 hours of focused review.</span></li>
      </ul>
    </section>
  );
}

function ExamTopics() {
  const topics = [
    { topic: "Continuous Delivery Pipeline (CDP) — all four aspects", weight: 95 },
    { topic: "CALMS model (Culture, Automation, Lean, Measurement, Sharing)", weight: 85 },
    { topic: "Agile testing pyramid and test automation strategy", weight: 82 },
    { topic: "Feature toggles and release decoupling", weight: 78 },
    { topic: "Trunk-based development and CI practices", weight: 75 },
    { topic: "Deployment pipeline stages and environment management", weight: 70 },
    { topic: "DORA metrics and flow measurement", weight: 65 },
  ];
  return (
    <section aria-label="SDP exam topics" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SDP Exam Topic Emphasis</h3>
      <div className="space-y-3">
        {topics.map((t) => (
          <div key={t.topic}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-700">{t.topic}</span>
              <span className="text-xs font-semibold text-gray-500">{t.weight}%</span>
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
          "Know the four CDP aspects cold — their purpose, the practices within each, and how they connect to each other. Every difficult SDP exam question connects back to where in the CDP the scenario applies and what the CDP principle recommends.",
          "The CALMS model is a frequent exam topic. Know what each element means: Culture (shared ownership of deployment), Automation (eliminating manual steps), Lean (small batches, flow), Measurement (using data to improve), Sharing (knowledge and tooling across teams). Scenario questions often ask you to identify which CALMS element is relevant to a situation.",
          "Feature toggles are tested more heavily than candidates expect. Know the difference between release toggles (feature on/off for users), experiment toggles (A/B testing), ops toggles (infrastructure switches), and permission toggles (user-specific features). The exam tests your understanding of when to use each.",
          "The agile testing pyramid — unit tests (many), service/integration tests (some), UI/acceptance tests (few) — is the recommended test automation strategy in SAFe DevOps. Questions about automation strategy expect you to recommend more unit tests, fewer UI tests, and explain why the pyramid shape is more sustainable than the ice cream cone anti-pattern.",
          "Candidates with active CI/CD pipeline experience typically pass with less study than those without. The exam content maps directly to DevOps practice — trunk-based development, deployment pipelines, monitoring and observability — that practitioners encounter daily. If you've built or operated CI/CD systems, much of the exam content will be familiar.",
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

export default function SafeDevopsExamPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe DevOps Exam Guide: How to Pass the SDP Certification
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe DevOps Exam</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Exam Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe DevOps Exam Guide: How to Pass the SDP Certification
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe DevOps Practitioner (SDP) exam is unique in the SAFe certification portfolio — it&apos;s the only certification that specifically tests technical delivery pipeline knowledge rather than agile process or leadership practices. While certifications like SSM or SA test your understanding of ceremonies and organizational practices, the SDP tests your understanding of the Continuous Delivery Pipeline. The{" "}
            <Link href="/courses/safe-devops" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe DevOps Practitioner course</Link>{" "}
            covers the exam content in full — candidates who engage with the course materials thoroughly typically pass on the first attempt.
          </p>

          <ExecutiveSummary />

          <ExamTopics />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">SDP Question Types and How to Approach Them</h2>
          <p className="text-lg text-gray-700 mb-4">
            SDP exam questions are scenario-based — a technical situation is presented and you must identify the correct CDP-aligned response. Wrong answers typically represent common but incorrect practices: manual testing bottlenecks (wrong answer: maintain current manual QA process), or deployment delays (wrong answer: schedule deployments weekly). The correct answers align with CDP principles — automate, reduce batch size, decouple deployment from release.
          </p>
          <div className="space-y-4 my-6">
            {[
              { type: "Pipeline bottleneck", example: "A team's deployment pipeline takes 4 hours due to manual regression testing. Which action best aligns with Continuous Integration principles?" },
              { type: "Release decoupling", example: "A new feature is deployed to production but should not be visible to users until a specific market event. What mechanism enables this?" },
              { type: "Cultural assessment", example: "An organization has automated deployments but deployment failures are blamed on the team that made the change. Which CALMS element is least developed?" },
              { type: "Test automation strategy", example: "A team has 80% of their test coverage in UI tests and 5% in unit tests. What does this indicate and how should they address it?" },
            ].map((item) => (
              <div key={item.type} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-semibold text-[#01203d] mb-2 text-sm">{item.type}</p>
                <p className="text-gray-600 text-sm italic">{item.example}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="DevOps engineer, enterprise retail">
            I went into the SDP exam confident because I&apos;ve worked in CI/CD for six years. What surprised me was how many questions were about the SAFe-specific framing of DevOps — the CDP aspects, CALMS, how DevOps connects to PI Planning. The technical concepts were familiar; the SAFe vocabulary around them was new. If you have the technical background, spend your study time on the SAFe DevOps framing, not the DevOps fundamentals.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many questions do I need to get right to pass SDP?</p>
              <p className="text-lg text-gray-700">The SDP exam is 45 questions with a 73% passing score, meaning you need to answer at least 33 questions correctly. This is the same pass threshold as other SAFe certifications including SSM, SA, and LPM.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I retake the SDP exam if I fail?</p>
              <p className="text-lg text-gray-700">Yes — Scaled Agile allows exam retakes. The first retake is typically included with the certification registration; additional attempts may have a fee. Candidates who fail should review the topic areas where they lost points and spend additional study time on those areas before retaking.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the SDP exam harder than the SSM exam?</p>
              <p className="text-lg text-gray-700">Different, not necessarily harder — it depends on your background. Technical practitioners with DevOps experience often find SDP easier than SSM because the content maps to their daily work. Practitioners without technical delivery experience often find SDP harder than SSM because the CDP concepts are less familiar from agile process training.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What should I study after the 2-day SDP course?</p>
              <p className="text-lg text-gray-700">Read the SAFe DevOps article and Continuous Delivery Pipeline article on scaledagile.com. Review the SAFe Agile Testing article to understand the agile testing pyramid. Study the CALMS model and be able to describe how each element applies in real DevOps scenarios. Work through the sample questions in the Scaled Agile study guide. 3-5 hours of focused study is typically sufficient for technically experienced candidates.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need to know specific tools (Jenkins, GitHub Actions, etc.) for the SDP exam?</p>
              <p className="text-lg text-gray-700">No — the SDP exam tests concepts and principles, not specific tool knowledge. You won&apos;t be asked how to configure a Jenkins pipeline. You will be asked about what CI/CD pipelines should accomplish, how to choose between deployment strategies, and how to identify pipeline improvement opportunities aligned with CDP principles.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get SAFe DevOps Certified</p>
            <p className="mb-5">The SDP course covers the Continuous Delivery Pipeline, CALMS model, and technical practices that the exam tests — with exam prep included.</p>
            <Link href="/courses/safe-devops" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SAFe DevOps course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-devops-certification" className="text-[#01203d] underline hover:no-underline">SAFe DevOps certification overview</Link>
            {" · "}
            <Link href="/blog/safe-devops-explained" className="text-[#01203d] underline hover:no-underline">SAFe DevOps explained</Link>
            {" · "}
            <Link href="/blog/agile-metrics-guide" className="text-[#01203d] underline hover:no-underline">Agile metrics guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
