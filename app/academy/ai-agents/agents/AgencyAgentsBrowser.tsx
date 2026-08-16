'use client';

import { useMemo, useState } from 'react';
import {
  divisionsFor,
  type AgencyAgent,
  type AgencyAgentCatalog,
} from '@/app/lib/academy/agency-agents';

const PAGE_SIZE = 24;

type Props = {
  catalog: AgencyAgentCatalog;
  emptyMessage?: string;
  showInstallHint?: boolean;
};

export default function AgencyAgentsBrowser({
  catalog,
  emptyMessage = 'No agents match that search. Try another keyword or division.',
  showInstallHint = true,
}: Props) {
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState('All');
  const [page, setPage] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const divisions = useMemo(() => divisionsFor(catalog), [catalog]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.agents.filter((a) => {
      if (division !== 'All' && a.division !== division) return false;
      if (!q) return true;
      const hay = [a.name, a.description, a.division, a.vibe, a.path, a.id]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [catalog.agents, query, division]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const copyText = async (agent: AgencyAgent, kind: 'raw' | 'path') => {
    const value = kind === 'raw' ? agent.rawUrl : agent.claudeInstallPath;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(`${agent.id}:${kind}`);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {showInstallHint && (
        <div className="rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3 text-sm leading-relaxed text-[#475569]">
          <strong className="font-semibold text-[#1f2c4a]">Install:</strong> open the agent file,
          save it under <code className="text-[12px] text-[#1f2c4a]">~/.claude/agents/</code> for
          Claude Code, or paste the markdown into a Codex custom instruction / agent file. Activate
          by name in chat (e.g. &ldquo;activate Product Manager mode&rdquo;).
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search agents</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search name, role, division…"
            className="w-full rounded-xl border border-[#1f2c4a]/15 bg-white px-4 py-2.5 text-sm text-[#1f2c4a] placeholder:text-[#94a3b8] outline-none ring-[#1f2c4a]/20 focus:ring-2"
          />
        </label>
        <p className="text-sm text-[#64748b]">
          {filtered.length.toLocaleString()} of {catalog.agents.length.toLocaleString()} shown
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {divisions.map((div) => {
          const active = division === div;
          return (
            <button
              key={div}
              type="button"
              onClick={() => {
                setDivision(div);
                setPage(0);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? 'bg-[#1f2c4a] text-white'
                  : 'border border-[#1f2c4a]/12 bg-white text-[#475569] hover:border-[#1f2c4a]/25'
              }`}
            >
              {div}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pageItems.map((a) => (
          <article
            key={a.id}
            className="flex flex-col rounded-2xl border border-[#1f2c4a]/12 bg-white p-5 shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
              {a.division}
            </p>
            <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-[#1f2c4a]">
              {a.emoji ? `${a.emoji} ` : ''}
              {a.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{a.description}</p>
            {a.vibe ? (
              <p className="mt-2 text-xs italic text-[#94a3b8]">{a.vibe}</p>
            ) : null}
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <a
                href={a.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-[#1f2c4a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#16243f]"
              >
                View agent
              </a>
              <a
                href={a.rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-xs font-semibold text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.04]"
              >
                Raw markdown
              </a>
              <button
                type="button"
                onClick={() => copyText(a, 'raw')}
                className="inline-flex items-center rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-xs font-semibold text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.04]"
              >
                {copiedId === `${a.id}:raw` ? 'Copied URL' : 'Copy raw URL'}
              </button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-[#1f2c4a]/20 bg-white px-4 py-10 text-center text-sm text-[#64748b]">
          {emptyMessage}
        </p>
      )}

      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-sm font-medium text-[#1f2c4a] disabled:opacity-40"
          >
            Previous
          </button>
          <p className="text-sm text-[#64748b]">
            Page {safePage + 1} of {pageCount}
          </p>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-sm font-medium text-[#1f2c4a] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
