import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is SAFe Certification Worth It for Scrum Masters? | Agile36",
  description:
    "SAFe certification for Scrum Masters analyzed: whether SSM or SASM adds meaningful value for working SMs, the salary impact, and how to decide which SAFe cert to pursue first.",
  keywords: ["SAFe certification worth it Scrum Masters", "SSM worth it", "SASM worth it", "SAFe for Scrum Masters", "SAFe vs CSM for Scrum Master", "should Scrum Masters get SAFe certified"],
  openGraph: {
    title: "Is SAFe Certification Worth It for Scrum Masters?",
    description: "Whether SAFe certification adds real value for working Scrum Masters — salary data, role fit, and decision framework.",
    url: "https://www.agile36.com/blog/safe-certification-worth-it-for-scrum-masters",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-certification-worth-it-for-scrum-masters" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>For Scrum Masters working in SAFe organizations, SSM adds <strong>immediate practical value</strong> — it teaches the specific SAFe context (ART ceremonies, PI Planning participation, program-level coordination) that CSM doesn&apos;t cover.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Salary data consistently shows SAFe-certified SMs earning <strong>$10k–$20k more</strong> than non-SAFe-certified counterparts at equivalent experience levels. The premium is most pronounced in enterprise and regulated industry roles.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The SSM vs CSM question is context-dependent. If your employer uses SAFe, SSM is more relevant. If you work in a non-SAFe environment, CSM or PSM may be more portable. Many experienced SMs hold both.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>SASM is the certification that <strong>opens senior SM, Agile Coach, and RTE career paths</strong>. For SMs with 2+ years of experience who want career advancement, SASM is the highest-ROI next certification.</span></li>
      </ul>
    </section>
  );
}

function CertDecisionTree() {
  const scenarios = [
    { scenario: "Currently work in a SAFe org", cert: "SSM", reason: "Directly applicable to your PI Planning and ART ceremonies" },
    { scenario: "Interviewing at SAFe organizations", cert: "SSM", reason: "Required or preferred in 70%+ of enterprise SM postings" },
    { scenario: "2+ years SM experience, want advancement", cert: "SASM", reason: "Unlocks Senior SM, Agile Coach, and RTE career paths" },
    { scenario: "Targeting RTE role", cert: "SASM → RTE", reason: "SASM is standard preparation; RTE cert validates the role" },
    { scenario: "Working in non-SAFe environment", cert: "CSM or PSM", reason: "More portable across organizations; SAFe context less relevant" },
    { scenario: "Aiming for Agile Coach role", cert: "SASM + ICP-ACC", reason: "Combines SAFe coaching depth with vendor-neutral coaching credential" },
  ];
  return (
    <section aria-label="Certification decision guide" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Which SAFe Cert Should Scrum Masters Get?</h3>
      <div className="space-y-3">
        {scenarios.map((s) => (
          <div key={s.scenario} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#01203d]">{s.scenario}</p>
              <p className="text-xs text-gray-500 mt-1">{s.reason}</p>
            </div>
            <div className="bg-[#01203d] text-yellow-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{s.cert}</div>
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
          "For enterprise Scrum Masters, SAFe certification is increasingly not optional — it's a baseline expectation. Enterprise job postings in financial services, healthcare, defense, and retail consistently list SSM or equivalent as required or strongly preferred.",
          "The ROI question for SAFe certification shouldn't focus only on salary. SSM significantly reduces the learning curve when joining a SAFe organization, making you effective faster. SASM opens roles (Senior SM, Agile Coach, RTE) that pay substantially more regardless of credential-specific salary premiums.",
          "CSM (Scrum Alliance) and SSM (Scaled Agile) are not competitors — they cover different levels of the agile practice stack. CSM covers Scrum fundamentals; SSM covers Scrum within the SAFe context. Many enterprise SMs hold both, treating CSM as foundational and SSM as organization-specific.",
          "SAFe certification has a one-year expiry and $100 renewal fee. Factor the renewal cost and PDU requirement into your ROI calculation when comparing SAFe certifications to longer-lived credentials like PSM I (no expiry) or CSM (2-year renewal).",
          "The clearest signal that SAFe certification is worth it: your current or target employer uses SAFe. The framework knowledge, vocabulary, and ceremony understanding are immediately applicable. Without that organizational context, the value is lower.",
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

export default function SafeCertificationWorthItForScrumMastersPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Is SAFe Certification Worth It for Scrum Masters?
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Certification Worth It for Scrum Masters</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Career Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Is SAFe Certification Worth It for Scrum Masters?
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Scrum Masters who work in or apply to enterprise environments encounter SAFe certification requirements constantly. The practical question — is SAFe certification actually worth the time and cost — depends heavily on where you work and where you want to go. For SMs targeting SAFe organizations, the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master course</Link>{" "}
            is the most immediate investment to make; for those ready for career advancement, the{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SASM course</Link>{" "}
            opens doors that SSM alone doesn&apos;t.
          </p>

          <ExecutiveSummary />

          <CertDecisionTree />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">SAFe Certification and SM Salary</h2>
          <p className="text-lg text-gray-700 mb-4">
            Job posting analysis and salary survey data consistently show a meaningful premium for SAFe-certified Scrum Masters. SSM-certified SMs in enterprise roles typically earn $5k–$15k more than non-certified peers at equivalent experience levels. The premium is most visible in financial services, healthcare, defense, and retail — industries where SAFe adoption is highest.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            SASM carries a larger premium than SSM — not because the credential itself commands a specific number, but because SASM opens roles with higher base compensation. Senior SM, Agile Coach, and RTE roles pay $20k–$40k more than mid-level SM roles, and most of those roles list SASM as required or preferred.
          </p>

          <PullQuote attribution="Scrum Master, enterprise retail">
            I had CSM when I joined my current employer. They use SAFe and my manager pushed me to get SSM immediately. I went from struggling with PI Planning vocabulary and ART ceremonies to actually contributing to them in about three weeks. The certification wasn&apos;t just a credential — it was the fastest way to get context I genuinely needed for the role.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I get SSM before SASM?</p>
              <p className="text-lg text-gray-700">Yes — SSM is the formal prerequisite for SASM. But more importantly, SSM gives you the SAFe team-level context that makes SASM&apos;s coaching content applicable. Practitioners who rush from a non-SAFe background to SASM without real SM experience often find the coaching content abstract. SSM first, real experience second, SASM third.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does the SSM certification last?</p>
              <p className="text-lg text-gray-700">SAFe certifications (including SSM) last one year. Renewal requires 20 PDUs and a $100 fee. This annual renewal is more frequent than CSM (2-year) or PSM I (no expiry) — factor this into your decision if certification maintenance cost matters.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is SSM harder than CSM?</p>
              <p className="text-lg text-gray-700">Different, not harder. The SSM exam is closed book (CSM may involve an open assessment depending on provider). The SSM covers SAFe-specific content — ART ceremonies, PI Planning, the Scrum Master role within the SAFe context — rather than fundamental Scrum concepts. Practitioners with solid CSM preparation find SSM challenging because the content is substantively different, not just incremental.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I get SSM without working in a SAFe org?</p>
              <p className="text-lg text-gray-700">Yes — the SSM course is open to anyone. Many practitioners take SSM before joining a SAFe organization, specifically to improve their interview competitiveness. The content makes more sense with SAFe org experience, but it&apos;s valid to get the certification proactively if SAFe environments are your target.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the SSM exam format?</p>
              <p className="text-lg text-gray-700">The SSM exam is 45 questions, 90 minutes, closed book, with a 73% passing score (33 out of 45 correct). The exam tests SAFe Scrum Master role knowledge — team ceremonies, ART participation, PI Planning facilitation, impediment removal, and coaching within the SAFe context.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get SAFe Certified</p>
            <p className="mb-5">SSM for working Scrum Masters in SAFe environments. SASM for those targeting Senior SM, Agile Coach, and RTE career paths.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-salary-2026" className="text-[#01203d] underline hover:no-underline">Scrum Master salary 2026</Link>
            {" · "}
            <Link href="/blog/safe-advanced-scrum-master-prerequisites" className="text-[#01203d] underline hover:no-underline">SASM prerequisites</Link>
            {" · "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
