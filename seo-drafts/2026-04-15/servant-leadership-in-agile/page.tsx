import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servant Leadership in Agile: What It Means and How to Practice It | Agile36",
  description:
    "Servant leadership in agile explained: what it means for Scrum Masters, RTEs, and managers. How to lead by serving, common misunderstandings, and practical techniques.",
  keywords: ["servant leadership in agile", "servant leadership scrum master", "agile servant leader", "servant leadership SAFe", "what is servant leadership agile", "servant leader definition scrum"],
  openGraph: {
    title: "Servant Leadership in Agile: What It Means and How to Practice It",
    description: "What servant leadership actually means for agile practitioners and how to develop it.",
    url: "https://www.agile36.com/blog/servant-leadership-in-agile",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/servant-leadership-in-agile" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Servant leadership is not passive or weak — it&apos;s a <strong>different kind of strength</strong>. The servant leader&apos;s job is to remove obstacles, create clarity, and build the conditions where teams can do their best work.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The most common misunderstanding: servant leaders <strong>do whatever the team asks</strong>. They don&apos;t. They serve the team&apos;s growth and the organization&apos;s mission — not individuals&apos; preferences. Servant leadership includes holding the mirror up to unproductive behaviors.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>In SAFe, servant leadership is the expected mode for <strong>Scrum Masters, RTEs, and Agile Coaches</strong>. It&apos;s also increasingly expected of managers and VPs in mature SAFe transformations — not just facilitators.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Robert Greenleaf coined the term in 1970. The <strong>10 characteristics</strong> he identified — listening, empathy, healing, awareness, persuasion, conceptualization, foresight, stewardship, commitment to growth, and community building — remain the clearest framework for developing this leadership style.</span></li>
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
          "Servant leadership is a practice, not a personality type. Directive leaders can develop servant leadership behaviors — it requires deliberate attention and feedback, not a personality transplant.",
          "The best test of servant leadership isn't how the leader behaves in good times — it's how they behave under pressure. Leaders who revert to command-and-control when projects are at risk haven't yet internalized servant leadership.",
          "Servant leaders ask different questions: not 'what do I want to happen?' but 'what does the team need to succeed?' Not 'who is responsible for this failure?' but 'what did the system produce and how do we change it?'",
          "In the Scrum Master role, servant leadership is the job description. But Scrum Masters who try to 'serve' by avoiding conflict, never challenging team behaviors, or tolerating dysfunction are serving comfort — not growth.",
          "SAFe's 8 Lean-Agile Leadership competencies map directly to servant leadership principles. Leaders pursuing the SA or SPC certification should understand the connection between Lean-Agile mindset and servant leadership theory.",
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

export default function ServantLeadershipInAgilePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Servant Leadership in Agile: What It Means and How to Practice It
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Servant Leadership in Agile</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Leadership</span>
          <span className="text-sm text-[#718aa5]">Leadership Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Servant Leadership in Agile: What It Means and How to Practice It
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Servant leadership is the most cited concept in agile and the least precisely understood. It gets invoked to justify everything from genuine empowerment practices to avoidant leadership styles that refuse to hold anyone accountable. In SAFe, servant leadership is a defined expectation for Scrum Masters, RTEs, and coaches — and increasingly for program leaders. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>{" "}
            treats servant leadership as a core competency, not a soft skill.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Servant Leadership Actually Means</h2>
          <p className="text-lg text-gray-700 mb-4">
            Robert Greenleaf, who developed the concept in 1970, described it simply: the servant leader is a servant first. They begin with the desire to serve and from that position exercise leadership. The contrast is with leaders who are leaders first — who grasp for power and then use service instrumentally to maintain it.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In practice, servant leaders in agile organizations do several things consistently: they prioritize team needs over personal visibility, they remove obstacles rather than assigning work, they ask questions rather than giving answers, and they develop team members&apos; capabilities rather than creating dependency on the leader&apos;s knowledge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-3">Servant leadership looks like...</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• "What do you need to unblock this?" instead of "Why isn&apos;t this done?"</li>
                <li>• Removing an organizational impediment instead of working around it</li>
                <li>• Facilitating the team&apos;s decision rather than making it for them</li>
                <li>• Celebrating team success without claiming credit</li>
                <li>• Naming a difficult team dynamic in a retrospective, constructively</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="text-red-800 font-bold mb-3">Common misunderstandings...</h4>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• Doing whatever the team wants (avoidant, not servant)</li>
                <li>• Never challenging unhealthy team behaviors</li>
                <li>• Absorbing all escalations to protect the team from accountability</li>
                <li>• Refusing to make any decisions (decision paralysis, not empowerment)</li>
                <li>• Soft, conflict-avoidant management style relabeled as servant leadership</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Greenleaf&apos;s 10 Characteristics Applied to SAFe</h2>
          <div className="space-y-4 my-6">
            {[
              { char: "Listening", apply: "Active listening in retrospectives and 1:1s — hearing what&apos;s behind the words, not just the surface concern." },
              { char: "Empathy", apply: "Understanding team member perspectives before evaluating their behaviors or decisions." },
              { char: "Healing", apply: "Repairing trust after conflict or sprint failures rather than assigning blame." },
              { char: "Awareness", apply: "Recognizing team dynamics, organizational pressures, and your own impact on both." },
              { char: "Persuasion", apply: "Building consensus through reason and demonstrated results rather than authority or hierarchy." },
              { char: "Conceptualization", apply: "Holding the long-term vision (team capability, ART maturity) alongside sprint-level urgency." },
              { char: "Foresight", apply: "Anticipating impediments before they block the team — systems thinking applied to team dynamics." },
              { char: "Stewardship", apply: "Treating the team&apos;s trust and the organization&apos;s investment as things to protect and develop." },
              { char: "Commitment to growth", apply: "Active development of team members — not just task completion, but capability building." },
              { char: "Community building", apply: "Building team cohesion, ART identity, and cross-team relationships that sustain long-term performance." },
            ].map((item) => (
              <div key={item.char} className="flex gap-3 bg-gray-50 rounded-xl p-3 items-start">
                <span className="font-bold text-[#01203d] text-sm min-w-[110px] flex-shrink-0">{item.char}</span>
                <p className="text-gray-700 text-sm">{item.apply}</p>
              </div>
            ))}
          </div>

          <PullQuote attribution="Agile Coach, enterprise healthcare">
            The moment I understood servant leadership was when a VP asked me, &apos;Why did you let the team make that decision?&apos; My answer: &apos;Because they have more context than I do, and the decision was theirs to make.&apos; She expected me to explain why I abdicated. I was explaining why I empowered. The room went quiet. That&apos;s the culture gap servant leadership has to cross.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does servant leadership mean never giving direction?</p>
              <p className="text-lg text-gray-700">No. Servant leaders provide direction all the time — on process, on team norms, on what quality looks like. What they don&apos;t do is substitute their judgment for the team&apos;s judgment on the work itself. The distinction is: "Here&apos;s how we should work together" (appropriate) vs. "Here&apos;s exactly what you should build next" (overreach).</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can managers be servant leaders?</p>
              <p className="text-lg text-gray-700">Yes, and the most effective managers in agile organizations are. They shift from "I manage the work" to "I manage the conditions that make good work possible." This requires letting go of direct control over task assignment and individual performance optimization — which is genuinely difficult for managers trained in traditional environments.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is servant leadership tested on the SSM exam?</p>
              <p className="text-lg text-gray-700">Yes, significantly. Questions about the SM role in scenarios almost always have servant leadership as the correct behavioral frame. When in doubt: the answer that empowers, coaches, or removes impediments is usually correct. The answer that assigns, controls, or reports is usually wrong.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Develop Servant Leadership in Practice</p>
            <p className="mb-5">SSM and Leading SAFe training develop servant leadership as a practiced competency — not just a concept.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                SSM training
              </Link>
              <Link href="/courses/leading-safe" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                Leading SAFe
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-anti-patterns" className="text-[#01203d] underline hover:no-underline">Scrum Master anti-patterns</Link>
            {" · "}
            <Link href="/blog/agile-coaching-techniques" className="text-[#01203d] underline hover:no-underline">Agile coaching techniques</Link>
            {" · "}
            <Link href="/blog/psychological-safety-agile-teams" className="text-[#01203d] underline hover:no-underline">Psychological safety in agile teams</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
