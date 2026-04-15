import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTE vs Scrum Master: How They Differ and How They Work Together | Agile36",
  description:
    "RTE vs Scrum Master: what each role does, how they differ in scope and responsibility, and how they collaborate within a SAFe Agile Release Train.",
  keywords: ["RTE vs Scrum Master", "release train engineer vs scrum master", "RTE scrum master difference", "SAFe RTE SM comparison", "release train engineer scrum master", "what does RTE do vs SM"],
  openGraph: {
    title: "RTE vs Scrum Master: How They Differ and How They Work Together",
    description: "The key differences between Release Train Engineers and Scrum Masters in SAFe.",
    url: "https://www.agile36.com/blog/rte-vs-scrum-master",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/rte-vs-scrum-master" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The RTE is essentially a <strong>Scrum Master at the ART level</strong>. The SM serves one team; the RTE serves the full Agile Release Train (typically 5-12 teams). The RTE is often a senior SM who has moved up.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>RTEs facilitate <strong>ART-level ceremonies</strong>: PI Planning, ART sync, Scrum of Scrums, Inspect &amp; Adapt. SMs facilitate team-level ceremonies: daily standup, sprint planning, retrospective, sprint review.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The RTE coordinates <strong>cross-team dependencies</strong> that individual Scrum Masters can&apos;t resolve alone. When two teams have delivery dependencies in a PI, the RTE manages that at the ART level.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Both roles are servant leaders — the RTE coaches the ART, coaches the SMs, and escalates organizational impediments that the SMs can&apos;t resolve. The career path typically runs <strong>SM → SASM → RTE</strong>.</span></li>
      </ul>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { dim: "Serves", sm: "One Scrum team (5-11 people)", rte: "Agile Release Train (50-125 people)" },
    { dim: "Ceremonies facilitated", sm: "Standup, planning, retro, review", rte: "PI Planning, ART sync, SoS, I&A" },
    { dim: "Backlog managed", sm: "No — coaches team on backlog health", rte: "No — coaches PM and SMs on backlog health" },
    { dim: "Impediment scope", sm: "Team-level and organizational escalation", rte: "ART-level, organizational, and systemic" },
    { dim: "Coaches", sm: "Team members, PO on agile practices", rte: "Scrum Masters, PMs, ART members" },
    { dim: "Reports to", sm: "Typically SM manager or product leader", rte: "Typically VP Engineering or similar" },
    { dim: "SAFe certification", sm: "SSM (SAFe Scrum Master)", rte: "SA + SASM + RTE certification path" },
    { dim: "Typical salary (US)", sm: "$95k–$140k", rte: "$130k–$185k" },
  ];
  return (
    <section aria-label="RTE vs SM comparison" className="my-10 overflow-x-auto">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">RTE vs Scrum Master: Role Comparison</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#01203d] text-white">
            <th className="p-3 text-left w-1/3">Dimension</th>
            <th className="p-3 text-left">Scrum Master (SM)</th>
            <th className="p-3 text-left">Release Train Engineer (RTE)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.dim} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-semibold text-[#01203d] border-b border-gray-100">{r.dim}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.sm}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.rte}</td>
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
          "The RTE is not an SM's boss — it's a peer at a different level of the organization. RTEs coach SMs; they don't manage them. In healthy SAFe organizations, RTEs support SMs' development and help them resolve impediments that are above team level.",
          "The most common reason SMs apply for RTE roles: they've mastered team-level agile and want broader organizational impact. The RTE role requires all SM skills plus program-level coordination, executive communication, and ART health management.",
          "PI Planning is the most visible RTE responsibility — a 2-day event for the entire ART that requires months of preparation and careful facilitation. SMs who haven't experienced PI Planning from the RTE seat often underestimate what the role requires.",
          "In some organizations, the RTE fills gaps when SMs are absent or when a team doesn't have a dedicated SM. This is a tactical necessity, not the role definition — RTEs who spend most of their time in team ceremonies are probably covering an SM staffing gap.",
          "For career progression: SASM certification is the natural next step after SSM for practitioners targeting the RTE path. SASM covers coaching at scale and organizational agility — the competencies RTEs use daily.",
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

export default function RteVsScrumMasterPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          RTE vs Scrum Master: How They Differ and How They Work Together
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>RTE vs Scrum Master</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Role Comparison</span>
          <span className="text-sm text-[#718aa5]">Comparison Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          RTE vs Scrum Master: How They Differ and How They Work Together
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Release Train Engineer (RTE) and Scrum Master are both servant leaders in SAFe — but they operate at different scales. Understanding the distinction matters whether you&apos;re a Scrum Master considering the RTE career path, an organization trying to staff an ART correctly, or a practitioner preparing for the{" "}
            <Link href="/courses/release-train-engineer" className="text-[#01203d] font-semibold underline hover:no-underline">RTE certification</Link>.{" "}
            The short version: SMs serve teams; RTEs serve Agile Release Trains.
          </p>

          <ExecutiveSummary />

          <ComparisonTable />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How RTE and SM Work Together</h2>
          <p className="text-lg text-gray-700 mb-4">
            On a healthy ART, RTEs and SMs form a coaching network. RTEs facilitate the ART-level events that create alignment across teams, while SMs ensure team-level execution is solid. RTEs coach SMs on SAFe practices, escalate organizational impediments that SMs surface, and help SMs develop professionally.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In practice, the Scrum of Scrums (a key ART synchronization ceremony) is where this relationship is most visible. SMs or their team representatives report cross-team impediments and dependencies at SoS — and the RTE manages resolution at the ART level. Items the SM can&apos;t resolve become items the RTE escalates to program leadership.
          </p>

          <PullQuote attribution="Release Train Engineer, enterprise banking">
            I spent six years as a Scrum Master before moving to the RTE role, and the thing that most surprised me was how much of the job is still coaching — just at a different level. Instead of coaching a developer on decomposing a story, I&apos;m coaching an SM on how to facilitate a conflict in their team. The skills translate; the audience changes.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many Scrum Masters does an RTE work with?</p>
              <p className="text-lg text-gray-700">A typical ART has 5-12 Scrum teams, each with a dedicated SM. The RTE works with all of them — coaching them individually, facilitating ART-level ceremonies they all participate in, and helping them resolve cross-team coordination challenges. Managing the SM network is a significant part of the RTE role.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can a Scrum Master become an RTE without SASM certification?</p>
              <p className="text-lg text-gray-700">Yes — the RTE certification (and the SASM) are not mandatory prerequisites for being hired as an RTE. Many experienced SMs move into RTE roles based on their experience. The certifications signal readiness and validate the skills, but organizations often value demonstrated track record over credentials at the senior level.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does the RTE attend team-level ceremonies?</p>
              <p className="text-lg text-gray-700">Occasionally, but not as a regular responsibility. RTEs may attend team retrospectives or sprint reviews to stay connected to team health, but their primary ceremonies are ART-level. RTEs who spend significant time in team ceremonies are usually covering for an SM gap rather than fulfilling the RTE role.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the salary difference between RTE and SM?</p>
              <p className="text-lg text-gray-700">RTEs typically earn $130k-$185k+ in the US; SMs typically earn $95k-$140k. The gap reflects the broader scope of the RTE role — managing across multiple teams, facilitating PI Planning, and working with senior leadership. The career progression from SM to RTE typically brings a 20-35% salary increase.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the RTE role full-time or can it be combined with SM responsibilities?</p>
              <p className="text-lg text-gray-700">On ARTs with 5+ teams, the RTE is a full-time role. On smaller ARTs, the RTE may also serve as SM for one team, though this creates role tension — the RTE should be available for ART-level coordination while the SM is heads-down in team ceremonies. SAFe recommends a dedicated RTE for ARTs of significant scale.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Advance from SM to RTE</p>
            <p className="mb-5">SASM and RTE certification programs build the ART-level coaching and coordination skills the RTE role requires.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/advanced-scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                SASM training
              </Link>
              <Link href="/courses/release-train-engineer" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                RTE certification
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/rte-career-path" className="text-[#01203d] underline hover:no-underline">RTE career path</Link>
            {" · "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
            {" · "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">Agile Release Train explained</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
