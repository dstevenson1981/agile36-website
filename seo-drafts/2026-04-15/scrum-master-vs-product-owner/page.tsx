import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrum Master vs Product Owner: Key Differences Explained | Agile36",
  description:
    "Scrum Master vs Product Owner: what each role does, where they overlap, how they collaborate, and which career path is right for you.",
  keywords: ["scrum master vs product owner", "SM vs PO", "scrum master or product owner", "difference scrum master product owner", "scrum master product owner comparison", "scrum roles explained"],
  openGraph: {
    title: "Scrum Master vs Product Owner: Key Differences Explained",
    description: "What Scrum Masters and Product Owners do, how they differ, and which role fits your skills.",
    url: "https://www.agile36.com/blog/scrum-master-vs-product-owner",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/scrum-master-vs-product-owner" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>The Scrum Master owns the <strong>process</strong>. The Product Owner owns the <strong>product</strong>. Both serve the team and the organization — but from completely different angles. Confusing or combining these roles creates dysfunction.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>The SM removes obstacles, facilitates ceremonies, and coaches agile practices. The PO defines what to build next, maintains the backlog, and represents the customer and stakeholder perspective to the team.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Neither role is above the other — they are <strong>peers with different accountabilities</strong>. In SAFe, the PO is accountable for team backlog content and the SM is accountable for team agile practices and flow.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>Both certifications — <strong>SSM for Scrum Masters</strong> and <strong>POPM for Product Owners</strong> — are recognized credentials that accelerate career progression. They test entirely different knowledge domains.</span></li>
      </ul>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { dim: "Primary accountability", sm: "Team agile practices and process health", po: "Backlog content and product value" },
    { dim: "Main question answered", sm: "\"How are we working?\"", po: "\"What are we building next?\"" },
    { dim: "Runs ceremonies", sm: "Yes — facilitates all Scrum events", po: "Participates; leads backlog refinement" },
    { dim: "Writes user stories", sm: "No — coaches story quality, doesn't write them", po: "Yes — with team input" },
    { dim: "Sets sprint goals", sm: "Facilitates the conversation", po: "Proposes and negotiates with team" },
    { dim: "Manages stakeholders", sm: "Minimal — shields the team", po: "Primary stakeholder interface" },
    { dim: "SAFe certification", sm: "SSM (SAFe Scrum Master)", po: "POPM (SAFe PO/PM)" },
    { dim: "Career path", sm: "SM → SASM → RTE → Agile Coach", po: "PO → Senior PO → PM → Group PM" },
    { dim: "Typical salary range (US)", sm: "$95k–$140k", po: "$90k–$130k" },
  ];
  return (
    <section aria-label="SM vs PO comparison" className="my-10 overflow-x-auto">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">Scrum Master vs Product Owner: Side by Side</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#01203d] text-white">
            <th className="p-3 text-left w-1/3">Dimension</th>
            <th className="p-3 text-left">Scrum Master (SM)</th>
            <th className="p-3 text-left">Product Owner (PO)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.dim} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-semibold text-[#01203d] border-b border-gray-100">{r.dim}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.sm}</td>
              <td className="p-3 text-gray-700 border-b border-gray-100">{r.po}</td>
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
          "The SM-PO relationship is the most important two-person dynamic in Scrum. When it works, the team gets both excellent process and excellent product direction. When it breaks down — through role confusion, competition, or poor communication — the team suffers both.",
          "One person should never hold both SM and PO responsibilities simultaneously. The SM is supposed to hold the PO accountable for backlog quality and availability. That accountability disappears when one person holds both roles.",
          "The SM coaches the PO on agile practices — helping them understand story decomposition, acceptance criteria, and the dynamics of sprint planning. This is a coaching relationship, not a reporting one.",
          "Most people have a natural inclination toward one role. People who energize around customer interaction, product thinking, and prioritization tend toward PO. People who energize around process, team dynamics, and facilitation tend toward SM.",
          "For career clarity: SSM certification is for practitioners who want to develop or formalize their Scrum Master skills. POPM certification is for practitioners in or transitioning to product ownership roles. They are different exams testing different knowledge.",
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

export default function ScrumMasterVsProductOwnerPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Scrum Master vs Product Owner: Key Differences Explained
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>Scrum Master vs Product Owner</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Role Comparison</span>
          <span className="text-sm text-[#718aa5]">Comparison Guide · 8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Scrum Master vs Product Owner: Key Differences Explained
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Scrum Master and Product Owner are two of the three core Scrum accountabilities — and they&apos;re often confused with each other, combined into a single role, or poorly defined in job postings. Understanding exactly what each role does, where responsibilities begin and end, and how the two roles collaborate is essential for practitioners pursuing either the{" "}
            <Link href="/courses/scrum-master" className="text-[#01203d] font-semibold underline hover:no-underline">SSM certification</Link>{" "}
            or the{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">POPM certification</Link>.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Fundamental Difference: Process vs Product</h2>
          <p className="text-lg text-gray-700 mb-4">
            The simplest way to remember the distinction: the Scrum Master is the process owner and the Product Owner is the product owner. The SM asks &quot;how are we working together?&quot; — and coaches the team toward better agile practices. The PO asks &quot;what should we build next?&quot; — and makes prioritization decisions that maximize the product&apos;s value.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Neither owns the other&apos;s domain. The SM doesn&apos;t tell the PO which stories to prioritize. The PO doesn&apos;t tell the SM how to run ceremonies. When one role intrudes on the other&apos;s domain, teams lose both process clarity and product direction.
          </p>

          <ComparisonTable />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How SM and PO Work Together</h2>
          <p className="text-lg text-gray-700 mb-4">
            The SM and PO relationship is most visible in sprint planning and backlog refinement. In sprint planning, the PO presents the prioritized backlog and the sprint goal, while the SM facilitates the team&apos;s capacity planning and commitment conversation. In refinement, the PO provides business context and acceptance criteria while the SM ensures the process stays productive and all voices are heard.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The SM also supports the PO&apos;s effectiveness: coaching on story decomposition, helping manage stakeholder dynamics that affect backlog quality, and protecting the PO from scope creep or ad-hoc requests that undermine sprint planning.
          </p>

          <PullQuote attribution="Senior Product Owner, SaaS platform">
            The best Scrum Masters I&apos;ve worked with made me better at my job without telling me what to do. They&apos;d ask questions like &apos;what would a customer say about this acceptance criterion?&apos; or &apos;have we considered what the team will need to clarify before they can commit to this?&apos; They didn&apos;t know the product — but they knew the questions that made me think harder about it.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can one person be both Scrum Master and Product Owner?</p>
              <p className="text-lg text-gray-700">Scrum explicitly discourages this because the SM is supposed to hold the PO accountable for backlog quality and engagement. That accountability breaks down when one person holds both roles. Small startups sometimes combine the roles out of necessity, but it creates role conflicts in practice — the PO half wants to push stories into sprints while the SM half should be asking whether the sprint goal is realistic.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which role pays more?</p>
              <p className="text-lg text-gray-700">They&apos;re comparable at the team level — both typically range from $90k–$140k depending on experience and location. PMs (not POs) earn more than SMs at senior levels because the PM role requires broader business skills. RTEs earn more than Scrum Masters. The larger salary differences come from moving up within a career path, not from choosing between SM and PO.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Which role is better for someone transitioning from software development?</p>
              <p className="text-lg text-gray-700">Both are common transitions. Developers who enjoyed mentoring teammates, facilitating technical discussions, and removing blockers often move toward the SM path. Developers with strong product instincts, stakeholder interest, and experience writing requirements tend toward the PO path. Neither is inherently better — they depend on what energizes you.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Does the SM or PO run sprint planning?</p>
              <p className="text-lg text-gray-700">The SM facilitates sprint planning. The PO presents the sprint goal and prioritized backlog items. The development team does the work of identifying what they can commit to. Sprint planning is a collaboration — not a ceremony any single person owns — but the SM is responsible for ensuring it runs effectively.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do the SM and PO attend the same ceremonies?</p>
              <p className="text-lg text-gray-700">Both attend sprint planning, sprint review, and retrospective. The PO participates in daily standup but typically doesn&apos;t run it. The SM facilitates all of them. Backlog refinement sessions involve both, with the PO providing business context and the SM facilitating team discussion and decomposition.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Get Certified in Your Role</p>
            <p className="mb-5">SSM certification for Scrum Masters. POPM certification for Product Owners. Both include SAFe exam preparation and role-specific training.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses/scrum-master" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
                SSM certification
              </Link>
              <Link href="/courses/product-owner-manager" className="inline-block border-2 border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-[#01203d]">
                POPM certification
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/product-owner-vs-product-manager" className="text-[#01203d] underline hover:no-underline">Product Owner vs Product Manager</Link>
            {" · "}
            <Link href="/blog/scrum-master-career-path" className="text-[#01203d] underline hover:no-underline">Scrum Master career path</Link>
            {" · "}
            <Link href="/blog/scrum-master-vs-project-manager" className="text-[#01203d] underline hover:no-underline">Scrum Master vs Project Manager</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
