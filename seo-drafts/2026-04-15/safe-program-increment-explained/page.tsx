import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Program Increment Explained: What a PI Is and How It Works | Agile36",
  description:
    "SAFe Program Increment explained: what a PI is, how long it lasts, how it connects to PI Planning, sprints, and the Innovation and Planning iteration.",
  keywords: ["SAFe program increment explained", "what is a program increment", "SAFe PI explained", "PI SAFe", "program increment planning SAFe", "SAFe PI length"],
  openGraph: {
    title: "SAFe Program Increment Explained: What a PI Is and How It Works",
    description: "What a Program Increment is in SAFe, how it's structured, and how teams plan and deliver within it.",
    url: "https://www.agile36.com/blog/safe-program-increment-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-program-increment-explained" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>A Program Increment (PI) is SAFe&apos;s <strong>timebox for ART-level delivery</strong> — typically 8–12 weeks consisting of 4–6 development iterations (sprints) plus one Innovation and Planning (IP) iteration at the end.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Each PI begins with <strong>PI Planning</strong> — a 2-day event where all teams on the ART plan their iteration objectives, identify dependencies, and establish program-level commitments. PI Planning is the event that makes the PI possible as a coordination mechanism.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The PI produces <strong>PI Objectives</strong> — team-level and ART-level statements of what each team commits to delivering. PI Objectives are the primary accountability mechanism for the ART during the PI.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The PI ends with the <strong>Inspect and Adapt</strong> (I&amp;A) event — a structured retrospective and problem-solving workshop at the ART level. I&amp;A produces improvement items that feed into the next PI.</span></li>
      </ul>
    </section>
  );
}

function PIStructure() {
  const iterations = [
    { label: "Iteration 1", type: "dev", week: "Wks 1-2" },
    { label: "Iteration 2", type: "dev", week: "Wks 3-4" },
    { label: "Iteration 3", type: "dev", week: "Wks 5-6" },
    { label: "Iteration 4", type: "dev", week: "Wks 7-8" },
    { label: "Iteration 5", type: "dev", week: "Wks 9-10" },
    { label: "IP Iteration", type: "ip", week: "Wks 11-12" },
  ];
  return (
    <section aria-label="PI structure" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Program Increment Structure (12-week example)</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {iterations.map((it) => (
          <div key={it.label} className={`rounded-xl p-3 text-center ${it.type === "ip" ? "bg-yellow-400 text-[#01203d]" : "bg-[#01203d] text-white"}`}>
            <p className="text-xs font-bold">{it.label}</p>
            <p className="text-[10px] mt-1 opacity-75">{it.week}</p>
            {it.type === "ip" && <p className="text-[10px] mt-1 font-semibold">IP / I&A</p>}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#01203d]" /><span className="text-xs text-gray-500">Development iterations</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400" /><span className="text-xs text-gray-500">Innovation &amp; Planning iteration</span></div>
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
          "The PI is the heartbeat of the ART. Every ART ceremony — PI Planning, System Demos, Inspect and Adapt — is anchored to the PI timebox. Understanding the PI structure is the foundation for understanding how SAFe creates alignment across multiple teams.",
          "The IP iteration is not a buffer for unfinished work. It exists for innovation, team-level improvement, and PI Planning preparation. ARTs that use the IP iteration to finish late development work are hiding planning problems rather than solving them.",
          "PI Objectives at both team and program level serve as explicit commitments that the ART reviews at the end of the PI. The percentage of PI Objectives achieved is one of SAFe's primary ART performance metrics — it makes delivery predictability visible.",
          "Most organizations run 4-5 PIs per year. This creates a predictable calendar that allows stakeholders to plan their involvement, teams to develop PI-level rhythm, and leadership to align portfolio decisions to PI boundaries.",
          "PI Planning is what makes the PI a coordination mechanism rather than just a timebox. Without the PI Planning event, teams would simply run independent sprints. PI Planning creates the shared understanding of dependencies, risks, and priorities that makes ART-level delivery coherent.",
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

export default function SafeProgramIncrementExplainedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Program Increment Explained: What a PI Is and How It Works
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Program Increment Explained</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Framework</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Program Increment Explained: What a PI Is and How It Works
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Program Increment is the fundamental unit of planning and delivery in SAFe. Where individual teams operate in 2-week sprints, the Agile Release Train operates in PIs — 8-to-12-week periods during which multiple teams align their work, plan together, execute together, and review together. Every element of SAFe&apos;s program-level process — from{" "}
            <Link href="/blog/safe-pi-planning-tips" className="text-[#01203d] font-semibold underline hover:no-underline">PI Planning</Link>{" "}
            to Inspect and Adapt — is organized around the PI cadence.
          </p>

          <ExecutiveSummary />

          <PIStructure />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Innovation and Planning Iteration</h2>
          <p className="text-lg text-gray-700 mb-4">
            The IP iteration is the final iteration of every PI — and frequently the most misunderstood. It serves three purposes: innovation time for teams to work on improvements, technical debt, and learning; preparation for the next PI Planning event; and buffer time for the Inspect and Adapt workshop.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Organizations that treat the IP iteration as a catch-up sprint for incomplete development work are making a costly mistake. They&apos;re hiding their planning problems (teams consistently over-committing) rather than surfacing them. The IP iteration should feel like a release valve for creativity and improvement — not a deadline extension.
          </p>

          <PullQuote attribution="RTE, enterprise financial services">
            Our first two PIs, the IP iteration was just overrun development work. When we finally enforced the IP iteration boundary — nothing but innovation and prep — teams started planning more conservatively and the quality of our PI Planning improved dramatically. The IP iteration is a forcing function for honest capacity planning.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long is a standard Program Increment?</p>
              <p className="text-lg text-gray-700">The recommended PI length is 8–12 weeks. Most organizations settle on 10 or 12 weeks (5 or 6 two-week iterations including the IP iteration). Shorter PIs create too much PI Planning overhead relative to delivery time; longer PIs reduce the frequency of ART-level reflection and make dependencies harder to manage.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What happens at the end of a PI?</p>
              <p className="text-lg text-gray-700">The PI concludes with the Inspect and Adapt (I&A) event. I&A includes a System Demo (teams demonstrate integrated working software from the PI), a quantitative PI assessment, and a problem-solving workshop where the ART identifies the top impediment to flow and creates improvement items. These improvements feed into the next PI.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What are PI Objectives?</p>
              <p className="text-lg text-gray-700">PI Objectives are team-level and ART-level statements of what will be delivered during the PI. Each team creates 3-5 PI Objectives during PI Planning, scoring them with business value. At the end of the PI, actual business value scores are compared to planned scores — creating a predictability metric for the ART.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text="text-gray-900 mb-2">Can teams have different sprint lengths within a PI?</p>
              <p className="text-lg text-gray-700">SAFe strongly recommends synchronized iterations — all teams on an ART running the same 2-week sprint boundaries. Synchronization enables System Demos, coordinated dependency management, and ART-level ceremonies. Teams with genuinely different cadences create coordination friction that defeats much of the value of the ART model.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How does the PI relate to portfolio planning?</p>
              <p className="text-lg text-gray-700">Portfolio-level Epic decisions and Strategic Theme updates are timed to align with PI boundaries. Lean Portfolio Management governs investment at the ART level across PIs — ensuring that value stream budgets are allocated to ARTs with the capacity to deliver on them. PI boundaries are the natural checkpoints for portfolio-level governance.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn SAFe at Scale</p>
            <p className="mb-5">Leading SAFe certification covers the full SAFe framework — including PI Planning, ART operations, and the Program Increment lifecycle.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Leading SAFe
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-pi-planning-tips" className="text-[#01203d] underline hover:no-underline">SAFe PI Planning tips</Link>
            {" · "}
            <Link href="/blog/safe-inspect-and-adapt" className="text-[#01203d] underline hover:no-underline">SAFe Inspect and Adapt</Link>
            {" · "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">SAFe Agile Release Train explained</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
