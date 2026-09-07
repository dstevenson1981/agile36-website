"use client";

import { useEffect, useRef, useState } from "react";

type StoredTurn = {
  id?: string;
  role: "user" | "assistant" | "owner";
  content: string;
  at?: string;
};

export default function TakeoverChat({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<StoredTurn[]>([]);
  const [takenOver, setTakenOver] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(
          `/api/admin/visitors/chat?session=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const payload = (await response.json()) as {
          takenOver?: boolean;
          messages?: StoredTurn[];
          error?: string;
        };
        if (cancelled) return;
        if (!response.ok) {
          setError(payload.error || "Could not load chat.");
          return;
        }
        setTakenOver(Boolean(payload.takenOver));
        setMessages(payload.messages ?? []);
        setError(null);
      } catch {
        if (!cancelled) setError("Could not load chat.");
      }
    }
    const kick = window.setTimeout(() => void load(), 0);
    const timer = window.setInterval(() => void load(), 2000);
    return () => {
      cancelled = true;
      window.clearTimeout(kick);
      window.clearInterval(timer);
    };
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  async function post(body: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/visitors/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, ...body }),
      });
      const payload = (await response.json()) as {
        takenOver?: boolean;
        messages?: StoredTurn[];
        error?: string;
      };
      if (!response.ok) {
        setError(payload.error || "Try again.");
        return;
      }
      setTakenOver(Boolean(payload.takenOver));
      setMessages(payload.messages ?? []);
    } catch {
      setError("Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await post({ action: "send", content: text });
  }

  return (
    <div className="mt-6 flex min-h-[280px] flex-col rounded-xl border border-[#1f2c4a]/10">
      <div className="flex items-center justify-between gap-2 border-b border-[#1f2c4a]/10 px-3 py-2">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#94a3b8]">Chat</p>
        {takenOver ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void post({ action: "release" })}
            className="text-xs text-[#64748b] hover:text-[#1f2c4a]"
          >
            Hand back to Angela
          </button>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => void post({ action: "takeover" })}
            className="rounded-lg bg-[#1f2c4a] px-2.5 py-1 text-xs font-medium text-white hover:bg-[#16243f] disabled:opacity-40"
          >
            Take over
          </button>
        )}
      </div>

      <div className="min-h-[160px] flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {messages.length === 0 ? (
          <p className="text-sm text-[#94a3b8]">They have not started chatting yet.</p>
        ) : (
          messages.map((turn, index) => (
            <div
              key={turn.id || `${turn.role}-${index}`}
              className={
                turn.role === "user"
                  ? "ml-6 rounded-xl bg-[#1f2c4a] px-3 py-2 text-sm text-white"
                  : turn.role === "owner"
                    ? "mr-4 rounded-xl border border-[#d97706]/30 bg-[#d97706]/10 px-3 py-2 text-sm text-[#1f2c4a]"
                    : "mr-4 rounded-xl bg-[#1f2c4a]/[0.04] px-3 py-2 text-sm text-[#475569]"
              }
            >
              <p className="mb-1 text-[10px] uppercase tracking-[0.12em] opacity-70">
                {turn.role === "user" ? "Visitor" : turn.role === "owner" ? "You" : "Angela"}
              </p>
              <p className="whitespace-pre-wrap">{turn.content}</p>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {error ? <p className="px-3 pb-1 text-xs text-red-600">{error}</p> : null}

      {takenOver ? (
        <form
          className="border-t border-[#1f2c4a]/10 p-2"
          onSubmit={(event) => {
            event.preventDefault();
            void send();
          }}
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send();
              }
            }}
            rows={2}
            placeholder="Reply as Angela…"
            className="w-full resize-none rounded-lg border border-[#1f2c4a]/15 bg-[#f6f9fd] px-3 py-2 text-sm text-[#1f2c4a] outline-none placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/30"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-lg bg-[#1f2c4a] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#16243f] disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </form>
      ) : (
        <p className="border-t border-[#1f2c4a]/10 px-3 py-2 text-xs text-[#94a3b8]">
          Take over to type to them. Angela stops answering until you hand it back.
        </p>
      )}
    </div>
  );
}
