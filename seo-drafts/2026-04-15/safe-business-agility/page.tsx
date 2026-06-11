import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Business Agility: What It Means and How to Develop It | Agile36",
  description:
    "SAFe Business Agility explained: what the 7 core competencies are, how Business Agility differs from team-level agile, and what organizations need to develop to achieve genuine enterprise agility.",
  keywords: ["SAFe Business Agility", "SAFe business agility competencies", "enterprise business agility", "SAFe 7 competencies", "business agility SAFe framework", "developing business agility"],
  openGraph: {
    title: "SAFe Business Agility: What It Means and How to Develop It",
    description: "What SAFe's Business Agility model means, what the 7 competencies are, and how organizations develop genuine enterprise agility.",
    url: "https://www.agile36.com/blog/safe-business-agility",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-business-agility" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SAFe defines Business Agility as the ability to <strong>compete and thrive in the digital age</strong> by rapidly adapting to changing market conditions — delivering innovative products and services faster, with higher quality, at competitive cost.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Business Agility requires <strong>seven core competencies</strong>: Lean-Agile Leadership, Team and Technical Agility, Agile Product Delivery, Enterprise Solution Delivery, Lean Portfolio Management, Organizational Agility, and Continuous Learning Culture.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The critical insight: <strong>team-level agile is necessary but not sufficient</strong> for Business Agility. Organizations where only delivery teams practice agile while the rest of the business operates traditionally have achieved team-level agility but not Business Agility.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The <strong>Business Agility Assessment</strong> allows organizations to measure their current state across all seven competencies and identify where improvement investments will have the greatest impact on overall enterprise agility.</span></li>
      </ul>
    </section>
  );
}

function CompetencyBars() {
  const competencies = [
    { name: "Lean-Agile Leadership", focus: "Leaders who model, teach, and build agile mindset" },
    { name: "Team and Technical Agility", focus: "Agile teams with strong technical practices" },
    { name: "Agile Product Delivery", focus: "Customer-centricity and DevOps-enabled delivery" },
    { name: "Enterprise Solution Delivery", focus: "Lean approaches for large-scale systems" },
    { name: "Lean Portfolio Management", focus: "Aligning strategy to execution via value streams" },
    { name: "Organizational Agility", focus: "Agile operations and strategy that enables pivoting" },
    { name: "Continuous Learning Culture", focus: "Relentless improvement at individual, team, org levels" },
  ];
  return (
    <section aria-label="7 core competencies" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">The 7 Core Competencies of Business Agility</h3>
      <div className="space-y-3">
        {competencies.map((c, i) => (
          <div key={c.name} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
            <span className="text-yellow-500 font-bold text-lg min-w-[28px]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-bold text-[#01203d] text-sm">{c.name}</p>
              <p className="text-xs text-gray-600 mt-1">{c.focus}</p>
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
          "Business Agility is an organizational capability, not just a delivery methodology. Organizations that achieve Business Agility can reconfigure their strategy, structure, and processes rapidly in response to market change — not just deliver software faster.",
          "The seven competencies are interdependent. An organization with strong Team and Technical Agility but weak Lean-Agile Leadership will plateau because leaders impose constraints (annual budgets, stage gates, individual metrics) that prevent team capabilities from producing business outcomes.",
          "Lean Portfolio Management is typically the most underdeveloped competency in SAFe transformations. Organizations invest in team-level agility (Team and Technical Agility) and program-level coordination (ART/PI Planning) before developing the portfolio governance changes that connect strategy to delivery.",
          "Continuous Learning Culture is the competency that sustains all the others over time. Without a relentless focus on improvement at individual, team, and organizational levels, the other competencies decay as market conditions change and new practices are needed.",
          "The Business Agility Assessment is a practical tool for SAFe transformation leadership. It produces a profile across all seven competencies that identifies where the organization has invested and where it remains underdeveloped — creating a data-driven basis for transformation prioritization.",
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

export default function SafeBusinessAgilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Business Agility: What It Means and How to Develop It
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Business Agility</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Framework</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Business Agility: What It Means and How to Develop It
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Business Agility is SAFe&apos;s answer to the most important question in enterprise agile: what does it mean for an entire organization — not just its delivery teams — to be agile? Teams that run clean sprints but operate within an organization that can&apos;t adapt its strategy, governance, or operating model haven&apos;t achieved Business Agility. They&apos;ve achieved team-level agility. The{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe certification</Link>{" "}
            introduces the Business Agility model and the seven competencies that organizations must develop to compete effectively in conditions of rapid market change.
          </p>

          <ExecutiveSummary />

          <CompetencyBars />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why Team-Level Agility Isn&apos;t Enough</h2>
          <p className="text-lg text-gray-700 mb-4">
            The fundamental challenge of enterprise agile is that team-level practices (Scrum, Kanban) create local optimization that doesn&apos;t translate to organizational agility without corresponding changes at the portfolio and leadership levels. Teams that self-organize around sprint backlogs while their leaders maintain annual budgets, stage-gate reviews, and activity-based performance management are experiencing agile theater — the appearance of agility without the capability.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Business Agility requires changes to how organizations make investment decisions (Lean Portfolio Management), how leaders behave and model agile values (Lean-Agile Leadership), and how the organization structures its operating model to enable continuous adaptation (Organizational Agility). These are harder to change than team ceremonies, which is why many agile transformations plateau at the team level.
          </p>

          <PullQuote attribution="CTO, enterprise insurance">
            Three years into our SAFe transformation, our ARTs were excellent. Delivery frequency up, quality up, team satisfaction up. But we were still doing annual budget cycles, still running stage-gate portfolio reviews, still evaluating leaders on headcount and budget ownership. The teams were transformed; the organization was not. Business Agility required us to change the governance structures — which was 10x harder than the delivery transformation.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the SAFe Business Agility Assessment?</p>
              <p className="text-lg text-gray-700">The Business Agility Assessment is a structured tool (available on the Scaled Agile website) that measures organizational maturity across all seven Business Agility competencies. Organizations answer questions about their current practices in each competency area, producing a profile that shows relative strengths and development areas. It&apos;s commonly used in SAFe transformation planning to prioritize investment.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which competency is most important?</p>
              <p className="text-lg text-gray-700">Lean-Agile Leadership is foundational because it's the prerequisite for everything else. Organizations with leaders who don&apos;t model agile behavior cannot develop agile organizations regardless of how well their teams perform. Most experienced SAFe practitioners start transformation conversations with leadership development before team-level practices.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does Business Agility relate to digital transformation?</p>
              <p className="text-lg text-gray-700">Business Agility is SAFe&apos;s framing of what digital transformation must achieve. Digital transformation that produces faster software delivery without the organizational adaptability to change strategy, governance, and operating model is infrastructure transformation, not digital transformation. Business Agility is the organizational capability that makes digital investment sustainable.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can non-technology organizations develop Business Agility?</p>
              <p className="text-lg text-gray-700">Yes — SAFe&apos;s Business Agility model applies to any organization facing rapid market change, not just technology companies. Financial services, healthcare, retail, and manufacturing organizations use SAFe. The specific practices adapt to context, but the underlying principles — lean thinking, customer focus, continuous improvement — apply universally.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What does Organizational Agility competency involve?</p>
              <p className="text-lg text-gray-700">Organizational Agility involves the ability to rapidly reconfigure the organization to respond to market changes — including strategy agility (sensing and responding to market shifts), structural agility (reorganizing teams and value streams), and operational agility (changing business processes as markets evolve). It&apos;s the competency that addresses the business side of the house, not just the technology side.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Develop Enterprise Agility</p>
            <p className="mb-5">Leading SAFe develops the leadership mindset and framework knowledge needed to build genuine Business Agility across an organization.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-transformation-roadmap" className="text-[#01203d] underline hover:no-underline">SAFe transformation roadmap</Link>
            {" · "}
            <Link href="/blog/agile-leadership-guide" className="text-[#01203d] underline hover:no-underline">Agile leadership guide</Link>
            {" · "}
            <Link href="/blog/agile-transformation-mistakes" className="text-[#01203d] underline hover:no-underline">Agile transformation mistakes</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
