import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agile Coaching Techniques: Tools Every Scrum Master Needs | Agile36",
  description:
    "Practical agile coaching techniques for Scrum Masters and Agile Coaches — from powerful questions to team assessments to facilitation approaches that build lasting capability.",
  keywords: ["agile coaching techniques", "scrum master coaching skills", "agile coach tools", "coaching questions agile", "team coaching agile", "agile facilitation techniques"],
  openGraph: {
    title: "Agile Coaching Techniques: Tools Every Scrum Master Needs",
    description: "Practical agile coaching techniques that build team capability rather than creating dependency.",
    url: "https://www.agile36.com/blog/agile-coaching-techniques",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/agile-coaching-techniques" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Coaching is distinct from teaching, facilitating, and mentoring. Coaches <strong>ask questions to build insight</strong> rather than providing answers. Scrum Masters need all four stances — and need to know which one the situation calls for.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most powerful coaching tool is a <strong>well-timed, open question</strong>. Questions that start with "what" or "how" generate more reflection than questions that start with "why" (which can feel accusatory) or yes/no questions (which close thinking down).</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Team-level coaching is different from individual coaching. It requires <strong>attention to group dynamics</strong>, dominant voices, silenced voices, and the patterns that produce team behaviors — not just the behaviors themselves.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The Agile Coaching Institute&apos;s <strong>Agile Coaching Competency Framework</strong> identifies 8 distinct competencies. Scrum Masters who develop all 8 move from ceremony facilitators to genuine organizational change agents.</span></li>
      </ul>
    </section>
  );
}

function StancesVisual() {
  const stances = [
    { stance: "Teaching", when: "Team needs new knowledge or skills they don't have", approach: "Share information, explain concepts, demonstrate practices", color: "bg-blue-50 border-blue-200" },
    { stance: "Mentoring", when: "Team needs guidance from experience", approach: "Share your own experience, offer perspective from similar situations", color: "bg-purple-50 border-purple-200" },
    { stance: "Facilitating", when: "Team needs to reach a decision or shared understanding", approach: "Create structure, manage participation, synthesize without directing", color: "bg-yellow-50 border-yellow-200" },
    { stance: "Coaching", when: "Team needs to discover their own insights and solutions", approach: "Ask powerful questions, reflect back, hold space for thinking", color: "bg-green-50 border-green-200" },
  ];
  return (
    <section aria-label="Coaching stances" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">The Four Agile Coaching Stances</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stances.map((s) => (
          <div key={s.stance} className={`rounded-xl border p-5 ${s.color}`}>
            <p className="font-bold text-gray-900 mb-1">{s.stance}</p>
            <p className="text-xs text-gray-500 mb-2"><strong>Use when:</strong> {s.when}</p>
            <p className="text-sm text-gray-700"><strong>Approach:</strong> {s.approach}</p>
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
          "The fastest coaching improvement most SMs can make: replace advice with questions for one sprint. Instead of 'you should try X,' ask 'what options have you considered?' The team builds capacity; you learn what they actually know.",
          "Silence is a coaching tool. After asking a powerful question, resist the urge to fill silence with a follow-up or a hint. The thinking happens in the silence. SMs who can't tolerate silence cut off the most valuable moments of coaching.",
          "Retrospective facilitation is the highest-leverage coaching opportunity in the Scrum cycle. A well-facilitated retro where the team discovers its own improvement generates more sustainable change than an SM-imposed action item.",
          "Team assessments (Agile Team Compass, Team Health Check, Spotify Squad Health Check) create shared language for team dynamics. Using an assessment every quarter gives teams a way to name things that are hard to say in direct conversation.",
          "Coaching at the organizational level — helping managers and executives develop agile behaviors — is what distinguishes Agile Coaches from Scrum Masters. This requires understanding systemic constraints, not just team practices.",
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

export default function AgileCoachingTechniquesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Agile Coaching Techniques: Tools Every Scrum Master Needs
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Agile Coaching Techniques</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practice</span>
          <span className="text-sm text-[#718aa5]">Practitioner Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Agile Coaching Techniques: Tools Every Scrum Master Needs
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Scrum Masters who stay at the ceremony facilitation level plateau — and so do their teams. The move from facilitation to coaching is what separates SMs who build lasting team capability from those who run good meetings. The{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Advanced Scrum Master (SASM) certification</Link>{" "}
            focuses specifically on coaching skills: working with teams, individuals, and organizational systems rather than just Scrum ceremonies.
          </p>

          <ExecutiveSummary />

          <StancesVisual />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Powerful Questions for Agile Coaching</h2>
          <p className="text-lg text-gray-700 mb-4">
            Coaching questions open thinking rather than directing it. The best coaching questions are specific enough to be relevant but open enough that the person being coached has genuine options in how to respond.
          </p>
          <div className="space-y-3 my-6">
            {[
              { situation: "Team stuck on a problem", question: "What have you already tried? What else could you try?" },
              { situation: "Sprint not going well", question: "What&apos;s getting in the way of finishing what you committed to?" },
              { situation: "Retrospective going shallow", question: "What are we not saying that needs to be said?" },
              { situation: "Team avoiding a difficult person", question: "What would happen if you addressed this directly? What&apos;s the cost of not addressing it?" },
              { situation: "Individual growth conversation", question: "Where do you want to be in your Scrum practice six months from now? What would you need to change to get there?" },
              { situation: "Organizational impediment", question: "Who has the authority to change this? What would it take for them to prioritize it?" },
            ].map((item) => (
              <div key={item.situation} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-[#01203d] mb-1">{item.situation}</p>
                <p className="text-sm text-gray-700 italic">&quot;{item.question}&quot;</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Team Assessment Tools</h2>
          <p className="text-lg text-gray-700 mb-4">
            Team assessments create structured reflection at the team level — helping groups surface dynamics that are hard to discuss without a shared framework. The most useful assessments are lightweight enough that teams will actually complete them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {[
              { tool: "Team Health Check", source: "Spotify", use: "Quarterly team reflection across 11 dimensions: easy to run, immediate conversation starter" },
              { tool: "Agile Team Compass", source: "Agile Coaching Institute", use: "More detailed team assessment across multiple dimensions; good for coaches who want richer data" },
              { tool: "5 Dysfunctions Assessment", source: "Lencioni", use: "Focuses on trust, conflict, commitment, accountability, results; useful when teams have interpersonal challenges" },
            ].map((t) => (
              <div key={t.tool} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-[#01203d] mb-1">{t.tool}</p>
                <p className="text-xs text-gray-400 mb-2">Source: {t.source}</p>
                <p className="text-sm text-gray-700">{t.use}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, enterprise retail">
            I spent my first year as a Scrum Master giving advice. My second year I started asking questions. The difference in team outcomes was night and day — not because my questions were brilliant, but because the teams started thinking for themselves instead of waiting for me to tell them what to do. The coaching literature has it right: the best coaches make themselves progressively irrelevant.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the difference between coaching and mentoring?</p>
              <p className="text-lg text-gray-700">Mentoring draws on the mentor&apos;s experience to guide the mentee — the mentor has walked a similar path and shares what they learned. Coaching doesn&apos;t require the coach to have the answer — it requires the coach to ask questions that help the person find their own answer. Both are valuable; the right choice depends on whether the person needs your knowledge or their own insight.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do I know when to coach vs. when to just give the answer?</p>
              <p className="text-lg text-gray-700">A useful heuristic: if the person could arrive at a good answer through reflection, coach. If they genuinely lack the information they need, teach. The trap is assuming people lack information when they actually lack permission to think for themselves. Most teams know more about their problems than their SMs do — they need coaching, not advice.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the SASM certification worth it for coaching skills?</p>
              <p className="text-lg text-gray-700">Yes — SASM focuses on the SM as a coach, changemaker, and organizational agility champion. It covers coaching stances, team dynamics, working with managers, and building communities of practice. It&apos;s significantly more coaching-focused than the SSM, which is more ceremony and framework oriented.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How do you coach a team through conflict?</p>
              <p className="text-lg text-gray-700">Name the conflict explicitly rather than hoping it resolves. Create a structured conversation with clear norms (speak for yourself, attack the problem not the person, listen to understand). Use retrospective-style facilitation to surface each person&apos;s perspective. Most team conflicts are about unmet expectations that were never made explicit — making them explicit is usually more than half the solution.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What&apos;s the difference between an Agile Coach and a Scrum Master?</p>
              <p className="text-lg text-gray-700">Scrum Masters serve one or two teams. Agile Coaches work at organizational, program, or portfolio level — coaching leadership, facilitating transformations, developing SM communities of practice. In SAFe, RTEs serve a coaching role across the ART. A senior SM who develops strong coaching skills naturally progresses toward Agile Coach or RTE roles.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Develop Advanced Coaching Skills</p>
            <p className="mb-5">SASM certification focuses on the SM as an agile coach — developing individuals, teams, and organizational agility.</p>
            <Link href="/courses/advanced-scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SASM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/servant-leadership-in-agile" className="text-[#01203d] underline hover:no-underline">Servant leadership in agile</Link>
            {" · "}
            <Link href="/blog/scrum-master-anti-patterns" className="text-[#01203d] underline hover:no-underline">Scrum Master anti-patterns</Link>
            {" · "}
            <Link href="/blog/sprint-retrospective-guide" className="text-[#01203d] underline hover:no-underline">Sprint retrospective guide</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
