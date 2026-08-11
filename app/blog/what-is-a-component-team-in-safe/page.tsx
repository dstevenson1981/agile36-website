import Link from "next/link";
import type { Metadata } from "next";
import BlogAuthorByline from "@/app/components/blog/BlogAuthorByline";
import EditorialBlogSchemaBlock from "@/app/components/blog/EditorialBlogSchemaBlock";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";

const PAGE_SEO = {
  title: "What Is a Component Team in SAFe? | Agile36",
  long: "What Is a Component Team in SAFe? (vs. Feature Team)",
} as const;

export const metadata: Metadata = {
  title: PAGE_SEO.title,
  description:
    "Component teams in SAFe are organized around technical components instead of end-to-end features. Here's how they differ from feature teams, when SAFe recommends each, and the tradeoffs.",
  keywords: [
    "component team SAFe",
    "what is a component team in SAFe",
    "component team vs feature team",
    "feature team SAFe",
    "Agile Release Train teams",
    "SAFe team topology",
  ],
  openGraph: {
    images: [...DEFAULT_OG_IMAGES],
    title: PAGE_SEO.long,
    description:
      "Component teams in SAFe are organized around technical components instead of end-to-end features. Here's how they differ from feature teams, when SAFe recommends each, and the tradeoffs.",
    url: "https://www.agile36.com/blog/what-is-a-component-team-in-safe",
    siteName: "Agile36",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_SEO.long,
  },
  alternates: {
    canonical: "https://www.agile36.com/blog/what-is-a-component-team-in-safe",
  },
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          ))}
        </div>
      </div>
    </>
  );
}

export default async function ComponentTeamInSafeBlogPost() {
  return (
    <>
      <EditorialBlogSchemaBlock slug="what-is-a-component-team-in-safe" />
      <main className="min-h-screen bg-black text-white">
        <div className="w-full h-64 bg-white/[0.04] border-b border-white/10 relative flex items-center justify-center overflow-hidden">
          <BlogHeroDots />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white text-center px-8 relative z-10">
            {PAGE_SEO.long}
          </h1>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <span>/</span>
            <span>Component Team in SAFe</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="border border-white/15 bg-white/[0.06] text-amber-400 text-sm font-semibold px-4 py-1 rounded-full">
              Glossary
            </span>
            <span className="text-sm text-gray-400">Definition · 6 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white mb-4 leading-tight">
            {PAGE_SEO.long}
          </h1>
          <BlogAuthorByline verb="By" updated="August 2026" />

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              A component team in SAFe is a cross-functional team organized
              around a single technical component, subsystem, or architectural
              layer — rather than around an end-to-end customer feature. Instead
              of delivering complete slices of value on its own, a component
              team builds and maintains the piece of the system that other teams
              depend on: a shared platform, a hardware subsystem, a core
              services layer, or a piece of infrastructure the rest of the Agile
              Release Train builds on top of.
            </p>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Component Team vs. Feature Team
            </h2>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              SAFe organizes teams around one of two models:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-gray-300 leading-relaxed">
              <li>
                <strong className="text-white">Feature teams</strong> are
                cross-functional and long-lived, and they deliver complete,
                end-to-end customer-facing features on their own — minimizing
                handoffs and dependencies between teams.
              </li>
              <li>
                <strong className="text-white">Component teams</strong> are also
                cross-functional, but they&apos;re organized around a single
                technology component instead of a feature. They build depth in
                one part of the system rather than breadth across the whole
                customer experience.
              </li>
            </ul>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              SAFe generally recommends feature teams as the default, because
              they can deliver value independently without waiting on another
              team to finish their piece first. But component teams still show
              up on most real-world Agile Release Trains — especially where deep
              technical layers (a shared platform, a hardware subsystem, a core
              services layer, or the architectural runway itself) genuinely
              require dedicated, specialized ownership.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              A commonly cited rule of thumb in SAFe practice is roughly a 75/25
              split — mostly feature teams, with a smaller number of component
              teams handling the pieces that don&apos;t decompose cleanly into
              end-to-end slices.
            </p>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Why Component Teams Create More Coordination Overhead
            </h2>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Because a component team&apos;s output feeds into other teams&apos;
              work rather than shipping directly to customers, component teams
              create more cross-team dependencies than feature teams do.
              That&apos;s the central tradeoff:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-gray-300 leading-relaxed">
              <li>
                <strong className="text-white">Feature teams</strong> minimize
                dependencies but require broader skill coverage on each team.
              </li>
              <li>
                <strong className="text-white">Component teams</strong> allow
                deeper technical specialization but create more handoffs, more
                coordination, and more places where one team&apos;s delay blocks
                another team&apos;s plan.
              </li>
            </ul>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              This is exactly why SAFe&apos;s ART-level synchronization events —{" "}
              Scrum of Scrums, PO Sync, and the{" "}
              <Link
                href="/blog/pi-planning-explained"
                className="text-amber-400 font-semibold underline hover:no-underline"
              >
                Program Board
              </Link>{" "}
              built during PI Planning — exist. They&apos;re the mechanism that
              keeps component teams aligned with the feature teams around them,
              surfacing dependencies before they become blockers instead of
              after.
            </p>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              When Component Teams Make Sense
            </h2>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Component teams tend to show up, appropriately, when:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-gray-300 leading-relaxed">
              <li>
                A shared platform or core service genuinely needs one team
                owning its integrity end-to-end (security, performance,
                architectural consistency)
              </li>
              <li>
                Hardware or deeply specialized technical domains don&apos;t
                decompose into customer-facing feature slices
              </li>
              <li>
                The organization is early in a SAFe transformation and
                hasn&apos;t yet restructured around value streams
              </li>
            </ul>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              They tend to become a liability when they&apos;re used as a
              default org-chart holdover from a pre-Agile structure, rather than
              a deliberate choice — at that point, the dependency overhead
              outweighs the specialization benefit, and it&apos;s worth
              revisiting whether the team could be re-formed around a feature
              slice instead.
            </p>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Component Teams and SAFe for Teams Training
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Understanding how your team fits into the Agile Release Train —
              whether structured around features or components — is part of what{" "}
              <Link
                href="/courses/safe-for-teams"
                className="text-amber-400 font-semibold underline hover:no-underline"
              >
                SAFe for Teams
              </Link>{" "}
              certification training covers, alongside how to work effectively
              within an ART regardless of team topology.
            </p>

            <div className="rounded-2xl border border-white/15 bg-white/[0.06] text-white p-8 text-center mb-8">
              <p className="text-xl font-bold mb-3">
                Learn how ARTs actually run
              </p>
              <p className="mb-5 text-gray-300">
                SAFe for Teams covers team roles, ART ceremonies, and how feature
                and component teams deliver together on a train.
              </p>
              <Link
                href="/courses/safe-for-teams"
                className="inline-block bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-100"
              >
                SAFe for Teams Certification
              </Link>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              Sources: Larman &amp; Vodde, &quot;Scaling Lean &amp; Agile
              Development&quot; (originators of the feature team / component
              team distinction); Team Topologies (Skelton &amp; Pais); Scaled
              Agile Framework official guidance.
            </p>
            <p className="text-sm text-gray-400">
              Related reading:{" "}
              <Link
                href="/blog/pi-planning-explained"
                className="text-amber-400 underline hover:no-underline"
              >
                PI Planning explained
              </Link>
              {" · "}
              <Link
                href="/safe-for-teams-vs-leading-safe"
                className="text-amber-400 underline hover:no-underline"
              >
                SAFe for Teams vs Leading SAFe
              </Link>
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
