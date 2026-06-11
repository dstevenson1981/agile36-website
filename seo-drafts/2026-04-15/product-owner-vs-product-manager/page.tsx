import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Owner vs Product Manager: What's the Difference in SAFe? | Agile36",
  description:
    "Product Owner vs Product Manager in SAFe: how the roles differ, what each owns, how they collaborate, and which career path is right for you.",
  keywords: ["product owner vs product manager", "PO vs PM in SAFe", "SAFe product owner product manager difference", "product owner or product manager", "SAFe POPM roles", "product owner product manager comparison"],
  openGraph: {
    title: "Product Owner vs Product Manager: What's the Difference in SAFe?",
    description: "How Product Owner and Product Manager roles differ in SAFe — scope, responsibilities, and career implications.",
    url: "https://www.agile36.com/blog/product-owner-vs-product-manager",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/product-owner-vs-product-manager" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>In SAFe, the <strong>Product Owner</strong> (PO) works at the team level — managing the team backlog and refining stories. The <strong>Product Manager</strong> (PM) works at the ART level — managing the Program Backlog and defining features. They are different roles with different scope.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The SAFe POPM certification covers both roles. In practice, <strong>most practitioners hold one role</strong> at a time — PO on a single team, or PM across multiple teams at the ART level.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The key distinction: POs work with <strong>stories</strong> (what the team builds this sprint). PMs work with <strong>features</strong> (what the ART delivers this PI) and connect them to customer and market needs.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Career progression in SAFe product roles typically runs: PO → Senior PO → PM → Group PM. The POPM credential is the recognized certification for both roles and <strong>accelerates the PO-to-PM transition</strong>.</span></li>
      </ul>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { dim: "Level", po: "Team (Scrum team backlog)", pm: "ART (Program Backlog)" },
    { dim: "Works with", po: "Stories and acceptance criteria", pm: "Features and enablers" },
    { dim: "Attends", po: "Sprint ceremonies, team PI Planning breakout", pm: "PI Planning, ART sync, stakeholder meetings" },
    { dim: "Primary relationship", po: "Development team", pm: "Business Owners, customers, Product Owners" },
    { dim: "Sets priority for", po: "Team backlog stories", pm: "Program Backlog features" },
    { dim: "Defines", po: "Acceptance criteria, story details", pm: "Feature descriptions, business value" },
    { dim: "Market/customer interface", po: "Minimal — filtered through PM", pm: "Direct — interviews, discovery, research" },
    { dim: "SAFe certification", po: "POPM (PO track)", pm: "POPM (PM track)" },
    { dim: "Typical salary range (US)", po: "$90k–$130k", pm: "$115k–$175k" },
  ];
  return (
    <section aria-label="PO vs PM comparison" className="my-10 overflow-x-auto">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Product Owner vs Product Manager in SAFe</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#01203d] text-white">
            <th className="p-3 text-left w-1/4">Dimension</th>
            <th className="p-3 text-left">Product Owner (PO)</th>
            <th className="p-3 text-left">Product Manager (PM)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.dim} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-semibold text-[#01203d] border-b border-gray-100">{r.dim}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.po}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.pm}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          "Don't confuse the POPM certification (which covers both roles) with being in both roles simultaneously. Practitioners in SAFe hold one primary role — the certification validates understanding of the full product model.",
          "A PO without a PM above them is running both roles simultaneously — which often means customer discovery and market strategy get neglected in favor of backlog management urgency.",
          "A PM who tries to manage stories at the team level becomes a bottleneck and undermines the PO role. Feature/story boundary discipline is what keeps the PM-PO relationship functional.",
          "The transition from PO to PM is one of the most meaningful career moves in SAFe product roles. It requires developing customer discovery, market strategy, and stakeholder management skills that most POs don't practice.",
          "For the POPM exam, know that the exam tests both roles. You need to know what POs do (story-level) and what PMs do (feature-level) and be able to identify which role is responsible for a given activity.",
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

export default function ProductOwnerVsProductManagerPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Product Owner vs Product Manager: What&apos;s the Difference in SAFe?
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Product Owner vs Product Manager</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Role Comparison</span>
          <span className="text-sm text-[#718aa5]">Comparison Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Product Owner vs Product Manager: What&apos;s the Difference in SAFe?
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            In SAFe, Product Owner and Product Manager are distinct roles — not just different titles for the same job. The distinction matters for your career path, your job search, and your exam preparation for the{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe POPM certification</Link>.{" "}
            Understanding where each role begins and ends — and how they collaborate — is one of the most practically useful things a product practitioner can learn.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Hierarchy: Epics → Features → Stories</h2>
          <p className="text-lg text-gray-700 mb-4">
            SAFe organizes work into three levels: portfolio epics, ART features, and team stories. Each level has a primary product owner:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            {[
              { level: "Portfolio", work: "Epics", owner: "Portfolio stakeholders, Business Owners", color: "bg-purple-50 border-purple-200" },
              { level: "ART (Program)", work: "Features", owner: "Product Manager (PM)", color: "bg-blue-50 border-blue-200" },
              { level: "Team", work: "Stories", owner: "Product Owner (PO)", color: "bg-green-50 border-green-200" },
            ].map((l) => (
              <div key={l.level} className={`rounded-xl p-4 border ${l.color}`}>
                <p className="text-xs font-bold text-gray-600 mb-1">{l.level} level</p>
                <p className="font-bold text-gray-900 text-lg mb-1">{l.work}</p>
                <p className="text-sm text-gray-600">Owned by: {l.owner}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-700 mb-4">
            This hierarchy defines the collaboration between PO and PM. The PM owns the feature (what the ART delivers this PI). The PO takes that feature and decomposes it into stories that the team can execute in sprint planning. The PM brings market and customer perspective; the PO brings team execution perspective.
          </p>

          <ComparisonTable />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How PO and PM Collaborate in a PI</h2>
          <p className="text-lg text-gray-700 mb-4">
            The PO-PM collaboration is most intensive at PI Planning and during backlog refinement. At PI Planning, the PM presents features and their business value to the ART. Each team&apos;s PO translates those features into team PI Objectives and story-level iteration plans. The PM and PO then stay connected throughout the PI as teams discover complexity, surface questions, or need to re-scope.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In healthy PO-PM relationships, the PM answers &quot;why are we building this?&quot; and the PO answers &quot;what exactly should we build and how should it work?&quot;. Misalignment usually surfaces when the PM is unavailable for questions during execution — leaving POs to make market/strategy decisions they shouldn&apos;t make alone.
          </p>

          <PullQuote attribution="Product Manager, enterprise fintech">
            The biggest mistake I made as a new PM was trying to manage stories. My POs are closer to the work and the team — they know when a story needs to be split or when an acceptance criterion doesn&apos;t make sense. My job is to protect the &apos;why&apos; and trust my POs with the &apos;how.&apos;
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can one person be both PO and PM?</p>
              <p className="text-lg text-gray-700">In small organizations with a single team, yes — it&apos;s common. At scale (5+ teams on an ART), trying to be both creates split attention and typically means either market/customer work or team support gets neglected. The role split exists because the scope genuinely can&apos;t be held by one person effectively at program scale.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do POs report to PMs in SAFe?</p>
              <p className="text-lg text-gray-700">SAFe doesn&apos;t mandate a reporting relationship — it defines a collaboration model. In practice, many organizations do have POs reporting to a PM or Head of Product, which creates a functional hierarchy that mirrors the feature/story hierarchy. This typically works well when the PM acts as a career sponsor and backlog architect, not a micromanager of story-level decisions.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which role is harder to get into?</p>
              <p className="text-lg text-gray-700">The PM role is harder to break into because it requires market knowledge, stakeholder management, and strategic product thinking that entry-level candidates typically don&apos;t have. PO roles are more accessible for experienced developers, BAs, and coordinators who understand team-level delivery. The natural progression is PO first, then PM as you develop the broader product skills.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get POPM Certified</p>
            <p className="mb-5">The SAFe POPM course covers both Product Owner and Product Manager roles in depth — with exam preparation included.</p>
            <Link href="/courses/product-owner-manager" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View POPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/popm-exam-questions" className="text-[#01203d] underline hover:no-underline">POPM exam questions</Link>
            {" · "}
            <Link href="/blog/popm-salary" className="text-[#01203d] underline hover:no-underline">POPM salary guide</Link>
            {" · "}
            <Link href="/blog/user-story-writing-guide" className="text-[#01203d] underline hover:no-underline">User story writing guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
