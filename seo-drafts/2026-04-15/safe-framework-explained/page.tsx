import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Framework Explained: How the Scaled Agile Framework Works | Agile36",
  description:
    "The Scaled Agile Framework (SAFe) explained clearly: the four configurations, core levels, key roles, and how PI Planning connects strategy to delivery.",
  keywords: ["SAFe framework explained", "what is SAFe", "Scaled Agile Framework", "SAFe agile overview", "how does SAFe work", "SAFe framework levels"],
  openGraph: {
    title: "SAFe Framework Explained: How the Scaled Agile Framework Works",
    description: "SAFe configurations, levels, roles, and how PI Planning connects strategy to delivery.",
    url: "https://www.agile36.com/blog/safe-framework-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-framework-explained" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SAFe is a <strong>framework for scaling agile practices</strong> across large organizations — connecting individual team delivery to portfolio strategy through defined structures, roles, and events.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The core building block is the <strong>Agile Release Train (ART)</strong> — 50–125 people organized into 5–12 Scrum teams delivering together on a shared mission and cadence.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span><strong>PI Planning</strong> — a bi-quarterly face-to-face or virtual event — aligns all ART teams on a common plan, surfaces dependencies, and produces PI objectives that connect team work to business goals.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>SAFe is the most widely adopted scaling framework for enterprise agile, used across financial services, healthcare, defense, and technology industries in companies of 1,000+ employees.</span></li>
      </ul>
    </section>
  );
}

function LevelsGrid() {
  const levels = [
    { level: "Team", desc: "Individual Scrum or Kanban teams (5–12 people) delivering stories in 2-week iterations. Core roles: Scrum Master, Product Owner, Dev Team.", color: "#718aa5" },
    { level: "Program", desc: "The Agile Release Train — 5–12 teams delivering together. Core roles: RTE, Product Manager, System Architect, Business Owners.", color: "#134263" },
    { level: "Large Solution", desc: "Multiple ARTs delivering together (optional). For programs too large for one ART. Adds Solution Train and Solution Architect roles.", color: "#01203d" },
    { level: "Portfolio", desc: "Strategic investment, value streams, and enterprise governance. Lean Portfolio Management aligns funding to strategy.", color: "#000d1a" },
  ];
  return (
    <section aria-label="SAFe framework levels" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SAFe Framework Levels</h3>
      <div className="space-y-3">
        {levels.map((l) => (
          <div key={l.level} className="flex gap-0 rounded-xl overflow-hidden border border-gray-200">
            <div className="w-24 flex items-center justify-center text-white font-bold text-sm p-3 text-center" style={{ backgroundColor: l.color }}>{l.level}</div>
            <div className="flex-1 p-4 bg-gray-50 text-sm text-gray-700">{l.desc}</div>
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
    "SAFe addresses the core problem of agile at scale: how do hundreds of people coordinate delivery without losing agility?",
    "The Agile Release Train is the fundamental unit of SAFe — not individual teams. Understanding ART structure is the key to understanding SAFe.",
    "PI Planning is the event that makes SAFe work — it aligns teams, surfaces dependencies, and produces commitments that connect to business strategy.",
    "SAFe is not a prescriptive methodology that must be followed exactly — it's a framework that organizations implement progressively.",
    "The four SAFe configurations (Essential SAFe, Large Solution SAFe, Portfolio SAFe, Full SAFe) let organizations start simple and grow.",
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

export default function SafeFrameworkExplainedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Framework Explained: How the Scaled Agile Framework Works
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Framework Explained</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Framework</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 10 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Framework Explained: How the Scaled Agile Framework Works
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Scaled Agile Framework (SAFe) is the most widely adopted approach to enterprise agile in the world — but it's also the most frequently misunderstood. It's not a rigid methodology, it's not "Agile with more bureaucracy," and it's not just Scrum at scale. SAFe is a framework that gives large organizations a structure for delivering value at scale while maintaining the agility that makes individual Scrum teams effective. The{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe course</Link>{" "}
            teaches the framework principles to leaders. This guide explains how SAFe works at a practical level.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why SAFe Exists: The Scaling Problem</h2>
          <p className="text-lg text-gray-700 mb-4">
            Individual Scrum teams work well for small, autonomous product teams. The problem emerges when 10 or 20 Scrum teams need to deliver to the same release, share architectural dependencies, coordinate with the same Product Manager, and align to the same quarterly business objectives. Without a coordination structure, teams operate in isolation and produce integration failures, misaligned priorities, and unpredictable delivery.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            SAFe addresses this by organizing teams into Agile Release Trains — virtual organizations of 50–125 people that plan together, deliver together, and inspect and adapt together. The ART is the central innovation of SAFe.
          </p>

          <LevelsGrid />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Four SAFe Configurations</h2>
          <p className="text-lg text-gray-700 mb-4">
            SAFe isn't one-size-fits-all. Scaled Agile offers four configurations based on organization size and complexity:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {[
              { config: "Essential SAFe", desc: "The minimum viable SAFe — Team and Program levels only. Starting point for most organizations. One ART, PI Planning, basic role structure." },
              { config: "Large Solution SAFe", desc: "Adds Large Solution layer for organizations with multiple ARTs delivering to a single solution. Used in aerospace, defense, and complex systems." },
              { config: "Portfolio SAFe", desc: "Adds Portfolio layer for organizations that need strategic investment alignment across multiple value streams." },
              { config: "Full SAFe", desc: "All four levels — Team, Program, Large Solution, Portfolio. For the largest enterprises with complex delivery portfolios." },
            ].map((c) => (
              <div key={c.config} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-[#01203d] mb-2">{c.config}</h4>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">PI Planning: The Heart of SAFe</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you understand PI Planning, you understand SAFe. The Program Increment is a 10–12 week cadence — typically 5 iterations — during which the ART delivers a significant increment of value. PI Planning is the bi-quarterly event (usually 2 days) that starts each PI.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            During PI Planning, all ART teams — Product Management, System Architects, Business Owners, and all Scrum teams — come together to align on a common mission, review the program backlog, identify dependencies, and commit to PI objectives for the upcoming 10–12 weeks. This shared planning eliminates the siloed planning that creates integration failures later.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our detailed{" "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] font-semibold underline hover:no-underline">PI Planning explained guide</Link>{" "}
            covers the 2-day agenda, roles, and outputs in detail.
          </p>

          <PullQuote attribution="Agile transformation lead, Fortune 200 company">
            We implemented SAFe in 2021. The first PI Planning event was messy. The second was better. By the fourth, we had 12 teams delivering integrated features on a predictable cadence for the first time in the company&apos;s history.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Key SAFe Roles</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-[#01203d] text-white"><th className="p-3 text-left">Role</th><th className="p-3 text-left">Level</th><th className="p-3 text-left">Primary Responsibility</th></tr></thead>
              <tbody>
                {[
                  { role: "Scrum Master", level: "Team", resp: "Facilitates team agile practices and coaching" },
                  { role: "Product Owner", level: "Team", resp: "Manages team backlog and story acceptance" },
                  { role: "Release Train Engineer", level: "Program", resp: "Servant leader and chief coach of the ART" },
                  { role: "Product Manager", level: "Program", resp: "Owns vision, roadmap, and program backlog" },
                  { role: "System Architect", level: "Program", resp: "Guides technical architecture decisions" },
                  { role: "Business Owner", level: "Program", resp: "Assigns business value at PI Planning" },
                  { role: "LPM Team", level: "Portfolio", resp: "Manages portfolio funding and strategy alignment" },
                ].map((r, i) => (
                  <tr key={r.role} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-3 font-bold text-[#01203d]">{r.role}</td>
                    <td className="p-3 text-gray-500">{r.level}</td>
                    <td className="p-3 text-gray-700">{r.resp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is SAFe suitable for small companies?</p>
              <p className="text-lg text-gray-700">SAFe is designed for organizations with 100+ people on delivery teams. Small companies (under 50 developers) typically get better results from vanilla Scrum or a lightweight scaling approach like Nexus or LeSS. The framework overhead isn't justified for smaller scale.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does SAFe implementation take?</p>
              <p className="text-lg text-gray-700">Launching a first ART typically takes 2–4 months of preparation, including training, role definition, and the first PI Planning event. Reaching meaningful organizational agility usually requires 12–18 months and multiple PI cycles. SAFe transformation is a multi-year journey, not a launch event.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's the difference between SAFe and Scrum?</p>
              <p className="text-lg text-gray-700">Scrum is a team-level framework. SAFe is an enterprise-level framework that uses Scrum at the team level but adds program and portfolio coordination structures (ARTs, PI Planning, LPM) that Scrum doesn't address. SAFe teams use Scrum — SAFe programs use PI Planning and ART synchronization events Scrum doesn't have.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do I need SAFe certification to work in SAFe?</p>
              <p className="text-lg text-gray-700">You can work on a SAFe ART without certification. But organizations running SAFe typically require or strongly prefer SAFe credentials for Scrum Masters (SSM), RTEs, Product Managers (POPM), and portfolio leaders (LPM). The certifications signal fluency with the framework's specific terminology and practices.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which SAFe certification should I get first?</p>
              <p className="text-lg text-gray-700">It depends on your role. Leading SAFe (SA) is the broadest entry point and covers the full framework. SSM is ideal for Scrum Masters on ARTs. POPM is for Product Owners and Managers. LPM is for portfolio leaders. Our{" "}
              <Link href="/blog/is-safe-certification-worth-it-2026" className="text-[#01203d] underline hover:no-underline">SAFe certification worth it guide</Link>{" "}
              covers the full certification path by role.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get Certified in SAFe</p>
            <p className="mb-5">Leading SAFe, SSM, POPM, RTE, and LPM — live virtual and in-person with certified SPCs.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">Agile Release Train explained</Link>
            {" · "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] underline hover:no-underline">PI Planning explained</Link>
            {" · "}
            <Link href="/blog/is-safe-certification-worth-it-2026" className="text-[#01203d] underline hover:no-underline">Is SAFe certification worth it?</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
