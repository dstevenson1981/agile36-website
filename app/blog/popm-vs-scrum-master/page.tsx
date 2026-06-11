import Link from "next/link";
import type { Metadata } from "next";
import BlogAuthorByline from "@/app/components/blog/BlogAuthorByline";
import EditorialBlogSchemaBlock from "@/app/components/blog/EditorialBlogSchemaBlock";

export const metadata: Metadata = {
  title: "POPM vs Scrum Master (SSM): Roles, Certifications, and Career Fit | Agile36",
  description:
    "SAFe POPM vs Scrum Master compared: backlog vs facilitation, POPM vs SSM certification, who should get which first, and how hiring managers read these credentials.",
  keywords: [
    "POPM vs Scrum Master",
    "SAFe POPM vs SSM",
    "product owner vs scrum master SAFe",
    "POPM or Scrum Master certification",
    "SAFe product manager vs scrum master",
  ],
  openGraph: {
    title: "POPM vs Scrum Master: SAFe certifications and real job roles",
    description:
      "Clarify POPM (product) vs Scrum Master (delivery) in SAFe — certifications, day-to-day work, and how to choose without mixing frameworks.",
    url: "https://www.agile36.com/blog/popm-vs-scrum-master",
    siteName: "Agile36",
    type: "article",
  },
  alternates: {
    canonical: "https://www.agile36.com/blog/popm-vs-scrum-master",
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

export default function PopmVsScrumMasterPage() {
  return (
    <>
      <EditorialBlogSchemaBlock slug="popm-vs-scrum-master" />
      <main className="min-h-screen bg-black text-white">
        <div className="w-full h-64 bg-white/[0.04] border-b border-white/10 relative flex items-center justify-center overflow-hidden">
          <BlogHeroDots />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white text-center px-8 relative z-10">
            POPM vs Scrum Master: Roles and SAFe Certifications
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
            <span>POPM vs Scrum Master</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="border border-white/15 bg-white/[0.06] text-amber-400 text-sm font-semibold px-4 py-1 rounded-full">
              SAFe
            </span>
            <span className="text-sm text-gray-400">Comparison · 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white mb-4 leading-tight">
            POPM vs Scrum Master: What Each Credential Actually Signals
          </h1>
          <BlogAuthorByline verb="By" updated="April 2026" />

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              People conflate <strong>POPM</strong> (SAFe Product Owner/Product
              Manager certification) with <strong>Scrum Master</strong> because
              both show up on Agile Release Trains. They are different jobs: POPM
              is about <em>product content and economic prioritization</em>; the
              Scrum Master is about <em>team process, flow, and facilitation</em>.
              This page compares the <strong>certifications</strong> most
              associated with those tracks in SAFe — POPM versus{" "}
              <strong>SAFe Scrum Master (SSM)</strong> — and when to pursue each.
            </p>

            <section
              aria-label="At a glance"
              className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 md:p-8 my-10 not-prose"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400 font-bold mb-4">
                At a glance
              </p>
              <ul className="space-y-3 text-gray-300 text-[17px] leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">01</span>
                  <span>
                    <strong>POPM</strong> fits backlog owners, PMs/POs on an ART,
                    and anyone judged on roadmap, WSJF-style prioritization, and
                    stakeholder alignment.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">02</span>
                  <span>
                    <strong>SSM</strong> fits Scrum Masters and team leads who
                    facilitate ceremonies, dependencies, and improvement on a
                    train — not the same interview loop as product roles.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">03</span>
                  <span>
                    <strong>Both</strong> are legitimate on a mature ART; choose
                    order based on where you spend calendar time, not title
                    inflation.
                  </span>
                </li>
              </ul>
            </section>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Side-by-side: POPM vs SAFe Scrum Master (SSM)
            </h2>
            <div className="overflow-x-auto mb-10 not-prose">
              <table className="min-w-full text-left text-base border border-white/10">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Dimension</th>
                    <th className="px-4 py-3 font-semibold">POPM</th>
                    <th className="px-4 py-3 font-semibold">SSM (Scrum Master)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-white/10 align-top">
                    <td className="px-4 py-3 font-medium">Primary outcome</td>
                    <td className="px-4 py-3">Right product built for the right customers at sustainable cost of delay</td>
                    <td className="px-4 py-3">Healthy team/ART execution — flow, quality, impediments, improvement</td>
                  </tr>
                  <tr className="border-t border-white/10 align-top">
                    <td className="px-4 py-3 font-medium">Typical artifacts</td>
                    <td className="px-4 py-3">Vision, roadmap, features, stories, acceptance, stakeholder tradeoffs</td>
                    <td className="px-4 py-3">Team process health, PI objectives alignment, facilitation plans, improvement backlogs</td>
                  </tr>
                  <tr className="border-t border-white/10 align-top">
                    <td className="px-4 py-3 font-medium">Ceremony bias</td>
                    <td className="px-4 py-3">Backlog refinement, sprint review content, PI planning business context</td>
                    <td className="px-4 py-3">Standups, retrospectives, team syncs, cross-team dependency sessions</td>
                  </tr>
                  <tr className="border-t border-white/10 align-top">
                    <td className="px-4 py-3 font-medium">Certification focus</td>
                    <td className="px-4 py-3">PO + PM behaviors inside SAFe — program and team backlog mechanics</td>
                    <td className="px-4 py-3">Scrum Master role on an ART — coaching, facilitation, SAFe events</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Official scope (verify before you register)
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Course objectives and exam eligibility change with SAFe version.
              Always confirm the latest description on Scaled Agile&apos;s site:{" "}
              <a
                href="https://scaledagile.com/certification/product-owner-product-manager/"
                className="font-semibold text-amber-400 underline hover:no-underline"
                rel="noopener noreferrer"
              >
                POPM certification
              </a>
              {" · "}
              <a
                href="https://scaledagile.com/certification/safe-scrum-master/"
                className="font-semibold text-amber-400 underline hover:no-underline"
                rel="noopener noreferrer"
              >
                SAFe Scrum Master certification
              </a>
              .
            </p>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Which should you take first?
            </h2>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-300">
              <li>
                <strong>Choose POPM first</strong> if job postings for your target
                role emphasize backlog ownership, roadmap, or PM/PO partnership on
                an ART.
              </li>
              <li>
                <strong>Choose SSM first</strong> if you are (or will be) the
                person facilitating teams through PI execution, dependencies, and
                improvement cycles.
              </li>
              <li>
                <strong>Take Leading SAFe before either</strong> if you are new
                to SAFe vocabulary — it reduces friction in both classrooms.
              </li>
            </ul>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Related comparisons
            </h2>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-300">
              <li>
                <Link href="/blog/ssm-vs-csm" className="font-semibold text-amber-400 underline hover:no-underline">
                  SSM vs CSM
                </Link>{" "}
                — Scrum Master credential comparison (SAFe vs Scrum Alliance).
              </li>
              <li>
                <Link href="/blog/safe-lpm-vs-popm" className="font-semibold text-amber-400 underline hover:no-underline">
                  SAFe LPM vs POPM
                </Link>{" "}
                — portfolio vs product/program certifications.
              </li>
              <li>
                <Link href="/blog/csm-to-safe-upgrade-path" className="font-semibold text-amber-400 underline hover:no-underline">
                  CSM to SAFe upgrade path
                </Link>{" "}
                — if you are arriving from non-SAFe Scrum credentials.
              </li>
            </ul>

            <h2 className="text-3xl font-normal tracking-[-0.03em] text-white mt-10 mb-4">
              Train with Agile36
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Live SAFe classes taught by SPCs with enterprise delivery experience.
            </p>
            <p className="text-lg mb-10">
              <Link
                href="/courses/product-owner-manager"
                className="font-semibold text-amber-400 underline hover:text-amber-300"
              >
                SAFe POPM course →
              </Link>
              {" · "}
              <Link
                href="/courses/scrum-master"
                className="font-semibold text-amber-400 underline hover:text-amber-300"
              >
                SAFe Scrum Master (SSM) course →
              </Link>
            </p>

            <p className="text-base text-gray-400 italic border-t border-white/10 pt-8">
              SAFe, POPM, Scrum Master (SSM), and other certification names are
              trademarks of Scaled Agile, Inc.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
