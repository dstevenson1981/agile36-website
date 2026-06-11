import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POPM Prerequisites: What You Need Before Taking SAFe POPM | Agile36",
  description:
    "SAFe POPM prerequisites explained: what experience and knowledge you need before the course, whether formal requirements exist, and how to prepare if you're coming from a non-product background.",
  keywords: ["POPM prerequisites", "SAFe POPM requirements", "POPM eligibility", "what do you need for POPM", "POPM certification requirements", "SAFe product owner prerequisites"],
  openGraph: {
    title: "POPM Prerequisites: What You Need Before Taking SAFe POPM",
    description: "What experience and knowledge you need before the POPM course and exam.",
    url: "https://www.agile36.com/blog/popm-prerequisites",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/popm-prerequisites" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>There are <strong>no formal prerequisites</strong> to register for the SAFe POPM course. Scaled Agile does not require prior certification or minimum experience to enroll.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Scaled Agile recommends <strong>5+ years of working experience</strong> and familiarity with agile concepts. Candidates with zero product or agile experience will find the course difficult to absorb without background context.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Practitioners transitioning from <strong>business analysis, project coordination, or software development</strong> are well-positioned for the POPM. Understanding user stories, sprints, and stakeholder management from any direction provides useful context.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The POPM is specifically valuable for practitioners <strong>currently in or transitioning to PO or PM roles</strong> in SAFe organizations. It&apos;s not an entry-level agile certification — it targets practitioners actively working in product roles.</span></li>
      </ul>
    </section>
  );
}

function ReadinessVisual() {
  const backgrounds = [
    { bg: "Product Owner (non-SAFe)", ready: 95, notes: "Strong fit — SAFe context adds ART/PI Planning specifics" },
    { bg: "Business Analyst", ready: 80, notes: "Good fit — story writing and requirements background directly relevant" },
    { bg: "Product Manager (traditional)", ready: 85, notes: "Strong fit — some SAFe-specific reframing needed on PO vs PM distinction" },
    { bg: "Project Manager", ready: 65, notes: "Usable — different mental model, but PM-to-PO transitions are common" },
    { bg: "Software Developer", ready: 60, notes: "Possible — technical context helps; needs product/stakeholder exposure" },
    { bg: "No product/tech experience", ready: 30, notes: "Difficult — course assumes familiarity with delivery environments" },
  ];
  return (
    <section aria-label="Background readiness" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">POPM Readiness by Background</h3>
      <div className="space-y-3">
        {backgrounds.map((b) => (
          <div key={b.bg} className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-800">{b.bg}</span>
              <span className="text-xs text-gray-500">{b.ready}% ready</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="h-2 rounded-full" style={{ width: `${b.ready}%`, backgroundColor: b.ready >= 75 ? "#16a34a" : b.ready >= 55 ? "#ca8a04" : "#dc2626" }} />
            </div>
            <p className="text-xs text-gray-500">{b.notes}</p>
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
          "There are no mandatory prerequisites for POPM enrollment. Scaled Agile recommends work experience and agile familiarity, but neither is enforced at registration. Readiness is your own responsibility to assess.",
          "The ideal POPM candidate has worked with development teams, understands user stories and sprint cycles, and has managed or collaborated with stakeholders. This background makes the SAFe-specific content click faster.",
          "If you're completely new to agile, consider taking an introductory agile course or reading the Scrum Guide before the POPM. Two weeks of self-study on agile basics dramatically improves how much you absorb from the course.",
          "The POPM exam covers both PO and PM roles. Candidates experienced in one role need to explicitly prepare for the other. This is where many experienced practitioners underestimate preparation requirements.",
          "For career changers entering product roles, the POPM certification provides both the credential and the framework vocabulary that signal readiness for SAFe product ownership. It's a meaningful career accelerator for the right backgrounds.",
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

export default function PopmPrerequisitesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          POPM Prerequisites: What You Need Before Taking SAFe POPM
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>POPM Prerequisites</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Certification Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          POPM Prerequisites: What You Need Before Taking SAFe POPM
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe Product Owner / Product Manager (POPM) certification has no mandatory prerequisites for registration — but that doesn&apos;t mean everyone is equally prepared to pass the exam. Understanding the realistic preparation requirements helps candidates invest the right amount of time in readiness before the{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">POPM course</Link>{" "}
            and exam. Underprepared candidates don&apos;t fail because the exam is particularly hard — they fail because the SAFe framework assumes shared context that isn&apos;t explained from scratch in the 16-hour course.
          </p>

          <ExecutiveSummary />

          <ReadinessVisual />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What to Know Before the POPM Course</h2>
          <p className="text-lg text-gray-700 mb-4">
            The POPM course focuses on SAFe-specific product roles — it doesn&apos;t teach agile from scratch. Practitioners who arrive without agile context spend the first few hours catching up on concepts that other students already have. The following background knowledge makes the course significantly more productive:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-3">Helpful to know before POPM</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• What user stories are and how they&apos;re structured</li>
                <li>• What a sprint/iteration is</li>
                <li>• Basic Scrum roles (SM, PO, development team)</li>
                <li>• What a product backlog is and why it&apos;s prioritized</li>
                <li>• General stakeholder management concepts</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="text-blue-800 font-bold mb-3">What POPM will teach you</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• SAFe&apos;s PO/PM role distinction and responsibilities</li>
                <li>• Program Backlog vs Team Backlog management</li>
                <li>• PI Planning and ART-level collaboration</li>
                <li>• Feature vs story decomposition in SAFe</li>
                <li>• Lean-Agile product thinking and prioritization</li>
              </ul>
            </div>
          </div>

          <PullQuote attribution="POPM-certified Product Owner, government contractor">
            I came from a traditional requirements analyst background with almost no agile experience. I enrolled in the POPM because my organization was going SAFe and I needed the credential. I spent two weeks reading the Scrum Guide and doing an online agile fundamentals course first. The POPM course made sense because of that preparation — without it I would have been lost for the first day.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need to have an SA (Leading SAFe) certification before POPM?</p>
              <p className="text-lg text-gray-700">No — the POPM is an independent certification track. Leading SAFe is not a prerequisite. However, if you have SA certification, you&apos;ll have the SAFe framework context that makes POPM content easier to absorb. Many practitioners take POPM first if they&apos;re specifically targeting product roles, then Leading SAFe later for broader framework depth.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need a technical background for POPM?</p>
              <p className="text-lg text-gray-700">No technical background is required. Product Owners and Product Managers in SAFe don&apos;t need to write code — they need to understand what their development teams are building well enough to define acceptance criteria and make prioritization decisions. Non-technical candidates from business, marketing, or operations backgrounds successfully complete POPM regularly.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is there a recommended reading list before POPM?</p>
              <p className="text-lg text-gray-700">Scaled Agile doesn&apos;t publish a formal reading list, but practitioners benefit from: reading the Scrum Guide (free at scrumguides.org), reviewing the SAFe Big Picture overview on scaledagile.com, and reading the Product Owner and Product Manager articles in the SAFe knowledge base. This takes about 4-6 hours and significantly improves course absorption.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I take POPM if I work in a non-SAFe organization?</p>
              <p className="text-lg text-gray-700">Yes — many practitioners take POPM to prepare for a SAFe organization they&apos;re joining, or to qualify for roles that require SAFe experience. The certification demonstrates readiness for SAFe environments even if your current organization doesn&apos;t use SAFe. It&apos;s particularly useful if you&apos;re in the job market targeting enterprise agile roles.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does POPM compare to Certified Scrum Product Owner (CSPO)?</p>
              <p className="text-lg text-gray-700">CSPO focuses on the PO role in standalone Scrum. POPM covers both PO and PM roles in SAFe&apos;s ART structure. POPM is generally preferred for enterprise and SAFe environments. CSPO is valued in Scrum-focused or smaller organizations. If you&apos;re in an enterprise context, POPM is the stronger credential.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get POPM Certified</p>
            <p className="mb-5">Our POPM course is designed for practitioners ready to advance in SAFe product roles — with exam preparation included.</p>
            <Link href="/courses/product-owner-manager" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View POPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/popm-exam-questions" className="text-[#01203d] underline hover:no-underline">POPM exam questions</Link>
            {" · "}
            <Link href="/blog/popm-pass-rate" className="text-[#01203d] underline hover:no-underline">POPM pass rate</Link>
            {" · "}
            <Link href="/blog/product-owner-vs-product-manager" className="text-[#01203d] underline hover:no-underline">Product Owner vs Product Manager</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
