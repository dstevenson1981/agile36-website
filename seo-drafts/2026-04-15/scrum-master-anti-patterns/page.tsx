import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Anti-Patterns: 10 Habits That Undermine Teams | Agile36",
  description:
    "The most damaging Scrum Master anti-patterns — from conflict avoidance to micromanagement disguised as facilitation. Recognize and correct behaviors that undermine team growth.",
  keywords: ["scrum master anti-patterns", "bad scrum master behaviors", "scrum master mistakes", "scrum master red flags", "signs of a bad scrum master", "scrum master failure modes"],
  openGraph: {
    title: "Scrum Master Anti-Patterns: 10 Habits That Undermine Teams",
    description: "The most common Scrum Master anti-patterns and how to correct them.",
    url: "https://www.agile36.com/blog/scrum-master-anti-patterns",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-anti-patterns" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The most common Scrum Master failure mode isn&apos;t being too directive — it&apos;s being <strong>too conflict-avoidant</strong>. Scrum Masters who never challenge unproductive team behaviors are optimizing for comfort, not growth.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Anti-patterns often look like virtues. A SM who <strong>absorbs all impediments personally</strong> appears helpful — but creates dependency and deprives the team of the capability to resolve their own blockers.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Meeting facilitation is the most visible SM responsibility — and a frequent source of anti-patterns. SMs who <strong>dominate discussions</strong> or allow the same voices to control every ceremony are not facilitating — they&apos;re presiding.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The test of a healthy SM-team relationship: does the team <strong>get better at self-organizing</strong> over time? If the SM is still answering the same questions and resolving the same conflicts after six months, something isn&apos;t working.</span></li>
      </ul>
    </section>
  );
}

const ANTI_PATTERNS = [
  { num: "01", title: "The Secretary SM", body: "Updates Jira, schedules meetings, takes notes, manages logistics. Never coaches. Never challenges. Provides value as an administrator but zero value as a servant leader. Teams with Secretary SMs plateau — ceremonies happen but no improvement does." },
  { num: "02", title: "The Conflict Avoider", body: "Allows chronic dysfunctions — the developer who dominates standups, the sprint goals nobody believes in, the PO who constantly changes priorities mid-sprint — to persist because naming them feels uncomfortable. Avoidance is not neutrality; it's implicit endorsement of the dysfunction." },
  { num: "03", title: "The Impediment Absorber", body: "Resolves every impediment themselves rather than coaching the team to resolve them. Creates dependency. The team learns that blockers go to the SM, not that teams surface and resolve their own impediments. When the SM leaves, the team is helpless." },
  { num: "04", title: "The Report Writer", body: "Produces velocity dashboards, burndown reports, and capacity summaries for management — but never uses those metrics to facilitate the team's own improvement. Data is collected for management visibility, not team learning." },
  { num: "05", title: "The Meeting Timer", body: "Opens every ceremony on time and closes it on time but treats the timebox as the goal rather than the team outcome. Cuts off productive discussions to stay on schedule. A standup that ends in 10 minutes but leaves unresolved blockers isn't efficient — it's performative." },
  { num: "06", title: "The Proxy PO", body: "Makes product decisions because the PO is unavailable. Fills the role gap rather than escalating that the PO isn't fulfilling their responsibility. This is not servant leadership — it&apos;s enabling dysfunction at the expense of the PO's accountability." },
  { num: "07", title: "The Process Enforcer", body: "Enforces Scrum rules rigidly without understanding context. Insists on 15-minute standups for a co-located team of 4 that would communicate better in a quick huddle. Treats Scrum as law rather than a framework to serve the team." },
  { num: "08", title: "The Hero SM", body: "Works nights and weekends to make up for team gaps. Saves every sprint. Never helps the team build the capability to avoid the same gaps next sprint. Teams with Hero SMs deliver but never improve. The hero creates the dependency they appear to solve." },
  { num: "09", title: "The Cheerleader", body: "Celebrates everything, challenges nothing. Retrospectives produce feel-good observations rather than honest assessments. Teams feel supported but never grow. Psychological safety requires the ability to name hard truths — cheerleading suppresses it." },
  { num: "10", title: "The Tool Administrator", body: "Deep expertise in Jira, Confluence, or whatever tool the organization uses — but the team's behaviors don't improve because tool optimization is not the same as team improvement. No amount of board configuration substitutes for good Scrum practice." },
];

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
          "Anti-patterns persist because they feel productive. Writing a Jira ticket feels like work. Scheduling a meeting feels like coordination. The question isn't whether the activity looks like work — it's whether it's building team capability.",
          "The most important anti-pattern to self-identify is the one you're most comfortable in. SMs who are natural administrators often don't recognize when their administrative competence is crowding out their coaching responsibility.",
          "A retrospective that never produces uncomfortable insights is a retrospective theater performance. The SM's job is to create safety for honesty, not to produce a comfortable 45 minutes.",
          "When a Scrum Master leaves a team and the team regresses, the SM wasn't building capability — they were performing it. Good SMs make themselves progressively less needed in their current team, freeing them to develop new teams.",
          "Self-assessment is difficult. The most reliable signal that you have an anti-pattern is external: the team has the same problems after 6 sprints that it had after sprint 1.",
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

export default function ScrumMasterAntiPatternsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Anti-Patterns: 10 Habits That Undermine Teams
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Anti-Patterns</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Scrum Practice</span>
          <span className="text-sm text-[#718aa5]">Practitioner Guide · 10 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Anti-Patterns: 10 Habits That Undermine Teams
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Most anti-patterns in Scrum Masters develop not from malice or laziness but from misunderstanding what the role is for. When practitioners focus on process compliance, administrative tasks, or keeping the team comfortable, they miss the actual job: building a team&apos;s capacity to self-organize, improve, and deliver. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>{" "}
            addresses servant leadership as a core competency — but certification doesn&apos;t automatically produce the self-awareness to recognize your own anti-patterns.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">10 Scrum Master Anti-Patterns</h2>
          <div className="space-y-5">
            {ANTI_PATTERNS.map((ap) => (
              <div key={ap.num} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 flex gap-4 items-start border-b border-gray-200">
                  <span className="text-yellow-500 font-bold text-xl">{ap.num}</span>
                  <p className="font-bold text-lg text-[#01203d]">{ap.title}</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 text-[16px] leading-relaxed">{ap.body}</p>
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, enterprise software">
            I&apos;ve coached dozens of Scrum Masters and the hardest anti-pattern to break is the Hero SM. They genuinely love their team and want it to succeed. But every time they swoop in and save the sprint, they teach the team that emergencies are the SM&apos;s problem to solve. The kindest thing you can do for a team is let them feel the consequences of their own commitments — and support them in building the practices that prevent those consequences.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do I know if I have an anti-pattern?</p>
              <p className="text-lg text-gray-700">The clearest signal: does your team improve over time, or do the same problems recur? If you remove yourself from a sprint mentally — would the team be able to run their ceremonies and resolve their own impediments? If not, examine what you&apos;re doing that the team should be doing for themselves.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is it possible to be too hands-off as a Scrum Master?</p>
              <p className="text-lg text-gray-700">Yes. Pure non-intervention is also an anti-pattern — the Invisible SM. Teams need active coaching, especially in the early stages of forming. The goal is progressive autonomy: high involvement early, progressively less as the team develops capability, always available when genuinely needed.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What should a Scrum Master spend most of their time on?</p>
              <p className="text-lg text-gray-700">Roughly: 40% coaching individuals and the team on agile practices and mindset, 30% facilitating ceremonies and team conversations, 20% working impediments (not personally resolving them all, but managing the resolution process), and 10% contributing to organizational improvement through Community of Practice and broader agile coaching.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can a Scrum Master have too many teams?</p>
              <p className="text-lg text-gray-700">In SAFe, SMs typically serve 1-2 Scrum teams as a primary responsibility. More than 2 teams and the SM usually drifts into administrative mode — there isn&apos;t enough capacity for genuine coaching. Organizations that assign 4-5 teams to a single SM typically get a Secretary SM, not a coaching SM.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Are these anti-patterns covered on the SSM exam?</p>
              <p className="text-lg text-gray-700">The SSM exam doesn&apos;t name these specific anti-patterns, but scenario questions frequently test whether you understand the SM&apos;s coaching responsibility vs. directive role. When an exam question describes an SM taking action, the correct answer is almost always the one that builds team capability rather than the SM solving the problem directly.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Build Genuine Scrum Master Capability</p>
            <p className="mb-5">SSM and SASM training develop coaching skills and servant leadership practice — not just ceremony facilitation.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                SSM training
              </Link>
              <Link href="/courses/advanced-scrum-master" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                Advanced SM training
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/servant-leadership-in-agile" className="text-[#01203d] underline hover:no-underline">Servant leadership in agile</Link>
            {" · "}
            <Link href="/blog/sprint-retrospective-guide" className="text-[#01203d] underline hover:no-underline">Sprint retrospective guide</Link>
            {" · "}
            <Link href="/blog/psychological-safety-agile-teams" className="text-[#01203d] underline hover:no-underline">Psychological safety in agile teams</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
