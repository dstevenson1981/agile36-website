import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sprint Retrospective Guide: How to Run Retros That Drive Real Change | Agile36",
  description:
    "Complete sprint retrospective guide: formats, facilitation techniques, common failure modes, and how to ensure retrospective action items actually get done.",
  keywords: ["sprint retrospective guide", "how to run retrospective", "agile retrospective techniques", "retrospective formats", "scrum retrospective best practices", "sprint retro guide"],
  openGraph: {
    title: "Sprint Retrospective Guide: How to Run Retros That Drive Real Change",
    description: "Retrospective formats, facilitation techniques, and how to make action items stick.",
    url: "https://www.agile36.com/blog/sprint-retrospective-guide",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/sprint-retrospective-guide" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The sprint retrospective has one job: to identify <strong>one or two specific, actionable improvements</strong> that the team will implement in the next sprint. Long lists of improvements produce zero improvements.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most common reason retrospectives fail: the action items <strong>have no owner, no deadline, and no follow-up</strong>. Agreement in the meeting is not the same as commitment to change.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Retrospective format variety is important — teams that do <strong>Start/Stop/Continue</strong> every sprint for two years stop generating genuine insights. Rotating formats keeps reflection fresh.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Psychological safety is the prerequisite. Teams that don&apos;t feel safe naming real problems produce <strong>surface-level retros</strong> about process friction and avoid the interpersonal and systemic issues that actually limit performance.</span></li>
      </ul>
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
          "Commit to one specific improvement per sprint, not five. One improvement that actually happens beats five improvements that get forgotten by the next standup.",
          "Always open the retro by reviewing what you committed to last sprint. If last sprint's improvement didn't happen, start there — not with a fresh brainstorm.",
          "The SM facilitates the retro but doesn't run it like a workshop they own. The goal is to create conditions where the team does the thinking — not to present a polished facilitation product.",
          "Rotate formats every 2–3 sprints. Sailboat, 4Ls, Mad-Sad-Glad, Timeline, Starfish — variety prevents the retro from becoming a mechanical ritual.",
          "In SAFe, the Inspect & Adapt (I&A) workshop at the end of each PI is the ART-level retrospective. It complements, not replaces, team-level sprint retrospectives — each serves a different scope of improvement.",
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

export default function SprintRetrospectiveGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Sprint Retrospective Guide: How to Run Retros That Drive Real Change
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Sprint Retrospective Guide</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Sprint Retrospective Guide: How to Run Retros That Drive Real Change
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The sprint retrospective is the most important ceremony for long-term team performance — and the one most commonly wasted. Teams go through the motions, produce a list of things to improve, and then ignore the list until the next retro. The result is a ceremony that feels safe but produces nothing. For{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Scrum Masters</Link>{" "}
            developing facilitation skills, retrospectives are the highest-leverage event to improve — they compound over time into genuine team performance gains.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Standard Retrospective Flow</h2>
          <p className="text-lg text-gray-700 mb-4">
            The five-phase retrospective structure (from Esther Derby and Diana Larsen&apos;s <em>Agile Retrospectives</em>) is the most reliable framework for running effective retros:
          </p>
          <div className="space-y-3 my-6">
            {[
              { phase: "Set the stage", time: "5 min", desc: "Create psychological safety. Use a quick warm-up or check-in. Remind the team of the retrospective prime directive: 'Everyone did the best job they could given what they knew at the time.'" },
              { phase: "Gather data", time: "10–15 min", desc: "Collect observations about the sprint: what happened, what felt hard, what felt good. Use your chosen format (sticky notes, digital board, timeline). No solutions yet — just data." },
              { phase: "Generate insights", time: "10–15 min", desc: "Cluster the data, identify patterns, and ask 'why?' behind the surface observations. This is where the real work happens — moving from 'our deployments take too long' to 'the root cause is manual approval steps.'" },
              { phase: "Decide what to do", time: "10 min", desc: "Choose 1–2 improvements to commit to. Make them specific, ownable, and bounded: 'We will add automated linting checks to our CI pipeline by Sprint X, owned by [name].'" },
              { phase: "Close the retro", time: "5 min", desc: "Rate the retro itself (1–5). Note what worked and what to change next time. Publicly commit to the improvement items and add them to the sprint backlog." },
            ].map((s) => (
              <div key={s.phase} className="flex gap-4 bg-gray-50 rounded-xl p-4 items-start">
                <div className="bg-[#01203d] text-yellow-400 font-bold rounded-lg px-2 py-1 flex-shrink-0 text-xs">{s.time}</div>
                <div>
                  <strong className="block text-gray-900 text-sm mb-1">{s.phase}</strong>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Five Retrospective Formats to Rotate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[
              { format: "Start / Stop / Continue", desc: "Classic and effective. What should we start doing, stop doing, and keep doing? Simple enough for new teams, nuanced enough for experienced ones." },
              { format: "4Ls: Liked, Learned, Lacked, Longed For", desc: "Great for teams that learn well through positive framing. Lacked and Longed For surface improvement areas without blame language." },
              { format: "Sailboat", desc: "Visual metaphor: anchor (what slows us), wind (what propels us), rocks ahead (risks), island (goal). Good for teams that think visually or have sticky note fatigue." },
              { format: "Mad / Sad / Glad", desc: "Emotionally grounded format that surfaces team morale and engagement issues that task-focused formats miss. Good after a difficult sprint." },
              { format: "Timeline", desc: "Team builds a shared timeline of the sprint — what happened when. Excellent for surfacing cause-and-effect relationships that aren't visible in simpler formats." },
              { format: "DAKI (Drop, Add, Keep, Improve)", desc: "Good for teams with a concrete backlog of process changes. More action-oriented than Start/Stop/Continue." },
            ].map((f) => (
              <div key={f.format} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-[#01203d] text-sm mb-2">{f.format}</p>
                <p className="text-gray-700 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Senior Scrum Master, healthcare technology">
            I used to end retros with a list of five improvements. Nothing ever happened. I switched to committing to exactly one improvement per sprint, putting it in the sprint backlog as a story, and reviewing it at the next retro. Within three months, the team said our retrospectives were the most valuable ceremony we ran.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should a sprint retrospective be?</p>
              <p className="text-lg text-gray-700">The Scrum Guide recommends a maximum of 3 hours for a one-month sprint. For 2-week sprints, 60–90 minutes is typically sufficient. Teams often rush retros to 45 minutes — which is usually too short to go deep enough on root causes. 75 minutes is a practical target for most teams.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who should attend the retrospective?</p>
              <p className="text-lg text-gray-700">The Scrum Team: developers, Scrum Master, and Product Owner. Scrum purists debate PO inclusion — the Scrum Guide includes them, but some teams find PO presence inhibits candor about backlog quality or prioritization. Managers and external stakeholders should not attend — their presence changes team behavior in ways that undermine honest reflection.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What if the team says retros are a waste of time?</p>
              <p className="text-lg text-gray-700">This usually means past retros produced no visible change. The fix isn&apos;t to skip retros — it&apos;s to run one retro specifically about why retros haven&apos;t worked, commit to one specific improvement, and visibly follow through. If the team sees one retro produce one real change, credibility is restored.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Develop Expert-Level Facilitation Skills</p>
            <p className="mb-5">SAFe SSM training covers retrospective facilitation, team dynamics, and the full range of Scrum Master competencies.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/sprint-planning-best-practices" className="text-[#01203d] underline hover:no-underline">Sprint planning best practices</Link>
            {" · "}
            <Link href="/blog/definition-of-done-examples" className="text-[#01203d] underline hover:no-underline">Definition of Done examples</Link>
            {" · "}
            <Link href="/blog/safe-inspect-and-adapt" className="text-[#01203d] underline hover:no-underline">SAFe Inspect &amp; Adapt</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
