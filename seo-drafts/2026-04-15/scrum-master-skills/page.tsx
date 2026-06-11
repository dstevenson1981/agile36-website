import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master Skills: What You Need to Succeed in the Role | Agile36",
  description:
    "The core skills every Scrum Master needs — technical, interpersonal, and organizational. What employers look for, how to develop them, and which skills matter most at each career stage.",
  keywords: ["scrum master skills", "skills needed for scrum master", "what skills does a scrum master need", "scrum master competencies", "scrum master hard skills soft skills", "scrum master skill set"],
  openGraph: {
    title: "Scrum Master Skills: What You Need to Succeed in the Role",
    description: "The core skills employers look for in Scrum Masters — and how to develop them.",
    url: "https://www.agile36.com/blog/scrum-master-skills",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-skills" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Scrum Master role requires <strong>three skill layers</strong>: Scrum/agile knowledge (framework expertise), facilitation and coaching skills (team effectiveness), and organizational navigation skills (impediment removal above the team level).</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Most entry-level SMs are hired for their <strong>framework knowledge</strong>. Most experienced SMs are valued for their <strong>coaching and organizational skills</strong> — which are harder to learn and much harder to fake in an interview.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>The skills that distinguish Senior SMs from Junior SMs: conflict facilitation, organizational system thinking, stakeholder coaching, and the ability to build <strong>Communities of Practice</strong> across multiple teams.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>SAFe-specific skills — PI Planning facilitation, ART-level metrics, Inspect &amp; Adapt workshops — are increasingly important as more enterprises adopt SAFe. Practitioners with both Scrum skills and <strong>SAFe context</strong> command higher salaries.</span></li>
      </ul>
    </section>
  );
}

function SkillsRadar() {
  const skills = [
    { skill: "Facilitation", junior: 60, senior: 90 },
    { skill: "Coaching", junior: 35, senior: 85 },
    { skill: "Scrum Knowledge", junior: 85, senior: 90 },
    { skill: "SAFe Context", junior: 40, senior: 80 },
    { skill: "Org Navigation", junior: 25, senior: 85 },
    { skill: "Conflict Management", junior: 30, senior: 80 },
  ];
  return (
    <section aria-label="Junior vs Senior SM skills" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Junior vs Senior Scrum Master: Skill Comparison</h3>
      <div className="space-y-3">
        {skills.map((s) => (
          <div key={s.skill} className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-800">{s.skill}</span>
              <span className="text-xs text-gray-500">Junior: {s.junior}% · Senior: {s.senior}%</span>
            </div>
            <div className="flex gap-1">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-400 rounded-full" style={{ width: `${s.junior}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">Junior</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-[#01203d] rounded-full" style={{ width: `${s.senior}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">Senior</p>
              </div>
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
          "Scrum framework knowledge is the table stake — necessary but not differentiating. SMs who stand out in the job market have demonstrable coaching and facilitation skills, not just certification credentials.",
          "Conflict facilitation is the most valuable underdeveloped skill among working SMs. The ability to create a productive conversation around a team dysfunction — without avoiding it or creating more friction — separates good SMs from great ones.",
          "Organizational navigation — understanding how decisions get made, who has influence, and how to route impediments to the right people — is the skill that allows SMs to remove blockers above the team level. This is learned through experience, not certification.",
          "SAFe experience is increasingly a differentiator. Enterprises implementing SAFe need SMs who understand PI Planning, ART-level coordination, and how team-level Scrum maps to program-level delivery. The SSM certification signals this readiness.",
          "The highest-leverage skill investment for a working SM: facilitation training. Specifically, training on how to design retrospectives, manage group dynamics, surface hidden conflicts, and create conditions for honest conversation.",
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

export default function ScrumMasterSkillsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master Skills: What You Need to Succeed in the Role
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master Skills</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Career Development</span>
          <span className="text-sm text-[#718aa5]">Career Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master Skills: What You Need to Succeed in the Role
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Scrum Master role requires a wider skill set than most job postings suggest. A certification demonstrates framework knowledge — but the skills that make practitioners effective on the job are largely interpersonal and organizational. Whether you&apos;re pursuing the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>{" "}
            as a first step or the{" "}
            <Link href="/courses/advanced-scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">Advanced Scrum Master (SASM)</Link>{" "}
            to develop coaching depth, understanding what skills actually matter — and at what career stage — helps you invest your development time effectively.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Core Scrum Master Skills by Category</h2>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Agile and Scrum Knowledge</h3>
          <p className="text-lg text-gray-700 mb-4">Framework expertise is the foundation. SMs need to know Scrum deeply enough to explain why each ceremony exists, when to adapt the framework, and how team-level Scrum connects to program-level coordination in SAFe. In SAFe environments, this includes PI Planning, ART sync, and Inspect &amp; Adapt facilitation.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Facilitation</h3>
          <p className="text-lg text-gray-700 mb-4">Every SM facilitates multiple ceremonies per sprint. Strong facilitation means more than running an agenda — it means managing participation, drawing out quiet voices, keeping discussions productive without being controlling, and closing conversations with clear outcomes. Weak facilitation is visible immediately and hard to hide.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Coaching and Mentoring</h3>
          <p className="text-lg text-gray-700 mb-4">Coaching differs from teaching: coaches ask questions that build insight rather than providing answers. SMs use coaching to help individuals develop professional skills, help the team improve its practices, and help the PO refine their approach to backlog management. The SASM certification focuses specifically on developing this coaching capability.</p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Conflict Navigation</h3>
          <p className="text-lg text-gray-700 mb-4">Healthy teams have productive disagreements. SMs who can&apos;t facilitate conflict allow dysfunction to fester. This skill includes naming conflicts when others won&apos;t, creating conditions for honest conversation, and helping teams distinguish between task conflict (healthy) and relationship conflict (damaging).</p>

          <SkillsRadar />

          <PullQuote attribution="Engineering Manager, SAFe enterprise">
            The SMs who make the biggest difference on my teams aren&apos;t the ones who know every Scrum rule — it&apos;s the ones who can walk into a tense retrospective and get the real conversation out of people. That&apos;s not a certification skill. That&apos;s something you have to practice deliberately over years.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do Scrum Masters need technical (software development) skills?</p>
              <p className="text-lg text-gray-700">Technical background helps, but it&apos;s not required. SMs with development experience can better understand team complexity, estimate conversations, and technical debt discussions. However, SMs who are overly technical sometimes drift into solving technical problems rather than coaching teams to solve them. Non-technical SMs with strong coaching skills often outperform technically strong SMs who struggle with team dynamics.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What tools do Scrum Masters use?</p>
              <p className="text-lg text-gray-700">Primarily: Jira or Azure DevOps for backlog and board management, Confluence or Notion for documentation and retrospective notes, Miro or Mural for facilitated workshops, and whatever collaboration tools the team uses. Strong SMs are tool-agnostic — the tools matter less than the practices they support.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long does it take to develop Scrum Master skills?</p>
              <p className="text-lg text-gray-700">Framework knowledge: weeks. Facilitation competence: 6-12 months of active practice. Coaching capability: 2-3 years with deliberate development. Organizational navigation skill: accumulated over a career across multiple organizations. SMs who actively seek feedback, pursue training like SASM, and participate in Communities of Practice develop faster than those who just accumulate years.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What skills do Scrum Master job postings ask for?</p>
              <p className="text-lg text-gray-700">Common requirements: CSM or SSM certification, 2-5 years of Scrum or agile experience, facilitation experience, experience with Jira or similar tools, and increasingly SAFe experience for enterprise roles. What postings often don&apos;t mention but interviewers assess: ability to handle team conflict, coaching maturity, and how you&apos;ve handled organizational impediments.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which skill should I develop first if I&apos;m new to the SM role?</p>
              <p className="text-lg text-gray-700">Facilitation first. It&apos;s the most visible skill in every sprint and the one your team will notice most quickly. Develop retrospective facilitation specifically — it&apos;s where the SM&apos;s impact on team improvement is most direct. From there, develop coaching questions as a natural follow-on to facilitation practice.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Build the Skills Employers Look For</p>
            <p className="mb-5">SSM and SASM certifications develop both framework knowledge and the coaching skills that differentiate experienced Scrum Masters.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                SSM certification
              </Link>
              <Link href="/courses/advanced-scrum-master" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                SASM certification
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
            {" · "}
            <Link href="/blog/agile-coaching-techniques" className="text-[#01203d] underline hover:no-underline">Agile coaching techniques</Link>
            {" · "}
            <Link href="/blog/scrum-master-resume-tips" className="text-[#01203d] underline hover:no-underline">Scrum Master resume tips</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
