"use client";

import { useCallback, useEffect, useState } from "react";

type Conversation = {
  id: string;
  visitor_page: string | null;
  visitor_name: string | null;
  visitor_email: string | null;
  taken_over: boolean;
  needs_handoff: boolean;
  created_at: string;
};

type Message = {
  id: string;
  role: "user" | "assistant" | "owner";
  content: string;
  created_at: string;
};

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadList = useCallback(async () => {
    const res = await fetch("/api/admin/chat", { cache: "no-store" });
    const data = (await res.json()) as { conversations?: Conversation[]; error?: string };
    if (!res.ok) throw new Error(data.error || "Failed to load chats");
    setConversations(data.conversations || []);
  }, []);

  const loadOne = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/chat?id=${id}`, { cache: "no-store" });
    const data = (await res.json()) as { messages?: Message[]; error?: string };
    if (!res.ok) throw new Error(data.error || "Failed to load conversation");
    setMessages(data.messages || []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadList();
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadList]);

  useEffect(() => {
    if (!activeId) return;
    void loadOne(activeId);
    const timer = window.setInterval(() => {
      void loadOne(activeId);
      void loadList();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [activeId, loadList, loadOne]);

  async function takeover() {
    if (!activeId) return;
    await fetch("/api/admin/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: activeId, action: "takeover" }),
    });
    await loadList();
  }

  async function sendReply() {
    if (!activeId || !reply.trim()) return;
    const text = reply.trim();
    setReply("");
    await fetch("/api/admin/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: activeId, action: "reply", message: text }),
    });
    await loadOne(activeId);
    await loadList();
  }

  const active = conversations.find((row) => row.id === activeId) || null;

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#1f2c4a]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[320px_1fr]">
        <aside>
          <h1 className="text-2xl font-normal tracking-[-0.03em]">Site chat</h1>
          <p className="mt-2 text-sm text-[#64748b]">
            Conversations from the website agent. Take over to reply as you.
          </p>
          {loading ? <p className="mt-4 text-sm text-[#64748b]">Loading…</p> : null}
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          <ul className="mt-6 space-y-2">
            {conversations.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(row.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left text-sm ${
                    activeId === row.id
                      ? "border-[#1f2c4a] bg-white"
                      : "border-[#1f2c4a]/10 bg-white/70 hover:border-[#1f2c4a]/25"
                  }`}
                >
                  <span className="block font-medium">
                    {row.visitor_name || row.visitor_email || "Visitor"}
                  </span>
                  <span className="mt-1 block text-xs text-[#64748b]">{row.visitor_page || "/"}</span>
                  {row.needs_handoff ? (
                    <span className="mt-2 inline-block text-[11px] uppercase tracking-[0.14em] text-[#d97706]">
                      Needs you
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="min-h-[70vh] rounded-2xl border border-[#1f2c4a]/10 bg-white p-5">
          {!active ? (
            <p className="text-sm text-[#64748b]">Pick a conversation.</p>
          ) : (
            <>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{active.visitor_name || "Visitor"}</p>
                  <p className="text-sm text-[#64748b]">{active.visitor_email || "No email yet"}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void takeover()}
                  className="rounded-lg bg-[#1f2c4a] px-3 py-2 text-sm text-white hover:bg-[#16243f]"
                >
                  {active.taken_over ? "Taken over" : "Take over"}
                </button>
              </div>
              <div className="mb-4 h-[48vh] space-y-3 overflow-y-auto rounded-xl bg-[#1f2c4a]/[0.03] p-4">
                {messages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#94a3b8]">{message.role}</p>
                    <p className="mt-1 whitespace-pre-wrap text-[#1f2c4a]">{message.content}</p>
                  </div>
                ))}
              </div>
              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendReply();
                }}
              >
                <input
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Reply as you. This stops the AI."
                  className="flex-1 rounded-lg border border-[#1f2c4a]/15 px-3 py-2.5 text-sm outline-none focus:border-[#1f2c4a]/40"
                />
                <button type="submit" className="rounded-lg bg-[#1f2c4a] px-4 text-sm text-white hover:bg-[#16243f]">
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
