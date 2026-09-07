"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LiveVisitor } from "@/app/lib/hyper/live-visitors";
import type { VisitorsPayload } from "@/app/lib/hyper/load-visitors";
import LiveWatch from "./LiveWatch";
import TakeoverChat from "./TakeoverChat";
import { isCheckoutPath } from "@/app/lib/hyper/private-path";

function when(iso: string): string {
  const date = new Date(iso);
  const minutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function initials(label: string): string {
  const words = label.replace(/^visitor/i, "").trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  return label.slice(0, 2).toUpperCase();
}

function pageHref(path: string | null | undefined): string {
  if (!path) return "/";
  return path.startsWith("http") ? path : path.startsWith("/") ? path : `/${path}`;
}

export default function VisitorsBoard({
  initial,
  openId,
}: {
  initial: VisitorsPayload;
  openId: string | null;
}) {
  const [visitors, setVisitors] = useState<LiveVisitor[]>(initial.visitors);
  const [online, setOnline] = useState(initial.online);
  const [active, setActive] = useState(initial.active);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [lane, setLane] = useState<"online" | "offline">("online");
  const [updated, setUpdated] = useState("");
  const [chats, setChats] = useState<Record<string, { takenOver: boolean; preview: string }>>({});

  async function load() {
    try {
      const visitorsRes = await fetch("/api/admin/visitors?limit=200", { cache: "no-store" });
      const payload = (await visitorsRes.json()) as VisitorsPayload & { error?: string };
      if (!visitorsRes.ok) {
        setError(payload.error || "Could not load visitors.");
        return;
      }
      setVisitors(payload.visitors ?? []);
      setOnline(payload.online ?? 0);
      setActive(payload.active ?? 0);
      setError(null);
      setUpdated(new Date().toLocaleTimeString());
    } catch {
      setError("Could not load visitors.");
    }
    try {
      const chatsRes = await fetch("/api/admin/visitors/chat", { cache: "no-store" });
      const chatPayload = (await chatsRes.json()) as {
        chats?: Array<{ sessionId: string; takenOver: boolean; preview: string }>;
      };
      if (!chatsRes.ok) return;
      const next: Record<string, { takenOver: boolean; preview: string }> = {};
      for (const row of chatPayload.chats ?? []) {
        next[row.sessionId] = { takenOver: row.takenOver, preview: row.preview };
      }
      setChats(next);
    } catch {
      /* keep last chat badges */
    }
  }

  useEffect(() => {
    const kick = window.setTimeout(() => void load(), 0);
    const timer = window.setInterval(() => void load(), 4000);
    return () => {
      window.clearTimeout(kick);
      window.clearInterval(timer);
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return visitors.filter((row) => {
      if (!needle) return true;
      return [row.label, row.place, row.city, row.region, row.page, row.pageTitle, row.company, row.personName]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle));
    });
  }, [query, visitors]);

  const live = filtered.filter((row) => row.live);
  const earlier = filtered.filter((row) => !row.live);
  const list = lane === "online" ? live : earlier.slice(0, 40);
  const selected = (openId && visitors.find((row) => row.id === openId)) || null;
  const mapped = live.filter((row) => row.x != null && row.y != null);

  return (
    <div className="flex min-h-screen flex-col bg-[#eef3f8] text-[#1f2c4a]">
      <header className="flex items-end justify-between gap-4 border-b border-[#1f2c4a]/10 bg-white/80 px-5 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">Live</p>
          <h1 className="font-[Switzer,Inter,sans-serif] text-2xl font-normal tracking-[-0.03em]">
            Who is on the site
          </h1>
        </div>
        <p className="text-sm text-[#64748b]">{updated ? `Updated ${updated}` : "Live snapshot"}</p>
      </header>

      {error ? <p className="px-5 py-3 text-sm text-red-600">{error}</p> : null}

      <div
        className={`grid min-h-0 flex-1 ${
          selected
            ? "lg:grid-cols-[320px_minmax(0,1fr)_360px]"
            : "lg:grid-cols-[340px_minmax(0,1fr)]"
        }`}
      >
        <aside className="flex min-h-[420px] flex-col border-b border-[#1f2c4a]/10 bg-white lg:min-h-0 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-2 border-b border-[#1f2c4a]/10">
            <button
              type="button"
              onClick={() => setLane("online")}
              className={`px-3 py-3 text-sm ${
                lane === "online"
                  ? "border-b-2 border-[#d97706] font-medium text-[#1f2c4a]"
                  : "text-[#94a3b8]"
              }`}
            >
              Online {live.length}
            </button>
            <button
              type="button"
              onClick={() => setLane("offline")}
              className={`px-3 py-3 text-sm ${
                lane === "offline"
                  ? "border-b-2 border-[#1f2c4a] font-medium text-[#1f2c4a]"
                  : "text-[#94a3b8]"
              }`}
            >
              Offline {earlier.length}
            </button>
          </div>
          <p className="px-4 pt-2 text-xs text-[#94a3b8]">
            {lane === "online" ? `${active} moving in the last few minutes` : "People who left"}
          </p>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {list.length === 0 ? (
              <p className="px-4 py-10 text-sm text-[#94a3b8]">
                {lane === "online"
                  ? "Nobody online right now."
                  : "No recent visitors in this list."}
              </p>
            ) : (
              list.map((row) => {
                const on = selected?.id === row.id;
                return (
                  <Link
                    key={row.id}
                    href={on ? "/admin/visitors" : `/admin/visitors?v=${encodeURIComponent(row.id)}`}
                    className={`flex w-full items-start gap-3 border-l-2 px-4 py-3 text-left transition-colors ${
                      on
                        ? "border-[#d97706] bg-[#1f2c4a]/[0.04]"
                        : "border-transparent hover:bg-[#1f2c4a]/[0.03]"
                    }`}
                  >
                    <span className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f2c4a] text-[11px] font-medium text-white">
                      {initials(row.label)}
                      <span
                        className={`absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                          row.live ? "bg-[#16a34a]" : "bg-[#94a3b8]"
                        }`}
                      />
                      {row.flag ? (
                        <span className="absolute -bottom-1 -right-1 text-[13px] leading-none">{row.flag}</span>
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-[#1f2c4a]">{row.label}</span>
                        <span className="shrink-0 text-[11px] text-[#94a3b8]">{when(row.lastSeen)}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-[#64748b]">{row.place}</span>
                      <span className="mt-0.5 block truncate text-xs text-[#94a3b8]">
                        {row.pageTitle || row.page || "/"}
                      </span>
                      {chats[row.id] ? (
                        <span
                          className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            chats[row.id].takenOver
                              ? "bg-[#d97706]/15 text-[#d97706]"
                              : "bg-[#1f2c4a]/10 text-[#1f2c4a]"
                          }`}
                        >
                          {chats[row.id].takenOver ? "You are in this chat" : "In chat"}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                );
              })
            )}
          </div>

          <div className="border-t border-[#1f2c4a]/10 p-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by name, city…"
              className="w-full rounded-xl border border-[#1f2c4a]/15 bg-[#f6f9fd] px-3 py-2 text-sm text-[#1f2c4a] outline-none placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/30"
            />
          </div>
        </aside>

        <section className="relative min-h-[420px] overflow-hidden bg-[#e7eef5]">
          {selected ? (
            <LiveWatch
              sessionId={selected.id}
              fallbackPath={selected.page}
              fallbackTitle={selected.pageTitle}
            />
          ) : (
            <>
          <div className="absolute left-5 top-5 z-10 rounded-2xl bg-white/80 px-4 py-3 shadow-[0_10px_30px_-18px_rgba(31,44,74,0.45)] backdrop-blur-md">
            <p className="text-sm font-medium text-[#1f2c4a]">
              {online} online {online === 1 ? "user" : "users"}
            </p>
            <p className="text-xs text-[#64748b]">{active} active now</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
            <div className="relative aspect-[2/1] w-full max-w-6xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/admin/world-map.png?v=2"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-fill"
              />
              {mapped.map((row) => (
                  <Link
                    key={row.id}
                    href={`/admin/visitors?v=${encodeURIComponent(row.id)}`}
                    title={`${row.label} · ${row.place}`}
                    className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${row.x}%`, top: `${row.y}%` }}
                  >
                    {row.live ? (
                      <span className="absolute -inset-1 animate-ping rounded-full bg-[#d97706]/45" />
                    ) : null}
                    <span
                      className={`relative block h-3.5 w-3.5 rounded-full shadow-sm ${
                        row.live
                          ? "bg-white ring-2 ring-[#d97706]/70"
                          : "bg-white/90 ring-2 ring-[#1f2c4a]/20"
                      }`}
                    />
                  </Link>
              ))}
            </div>
          </div>
            </>
          )}
        </section>

        {selected ? (
          <aside className="flex min-h-[420px] flex-col border-t border-[#1f2c4a]/10 bg-white lg:min-h-0 lg:border-l lg:border-t-0">
            <div className="flex items-start justify-between gap-3 border-b border-[#1f2c4a]/10 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-[#1f2c4a]">{selected.label}</p>
                <p className="mt-1 text-xs text-[#64748b]">
                  {selected.flag ? `${selected.flag} ` : ""}
                  {selected.place}
                </p>
              </div>
              <Link
                href="/admin/visitors"
                className="rounded-full px-2 py-1 text-xs text-[#64748b] hover:bg-[#1f2c4a]/5"
              >
                Close
              </Link>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#94a3b8]">
                {selected.live ? "Online now" : `Offline · last seen ${when(selected.lastSeen)}`}
              </p>
              {selected.personName || selected.company || selected.email ? (
                <p className="mt-2 text-sm text-[#475569]">
                  {[selected.personName, selected.company, selected.email].filter(Boolean).join(" · ")}
                </p>
              ) : null}

              <a
                href={pageHref(selected.page)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#1f2c4a] px-4 py-3 text-sm text-white hover:bg-[#16243f]"
              >
                Open the page they are on
              </a>
              {isCheckoutPath(selected.page) ? (
                <p className="mt-2 text-center text-xs text-[#94a3b8]">Card numbers are masked.</p>
              ) : null}

              <TakeoverChat key={selected.id} sessionId={selected.id} />

              <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-[#94a3b8]">Pages they hit</p>
              <ul className="mt-2 space-y-2">
                {selected.pages.map((page) => (
                  <li key={`${page.path}-${page.at}`}>
                    <a
                      href={pageHref(page.path)}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-[#1f2c4a]/10 px-3 py-2 hover:bg-[#1f2c4a]/[0.03]"
                    >
                      <span className="block truncate text-sm text-[#1f2c4a]">{page.title || page.path || "/"}</span>
                      <span className="mt-0.5 block truncate text-xs text-[#94a3b8]">
                        {isCheckoutPath(page.path) ? "Checkout · card numbers masked" : page.path}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
