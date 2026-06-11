import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSM vs CSM: Which Scrum Master Certification Should You Get? | Agile36",
  description:
    "SSM vs CSM compared: how the SAFe Scrum Master and Certified ScrumMaster certifications differ in content, exam format, career impact, and which one is right for your situation.",
  keywords: ["SSM vs CSM", "SAFe Scrum Master vs Certified ScrumMaster", "SSM or CSM", "CSM vs SSM certification", "which Scrum Master certification", "SSM CSM comparison"],
  openGraph: {
    title: "SSM vs CSM: Which Scrum Master Certification Should You Get?",
    description: "How SSM and CSM differ in content, exam, and career impact — and which one fits your situation.",
    url: "https://www.agile36.com/blog/safe-ssm-vs-csm",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-ssm-vs-csm" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>CSM (Certified ScrumMaster, Scrum Alliance) covers <strong>Scrum fundamentals</strong> — the roles, events, and artifacts of Scrum. SSM (SAFe Scrum Master, Scaled Agile) covers the <strong>Scrum Master role within SAFe</strong> — PI Planning, ART ceremonies, team-level SAFe practices.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>They are <strong>not competitors</strong> — they cover different scope. CSM is the foundation; SSM is the SAFe-specific overlay. Many practitioners hold both, treating CSM as their Scrum credential and SSM as their enterprise agile credential.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The SSM exam is <strong>closed book, 45 questions, 90 minutes, 73% passing score</strong>. The CSM assessment is typically an online assessment completed after a 2-day course, administered by the training provider (not a timed proctored exam in the same way).</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>For enterprise job applications, SSM has an advantage over CSM at companies using SAFe. For general Scrum roles and non-SAFe environments, CSM and PSM I (Scrum.org) have broader recognition.</span></li>
      </ul>
    </section>
  );
}

function CertComparison() {
  const rows = [
    { dim: "Issuing body", ssm: "Scaled Agile, Inc.", csm: "Scrum Alliance" },
    { dim: "Content focus", ssm: "SM role within SAFe — ART, PI Planning, program-level", csm: "Scrum fundamentals — roles, events, artifacts, values" },
    { dim: "Exam format", ssm: "Closed book, 45Q, 90 min, 73% pass", csm: "Open assessment, typically after 2-day course" },
    { dim: "Prerequisites", ssm: "None (SSM course attendance required)", csm: "None (CSM course attendance required)" },
    { dim: "Renewal", ssm: "1 year, $100, 20 PDUs", csm: "2 years, $100 (with 20 SEUs)" },
    { dim: "Best for", ssm: "SAFe org roles, enterprise job market", csm: "Scrum foundations, non-SAFe environments" },
    { dim: "Avg salary premium", ssm: "$10k–$20k in enterprise SAFe orgs", csm: "$5k–$15k for Scrum-based teams" },
  ];
  return (
    <section aria-label="SSM vs CSM comparison" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SSM vs CSM: Side by Side</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#01203d] text-white">
              <th className="text-left p-3 rounded-tl-lg w-1/4">Dimension</th>
              <th className="text-left p-3">SSM</th>
              <th className="text-left p-3 rounded-tr-lg">CSM</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.dim} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-semibold text-[#01203d] text-xs">{r.dim}</td>
                <td className="p-3 text-gray-700 text-xs">{r.ssm}</td>
                <td className="p-3 text-gray-700 text-xs">{r.csm}</td>
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
  return (
    <section aria-label="Key takeaways" className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">Key takeaways</p>
      <ol className="space-y-5">
        {[
          "The right choice depends on your organizational context, not the certification's inherent quality. If your employer uses SAFe, SSM is more immediately applicable. If you work in a non-SAFe environment or want portable credentials, CSM (Scrum Alliance) or PSM I (Scrum.org) are more universally recognized.",
          "The CSM doesn't prepare you for SSM-specific content and vice versa. CSM covers the Scrum Guide fundamentals — a necessary foundation. SSM covers how those fundamentals apply within SAFe's organizational structure. Neither course is a prerequisite for the other, but CSM-first is a common and sensible sequencing.",
          "The SSM exam is meaningfully more rigorous than the typical CSM assessment. The SSM is a closed-book timed exam with a 73% passing requirement. Many CSM courses administer an online assessment immediately after training without the same time pressure. Prepare for SSM as you would any proctored exam.",
          "For practitioners in SAFe organizations who hold CSM: adding SSM is strongly recommended. The SSM fills the SAFe-specific knowledge gaps that CSM holders consistently encounter in SAFe environments — particularly around PI Planning facilitation, ART ceremonies, and team-level SAFe practices.",
          "Both certifications have a $100 renewal fee, but different timelines. SSM renews annually (with 20 PDUs); CSM renews every 2 years (with 20 SEUs). If renewal maintenance cost is a factor, CSM's longer renewal cycle reduces ongoing cost. Both require continuing education, which good practitioners would pursue regardless.",
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

export default function SafeSsmVsCsmPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SSM vs CSM: Which Scrum Master Certification Should You Get?
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SSM vs CSM</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Comparison Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SSM vs CSM: Which Scrum Master Certification Should You Get?
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            SSM and CSM are the two most commonly sought Scrum Master certifications, and practitioners are frequently uncertain which one to prioritize. The short answer: they cover different things, and the right choice depends on where you work and where you want to go. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master (SSM) course</Link>{" "}
            is the right choice for practitioners in SAFe environments or targeting enterprise roles at companies that use SAFe. For broader Scrum foundation credentials, CSM from the Scrum Alliance remains widely recognized.
          </p>

          <ExecutiveSummary />

          <CertComparison />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What SSM Teaches That CSM Doesn&apos;t</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SSM course covers the Scrum Master role within the specific SAFe organizational context: how SMs participate in PI Planning, how they support PO Syncs and ART Syncs, how they coach teams within the context of the Agile Release Train, how SAFe ceremonies extend beyond team-level Scrum, and how to connect team-level impediments to program-level resolution. None of this appears in CSM.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            CSM, conversely, develops a deeper understanding of the Scrum Guide, the values and principles behind the ceremonies, and the facilitator mindset that the SM role requires. Many practitioners find CSM provides better foundational coaching depth, while SSM provides the organizational context to apply that depth in SAFe environments.
          </p>

          <PullQuote attribution="Scrum Master, enterprise healthcare">
            I had CSM for two years before my company moved to SAFe. Suddenly I had no context for what an RTE was, what PI Planning involved, or how my team fitted into an ART. Getting SSM filled that gap in three days. I didn&apos;t need to relearn how to be an SM — I needed to understand the organizational structure my SM skills would operate within.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does CSM count as a prerequisite for SASM?</p>
              <p className="text-lg text-gray-700">CSM is typically accepted as equivalent to SSM for SASM registration purposes, since it demonstrates foundational Scrum Master certification. Confirm with your training provider, as policies vary slightly across SAFe Silver Partners. The substantive requirement for SASM is SM experience — the credential type is less important than demonstrated practice.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which certification is more recognized?</p>
              <p className="text-lg text-gray-700">It depends on industry and organization type. In enterprise environments and SAFe organizations, SSM is more recognized. In tech startups, digital agencies, and organizations without SAFe, CSM has equal or greater recognition. PSM I (Scrum.org) is considered technically rigorous across both environments.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which is harder to pass — SSM or CSM?</p>
              <p className="text-lg text-gray-700">SSM is generally more rigorous. The SSM is a closed-book, timed, proctored exam with a 73% passing requirement. CSM assessments are typically open-book online tests taken after the course, often with multiple attempts. This doesn&apos;t make CSM less valuable — the course content is substantive — but the exam format differs significantly.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I get SSM if I have CSM?</p>
              <p className="text-lg text-gray-700">If you work in a SAFe organization or are actively targeting SAFe roles, yes. The SSM adds SAFe-specific knowledge that CSM doesn&apos;t cover, and many enterprise job postings list SSM as required or preferred even for candidates with CSM. The two credentials together are stronger than either alone in enterprise hiring contexts.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is PSM I better than both SSM and CSM?</p>
              <p className="text-lg text-gray-700">PSM I (Scrum.org) is widely regarded as the most technically rigorous SM certification for foundational Scrum knowledge. Its exam is harder than most CSM assessments and comparable to SSM in rigor. However, it covers pure Scrum (not SAFe context). For enterprise SAFe environments, SSM is more applicable than PSM I. For pure Scrum depth, PSM I is excellent.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get SSM Certified</p>
            <p className="mb-5">The SSM course prepares Scrum Masters for SAFe environments — PI Planning participation, ART ceremonies, and the program-level context that enterprise SM roles require.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/ssm-salary" className="text-[#01203d] underline hover:no-underline">SSM salary guide</Link>
            {" · "}
            <Link href="/blog/ssm-exam-tips" className="text-[#01203d] underline hover:no-underline">SSM exam tips</Link>
            {" · "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
