'use client';

import { useMemo, useState } from 'react';
import {
  categoriesFor,
  type N8nWorkflow,
  type N8nWorkflowCatalog,
} from '@/app/lib/academy/n8n-workflows';

function complexityLabel(c: N8nWorkflow['complexity']) {
  if (c === 'low') return 'Low';
  if (c === 'medium') return 'Medium';
  return 'High';
}

const PAGE_SIZE = 24;

type Props = {
  catalog: N8nWorkflowCatalog;
  emptyMessage?: string;
};

export default function N8nWorkflowsBrowser({
  catalog,
  emptyMessage = 'No workflows match that search. Try another keyword or category.',
}: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const categories = useMemo(() => categoriesFor(catalog), [catalog]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.workflows.filter((w) => {
      if (category !== 'All' && w.category !== category) return false;
      if (!q) return true;
      const hay = [w.title, w.category, w.trigger, w.path || '', ...w.integrations, w.filename]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [catalog.workflows, query, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const copyUrl = async (w: N8nWorkflow) => {
    try {
      await navigator.clipboard.writeText(w.downloadUrl);
      setCopiedId(w.path || w.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search workflows</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search title, integration, trigger…"
            className="w-full rounded-xl border border-[#1f2c4a]/15 bg-white px-4 py-2.5 text-sm text-[#1f2c4a] placeholder:text-[#94a3b8] outline-none ring-[#1f2c4a]/20 focus:ring-2"
          />
        </label>
        <p className="text-sm text-[#64748b]">
          {filtered.length.toLocaleString()} of {catalog.workflows.length.toLocaleString()} shown
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setPage(0);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? 'bg-[#1f2c4a] text-white'
                  : 'border border-[#1f2c4a]/12 bg-white text-[#475569] hover:border-[#1f2c4a]/25'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pageItems.map((w) => {
          const key = w.path || w.filename;
          return (
            <article
              key={key}
              className="flex flex-col rounded-2xl border border-[#1f2c4a]/12 bg-white p-5 shadow-sm"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
                {w.category}
              </p>
              <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-[#1f2c4a]">{w.title}</h3>
              <p className="mt-2 text-xs text-[#94a3b8]">
                {w.nodeCount} nodes · {complexityLabel(w.complexity)} · {w.trigger}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {w.integrations.slice(0, 5).map((integ) => (
                  <span
                    key={integ}
                    className="rounded-md bg-[#1f2c4a]/[0.05] px-2 py-0.5 text-[11px] text-[#475569]"
                  >
                    {integ}
                  </span>
                ))}
                {w.integrations.length > 5 && (
                  <span className="text-[11px] text-[#94a3b8]">+{w.integrations.length - 5}</span>
                )}
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <a
                  href={w.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-[#1f2c4a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#16243f]"
                >
                  Download JSON
                </a>
                <button
                  type="button"
                  onClick={() => copyUrl(w)}
                  className="inline-flex items-center rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-xs font-semibold text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.04]"
                >
                  {copiedId === key ? 'Copied link' : 'Copy import URL'}
                </button>
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
