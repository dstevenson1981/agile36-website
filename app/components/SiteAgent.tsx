"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { OPEN_SITE_AGENT_EVENT } from "@/app/lib/site-agent/open";

type ChatRole = "user" | "assistant" | "owner";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const SESSION_KEY = "a36_site_agent_session";

function sessionId(): string {
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.localStorage.setItem(SESSION_KEY, id);
  return id;
}

export default function SiteAgent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [takenOver, setTakenOver] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi — I can get you into a class. What are you looking at?",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  const hidden = pathname.startsWith("/admin") || pathname.startsWith("/account");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/site-agent?session_id=${sessionId()}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as {
        messages?: ChatMessage[];
        taken_over?: boolean;
      };
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      }
      setTakenOver(Boolean(data.taken_over));
    } catch {
      /* keep local state */
    }
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SITE_AGENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SITE_AGENT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    void refresh();
    const timer = window.setInterval(() => {
      void refresh();
    }, 6000);
    return () => window.clearInterval(timer);
  }, [open, refresh]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    setMessages((current) => [...current, { role: "user", content: text }]);
    try {
      const res = await fetch("/api/site-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId(),
          message: text,
          page: pathname,
        }),
      });
      const data = (await res.json()) as {
        reply?: string | null;
        taken_over?: boolean;
        error?: string;
      };
      if (!res.ok) {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: data.error || "I could not send that. Try again, or email d.stevenson@agile36.com." },
        ]);
        return;
      }
      setTakenOver(Boolean(data.taken_over));
      if (data.reply) {
        setMessages((current) => [...current, { role: "assistant", content: data.reply as string }]);
      }
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Connection dropped. Email d.stevenson@agile36.com or call 310-620-7966." },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (hidden) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      {open ? (
        <section
          className="liquid-glass flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#1f2c4a]/15 shadow-[0_18px_50px_rgba(31,44,74,0.18)]"
          role="dialog"
          aria-label="GrokBot chat"
        >
          <header className="flex items-center justify-between border-b border-[#1f2c4a]/10 bg-[#1f2c4a] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-medium tracking-[-0.02em]">GrokBot</p>
              <p className="text-xs text-white/70">
                {takenOver ? "A teammate is in this chat" : "Agile36 revenue agent"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 text-sm text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              Close
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => {
              const mine = message.role === "user";
              const owner = message.role === "owner";
              return (
                <div key={`${message.role}-${index}`} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      mine
                        ? "bg-[#1f2c4a] text-white"
                        : owner
                          ? "bg-[#d97706]/15 text-[#1f2c4a]"
                          : "bg-[#1f2c4a]/[0.06] text-[#1f2c4a]"
                    }`}
                  >
                    {owner ? <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[#d97706]">Deadra</p> : null}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              );
            })}
            {sending ? <p className="text-xs text-[#94a3b8]">Thinking…</p> : null}
          </div>

          <form
            className="border-t border-[#1f2c4a]/10 bg-white/80 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={takenOver ? "Message the team…" : "Ask about a class or a price…"}
                maxLength={2000}
                className="min-w-0 flex-1 rounded-xl border border-[#1f2c4a]/15 bg-white px-3 py-2.5 text-sm text-[#1f2c4a] outline-none placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="rounded-xl bg-[#1f2c4a] px-3.5 text-sm text-white hover:bg-[#16243f] disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f2c4a] text-white shadow-[0_12px_30px_rgba(31,44,74,0.28)] hover:bg-[#16243f]"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H13l-3.6 3.2a.6.6 0 0 1-1 .4V16H7.5A2.5 2.5 0 0 1 5 13.5v-7Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      </button>
    </div>
  );
}
