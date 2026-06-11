import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sprint Review vs Retrospective: What's the Difference? | Agile36",
  description:
    "Sprint review vs retrospective: what each ceremony is for, who attends, what gets discussed, and the common mistakes teams make by confusing the two.",
  keywords: ["sprint review vs retrospective", "sprint review vs retro", "difference between sprint review and retrospective", "what is sprint review", "what is retrospective scrum", "sprint ceremonies explained"],
  openGraph: {
    title: "Sprint Review vs Retrospective: What's the Difference?",
    description: "The key differences between sprint review and retrospective — purpose, attendees, and common mistakes.",
    url: "https://www.agile36.com/blog/sprint-review-vs-retrospective",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/sprint-review-vs-retrospective" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The sprint review is a <strong>product inspection event</strong>. The team demonstrates what was built. Stakeholders provide feedback. The output is a refined product backlog and stakeholder alignment.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The retrospective is a <strong>process inspection event</strong>. The team examines how it works together. No stakeholders attend. The output is specific improvement actions the team commits to in the next sprint.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The most damaging confusion: letting <strong>process issues bleed into the sprint review</strong>. When the team discusses team dynamics or workflow problems in front of stakeholders, it creates noise in a meeting designed for product feedback.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Both events happen every sprint, in order: sprint review first (product), then retrospective (process). Most teams run them <strong>on the same day</strong> — review in the afternoon, retro immediately after.</span></li>
      </ul>
    </section>
  );
}

function CeremonyCompare() {
  const dims = [
    { dim: "Purpose", review: "Inspect product increment; gather stakeholder feedback", retro: "Inspect team process; identify improvements" },
    { dim: "Who attends", review: "Team + stakeholders + PO + SM", retro: "Team only (PO, SM, dev team) — no stakeholders" },
    { dim: "What&apos;s discussed", review: "What was built; feedback on product direction; backlog updates", retro: "How the team worked; what helped and hurt; improvement actions" },
    { dim: "Output", review: "Updated product backlog; stakeholder input; sprint results", retro: "Specific improvement commitments for next sprint" },
    { dim: "Duration (2-week sprint)", review: "Max 2 hours", retro: "Max 1.5 hours" },
    { dim: "Facilitated by", review: "SM facilitates; PO presents; team demos", retro: "SM facilitates" },
  ];
  return (
    <section aria-label="Sprint review vs retrospective comparison" className="my-10 overflow-x-auto">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Sprint Review vs Retrospective: Side by Side</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#01203d] text-white">
            <th className="p-3 text-left w-1/4"></th>
            <th className="p-3 text-left">Sprint Review</th>
            <th className="p-3 text-left">Retrospective</th>
          </tr>
        </thead>
        <tbody>
          {dims.map((d, i) => (
            <tr key={d.dim} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-semibold text-[#01203d] border-b border-gray-100">{d.dim}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100" dangerouslySetInnerHTML={{ __html: d.review }} />
              <td className="p-3 text-gray-700 border-b border-gray-100" dangerouslySetInnerHTML={{ __html: d.retro }} />
            </tr>
          ))}
        </tbody>
      </table>
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
          "Keep stakeholders out of retrospectives. Retros require psychological safety for honest process conversation — external observers change what team members are willing to say.",
          "The sprint review's primary output isn't the demo — it's the updated product backlog. If you leave a sprint review without a clearer picture of what should come next, the review wasn't complete.",
          "Never use the sprint review to process team dysfunction. If a sprint had internal problems, those belong in the retrospective. The review is for stakeholders; they don't need to witness the team's process challenges.",
          "Retrospectives without specific, time-boxed action items are feel-good conversations. 'We should communicate better' is not a retrospective action item. 'By sprint end, we will have a shared definition of done written and posted in the team channel' is.",
          "On the SSM exam, sprint review and retrospective scenarios are frequently tested. The key distinction: if the question involves what was built or stakeholder feedback → review. If it involves how the team worked → retrospective.",
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

export default function SprintReviewVsRetrospectivePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Sprint Review vs Retrospective: What&apos;s the Difference?
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Sprint Review vs Retrospective</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Scrum Practice</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 7 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Sprint Review vs Retrospective: What&apos;s the Difference?
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Sprint review and retrospective are frequently confused — especially in organizations new to Scrum where both ceremonies happen in the same week and feel similar on the surface. The distinction matters because mixing up the two creates dysfunctional meetings: team dynamics discussed in front of stakeholders, or product feedback processed in a team-only setting. Both are core SSM competencies covered in the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>.
          </p>

          <ExecutiveSummary />

          <CeremonyCompare />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common Mistakes with Each Ceremony</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <h4 className="text-orange-800 font-bold mb-3">Sprint Review Mistakes</h4>
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• Demoing unfinished work as complete</li>
                <li>• Skipping stakeholders (team demos to itself)</li>
                <li>• No product backlog update afterward</li>
                <li>• Turning it into a status meeting, not a feedback session</li>
                <li>• Processing team issues in front of stakeholders</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <h4 className="text-purple-800 font-bold mb-3">Retrospective Mistakes</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Same format every sprint (star chart forever)</li>
                <li>• No specific action items with owners</li>
                <li>• Stakeholders present (kills honesty)</li>
                <li>• Same two people dominate every retro</li>
                <li>• Action items from last retro never reviewed</li>
              </ul>
            </div>
          </div>

          <PullQuote attribution="Scrum Master, digital agency">
            The first thing I do with a new team is separate the sprint review and the retrospective — both in the calendar and in everyone&apos;s minds. Once a team conflates them, you get stakeholders showing up to hear about team process problems and team members self-censoring in retros because they think managers will hear. Two hours of clarification upfront saves months of dysfunctional ceremonies.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can the sprint review and retrospective be combined?</p>
              <p className="text-lg text-gray-700">They can be scheduled back-to-back (and usually are), but they should not be merged into a single ceremony. The attendees and purposes are distinct enough that merging them produces a ceremony that does neither well. The standard pattern is: review in the afternoon, short break, then retrospective with only the team.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who runs the sprint review?</p>
              <p className="text-lg text-gray-700">The SM facilitates the ceremony structure, but the development team demonstrates the working software and the PO presents the sprint goal results and context. It&apos;s a collaborative presentation to stakeholders — not an SM-only meeting. Teams that leave all the talking to the SM in a sprint review are missing the accountability the ceremony is designed to create.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does the PO attend the retrospective?</p>
              <p className="text-lg text-gray-700">Yes — the PO is part of the Scrum team and attends retrospectives. Some teams worry that PO presence inhibits honest feedback about backlog quality or sprint scope changes. If this is happening, it&apos;s a psychological safety problem, not a reason to exclude the PO. The SM&apos;s job is to create conditions where the PO can be part of an honest process conversation.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What&apos;s the difference in SAFe vs standard Scrum?</p>
              <p className="text-lg text-gray-700">In SAFe, team-level ceremonies are largely the same as standard Scrum. The addition is ART-level ceremonies: PI Planning replaces backlog refinement at program scale, and Inspect &amp; Adapt replaces the team retrospective at ART scale. Team-level sprint reviews and retros still happen every sprint within the ART structure.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Are sprint review and retrospective tested on the SSM exam?</p>
              <p className="text-lg text-gray-700">Yes — scenario questions about what happens in each ceremony and who attends are common. The key distinction the exam tests: product feedback (review) vs team process improvement (retrospective). Questions about what the SM should facilitate, what the PO&apos;s role is, and what should or shouldn&apos;t happen in each ceremony appear regularly.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Master Every Scrum Ceremony</p>
            <p className="mb-5">SSM training covers sprint review, retrospective, planning, and daily standup — with the facilitation skills to run each effectively.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/sprint-retrospective-guide" className="text-[#01203d] underline hover:no-underline">Sprint retrospective guide</Link>
            {" · "}
            <Link href="/blog/sprint-planning-best-practices" className="text-[#01203d] underline hover:no-underline">Sprint planning best practices</Link>
            {" · "}
            <Link href="/blog/scrum-master-anti-patterns" className="text-[#01203d] underline hover:no-underline">Scrum Master anti-patterns</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
