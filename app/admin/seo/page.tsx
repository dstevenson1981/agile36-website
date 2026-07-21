"use client";

import { useCallback, useEffect, useState } from "react";

type GapRow = {
  query: string;
  page: string;
  position: number;
  impressions: number;
  clicks: number;
  opportunity_score: number;
};

type SeoData = {
  available: boolean;
  message?: string;
  lastRun: string | null;
  snapshots: { date: string; rows: number }[];
  gapCount: number;
  gapZone: GapRow[];
  queue: string | null;
  history: string | null;
  cronLogTail: string | null;
};

function QueueList({ raw }: { raw: string }) {
  const items = raw
    .split("\n")
    .filter((l) => /^\d+\. \[[ x]\]/.test(l.trim()))
    .map((l) => {
      const done = l.includes("[x]");
      const text = l
        .replace(/^\s*\d+\. \[[ x]\]\s*/, "")
        .replace(/\*\*/g, "")
        .trim();
      return { done, text };
    });
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <span
            className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
              item.done
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-slate-300 bg-white text-transparent"
            }`}
          >
            ✓
          </span>
          <span className={item.done ? "text-slate-400 line-through" : "text-slate-700"}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function AdminSeoPage() {
  const [data, setData] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/seo");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load SEO data");
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load SEO data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runCycle = async () => {
    setRunning(true);
    setRunOutput(null);
    try {
      const res = await fetch("/api/admin/seo/run", { method: "POST" });
      const json = await res.json();
      setRunOutput(json.output || json.error || "No output");
      await load();
    } catch (err) {
      setRunOutput(err instanceof Error ? err.message : "Run failed");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">SEO Agent</h1>
            <p className="mt-2 text-slate-600">
              Gap-zone opportunities, work queue, and run history for agile36.com.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={runCycle}
              disabled={running || !data?.available}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {running ? "Running data cycle…" : "Run data cycle"}
            </button>
            <button
              onClick={load}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading && <p className="text-slate-500">Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {data && !data.available && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
            {data.message}
          </div>
        )}

        {data?.available && (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Last data pull</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">{data.lastRun ?? "—"}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Gap-zone keywords</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">{data.gapCount}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Snapshots</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">{data.snapshots.length}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Auto-run</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">Mondays 6:00 AM</div>
                <div className="text-xs text-slate-500">local cron</div>
              </div>
            </div>

            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-1 text-lg font-semibold text-slate-900">Kick off the agent</h2>
              <p className="mb-3 text-sm text-slate-600">
                <span className="font-semibold">Data cycle</span> (rankings, gap zone, competitor SERPs): the button
                above, or the Monday cron. <span className="font-semibold">Full fix loop</span> (edit → test → deploy):
                open Claude Code in the site repo and say{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">run my SEO cycle</code> — or for
                continuous mode:
              </p>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
{`/loop SEO agent cycle for agile36.com: work the priority queue in seo-agent-data/ — find issues from GSC + competitor data, fix the next item, test the build, commit+push to deploy, measure rankings, log to history.md, repeat`}
              </pre>
            </div>

            {runOutput && (
              <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">Run output</h2>
                <pre className="max-h-64 overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">{runOutput}</pre>
              </div>
            )}

            <div className="mb-8 grid gap-8 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">Work queue</h2>
                {data.queue ? <QueueList raw={data.queue} /> : <p className="text-sm text-slate-500">No queue yet.</p>}
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                  Top opportunities <span className="text-sm font-normal text-slate-500">(of {data.gapCount})</span>
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="py-2 pr-3">Query</th>
                        <th className="py-2 pr-3">Pos</th>
                        <th className="py-2 pr-3">Impr</th>
                        <th className="py-2">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.gapZone.map((row) => (
                        <tr key={row.query} className="border-b border-slate-100">
                          <td className="py-2 pr-3 font-medium text-slate-800">{row.query}</td>
                          <td className="py-2 pr-3 text-slate-600">{row.position.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-slate-600">{row.impressions.toLocaleString()}</td>
                          <td className="py-2 text-slate-600">{Math.round(row.opportunity_score)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Run history</h2>
              {data.history ? (
                <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                  {data.history}
                </pre>
              ) : (
                <p className="text-sm text-slate-500">No history yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
