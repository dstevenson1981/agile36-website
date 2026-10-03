import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { loadInsights, type CountRow, type SourceRow } from "@/app/lib/insights-dashboard";
import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Site insights | Agile36",
  robots: "noindex, nofollow",
};

const OWNER_EMAILS = new Set(["d.stevenson@agile36.com", "d.stevenso1@agile36.com"]);

function formatCount(value: number | null): string {
  if (value == null) return "—";
  return value.toLocaleString("en-US");
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#1f2c4a]">{value}</p>
      <p className="mt-1 text-xs text-[#64748b]">{note}</p>
    </div>
  );
}

function Setup({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-[#d97706]/25 bg-[#fff7ed] p-5">
      <p className="text-sm font-semibold text-[#1f2c4a]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#475569]">{message}</p>
    </div>
  );
}

function RankList({ rows, empty }: { rows: CountRow[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="text-sm text-[#64748b]">{empty}</p>;
  }
  const max = Math.max(...rows.map((row) => row.sessions), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-[#1f2c4a]">{row.name}</span>
            <span className="shrink-0 font-semibold text-[#1f2c4a]">{row.sessions.toLocaleString("en-US")}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#1f2c4a]/10">
            <div
              className="h-full rounded-full bg-[#d97706]"
              style={{ width: `${Math.max(6, (row.sessions / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SourceList({ rows, empty }: { rows: SourceRow[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="text-sm text-[#64748b]">{empty}</p>;
  }
  return (
    <ul className="divide-y divide-[#1f2c4a]/10">
      {rows.map((row) => (
        <li key={`${row.source}-${row.medium}`} className="flex items-center justify-between gap-3 py-2.5 text-sm">
          <span className="text-[#1f2c4a]">
            {row.source}
            <span className="text-[#94a3b8]"> / {row.medium}</span>
          </span>
          <span className="font-semibold text-[#1f2c4a]">{row.sessions.toLocaleString("en-US")}</span>
        </li>
      ))}
    </ul>
  );
}

function Panel({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-normal tracking-[-0.03em] text-[#1f2c4a]">{title}</h2>
      <p className="mt-1 text-xs text-[#64748b]">{note}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function InsightsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.trim().toLowerCase() || "";
  if (!email || !OWNER_EMAILS.has(email)) {
    redirect(`/account/login?next=${encodeURIComponent("/admin/insights")}`);
  }

  const insights = await loadInsights();
  const aiSessions = insights.google.ai.reduce((sum, row) => sum + row.sessions, 0);
  const socialSessions = insights.google.social.reduce((sum, row) => sum + row.sessions, 0);

  return (
    <main className="min-h-screen bg-[#f6f9fd] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d97706]">One view</p>
        <h1 className="mt-2 text-3xl font-normal tracking-[-0.03em] text-[#1f2c4a] sm:text-4xl">
          Site insights
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#475569]">
          Traffic, social, and AI referrals from Google Analytics, plus the behavior numbers from Clarity.
          Session recordings and heatmaps stay in Clarity. Neither tool can show the question someone typed into ChatGPT.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Visits" value={formatCount(insights.google.sessions)} note="Google Analytics · 28 days" />
          <Stat label="People" value={formatCount(insights.google.users)} note="Google Analytics · 28 days" />
          <Stat label="From AI" value={insights.google.connected ? aiSessions.toLocaleString("en-US") : "—"} note="ChatGPT, Claude, Gemini, Perplexity, and others" />
          <Stat label="From social" value={insights.google.connected ? socialSessions.toLocaleString("en-US") : "—"} note="LinkedIn, Facebook, Instagram, X, TikTok, YouTube" />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {insights.google.setup ? <Setup title="Google Analytics is not connected to this page yet" message={insights.google.setup} /> : null}
          {insights.google.error ? <Setup title="Google Analytics could not be read" message={insights.google.error} /> : null}
          {insights.clarity.setup ? <Setup title="Clarity is not connected to this page yet" message={insights.clarity.setup} /> : null}
          {insights.clarity.error ? <Setup title="Clarity could not be read" message={insights.clarity.error} /> : null}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Panel title="Referred by AI" note={insights.google.rangeLabel}>
            <SourceList
              rows={insights.google.ai}
              empty={insights.google.connected ? "No AI referrals in this period." : "Connect Google Analytics to see this."}
            />
          </Panel>
          <Panel title="Referred by social" note={insights.google.rangeLabel}>
            <SourceList
              rows={insights.google.social}
              empty={insights.google.connected ? "No social referrals in this period. Posts without campaign links often show up as Direct." : "Connect Google Analytics to see this."}
            />
          </Panel>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Panel title="Where visits came from" note="Google Analytics channels">
            <RankList rows={insights.google.channels} empty="No channel data yet." />
          </Panel>
          <Panel title="Top landing pages" note="Google Analytics">
            <RankList rows={insights.google.pages} empty="No page data yet." />
          </Panel>
          <Panel title="Countries" note="Google Analytics">
            <RankList rows={insights.google.countries} empty="No country data yet." />
          </Panel>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-normal tracking-[-0.03em] text-[#1f2c4a]">What people did on the page</h2>
          <p className="mt-1 text-sm text-[#64748b]">Clarity, last 3 days. Microsoft only exports this window.</p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Clarity sessions" value={formatCount(insights.clarity.sessions)} note="Includes real visits" />
          <Stat label="Clarity people" value={formatCount(insights.clarity.users)} note="Distinct users" />
          <Stat label="Rage clicks" value={formatCount(insights.clarity.rageClicks)} note="Repeated clicks on something that did not respond" />
          <Stat label="Dead clicks" value={formatCount(insights.clarity.deadClicks)} note="Clicks on something that was not a link" />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Clarity sources" note={insights.clarity.rangeLabel}>
            <RankList rows={insights.clarity.sources} empty={insights.clarity.connected ? "No source breakdown yet." : "Connect Clarity to see this."} />
          </Panel>
          <Panel title="Pages people used" note="Clarity">
            <RankList rows={insights.clarity.pages} empty={insights.clarity.connected ? "No page breakdown yet." : "Connect Clarity to see this."} />
          </Panel>
        </div>

        {insights.google.devices.length > 0 ? (
          <div className="mt-4">
            <Panel title="Devices" note="Google Analytics">
              <RankList rows={insights.google.devices} empty="" />
            </Panel>
          </div>
        ) : null}
      </div>
    </main>
  );
}
