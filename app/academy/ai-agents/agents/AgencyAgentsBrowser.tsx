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
  /** Student UI: local downloads + skills, no GitHub noise. */
  mode?: 'class' | 'business';
};

export default function AgencyAgentsBrowser({
  catalog,
  emptyMessage = 'No agents match that search. Try another keyword or division.',
  showInstallHint = true,
  mode = 'class',
}: Props) {
  const isClass = mode === 'class';
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState('All');
  const [page, setPage] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedSkills, setExpandedSkills] = useState<string | null>(null);
  const divisions = useMemo(() => divisionsFor(catalog), [catalog]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.agents.filter((a) => {
      if (division !== 'All' && a.division !== division) return false;
      if (!q) return true;
      const skillHay = (a.skills || []).map((s) => `${s.name} ${s.id} ${s.summary || ''}`).join(' ');
      const hay = [a.name, a.description, a.division, a.vibe, a.path, a.id, skillHay]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [catalog.agents, query, division]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(key);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // ignore
    }
  };

  const agentHref = (a: AgencyAgent) => a.downloadUrl || a.sourceUrl || a.rawUrl || '#';

  return (
    <div className="space-y-6">
      {showInstallHint && (
        <div className="rounded-xl border border-[#1f2c4a]/10 bg-white px-4 py-3 text-sm leading-relaxed text-[#475569]">
          <strong className="font-semibold text-[#1f2c4a]">Install:</strong> download the agent
          markdown into <code className="text-[12px] text-[#1f2c4a]">~/.claude/agents/</code> (or
          paste into Codex). Download each skill into{' '}
          <code className="text-[12px] text-[#1f2c4a]">.claude/skills/&lt;name&gt;/SKILL.md</code>.
          Activate the agent by name, then use its skills for the job at hand.
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
            placeholder="Search name, role, skill…"
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
        {pageItems.map((a) => {
          const skills = a.skills || [];
          const skillsOpen = expandedSkills === a.id;
          return (
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

              {skills.length > 0 ? (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setExpandedSkills(skillsOpen ? null : a.id)}
                    className="text-xs font-semibold text-[#1f2c4a] hover:underline"
                  >
                    {skillsOpen ? 'Hide skills' : `${skills.length} skill${skills.length === 1 ? '' : 's'}`}
                  </button>
                  {skillsOpen ? (
                    <ul className="mt-2 space-y-2">
                      {skills.map((s) => (
                        <li
                          key={s.id}
                          className="rounded-lg border border-[#1f2c4a]/10 bg-[#f8fafc] px-3 py-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-[#1f2c4a]">{s.name}</p>
                            <a
                              href={s.downloadUrl}
                              download
                              className="text-[11px] font-semibold text-[#d97706] hover:underline"
                            >
                              Download
                            </a>
                          </div>
                          {s.summary ? (
                            <p className="mt-1 text-[11px] leading-relaxed text-[#64748b]">
                              {s.summary}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {skills.map((s) => (
                        <span
                          key={s.id}
                          className="rounded-md bg-[#1f2c4a]/[0.05] px-2 py-0.5 text-[11px] text-[#475569]"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <a
                  href={agentHref(a)}
                  download={isClass ? a.filename : undefined}
                  target={isClass ? undefined : '_blank'}
                  rel={isClass ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center rounded-lg bg-[#1f2c4a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#16243f]"
                >
                  {isClass ? 'Download agent' : 'View agent'}
                </a>
                {isClass && a.downloadUrl ? (
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `${a.id}:url`,
                        typeof window !== 'undefined'
                          ? `${window.location.origin}${a.downloadUrl}`
                          : a.downloadUrl!
                      )
                    }
                    className="inline-flex items-center rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-xs font-semibold text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.04]"
                  >
                    {copiedId === `${a.id}:url` ? 'Copied link' : 'Copy download link'}
                  </button>
                ) : null}
                {!isClass && a.rawUrl ? (
                  <a
                    href={a.rawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-xs font-semibold text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.04]"
                  >
                    Raw markdown
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
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
