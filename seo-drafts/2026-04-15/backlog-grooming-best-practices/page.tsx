import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backlog Grooming Best Practices: How to Run Effective Refinement | Agile36",
  description:
    "Backlog grooming best practices for Scrum teams and SAFe ARTs. How to run refinement sessions, write ready stories, estimate accurately, and keep your backlog healthy.",
  keywords: [
    "backlog grooming best practices",
    "backlog refinement tips",
    "how to run backlog grooming",
    "agile backlog management",
    "SAFe backlog refinement",
    "backlog ready for sprint",
  ],
  openGraph: {
    title: "Backlog Grooming Best Practices: How to Run Effective Refinement",
    description: "How to run refinement sessions, write ready stories, estimate accurately, and keep your backlog healthy.",
    url: "https://www.agile36.com/blog/backlog-grooming-best-practices",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/backlog-grooming-best-practices" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Backlog refinement is the gate before sprint planning — if stories aren't refined, sprint planning becomes a slow, painful refinement session that leaves the team with unclear commitments.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>A story is "ready" when: it has clear acceptance criteria, the team has discussed and estimated it, and it's small enough to complete in one sprint.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Run refinement sessions weekly — not just before sprint planning. Teams that refine continuously have shorter sprint planning and higher sprint predictability.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The Product Owner owns the backlog priority. The team owns the estimation. The Scrum Master facilitates. Blurring these responsibilities is the leading cause of ineffective refinement.</span></li>
      </ul>
    </section>
  );
}

function ReadinessChecklist() {
  const checks = [
    "User story follows the 'As a [role], I want [feature], so that [benefit]' format or equivalent",
    "Acceptance criteria are written and clear — the team knows what 'done' looks like",
    "The story has been estimated by the development team",
    "The story fits within one sprint (or is split if it doesn't)",
    "Dependencies on other teams or external systems are identified",
    "Technical questions are answered or assigned to a spike",
    "Design or UX assets required are available or being prepared",
  ];
  return (
    <section aria-label="Story readiness checklist" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Story Readiness Checklist</h3>
      <div className="bg-gray-50 rounded-xl p-6 space-y-3">
        {checks.map((c, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-5 h-5 border-2 border-[#01203d] rounded flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{c}</span>
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
    "Backlog refinement is a continuous practice, not a pre-planning ceremony. Teams that refine weekly have dramatically better sprint planning.",
    "The Definition of Ready is the gate for sprint planning. Stories that don't meet it should be sent back for more refinement, not pulled into planning optimistically.",
    "Estimation discussions during refinement surface hidden complexity before the sprint starts — not during it, when changing scope is expensive.",
    "A healthy backlog has 2–3 sprints of refined, estimated stories ready to pull. Less than that creates sprint planning bottlenecks.",
    "Product Owners who write stories in isolation (without developer input) consistently produce stories that need re-refinement. Collaborative story writing saves time.",
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

export default function BacklogGroomingBestPracticesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Backlog Grooming Best Practices: How to Run Effective Refinement
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Backlog Grooming Best Practices</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Scrum Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Backlog Grooming Best Practices: How to Run Effective Refinement
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Most sprint planning problems are actually backlog problems. When sprint planning runs long, when teams argue about story size, when sprint goals are unclear — the root cause is usually that stories entered planning without being properly refined. Effective backlog grooming (now called "refinement" in the Scrum Guide) is the single highest-leverage practice for{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Scrum Masters</Link>{" "}
            who want to improve their team's sprint execution.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Backlog Refinement Is (and Isn&apos;t)</h2>
          <p className="text-lg text-gray-700 mb-4">
            Backlog refinement is the ongoing process of reviewing, clarifying, estimating, and ordering backlog items so they're ready for sprint planning. The Scrum Guide doesn't prescribe when or how often refinement happens — it just says it should be an ongoing activity that consumes no more than 10% of the team's capacity.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            What refinement is NOT: it's not when stories are written. It's not when acceptance criteria are drafted for the first time. Both of those happen before refinement, typically by the Product Owner with input from key team members. Refinement is when the full team reviews stories that are already partially written, asks questions, surfaces complexity, and estimates.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The goal of a refinement session is to move stories from "needs discussion" to "ready for sprint" — clear acceptance criteria, estimated, dependencies identified, fits in a sprint.
          </p>

          <ReadinessChecklist />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Run a Productive Refinement Session</h2>
          <div className="space-y-4 my-6">
            {[
              { step: "01", title: "PO presents the story, reads the acceptance criteria", desc: "No editorializing. Just read what's written. The team needs to hear the story as written before they can refine it." },
              { step: "02", title: "Team asks clarifying questions", desc: "Open-ended questions only: 'What does the system do if X happens?' 'Is Y in scope?' Not 'Why are we doing this?'" },
              { step: "03", title: "PO answers; story is updated if needed", desc: "If the PO can't answer, the story goes back to pre-refinement and comes to the next session with answers." },
              { step: "04", title: "Team estimates individually, then discusses divergence", desc: "Use planning poker or T-shirt sizing. Discuss when estimates differ significantly — divergence reveals disagreement about scope or complexity." },
              { step: "05", title: "Mark ready or return for more work", desc: "Stories that pass the readiness checklist are marked ready. Those that don't are returned to the PO for revision." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 bg-gray-50 rounded-xl p-5">
                <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-sm">{s.step}</div>
                <div>
                  <strong className="block text-gray-900 mb-1">{s.title}</strong>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="Scrum Master, enterprise technology">
            The best sprint planning sessions I&apos;ve run lasted under an hour. Every one of them had a refinement session that ran two hours the week before.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common Refinement Dysfunctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {[
              { problem: "Refinement becomes sprint planning", fix: "Separate the sessions by at least 2 days. Refinement prepares stories; planning commits to them." },
              { problem: "PO writes all stories alone", fix: "Include 1–2 developers in early story drafting. Collaborative writing produces stories that need less re-refinement." },
              { problem: "Estimates happen without discussion", fix: "Require anyone who estimates significantly higher or lower to explain. Hidden complexity surfaces this way." },
              { problem: "Stories too large to estimate", fix: "Split the story before estimating. A story larger than 5–8 story points (for most teams) should be decomposed." },
            ].map((d) => (
              <div key={d.problem} className="border border-gray-200 rounded-xl p-5">
                <div className="font-bold text-red-600 text-sm mb-1">Problem: {d.problem}</div>
                <div className="text-gray-600 text-sm"><strong>Fix:</strong> {d.fix}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Refinement in SAFe</h2>
          <p className="text-lg text-gray-700 mb-4">
            In SAFe, team backlog refinement connects to the program-level Program Backlog. Product Managers break features into stories, which then flow into team backlogs for refinement. The key difference in SAFe is the two-level backlog structure — team-level stories (owned by the Product Owner) are derived from program-level features (owned by the Product Manager).
          </p>
          <p className="text-lg text-gray-700 mb-4">
            For more on how team and program backlogs connect in PI Planning, see our{" "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] font-semibold underline hover:no-underline">PI Planning explained guide</Link>.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should a backlog refinement session be?</p>
              <p className="text-lg text-gray-700">45 minutes to 90 minutes for a weekly session is typical. More than that usually means the backlog isn't pre-prepared or the team is spending refinement time doing work that should have happened before the session.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who should attend refinement?</p>
              <p className="text-lg text-gray-700">The entire Scrum team — PO, SM, and development team. Partial attendance produces partial understanding and requires re-refinement when absent members ask the same questions during sprint planning.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's the difference between grooming and refinement?</p>
              <p className="text-lg text-gray-700">"Grooming" was the original Scrum term; "refinement" replaced it in the Scrum Guide due to the term's other connotations. They refer to the same activity — reviewing and preparing backlog items. The terms are used interchangeably in practice.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many sprints of stories should be refined at any given time?</p>
              <p className="text-lg text-gray-700">Target 2–3 sprints of ready stories in the backlog at all times. Less than that creates planning pressure; more than that means you're refining stories that will change before they're started — wasted effort.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does the PO have to be present for all refinement?</p>
              <p className="text-lg text-gray-700">Yes. The PO is the only person who can answer questions about the purpose and scope of stories, confirm acceptance criteria changes, and re-prioritize when stories are split. Refinement without the PO typically requires a follow-up session to resolve open questions.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Sharpen Your Scrum Facilitation Skills</p>
            <p className="mb-5">Learn backlog refinement, sprint planning, and advanced SAFe team practices in live instructor-led training.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Scrum Master course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/sprint-planning-best-practices" className="text-[#01203d] underline hover:no-underline">Sprint planning best practices</Link>
            {" · "}
            <Link href="/blog/user-story-writing-guide" className="text-[#01203d] underline hover:no-underline">User story writing guide</Link>
            {" · "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] underline hover:no-underline">Advanced Scrum Master</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
