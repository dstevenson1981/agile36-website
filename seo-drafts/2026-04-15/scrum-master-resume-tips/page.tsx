import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Resume Tips: What Hiring Managers Actually Look For | Agile36",
  description:
    "Scrum Master resume tips from hiring manager perspective: what to include, how to frame accomplishments, which certifications matter, and what makes SM resumes stand out.",
  keywords: ["scrum master resume tips", "scrum master resume", "how to write scrum master resume", "scrum master CV", "scrum master resume examples", "scrum master job application"],
  openGraph: {
    title: "Scrum Master Resume Tips: What Hiring Managers Actually Look For",
    description: "What hiring managers look for in a Scrum Master resume — and what to leave out.",
    url: "https://www.agile36.com/blog/scrum-master-resume-tips",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-resume-tips" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The most common SM resume mistake: listing Scrum ceremonies as accomplishments. <strong>Running standups is the job, not an achievement.</strong> Hiring managers want to see how you improved teams, removed impediments, or built organizational capability.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Certifications matter — but they&apos;re the floor, not the ceiling. An <strong>SSM or CSM credential</strong> gets you past ATS filters. Your demonstrated impact in previous roles gets you through the interview.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Quantify where you can. Not every SM contribution is quantifiable, but <strong>team size, number of ARTs, sprint velocity trends, and impediment reduction</strong> add concrete weight to abstract descriptions.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>For enterprise roles, SAFe experience is <strong>increasingly mandatory</strong>, not preferred. If you have it, it should be prominent. If you don&apos;t, the SSM certification signals readiness for SAFe environments.</span></li>
      </ul>
    </section>
  );
}

function ResumeExample() {
  return (
    <section aria-label="Resume example" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Before and After: SM Bullet Point Rewrites</h3>
      <div className="space-y-4">
        {[
          {
            before: "Facilitated daily standups, sprint planning, retrospectives, and sprint reviews",
            after: "Reduced average sprint impediment resolution time from 8 days to 2 days by building escalation paths to engineering directors; facilitated 12+ sprints with average 87% sprint goal completion"
          },
          {
            before: "Worked with teams to follow Scrum framework",
            after: "Coached two cross-functional teams (12 engineers, 2 POs) from informal workflow to structured SAFe Scrum; increased story decomposition quality reducing mid-sprint scope changes by 40%"
          },
          {
            before: "Coordinated with stakeholders and managed Jira boards",
            after: "Partnered with VP of Engineering to restructure sprint review cadence, reducing stakeholder misalignment incidents from 3-4 per PI to near zero across Q2-Q3 2025"
          },
        ].map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-red-50 border-b border-red-200 p-4">
              <p className="text-xs font-bold text-red-700 mb-1">Before (weak)</p>
              <p className="text-sm text-red-800">{item.before}</p>
            </div>
            <div className="bg-green-50 p-4">
              <p className="text-xs font-bold text-green-700 mb-1">After (strong)</p>
              <p className="text-sm text-green-800">{item.after}</p>
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
          "Every bullet point on an SM resume should answer the question 'so what?' Running a ceremony is not an accomplishment. What changed because of how you ran it? What improved because you were there?",
          "The certifications section should be near the top for SM resumes — not buried at the bottom. For ATS parsing, certifications need to appear in text, not just in acronym form. Write 'SAFe Scrum Master (SSM)' not just 'SSM'.",
          "For SAFe enterprise roles, quantify your ART experience: number of teams on the ART, PI length, number of PIs delivered. Hiring managers want to know the scale you've operated at.",
          "Include a skills section that distinguishes technical tools (Jira, Confluence, Miro) from practices (facilitation, coaching, impediment removal, Communities of Practice). Practices are harder to fake and more meaningful.",
          "A two-page resume is acceptable for SMs with 8+ years of experience. For earlier-career SMs, one tight page is stronger than two loose ones. Hiring managers read resumes in 15-30 seconds initially — density of impact statements matters more than length.",
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

export default function ScrumMasterResumeTipsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Resume Tips: What Hiring Managers Actually Look For
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Resume Tips</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career Development</span>
          <span className="text-sm text-[#718aa5]">Career Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Resume Tips: What Hiring Managers Actually Look For
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Scrum Master resumes are notably uniform — and uniformly weak. Most list the same ceremonies, the same tools, and the same boilerplate descriptions that tell hiring managers nothing about actual impact. The practitioners who stand out in the job market frame their experience around outcomes, not activities. If you&apos;re pursuing the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>{" "}
            to enter or advance in the SM field, your resume needs to showcase what you accomplished with the skills that certification validates.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Makes a Strong SM Resume</h2>
          <p className="text-lg text-gray-700 mb-4">
            Hiring managers reviewing SM resumes are asking one question: did this person actually improve teams, or did they just administer Scrum? The ceremonies and tools are table stakes. The differentiating content describes coaching outcomes, impediments removed, and organizational capability built.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-3">Include</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Team/ART size and structure context</li>
                <li>• Specific impediments removed and how</li>
                <li>• Measurable team improvements (velocity, predictability)</li>
                <li>• Certifications with full names and dates</li>
                <li>• Communities of Practice you built or led</li>
                <li>• Coaching relationships and outcomes</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="text-red-800 font-bold mb-3">Avoid</h4>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• Lists of ceremonies you facilitated</li>
                <li>• "Responsible for" language (use active verbs)</li>
                <li>• Generic soft skill claims without evidence</li>
                <li>• Jargon soup (self-organizing, cross-functional)</li>
                <li>• Certification acronyms only (spell them out)</li>
                <li>• More than 6 bullets per role</li>
              </ul>
            </div>
          </div>

          <ResumeExample />

          <PullQuote attribution="Agile practice hiring manager, insurance enterprise">
            I read a hundred SM resumes that look identical — facilitated planning, ran retros, maintained Jira boards. What I&apos;m looking for is one line that tells me you did something that actually mattered. Removed a multi-sprint organizational impediment. Built a CoP that changed how 50 people practice Scrum. Coached a team from 40% sprint completion to 90%. That&apos;s the signal I&apos;m scanning for.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Frame SAFe Experience</h2>
          <p className="text-lg text-gray-700 mb-4">
            Enterprise roles increasingly require SAFe context. If you have it, be specific: how many teams were on the ART, how many PIs you delivered, which SAFe ceremonies you facilitated (PI Planning, Scrum of Scrums, ART sync, Inspect &amp; Adapt). The SSM certification demonstrates SAFe readiness for practitioners moving from Scrum-only to SAFe environments.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I use a functional or chronological resume format?</p>
              <p className="text-lg text-gray-700">Chronological is strongly preferred by hiring managers. Functional resumes are associated with candidates trying to hide limited experience or gaps. Even if your experience is thin, a clean chronological format with honest descriptions builds more credibility than a functional format that buries context.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do I write a SM resume if I don&apos;t have formal SM experience?</p>
              <p className="text-lg text-gray-700">Frame relevant experience from adjacent roles: project coordination, facilitation, process improvement, or team lead responsibilities. Be specific about what you did that maps to SM skills — improving team workflows, running meetings, removing blockers, coaching colleagues. The SSM certification helps signal intent and framework knowledge for career changers.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I include a summary or objective at the top?</p>
              <p className="text-lg text-gray-700">A summary (3-4 sentences for experienced SMs) can be useful to orient the reader — especially if you have an unusual background or are pivoting into the SM role. Avoid generic language like "passionate agile practitioner." Use it to signal your specific context: "SSM-certified practitioner with 4 years SAFe ART experience in financial services."</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which certification is most valuable to list on a SM resume?</p>
              <p className="text-lg text-gray-700">For most enterprise roles, SSM (SAFe Scrum Master) or CSM (Certified ScrumMaster) are the most recognized. SSM is preferred in SAFe environments. SASM signals advanced coaching capability and differentiates senior candidates. RTE certification is relevant if you&apos;re applying to RTE or Agile Coach roles. List all current, active certifications — not expired ones.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need to tailor my SM resume for each application?</p>
              <p className="text-lg text-gray-700">Yes — at minimum, adjust the summary and skills section to mirror language from the job description. ATS systems parse for keyword matches. If the posting says "SAFe" and your resume only says "large-scale agile," you may not pass the filter. Tailoring takes 10-15 minutes and meaningfully improves your odds.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Certify and Differentiate</p>
            <p className="mb-5">SSM certification gives you the credential that gets past ATS filters and the knowledge to back it up in interviews.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
            {" · "}
            <Link href="/blog/scrum-master-interview-questions" className="text-[#01203d] underline hover:no-underline">Scrum Master interview questions</Link>
            {" · "}
            <Link href="/blog/scrum-master-salary-2026" className="text-[#01203d] underline hover:no-underline">Scrum Master salary 2026</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
