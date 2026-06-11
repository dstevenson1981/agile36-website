import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Scrum Master Prerequisites: What You Need Before SSM Training | Agile36",
  description:
    "No mandatory prerequisites for SSM — but here's what you actually need to know before class to pass the exam and contribute on an ART from day one.",
  keywords: [
    "SAFe Scrum Master prerequisites",
    "SSM prerequisites",
    "SAFe Scrum Master requirements",
    "who can take SSM",
    "Leading SAFe prerequisites",
    "SAFe certification requirements",
  ],
  openGraph: {
    title: "SAFe Scrum Master Prerequisites: What You Need Before SSM Training",
    description:
      "No mandatory prerequisites for SSM — but here's what you actually need to know before class to pass the exam and contribute on an ART from day one.",
    url: "https://www.agile36.com/blog/safe-scrum-master-prerequisites",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-scrum-master-prerequisites" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>Scaled Agile sets <strong>no mandatory prerequisites</strong> for the SSM course — anyone can attend. But experience shapes how much you absorb and how quickly you can apply what you learn.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Scaled Agile recommends <strong>5+ years of experience</strong> in software development, testing, business analysis, project management, or a related field before attending.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Reading the <strong>Scrum Guide</strong> (14 pages) and the <strong>SAFe Big Picture</strong> before class meaningfully improves retention and exam performance.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Candidates without Scrum background should plan <strong>an extra 4–6 hours</strong> of self-study before the class to avoid spending class time on basics.</span></li>
      </ul>
    </section>
  );
}

function ReadinessGrid() {
  const profiles = [
    { role: "Software Developer / QA", ready: "High", note: "Sprint experience transfers directly" },
    { role: "Project Manager (Waterfall)", ready: "Medium", note: "Framework shift takes adjustment" },
    { role: "Business Analyst", ready: "Medium", note: "Good value-stream instincts, less team coaching context" },
    { role: "Team Lead / Manager", ready: "High", note: "Leadership mindset aligns well" },
    { role: "Recent Graduate", ready: "Low–Medium", note: "Add Scrum Guide prep + extra study time" },
    { role: "Agile Coach (non-SAFe)", ready: "High", note: "Needs SAFe-specific context, not fundamentals" },
  ];
  return (
    <section aria-label="Readiness by background" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Readiness by Background</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#01203d] text-white">
              <th className="p-3 text-left">Background</th>
              <th className="p-3 text-left">Readiness Level</th>
              <th className="p-3 text-left">Key Consideration</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p, i) => (
              <tr key={p.role} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-medium text-gray-900">{p.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${p.ready === "High" ? "bg-green-100 text-green-800" : p.ready === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{p.ready}</span>
                </td>
                <td className="p-3 text-gray-600">{p.note}</td>
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
    "SSM has no hard prerequisites, but the recommended profile is 5+ years in software delivery, testing, BA, or project management.",
    "Read the Scrum Guide before class. 14 pages. It takes 45 minutes and meaningfully improves Day 1 comprehension.",
    "Waterfall PMs should plan extra prep time — the mindset shift is real, and class time moves fast.",
    "The SSM exam is closed-book with 45 questions in 90 minutes. Preparation matters more than background.",
    "If you're genuinely new to Scrum, the Leading SAFe course is actually a good starting point — it teaches the Lean-Agile context that makes Scrum make sense.",
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

export default function SsmPrerequisitesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Scrum Master Prerequisites: What You Need Before SSM Training
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SSM Prerequisites</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Certification</span>
          <span className="text-sm text-[#718aa5]">Career Prep · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Scrum Master Prerequisites: What You Need Before SSM Training
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            One of the most common questions we get before registration: <em>"Do I qualify for the SAFe Scrum Master course?"</em> The short answer is yes — Scaled Agile sets no mandatory prerequisites. But attending without preparation puts you at a disadvantage in a fast-paced 2-day class. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master course</Link>{" "}
            covers material at a pace that assumes basic Agile familiarity. This guide maps out exactly what you need to know before you walk in the door — and what to do if you don't have it yet.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What Scaled Agile Actually Recommends</h2>
          <p className="text-lg text-gray-700 mb-4">
            Scaled Agile's official guidance for SSM attendees is: <em>five or more years of experience</em> working in software development, testing, business analysis, product management, or a related agile delivery role. They also recommend prior Scrum training or experience.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In practice, this is a guideline, not a gate. We've trained engineers with 20 years of experience who struggled with servant leadership concepts, and we've trained business analysts with 3 years of experience who were outstanding candidates. The guideline captures the right intent — come with real delivery context — but it's not a hard cutoff.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            What actually matters is that you understand why teams struggle with coordination, what iteration-based delivery looks like in practice, and how leadership differs from management. Background in any delivery role — even a waterfall-heavy one — gives you reference points for the SAFe concepts to click against.
          </p>

          <ReadinessGrid />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What to Do Before Class</h2>
          <p className="text-lg text-gray-700 mb-4">
            These three preparation steps, done in order, produce the strongest outcomes for SSM candidates regardless of background:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-5">
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <strong className="block mb-1">Read the Scrum Guide</strong>
                <p className="text-gray-600">14 pages, free at scrumguides.org. Covers Scrum roles, events, and artifacts at the level the SSM class assumes you already know. Read it once, cover to cover. Don't memorize — just absorb the structure.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <strong className="block mb-1">Explore the SAFe Big Picture</strong>
                <p className="text-gray-600">Available at scaledagileframework.com. You don't need to understand it fully — just know what the layers mean (team, program, portfolio) and where the main roles live. This gives you a mental map for Day 1.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <strong className="block mb-1">Understand What PI Planning Is</strong>
                <p className="text-gray-600">Read our{" "}
                  <Link href="/blog/pi-planning-explained" className="text-[#01203d] font-semibold underline hover:no-underline">PI Planning explained</Link>{" "}
                  guide before class. This event is central to the SSM role, and candidates who understand its purpose before class follow the Day 2 facilitation modules much more easily.</p>
              </div>
            </div>
          </div>

          <PullQuote attribution="SSM candidate, financial services">
            I had zero Scrum background going in. Reading the Scrum Guide the weekend before saved me — class moved fast and having those 14 pages in my head gave me a framework to hang everything on.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Do You Need Leading SAFe First?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Scaled Agile has no formal prerequisite chain between Leading SAFe (SA) and SSM. You can take either first. That said, there's a meaningful case for taking{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe</Link>{" "}
            first if you're completely new to the SAFe framework — because it teaches the Lean-Agile mindset, the 10 SAFe principles, and the Big Picture logic that the SSM course builds on.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Candidates who have leading SAFe first absorb SSM content faster and perform better on the SSM exam. For professionals who are new to both Scrum and SAFe, Leading SAFe → SSM is the recommended sequence.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            For working Scrum Masters who already have real sprint experience, jumping directly to SSM is efficient — they bring the team-level context and just need the SAFe program-layer knowledge that SSM provides.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can I take SSM with no Agile experience at all?</p>
              <p className="text-lg text-gray-700">Technically yes, since there are no mandatory prerequisites. Practically, candidates with zero agile background struggle in the two-day class and have lower exam pass rates. If you have no agile background, take Leading SAFe first and read the Scrum Guide before each class.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does a CSM or PSM count as preparation?</p>
              <p className="text-lg text-gray-700">Absolutely. If you hold CSM or PSM, you already understand Scrum fundamentals — the SSM class builds on that and adds the SAFe program layer. You'll find Day 1 familiar and Day 2 (ART-level facilitation) is where SSM-specific content kicks in.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is there a minimum education requirement?</p>
              <p className="text-lg text-gray-700">No. Scaled Agile does not require any specific degree or formal education to attend the SSM course or take the exam. Certifications are performance-based — you pass or you don't, regardless of your academic background.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should I study after class before taking the exam?</p>
              <p className="text-lg text-gray-700">2–5 days is the sweet spot. Take a full practice test on Day 3 post-class. If you score 75%+, schedule the exam. If below 70%, spend another day reviewing the weak areas. The SSM exam is closed-book with 45 questions and 90 minutes — preparation matters.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What if I fail the exam?</p>
              <p className="text-lg text-gray-700">The first retake costs $50. Agile36's Pro plan covers the retake fee and includes practice exams to help you prepare for a second attempt. Most candidates who fail the first time pass the retake with targeted review of their weakest topic areas.</p>
            </div>
          </div>

          <KeyTakeaways />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Ready to Register?</h2>
          <p className="text-lg text-gray-700 mb-6">
            If you've read this guide and feel prepared — or even mostly prepared — you're ready to register. The Agile36 SSM class runs live with a certified SPC trainer, and we include pre-class prep materials with enrollment.
          </p>
          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Register for SAFe Scrum Master</p>
            <p className="mb-5">Live virtual and in-person. Pre-class prep materials included.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View course dates
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/ssm-vs-csm" className="text-[#01203d] underline hover:no-underline">SSM vs CSM</Link>
            {" · "}
            <Link href="/blog/safe-scrum-master-exam-questions" className="text-[#01203d] underline hover:no-underline">SSM exam questions</Link>
            {" · "}
            <Link href="/courses/leading-safe" className="text-[#01203d] underline hover:no-underline">Leading SAFe course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
