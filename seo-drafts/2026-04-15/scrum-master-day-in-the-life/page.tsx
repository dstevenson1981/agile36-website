import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Day in the Life: What SMs Actually Do All Day | Agile36",
  description:
    "A realistic look at the Scrum Master day in the life — what an experienced SM does across a typical sprint, what changes at different experience levels, and what the role looks like in SAFe environments.",
  keywords: ["Scrum Master day in the life", "what does a Scrum Master do all day", "Scrum Master daily activities", "SM typical day", "Scrum Master responsibilities daily", "what does Scrum Master do"],
  openGraph: {
    title: "Scrum Master Day in the Life: What SMs Actually Do All Day",
    description: "A realistic view of what Scrum Masters do — across a sprint, on standup days, in planning weeks, and in SAFe environments.",
    url: "https://www.agile36.com/blog/scrum-master-day-in-the-life",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-day-in-the-life" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>A Scrum Master&apos;s day is shaped by <strong>where in the sprint</strong> they are. Planning days are ceremony-heavy. Mid-sprint days are mostly coaching, impediment removal, and preparation. Sprint-end days include review and retrospective facilitation.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Effective SMs spend less time <strong>running meetings</strong> and more time in <strong>1:1s and organizational work</strong> as they become more experienced. The most impactful SM work often happens in conversations outside ceremonies — with team members, with managers, with stakeholders.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>In SAFe environments, the SM&apos;s week expands to include <strong>ART ceremonies</strong>: PO Sync, ART Sync, and cross-team dependency tracking. PI Planning weeks are the most ceremony-intensive period in any SAFe SM&apos;s calendar.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The SM role is <strong>not a project manager role</strong>. SMs don&apos;t own the timeline, assign tasks, or track hours. Their job is to create the conditions for the team to self-organize effectively — which looks different from task management but requires equally consistent engagement.</span></li>
      </ul>
    </section>
  );
}

function DayBreakdown() {
  const days = [
    { day: "Sprint Day 1 (Planning)", activities: ["Sprint Planning facilitation (2-4 hrs)", "Backlog readiness check with PO", "Capacity review and velocity reference", "Sprint goal alignment with team"] },
    { day: "Mid-Sprint Day", activities: ["Daily standup facilitation (15 min)", "Impediment follow-up with stakeholders", "1:1 coaching with team members", "Retro format preparation", "Refinement attendance/support"] },
    { day: "Sprint Day Last (Review + Retro)", activities: ["Sprint Review facilitation with stakeholders", "Retrospective facilitation (60-90 min)", "Retro action item logging", "Next sprint preparation"] },
    { day: "SAFe PI Planning Week", activities: ["Pre-PI preparation with RTE", "PI Planning 2-day facilitation support", "Team breakout facilitation", "Draft plan reviews and risk identification", "PI Objective finalization"] },
  ];
  return (
    <section aria-label="SM day breakdown" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">The SM&apos;s Calendar: Key Day Types</h3>
      <div className="space-y-4">
        {days.map((d) => (
          <div key={d.day} className="bg-gray-50 rounded-xl p-5">
            <p className="font-bold text-[#01203d] mb-3">{d.day}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {d.activities.map((a) => (
                <div key={a} className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{a}</span>
                </div>
              ))}
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
  return (
    <section aria-label="Key takeaways" className="bg-[#01203d] text-white rounded-xl p-8 md:p-10 my-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 font-bold mb-6">Key takeaways</p>
      <ol className="space-y-5">
        {[
          "New SMs tend to over-facilitate. They run more meetings, track more metrics, and intervene more often than experienced SMs. Paradoxically, the most mature SM behavior is often the least visible — creating conditions for team self-organization rather than doing the organizing yourself.",
          "The daily standup is the SM's most regular ceremony but rarely their most important work. The real SM impact happens in removing impediments that come out of standup — the conversations with managers, stakeholders, and other teams that create the conditions for the team to move forward.",
          "1:1 conversations with team members are where most SM coaching actually happens. Understanding what's blocking individual team members, what's affecting team dynamics, and what organizational conditions need to change requires direct, private conversation — not just ceremony observation.",
          "In SAFe environments, the SM's week is shaped by two calendars: the sprint calendar and the PI calendar. The ART ceremonies (PO Sync, ART Sync) are additional coordination responsibilities on top of the team ceremonies. Managing this coordination load well is a key SAFe SM skill.",
          "The hardest part of the SM day isn't the ceremonies — it's the sustained attention to team health between ceremonies. Noticing when team energy is declining, when conflict is building, or when delivery confidence is eroding requires the kind of ongoing awareness that can't be scheduled on a calendar.",
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

export default function ScrumMasterDayInTheLifePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Day in the Life: What SMs Actually Do All Day
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Day in the Life</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Scrum Practice</span>
          <span className="text-sm text-[#718aa5]">Career Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Day in the Life: What SMs Actually Do All Day
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Scrum Master role confuses people who haven&apos;t done it. From the outside, it looks like running a 15-minute standup and attending a few meetings. From the inside, it&apos;s a continuous cycle of observing team dynamics, removing organizational friction, coaching individuals, facilitating complex group decisions, and working across organizational boundaries to create the conditions for a team to actually deliver. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification course</Link>{" "}
            gives practitioners the framework and coaching skills that turn ceremony facilitation into genuine team improvement.
          </p>

          <ExecutiveSummary />

          <DayBreakdown />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Changes Between Junior and Senior SMs</h2>
          <p className="text-lg text-gray-700 mb-4">
            Junior SMs spend most of their time on ceremonies — preparing, facilitating, and following up. Senior SMs spend most of their time on organizational work — removing systemic impediments, coaching leadership behaviors, and building the conditions that make ceremonies valuable. The ceremonies become faster and more effective as the team matures; the hard work moves upstream.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Senior SMs also spend significant time on self-improvement and community: reading agile literature, attending Communities of Practice, mentoring junior SMs, and staying current with new coaching techniques. The role rewards continuous learning in a way that procedural roles don&apos;t.
          </p>

          <PullQuote attribution="Senior Scrum Master, enterprise logistics">
            My first year as an SM, I thought I was good at my job because I ran tight standups and well-organized retrospectives. My third year, I realized the standups and retros had become mostly self-running — the team didn&apos;t need me to facilitate anymore. That&apos;s when I understood: the goal of the SM is to make themselves unnecessary for the ceremonies, so they can focus on the organizational work the team can&apos;t do for themselves.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How many teams can one Scrum Master serve?</p>
              <p className="text-lg text-gray-700">The Scrum Guide recommends one SM per team. In practice, experienced SMs often serve 2-3 teams — but only effectively if those teams are mature and largely self-running. New Scrum Masters or teams in the early stages of adoption typically need full dedicated SM support. Splitting SM attention across too many teams is one of the most common impediments to team improvement.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does the SM attend every team meeting?</p>
              <p className="text-lg text-gray-700">SMs facilitate core Scrum ceremonies (standup, planning, review, retro). They may or may not attend other team working sessions — the choice should be based on whether SM presence adds value. Experienced SMs avoid attending meetings just to be visible; they attend to facilitate, coach, or observe dynamics that inform their coaching work.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What does an SM do when everything is going well?</p>
              <p className="text-lg text-gray-700">When a team is performing well, the SM shifts from facilitation and impediment removal toward deeper coaching: developing team members&apos; agile skills, preparing them for greater autonomy, working on organizational improvements beyond the team, and developing their own skills. A quiet sprint is an opportunity for the SM to work on higher-leverage coaching activities.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How much time do SMs spend in meetings?</p>
              <p className="text-lg text-gray-700">For a typical 2-week sprint with one team, core ceremony time is roughly 6-10 hours (1-2 hr standup per week, 2-4 hr planning, 1 hr review, 1.5 hr retro). Add refinement attendance, 1:1s, and organizational work, and most SMs spend 20-30% of their time in formal meetings. The rest is preparation, follow-up, organizational navigation, and coaching conversations.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the Scrum Master role a stepping stone to something else?</p>
              <p className="text-lg text-gray-700">Many SMs use the role as a pathway to Agile Coach, RTE, or Product Owner roles. Others build a career in the SM role at increasing seniority levels. The role isn&apos;t inherently a stepping stone — senior SMs at large organizations earn $120k+ and have significant organizational influence. Whether it&apos;s a launching pad or a destination depends on the individual&apos;s goals.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Become a More Effective Scrum Master</p>
            <p className="mb-5">SSM certification develops the coaching skills, SAFe context, and facilitation techniques that distinguish good SMs from great ones.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-skills" className="text-[#01203d] underline hover:no-underline">Scrum Master skills</Link>
            {" · "}
            <Link href="/blog/scrum-master-anti-patterns" className="text-[#01203d] underline hover:no-underline">Scrum Master anti-patterns</Link>
            {" · "}
            <Link href="/blog/agile-coaching-techniques" className="text-[#01203d] underline hover:no-underline">Agile coaching techniques</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
