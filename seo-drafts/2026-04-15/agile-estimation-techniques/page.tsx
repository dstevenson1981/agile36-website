import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agile Estimation Techniques: Planning Poker, T-Shirts, and What Actually Works | Agile36",
  description:
    "A practitioner's guide to agile estimation: planning poker, T-shirt sizing, three-point estimation, and when to use each. Plus the estimation mistakes most teams make.",
  keywords: [
    "agile estimation techniques",
    "planning poker",
    "story point estimation",
    "T-shirt sizing agile",
    "agile estimation methods",
    "how to estimate user stories",
  ],
  openGraph: {
    title: "Agile Estimation Techniques: Planning Poker, T-Shirts, and What Actually Works",
    description: "A practitioner's guide to agile estimation methods and when to use each.",
    url: "https://www.agile36.com/blog/agile-estimation-techniques",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/agile-estimation-techniques" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Agile estimation is about <strong>relative sizing</strong>, not calendar time predictions. Teams estimate effort and complexity relative to a baseline story — not in hours.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span><strong>Planning poker</strong> is the most widely used technique for story-level estimation. It surfaces divergent understanding, which is often more valuable than the estimate itself.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The Fibonacci sequence (1, 2, 3, 5, 8, 13) reflects that large estimates are inherently uncertain — the gaps between large numbers acknowledge that uncertainty honestly.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Estimation accuracy improves with team experience, stable composition, and a clear Definition of Done — not with more elaborate estimation techniques.</span></li>
      </ul>
    </section>
  );
}

function TechniqueComparisonGrid() {
  const techniques = [
    { name: "Planning Poker", scale: "Fibonacci (1–100)", best: "Story-level estimation in refinement", time: "2–5 min/story", notes: "Best for surfaces divergence" },
    { name: "T-Shirt Sizing", scale: "XS / S / M / L / XL", best: "Backlog-level rough sizing", time: "< 1 min/item", notes: "Fast, good for large backlogs" },
    { name: "Dot Voting", scale: "Relative priority", best: "Backlog prioritization, not estimation", time: "5 min for group", notes: "Used for features and epics" },
    { name: "Three-Point Estimation", scale: "Optimistic / Likely / Pessimistic", best: "High-uncertainty stories", time: "5–10 min/story", notes: "Best when risks are significant" },
    { name: "#NoEstimates", scale: "Count of stories", best: "Mature teams with stable velocity", time: "None", notes: "Requires consistent story sizing" },
  ];
  return (
    <section aria-label="Agile estimation techniques comparison" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Estimation Techniques at a Glance</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-[#01203d] text-white">
              <th className="p-3 text-left">Technique</th>
              <th className="p-3 text-left">Scale</th>
              <th className="p-3 text-left">Best For</th>
              <th className="p-3 text-left">Time Cost</th>
            </tr>
          </thead>
          <tbody>
            {techniques.map((t, i) => (
              <tr key={t.name} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-bold text-[#01203d]">{t.name}</td>
                <td className="p-3 text-gray-600">{t.scale}</td>
                <td className="p-3 text-gray-700">{t.best}</td>
                <td className="p-3 text-gray-600">{t.time}</td>
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
    "Estimation disagreements are valuable signals — they reveal that different team members have different understanding of the story's scope or complexity.",
    "Never convert story points to hours for reporting to stakeholders. This breaks the relative nature of the estimate and creates false precision.",
    "T-shirt sizing is the right tool for large, unrefined backlogs. Planning poker is the right tool for story-level estimation during refinement.",
    "Estimation accuracy is a team capability — it improves with stable team composition, clear DoD, and consistent story sizes, not with better techniques.",
    "If your team's estimates are consistently wrong in one direction (always underestimating or overestimating), that's a systemic issue to address in retrospective.",
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

export default function AgileEstimationTechniquesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Agile Estimation Techniques: What Works and What Doesn&apos;t
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Agile Estimation Techniques</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practices</span>
          <span className="text-sm text-[#718aa5]">Practice Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Agile Estimation Techniques: Planning Poker, T-Shirts, and What Actually Works
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Most teams get agile estimation wrong in one of two ways: they either treat story points as hour proxies (destroying the relative nature of the estimate) or they spend more time debating estimates than building the thing. After training teams on{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master</Link>{" "}
            and{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">POPM</Link>{" "}
            practices, the patterns are consistent. This guide covers the main techniques, when to use each, and the mistakes to avoid.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why Relative Sizing Matters</h2>
          <p className="text-lg text-gray-700 mb-4">
            The core insight behind story point estimation is that humans are better at comparing things than measuring them absolutely. Asking "how long will this take?" triggers optimism bias. Asking "is this bigger or smaller than the login story?" produces more reliable relative comparisons.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Story points capture relative effort, complexity, and uncertainty — not calendar time. That's why the same story can be 3 points for an experienced team and 8 points for a new team. The points are calibrated to that team's experience and velocity, not to a universal scale.
          </p>

          <TechniqueComparisonGrid />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Planning Poker: How It Works</h2>
          <p className="text-lg text-gray-700 mb-4">
            Planning poker is the most widely used story estimation technique in Scrum and SAFe teams. Here's the sequence:
          </p>
          <div className="space-y-3 my-6">
            {[
              "PO reads the story and acceptance criteria",
              "Each team member silently selects a card from their deck (Fibonacci: 1, 2, 3, 5, 8, 13, 21, ?, ∞)",
              "All cards are revealed simultaneously — preventing anchoring bias",
              "Team discusses divergent estimates (highest and lowest estimators explain their reasoning)",
              "Re-estimate if needed; capture the consensus",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                <span className="text-[#01203d] font-bold">{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700 mb-4">
            The key value of planning poker is step 4 — the discussion of divergence. When one person estimates 2 and another estimates 13, that gap almost always reveals either different understanding of the story or different knowledge about technical constraints. That conversation is worth more than the final number.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">T-Shirt Sizing: When to Use It</h2>
          <p className="text-lg text-gray-700 mb-4">
            T-shirt sizing (XS, S, M, L, XL) is fast and works well for high-level backlog sizing when stories aren't ready for planning poker. Use it for:
          </p>
          <div className="grid grid-cols-2 gap-4 my-6">
            {[
              { label: "Product roadmap planning", note: "Rough effort sizing for features" },
              { label: "PI Planning feature estimation", note: "SAFe program-level sizing" },
              { label: "Long-term capacity planning", note: "Estimating multi-sprint epics" },
              { label: "New backlog items", note: "Before formal refinement" },
            ].map((u) => (
              <div key={u.label} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="font-bold text-[#01203d] text-sm">{u.label}</div>
                <div className="text-xs text-gray-500">{u.note}</div>
              </div>
            ))}
          </div>

          <PullQuote attribution="Senior Scrum Master, healthcare IT">
            The most valuable part of planning poker isn&apos;t the number. It&apos;s the conversation when someone holds up a 1 and someone else holds up a 13. That conversation surfaces something the team needed to know before starting the story.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common Estimation Mistakes</h2>
          <div className="space-y-3 my-6">
            {[
              { mistake: "Converting points to hours", fix: "Never do this. Story points are relative, not temporal. Convert velocity to time for release planning instead." },
              { mistake: "Manager sets the estimate", fix: "The development team estimates the work they'll do. Managers providing estimates undermines trust and accuracy." },
              { mistake: "Long estimation debates", fix: "If you can't reach consensus in 2–3 rounds, the story isn't ready for estimation. Return it to refinement." },
              { mistake: "Padding for uncertainty", fix: "Use the '?' card for genuinely unknown stories. Spikes, not padding, address uncertainty." },
              { mistake: "Anchoring before reveal", fix: "Use simultaneous reveal in planning poker. Sharing estimates sequentially causes anchoring to the first number." },
            ].map((m) => (
              <div key={m.mistake} className="border border-gray-200 rounded-xl p-4">
                <div className="font-bold text-red-600 text-sm mb-1">Mistake: {m.mistake}</div>
                <div className="text-gray-600 text-sm"><strong>Fix:</strong> {m.fix}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What does a story point actually represent?</p>
              <p className="text-lg text-gray-700">A story point represents relative effort, complexity, and uncertainty combined — not pure hours. A 5-point story should feel roughly twice as large as a 3-point story to the team doing the work. The exact meaning is calibrated by team velocity over time.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should we estimate bugs?</p>
              <p className="text-lg text-gray-700">It depends on team convention. Some teams estimate bugs to track effort and velocity. Others treat bugs as unplanned work that comes out of sprint capacity. Consistency matters more than which approach you pick.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's a reference story?</p>
              <p className="text-lg text-gray-700">A reference story is a well-understood story that serves as a benchmark for estimation. "That story is about the same size as the login feature we built in Sprint 3" — the login feature is a reference story. Teams with good reference stories estimate faster and more consistently.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does SAFe use story points?</p>
              <p className="text-lg text-gray-700">Yes. Teams on SAFe ARTs use story points at the team level for sprint planning and velocity tracking. At the program level, features are estimated using story points or normalized story points for PI Planning. The{" "}
              <Link href="/blog/pi-planning-explained" className="text-[#01203d] underline hover:no-underline">PI Planning</Link>{" "}
              process uses team velocity and feature estimates to validate PI objectives.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is #NoEstimates?</p>
              <p className="text-lg text-gray-700">#NoEstimates is an approach where teams count stories instead of estimating them — based on the premise that well-sized stories are roughly equivalent in effort. It works for mature teams with consistent story sizing and stable velocity. It's not appropriate for teams still calibrating their estimation baseline.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Train in Agile Estimation and Planning</p>
            <p className="mb-5">Planning poker, PI Planning estimation, and velocity management — covered in SAFe SSM and POPM courses.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View Scrum Master course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/story-points-explained" className="text-[#01203d] underline hover:no-underline">Story points explained</Link>
            {" · "}
            <Link href="/blog/velocity-in-agile" className="text-[#01203d] underline hover:no-underline">Velocity in agile</Link>
            {" · "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] underline hover:no-underline">POPM course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
