import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Story Writing Guide: How to Write Stories Teams Can Actually Build | Agile36",
  description:
    "How to write user stories that are clear, estimable, and buildable. Covers story format, acceptance criteria, splitting techniques, and common mistakes.",
  keywords: [
    "user story writing guide",
    "how to write user stories",
    "user story format",
    "acceptance criteria examples",
    "agile user stories",
    "user story best practices",
  ],
  openGraph: {
    title: "User Story Writing Guide: How to Write Stories Teams Can Actually Build",
    description: "Story format, acceptance criteria, splitting techniques, and common user story mistakes.",
    url: "https://www.agile36.com/blog/user-story-writing-guide",
    siteName: "Agile36",
    type: "article",
  },
  alternates: { canonical: "https://www.agile36.com/blog/user-story-writing-guide" },
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
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">01</span><span>A good user story expresses <strong>who wants what and why</strong> — not how to build it. Implementation decisions belong to the development team.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">02</span><span>Acceptance criteria are not optional — they're what makes a story buildable. A story without acceptance criteria is a wish, not a work item.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">03</span><span>Stories that are too large cause sprint planning problems. A story that can't be completed in a sprint should be <strong>split</strong>, not estimated larger.</span></li>
        <li className="flex gap-3"><span className="text-yellow-500 font-bold">04</span><span>The <strong>INVEST criteria</strong> (Independent, Negotiable, Valuable, Estimable, Small, Testable) is the practical quality check for every story.</span></li>
      </ul>
    </section>
  );
}

function InvestGrid() {
  const criteria = [
    { letter: "I", word: "Independent", desc: "Stories should be deliverable without requiring other stories to be completed first. Dependencies slow teams and create planning complexity." },
    { letter: "N", word: "Negotiable", desc: "The solution is open for discussion. Only the outcome is fixed. Teams shouldn't receive stories with prescribed solutions baked in." },
    { letter: "V", word: "Valuable", desc: "Every story should deliver value to a user, customer, or the business. If you can't articulate the value, don't refine the story yet." },
    { letter: "E", word: "Estimable", desc: "The team must be able to estimate the story. If they can't, it needs more clarification or a spike to reduce uncertainty." },
    { letter: "S", word: "Small", desc: "Stories should be completable within one sprint. Larger stories need to be split before entering sprint planning." },
    { letter: "T", word: "Testable", desc: "Acceptance criteria must be verifiable. If there's no way to test whether the story is done, the criteria need to be more specific." },
  ];
  return (
    <section aria-label="INVEST criteria for user stories" className="my-10">
      <h3 className="text-xl font-bold text-[#01203d] mb-4">The INVEST Criteria</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteria.map((c) => (
          <div key={c.letter} className="flex gap-4 border border-gray-200 rounded-xl p-4">
            <div className="bg-[#01203d] text-yellow-400 font-bold text-2xl rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">{c.letter}</div>
            <div>
              <div className="font-bold text-gray-900 mb-1">{c.word}</div>
              <p className="text-sm text-gray-600">{c.desc}</p>
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
  const items = [
    "The user story format is a conversation starter, not a requirements document. The real value is in the discussion it triggers.",
    "Acceptance criteria should be written in Given-When-Then or simple checklist format — both work. Pick one and be consistent.",
    "Never let implementation language into a story description. 'As a user, I want a REST API endpoint that...' is not a user story — it's a technical task in disguise.",
    "Split large stories by business rule, workflow steps, or role — not by technical layer. Each piece should deliver independent value.",
    "Product Owners who write stories in isolation from developers consistently produce stories that need significant re-work during refinement.",
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

export default function UserStoryWritingGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        <BlogHeroDots />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          User Story Writing Guide: How to Write Stories Teams Can Actually Build
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link><span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link><span>/</span>
          <span>User Story Writing Guide</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">Agile Practices</span>
          <span className="text-sm text-[#718aa5]">How-To Guide · 9 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          User Story Writing Guide: How to Write Stories Teams Can Actually Build
        </h1>
        <p className="text-base text-gray-500 mb-10">By Agile36 · SAFe Silver Partner · Updated April 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            User stories are the most misunderstood agile artifact. They look simple — "As a [role], I want [feature], so that [benefit]" — but getting them right requires discipline that most teams skip. The result is backlogs full of stories that are too large to estimate, too vague to build, or written backwards from technical solutions rather than user outcomes. The{" "}
            <Link href="/courses/product-owner-manager" className="text-[#01203d] font-semibold underline hover:no-underline">SAFe POPM course</Link>{" "}
            covers story writing as a core skill — this guide distills the key principles.
          </p>

          <ExecutiveSummary />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The User Story Format</h2>
          <p className="text-lg text-gray-700 mb-4">
            The canonical format — "As a [role], I want [feature], so that [benefit]" — exists to keep the conversation focused on the user, not the system. Each part does specific work:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 my-6 space-y-4">
            <div className="flex gap-3">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded px-2 py-1 text-xs flex-shrink-0">AS A</div>
              <p className="text-gray-700 text-sm">The role or persona who has the need. Be specific: "registered customer" not just "user." Different users have different needs — vague role descriptions lead to vague solutions.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded px-2 py-1 text-xs flex-shrink-0">I WANT</div>
              <p className="text-gray-700 text-sm">The capability or outcome — not the implementation. "I want to reset my password" not "I want a password reset API endpoint." Solutions are for the dev team to decide.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-[#01203d] text-yellow-400 font-bold rounded px-2 py-1 text-xs flex-shrink-0">SO THAT</div>
              <p className="text-gray-700 text-sm">The business reason or user benefit. This is the most important part and the most often skipped. It tells the team WHY the story matters, which helps them make good implementation decisions.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Writing Acceptance Criteria</h2>
          <p className="text-lg text-gray-700 mb-4">
            Acceptance criteria define the conditions under which a story is complete. They turn "we think we know what done means" into "we have a shared, testable definition of done." Two common formats work well:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-[#01203d] text-white rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold mb-3">Given-When-Then (BDD format)</h4>
              <div className="text-sm text-gray-200 space-y-2">
                <p><strong>Given</strong> I am a registered user who has forgotten my password</p>
                <p><strong>When</strong> I click "Forgot password" and enter my email</p>
                <p><strong>Then</strong> I receive a reset link within 2 minutes and can set a new password</p>
              </div>
            </div>
            <div className="bg-[#134263] text-white rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold mb-3">Checklist Format</h4>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>✓ Reset link expires after 24 hours</li>
                <li>✓ Invalid email shows appropriate error message</li>
                <li>✓ Reset link is single-use</li>
                <li>✓ Email arrives within 2 minutes of request</li>
                <li>✓ New password must meet existing complexity rules</li>
              </ul>
            </div>
          </div>

          <InvestGrid />

          <PullQuote attribution="Product Owner, enterprise SaaS">
            When I started writing acceptance criteria before the story was fully understood, refinement sessions went from 20 minutes per story to 5. The questions the team asked at refinement were already answered.
          </PullQuote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">How to Split Large Stories</h2>
          <p className="text-lg text-gray-700 mb-4">
            Large stories — epics that take multiple sprints — need to be split before they enter sprint planning. The most effective splitting patterns:
          </p>
          <div className="space-y-3 my-6">
            {[
              { pattern: "Split by workflow steps", example: "Full checkout flow → View cart | Enter shipping | Enter payment | Confirm order" },
              { pattern: "Split by business rules", example: "Discount system → Apply promo codes | Apply member discounts | Apply volume discounts" },
              { pattern: "Split by user role", example: "Dashboard → Admin dashboard | User dashboard | Manager dashboard" },
              { pattern: "Split by data input", example: "Search → Search by keyword | Search by category | Search by price range" },
              { pattern: "Happy path first, edge cases later", example: "Login → Happy path login first | Then: forgot password | Then: locked account handling" },
            ].map((s) => (
              <div key={s.pattern} className="border border-gray-200 rounded-xl p-4">
                <div className="font-bold text-[#01203d] text-sm mb-1">{s.pattern}</div>
                <div className="text-gray-600 text-sm">{s.example}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 my-6">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">How long should a user story be?</p>
              <p className="text-lg text-gray-700">The story description should be 1–3 sentences. Acceptance criteria should be 3–8 bullet points or Given-When-Then scenarios. Stories longer than that are usually epics that need splitting. More detail belongs in linked documentation, not the story itself.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Who writes user stories?</p>
              <p className="text-lg text-gray-700">Typically the Product Owner, often with input from UX, business stakeholders, and key developers. The best stories are written collaboratively — PO frames the what and why, developers flag technical constraints, UX contributes user context.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">What's the difference between a story and an epic?</p>
              <p className="text-lg text-gray-700">An epic is a large body of work — too big for one sprint. Stories are work items that can be completed within a sprint. The relationship is hierarchical: epics are broken into stories, which are broken into tasks during sprint planning.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Do user stories work in SAFe?</p>
              <p className="text-lg text-gray-700">Yes. SAFe uses stories at the team level, features at the program level, and capabilities/epics at the portfolio level. The story format is the same — what changes is the scale and the mapping to PI objectives during PI Planning.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">Can technical tasks be written as user stories?</p>
              <p className="text-lg text-gray-700">Technical tasks that enable user value can often be framed as stories: "As the development team, we need to upgrade the authentication library so that we maintain security compliance." Infrastructure and architectural work sometimes doesn't map cleanly — in those cases, "enabler stories" are a recognized SAFe pattern.</p>
            </div>
          </div>

          <KeyTakeaways />

          <div className="bg-[#01203d] text-white rounded-xl p-8 text-center mb-8">
            <p className="text-xl font-bold mb-3">Become a SAFe Product Owner / Product Manager</p>
            <p className="mb-5">User story writing, backlog management, and PI Planning — covered in the SAFe POPM course.</p>
            <Link href="/courses/product-owner-manager" className="inline-block bg-yellow-400 text-[#01203d] font-bold px-6 py-3 rounded-full hover:bg-yellow-300">
              View POPM course
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Related reading:{" "}
            <Link href="/blog/backlog-grooming-best-practices" className="text-[#01203d] underline hover:no-underline">Backlog grooming best practices</Link>
            {" · "}
            <Link href="/blog/definition-of-done-examples" className="text-[#01203d] underline hover:no-underline">Definition of done examples</Link>
            {" · "}
            <Link href="/courses/scrum-master" className="text-[#01203d] underline hover:no-underline">Scrum Master course</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
