import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SASM Prerequisites: What You Need Before the Advanced Scrum Master Course | Agile36",
  description:
    "SAFe Advanced Scrum Master (SASM) prerequisites explained: the SSM requirement, recommended experience, and how to assess whether you're ready for SASM.",
  keywords: ["SASM prerequisites", "SAFe Advanced Scrum Master prerequisites", "SASM requirements", "what do I need for SASM", "SASM eligibility", "advanced scrum master certification requirements"],
  openGraph: {
    title: "SASM Prerequisites: What You Need Before the Advanced Scrum Master Course",
    description: "What background and certification you need before taking the SAFe SASM course.",
    url: "https://www.agile36.com/blog/safe-advanced-scrum-master-prerequisites",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-advanced-scrum-master-prerequisites" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SASM has a formal prerequisite: <strong>SSM (SAFe Scrum Master) certification or equivalent</strong> is required before taking the SASM course. Scaled Agile enforces this requirement at registration.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Beyond the SSM, Scaled Agile recommends <strong>at least one year of active Scrum Master experience</strong>. The SASM course is designed for practitioners who already know Scrum at the team level and are ready to develop coaching depth.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>CSM (Certified ScrumMaster) is typically accepted as an equivalent to SSM for SASM registration purposes — though this should be confirmed with the training provider. The substantive requirement is <strong>team-level SM experience</strong>, not just credential ownership.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>SASM focuses on what comes <strong>after</strong> team-level SM mastery: coaching individuals and teams to higher agility, working with organizations on systemic impediments, and developing Communities of Practice. Early-career SMs often lack the context to fully apply these concepts.</span></li>
      </ul>
    </section>
  );
}

function ReadinessChecklist() {
  const checks = [
    { item: "Active SSM or equivalent certification", required: true },
    { item: "1+ year active Scrum Master experience", required: true },
    { item: "Facilitated 10+ sprint retrospectives", required: false },
    { item: "Managed organizational impediments (above team level)", required: false },
    { item: "Coached at least one team through a growth challenge", required: false },
    { item: "Participated in PI Planning or ART-level ceremonies", required: false },
  ];
  return (
    <section aria-label="SASM readiness checklist" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SASM Readiness Checklist</h3>
      <div className="space-y-2">
        {checks.map((c) => (
          <div key={c.item} className={`flex items-center gap-3 p-3 rounded-xl ${c.required ? "bg-[#01203d] text-white" : "bg-gray-50"}`}>
            <span className={`text-lg ${c.required ? "text-yellow-400" : "text-gray-400"}`}>{c.required ? "✓" : "○"}</span>
            <span className={`text-sm font-semibold ${c.required ? "text-white" : "text-gray-700"}`}>{c.item}</span>
            {c.required && <span className="ml-auto text-xs text-yellow-300">Required</span>}
            {!c.required && <span className="ml-auto text-xs text-gray-400">Recommended</span>}
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
          "SSM certification is the formal prerequisite. Without it, you cannot register for SASM through official Scaled Agile channels. This is one of the few SAFe certifications with an enforced prerequisite.",
          "The experience requirement matters more than the credential alone. Practitioners who rush from SSM to SASM without building real SM practice often struggle to apply SASM's coaching content. The course resonates most when you have specific team experiences to map it to.",
          "CSM holders (Scrum Alliance) can typically qualify for SASM with their equivalent certification plus experience. Confirm with your training provider — different SAFe partners may have slightly different policies on credential equivalence.",
          "The SASM course is designed for SMs who have hit a ceiling at the team level and are ready to develop as coaches and organizational change agents. If you haven't hit that ceiling yet, the content will feel abstract.",
          "Practitioners targeting RTE roles should treat SASM as mandatory preparation, not optional enrichment. RTE job postings consistently list SASM as required or strongly preferred, and the course content maps directly to what RTEs do at the ART level.",
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

export default function SasmPrerequisitesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SASM Prerequisites: What You Need Before the Advanced Scrum Master Course
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SASM Prerequisites</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Certification Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SASM Prerequisites: What You Need Before the Advanced Scrum Master Course
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe Advanced Scrum Master (SASM) is unique among SAFe certifications in having an enforced prerequisite: SSM (SAFe Scrum Master) or equivalent is required before you can register. This isn&apos;t just a recommendation — it&apos;s enforced at registration. Beyond the formal requirement, the{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SASM course</Link>{" "}
            is designed for practitioners with real SM experience — those who have coached teams, managed impediments, and hit the ceiling of what team-level facilitation can achieve on its own.
          </p>

          <ExecutiveSummary />

          <ReadinessChecklist />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Makes SASM Different from SSM</h2>
          <p className="text-lg text-gray-700 mb-4">
            SSM teaches the Scrum Master role within SAFe — ceremonies, artifacts, how the SM supports the team within an ART. SASM builds on that foundation to develop the SM as a coach: coaching teams past agile basics toward high performance, working with organizational systems that impede agility, and developing Communities of Practice that scale improvement across multiple teams.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The practical difference: SSM gives you the skills to run a well-functioning Scrum team. SASM gives you the skills to develop teams that continually improve — and to work within the organizational context that either enables or limits that improvement.
          </p>

          <PullQuote attribution="Senior Scrum Master, financial technology">
            I waited two years between SSM and SASM, and I&apos;m glad I did. The coaching concepts in SASM — powerful questions, team assessments, working with organizational resistance — would have been abstract theory to me right after SSM. With real team experience, they were immediately applicable. I could map every concept to specific situations I&apos;d been in.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is SSM strictly required, or can experience substitute?</p>
              <p className="text-lg text-gray-700">Scaled Agile requires SSM (or equivalent certification) as a formal prerequisite — experience alone doesn't substitute at registration. If you have significant SM experience with a CSM or equivalent non-SAFe credential, confirm with your training provider whether it qualifies. Most SAFe Silver Partners are flexible on certification equivalence with demonstrated experience.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I take SASM immediately after SSM?</p>
              <p className="text-lg text-gray-700">You can technically enroll immediately after SSM — the formal prerequisite is met. But most practitioners benefit more from 1-2 years of SM practice before SASM. The course content builds on coaching experiences that are hard to have without time in the role. Taking SASM too early often produces practitioners who pass the exam but can't apply the content.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What topics does SASM cover that SSM doesn't?</p>
              <p className="text-lg text-gray-700">SASM covers: coaching stances and when to use each, powerful questions for individual and team development, team assessments and health checks, working with organizational impediments above the team level, Communities of Practice development, and coaching managers on agile behaviors. These are all beyond SSM's team-facilitation focus.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does SASM prepare me for the RTE role?</p>
              <p className="text-lg text-gray-700">Yes — SASM is considered the primary preparation path for the RTE role. The ART-level coaching, program-level coordination, and organizational agility content in SASM maps directly to what RTEs do daily. Most RTE job postings list SASM as required or preferred alongside the RTE certification itself.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does it take between SSM and SASM?</p>
              <p className="text-lg text-gray-700">There's no required waiting period — only the formal SSM prerequisite. The recommended guidance from Scaled Agile is 1+ year of active SM experience, which aligns with most practitioners' natural career progression. Many practitioners take SSM in year one and SASM in year two or three.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Ready for SASM?</p>
            <p className="mb-5">If you have your SSM and real team coaching experience, SASM develops the next level of capability — for Senior SM, Agile Coach, and RTE roles.</p>
            <Link href="/courses/advanced-scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SASM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-advanced-scrum-master-vs-ssm" className="text-[#01203d] underline hover:no-underline">SASM vs SSM comparison</Link>
            {" · "}
            <Link href="/blog/rte-career-path" className="text-[#01203d] underline hover:no-underline">RTE career path</Link>
            {" · "}
            <Link href="/blog/agile-coaching-techniques" className="text-[#01203d] underline hover:no-underline">Agile coaching techniques</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
