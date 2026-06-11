import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFe Roles and Responsibilities: Every Key Role Explained | Agile36",
  description:
    "SAFe roles and responsibilities explained: every key role in the SAFe framework from Scrum Master to RTE to Business Owner — what they do, who fills them, and how they work together.",
  keywords: ["SAFe roles and responsibilities", "SAFe roles explained", "SAFe role overview", "SAFe ART roles", "who does what in SAFe", "SAFe framework roles"],
  openGraph: {
    title: "SAFe Roles and Responsibilities: Every Key Role Explained",
    description: "What every key SAFe role does, who fills it, and how roles work together across teams and the ART.",
    url: "https://www.agile36.com/blog/safe-roles-responsibilities",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/safe-roles-responsibilities" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>SAFe defines roles at <strong>three levels</strong>: team level (Scrum Master, Product Owner, Development Team), program level (RTE, Product Manager, System Architect, Business Owners), and portfolio level (LPM function, Enterprise Architect).</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The <strong>Release Train Engineer</strong> is the most distinctive SAFe role — a servant leader and coach for the entire ART. RTEs facilitate PI Planning, track ART-level impediments, and coordinate between teams. There&apos;s no Scrum equivalent.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>SAFe distinguishes <strong>Product Owner</strong> (team-level backlog management) from <strong>Product Manager</strong> (program-level vision and roadmap). This split creates explicit ownership at two planning horizons — a key difference from non-SAFe agile environments.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span><strong>Business Owners</strong> are key stakeholders with financial or reputational accountability for ART delivery. They attend PI Planning, assign business value to team PI Objectives, and serve as the primary business connection for the ART.</span></li>
      </ul>
    </section>
  );
}

function RolesGrid() {
  const roles = [
    { role: "Scrum Master (SM)", level: "Team", accountability: "Team ceremonies, impediment removal, coaching agile practices" },
    { role: "Product Owner (PO)", level: "Team", accountability: "Team backlog, story readiness, iteration priority" },
    { role: "Development Team", level: "Team", accountability: "Building, testing, delivering working software each iteration" },
    { role: "Release Train Engineer (RTE)", level: "Program", accountability: "ART operations, PI facilitation, program-level impediments" },
    { role: "Product Manager (PM)", level: "Program", accountability: "Program backlog, vision, feature prioritization, stakeholder alignment" },
    { role: "System Architect", level: "Program", accountability: "Architecture runway, technical direction, cross-team enablers" },
    { role: "Business Owner", level: "Program", accountability: "Business value, strategic alignment, PI Objective scoring" },
    { role: "Lean Portfolio Management", level: "Portfolio", accountability: "Lean Budgets, value stream governance, portfolio Kanban" },
    { role: "Enterprise Architect", level: "Portfolio", accountability: "Portfolio-level technical strategy, cross-value-stream architecture" },
  ];
  return (
    <section aria-label="SAFe roles grid" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">SAFe Roles by Level</h3>
      <div className="space-y-2">
        {roles.map((r) => (
          <div key={r.role} className={`flex gap-3 p-4 rounded-xl items-start ${r.level === "Portfolio" ? "bg-[#01203d] text-white" : r.level === "Program" ? "bg-[#134263] text-white" : "bg-gray-50"}`}>
            <div className="flex-1">
              <p className={`font-bold text-sm ${r.level !== "Team" ? "text-white" : "text-[#01203d]"}`}>{r.role}</p>
              <p className={`text-xs mt-1 ${r.level !== "Team" ? "text-gray-300" : "text-gray-600"}`}>{r.accountability}</p>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-semibold whitespace-nowrap ${r.level === "Portfolio" ? "bg-yellow-400 text-[#01203d]" : r.level === "Program" ? "bg-yellow-400 text-[#01203d]" : "bg-[#01203d] text-white"}`}>{r.level}</span>
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
          "The RTE and Product Manager roles are unique to SAFe — they have no Scrum equivalents. Organizations adopting SAFe need to either hire for these roles or develop existing practitioners into them. Both require specific certification and experience that team-level practitioners typically lack initially.",
          "The PO/PM split is one of SAFe's most important structural choices. Without explicit ownership at the program level (PM), teams receive features without context about why they matter or how they connect to strategy. Without team-level ownership (PO), the program backlog doesn't translate into actionable team work.",
          "Business Owners are often underutilized in SAFe implementations. Their role at PI Planning — attending, asking questions, and scoring PI Objectives with business value — is essential for connecting team delivery to business strategy. ARTs where Business Owners attend in name only miss the primary feedback mechanism the role provides.",
          "The System Architect role is often filled by senior engineers who wear both technical leadership and SAFe-role hats. The key accountability is maintaining the architecture runway — the technical infrastructure and shared services that allow teams to deliver features without creating long-term technical debt.",
          "Portfolio-level roles (LPM function, Enterprise Architect) are often the last to be filled in a SAFe transformation. Organizations launch ARTs with team and program roles filled, then develop the portfolio level over time. This is acceptable as a sequencing choice but risks disconnecting the ARTs from strategic investment decisions.",
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

export default function SafeRolesResponsibilitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          SAFe Roles and Responsibilities: Every Key Role Explained
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>SAFe Roles and Responsibilities</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">SAFe Framework</span>
          <span className="text-sm text-[#718aa5]">Reference Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SAFe Roles and Responsibilities: Every Key Role Explained
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            SAFe defines a specific set of roles at team, program, and portfolio levels — each with clear accountabilities that complement but don&apos;t overlap with each other. Understanding who does what is essential for practitioners joining SAFe environments and for organizations designing their first ART. The{" "}
            <Link href="/courses/leading-safe" className="text-[#01203d] font-semibold underline hover:no-underline">Leading SAFe certification</Link>{" "}
            provides the full framework context for understanding how these roles work together across the ART.
          </p>

          <ExecutiveSummary />

          <RolesGrid />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How SAFe Roles Work Together at PI Planning</h2>
          <p className="text-lg text-gray-700 mb-4">
            PI Planning is the event that most clearly demonstrates how SAFe roles collaborate. Business Owners and Product Managers present the business context and program vision. Product Owners and development teams plan iteration by iteration. The RTE facilitates, manages the overall event, and tracks dependencies. System Architects provide technical guidance during planning. The output — PI Objectives from every team, a program board of dependencies, and risks — requires all roles working in concert.
          </p>

          <PullQuote attribution="Release Train Engineer, healthcare technology">
            The clearest sign of a healthy ART is what happens in the breakout sessions at PI Planning. Teams are talking to other teams, Product Owners are calling Product Managers for clarification, Business Owners are answering questions they didn&apos;t expect. That cross-role interaction is the point. An ART where every role stays in its lane during PI Planning hasn&apos;t understood why the roles exist.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can one person hold multiple SAFe roles?</p>
              <p className="text-lg text-gray-700">Some role combinations are common — a senior developer might also serve as the System Architect in a smaller ART. But SM and PO roles should generally not be combined, as they have different accountability orientations. The RTE role is typically full-time for ARTs of meaningful size — combining it with SM or coaching roles is possible but reduces effectiveness.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What is the difference between Product Owner and Product Manager in SAFe?</p>
              <p className="text-lg text-gray-700">Product Owners work at the team level — managing the team backlog, writing stories, and prioritizing iteration work. Product Managers work at the program level — managing the program backlog, defining features, and maintaining the product vision and roadmap. POs execute what PMs plan. In non-SAFe environments, one role often covers both responsibilities.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What certifications do SAFe roles require?</p>
              <p className="text-lg text-gray-700">Scrum Masters typically hold SSM (SAFe Scrum Master). RTEs hold the RTE certification. Product Owners hold POPM (SAFe Product Owner Product Manager). Leaders and Business Owners typically hold SA (Leading SAFe). LPM function members hold the LPM certification. Certifications are strongly recommended but not always formally required in practice.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who is the most important role in SAFe?</p>
              <p className="text-lg text-gray-700">Every role question of this type has the same honest answer: the most important role is the one that&apos;s vacant or underperforming in your ART. That said, the RTE has the broadest cross-team impact — a strong RTE dramatically improves ART performance, while a weak RTE creates coordination gaps that cascade across all teams.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do SAFe roles have official salary ranges?</p>
              <p className="text-lg text-gray-700">SAFe doesn&apos;t publish salary ranges, but market data shows consistent patterns. RTEs typically earn $130k–$185k. Product Managers earn $115k–$170k. Senior Scrum Masters and coaches earning $95k–$140k. Business Owners are typically senior leaders at VP or director level. Salaries vary significantly by industry, organization size, and geography.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get Certified for Your SAFe Role</p>
            <p className="mb-5">We offer certifications for every key SAFe role — from Scrum Master and POPM to RTE and LPM. Find the right course for your role.</p>
            <Link href="/courses/leading-safe" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View SAFe courses
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/rte-career-path" className="text-[#01203d] underline hover:no-underline">RTE career path</Link>
            {" · "}
            <Link href="/blog/safe-agile-release-train-explained" className="text-[#01203d] underline hover:no-underline">SAFe Agile Release Train explained</Link>
            {" · "}
            <Link href="/blog/scrum-master-vs-product-owner" className="text-[#01203d] underline hover:no-underline">Scrum Master vs Product Owner</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
