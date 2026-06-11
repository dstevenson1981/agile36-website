import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Agilist Salary: What SA Certification Earns You in 2026 | Agile36",
  description:
    "SAFe Agilist (SA) salary ranges by role, city, and experience. How Leading SAFe certification affects compensation for coaches, RTEs, and program leaders.",
  keywords: ["SAFe agilist salary", "SA certification salary", "leading safe salary", "SAFe certification pay", "safe agile salary 2026", "SA certified salary"],
  openGraph: {
    title: "SAFe Agilist Salary: What SA Certification Earns You in 2026",
    description: "How the SAFe Agilist (SA) certification affects salary for agile coaches, RTEs, and program leaders.",
    url: "https://www.agile36.com/blog/safe-agilist-salary",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-agilist-salary" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The SAFe Agilist (SA) credential is typically held by <strong>Agile Coaches, RTEs, Scrum Masters, and program leaders</strong> — people operating at or above the ART level in enterprise environments.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>SA-certified practitioners earn <strong>$110,000–$175,000</strong> depending on role, experience, and location. Senior Agile Coaches and RTEs in high-cost markets consistently reach $155,000+.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The SA certification is the <strong>most widely recognized SAFe credential</strong> and the entry point to all higher SAFe certifications (SASM, RTE, SPC). It signals fluency in the full SAFe framework.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>In consulting and contracting, SA-certified practitioners charge <strong>$100–$175/hour</strong> for SAFe program support — significantly above generalist agile coaching rates.</span></li>
      </ul>
    </section>
  );
}

function SalaryByRole() {
  const roles = [
    { role: "Agile Coach (SA)", low: 120, high: 165, pct: 88 },
    { role: "Release Train Engineer", low: 130, high: 175, pct: 95 },
    { role: "Senior Scrum Master (SA)", low: 110, high: 148, pct: 78 },
    { role: "Product Manager / PM (SA)", low: 115, high: 158, pct: 83 },
    { role: "Program Manager (SA)", low: 108, high: 145, pct: 76 },
    { role: "Transformation Lead (SA)", low: 125, high: 170, pct: 90 },
    { role: "SAFe Consultant (contract)", low: 140, high: 200, pct: 100 },
  ];
  return (
    <section aria-label="SAFe Agilist salary by role" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SA Certified Salary by Role (2026 US, Mid–Senior Level)</h3>
      <div className="space-y-3">
        {roles.map((r) => (
          <div key={r.role} className="flex items-center gap-3">
            <div className="w-52 text-right text-sm font-medium text-gray-700 hidden sm:block">{r.role}</div>
            <div className="w-full sm:flex-1 bg-gray-100 rounded-full h-8">
              <div className="h-8 rounded-full bg-[#01203d] flex items-center justify-between px-3" style={{ width: `${r.pct}%` }}>
                <span className="text-yellow-400 text-xs font-bold">${r.low}k–${r.high}k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Contract rates represent annualized total. Salaried ranges include base; bonus and equity vary by employer.</p>
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
    "The SA certification pays back its investment quickly for practitioners moving into enterprise SAFe environments — the market premium over non-certified peers is 15–25%.",
    "The SA credential is the gateway to higher certifications. SPC (SAFe Program Consultant) and RTE certifications both require SA as a prerequisite.",
    "Consulting is where SA-certified practitioners see the largest compensation premium — enterprise transformation projects pay significantly for SAFe fluency.",
    "Geography still matters for salaried roles. SA-certified practitioners in New York, SF, or DC earn 20–30% more than equivalents in smaller markets — though remote work has compressed this gap for consultant roles.",
    "The fastest path to compensation growth is SA → SASM or RTE → SPC. Each credential opens a new market tier and signal level with enterprise hiring managers.",
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

export default function SAFeAgilistSalaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Agilist Salary: What SA Certification Earns You in 2026
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Agilist Salary</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career &amp; Salary</span>
          <span className="text-sm text-[#718aa5]">Salary Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Agilist Salary: What SA Certification Earns You in 2026
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe Agilist (SA) certification signals fluency in the Scaled Agile Framework at the program and enterprise level — and employers pay for it. Whether you&apos;re an Agile Coach benchmarking your market rate or a Scrum Master deciding whether the{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe course</Link>{" "}
            is worth the investment, this guide covers what SA-certified practitioners earn in 2026 and which factors move the needle most.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Who Gets the SA Certification?</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SA is designed for practitioners who are operating at or above the ART level — Agile Coaches, Release Train Engineers, Scrum Masters in large SAFe programs, Product Managers, and transformation leaders. It&apos;s also the credential that managers, directors, and VPs pursue when their organization is adopting SAFe and they need to understand the framework well enough to lead it.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Unlike the SSM (which is team-focused) or POPM (which is product-focused), the SA is a general enterprise credential. It shows you understand the full SAFe Big Picture — from team to portfolio — and the Lean-Agile principles that underpin all of it.
          </p>

          <SalaryByRole />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">SA vs Other SAFe Credentials: Compensation Comparison</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SA is the foundation credential — it's a prerequisite for the RTE and SPC certifications that command the highest compensation in the SAFe ecosystem. Here&apos;s how the certifications stack up in terms of market positioning and typical salary range:
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#01203d] text-white">
                  <th className="p-3 text-left">Certification</th>
                  <th className="p-3 text-left">Typical Role</th>
                  <th className="p-3 text-left">Salary Range (US)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cert: "SAFe SSM", role: "Scrum Master (team level)", range: "$95k–$140k" },
                  { cert: "SAFe POPM", role: "Product Owner / Manager", range: "$105k–$155k" },
                  { cert: "SAFe SA (Agilist)", role: "Coach, RTE, transformation lead", range: "$110k–$175k" },
                  { cert: "SAFe RTE", role: "Release Train Engineer", range: "$130k–$185k" },
                  { cert: "SAFe SPC", role: "Consultant, transformation architect", range: "$150k–$220k+" },
                ].map((r, i) => (
                  <tr key={r.cert} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 font-semibold text-[#01203d] border-b border-gray-100">{r.cert}</td>
                    <td className="p-3 text-gray-700 border-b border-gray-100">{r.role}</td>
                    <td className="p-3 text-gray-700 border-b border-gray-100 font-medium">{r.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PullQuote attribution="Agile Coach, defense contractor">
            I had 8 years of agile coaching experience before my SA certification. After getting certified, I was able to target a tier of enterprise clients — primarily defense and financial services — that simply wouldn&apos;t consider uncertified coaches. The certification was a market access question, not just a salary question.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the SAFe Agilist certification worth it for a career in agile?</p>
              <p className="text-lg text-gray-700">For practitioners targeting enterprise environments — Fortune 500, government, large financial services — yes. The SA certification is a market filter at these employers. For practitioners in startup or small business contexts, the CSM may be more practical. The SA makes the most sense when you&apos;re coaching or leading programs of 5+ teams.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How often do I need to renew the SA certification?</p>
              <p className="text-lg text-gray-700">SAFe certifications require annual renewal with continuing education credits (PDUs/SEUs). Renewal keeps you current with SAFe version updates — important because SAFe 6.0 made significant changes to roles, events, and competencies. Most active practitioners renew through conference attendance, training, or coaching hours.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What&apos;s the difference between the SA and the SPC certification?</p>
              <p className="text-lg text-gray-700">The SA demonstrates framework fluency. The SPC (SAFe Program Consultant) certifies that you can train and coach other practitioners — it&apos;s the teaching credential. SPCs run SAFe training classes, launch ARTs, and lead transformation programs. It requires SA as a prerequisite and commands significantly higher consulting rates.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Earn Your SAFe Agilist Certification</p>
            <p className="mb-5">Two-day live SAFe SA training with exam prep and 1-year certification included.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/rte-salary" className="text-[#01203d] underline hover:no-underline">RTE salary guide</Link>
            {" · "}
            <Link href="/blog/ssm-salary" className="text-[#01203d] underline hover:no-underline">SSM salary guide</Link>
            {" · "}
            <Link href="/blog/leading-safe-exam-questions" className="text-[#01203d] underline hover:no-underline">Leading SAFe exam questions</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
