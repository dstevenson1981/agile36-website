import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Tools: What Effective SMs Actually Use | Agile36",
  description:
    "Scrum Master tools that effective practitioners use — for retrospectives, backlog management, team health checks, metrics tracking, and remote facilitation. Real tool recommendations, not just a list.",
  keywords: ["Scrum Master tools", "best tools for Scrum Masters", "retrospective tools", "agile facilitation tools", "Scrum tools for Scrum Masters", "SM tools 2026"],
  openGraph: {
    title: "Scrum Master Tools: What Effective SMs Actually Use",
    description: "The tools effective Scrum Masters rely on — for retrospectives, health checks, metrics, and remote facilitation.",
    url: "https://www.agile36.com/blog/scrum-master-tools",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-tools" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The most valuable SM tools aren&apos;t the most expensive ones — they&apos;re the ones that <strong>reduce friction in the ceremonies SMs facilitate most</strong>. Retrospectives, sprint planning, and backlog refinement each benefit from different tooling choices.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>For remote and hybrid teams, <strong>visual facilitation tools</strong> (Miro, Mural, FigJam) are often more valuable than project management tools. The SM&apos;s job is to create engagement and psychological safety — tools that enable visual collaboration support that better than text-based tools.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Team health check tools and <strong>metrics dashboards</strong> are underused by many SMs. Tracking team health indicators over time — psychological safety, clarity of purpose, delivery rhythm — turns gut-feel coaching into evidence-based improvement.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The most effective SMs use <strong>2-4 core tools deeply</strong> rather than a large toolkit superficially. Tool fluency matters — an SM who knows Miro well runs better retros than one who knows five tools poorly.</span></li>
      </ul>
    </section>
  );
}

function ToolCategories() {
  const categories = [
    {
      category: "Retrospective facilitation",
      tools: ["Miro", "EasyRetro", "Parabol", "FunRetro"],
      primary: "Miro",
      why: "Flexible enough for any retro format; visual fidelity keeps remote teams engaged"
    },
    {
      category: "Backlog & sprint management",
      tools: ["Jira", "Linear", "Azure DevOps", "Shortcut"],
      primary: "Jira (enterprise) / Linear (product)",
      why: "The choice is usually made by the organization; SM fluency in the org's chosen tool matters"
    },
    {
      category: "Team health & metrics",
      tools: ["TeamMood", "Officevibe", "SurveyMonkey", "manual Sheets"],
      primary: "TeamMood",
      why: "Simple check-in tool that builds a health trend over time without survey fatigue"
    },
    {
      category: "Remote facilitation",
      tools: ["Miro", "Mural", "FigJam", "Butter"],
      primary: "Butter",
      why: "Purpose-built for facilitated workshops — agenda timer, breakout rooms, energy checks"
    },
    {
      category: "Impediment tracking",
      tools: ["Jira board", "Trello", "Notion", "shared doc"],
      primary: "Whichever is most visible to leadership",
      why: "Impediment tracking only works if leadership sees it — choose the most visible tool"
    },
  ];
  return (
    <section aria-label="SM tool categories" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SM Tools by Category</h3>
      <div className="space-y-4">
        {categories.map((c) => (
          <div key={c.category} className="bg-gray-50 rounded-xl p-5">
            <p className="font-bold text-[#01203d] mb-2">{c.category}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {c.tools.map((t) => (
                <span key={t} className={`text-xs px-2 py-1 rounded-full font-semibold ${t === c.primary.split(" ")[0] ? "bg-[#01203d] text-yellow-400" : "bg-gray-200 text-gray-700"}`}>{t}</span>
              ))}
            </div>
            <p className="text-xs text-gray-500"><span className="font-semibold">Why:</span> {c.why}</p>
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
          "Retro tools are the SM's most differentiating toolset. Teams that run the same retrospective format in the same tool every sprint experience retro fatigue — changing formats is one of the SM's most effective engagement tactics. A library of retro formats (Start/Stop/Continue, 4Ls, Sailboat, Mad/Sad/Glad) matters as much as the tool choice.",
          "Metrics tooling should serve coaching, not reporting. If your velocity chart exists primarily to update management, it's not an SM tool — it's a management reporting artifact. SM metrics are the ones that surface coaching opportunities: deployment frequency trends, retro action item completion, team satisfaction over time.",
          "The best impediment tracker is the one leadership actually reads. Many SMs maintain sophisticated impediment boards in tools that managers never check. The SM's job is to get impediments resolved — which means making them visible to whoever has authority to remove them.",
          "For SAFe environments, PI Planning tooling (AgileCraft/Jira Align, or even a physical program board) is an SM concern. Scrum Masters in SAFe organizations need to understand how their team's tooling connects to the program board and PI Objective tracking at the ART level.",
          "Health check surveys work best when they're short (5-7 questions), regular (every 2-3 sprints), and acted on visibly. If team health data doesn't produce visible action from the SM or leadership, teams stop responding honestly. The tool matters less than the discipline of using it and responding to what it reveals.",
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

export default function ScrumMasterToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Tools: What Effective SMs Actually Use
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Tools</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Scrum Practice</span>
          <span className="text-sm text-[#718aa5]">Practitioner Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Tools: What Effective SMs Actually Use
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Scrum Master tool selection is more consequential than many practitioners realize. The right tools reduce friction in the ceremonies that define an SM&apos;s daily work — retrospectives, planning sessions, health checks, and impediment tracking. The wrong tools, or too many tools used superficially, add overhead that distracts from the coaching work that actually improves team performance. For SMs working in SAFe environments, the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification course</Link>{" "}
            covers how SM practices connect to the ART-level tooling context.
          </p>

          <ExecutiveSummary />

          <ToolCategories />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Physical Tools Effective SMs Still Use</h2>
          <p className="text-lg text-gray-700 mb-4">
            Despite excellent digital tooling, many effective Scrum Masters maintain physical artifacts for in-person teams. A physical sprint board (sticky notes on whiteboard) creates spatial memory and conversation that digital boards don&apos;t replicate. Walking to the board during standup is a fundamentally different interaction than looking at a screen. Timers, physical voting dots, and paper-based retro formats all have their place in the SM&apos;s toolkit.
          </p>

          <PullQuote attribution="Scrum Master, enterprise media company">
            My team was fully remote for three years. When we came back to the office, I expected them to prefer digital tools since that&apos;s what they knew. Instead, the first in-person retro with sticky notes and a whiteboard produced more honest, engaged discussion than any Miro session we&apos;d had. Something about physical, tangible artifacts changes how teams interact. I now use physical tools for every in-person session and reserve Miro for remote work.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the best retrospective tool?</p>
              <p className="text-lg text-gray-700">Miro is the most flexible and widely used. EasyRetro and Parabol provide more structured retro formats out of the box and are better for SMs who want format variety without setup time. FunRetro is simple and effective for teams new to digital retros. The best tool is the one your team engages with — try 2-3 and stick with the one that produces the most participation.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should SMs learn Jira?</p>
              <p className="text-lg text-gray-700">Yes — most enterprise teams use Jira, and SM fluency in Jira (board configuration, sprint reports, velocity charts, backlog management) makes them more effective coaches. SMs don&apos;t need to be Jira admins, but understanding how to read and configure the most common reports and workflows is a practical career skill.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do SMs track team health over time?</p>
              <p className="text-lg text-gray-700">The most effective approach is a lightweight survey every 2-3 sprints with consistent questions (5-7 items covering collaboration quality, clarity of goals, delivery confidence, psychological safety). Track responses over time to identify trends. TeamMood and Officevibe automate this; a simple Google Form with a shared sheet works equally well with less overhead.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What tools help with remote standup facilitation?</p>
              <p className="text-lg text-gray-700">Async standups (Geekbot, Status Hero) work well for distributed teams across time zones. For synchronous remote standups, the video conferencing tool itself is usually sufficient — standup is a team ceremony, not a facilitation challenge. The SM&apos;s job in standup is to protect time, surface impediments, and end on time — not to use a specialized tool.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Are paid SM tools worth the cost?</p>
              <p className="text-lg text-gray-700">Most SM tools have free tiers sufficient for 1-2 teams. The paid tiers typically add multiple team management, organization-level analytics, and integrations. If you manage 3+ teams, paid tools that aggregate health data across teams are worth the cost. For single-team SMs, free tiers are usually sufficient.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Develop Your SM Practice</p>
            <p className="mb-5">SSM certification develops the facilitation skills, coaching techniques, and SAFe context that make Scrum Masters effective in enterprise environments.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/sprint-retrospective-guide" className="text-[#01203d] underline hover:no-underline">Sprint retrospective guide</Link>
            {" · "}
            <Link href="/blog/scrum-master-skills" className="text-[#01203d] underline hover:no-underline">Scrum Master skills</Link>
            {" · "}
            <Link href="/blog/daily-standup-best-practices" className="text-[#01203d] underline hover:no-underline">Daily standup best practices</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
