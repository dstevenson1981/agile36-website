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
  course: "bg-[#1f2c4a]/10 text-[#1f2c4a]",
  combo: "bg-[#d97706]/15 text-[#b45309]",
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
    <div
      className="relative flex-1 min-w-0 max-w-[10rem] sm:max-w-xs md:max-w-sm xl:max-w-md mx-1 sm:mx-2"
      ref={rootRef}
    >
      <label htmlFor={inputId} className="sr-only">
        Search courses, practice tests, and pages
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3.5">
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748b]"
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
          placeholder="Search…"
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
          className="w-full h-10 sm:h-12 pl-9 sm:pl-11 pr-9 sm:pr-11 text-sm sm:text-[15px] font-medium rounded-xl bg-white border-2 border-[#1f2c4a]/25 text-[#1f2c4a] placeholder:text-[#94a3b8] placeholder:font-normal shadow-sm shadow-[#1f2c4a]/8 transition-[border-color,box-shadow] focus:outline-none focus:border-[#d97706] focus:ring-4 focus:ring-[#d97706]/20"
        />
        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#64748b] hover:text-[#1f2c4a]"
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
          className="absolute top-full left-0 mt-2 z-[60] w-[min(100vw-1.5rem,28rem)] sm:left-auto sm:right-0 bg-white border border-[#1f2c4a]/12 rounded-xl shadow-2xl shadow-[#1f2c4a]/20 max-h-[min(70vh,32rem)] overflow-y-auto"
        >
          {didYouMean ? (
            <div className="px-4 pt-3 pb-1 text-sm text-[#64748b]">
              Did you mean{" "}
              <button
                type="button"
                onClick={() => runSearch(didYouMean)}
                className="font-semibold text-[#d97706] hover:underline"
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
                      className="block px-3 py-2.5 rounded-lg hover:bg-[#1f2c4a]/[0.06] transition-colors group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${TYPE_BADGE[result.type]}`}
                        >
                          {getSearchTypeLabel(result.type)}
                        </span>
                        {typeof result.price === "number" ? (
                          <span className="text-xs font-bold text-[#d97706] ml-auto shrink-0">
                            ${result.price}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-[15px] font-semibold text-[#1f2c4a] group-hover:text-[#d97706] leading-snug">
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
