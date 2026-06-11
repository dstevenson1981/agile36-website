import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POPM Salary: What SAFe Product Owners and Product Managers Earn | Agile36",
  description:
    "SAFe POPM salary data for 2026. What Product Owners and Product Managers with SAFe POPM certification earn by city, industry, and experience level.",
  keywords: ["POPM salary", "SAFe product owner salary", "SAFe product manager salary", "POPM certification salary", "safe POPM pay", "product owner manager salary"],
  openGraph: {
    title: "POPM Salary: What SAFe Product Owners and Product Managers Earn",
    description: "SAFe POPM certification salary ranges by role, city, and experience in 2026.",
    url: "https://www.agile36.com/blog/popm-salary",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/popm-salary" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SAFe Product Owners earn <strong>$90,000–$130,000</strong> at the mid-level. Product Managers in SAFe programs (program-level role) earn <strong>$115,000–$165,000</strong> — reflecting the broader scope of the PM role.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>POPM certification adds <strong>10–20% salary premium</strong> in enterprise environments where SAFe is the operating model. Employers use it as a filter for shortlisting candidates.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The SAFe distinction between <strong>Product Owner</strong> (story-level, team-facing) and <strong>Product Manager</strong> (feature-level, customer-facing) drives a significant salary gap between the two roles at senior levels.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Tech companies, financial services, and healthcare are the top-paying industries for POPM-certified practitioners — driven by large SAFe programs with complex product backlogs.</span></li>
      </ul>
    </section>
  );
}

function SalaryByRole() {
  const data = [
    { role: "Product Owner (team-level)", low: 90, high: 128, pct: 68 },
    { role: "Sr. Product Owner (SAFe)", low: 105, high: 145, pct: 78 },
    { role: "Product Manager (SAFe PM)", low: 115, high: 165, pct: 88 },
    { role: "Sr. Product Manager (SAFe)", low: 130, high: 180, pct: 95 },
    { role: "Group PM / Head of Product", low: 150, high: 200, pct: 100 },
  ];
  return (
    <section aria-label="POPM salary by role" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">POPM Salary by Role (2026, US Mid–Senior Level)</h3>
      <div className="space-y-3">
        {data.map((r) => (
          <div key={r.role} className="flex items-center gap-3">
            <div className="w-52 text-right text-sm font-medium text-gray-700 hidden sm:block">{r.role}</div>
            <div className="w-full sm:flex-1 bg-gray-100 rounded-full h-8">
              <div className="h-8 rounded-full bg-[#01203d] flex items-center px-3" style={{ width: `${r.pct}%` }}>
                <span className="text-yellow-400 text-xs font-bold">${r.low}k–${r.high}k</span>
              </div>
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
    "The POPM covers two distinct roles — Product Owner and Product Manager. Understanding the difference is key to targeting the right job title and salary band.",
    "Product Manager (SAFe program-level) consistently out-earns Product Owner (team-level) because the PM role owns feature delivery across multiple teams and has broader stakeholder responsibility.",
    "The POPM certification adds real value in enterprise markets. Many large organizations require it for product roles on SAFe ARTs — without it, candidates often don't pass initial screening.",
    "Industry drives significant salary variation. A POPM-certified Product Manager in fintech earns more than a peer in retail because the complexity and risk of the product domain commands premium compensation.",
    "Career progression in SAFe product roles goes: Product Owner → Senior Product Owner → Product Manager → Group PM / VP Product. The POPM credential accelerates the PO-to-PM transition.",
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

export default function POPMSalaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          POPM Salary: What SAFe Product Owners and Product Managers Earn
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>POPM Salary</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career &amp; Salary</span>
          <span className="text-sm text-[#718aa5]">Salary Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          POPM Salary: What SAFe Product Owners and Product Managers Earn
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            SAFe&apos;s POPM certification covers two distinct product roles — Product Owner and Product Manager — and the salary data for each is meaningfully different. If you&apos;re evaluating the{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe POPM course</Link>{" "}
            or benchmarking your current compensation against the market, this guide breaks down what each role earns in 2026 and what factors drive the difference.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Product Owner vs Product Manager: The Salary Gap</h2>
          <p className="text-lg text-gray-700 mb-4">
            In SAFe, Product Owner and Product Manager are distinct roles at different levels of the hierarchy. Product Owners work at the team level — they own the team backlog, refine stories with developers, and represent business priorities in sprint planning. Product Managers work at the ART level — they own the Program Backlog, define features, and work with Business Owners and customers to set direction.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This scope difference drives a consistent salary gap. A senior Product Owner typically earns $105,000–$145,000. A senior Product Manager working at the ART level earns $130,000–$180,000. Both may hold the POPM certification, but the PM role commands a premium because it owns strategy, not just execution.
          </p>

          <SalaryByRole />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">POPM Salary by Industry</h2>
          <p className="text-lg text-gray-700 mb-4">
            Industry is one of the strongest drivers of POPM-certified salary variation. Tech companies tend to pay PMs in equity rather than high base salaries — total compensation in tech often exceeds other industries even when base looks similar. Financial services pays high base salaries with cash bonuses. Healthcare technology is a fast-growing market with strong demand for product practitioners who understand regulated environments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[
              { industry: "Financial Services / Fintech", range: "$125k–$175k", note: "Highest base; often includes cash bonus" },
              { industry: "Technology / SaaS", range: "$120k–$180k", note: "Equity-heavy; total comp often exceeds base" },
              { industry: "Healthcare Technology", range: "$110k–$158k", note: "Fast-growing demand; regulatory complexity premium" },
              { industry: "Defense / Government", range: "$105k–$148k", note: "Stable; clearance adds premium" },
              { industry: "Retail / Consumer", range: "$95k–$140k", note: "Lower ceiling but broad remote opportunity" },
              { industry: "Consulting / Advisory", range: "$130k–$190k", note: "Contract rates; variable by project" },
            ].map((ind) => (
              <div key={ind.industry} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-[#01203d] text-sm mb-1">{ind.industry}</p>
                <p className="text-xl font-bold text-gray-900 mb-1">{ind.range}</p>
                <p className="text-xs text-gray-500">{ind.note}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Product Manager, enterprise SaaS">
            Getting the POPM was the credential that moved me from Product Owner to Product Manager. My employer explicitly listed it as a requirement for the PM role — not the PO role. Understanding feature vs story thinking was what the exam tested, and what my manager said he was hiring for.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is POPM the same as CSPO (Certified Scrum Product Owner)?</p>
              <p className="text-lg text-gray-700">No. The CSPO is a Scrum Alliance credential focused on team-level product ownership in Scrum. The POPM covers both the team-level PO role and the SAFe-specific Product Manager role at the ART level. In enterprise SAFe environments, the POPM is typically required over CSPO because it covers the full SAFe product model.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does POPM salary compare to a traditional Product Manager?</p>
              <p className="text-lg text-gray-700">Comparable in many markets. The POPM credential signals SAFe fluency, which matters specifically at large-scale enterprise employers. At startups or product-led tech companies, a traditional PM with strong outcome-ownership may earn more than a POPM-certified enterprise PM — context determines which credential is valued more.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need experience to take the POPM course?</p>
              <p className="text-lg text-gray-700">SAFe recommends 5+ years of business experience and familiarity with agile before the POPM. The course doesn&apos;t teach basic product management — it teaches SAFe-specific product roles. Candidates with no agile experience often struggle with the exam and the role transitions. See our <Link href="/blog/popm-prerequisites" className="text-[#01203d] underline hover:no-underline">POPM prerequisites guide</Link> for the full picture.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Earn Your SAFe POPM Certification</p>
            <p className="mb-5">Two-day live POPM training covering product ownership, feature delivery, and program backlog management in SAFe.</p>
            <Link href="/courses/product-owner-manager" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View POPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/popm-exam-questions" className="text-[#01203d] underline hover:no-underline">POPM exam questions</Link>
            {" · "}
            <Link href="/blog/popm-vs-cspo" className="text-[#01203d] underline hover:no-underline">POPM vs CSPO comparison</Link>
            {" · "}
            <Link href="/blog/safe-agilist-salary" className="text-[#01203d] underline hover:no-underline">SAFe Agilist salary</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
