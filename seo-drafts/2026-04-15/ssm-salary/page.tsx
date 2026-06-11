import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Scrum Master Salary 2026: What SSMs Actually Earn | Agile36",
  description:
    "SAFe Scrum Master salary data for 2026 by city, industry, and experience level. Understand what the SSM certification adds to your earning potential.",
  keywords: [
    "SAFe Scrum Master salary",
    "SSM salary 2026",
    "SAFe Scrum Master pay",
    "Scrum Master salary SAFe",
    "SSM certification salary",
    "Scrum Master salary by city",
  ],
  openGraph: {
    title: "SAFe Scrum Master Salary 2026: What SSMs Actually Earn",
    description:
      "SAFe Scrum Master salary data for 2026 by city, industry, and experience level. Understand what the SSM certification adds to your earning potential.",
    url: "https://www.agile36.com/blog/ssm-salary",
    siteName: "Agile36",
    type: "article",
  },
  alternates: {
    canonical: "https://www.agile36.com/blog/ssm-salary",
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

function ExecutiveSummary() {
  return (
    <section aria-label="At a glance" className="bg-gray-50 border-l-4 border-[#01203d] p-6 md:p-8 my-10 rounded-r-lg">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#01203d] font-bold mb-4">At a glance</p>
      <ul className="space-y-3 text-gray-800 text-[17px] leading-relaxed">
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">01</span>
          <span>SAFe Scrum Masters working on Agile Release Trains in large enterprises typically earn <strong>$110,000–$145,000</strong> per year in major US markets, with some federal and financial services roles exceeding $160,000.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">02</span>
          <span>The <strong>SSM certification adds a measurable premium</strong> over uncertified Scrum Masters — particularly at companies running SAFe, where the credential is now a standard screening filter.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">03</span>
          <span>City, industry, and company size matter more than certification alone — a San Francisco SAFe SM at a 10,000-person company earns significantly more than the same role in a mid-sized Midwest firm.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-yellow-500 font-bold">04</span>
          <span>Stacking SSM with Advanced Scrum Master (SASM) or RTE credentials opens senior and principal-level bands that push total comp significantly higher.</span>
        </li>
      </ul>
    </section>
  );
}

function SalaryChart() {
  const cities = [
    { city: "San Francisco / Bay Area", salary: "$145K", pct: 97 },
    { city: "New York / NYC Metro", salary: "$138K", pct: 92 },
    { city: "Seattle", salary: "$133K", pct: 89 },
    { city: "Washington D.C. / Federal", salary: "$130K", pct: 87 },
    { city: "Austin / Dallas", salary: "$120K", pct: 80 },
    { city: "Chicago", salary: "$118K", pct: 79 },
    { city: "Miami / South Florida", salary: "$110K", pct: 74 },
    { city: "Atlanta", salary: "$112K", pct: 75 },
    { city: "National Median", salary: "$115K", pct: 77 },
  ];
  return (
    <section aria-label="SAFe Scrum Master salary by city" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Median SSM Salary by Metro (2026 Estimates)</h3>
      <div className="space-y-3">
        {cities.map((c) => (
          <div key={c.city}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{c.city}</span>
              <span className="font-bold text-[#01203d]">{c.salary}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div className="h-5 rounded-full bg-[#01203d]" style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Estimates based on job posting analysis and reported compensation data. Actual offers vary by experience, company, and negotiation.</p>
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
    "SAFe Scrum Masters earn a meaningful premium over non-SAFe Scrum Masters because they operate in larger, better-funded programs.",
    "Industry matters as much as city — federal defense, financial services, and healthcare IT consistently pay in the top tier.",
    "The SSM certification is now a standard screening criterion at large enterprise SAFe shops, not a nice-to-have.",
    "Stacking SASM, RTE, or coaching credentials moves Scrum Masters into senior and principal bands that exceed $160K in top markets.",
    "Consulting and contract Scrum Master roles can significantly exceed W2 salaries — $90–$120/hour is common for senior SSMs on SAFe engagements.",
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

export default function SsmSalaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Scrum Master Salary 2026: What SSMs Actually Earn
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link>
          <span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link>
          <span>/</span>
          <span>SSM Salary 2026</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Salary Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Scrum Master Salary 2026: What SSMs Actually Earn
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The <strong>SAFe Scrum Master salary</strong> question comes up in almost every training cohort — and the honest answer is more nuanced than most salary aggregators let on. After placing students in roles across financial services, defense, healthcare, and technology, we've learned that the SSM certification is one of several variables that influence comp — and understanding which variables move the needle most helps you negotiate better. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">
              SAFe Scrum Master course
            </Link>{" "}
            is a 2-day investment — this guide helps you understand what that investment is worth in the job market.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            We'll cover what SSMs earn by city, industry, and experience level, how the certification affects salary bands, and where the highest-paying opportunities concentrate.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why SAFe Scrum Masters Earn More</h2>
          <p className="text-lg text-gray-700 mb-4">
            A SAFe Scrum Master operates at a different scope than a single-team Scrum Master. On an Agile Release Train with 8–12 teams, SSMs coordinate dependencies across teams, facilitate ART-level events, coach team members on SAFe practices, and participate in PI Planning — a bi-quarterly event that requires fluency in multi-team coordination.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This operational complexity is why SSM roles at large enterprises come with higher compensation bands. The work is harder and the organizational impact is larger. An SSM at a Fortune 500 company running a 10-ART transformation isn't doing the same job as a solo Scrum Master on a 6-person team — and the market reflects that.
          </p>

          <SalaryChart />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Salary by Industry</h2>
          <p className="text-lg text-gray-700 mb-4">
            Industry is one of the strongest predictors of SSM compensation — often more predictive than city alone:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {[
              { industry: "Defense / Federal Contracting", range: "$125K–$165K", note: "SAFe is DoD standard" },
              { industry: "Financial Services & Banking", range: "$120K–$155K", note: "Large-scale SAFe adoption" },
              { industry: "Healthcare IT", range: "$115K–$145K", note: "Compliance-heavy, SAFe preferred" },
              { industry: "Technology / SaaS", range: "$110K–$150K", note: "Varies by company size" },
              { industry: "Insurance", range: "$110K–$140K", note: "Growing SAFe adoption" },
              { industry: "Retail / Ecommerce", range: "$100K–$130K", note: "Lower ceiling than finance" },
            ].map((r) => (
              <div key={r.industry} className="border border-gray-200 rounded-xl p-5">
                <div className="font-bold text-[#01203d] mb-1">{r.industry}</div>
                <div className="text-xl font-bold text-yellow-600 mb-1">{r.range}</div>
                <div className="text-sm text-gray-500">{r.note}</div>
              </div>
            ))}
          </div>

          <PullQuote attribution="Federal SSM, Department of Defense program">
            When the agency moved to SAFe, every team lead needed an SSM. It went from optional to required overnight — and salaries moved up to match.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How Experience Changes the Picture</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SSM certification alone puts you in contention for entry-level SAFe Scrum Master roles. But the biggest salary jumps come from experience on actual ARTs:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-4">
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded w-16 h-8 flex items-center justify-center flex-shrink-0 text-sm">0–2 yrs</div>
              <div><strong>$85K–$105K.</strong> New SSMs with certification but limited ART experience. Typically placed as team-level Scrum Masters with SSM credential.</div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded w-16 h-8 flex items-center justify-center flex-shrink-0 text-sm">3–5 yrs</div>
              <div><strong>$110K–$135K.</strong> Experienced ART contributors. Often managing team Scrum practices and contributing to PI Planning facilitation.</div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded w-16 h-8 flex items-center justify-center flex-shrink-0 text-sm">6–10 yrs</div>
              <div><strong>$135K–$160K.</strong> Senior SSMs, often with SASM credential. Leading PI Planning facilitation, mentoring junior SMs, coaching teams on advanced practices.</div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded w-16 h-8 flex items-center justify-center flex-shrink-0 text-sm">10+ yrs</div>
              <div><strong>$155K–$185K+.</strong> Principal Scrum Masters, Agile Coaches, or SMEs. Many move toward RTE or SPC paths. Some transition to consulting at $90–$120/hr.</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Credential Stacking: What Adds to SSM Salary</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SSM is a strong starting point. Here's what candidates stack to move into higher salary bands:
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The <strong>SAFe Advanced Scrum Master (SASM)</strong> credential is the most direct next step — it covers coaching multi-team programs, technical agility, and servant leadership at scale. Senior SSM roles increasingly list SASM as preferred. The{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">
              Advanced Scrum Master course
            </Link>{" "}
            builds directly on SSM knowledge.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The <strong>Release Train Engineer (RTE)</strong> certification moves practitioners into a different level — program-level facilitation and ART coaching. RTE roles typically start $20–30K above SSM bands. The{" "}
            <Link href="/courses/release-train-engineer" className="text-[#01203d] font-semibold underline hover:no-underline">
              RTE course
            </Link>{" "}
            is a 3-day program with significantly higher pass requirements.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does the SSM certification directly increase salary?</p>
              <p className="text-lg text-gray-700">It functions as a filter, not a raise. Companies running SAFe screen for SSM in job postings — without it, you may not make the shortlist. Once you're in contention, experience and soft skills determine offer level. The cert gets you in the room.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does SSM salary compare to CSM salary?</p>
              <p className="text-lg text-gray-700">SSMs in enterprise environments typically earn 15–25% more than CSMs in comparable experience brackets, because they operate in larger, more complex program contexts. The comparison depends heavily on the employer — at SAFe shops, SSM typically wins. At startups, CSM may be equivalent.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's the highest-paying SSM market?</p>
              <p className="text-lg text-gray-700">The San Francisco Bay Area and the Washington D.C. federal contracting market both produce top-end SSM salaries — but for different reasons. SF pays more due to tech industry comp structure. D.C. pays well due to the scale and classification levels of federal SAFe programs.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can remote SSMs earn top salaries?</p>
              <p className="text-lg text-gray-700">Yes. Many large enterprise SAFe programs run hybrid or fully remote ARTs, and they pay market rates regardless of candidate location. Remote SSM roles at financial services firms and federal contractors frequently offer the same bands as on-site positions.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do contract SSM rates compare to full-time salaries?</p>
              <p className="text-lg text-gray-700">Contract SSM rates for experienced practitioners on SAFe engagements typically run $75–$120 per hour, depending on market, scope, and client. Annualized, experienced contractors often exceed W2 equivalents — but they pay self-employment taxes and carry their own benefits.</p>
            </div>
          </div>

          <KeyTakeaways />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Get Certified and Get Moving</h2>
          <p className="text-lg text-gray-700 mb-6">
            Agile36 offers live SSM training with a certified SPC trainer — not a recording. The Pro plan includes a free exam retake, practice exams, LinkedIn optimization, and interview prep specifically for SAFe roles.
          </p>
          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Start Your SSM Certification</p>
            <p className="mb-5">Live virtual and in-person. Pro plan covers your exam retake and interview prep.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course dates
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/ssm-vs-csm" className="text-[#01203d] underline hover:no-underline">SSM vs CSM comparison</Link>
            {" · "}
            <Link href="/blog/safe-scrum-master-exam-questions" className="text-[#01203d] underline hover:no-underline">SSM exam questions</Link>
            {" · "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] underline hover:no-underline">Advanced Scrum Master course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
