import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Advanced Scrum Master vs SSM: Which Certification to Get Next | Agile36",
  description:
    "SASM vs SSM compared: what the Advanced Scrum Master adds over the base SSM credential, who needs it, and when to get it in your SAFe career path.",
  keywords: [
    "SAFe Advanced Scrum Master vs SSM",
    "SASM vs SSM",
    "Advanced Scrum Master certification",
    "SSM vs SASM difference",
    "SAFe SASM",
    "next step after SSM",
  ],
  openGraph: {
    title: "SAFe Advanced Scrum Master vs SSM: Which to Get Next",
    description: "SASM vs SSM compared: what the Advanced Scrum Master adds, who needs it, and when.",
    url: "https://www.agile36.com/blog/safe-advanced-scrum-master-vs-ssm",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-advanced-scrum-master-vs-ssm" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SSM (SAFe Scrum Master) teaches you to operate effectively within a SAFe ART. <strong>SASM (Advanced Scrum Master)</strong> teaches you to coach teams, optimize programs, and lead at a higher level.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>SASM is the required stepping stone for practitioners targeting the <strong>Release Train Engineer</strong> role — it builds the coaching depth and program-level perspective that RTE requires.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>SSM is the right starting point for new SAFe Scrum Masters. SASM makes sense once you have <strong>1–2 years of real ART experience</strong> and are ready to take on a more senior coaching function.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Both credentials renew annually, but SASM holders command <strong>$10–20K more</strong> in senior Scrum Master roles at large enterprises.</span></li>
      </ul>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { attr: "Duration", ssm: "2 days (16 hrs)", sasm: "2 days (16 hrs)" },
    { attr: "Exam", ssm: "45 Q / 90 min / 73%", sasm: "45 Q / 90 min / 73%" },
    { attr: "Focus", ssm: "Team-level SAFe practices", sasm: "Advanced coaching, multi-team" },
    { attr: "PI Planning Role", ssm: "Team participant", sasm: "Program-level contributor" },
    { attr: "Technical Agility", ssm: "Introduced", sasm: "Deep coverage" },
    { attr: "Prerequisite for", ssm: "SASM (recommended)", sasm: "RTE cert (recommended)" },
    { attr: "Target profile", ssm: "New to SAFe SM role", sasm: "Experienced SM, coaching focus" },
    { attr: "Salary impact", ssm: "Entry SAFe SM band", sasm: "+$10–20K at senior level" },
  ];
  return (
    <section aria-label="SSM vs SASM comparison table" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SSM vs SASM: Side-by-Side</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-gray-100 p-3 text-left text-gray-700">Attribute</th>
              <th className="bg-[#01203d] p-3 text-left text-white">SSM</th>
              <th className="bg-[#134263] p-3 text-left text-white">SASM</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.attr} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-medium text-gray-700">{r.attr}</td>
                <td className="p-3 text-gray-700">{r.ssm}</td>
                <td className="p-3 text-gray-700">{r.sasm}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    "Get SSM first if you're new to SAFe. It teaches the fundamentals of operating within an ART that SASM builds on.",
    "Get SASM when you have 1–2 years of real ART experience and are targeting senior SM or lead SM roles.",
    "SASM is required before RTE — it's the bridge between team-level facilitation and program-level coaching.",
    "SASM covers technical agility and DevOps practices that SSM only introduces — critical for coaching engineering teams.",
    "Both are 2-day courses with identical exam format — the investment is time, not a dramatically different commitment.",
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

export default function SasmVsSsmPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Advanced Scrum Master vs SSM: Which to Get Next
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SASM vs SSM</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Comparison · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Advanced Scrum Master vs SSM: Which Certification to Get Next
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            After earning the SAFe Scrum Master credential, the next question is almost always: <em>should I pursue Advanced Scrum Master next?</em> The answer depends on where you are in your career and where you want to go. The{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Advanced Scrum Master course</Link>{" "}
            is not a harder version of SSM — it's a different depth of the same discipline. This comparison breaks down what SASM adds, who needs it, and when to get it.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What SSM Covers</h2>
          <p className="text-lg text-gray-700 mb-4">
            The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM course</Link>{" "}
            teaches Scrum Masters how to operate effectively within a SAFe Agile Release Train. The core content covers Scrum Master roles in SAFe, how to facilitate team-level events (sprint planning, retrospectives, standups), how to contribute to PI Planning as a team participant, and how to coach your team on agile practices. SSM is fundamentally a team-level credential.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What SASM Adds</h2>
          <p className="text-lg text-gray-700 mb-4">
            SASM goes significantly deeper on coaching and program-level contribution. The key additions over SSM:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {[
              { title: "Advanced Coaching Patterns", desc: "Coaching individuals, teams, and program-level stakeholders. SASM covers coaching models that SSM only introduces." },
              { title: "Technical Agility & DevOps", desc: "Deep coverage of built-in quality, TDD, CI/CD, and DevOps practices. Essential for coaching engineering teams on technical practices." },
              { title: "Multi-Team Coordination", desc: "How to facilitate coordination across teams — managing cross-team dependencies, Scrum of Scrums, and program-level backlogs." },
              { title: "Servant Leadership at Scale", desc: "Leadership patterns for senior SMs who influence beyond their immediate team — mentoring junior SMs, contributing to ART improvement." },
            ].map((r) => (
              <div key={r.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-[#01203d] mb-2">{r.title}</h4>
                <p className="text-sm text-gray-600">{r.desc}</p>
              </div>
            ))}
          </div>

          <ComparisonTable />

          <PullQuote attribution="Senior Scrum Master, financial services">
            SSM taught me how to do the job. SASM taught me how to coach others to do it — which is actually much harder and what senior SM roles actually require.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">When to Get SSM vs. SASM</h2>
          <p className="text-lg text-gray-700 mb-4">
            The decision is primarily about your experience level and career goals:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-5">
            <div>
              <strong className="block text-[#01203d] mb-1">Get SSM if:</strong>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>You're new to the Scrum Master role or new to SAFe</li>
                <li>You're currently working as a Scrum Master at the team level</li>
                <li>Your organization is running or transitioning to SAFe</li>
                <li>You want the foundational SAFe SM credential on your resume</li>
              </ul>
            </div>
            <div>
              <strong className="block text-[#01203d] mb-1">Get SASM if:</strong>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>You have 1–2+ years of SSM or Scrum Master experience on an ART</li>
                <li>You're targeting Lead Scrum Master or Principal Scrum Master roles</li>
                <li>You want to coach other Scrum Masters or mentor junior SMs</li>
                <li>You're on a path toward the RTE role — SASM is the recommended prerequisite</li>
                <li>You want to contribute to technical practice coaching (TDD, CI/CD) for engineering teams</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">SASM as the Bridge to RTE</h2>
          <p className="text-lg text-gray-700 mb-4">
            The most important strategic reason for SASM is the path it opens to the{" "}
            <Link href="/courses/release-train-engineer" className="text-[#01203d] font-semibold underline hover:no-underline">Release Train Engineer</Link>{" "}
            role. Scaled Agile recommends SASM before the RTE course because SASM builds the coaching depth — individual, team, and program-level — that the RTE role demands. RTEs who went directly from SSM to RTE without SASM often struggle with the coaching and mentoring aspects of the ART-level role.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need SSM before SASM?</p>
              <p className="text-lg text-gray-700">Scaled Agile recommends SSM or equivalent experience before SASM. You can attend SASM without SSM, but SASM assumes team-level SAFe context. Without SSM background, you'll spend class time absorbing basics that SSM would have covered.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Are the exam formats the same?</p>
              <p className="text-lg text-gray-700">Yes. Both use 45-question closed-book exams with 90-minute time limits and 73% passing scores. SASM questions go deeper on coaching scenarios and technical agility content, but the format is identical.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text="gray-900 mb-2">Which pays more?</p>
              <p className="text-lg text-gray-700">SASM holders in senior SM roles typically earn $10–20K more than SSM-only holders, because SASM is listed in postings for Lead and Principal Scrum Master roles that pay at a higher band. The credential difference matters more in large enterprise environments than at startups.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long between SSM and SASM?</p>
              <p className="text-lg text-gray-700">Most practitioners wait 1–2 years between SSM and SASM to accumulate real ART experience to apply during the SASM course. Getting both in rapid succession reduces the practical value of each credential.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What comes after SASM?</p>
              <p className="text-lg text-gray-700">RTE is the natural next credential for SASM holders targeting program-level roles. Some practitioners also pursue Leading SAFe at this stage to round out their strategic perspective. SPC (SAFe Program Consultant) is the eventual ceiling for those who want to train and certify others.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Ready for Advanced Scrum Master?</p>
            <p className="mb-5">Live virtual and in-person SASM training with certified SPC instructors.</p>
            <Link href="/courses/advanced-scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SASM course dates
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/ssm-vs-csm" className="text-[#01203d] underline hover:no-underline">SSM vs CSM</Link>
            {" · "}
            <Link href="/blog/rte-career-path" className="text-[#01203d] underline hover:no-underline">RTE career path</Link>
            {" · "}
            <Link href="/courses/scrum-master" className="text-[#01203d] underline hover:no-underline">SAFe Scrum Master course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
