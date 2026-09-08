"use client";

import { useEffect, useRef, useState } from "react";

type ChatTurn = { role: "user" | "assistant"; content: string };
type Action = { label: string; href: string };

function renderText(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={index}
          href={link[2]}
          className="font-medium text-[#d97706] underline underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          {link[1]}
        </a>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={index} className="font-medium text-[#1f2c4a]">
          {bold[1]}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

const STARTERS = [
  "What happened in the last 7 days?",
  "Can they get a refund?",
  "Draft what I should say back",
];

export default function AdminAssistantPage() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const nextMessages: ChatTurn[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setBusy(true);
    setError(null);
    setActions([]);

    try {
      const response = await fetch("/api/admin/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = (await response.json()) as {
        reply?: string;
        actions?: Action[];
        error?: string;
      };
      if (!response.ok) {
        setError(payload.error || "Try again.");
        return;
      }
      setMessages([...nextMessages, { role: "assistant", content: payload.reply || "" }]);
      setActions(payload.actions ?? []);
    } catch {
      setError("Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#1f2c4a]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[#64748b]">Internal lookup</p>
          <h1 className="mt-1 text-3xl font-normal tracking-[-0.03em]">Operator</h1>
          <p className="mt-2 text-sm text-[#475569]">
            Paste the person’s email or the situation. I look up orders and leads, then tell you what to do.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-[#1f2c4a]/15 bg-white">
          <div className="min-h-[28rem] flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.length === 0 ? (
              <div className="space-y-3 text-sm text-[#475569]">
                <p>Examples:</p>
                <div className="flex flex-col gap-2">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => send(starter)}
                      className="rounded-lg border border-[#1f2c4a]/15 px-3 py-2 text-left text-[#1f2c4a] hover:bg-[#1f2c4a]/[0.04]"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((turn, index) => (
              <div
                key={`${turn.role}-${index}`}
                className={
                  turn.role === "user"
                    ? "ml-10 whitespace-pre-wrap rounded-xl bg-[#1f2c4a] px-4 py-3 text-sm text-white"
                    : "mr-6 whitespace-pre-wrap text-sm leading-relaxed text-[#475569]"
                }
              >
                {turn.role === "assistant" ? renderText(turn.content) : turn.content}
              </div>
            ))}

            {busy ? <p className="text-xs text-[#94a3b8]">Looking it up…</p> : null}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            {actions.length > 0 ? (
              <div className="space-y-2">
                {actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg bg-[#1f2c4a] px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-[#16243f]"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <form
            className="border-t border-[#1f2c4a]/10 p-4"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(input);
                }
              }}
              rows={4}
              placeholder="Paste an email or ask what to do"
              className="w-full resize-none rounded-lg border border-[#1f2c4a]/20 bg-[#1f2c4a]/[0.04] px-3 py-2 text-sm text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40 focus:outline-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="rounded-lg bg-[#1f2c4a] px-4 py-2 text-sm font-medium text-white hover:bg-[#16243f] disabled:opacity-40"
              >
                Decide
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
