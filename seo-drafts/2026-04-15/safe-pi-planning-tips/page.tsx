import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PI Planning Tips: How to Run a More Effective Program Increment Planning Event | Agile36",
  description:
    "Practical PI Planning tips for RTEs, Scrum Masters, and Product Managers. How to prepare, what goes wrong, and how to run a PI Planning that produces real shared commitment.",
  keywords: ["PI planning tips", "PI planning best practices", "how to run PI planning", "SAFe PI planning tips", "program increment planning tips", "effective PI planning"],
  openGraph: {
    title: "PI Planning Tips: How to Run a More Effective Program Increment Planning Event",
    description: "Practical tips for better PI Planning: preparation, facilitation, and making PI Objectives stick.",
    url: "https://www.agile36.com/blog/safe-pi-planning-tips",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-pi-planning-tips" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>PI Planning quality correlates more with <strong>preparation than facilitation</strong>. A well-prepared ART with a clear vision, refined features, and pre-socialized capacity can run a good PI Planning. A poorly prepared ART fails no matter how skilled the facilitator.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most common PI Planning failure mode is <strong>teams committing to more than they can deliver</strong> — driven by external pressure, optimism, or inadequate capacity planning. Velocity-based capacity is not optional.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The Program Board is the most important artifact produced at PI Planning — not the iteration plans. <strong>Dependencies visualized and owned</strong> on the Program Board are what prevent PI execution failures.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>A confidence vote below 4 is not a failure — it&apos;s a signal. The RTE&apos;s job is to find and address what&apos;s driving the low confidence, not to pressure teams into higher votes.</span></li>
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
          "The two weeks before PI Planning matter as much as the two days of PI Planning. Vision, features, and team capacity must be clear before the room fills — or you'll spend the first morning fixing preparation failures.",
          "Business Owners who attend and engage produce better PI Objectives than those who attend and observe. Brief your Business Owners before PI Planning on how to give meaningful business value scores.",
          "The Program Board is the delivery contract. Any dependency not on the board is an invisible risk. Scrum Masters should push teams to identify all cross-team dependencies — including the ones that seem small.",
          "Remote PI Planning requires more facilitation scaffolding than in-person. Assign explicit digital board roles, use breakout rooms with timers, and build in more explicit check-ins. Silent digital rooms are a warning sign.",
          "Review your PI Planning outcomes at every sprint System Demo. Drift from PI Objectives is data — not failure. Early awareness of drift gives the ART time to re-plan before it becomes a PI failure.",
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

export default function PIPlanningTipsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          PI Planning Tips: How to Run a More Effective Program Increment Planning Event
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>PI Planning Tips</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          PI Planning Tips: How to Run a More Effective Program Increment Planning Event
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            PI Planning is the single most important event in SAFe — and the one that varies most in quality across organizations. The difference between a PI Planning that produces genuine shared commitment and one that produces a stack of paper plans nobody uses is almost always preparation and facilitation quality. For{" "}
            <Link href="/courses/release-train-engineer" className="text-[#01203d] font-semibold underline hover:no-underline">RTEs</Link>{" "}
            and{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Scrum Masters</Link>{" "}
            improving their PI Planning, this guide covers the highest-yield changes.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Pre-PI Planning: The 2 Weeks That Matter Most</h2>
          <p className="text-lg text-gray-700 mb-4">
            Most PI Planning failures are preparation failures. If teams arrive without a clear vision, unrefined features, or no capacity data, they spend the first morning doing work that should have been done weeks earlier. Use the 2 weeks before PI Planning to:
          </p>
          <div className="space-y-3 my-6">
            {[
              { task: "Publish the ART vision and roadmap", owner: "Product Management", detail: "Teams need to understand the product direction and key objectives before they can plan intelligently." },
              { task: "Refine the top 2 sprints of features to story-ready", owner: "Product Owners + teams", detail: "At least the first sprint's backlog should be story-ready going into PI Planning. Unrefined features force teams to estimate blindly." },
              { task: "Calculate team capacity", owner: "Scrum Masters", detail: "Account for holidays, team events, training, support rotations, and known absences for the PI period. Capacity is the input; velocity is the output reference." },
              { task: "Brief Business Owners", owner: "RTE", detail: "Business Owners who understand how to give business value scores and how to engage in team breakouts produce far more useful PI Planning interactions." },
              { task: "Prepare the digital / physical environment", owner: "RTE + logistics", detail: "Program Boards configured, breakout rooms assigned, digital tools tested, agendas published. Technical failures at the start of PI Planning kill momentum." },
            ].map((s) => (
              <div key={s.task} className="flex gap-4 bg-gray-50 rounded-xl p-4 items-start">
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <span className="text-[#01203d] font-bold text-sm flex-shrink-0">→</span>
                    <strong className="block text-gray-900 text-sm">{s.task}</strong>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 ml-4">Owner: {s.owner} · {s.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">During PI Planning: The Facilitation Moves That Matter</h2>
          <p className="text-lg text-gray-700 mb-4">
            Good PI Planning facilitation is about maintaining energy, surfacing information, and creating conditions for real commitment — not managing a rigid agenda. The most effective facilitation moves:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {[
              { move: "Walk the room during breakouts", desc: "The RTE and Scrum Masters should circulate and spot teams that are stuck, overcommitting, or identifying risks they're not writing down." },
              { move: "Call out Program Board gaps publicly", desc: "During the draft plan review, explicitly ask: 'Does any team have a dependency they haven't put on the board yet?' Named dependencies get written down." },
              { move: "Protect the confidence vote", desc: "Don't frame the confidence vote as an evaluation — frame it as information. Low votes are useful data, not failure." },
              { move: "Time-box team breakouts strictly", desc: "Teams without a time limit will over-plan. 45-minute breakouts with a visible timer produce better plans than 2-hour open sessions." },
              { move: "Close with team PI Objectives read-out", desc: "Have each team briefly share their stretch and committed PI Objectives. This cross-team visibility creates accountability and surfaces late-breaking dependencies." },
            ].map((m) => (
              <div key={m.move} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-[#01203d] text-sm mb-2">{m.move}</p>
                <p className="text-gray-600 text-xs">{m.desc}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Release Train Engineer, enterprise technology">
            The best PI Planning I ever ran had mediocre facilitation. It worked because Product Management had done the work: clear vision, refined features, pre-socialized priorities. The room ran itself. The worst PI Planning I ran had excellent facilitation — and failed because the features were half-baked and the teams were planning against a roadmap they&apos;d never seen.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What if the ART can&apos;t meet in person for PI Planning?</p>
              <p className="text-lg text-gray-700">Remote PI Planning works but requires 2–3× more facilitation scaffolding than in-person. Use dedicated digital boards (Mural, Miro, JIRA Plans), explicit breakout room facilitation, tighter time boxes, and daily check-ins during the event. The risk with remote is that teams disengage during team breakouts — assign a "facilitator" (usually the SM) to each breakout room with a clear deliverable and time box.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many features should be planned per team per PI?</p>
              <p className="text-lg text-gray-700">A rough heuristic: a team can reliably deliver 3–6 features per PI depending on size, complexity, and team velocity. Teams that plan 10+ features are overcommitting. Features should map to the team's realistic capacity, not the Program Backlog wishlist. Scrum Masters should help teams challenge their plans during breakouts.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What should we do with ROAM risks from PI Planning?</p>
              <p className="text-lg text-gray-700">ROAM risks are categorized as Resolved, Owned, Accepted, or Mitigated. Risks categorized as "Owned" should have an owner, a mitigation plan, and a review date. Put them in the ART-level backlog or risk register and review them at every System Demo. Risks that aren't visibly tracked after PI Planning get forgotten — that's how they become incidents.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Train Your RTE and Scrum Masters</p>
            <p className="mb-5">PI Planning facilitation is taught in live certification training — not learned from a manual. Our SAFe courses prepare practitioners to run effective PIs.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/release-train-engineer" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                RTE certification
              </Link>
              <Link href="/courses/scrum-master" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                SSM training
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">ART explained</Link>
            {" · "}
            <Link href="/blog/safe-inspect-and-adapt" className="text-[#01203d] underline hover:no-underline">Inspect &amp; Adapt guide</Link>
            {" · "}
            <Link href="/blog/rte-career-path" className="text-[#01203d] underline hover:no-underline">RTE career path</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
