import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Psychological Safety in Agile Teams: Why It Matters and How to Build It | Agile36",
  description:
    "Psychological safety in agile teams explained: what it is, why it drives team performance, how Scrum Masters create it, and what destroys it. Based on Google's Project Aristotle findings.",
  keywords: ["psychological safety agile teams", "psychological safety scrum", "team psychological safety", "build psychological safety agile", "psychological safety scrum master", "agile team trust"],
  openGraph: {
    title: "Psychological Safety in Agile Teams: Why It Matters and How to Build It",
    description: "What psychological safety is, why it predicts agile team performance, and how Scrum Masters build it.",
    url: "https://www.agile36.com/blog/psychological-safety-agile-teams",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/psychological-safety-agile-teams" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Google&apos;s Project Aristotle found that <strong>psychological safety was the #1 predictor</strong> of team effectiveness — more important than individual talent, team composition, or experience level. Agile&apos;s inspect-and-adapt model depends on it.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Psychological safety is <strong>not the same as comfort or harmony</strong>. Safe teams disagree, challenge each other, and surface failures. Comfortable teams avoid these conversations. Safety enables honest engagement; comfort avoids it.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Retrospectives are the primary vehicle for building and testing psychological safety. If retros produce only safe, surface-level observations, the team doesn&apos;t have psychological safety — it has <strong>retrospective theater</strong>.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The Scrum Master&apos;s role in psychological safety is <strong>modeling the behavior first</strong>: being the first to name a difficult truth, inviting dissent, explicitly welcoming failure as information rather than evidence of incompetence.</span></li>
      </ul>
    </section>
  );
}

function SafetyLevels() {
  const levels = [
    { level: "Level 1", name: "Inclusion Safety", desc: "Team members feel safe being themselves — including all backgrounds, communication styles, and skill levels", pct: 100 },
    { level: "Level 2", name: "Learner Safety", desc: "Team members feel safe asking questions, making mistakes, and experimenting without fear of ridicule", pct: 75 },
    { level: "Level 3", name: "Contributor Safety", desc: "Team members feel safe contributing ideas and participating fully in team decisions", pct: 50 },
    { level: "Level 4", name: "Challenger Safety", desc: "Team members feel safe challenging the status quo, disagreeing with leadership, and naming problems", pct: 25 },
  ];
  return (
    <section aria-label="Four stages of psychological safety" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-2">Timothy Clark&apos;s 4 Stages of Psychological Safety</h3>
      <p className="text-sm text-gray-500 mb-5">Teams must build each stage before the next. Most agile teams have Stage 1–2; fewer have Stage 3–4.</p>
      <div className="space-y-3">
        {levels.map((l) => (
          <div key={l.level} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-[#01203d] bg-yellow-100 px-2 py-1 rounded">{l.level}</span>
              <span className="font-bold text-gray-900">{l.name}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{l.desc}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#01203d] h-2 rounded-full" style={{ width: `${l.pct}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{l.pct}% of teams reach this level or above (illustrative)</p>
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
          "Psychological safety is built sprint by sprint through consistent SM behavior — and destroyed in a single moment. A leader who punishes someone publicly for an honest retrospective observation can set a team back months.",
          "The retrospective is the most important diagnostic tool for psychological safety. Count how many distinct voices contribute observations. If two people dominate every retro, that's a facilitation problem and a safety problem.",
          "Agile's inspect-and-adapt cycle only works with honest data. Teams that can't name what isn't working can't improve what isn't working. The quality of your retrospectives is a proxy for your team's psychological safety.",
          "Safety is not about eliminating accountability — it's about making accountability about outcomes and systems, not personal blame. Teams with high safety hold each other accountable harder, not less, because they can name problems without fear.",
          "In SAFe Inspect & Adapt workshops, the RTE's most important role is creating a container for honest reflection across the ART. Without psychological safety at program scale, I&A produces polished presentations instead of real improvement.",
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

export default function PsychologicalSafetyAgilePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Psychological Safety in Agile Teams: Why It Matters and How to Build It
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Psychological Safety in Agile Teams</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Leadership</span>
          <span className="text-sm text-[#718aa5]">Leadership Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Psychological Safety in Agile Teams: Why It Matters and How to Build It
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Agile&apos;s inspect-and-adapt model is premised on teams being able to honestly assess what isn&apos;t working. That requires psychological safety — the belief that you can speak up about problems, failures, and disagreements without being penalized. This is why psychological safety isn&apos;t a soft skill for agile teams; it&apos;s infrastructure. Practitioners in the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>{" "}
            study servant leadership and team dynamics because building safety is a core SM competency.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Psychological Safety Is — and Isn&apos;t</h2>
          <p className="text-lg text-gray-700 mb-4">
            Amy Edmondson, who coined the term, defines psychological safety as a shared belief that the team is safe for interpersonal risk-taking. This means team members believe they can raise concerns, admit mistakes, and challenge assumptions without fear of humiliation, rejection, or retaliation.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This is not the same as feeling comfortable. High-safety teams often have more productive conflict, not less — because members can challenge each other without it becoming personal. Low-safety teams avoid conflict by avoiding honesty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-3">High psychological safety looks like...</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• "I made a mistake in this story&apos;s estimate and here&apos;s what happened"</li>
                <li>• Retrospectives where the real problems get named</li>
                <li>• Junior team members challenging senior decisions</li>
                <li>• Disagreement without lasting interpersonal damage</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="text-red-800 font-bold mb-3">Low psychological safety looks like...</h4>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• Retros that produce the same action items every sprint</li>
                <li>• Nobody questions the sprint commitment in planning</li>
                <li>• Blockers raised late because asking for help feels risky</li>
                <li>• Silent standups where everyone says "no blockers"</li>
              </ul>
            </div>
          </div>

          <SafetyLevels />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How Scrum Masters Build Psychological Safety</h2>
          <div className="space-y-4 my-6">
            {[
              { action: "Model vulnerability first", how: "Be the first to name a mistake, admit uncertainty, or acknowledge a failure. SMs who project only confidence create a standard no team member will risk violating." },
              { action: "Enforce retrospective confidentiality", how: "What&apos;s said in a retro stays in the retro. If leadership hears retro content and acts on it punitively, the retro becomes unsafe permanently." },
              { action: "Respond to bad news with curiosity", how: "When someone surfaces a problem, the SM&apos;s first response should be questions about the system — not assignment of blame. 'What happened?' not 'Who let this happen?'" },
              { action: "Actively invite dissent", how: "In retrospectives and sprint planning, explicitly ask: 'Who disagrees?' or 'What are we missing?' Silence is not agreement — it may be safety absence." },
              { action: "Follow through on raised concerns", how: "The fastest way to destroy safety is to fail to act on concerns that were raised. If team members see that speaking up produces no change, they stop speaking up." },
            ].map((item) => (
              <div key={item.action} className="flex gap-3 bg-gray-50 rounded-xl p-4 items-start">
                <span className="font-bold text-[#01203d] text-sm min-w-[180px] flex-shrink-0">{item.action}</span>
                <p className="text-gray-700 text-sm">{item.how}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Scrum Master, healthcare technology">
            The most important thing I ever did for my team&apos;s safety was admit in a retrospective that I had dropped a ball on an impediment and it had blocked the sprint. The room changed. People started naming real things. Six months of good facilitation hadn&apos;t done what that one honest admission did in five minutes.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do you measure psychological safety on a team?</p>
              <p className="text-lg text-gray-700">Edmondson&apos;s 7-question team psychological safety survey is the most validated instrument — it takes five minutes to complete and provides team-level data. Proxy signals include retro participation rates, how quickly blockers are raised in standups, and whether team members challenge estimates in sprint planning.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can psychological safety be rebuilt after it&apos;s been damaged?</p>
              <p className="text-lg text-gray-700">Yes, but it takes time and consistent behavior. If leadership punished someone for speaking up, that requires a visible, credible change in behavior — not just an apology. Teams watch what leaders do under pressure, not what they say in normal conditions. Safety rebuilds through consistent positive experiences over many sprints.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is psychological safety the same as being nice to each other?</p>
              <p className="text-lg text-gray-700">No. Teams can be consistently pleasant and have very low psychological safety — because pleasantness and safety are orthogonal. The question is whether team members risk being perceived as ignorant, incompetent, intrusive, or negative when they speak up. That risk, not niceness, is what safety addresses.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What role does psychological safety play in PI Planning?</p>
              <p className="text-lg text-gray-700">PI Planning depends on teams being honest about what they can commit to, what risks exist, and where dependencies create problems. Without psychological safety, teams over-commit to avoid appearing weak, hide risks to avoid scrutiny, and fail to surface the cross-team issues that PI Planning is designed to resolve.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is this topic on the SAFe exams?</p>
              <p className="text-lg text-gray-700">Psychological safety isn&apos;t a named concept on most SAFe exams, but the behavioral principles it represents appear throughout scenario questions. The SM behavior that creates safety (inviting input, responding with curiosity, protecting team voices) is the correct answer in most SSM scenarios involving team dynamics.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Develop Agile Team Leadership Skills</p>
            <p className="mb-5">SSM and Leading SAFe training build the coaching, facilitation, and leadership skills that create high-performing, psychologically safe teams.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/servant-leadership-in-agile" className="text-[#01203d] underline hover:no-underline">Servant leadership in agile</Link>
            {" · "}
            <Link href="/blog/sprint-retrospective-guide" className="text-[#01203d] underline hover:no-underline">Sprint retrospective guide</Link>
            {" · "}
            <Link href="/blog/scrum-master-anti-patterns" className="text-[#01203d] underline hover:no-underline">Scrum Master anti-patterns</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
