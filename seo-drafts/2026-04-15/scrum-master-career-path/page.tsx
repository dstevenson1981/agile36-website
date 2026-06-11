import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Career Path: How to Grow from SM to Agile Leader | Agile36",
  description:
    "The complete Scrum Master career path: certifications, experience milestones, salary bands, and how to move from team-level SM to enterprise agile leadership.",
  keywords: [
    "Scrum Master career path",
    "Scrum Master career progression",
    "how to become a Scrum Master",
    "Scrum Master growth path",
    "agile career path",
    "Scrum Master to Agile Coach",
  ],
  openGraph: {
    title: "Scrum Master Career Path: How to Grow from SM to Agile Leader",
    description: "Certifications, experience milestones, salary bands, and how to move from SM to enterprise agile leadership.",
    url: "https://www.agile36.com/blog/scrum-master-career-path",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-career-path" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Scrum Master career spans from entry-level team facilitator to enterprise agile coach, with salary bands ranging from <strong>$80K to $200K+</strong> depending on experience, certifications, and scope.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The biggest career accelerator is moving from single-team Scrum Master to <strong>multi-team coordination</strong> — whether as a Lead SM, RTE, or Agile Coach.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Enterprise SAFe environments consistently produce higher-paid SM roles because the program complexity is greater and qualified practitioners are scarcer.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Coaching skill — not just facilitation skill — is what separates mid-level SMs from senior ones. The best SMs make themselves replaceable at the team level so they can contribute at a higher scope.</span></li>
      </ul>
    </section>
  );
}

function CareerLadder() {
  const levels = [
    { level: "Entry", title: "Scrum Master", exp: "0–2 years", salary: "$75K–$95K", cert: "SSM or CSM", color: "#718aa5" },
    { level: "Mid", title: "Senior Scrum Master", exp: "2–5 years", salary: "$95K–$130K", cert: "SSM + SASM", color: "#134263" },
    { level: "Senior", title: "Lead / Principal SM", exp: "5–8 years", salary: "$130K–$165K", cert: "SASM + RTE", color: "#01203d" },
    { level: "Executive", title: "Enterprise Agile Coach", exp: "8+ years", salary: "$155K–$210K+", cert: "SPC / ICP-ENT", color: "#000d1a" },
  ];
  return (
    <section aria-label="Scrum Master career ladder" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Scrum Master Career Ladder</h3>
      <div className="space-y-3">
        {levels.map((l) => (
          <div key={l.level} className="flex items-stretch gap-0 rounded-xl overflow-hidden border border-gray-200">
            <div className="w-20 flex items-center justify-center text-white text-xs font-bold p-3 text-center" style={{ backgroundColor: l.color }}>
              {l.level}
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50">
              <div><span className="text-xs text-gray-500 block">Title</span><span className="font-bold text-gray-900 text-sm">{l.title}</span></div>
              <div><span className="text-xs text-gray-500 block">Experience</span><span className="text-sm text-gray-700">{l.exp}</span></div>
              <div><span className="text-xs text-gray-500 block">Salary Range</span><span className="font-bold text-yellow-700 text-sm">{l.salary}</span></div>
              <div><span className="text-xs text-gray-500 block">Typical Certs</span><span className="text-sm text-gray-700">{l.cert}</span></div>
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
    "The fastest career progression comes from deliberately expanding scope — from one team to multiple teams to an entire ART.",
    "Certifications matter for getting past screening. Experience matters for getting the offer. Both are necessary.",
    "The single most valuable thing a mid-level Scrum Master can do is document coaching outcomes — not just what they facilitated, but what improved as a result.",
    "Enterprise SAFe environments pay significantly more than startup or single-team Scrum environments for the same years of experience.",
    "Consulting and freelance SM work adds substantial income for experienced practitioners — $80–$120/hr for senior SAFe SM engagements is common.",
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

export default function ScrumMasterCareerPathPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Career Path: How to Grow from SM to Agile Leader
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Career Path</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career Path</span>
          <span className="text-sm text-[#718aa5]">Career Guide · 10 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Career Path: How to Grow from SM to Agile Leader
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Scrum Master career path is one of the most misunderstood in the agile world. Practitioners assume the role is a permanent team position — but the best SMs treat it as a progression, deliberately building scope, coaching depth, and organizational influence over time. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master course</Link>{" "}
            is where most SAFe-environment SMs start. This guide maps where the role goes from there.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Core Career Challenge</h2>
          <p className="text-lg text-gray-700 mb-4">
            Scrum Masters don't have a natural organizational hierarchy the way engineering or product roles do. There's no "Director of Scrum Mastering." Career progression happens through scope expansion — moving from coaching one team, to mentoring multiple SMs, to operating at the program level as an RTE or Agile Coach. The credential path mirrors this: SSM → SASM → RTE → SPC reflects increasing scope and coaching depth, not just harder exams.
          </p>

          <CareerLadder />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Stage 1: Entry Level (0–2 years)</h2>
          <p className="text-lg text-gray-700 mb-4">
            Entry-level Scrum Masters focus on mastering the basics: facilitating team events (sprint planning, standups, retros, sprint reviews), coaching the team on Scrum or SAFe practices, and removing team-level impediments. The goal at this stage is to make your team predictable and self-organizing.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            For SAFe environments, the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master (SSM) certification</Link>{" "}
            is the baseline credential that most enterprise employers require. The SSM exam is 45 questions, 90 minutes, closed book, with a 73% passing score — preparation matters even at this stage.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The most important early-career skill is facilitation — specifically, the ability to run team events that produce useful outcomes without over-facilitating or dominating the conversation. SMs who facilitate well build team trust quickly; those who control rather than facilitate struggle to make teams self-organizing.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Stage 2: Senior Scrum Master (2–5 years)</h2>
          <p className="text-lg text-gray-700 mb-4">
            Senior SMs go beyond facilitation into coaching — they help individuals grow, address team dynamics, and start contributing to program-level work. At this stage, the key shift is from <em>doing agile with your team</em> to <em>coaching others to do it</em>.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Advanced Scrum Master (SASM)</Link>{" "}
            credential is the right investment at this stage. SASM covers advanced coaching models, multi-team coordination, and technical agility — the three areas where senior SMs differentiate themselves. SASM holders are also the primary pipeline for Release Train Engineer roles.
          </p>

          <PullQuote attribution="Principal Scrum Master, technology company">
            The transition from SM to senior SM is about learning to coach people, not just facilitate meetings. It took me two years before I was actually coaching rather than just facilitating more efficiently.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Stage 3: Lead / Principal Scrum Master (5–8 years)</h2>
          <p className="text-lg text-gray-700 mb-4">
            Lead Scrum Masters typically manage a portfolio of Scrum Masters — mentoring junior SMs, standardizing practices across teams, and contributing to ART-level improvement. Some organizations call this role Agile Lead or Principal Scrum Master.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            At this stage, many practitioners pursue the{" "}
            <Link href="/courses/release-train-engineer" className="text-[#01203d] font-semibold underline hover:no-underline">Release Train Engineer (RTE)</Link>{" "}
            credential to formalize their program-level contribution. The RTE role is a natural evolution for Lead SMs who are already doing PI Planning facilitation work.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Stage 4: Enterprise Agile Coach (8+ years)</h2>
          <p className="text-lg text-gray-700 mb-4">
            Enterprise Agile Coaches work across multiple ARTs or value streams, driving organizational-level agile transformation. Some hold the SPC (SAFe Program Consultant) credential, which allows them to train and certify other SAFe practitioners — opening training and consulting income streams.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does it take to become a Scrum Master?</p>
              <p className="text-lg text-gray-700">You can earn the SSM certification in 2 days plus exam prep. Getting your first Scrum Master job typically takes 1–6 months depending on experience, location, and market. Practitioners who transition from adjacent roles (BA, developer, project manager) often move fastest.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can a Scrum Master become a Product Owner?</p>
              <p className="text-lg text-gray-700">Yes, the transitions are common in both directions. SMs develop deep understanding of team dynamics and agile practices that translate well to PO and PM roles. The POPM certification is a logical cross-credential for SMs interested in the product side.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's the highest-paying SM career track?</p>
              <p className="text-lg text-gray-700">The RTE → SPC → consulting track produces the highest total compensation for experienced practitioners. SAFe SPCs who run their own training businesses often earn $250K+ when you include training revenue alongside consulting engagements.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do Scrum Masters need a technical background?</p>
              <p className="text-lg text-gray-700">Not mandatory, but helpful — especially in software development environments. SMs who understand agile engineering practices (TDD, CI/CD, refactoring) coach engineering teams more effectively. SASM covers technical agility practices for SMs who want to develop this depth.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the Scrum Master role growing or shrinking?</p>
              <p className="text-lg text-gray-700">Growing overall — enterprise SAFe adoption continues to expand, and SAFe programs need SSMs at every level. The entry-level single-team SM role faces more competition, but senior SM, Lead SM, and RTE roles remain consistently in demand across financial services, defense, and healthcare IT.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Build Your Scrum Master Credentials</p>
            <p className="mb-5">Start with SSM or advance with SASM — live courses with certified SAFe practitioners.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course dates
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/ssm-salary" className="text-[#01203d] underline hover:no-underline">SAFe Scrum Master salary</Link>
            {" · "}
            <Link href="/blog/rte-career-path" className="text-[#01203d] underline hover:no-underline">RTE career path</Link>
            {" · "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] underline hover:no-underline">Advanced Scrum Master course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
