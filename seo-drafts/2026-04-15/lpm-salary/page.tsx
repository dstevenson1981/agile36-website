import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPM Certification Salary: What Lean Portfolio Managers Earn | Agile36",
  description:
    "Lean Portfolio Management (LPM) salary data for 2026. What SAFe LPM-certified professionals earn by role, industry, and experience.",
  keywords: ["LPM certification salary", "lean portfolio management salary", "SAFe LPM salary", "lean portfolio manager pay", "safe LPM certified salary", "portfolio management agile salary"],
  openGraph: {
    title: "LPM Certification Salary: What Lean Portfolio Managers Earn",
    description: "Lean Portfolio Management certification salary by role, industry, and experience in 2026.",
    url: "https://www.agile36.com/blog/lpm-salary",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/lpm-salary" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>LPM-certified professionals typically operate at the <strong>director, VP, and executive level</strong> — connecting portfolio investment decisions to ART-level delivery. Base salaries range from <strong>$130,000–$200,000+</strong>.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The LPM certification is one of the most <strong>senior-level SAFe credentials</strong>, designed for CFOs, VPs of Technology, portfolio managers, and enterprise transformation leads — not team-level practitioners.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Finance, defense, and large-enterprise technology are the highest-paying sectors for LPM-certified professionals — often in roles managing <strong>$50M–$500M+ in technology investment</strong>.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>LPM-certified consultants and SPC practitioners who run portfolio workshops and ART launches charge <strong>$175–$275/hour</strong> for enterprise engagements.</span></li>
      </ul>
    </section>
  );
}

function SalaryByRole() {
  const roles = [
    { role: "Portfolio Manager (LPM)", low: 130, high: 175, pct: 72 },
    { role: "VP of Technology / Engineering", low: 155, high: 210, pct: 90 },
    { role: "Enterprise Agile Coach (LPM)", low: 140, high: 185, pct: 80 },
    { role: "Chief of Staff / Transformation Lead", low: 135, high: 180, pct: 78 },
    { role: "LPM Consultant (SPC, contract)", low: 165, high: 240, pct: 100 },
    { role: "Director of Agile Transformation", low: 145, high: 195, pct: 84 },
  ];
  return (
    <section aria-label="LPM salary by role" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">LPM-Certified Salary by Role (2026, US)</h3>
      <div className="space-y-3">
        {roles.map((r) => (
          <div key={r.role} className="flex items-center gap-3">
            <div className="w-56 text-right text-sm font-medium text-gray-700 hidden sm:block">{r.role}</div>
            <div className="w-full sm:flex-1 bg-gray-100 rounded-full h-8">
              <div className="h-8 rounded-full bg-[#01203d] flex items-center px-3" style={{ width: `${r.pct}%` }}>
                <span className="text-yellow-400 text-xs font-bold">${r.low}k–${r.high}k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Ranges represent total cash compensation. Equity and bonus structures vary widely at VP and above.</p>
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
    "LPM is a senior credential for senior professionals. It pays significantly more than team-level SAFe certifications because the role it certifies operates at a different level of organizational impact.",
    "The LPM certification's biggest value is vocabulary and framework: it gives portfolio leaders the language to connect investment strategy to delivery — and the tools (Participatory Budgeting, Portfolio Kanban) to act on it.",
    "In consulting, LPM expertise commands a significant premium. Very few practitioners combine portfolio finance knowledge, SAFe program expertise, and executive communication skills.",
    "LPM-certified VPs who lead SAFe transformations often negotiate beyond the salary ranges above — especially when the role involves cultural transformation across an entire organization.",
    "The path to LPM is typically: SAFe SA → 5–10 years of program/portfolio leadership → LPM course. Attempting LPM without leadership experience produces practitioners who can pass the exam but can't apply the content.",
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

export default function LPMSalaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          LPM Certification Salary: What Lean Portfolio Managers Earn
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>LPM Salary</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career &amp; Salary</span>
          <span className="text-sm text-[#718aa5]">Salary Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          LPM Certification Salary: What Lean Portfolio Managers Earn
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Lean Portfolio Management sits at the intersection of agile delivery and executive strategy — which is why LPM-certified professionals command compensation well above most other SAFe credentials. If you&apos;re evaluating the{" "}
            <Link href="/courses/lean-portfolio-management" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe LPM course</Link>{" "}
            or wondering whether the investment is justified, this guide covers what portfolio leaders with LPM certification earn in 2026 and what drives the premium.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What the LPM Certification Is For</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SAFe Lean Portfolio Management certification is designed for executives and senior leaders responsible for technology investment strategy. The core curriculum covers three areas: Strategy and Investment Funding (connecting portfolio decisions to business outcomes), Agile Portfolio Operations (how ARTs and Solution Trains connect to portfolio governance), and Lean Governance (measuring outcomes, managing risk, and evolving the portfolio).
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Unlike the SSM or POPM — which prepare practitioners for specific delivery roles — the LPM is a leadership credential. It&apos;s most useful for VPs, portfolio managers, enterprise architects, and CFOs who oversee technology investment decisions and need to understand how to connect those decisions to agile delivery at scale.
          </p>

          <SalaryByRole />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Moves LPM Compensation Higher</h2>
          <p className="text-lg text-gray-700 mb-4">
            Several factors drive LPM compensation above the ranges above. Portfolio size matters: a portfolio manager overseeing 10 ARTs and $300M in annual technology investment negotiates differently than one overseeing 2 ARTs and $30M. Industry matters: defense and financial services pay significantly more than retail or consumer goods for the same role scope.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Consulting multiplies the range. LPM practitioners who can run Participatory Budgeting workshops, launch Portfolio Kanbans, and align executives on value stream funding don&apos;t charge like agile coaches — they charge like management consultants. Rates of $200–$275/hour for LPM-specific portfolio design work are consistent in the market.
          </p>

          <PullQuote attribution="VP of Technology, global insurance company">
            The LPM certification gave me the vocabulary to talk about portfolio decisions in a way that resonated with our CFO. I wasn&apos;t just saying &apos;we need agile&apos; — I was saying &apos;we need to fund value streams instead of projects and here&apos;s exactly what that means for our budget cycle.&apos;
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the LPM certification worth it for mid-level practitioners?</p>
              <p className="text-lg text-gray-700">Generally, no — not yet. The LPM content is most valuable when you have decision-making authority over technology investment. Mid-level practitioners benefit more from SASM, RTE, or SA credentials that develop delivery leadership skills before moving to portfolio strategy. The LPM makes sense at Director level and above.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is Participatory Budgeting and why does it matter for salary?</p>
              <p className="text-lg text-gray-700">Participatory Budgeting is a SAFe technique for allocating portfolio funding across value streams through a collaborative process rather than top-down budget assignment. It&apos;s a core LPM skill and one that large organizations pay well for — practitioners who can facilitate this process are rare and in demand.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does LPM relate to Lean Portfolio Management vs project portfolio management?</p>
              <p className="text-lg text-gray-700">Traditional project portfolio management (PPM) funds and governs projects — temporary endeavors with defined start/end dates. Lean Portfolio Management funds and governs value streams — persistent, ongoing delivery capabilities. The shift from PPM to LPM is the core transformation most enterprises undertake in SAFe adoptions, and it&apos;s one of the most disruptive changes to existing governance structures.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Lead Your Portfolio Transformation</p>
            <p className="mb-5">SAFe LPM training for senior leaders connecting investment strategy to agile delivery at scale.</p>
            <Link href="/courses/lean-portfolio-management" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View LPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/lpm-certification-worth-it" className="text-[#01203d] underline hover:no-underline">Is LPM certification worth it?</Link>
            {" · "}
            <Link href="/blog/rte-salary" className="text-[#01203d] underline hover:no-underline">RTE salary guide</Link>
            {" · "}
            <Link href="/blog/safe-agilist-salary" className="text-[#01203d] underline hover:no-underline">SAFe Agilist salary</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
