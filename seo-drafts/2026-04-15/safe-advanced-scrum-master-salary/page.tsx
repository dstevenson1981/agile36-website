import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Advanced Scrum Master (SASM) Salary: What SASM Practitioners Earn | Agile36",
  description:
    "SAFe Advanced Scrum Master (SASM) salary data for 2026: how SASM certification affects compensation, what Senior SMs and Agile Coaches earn, and whether SASM is worth it financially.",
  keywords: ["SASM salary", "SAFe Advanced Scrum Master salary", "advanced scrum master salary", "SASM certification salary", "SASM vs SSM salary", "senior scrum master salary"],
  openGraph: {
    title: "SAFe Advanced Scrum Master (SASM) Salary: What SASM Practitioners Earn",
    description: "SASM salary benchmarks, how the certification affects compensation, and the financial case for SASM vs SSM.",
    url: "https://www.agile36.com/blog/safe-advanced-scrum-master-salary",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-advanced-scrum-master-salary" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SASM-certified practitioners typically earn <strong>$115k–$160k</strong> in the US. The SASM credential signals advanced coaching capability and is frequently required or preferred for Senior SM, Agile Coach, and RTE roles.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The salary premium of SASM over SSM is <strong>$15k–$30k at the senior level</strong>, reflecting the coaching and organizational agility skills that SASM validates — capabilities that employers actively differentiate and pay for.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The highest-earning SASM practitioners move toward <strong>RTE or Agile Coach roles</strong> — where compensation ranges reach $130k–$185k+ based on ART scale and organizational complexity.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>SASM is the <strong>recommended next certification</strong> after SSM for practitioners targeting RTE or Agile Coach roles. It closes the gap between team-level SM skills and program-level coaching capability.</span></li>
      </ul>
    </section>
  );
}

function SalaryProgression() {
  const roles = [
    { role: "Junior SM (SSM)", range: "$85k–$110k", bar: 45 },
    { role: "Mid SM (SSM)", range: "$100k–$130k", bar: 58 },
    { role: "Senior SM (SASM)", range: "$115k–$155k", bar: 72 },
    { role: "RTE (SASM + RTE cert)", range: "$130k–$185k", bar: 85 },
    { role: "Agile Coach (SASM + exp)", range: "$135k–$200k", bar: 90 },
  ];
  return (
    <section aria-label="SM career salary progression" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SM Career Salary Progression (US, 2026)</h3>
      <div className="space-y-4">
        {roles.map((r) => (
          <div key={r.role} className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-800">{r.role}</span>
              <span className="text-sm font-bold text-[#01203d]">{r.range}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-[#01203d] h-3 rounded-full" style={{ width: `${r.bar}%` }} />
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
          "SASM certification is most financially impactful for practitioners transitioning from team-level SM to Senior SM, Agile Coach, or RTE. It signals the coaching depth that separates these roles from standard SM positions.",
          "The SASM salary premium is real but not automatic — it materializes when you're actively in the job market or negotiating at a new role level. Certification without demonstrated coaching capability doesn't command the premium.",
          "Enterprise organizations value SASM most. Startups and smaller agile shops often can't differentiate SSM from SASM compensation-wise. If you're targeting enterprise roles, SASM is worth the investment.",
          "SASM also enables the RTE path — which is where the largest salary step-ups in the SM career occur. The RTE role at $130k–$185k represents the most accessible way for experienced SMs to reach top-of-market compensation.",
          "ROI calculation: SASM course investment returns in salary increase within 6–12 months for practitioners who actively leverage it in a job transition. For those staying in the same role, the financial return depends on whether your employer differentiates senior SM compensation.",
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

export default function SasmSalaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Advanced Scrum Master (SASM) Salary: What SASM Practitioners Earn
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SASM Salary</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career & Salary</span>
          <span className="text-sm text-[#718aa5]">Salary Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Advanced Scrum Master (SASM) Salary: What SASM Practitioners Earn
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SASM certification targets Scrum Masters ready to move beyond team-level facilitation into organizational coaching and scaled agile delivery. That skill advancement corresponds directly to compensation advancement — Senior SM, Agile Coach, and RTE roles that require SASM capability consistently pay $115k–$185k in the US market. This guide covers what practitioners with the{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SASM certification</Link>{" "}
            earn, how it compares to SSM-only compensation, and the career path that maximizes financial return on the SASM investment.
          </p>

          <ExecutiveSummary />

          <SalaryProgression />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">SASM vs SSM: The Compensation Gap</h2>
          <p className="text-lg text-gray-700 mb-4">
            The salary difference between SSM and SASM practitioners widens significantly at the senior level. Entry-level SMs with either credential earn similarly — the certification alone doesn&apos;t command a premium when you&apos;re competing on framework knowledge. But at the Senior SM and above level, SASM signals coaching depth, organizational agility awareness, and ART-level delivery capability — skills that enterprise hiring managers actively differentiate.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In practical terms: if you have 5+ years of SM experience and are applying for senior roles in SAFe enterprises, the SASM credential is the signal that gets you into the right salary conversations. Without it, you may be competing for mid-level roles even with more experience.
          </p>

          <PullQuote attribution="Agile Coach, enterprise insurance">
            I got my SASM three years into my SM career. Within six months I was in conversations for roles at $30k more than anything I&apos;d seen as an SSM. The certification didn&apos;t make me better at my job immediately — but it put me in front of hiring managers who were specifically looking for that signal. The compensation followed from getting in the right conversations.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is SASM worth the investment financially?</p>
              <p className="text-lg text-gray-700">For practitioners targeting Senior SM, RTE, or Agile Coach roles in enterprise environments, yes. The salary premium at those levels makes the course cost recoverable in 1-3 months of employment. The financial case is weaker if you plan to stay in a mid-level SM role at an organization that doesn&apos;t differentiate compensation by certification level.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What roles specifically benefit from SASM?</p>
              <p className="text-lg text-gray-700">Senior Scrum Master, Agile Coach, RTE (Release Train Engineer), and Agile Transformation Lead roles. These roles all require coaching capability above the team level — working with managers, coaching multiple teams, and understanding systemic organizational dynamics — which is exactly what SASM addresses.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How much does SASM add over SSM in salary negotiations?</p>
              <p className="text-lg text-gray-700">At the Senior SM level, the premium is typically $15k–$30k in enterprise markets. This is larger in major metro markets (NYC, SF, Chicago) and smaller in secondary markets. The premium also depends on how many SASM-certified candidates are competing — in markets with few SASM practitioners, scarcity increases the premium.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I get SASM before or after gaining more experience?</p>
              <p className="text-lg text-gray-700">SASM is most valuable when you have enough SM experience (3-5 years) to apply the coaching concepts in practice. Early-career SMs often benefit more from building practical experience before investing in SASM — the certification makes more sense once you have enough context to internalize the advanced content.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does SASM help with RTE roles specifically?</p>
              <p className="text-lg text-gray-700">Yes — most RTE job postings list SASM or equivalent as preferred or required. SASM is the certification that directly bridges SM skills to RTE responsibilities, covering coaching at scale, organizational agility, and Communities of Practice that RTEs manage. RTE certification (a separate credential from Scaled Agile) builds further on the SASM foundation.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Advance to Senior SM and Beyond</p>
            <p className="mb-5">SASM certification develops the coaching and organizational skills that Senior SM, RTE, and Agile Coach roles require.</p>
            <Link href="/courses/advanced-scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SASM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-advanced-scrum-master-vs-ssm" className="text-[#01203d] underline hover:no-underline">SASM vs SSM comparison</Link>
            {" · "}
            <Link href="/blog/rte-salary" className="text-[#01203d] underline hover:no-underline">RTE salary guide</Link>
            {" · "}
            <Link href="/blog/scrum-master-salary-2026" className="text-[#01203d] underline hover:no-underline">Scrum Master salary 2026</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
