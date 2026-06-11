import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Salary 2026: What You Can Expect to Earn | Agile36",
  description:
    "Scrum Master salary data for 2026 by city, experience level, and certification. How SAFe SSM and CSM credentials affect earning potential.",
  keywords: ["scrum master salary 2026", "scrum master salary", "how much does a scrum master make", "scrum master pay", "SSM salary", "CSM salary"],
  openGraph: {
    title: "Scrum Master Salary 2026: What You Can Expect to Earn",
    description: "Scrum Master salary by city, experience level, and certification in 2026.",
    url: "https://www.agile36.com/blog/scrum-master-salary-2026",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-salary-2026" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>US Scrum Masters earn <strong>$95,000–$140,000</strong> at the mid-level (3–7 years). Senior SMs with SAFe credentials in major markets typically reach <strong>$130,000–$165,000</strong>.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>SAFe-certified Scrum Masters (SSM) earn on average <strong>15–20% more</strong> than non-certified peers in enterprise environments — because enterprise clients require SAFe experience.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Finance, healthcare, and defense are the highest-paying industries for Scrum Masters — driven by regulatory complexity and the scale of their SAFe programs.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Remote Scrum Master roles now represent a large share of postings, which has compressed geographic salary differences — but high-cost cities still command a premium for on-site roles.</span></li>
      </ul>
    </section>
  );
}

function SalaryByCity() {
  const cities = [
    { city: "San Francisco / Bay Area", low: 120, high: 165, pct: 95 },
    { city: "New York City", low: 115, high: 158, pct: 90 },
    { city: "Seattle", low: 112, high: 155, pct: 87 },
    { city: "Boston", low: 108, high: 150, pct: 84 },
    { city: "Washington DC", low: 105, high: 148, pct: 82 },
    { city: "Chicago", low: 100, high: 140, pct: 78 },
    { city: "Austin / Dallas", low: 95, high: 135, pct: 74 },
    { city: "Atlanta", low: 90, high: 128, pct: 70 },
    { city: "Remote (US)", low: 88, high: 130, pct: 72 },
  ];
  return (
    <section aria-label="Scrum Master salary by city 2026" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Scrum Master Salary by City (2026, Mid-Level)</h3>
      <div className="space-y-3">
        {cities.map((c) => (
          <div key={c.city} className="flex items-center gap-3">
            <div className="w-44 text-right text-sm font-medium text-gray-700 hidden sm:block">{c.city}</div>
            <div className="w-full sm:flex-1 bg-gray-100 rounded-full h-8">
              <div className="h-8 rounded-full bg-[#01203d] flex items-center justify-between px-3" style={{ width: `${c.pct}%` }}>
                <span className="text-yellow-400 text-xs font-bold">${c.low}k–${c.high}k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Figures represent total cash compensation for 3–7 years experience. Source: aggregated 2025–2026 job market data.</p>
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
    "Scrum Master salaries have grown steadily since 2022 — remote work normalization and enterprise SAFe adoption both drove demand for qualified practitioners.",
    "The SAFe SSM certification adds real market value in enterprise settings. Many Fortune 500 job postings require it as a baseline filter, not a nice-to-have.",
    "Moving from team-level SM to ART-level roles (Scrum of Scrums, RTE coaching) is the clearest path to six-figure compensation — and the Advanced Scrum Master (SASM) certification is the credential that signals that readiness.",
    "Industry matters as much as geography. A Scrum Master in financial services in Atlanta may out-earn a peer in tech in Denver because of the scale and compliance complexity of FS SAFe programs.",
    "Contract and consulting Scrum Masters earn 30–50% more per hour than salaried counterparts — at the cost of benefits, stability, and the slow relationship-building that drives long-term career growth.",
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

export default function ScrumMasterSalary2026Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Salary 2026: What You Can Expect to Earn
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Salary 2026</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career & Salary</span>
          <span className="text-sm text-[#718aa5]">Salary Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Salary 2026: What You Can Expect to Earn
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Scrum Master compensation has matured significantly as enterprises standardize on SAFe and demand certified practitioners for large-scale programs. Whether you&apos;re evaluating a career move or benchmarking your current pay, this guide covers Scrum Master salary ranges for 2026 by city, experience, certification, and industry. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master (SSM) certification</Link>{" "}
            is increasingly the minimum requirement for enterprise Scrum Master roles.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Scrum Master Salary by Experience Level</h2>
          <p className="text-lg text-gray-700 mb-4">
            Experience level drives salary more than any other single factor. Entry-level Scrum Masters transitioning from project management or business analysis typically start at $75,000–$90,000. After 3–5 years with SAFe experience and a certification, the market moves to $100,000–$130,000. Senior practitioners running ART-level programs or coaching multiple teams reach $140,000–$165,000 in competitive markets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            {[
              { level: "Entry (0–2 yrs)", range: "$72k–$90k", note: "Transitioning from PM/BA; CSM or SSM typically required" },
              { level: "Mid (3–7 yrs)", range: "$95k–$140k", note: "Enterprise SM with SAFe experience; SSM common" },
              { level: "Senior (8+ yrs)", range: "$130k–$165k", note: "ART coaching, SASM/RTE candidates; leadership track" },
            ].map((l) => (
              <div key={l.level} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="text-sm font-bold text-[#01203d] mb-1">{l.level}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{l.range}</p>
                <p className="text-xs text-gray-500">{l.note}</p>
              </div>
            ))}
          </div>

          <SalaryByCity />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Certification Premium: SSM vs CSM vs No Cert</h2>
          <p className="text-lg text-gray-700 mb-4">
            Both the SAFe SSM and the CSM carry meaningful market value, but they serve different contexts. The CSM is the baseline credential — most Scrum Masters have it. The SSM adds specific SAFe enterprise knowledge and opens doors at large organizations running SAFe programs. The SASM (Advanced Scrum Master) positions practitioners for Scrum of Scrums facilitation, ART coaching, and senior-level roles.
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#01203d] text-white">
                  <th className="p-3 text-left">Certification</th>
                  <th className="p-3 text-left">Typical Salary Premium</th>
                  <th className="p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cert: "No certification", premium: "Baseline", best: "Startups, small teams" },
                  { cert: "CSM (Scrum Alliance)", premium: "+5–10%", best: "General Scrum roles, tech companies" },
                  { cert: "SAFe SSM", premium: "+15–20% (enterprise)", best: "Large SAFe programs, Fortune 500" },
                  { cert: "SAFe SASM", premium: "+20–30%", best: "ART-level roles, senior coaching" },
                  { cert: "SAFe RTE", premium: "+35–50%", best: "Release Train Engineer roles, $150k+" },
                ].map((r, i) => (
                  <tr key={r.cert} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 text-gray-700 border-b border-gray-100 font-medium">{r.cert}</td>
                    <td className="p-3 text-gray-700 border-b border-gray-100">{r.premium}</td>
                    <td className="p-3 text-gray-700 border-b border-gray-100">{r.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PullQuote attribution="Senior Scrum Master, financial services">
            I got my SSM three years after my CSM. Within six months I had two offers at $20k more than my current role — both explicitly listing SAFe SSM as required. The certification is real market value at enterprise scale.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is Scrum Master a good career in 2026?</p>
              <p className="text-lg text-gray-700">Yes, with caveats. Demand for agile practitioners is stable and growing, especially at the enterprise level. However, the market has matured — employers now distinguish between team-level SMs and senior practitioners with SAFe or large-program experience. Getting the right certifications and enterprise exposure is increasingly important for differentiation.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do Scrum Masters get bonuses?</p>
              <p className="text-lg text-gray-700">In some industries, yes. Finance and consulting firms often pay annual bonuses of 10–20% of base. Tech companies tend to compensate with equity rather than cash bonuses. The salary ranges in this guide represent total cash compensation (base + cash bonus) unless noted.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does Scrum Master salary compare to Product Owner salary?</p>
              <p className="text-lg text-gray-700">Product Owners and Scrum Masters start at similar levels. At senior grades, Product Owners (especially in SAFe where they're called Product Managers or Product Owners) often earn slightly more in tech companies because they carry more P&L responsibility. The gap narrows at the Agile Coach and RTE level.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I negotiate using these salary ranges?</p>
              <p className="text-lg text-gray-700">Use them as a benchmark, not a script. Employer size, industry, location, and specific SAFe program maturity all affect what an organization will pay. Research the company's Glassdoor reviews and compare offers against local job postings to triangulate what's realistic before negotiating.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Certify to Compete in the Enterprise Market</p>
            <p className="mb-5">SAFe SSM and SASM training designed for practitioners ready to move into enterprise Scrum Master roles.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                SAFe SSM course
              </Link>
              <Link href="/courses/advanced-scrum-master" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                SAFe SASM course
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
            {" · "}
            <Link href="/blog/ssm-salary" className="text-[#01203d] underline hover:no-underline">SSM salary guide</Link>
            {" · "}
            <Link href="/blog/safe-advanced-scrum-master-vs-ssm" className="text-[#01203d] underline hover:no-underline">SASM vs SSM comparison</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
