import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Standup Best Practices: How to Run a Daily Scrum That Actually Works | Agile36",
  description:
    "Daily standup best practices for agile teams: the 3-question format, common anti-patterns, how to fix a broken standup, and SAFe team standup guidance.",
  keywords: ["daily standup best practices", "how to run daily standup", "daily scrum best practices", "standup meeting tips", "agile standup format", "improve daily standup"],
  openGraph: {
    title: "Daily Standup Best Practices: How to Run a Daily Scrum That Actually Works",
    description: "What makes daily standups effective and how to fix the ones that aren't.",
    url: "https://www.agile36.com/blog/daily-standup-best-practices",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/daily-standup-best-practices" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The daily standup is a <strong>15-minute team synchronization</strong> — not a status report to the Scrum Master or manager. The team syncs with each other, identifies blockers, and inspects progress toward the sprint goal.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The three classic questions (<em>what did I do, what will I do, what&apos;s in my way</em>) are the most common format, but teams increasingly use <strong>sprint goal-oriented formats</strong> that focus on whether the sprint goal is at risk.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The most common standup anti-pattern is <strong>reporting to the Scrum Master</strong> instead of talking to the team. If everyone looks at the SM when they speak, the standup has become a status meeting.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Standups that run longer than 15 minutes usually have one of three problems: too many people, discussion that belongs in a separate meeting, or a team that doesn&apos;t know each other well enough to communicate concisely.</span></li>
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
          "A good standup ends with the team having a shared view of whether the sprint goal is on track. If people leave and don't know that, the standup failed.",
          "The SM facilitates but doesn't run the standup. Mature teams run their own standups with the SM as an observer who removes impediments that surface.",
          "Blockers raised at standup should be addressed after the standup, not during it. A 'parking lot' for post-standup discussions keeps the 15-minute boundary.",
          "Remote standups require extra discipline. Video on, camera on, asynchronous updates for teams spanning too many time zones, and a single source of truth for impediments.",
          "If your standup is a daily status meeting to managers, it's not a Scrum event. A manager attending and asking detailed questions transforms a team synchronization into a reporting ceremony — and teams behave accordingly.",
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

export default function DailyStandupBestPracticesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Daily Standup Best Practices: How to Run a Daily Scrum That Actually Works
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Daily Standup Best Practices</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Daily Standup Best Practices: How to Run a Daily Scrum That Actually Works
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The daily standup is simultaneously the most frequent and the most misused agile ceremony. Teams that run it well finish in 10 minutes and leave with shared clarity on whether they&apos;ll hit the sprint goal. Teams that run it poorly sit through 30-minute status meetings that drain energy and produce nothing. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master course</Link>{" "}
            covers standup facilitation as a core competency — here&apos;s what experienced SM practitioners do differently.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What the Standup Is For</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Scrum Guide defines the Daily Scrum as a 15-minute event for the Developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary. It&apos;s a team synchronization event — not a status report to the SM, not a management update, and not a problem-solving session.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The standup exists because complex work creates unpredictable interdependencies. When Alice is blocked waiting for Bob&apos;s module, a 24-hour lag in that information costs the team a full day. The standup surfaces those dependencies in real time so the team can self-organize around them.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Two Standup Formats That Work</h2>
          <p className="text-lg text-gray-700 mb-4">
            The classic three-question format (yesterday, today, blockers) works for teams that are comfortable with it. The sprint goal format is increasingly preferred by mature teams because it keeps attention on outcomes, not activities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-[#01203d] mb-3">Classic 3-Question Format</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-2"><span className="font-bold text-yellow-600 flex-shrink-0">Q1</span><span>What did I complete since yesterday?</span></div>
                <div className="flex gap-2"><span className="font-bold text-yellow-600 flex-shrink-0">Q2</span><span>What do I plan to complete today?</span></div>
                <div className="flex gap-2"><span className="font-bold text-yellow-600 flex-shrink-0">Q3</span><span>Is anything blocking my progress?</span></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Best for: newer teams building standup habits</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-[#01203d] mb-3">Sprint Goal Format</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-2"><span className="font-bold text-yellow-600 flex-shrink-0">Q1</span><span>Is our sprint goal still achievable?</span></div>
                <div className="flex gap-2"><span className="font-bold text-yellow-600 flex-shrink-0">Q2</span><span>What do we need to do today to achieve it?</span></div>
                <div className="flex gap-2"><span className="font-bold text-yellow-600 flex-shrink-0">Q3</span><span>What could prevent us from achieving it?</span></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Best for: experienced teams who know the work and each other</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Anti-Patterns and Fixes</h2>
          <div className="space-y-4 my-6">
            {[
              { problem: "Team reports to the SM, not each other", fix: "SM stands at the back or to the side. Announce explicitly: 'This is for the team, not a status update to me.' Ask team members to face each other." },
              { problem: "Standup runs 30+ minutes", fix: "Implement a parking lot for discussions. Use a physical or virtual timer. After 15 minutes, park any remaining items and schedule a focused meeting." },
              { problem: "One person dominates", fix: "Walk the board instead of having individuals report. Each story card gets a 30-second update — not each person getting unlimited time." },
              { problem: "Absent team members kill continuity", fix: "Walk the board, not the individuals. The conversation is about work, not about who is or isn't present. Remote team members update asynchronously on blocked items." },
              { problem: "Managers attend and interrogate", fix: "Scrum Masters educate sponsors on why management questions in standups transform them into status meetings. Offer a separate stakeholder update channel." },
            ].map((item) => (
              <div key={item.problem} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-red-50 p-4 border-b border-gray-200">
                  <p className="text-sm font-bold text-red-800">Anti-pattern: {item.problem}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700"><strong className="text-green-800">Fix: </strong>{item.fix}</p>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, retail technology">
            I fixed a broken standup in one week by changing one thing: I asked team members to update the sprint board before standup, then we walked the board instead of listening to individual reports. People stopped repeating what the board already showed and started talking about what was at risk.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should the Scrum Master speak at the standup?</p>
              <p className="text-lg text-gray-700">Minimally. The SM observes, captures impediments, and facilitates when the team gets stuck. The SM shouldn&apos;t report what they&apos;re working on in the same format as developers — their work (coaching, impediment removal) is visible through outcomes, not daily updates. If the SM is doing development work, they participate like any developer.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What if team members are in different time zones?</p>
              <p className="text-lg text-gray-700">For time zones within 3–4 hours of each other, rotating the standup time or using the overlap window works. For teams spanning 8+ hours, async standups (written or short async video updates) are more respectful of team members than requiring someone to join at midnight. The goal is synchronization — the format is flexible.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can the standup be done sitting down?</p>
              <p className="text-lg text-gray-700">Yes — "standup" is a metaphor for brevity, not a physical requirement. Teams with accessibility needs, remote teams on video, and teams in countries where standing meetings aren&apos;t cultural can sit. The 15-minute time box is the constraint, not the standing.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Learn Expert SM Facilitation</p>
            <p className="mb-5">SAFe SSM training covers team event facilitation, standup improvement, and the full Scrum Master toolkit for enterprise teams.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/sprint-planning-best-practices" className="text-[#01203d] underline hover:no-underline">Sprint planning best practices</Link>
            {" · "}
            <Link href="/blog/sprint-retrospective-guide" className="text-[#01203d] underline hover:no-underline">Sprint retrospective guide</Link>
            {" · "}
            <Link href="/blog/definition-of-done-examples" className="text-[#01203d] underline hover:no-underline">Definition of Done examples</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
