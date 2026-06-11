import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story Points Explained: What They Are and How to Use Them | Agile36",
  description:
    "Story points explained clearly: what they measure, why teams use them instead of hours, how velocity works, and the most common story point mistakes.",
  keywords: ["story points explained", "what are story points", "story points agile", "story point estimation", "agile story points vs hours", "velocity story points"],
  openGraph: {
    title: "Story Points Explained: What They Are and How to Use Them",
    description: "What story points measure, why teams use them, and how velocity works.",
    url: "https://www.agile36.com/blog/story-points-explained",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/story-points-explained" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Story points are a <strong>relative measure of effort, complexity, and uncertainty</strong> — not hours. A 5-point story should be roughly 2.5× the effort of a 2-point story for the same team.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The <strong>Fibonacci sequence</strong> (1, 2, 3, 5, 8, 13, 21) is used because the gaps between larger numbers reflect increasing uncertainty in larger estimates.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span><strong>Velocity</strong> is the sum of story points a team completes per sprint. It stabilizes over 3–5 sprints and becomes a reliable planning input — not a performance metric.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Converting story points to hours for reporting is the most common mistake — it destroys the relative nature of the estimate and creates false precision in planning.</span></li>
      </ul>
    </section>
  );
}

function FibonacciBar() {
  const nums = [{ n: 1, w: 8 }, { n: 2, w: 15 }, { n: 3, w: 22 }, { n: 5, w: 35 }, { n: 8, w: 52 }, { n: 13, w: 72 }, { n: 21, w: 95 }];
  return (
    <section aria-label="Fibonacci scale for story points" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Fibonacci Scale Visualization</h3>
      <div className="space-y-3">
        {nums.map((f) => (
          <div key={f.n} className="flex items-center gap-3">
            <div className="w-8 text-right font-bold text-[#01203d]">{f.n}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-7">
              <div className="h-7 rounded-full bg-[#01203d] flex items-center pl-3" style={{ width: `${f.w}%` }}>
                <span className="text-yellow-400 text-xs font-bold">{f.n} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Note: gaps between large estimates reflect natural uncertainty — you can&apos;t know if something is 13 vs 15, but you know it&apos;s bigger than 8.</p>
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
    "Story points measure relative effort, complexity, and uncertainty — not hours. The same story might be 3 points for an experienced team and 8 for a new one.",
    "Velocity is a planning tool, not a productivity metric. Comparing velocity between teams or using it to rank teams destroys its usefulness.",
    "Converting story points to hours for reporting is the most common anti-pattern — it creates false precision and invites gaming.",
    "Velocity stabilizes over 3–5 sprints. New teams should not use velocity for firm commitments until they have a stable baseline.",
    "When estimates consistently differ from actuals, the problem is usually unclear stories — not bad estimation. Fix the stories first.",
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

export default function StoryPointsExplainedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Story Points Explained: What They Are and How to Use Them
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Story Points Explained</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practices</span>
          <span className="text-sm text-[#718aa5]">Concept Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Story Points Explained: What They Are and How to Use Them
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Story points are one of the most misunderstood concepts in agile — and one of the most misused. Teams either treat them as hour proxies (destroying their value) or debate them endlessly (wasting time the estimate was supposed to save). The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master course</Link>{" "}
            covers estimation as a core team facilitation skill. This guide explains what story points actually are and how to use them correctly.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Story Points Measure</h2>
          <p className="text-lg text-gray-700 mb-4">
            Story points capture three things simultaneously: effort (how much work), complexity (how hard), and uncertainty (how unknown). A story that's straightforward to build but requires significant effort might be the same point value as a story that's quick to build but has uncertain implementation paths. The point value reflects the team's collective sense of the total "cost" of the story.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This is why story points are relative, not absolute. "5 points" means this story is about the same total cost as the other 5-point stories we've done — not that it takes 5 hours. The baseline is the team's own history, not a universal scale.
          </p>

          <FibonacciBar />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why Fibonacci?</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Fibonacci sequence (1, 2, 3, 5, 8, 13, 21...) is used because the gaps between larger numbers reflect natural uncertainty in estimation. You might confidently distinguish a 3-point story from a 5-point story, but you can't reliably distinguish a 15-point story from a 17-point story — the uncertainty is too large. The Fibonacci sequence acknowledges this by using increasingly wide gaps at larger values.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Stories with large estimates (13+) should be split — not because the Fibonacci scale doesn't support large numbers, but because large stories have high uncertainty and typically straddle sprint boundaries. Splitting makes them more predictable. Our{" "}
            <Link href="/blog/agile-estimation-techniques" className="text-[#01203d] font-semibold underline hover:no-underline">agile estimation techniques guide</Link>{" "}
            covers story splitting methods in detail.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Velocity: What It Is and What It Isn&apos;t</h2>
          <p className="text-lg text-gray-700 mb-4">
            Velocity is the sum of story points a team completes per sprint. Over 3–5 sprints, velocity stabilizes into a reliable planning input. A team averaging 40 points per sprint can confidently plan to 35–42 points in the next sprint and generally deliver it.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            What velocity is NOT: it's not a productivity metric, it's not comparable across teams, and it's not something to increase for its own sake. A team that artificially inflates story point estimates to show "higher velocity" is gaming the metric and destroying its value as a planning tool.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="text-green-800 font-bold mb-2">✓ Velocity as a planning tool</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Use to forecast sprint capacity</li>
                <li>• Use to predict release dates</li>
                <li>• Use to size PI objectives in SAFe</li>
                <li>• Use to identify capacity changes over time</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="text-red-800 font-bold mb-2">✗ Velocity misuse</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Compare team velocity to other teams</li>
                <li>• Demand velocity increases each sprint</li>
                <li>• Use velocity as a performance score</li>
                <li>• Convert velocity to hours for reporting</li>
              </ul>
            </div>
          </div>

          <PullQuote attribution="Agile Coach, global technology company">
            When a manager asks me which team has the highest velocity, I know we have an education problem. Velocity is like the odometer on a car — it tells you how much ground you&apos;ve covered, not whether you&apos;re a better driver.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I convert story points to hours?</p>
              <p className="text-lg text-gray-700">Technically yes; practically, don't. Converting points to hours gives stakeholders false precision — they start managing to the hours rather than the sprint goal. If you need a time estimate, use velocity and sprint length to calculate a rough release date instead.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Why does every team have different velocities?</p>
              <p className="text-lg text-gray-700">Because points are calibrated to each team's experience and context. A team of 10 senior engineers completing 80 points per sprint and a team of 5 junior developers completing 25 points per sprint aren't directly comparable. They've calibrated their estimates differently to their own contexts.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What should I do when new team members join?</p>
              <p className="text-lg text-gray-700">Expect velocity to dip for 2–3 sprints while the new member ramps up. Don't adjust the velocity baseline immediately — let it stabilize over 3 sprints with the new configuration before using it for planning.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Should we estimate spikes in story points?</p>
              <p className="text-lg text-gray-700">Spikes (research timebox tasks) are typically estimated in time (hours or a day), not story points. Some teams estimate them in points and count them in velocity; others don't. Consistency matters more than which approach you use.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is a "reference story" and why does it help?</p>
              <p className="text-lg text-gray-700">A reference story is a previously completed story that the team uses as a calibration anchor. "Is this bigger or smaller than the user registration story we did in Sprint 2?" gives the team a concrete comparison point and speeds up estimation significantly.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Train Your Team in Agile Estimation</p>
            <p className="mb-5">Planning poker, story splitting, and velocity management covered in SAFe SSM training.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/agile-estimation-techniques" className="text-[#01203d] underline hover:no-underline">Agile estimation techniques</Link>
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
