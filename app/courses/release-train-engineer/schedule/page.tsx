import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private RTE Class | Agile36",
  description:
    "SAFe Release Train Engineer training is offered as a private cohort. Contact Agile36 to register.",
  robots: { index: false, follow: false },
};

/** Former public schedule URL — no open enrollment dates. */
export default function RtePublicScheduleRetiredPage() {
  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
          Private class
        </p>
        <h1
          className="mt-3 text-3xl font-normal text-[#1f2c4a]"
          style={{ letterSpacing: "-0.03em" }}
        >
          RTE schedules are not listed publicly
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#64748b]">
          SAFe Release Train Engineer cohorts are arranged privately. Contact us
          to discuss dates, pricing, and registration.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact?course=release-train-engineer"
            className="inline-flex rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16243f]"
          >
            Contact Us to Register
          </Link>
          <Link
            href="/courses/release-train-engineer"
            className="inline-flex rounded-lg border border-[#1f2c4a]/20 px-5 py-2.5 text-sm font-medium text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.06]"
          >
            View course
          </Link>
        </div>
      </div>
    </main>
  );
}
