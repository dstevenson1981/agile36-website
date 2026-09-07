"use client";

import { useEffect, useRef, useState } from "react";
import type { VisitorPresence } from "@/app/lib/hyper/db";
import { isCheckoutPath, isHiddenWatchPath } from "@/app/lib/hyper/private-path";

function pageHref(path: string | null | undefined): string {
  if (!path) return "/";
  return path.startsWith("http") ? path : path.startsWith("/") ? path : `/${path}`;
}

function watchSrc(path: string | null | undefined): string {
  const href = pageHref(path);
  if (href.startsWith("http")) return href;
  return href.includes("?") ? `${href}&a36watch=1` : `${href}?a36watch=1`;
}

export default function LiveWatch({
  sessionId,
  fallbackPath,
  fallbackTitle,
}: {
  sessionId: string;
  fallbackPath: string | null;
  fallbackTitle: string | null;
}) {
  const [presence, setPresence] = useState<VisitorPresence | null>(null);
  const [watching, setWatching] = useState(false);
  const [clickPulse, setClickPulse] = useState(false);
  const lastClick = useRef<string | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(
          `/api/admin/visitors/presence?session=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const payload = (await response.json()) as { presence?: VisitorPresence | null };
        if (cancelled) return;
        const next = payload.presence ?? null;
        if (next?.clicked_at && next.clicked_at !== lastClick.current) {
          lastClick.current = next.clicked_at;
          setClickPulse(true);
          window.setTimeout(() => setClickPulse(false), 500);
        }
        setPresence(next);
        setWatching(Boolean(next && Date.now() - +new Date(next.updated_at) < 8000));
      } catch {
        if (!cancelled) {
          setPresence(null);
          setWatching(false);
        }
      }
    }
    void load();
    const timer = window.setInterval(() => void load(), 1200);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [sessionId]);

  const path = presence?.path || fallbackPath || "/";
  const title = presence?.page_title || fallbackTitle || path;
  const locked = isHiddenWatchPath(path) || (Boolean(presence?.is_private) && !isCheckoutPath(path));
  const cardsMasked = !locked && isCheckoutPath(path);

  useEffect(() => {
    if (locked) return;
    const frame = frameRef.current;
    if (!frame || presence?.scroll_y == null) return;
    try {
      frame.contentWindow?.scrollTo(0, presence.scroll_y);
    } catch {
      /* ignore cross-origin */
    }
  }, [locked, presence?.scroll_y, path]);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#d7e0ea]">
      <div className="flex items-center justify-between gap-3 border-b border-[#1f2c4a]/10 bg-white/90 px-4 py-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#1f2c4a]">{title}</p>
          <p className="truncate text-xs text-[#94a3b8]">{path}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {cardsMasked ? (
            <span className="rounded-full bg-[#1f2c4a]/8 px-2.5 py-0.5 text-[11px] font-medium text-[#64748b]">
              Card numbers masked
            </span>
          ) : null}
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
              watching ? "bg-[#f59e0b] text-white" : "bg-[#1f2c4a]/10 text-[#64748b]"
            }`}
          >
            {watching ? "Watching live" : "Last screen"}
          </span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        {locked ? (
          <div className="flex h-full items-center justify-center px-8 text-center">
            <p className="max-w-sm text-sm text-[#475569]">
              This screen stays with them. We do not replay admin or account pages.
            </p>
          </div>
        ) : (
          <>
            <iframe
              ref={frameRef}
              key={path}
              src={watchSrc(path)}
              title="Visitor screen"
              className="h-full w-full border-0 bg-white"
            />
            {presence?.mouse_x != null && presence.mouse_y != null ? (
              <span
                className="pointer-events-none absolute z-10"
                style={{ left: `${presence.mouse_x}%`, top: `${presence.mouse_y}%` }}
              >
                {clickPulse ? (
                  <span className="absolute -left-3 -top-3 h-6 w-6 animate-ping rounded-full bg-[#d97706]/50" />
                ) : null}
                <span className="block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d97706] ring-4 ring-white shadow" />
              </span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
