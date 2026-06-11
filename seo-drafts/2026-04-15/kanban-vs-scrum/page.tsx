import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanban vs Scrum: Which Framework Fits Your Team? | Agile36",
  description:
    "Kanban vs Scrum compared: cadence, roles, planning, visualization, and when each framework actually works. A practitioner's guide to choosing — or combining — them.",
  keywords: [
    "Kanban vs Scrum",
    "Scrum vs Kanban difference",
    "when to use Kanban vs Scrum",
    "Kanban or Scrum for my team",
    "agile framework comparison",
    "Scrumban",
  ],
  openGraph: {
    title: "Kanban vs Scrum: Which Framework Fits Your Team?",
    description: "A practitioner's guide to choosing between Kanban and Scrum — or combining them.",
    url: "https://www.agile36.com/blog/kanban-vs-scrum",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/kanban-vs-scrum" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Scrum structures work in <strong>fixed-length sprints with defined ceremonies and roles</strong>. Kanban is a flow-based system with no prescribed cadence — work moves through the board continuously.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Scrum works best for teams with <strong>predictable, batch-able work</strong> — software development, product delivery. Kanban fits better for <strong>continuous-flow work</strong> — operations, support, maintenance.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Many teams use a combination called <strong>Scrumban</strong> — Scrum's cadence and ceremonies with Kanban's WIP limits and flow visualization.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>In SAFe, teams use Scrum for iteration planning and execution. Kanban is available as an alternative for teams with continuous-flow work (e.g., operations teams on an ART).</span></li>
      </ul>
    </section>
  );
}

function ComparisonGrid() {
  const rows = [
    { attr: "Cadence", scrum: "Fixed sprints (1–4 weeks)", kanban: "Continuous flow, no fixed cadence" },
    { attr: "Roles", scrum: "Scrum Master, PO, Dev Team", kanban: "No prescribed roles" },
    { attr: "Planning", scrum: "Sprint planning each iteration", kanban: "Pull-based, when capacity exists" },
    { attr: "WIP Limits", scrum: "Implicit (sprint commitment)", kanban: "Explicit limits per stage" },
    { attr: "Velocity Metric", scrum: "Story points per sprint", kanban: "Cycle time, throughput" },
    { attr: "Change During Work", scrum: "No changes mid-sprint", kanban: "Changes allowed anytime" },
    { attr: "Best for", scrum: "Software delivery, product teams", kanban: "Operations, support, maintenance" },
    { attr: "Ceremonies", scrum: "Planning, standup, review, retro", kanban: "No prescribed ceremonies" },
  ];
  return (
    <section aria-label="Kanban vs Scrum comparison" className="my-10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-gray-100 p-3 text-left">Dimension</th>
              <th className="bg-[#01203d] text-white p-3 text-left">Scrum</th>
              <th className="bg-[#134263] text-white p-3 text-left">Kanban</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.attr} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-medium text-gray-700">{r.attr}</td>
                <td className="p-3 text-gray-700">{r.scrum}</td>
                <td className="p-3 text-gray-700">{r.kanban}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    "Scrum and Kanban solve different problems. Scrum structures collaborative delivery; Kanban manages continuous flow. Know which problem you have first.",
    "The biggest Kanban mistake is implementing the board without enforcing WIP limits. A board without limits is just a visual to-do list.",
    "The biggest Scrum mistake is treating sprint planning as the backlog refinement session. These are separate, and conflating them causes planning dysfunction.",
    "Scrumban (Scrum structure + Kanban WIP limits) is increasingly common and often the right answer for teams doing mixed delivery and support work.",
    "In SAFe, teams choose Scrum or Kanban based on work type — both are supported. What matters is that the team is consistently delivering to ART commitments.",
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

export default function KanbanVsScrumPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Kanban vs Scrum: Which Framework Fits Your Team?
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Kanban vs Scrum</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practices</span>
          <span className="text-sm text-[#718aa5]">Comparison · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Kanban vs Scrum: Which Framework Fits Your Team?
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Kanban vs. Scrum question comes up constantly in agile training — and it's usually the wrong question to start with. Scrum and Kanban aren't directly competing. They solve different problems, optimize for different things, and are better suited to different types of work. Understanding the distinction is a core skill for{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Scrum Masters</Link>{" "}
            and Agile Coaches who advise teams on the right approach.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Scrum Is — and What It Isn&apos;t</h2>
          <p className="text-lg text-gray-700 mb-4">
            Scrum is an empirical framework for managing complex, creative work. It structures delivery into fixed-length iterations (sprints), with defined roles (Scrum Master, Product Owner, Development Team), prescribed events (planning, standup, review, retrospective), and core artifacts (product backlog, sprint backlog, increment).
          </p>
          <p className="text-lg text-gray-700 mb-4">
            What makes Scrum effective for software delivery is its <em>inspect and adapt</em> loop. Every sprint ends with a review and retrospective that create learning opportunities. The fixed cadence creates predictability — stakeholders know when to expect new functionality, and teams know when to expect new commitments.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            What Scrum isn't: it's not a project management methodology, it's not a task tracker, and it's not a natural fit for work that doesn't batch well into fixed iterations (like support or operations).
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Kanban Is — and When It Works Better</h2>
          <p className="text-lg text-gray-700 mb-4">
            Kanban is a flow-based system for managing work in progress. It doesn't prescribe cadences, roles, or ceremonies. The three core Kanban practices are: visualize the workflow, limit work in progress (WIP), and manage flow. The goal is to minimize the time it takes for an item to move from "started" to "done."
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Kanban is particularly well-suited to operations, support, IT service management, and maintenance work — contexts where work items arrive continuously and unpredictably, and where batch planning doesn't make sense because the next item might be urgent.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The WIP limit is Kanban's most powerful and most underused tool. Teams that implement Kanban boards without enforcing WIP limits are just doing visual task management — they're missing the constraint system that actually improves flow.
          </p>

          <ComparisonGrid />

          <PullQuote attribution="Agile Coach, enterprise technology program">
            I&apos;ve never met a team that needed to choose between Scrum and Kanban as if they were mutually exclusive religions. I&apos;ve met hundreds of teams that needed to understand which practices from each solved the problem they actually had.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Scrumban: When You Need Both</h2>
          <p className="text-lg text-gray-700 mb-4">
            Many real-world teams work on a mix of planned feature development and continuous support and maintenance. For these teams, a Scrumban approach — using Scrum's sprint cadence and ceremonies while adding Kanban's WIP limits and flow visualization — is often the most practical solution.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Common Scrumban patterns: teams use Scrum for their planned work lanes and a separate Kanban lane for incoming support tickets. WIP limits cap how much support work can be in progress at any time, preserving capacity for sprint commitments.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In SAFe, both Scrum and Kanban are recognized team-level frameworks. The{" "}
            <Link href="/courses/safe-for-teams" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe for Teams course</Link>{" "}
            covers both options and how they fit within an Agile Release Train.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Choose</h2>
          <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-5">
            <div>
              <strong className="block text-[#01203d] mb-1">Choose Scrum if:</strong>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>Your work can be reasonably batched into 2–4 week increments</li>
                <li>Stakeholders benefit from regular demos and feedback loops</li>
                <li>You need team ceremonies to improve collaboration and communication</li>
                <li>Your organization uses SAFe and you're on an Agile Release Train</li>
              </ul>
            </div>
            <div>
              <strong className="block text-[#01203d] mb-1">Choose Kanban if:</strong>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>Work arrives continuously and unpredictably (support, operations)</li>
                <li>Items vary widely in size and urgency</li>
                <li>Teams need to respond immediately to incoming requests</li>
                <li>Sprint ceremonies create overhead that doesn't add value</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is one framework better than the other?</p>
              <p className="text-lg text-gray-700">Neither is universally better. They're designed for different work contexts. The better question is: what type of work does our team do, and which practices address our actual bottlenecks?</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can a team switch from Scrum to Kanban?</p>
              <p className="text-lg text-gray-700">Yes. The transition requires the team to identify their workflow stages, set WIP limits, and agree on what "done" means for each stage. Most teams find the hardest part is enforcing WIP limits consistently — not the visual design of the board.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do Kanban teams need a Scrum Master?</p>
              <p className="text-lg text-gray-700">Kanban prescribes no roles. Some Kanban teams have a "flow manager" or "service delivery manager" — someone focused on improving flow and removing blockers. In practice, this role often resembles a Scrum Master even without the title.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's a WIP limit and why does it matter?</p>
              <p className="text-lg text-gray-700">A WIP (work in progress) limit caps how many items can be in a given workflow stage simultaneously. When a stage hits its limit, new work can't enter until something moves forward. This forces attention to finishing work rather than starting new work — which is where most teams lose flow efficiency.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does SAFe support Kanban?</p>
              <p className="text-lg text-gray-700">Yes. SAFe recognizes both Scrum and Kanban as valid team-level frameworks within an Agile Release Train. Teams select the method that fits their work type. Operations or infrastructure teams on an ART often use Kanban while software delivery teams use Scrum.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn SAFe Team Practices</p>
            <p className="mb-5">Scrum, Kanban, and team agility in a SAFe context — covered in our SSM and SAFe for Teams courses.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Scrum Master course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/sprint-planning-best-practices" className="text-[#01203d] underline hover:no-underline">Sprint planning best practices</Link>
            {" · "}
            <Link href="/blog/agile-metrics-guide" className="text-[#01203d] underline hover:no-underline">Agile metrics guide</Link>
            {" · "}
            <Link href="/courses/safe-for-teams" className="text-[#01203d] underline hover:no-underline">SAFe for Teams course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
