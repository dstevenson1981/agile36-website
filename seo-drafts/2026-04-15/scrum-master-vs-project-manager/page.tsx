import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master vs Project Manager: Key Differences Explained | Agile36",
  description:
    "Scrum Master vs Project Manager compared: responsibilities, authority, mindset, and career paths. Which role is right for you and how they interact on agile teams.",
  keywords: ["scrum master vs project manager", "scrum master or project manager", "difference between scrum master and project manager", "SM vs PM", "agile vs traditional project management roles", "scrum master project manager overlap"],
  openGraph: {
    title: "Scrum Master vs Project Manager: Key Differences Explained",
    description: "How Scrum Masters and Project Managers differ in responsibilities, authority, and mindset.",
    url: "https://www.agile36.com/blog/scrum-master-vs-project-manager",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-vs-project-manager" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Scrum Master is a <strong>servant leader</strong> who facilitates, coaches, and removes impediments. The Project Manager is an <strong>authority figure</strong> who assigns, tracks, and reports. The philosophies are fundamentally different.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Project Managers typically own the project plan, timeline, and resource allocation. Scrum Masters own <strong>none of those</strong> — they own the process that allows the team to self-manage its delivery.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Many organizations run both roles simultaneously — the PM owns the business relationship and delivery accountability; the SM owns team facilitation. <strong>Conflict arises</strong> when their scope overlaps.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Project Managers transitioning to Scrum Master must <strong>actively unlearn</strong> control and assignment behaviors — the hardest part isn&apos;t learning Scrum, it&apos;s stopping project manager habits that undermine team self-organization.</span></li>
      </ul>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { dim: "Authority over team", sm: "None — serves the team", pm: "Direct authority over assignments" },
    { dim: "Owns the plan?", sm: "No — team owns the sprint plan", pm: "Yes — owns the project plan" },
    { dim: "Tracks individuals?", sm: "No — tracks process and impediments", pm: "Yes — tracks individual tasks and progress" },
    { dim: "Stakeholder reporting", sm: "Facilitated through PO and sprint review", pm: "Direct stakeholder reports and updates" },
    { dim: "Work assignment", sm: "Team self-assigns work", pm: "PM assigns work to team members" },
    { dim: "Scope changes", sm: "Protects team from mid-sprint scope changes", pm: "Manages scope change process" },
    { dim: "Failure accountability", sm: "Helps team learn from failure; not blamed", pm: "Often accountable for project failure" },
    { dim: "Career path", sm: "Agile Coach, RTE, transformation lead", pm: "Senior PM, Portfolio Manager, PMO Director" },
    { dim: "Key credential", sm: "CSM, SAFe SSM", pm: "PMP, PRINCE2" },
  ];
  return (
    <section aria-label="Scrum Master vs Project Manager comparison" className="my-10 overflow-x-auto">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SM vs PM: Side-by-Side Comparison</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#01203d] text-white">
            <th className="p-3 text-left w-1/3">Dimension</th>
            <th className="p-3 text-left">Scrum Master</th>
            <th className="p-3 text-left">Project Manager</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.dim} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-semibold text-[#01203d] border-b border-gray-100">{r.dim}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.sm}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.pm}</td>
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
          "The SM-PM distinction is philosophical, not just structural. Project management is about planning and controlling uncertainty. Scrum is about embracing uncertainty and adapting through feedback.",
          "A Project Manager who adds the Scrum Master title without changing their behavior undermines team self-organization. The role transition requires genuine behavior change, not just a new title.",
          "In SAFe, the PM role exists separately at the program level (Product Management) — not as a hybrid PM/SM role at the team level. Trying to do both simultaneously creates accountability confusion.",
          "Project Managers who transition to Scrum Master often make excellent senior agile practitioners — their understanding of delivery risk, stakeholder management, and organizational dynamics is an asset when channeled through servant leadership.",
          "If you hold a PMP and are moving into agile, the SSM or SA certification validates your agile framework knowledge while your PM background validates your delivery maturity. Both credentials on a resume signal a complete practitioner.",
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

export default function SMvsPMPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master vs Project Manager: Key Differences Explained
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master vs Project Manager</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Role Comparison</span>
          <span className="text-sm text-[#718aa5]">Comparison Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master vs Project Manager: Key Differences Explained
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Scrum Master and Project Manager roles are often confused — especially as organizations transition from traditional to agile delivery. They both involve coordinating work and helping teams deliver, but the philosophy, authority, and behaviors are fundamentally different. Understanding the distinction matters whether you&apos;re a PM considering a career pivot or an organization deciding how to structure teams. The{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe Scrum Master certification</Link>{" "}
            is the common transition path for PMs moving into agile delivery roles.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Core Philosophical Difference</h2>
          <p className="text-lg text-gray-700 mb-4">
            Traditional project management is built on the assumption that uncertainty can be reduced through planning. If you plan well enough, you can predict cost, timeline, and scope accurately. The PM&apos;s job is to create that plan and then track execution against it — managing variances when reality deviates.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Scrum is built on the opposite assumption: that uncertainty in complex work cannot be eliminated through planning. The goal is to build in feedback loops that let the team learn and adapt faster than uncertainty grows. The SM&apos;s job is to protect those feedback loops, help the team self-organize, and remove anything that blocks adaptation.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            This is why SM-PM role hybrids usually fail. A person who holds both mindsets simultaneously tends to default to the PM behaviors — tracking, controlling, escalating — when pressure increases. Those behaviors undermine exactly the team autonomy that makes agile work.
          </p>

          <ComparisonTable />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">When Both Roles Exist in the Same Organization</h2>
          <p className="text-lg text-gray-700 mb-4">
            Many organizations run agile teams within traditional project structures — especially in regulated industries, defense, and large enterprise. In these environments, both a PM and an SM may be involved with the same team. This can work when their scope is clearly defined and non-overlapping.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            A reasonable boundary: the PM owns the external relationship (stakeholder reporting, contract management, resource allocation across projects). The SM owns the internal relationship (team process, sprint facilitation, impediment removal). Conflict arises when the PM tries to assign tasks, influence sprint priorities, or use SM events as status meetings — and when the SM fails to give the PM visibility into what the team is delivering.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In SAFe organizations, the program-level coordination that PMs traditionally own moves to the Product Management role and the RTE. Team-level PMs become redundant as organizations mature — which is why SM certification is the most common transition path for experienced PMs in SAFe adoptions.
          </p>

          <PullQuote attribution="Former Project Manager, turned Agile Coach">
            I had 12 years as a PM before I became a Scrum Master. The knowledge transferred — the behaviors didn&apos;t. I spent my first year as an SM fighting the instinct to assign tasks, create Gantt charts, and manage stakeholders directly. The role transition is a genuine identity shift, not a credential swap.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can a Project Manager become a Scrum Master?</p>
              <p className="text-lg text-gray-700">Yes, and it&apos;s a common transition. PMs have valuable delivery instincts — risk awareness, stakeholder management, dependency tracking — that make excellent raw material for senior Scrum Masters. The transition requires actively learning servant leadership behaviors and setting aside control instincts that worked in traditional environments. The CSM or SSM certification is typically the first credential in this transition.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Is the Scrum Master more senior than the Project Manager?</p>
              <p className="text-lg text-gray-700">Not inherently — they&apos;re different roles with different scope. Senior Scrum Masters and senior Project Managers earn comparable salaries. In SAFe organizations, senior SM roles (SASM, RTE-adjacent) and senior PM roles (SAFe transformation leads, portfolio managers) are both leadership positions. Neither is inherently senior to the other.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do Scrum Masters need a PMP?</p>
              <p className="text-lg text-gray-700">PMP is not required for Scrum Master roles, and most job postings don&apos;t list it. For practitioners who already have the PMP and are moving to agile roles, it signals delivery seriousness and often impresses hiring managers — especially in hybrid environments. For practitioners starting from scratch, SSM or CSM is a more efficient path to SM employment.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Make the Transition with SAFe SSM Training</p>
            <p className="mb-5">Designed for practitioners transitioning from traditional to agile roles — covering servant leadership, team facilitation, and SAFe team-level practices.</p>
            <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SSM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
            {" · "}
            <Link href="/blog/scrum-master-salary-2026" className="text-[#01203d] underline hover:no-underline">Scrum Master salary 2026</Link>
            {" · "}
            <Link href="/blog/agile-vs-traditional-project-management" className="text-[#01203d] underline hover:no-underline">Agile vs traditional project management</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
