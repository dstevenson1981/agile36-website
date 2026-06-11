import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPM Prerequisites: Who Should Take SAFe Lean Portfolio Management | Agile36",
  description:
    "SAFe LPM certification prerequisites: the experience required, recommended background, whether SA is needed first, and who the LPM course is designed for.",
  keywords: ["LPM prerequisites", "SAFe LPM requirements", "lean portfolio management prerequisites", "who should take LPM", "LPM certification eligibility", "SAFe portfolio management certification requirements"],
  openGraph: {
    title: "LPM Prerequisites: Who Should Take SAFe Lean Portfolio Management",
    description: "What background you need before the SAFe LPM course and who benefits most from the certification.",
    url: "https://www.agile36.com/blog/lpm-prerequisites",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/lpm-prerequisites" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>There are <strong>no mandatory prerequisites</strong> for LPM enrollment — but Scaled Agile recommends the <strong>SA (Leading SAFe) certification</strong> or equivalent SAFe framework knowledge before taking the course.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>LPM is designed for <strong>executives, portfolio managers, Business Owners, Enterprise Architects</strong>, and senior agile leaders — not team-level practitioners. The course assumes portfolio-level responsibility, not sprint-level delivery experience.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Without SAFe context, the LPM course&apos;s Lean Budget, value stream, and portfolio Kanban content is difficult to absorb. The course <strong>assumes you know what an ART is</strong> — it doesn&apos;t explain it from scratch.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>LPM is the right certification for practitioners responsible for <strong>organizational investment decisions, governance, or SAFe transformation design</strong>. If you work below the portfolio level, SA is typically more relevant.</span></li>
      </ul>
    </section>
  );
}

function IdealCandidates() {
  const candidates = [
    { role: "Portfolio Manager / PMO Director", fit: 95, why: "Core audience — LPM directly replaces traditional PMO governance with Lean Portfolio Management" },
    { role: "VP of Engineering / CTO", fit: 90, why: "Organizational leaders deciding how to structure ARTs and allocate development investment" },
    { role: "Enterprise Architect", fit: 85, why: "Value stream design, solution architecture at portfolio scale, and technology roadmap governance" },
    { role: "Business Owner (SAFe)", fit: 80, why: "LPM involves Business Owner participation in portfolio budgeting and epic prioritization" },
    { role: "Senior Agile Coach / SPC", fit: 75, why: "Coaches facilitating LPM implementation need deep LPM knowledge to guide executive decisions" },
    { role: "Scrum Master / RTE", fit: 45, why: "Useful context, but LPM operates above the delivery level where SMs and RTEs work" },
  ];
  return (
    <section aria-label="LPM ideal candidate fit" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Who Should Take LPM: Candidate Fit by Role</h3>
      <div className="space-y-3">
        {candidates.map((c) => (
          <div key={c.role} className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-800">{c.role}</span>
              <span className="text-xs font-bold" style={{ color: c.fit >= 80 ? "#16a34a" : c.fit >= 60 ? "#ca8a04" : "#6b7280" }}>{c.fit}% fit</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="h-2 rounded-full" style={{ width: `${c.fit}%`, backgroundColor: c.fit >= 80 ? "#01203d" : c.fit >= 60 ? "#ca8a04" : "#9ca3af" }} />
            </div>
            <p className="text-xs text-gray-500">{c.why}</p>
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
          "LPM is a portfolio-level certification, not a team-level one. Practitioners who haven't seen SAFe operating in real organizations sometimes struggle with the LPM content because they lack the organizational context it assumes.",
          "If you're taking LPM without SA certification, invest 4-6 hours in SAFe fundamentals first: read the SAFe Big Picture, understand what an ART is and how PI Planning works, and familiarize yourself with value streams. This makes the LPM content far more accessible.",
          "The organizational ROI of LPM is highest when executives and senior stakeholders take the course together — creating shared language around value streams, Lean Budgets, and portfolio governance that enables the real governance changes LPM requires.",
          "LPM is not just a certification — it's a governance model. Organizations that take LPM seriously restructure their budgeting, portfolio review cycles, and epic approval processes based on what they learn. The certification is the entry point, not the destination.",
          "For practitioners below the portfolio level who want strategic context: Leading SAFe (SA) covers the LPM concepts at a briefer level within a broader framework overview. This may be sufficient before exploring LPM certification separately.",
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

export default function LpmPrerequisitesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          LPM Prerequisites: Who Should Take SAFe Lean Portfolio Management
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>LPM Prerequisites</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Certification Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          LPM Prerequisites: Who Should Take SAFe Lean Portfolio Management
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The SAFe Lean Portfolio Management (LPM) certification has no mandatory prerequisites, but it assumes significant organizational context. Unlike entry-level SAFe certifications, LPM targets practitioners with portfolio-level responsibility — executives, portfolio managers, and enterprise architects making investment decisions across multiple ARTs. The{" "}
            <Link href="/courses/lean-portfolio-management" className="text-[#01203d] font-semibold underline hover:no-underline">LPM certification course</Link>{" "}
            builds on SAFe fundamentals — it doesn&apos;t introduce them.
          </p>

          <ExecutiveSummary />

          <IdealCandidates />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Background Knowledge LPM Assumes</h2>
          <p className="text-lg text-gray-700 mb-4">
            The LPM course builds directly on SAFe&apos;s Agile Release Train model, value stream concepts, and PI Planning framework. Candidates without this background spend the first portion of the course catching up on context rather than absorbing the LPM-specific content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-3">Know before LPM</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• What an Agile Release Train (ART) is</li>
                <li>• How PI Planning works</li>
                <li>• The difference between operational and development value streams</li>
                <li>• How SAFe roles (RTE, SM, PO, PM) relate to each other</li>
                <li>• Basic Lean-Agile principles</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="text-blue-800 font-bold mb-3">LPM will teach you</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• How to structure and fund value streams with Lean Budgets</li>
                <li>• Portfolio Kanban management</li>
                <li>• Participatory budgeting processes</li>
                <li>• Portfolio epic lifecycle and governance</li>
                <li>• How to connect strategy to execution via OKRs and strategic themes</li>
              </ul>
            </div>
          </div>

          <PullQuote attribution="Portfolio Manager, enterprise utilities">
            I took LPM without SA first, which was a mistake. I spent the first day asking questions about ARTs and PI Planning instead of focusing on portfolio governance. A colleague who had SA first got so much more out of the same course. If you&apos;re considering LPM, do SA first unless you already know the SAFe delivery model deeply from your organization.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should I take Leading SAFe before LPM?</p>
              <p className="text-lg text-gray-700">Strongly recommended if you don't already have deep SAFe context. Leading SAFe covers the full SAFe framework at a leadership level — including value streams, ARTs, and portfolio concepts — in a way that makes LPM content far more accessible. Many practitioners take SA and LPM sequentially in the same month.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is LPM appropriate for Scrum Masters?</p>
              <p className="text-lg text-gray-700">It provides useful context, but it's not the highest ROI certification for most SMs. LPM operates above the delivery level where SMs work day-to-day. SMs who want portfolio context might get more immediate value from SASM, which prepares them for organizational-level agile coaching that's closer to their current responsibilities.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can a small organization benefit from LPM?</p>
              <p className="text-lg text-gray-700">Yes, though some concepts scale better at enterprise level. Even organizations with one ART benefit from Lean Budget thinking (replacing project-based funding with value stream budgets) and portfolio Kanban for managing strategic epics. The governance frameworks scale down more than you might expect.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the LPM course format?</p>
              <p className="text-lg text-gray-700">The LPM course is 2 days of instructor-led training (live or virtual) followed by an exam attempt. The course combines framework instruction, workshop exercises, and case studies focused on real portfolio management decisions. Most candidates spend an additional 4-6 hours in self-study between the course and exam.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is LPM worth it if I don't directly manage the portfolio budget?</p>
              <p className="text-lg text-gray-700">If you influence portfolio decisions — through coaching, architecture, or program leadership — LPM is valuable. Understanding how Lean Budgets work, how epics are approved, and how strategic themes connect to ART priorities makes you a more effective advocate for the teams and value streams you serve, even without direct budget authority.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get LPM Certified</p>
            <p className="mb-5">Our LPM course is designed for portfolio leaders — covering Lean Budgets, value streams, and governance in depth with exam preparation included.</p>
            <Link href="/courses/lean-portfolio-management" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View LPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/lpm-exam-questions" className="text-[#01203d] underline hover:no-underline">LPM exam questions</Link>
            {" · "}
            <Link href="/blog/lpm-salary" className="text-[#01203d] underline hover:no-underline">LPM salary guide</Link>
            {" · "}
            <Link href="/blog/safe-value-streams-explained" className="text-[#01203d] underline hover:no-underline">SAFe value streams explained</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
