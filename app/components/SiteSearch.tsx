"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  getSearchTypeLabel,
  searchSite,
  type SearchResult,
  type SearchResultType,
} from "@/app/lib/site-search";

const TYPE_BADGE: Record<SearchResultType, string> = {
  course: "bg-[#111111]/10 text-[#111111]",
  combo: "bg-[#B8860B]/15 text-[#B8860B]",
  practice: "bg-emerald-50 text-emerald-800",
  page: "bg-slate-100 text-slate-700",
};

export default function SiteSearch() {
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [didYouMean, setDidYouMean] = useState<string | undefined>();

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const runSearch = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setDidYouMean(undefined);
      setOpen(false);
      return;
    }
    const response = searchSite(value, 10);
    setResults(response.results);
    setDidYouMean(response.didYouMean);
    setOpen(true);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setDidYouMean(undefined);
    setOpen(false);
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div className="relative w-full min-w-0" ref={rootRef}>
      <label htmlFor={inputId} className="sr-only">
        Search courses, practice tests, and pages
      </label>
      <div className="relative w-full min-w-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-3.5">
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 text-[#6B6B6B]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id={inputId}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={`${inputId}-results`}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="What do you want to learn today?"
          value={query}
          onChange={(e) => runSearch(e.target.value)}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              (e.target as HTMLInputElement).blur();
            }
          }}
          className="w-full min-w-0 h-10 sm:h-11 pl-9 sm:pl-11 pr-9 sm:pr-11 text-sm sm:text-[15px] font-medium rounded-full bg-white border border-[#EAEAEA] text-[#111111] placeholder:text-[#6B6B6B] placeholder:font-normal transition-[border-color,box-shadow] focus:outline-none focus:border-[#B8860B] focus:ring-4 focus:ring-[#B8860B]/25"
        />
        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#64748b] hover:text-[#111111]"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>

      {showPanel ? (
        <div
          id={`${inputId}-results`}
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 z-[60] w-full min-w-[16rem] max-w-[min(100vw-1.5rem,28rem)] sm:left-auto sm:right-0 sm:w-[28rem] bg-white border border-[#111111]/12 rounded-xl shadow-2xl shadow-[#111111]/20 max-h-[min(70vh,32rem)] overflow-y-auto"
        >
          {didYouMean ? (
            <div className="px-4 pt-3 pb-1 text-sm text-[#64748b]">
              Did you mean{" "}
              <button
                type="button"
                onClick={() => runSearch(didYouMean)}
                className="font-semibold text-[#B8860B] hover:underline"
              >
                {didYouMean}
              </button>
              ?
            </div>
          ) : null}

          {results.length > 0 ? (
            <div className="p-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] px-3 py-2">
                {results.length} result{results.length === 1 ? "" : "s"}
              </div>
              <ul className="space-y-0.5">
                {results.map((result) => (
                  <li key={result.id} role="option">
                    <Link
                      href={result.href}
                      onClick={clearSearch}
                      className="block px-3 py-2.5 rounded-lg hover:bg-[#111111]/[0.06] transition-colors group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${TYPE_BADGE[result.type]}`}
                        >
                          {getSearchTypeLabel(result.type)}
                        </span>
                        {typeof result.price === "number" ? (
                          <span className="text-xs font-bold text-[#B8860B] ml-auto shrink-0">
                            ${result.price}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-[15px] font-semibold text-[#111111] group-hover:text-[#B8860B] leading-snug">
                        {result.title}
                      </div>
                      {result.subtitle ? (
                        <div className="text-xs text-[#64748b] mt-0.5">{result.subtitle}</div>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-[#475569]">No matches found</p>
              <p className="text-xs text-[#94a3b8] mt-1">
                Try “POPM”, “leading safe”, or “practice test”
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
