import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sprint Planning Best Practices: How to Run Planning That Actually Works | Agile36",
  description:
    "Sprint planning best practices from certified SAFe practitioners: how to define a clear sprint goal, estimate effectively, avoid overcommitment, and leave planning with a team that can execute.",
  keywords: [
    "sprint planning best practices",
    "how to run sprint planning",
    "sprint planning tips",
    "agile sprint planning",
    "sprint planning meeting",
    "SAFe sprint planning",
  ],
  openGraph: {
    title: "Sprint Planning Best Practices: How to Run Planning That Actually Works",
    description: "How to define a clear sprint goal, estimate effectively, avoid overcommitment, and leave planning with a team that can execute.",
    url: "https://www.agile36.com/blog/sprint-planning-best-practices",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/sprint-planning-best-practices" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Sprint planning serves one purpose: <strong>give the team a clear, achievable sprint goal and a shared plan for the next iteration</strong>. Everything else — estimation, story discussion, capacity math — is in service of that goal.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most common sprint planning failure is <strong>overcommitment</strong> — taking on more than the team's realistic capacity. The second most common is starting with stories instead of starting with the sprint goal.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Effective sprint planning requires <strong>refined backlog items</strong> — stories with clear acceptance criteria that the team has already discussed. Planning is not backlog refinement.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>A well-run sprint planning session should take <strong>no more than 2 hours for a 2-week sprint</strong>. If it's taking 4+ hours, the backlog isn't ready.</span></li>
      </ul>
    </section>
  );
}

function PlanningSteps() {
  const steps = [
    { num: "01", title: "State the Sprint Goal First", desc: "Before any stories are discussed, the PO presents the sprint goal — the business objective this sprint delivers. Every story selection decision flows from this." },
    { num: "02", title: "Review Team Capacity", desc: "Account for PTO, holidays, support rotations, and recurring meetings. Use the team's historical velocity as a ceiling, not a floor." },
    { num: "03", title: "Select Stories to the Goal", desc: "Pull stories from the top of the refined backlog that contribute to the sprint goal. Confirm acceptance criteria are clear before committing." },
    { num: "04", title: "Break Stories into Tasks", desc: "The team decomposes selected stories into tasks during Part 2 of planning. This surfaces hidden work and confirms the team understands how to implement each story." },
    { num: "05", title: "Confirm the Sprint Goal Collectively", desc: "End with the team verbally confirming the sprint goal and their commitment to the plan. Silence is not agreement." },
  ];
  return (
    <section aria-label="Sprint planning process" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Sprint Planning in Five Steps</h3>
      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.num} className="flex gap-4 border border-gray-200 rounded-xl p-5">
            <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-sm">{s.num}</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
              <p className="text-gray-600 text-sm">{s.desc}</p>
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
  const items = [
    "Start every sprint planning session with the sprint goal — not with stories. The goal is what gives story selection meaning.",
    "A backlog item isn't ready for sprint planning if acceptance criteria aren't clear and the team hasn't discussed it. Backlog refinement is the gate.",
    "Use the team's historical velocity as a ceiling, not a target. Planning to historical average consistently produces overcommitment.",
    "Sprint planning should end with explicit team commitment — verbal confirmation of the sprint goal, not just a list of selected stories.",
    "The Scrum Master facilitates sprint planning; they don't run it. The team makes the decisions on what to commit to.",
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

export default function SprintPlanningBestPracticesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Sprint Planning Best Practices: How to Run Planning That Actually Works
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Sprint Planning Best Practices</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Scrum Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Sprint Planning Best Practices: How to Run Planning That Actually Works
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Sprint planning is the one Scrum event teams complain about most — too long, too much debate, too little clarity going in, too little commitment coming out. After training{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">thousands of Scrum Masters</Link>{" "}
            through our SAFe courses, we've identified the same failure patterns showing up across organizations of every size. The good news: effective sprint planning is a learnable skill, and the fixes are straightforward once you see what's going wrong.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Two-Part Structure of Sprint Planning</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Scrum Guide defines sprint planning with a specific two-part structure that most teams blur together, which is where much of the confusion and inefficiency comes from:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-[#01203d] text-white rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-3">Part 1: The Why and the What</h4>
              <p className="text-gray-200 text-sm">The PO presents the sprint goal. The team selects stories from the top of the refined backlog that support that goal. This part focuses on <em>what</em> to build and <em>why</em>. Decisions are made at the story level.</p>
            </div>
            <div className="bg-[#134263] text-white rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-3">Part 2: The How</h4>
              <p className="text-gray-200 text-sm">The team decomposes selected stories into tasks. This reveals the implementation plan — how the team will build what they committed to. This part is owned by the team, not the PO.</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            Keeping these parts distinct prevents two common dysfunctions: (1) the PO dominating the conversation about implementation, and (2) the team getting lost in task-level detail before story selection is complete.
          </p>

          <PlanningSteps />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Overcommitment Problem</h2>
          <p className="text-lg text-gray-700 mb-4">
            Overcommitment is the most damaging sprint planning dysfunction. Teams take on too much, sprint execution becomes a triage exercise, and the team misses the sprint goal — which erodes trust with stakeholders. The root causes:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-4">
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <div><strong>Optimistic capacity assumptions.</strong> Forgetting to account for meetings, support rotations, code reviews, and informal collaboration that consumes 30–40% of actual sprint time.</div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <div><strong>Pressure-driven commitments.</strong> Management wants more output, so the team commits to more stories than their velocity supports. This never ends well.</div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <div><strong>Unrefined stories.</strong> Stories without clear acceptance criteria get selected, and the team discovers mid-sprint that they're larger or more complex than assumed during planning.</div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <div><strong>Team velocity as a target, not a ceiling.</strong> If the team averages 40 points, planning to 45 "to stretch" consistently produces misses.</div>
            </div>
          </div>

          <PullQuote attribution="SPC, Agile36 instructor">
            The sprint goal is not &quot;finish the stories we selected.&quot; That&apos;s a task list, not a goal. A sprint goal is a business objective that delivers value — it&apos;s what makes the sprint worth running.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Writing a Real Sprint Goal</h2>
          <p className="text-lg text-gray-700 mb-4">
            Most teams write sprint goals that are actually just labels for their story list: "Complete authentication stories and fix three bugs." That's not a goal — it's a to-do list. A sprint goal expresses the <em>business value</em> the sprint will deliver.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border border-red-200 bg-red-50 rounded-xl p-5">
              <div className="text-red-600 font-bold text-sm mb-2">❌ Not a sprint goal</div>
              <p className="text-gray-700 text-sm">"Complete the user authentication stories, fix the login bug, and update the documentation."</p>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-xl p-5">
              <div className="text-green-600 font-bold text-sm mb-2">✅ A real sprint goal</div>
              <p className="text-gray-700 text-sm">"Enable customers to self-register and log in securely so we can launch the beta to the first 100 users."</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Sprint Planning in SAFe vs. Standard Scrum</h2>
          <p className="text-lg text-gray-700 mb-4">
            In SAFe environments, sprint planning happens within a larger PI Planning context. Teams know their PI objectives — the program-level commitments they made during PI Planning — and their sprint plans should directly serve those PI objectives. The sprint goal isn't invented fresh each sprint; it's informed by what the team committed to deliver in the Program Increment.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Scrum Masters on Agile Release Trains also participate in ART-level synchronization after team sprint planning. Our{" "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] font-semibold underline hover:no-underline">PI Planning explained guide</Link>{" "}
            covers how team sprint planning connects to the program level in detail.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should sprint planning take?</p>
              <p className="text-lg text-gray-700">The Scrum Guide time-boxes sprint planning to 8 hours for a one-month sprint. For two-week sprints, 2–4 hours is typical. If your sprint planning consistently runs 4+ hours, the primary fix is backlog readiness — stories should be refined before planning, not during it.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who attends sprint planning?</p>
              <p className="text-lg text-gray-700">The entire Scrum team: the Product Owner, Scrum Master, and all development team members. The PO presents the goal and is available to clarify requirements. The SM facilitates. The dev team makes the commitments. External stakeholders don't attend.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What if the team can't agree on estimates during planning?</p>
              <p className="text-lg text-gray-700">Divergent estimates are a signal that the team has different understandings of the story. Surface the disagreement explicitly — ask each person to explain their estimate. Often, 2 minutes of conversation resolves what looked like a 30-minute debate. If not, the story needs more refinement before it's ready for sprint planning.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What happens if the team can't complete the sprint plan?</p>
              <p className="text-lg text-gray-700">Incomplete sprint planning — where the team doesn't have enough ready stories to fill sprint capacity — is a backlog problem, not a planning problem. Fix it by making backlog refinement a regular, rigorous practice. A well-run weekly refinement session is the prevention.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is Jira required for sprint planning?</p>
              <p className="text-lg text-gray-700">No. The planning conversation is what matters. Jira, Rally, Azure DevOps, or sticky notes on a wall can all work. Tool selection doesn't determine sprint planning quality — facilitation and backlog readiness do.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Train as a SAFe Scrum Master</p>
            <p className="mb-5">Learn sprint planning, retrospectives, PI Planning, and advanced SAFe facilitation with live expert instruction.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/backlog-grooming-best-practices" className="text-[#01203d] underline hover:no-underline">Backlog grooming best practices</Link>
            {" · "}
            <Link href="/blog/pi-planning-explained" className="text-[#01203d] underline hover:no-underline">PI Planning explained</Link>
            {" · "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] underline hover:no-underline">Advanced Scrum Master</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
