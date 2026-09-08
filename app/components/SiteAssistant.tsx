"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  captureIdentityFromText,
  courseInterestFromPath,
  greetingFor,
  loadVisitor,
  recordPageView,
  visitorHint,
  type CourseInterest,
} from "@/app/lib/site-assistant/journey";
import { SITE_CHAT_EVENT } from "@/app/lib/site-assistant/open-chat";
import {
  PUBLIC_CATALOG_COURSES,
  getCatalogCourseSlug,
} from "@/app/lib/course-catalog";
import { formatDateRange } from "@/app/lib/schedule-display";

type ChatAttachment = { name: string; type: string; previewUrl?: string };
type ChatTurn = {
  role: "user" | "assistant";
  content: string;
  attachments?: ChatAttachment[];
};
type Action = { label: string; href: string };
type NextClass = {
  dates: string;
  priceUsd: number | null;
  enrollHref: string;
  weekend: boolean;
};
type PendingFile = { file: File; previewUrl?: string };

const AGENT = {
  name: "Angela",
  from: "Angela from AGILE36",
  image: "/angela.jpg",
  logo: "/Favicon/web-app-manifest-192x192.png",
};

const HIDDEN_PREFIXES = ["/admin", "/popm-workshop", "/unsubscribe"];
const SESSION_KEY = "a36_chat_v4";
const DISMISS_KEY = "a36_chat_dismissed";
const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPT = "image/*,.pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp,.gif";

function hyperSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.sessionStorage.getItem("_hyper_sid") || "";
    if (!id) {
      id = `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      window.sessionStorage.setItem("_hyper_sid", id);
    }
    return id;
  } catch {
    return "";
  }
}

function withCatalogPrice(interest: CourseInterest): CourseInterest {
  const course = PUBLIC_CATALOG_COURSES.find((item) => getCatalogCourseSlug(item) === interest.slug);
  return { ...interest, priceUsd: course?.price ?? interest.priceUsd };
}

function todayLabel() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).replace(/^(\w+)\s/, "$1, ");
}

function readSession(): { messages: ChatTurn[]; actions: Action[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { messages?: ChatTurn[]; actions?: Action[] };
    if (!Array.isArray(parsed.messages)) return null;
    return {
      messages: parsed.messages.filter(
        (turn) => turn && (turn.role === "user" || turn.role === "assistant") && typeof turn.content === "string",
      ),
      actions: Array.isArray(parsed.actions) ? parsed.actions : [],
    };
  } catch {
    return null;
  }
}

function writeSession(state: { messages: ChatTurn[]; actions: Action[] }) {
  try {
    const messages = state.messages.map((turn) => ({
      role: turn.role,
      content: turn.content,
      attachments: turn.attachments?.map((file) => ({ name: file.name, type: file.type })),
    }));
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages, actions: state.actions }));
  } catch {
    /* private mode */
  }
}

function renderText(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={index}
          href={link[2]}
          className="font-medium text-[#1a73e8] underline underline-offset-2"
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

function previewText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("read_failed"));
    reader.readAsDataURL(file);
  });
}

async function compressImage(file: File): Promise<{ name: string; type: string; dataUrl: string } | null> {
  if (!file.type.startsWith("image/")) return null;
  const dataUrl = await fileToDataUrl(file);
  const image = document.createElement("img");
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("image_failed"));
    image.src = dataUrl;
  });
  const max = 960;
  const scale = Math.min(1, max / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return { name: file.name, type: file.type, dataUrl };
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return {
    name: file.name,
    type: "image/jpeg",
    dataUrl: canvas.toDataURL("image/jpeg", 0.72),
  };
}

function AgentAvatar({
  src,
  size = 40,
  online = false,
}: {
  src: string;
  size?: number;
  online?: boolean;
}) {
  return (
    <span className="relative shrink-0" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="h-full w-full rounded-full object-cover"
      />
      {online ? (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#1a73e8] bg-[#22c55e]" />
      ) : null}
    </span>
  );
}

export default function SiteAssistant() {
  const pathname = usePathname() || "/";
  const [framed, setFramed] = useState(false);
  const hidden =
    framed ||
    HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const [open, setOpen] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [pageTitle, setPageTitle] = useState("");
  const [interest, setInterest] = useState<CourseInterest | null>(null);
  const [nextClass, setNextClass] = useState<NextClass | null>(null);
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [takenOver, setTakenOver] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const startedRef = useRef(false);
  const hydratedRef = useRef(false);
  const remoteMessageCountRef = useRef(0);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    setFramed(window.self !== window.top);
    const saved = readSession();
    if (saved) {
      setMessages(saved.messages);
      setActions(saved.actions);
      if (saved.messages.length > 0) startedRef.current = true;
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    const title = document.title.replace(/\s+[|·].*$/, "").trim();
    setPageTitle(title);
    recordPageView(pathname, title);
    const nextInterest = courseInterestFromPath(pathname);
    setInterest(nextInterest ? withCatalogPrice(nextInterest) : null);
  }, [pathname]);

  useEffect(() => {
    if (!interest) {
      setNextClass(null);
      return;
    }
    let cancelled = false;
    fetch(`/api/course-schedules?course_slug=${encodeURIComponent(interest.slug)}`, {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((payload: { data?: Array<Record<string, unknown>> }) => {
        if (cancelled) return;
        const row = payload.data?.[0];
        if (!row) {
          setNextClass(null);
          return;
        }
        const start = String(row.start_date ?? "");
        const end = String(row.end_date ?? "");
        const timezone = String(row.timezone ?? "America/New_York");
        const scheduleId = String(row.id ?? "");
        setNextClass({
          dates: start && end ? formatDateRange(start, end, timezone) : start,
          priceUsd: row.price != null ? Number(row.price) : interest.priceUsd,
          weekend: Boolean(row.is_weekend),
          enrollHref: scheduleId
            ? `/courses/${interest.slug}/schedule/checkout?schedule=${scheduleId}&course=${interest.slug}`
            : interest.scheduleHref,
        });
      })
      .catch(() => {
        if (!cancelled) setNextClass(null);
      });
    return () => {
      cancelled = true;
    };
  }, [interest]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    writeSession({ messages, actions });
  }, [messages, actions]);

  const openChat = useCallback((expand = true) => {
    if (!startedRef.current) {
      startedRef.current = true;
      setBusy(false);
      setError(null);
      setMessages([{ role: "assistant", content: greetingFor(loadVisitor(), pathRef.current) }]);
    }
    setOpen(expand);
    if (expand) setPromptVisible(false);
    const sessionId = hyperSessionId();
    if (!sessionId) return;
    void fetch("/api/site-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seed: true,
        sessionId,
        pagePath: pathRef.current,
      }),
    })
      .then((response) => response.json())
      .then((payload: { takenOver?: boolean; messages?: ChatTurn[] }) => {
        if (payload.takenOver) setTakenOver(true);
        if (Array.isArray(payload.messages) && payload.messages.length > 0) {
          startedRef.current = true;
          setMessages(payload.messages);
        }
      })
      .catch(() => {
        /* local greeting still shows */
      });
  }, []);

  useEffect(() => {
    const onOpen = () => openChat();
    window.addEventListener(SITE_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(SITE_CHAT_EVENT, onOpen);
  }, [openChat]);

  useEffect(() => {
    if (hidden || window.self !== window.top) return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      /* private mode */
    }
    const timer = window.setTimeout(() => {
      openChat(false);
      setPromptVisible(true);
    }, 900);
    return () => {
      window.clearTimeout(timer);
    };
  }, [hidden, openChat]);

  useEffect(() => {
    if (hidden || window.self !== window.top) return;
    const tick = async () => {
      const sessionId = hyperSessionId();
      if (!sessionId) return;
      try {
        const response = await fetch(`/api/site-assistant/live?session=${encodeURIComponent(sessionId)}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          takenOver?: boolean;
          messages?: ChatTurn[];
        };
        const remote = Array.isArray(payload.messages) ? payload.messages : [];
        const live = Boolean(payload.takenOver);
        setTakenOver(live);
        if (live) {
          setActions([]);
          try {
            sessionStorage.removeItem(DISMISS_KEY);
          } catch {
            /* private mode */
          }
          startedRef.current = true;
        }
        if (remote.length > 0) {
          if (remote.length > remoteMessageCountRef.current) {
            setPromptVisible(true);
          }
          remoteMessageCountRef.current = remote.length;
          setMessages((current) => (remote.length >= current.length ? remote : current));
        }
      } catch {
        /* keep local transcript */
      }
    };
    const timer = window.setInterval(() => void tick(), 2500);
    void tick();
    return () => window.clearInterval(timer);
  }, [hidden]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ block: "end" });
    inputRef.current?.focus();
  }, [open, messages, busy]);

  const pendingRef = useRef<PendingFile[]>([]);
  pendingRef.current = pending;

  useEffect(() => {
    return () => {
      pendingRef.current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...pending];
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) break;
      if (file.size > MAX_FILE_BYTES) {
        setError("Keep each file under 5 MB.");
        continue;
      }
      next.push({
        file,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      });
    }
    setPending(next.slice(0, MAX_FILES));
    if (fileRef.current) fileRef.current.value = "";
  }

  function removePending(index: number) {
    setPending((current) => {
      const item = current[index];
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return current.filter((_, i) => i !== index);
    });
  }

  async function send(text: string) {
    const question = text.trim();
    if ((!question && pending.length === 0) || busy) return;
    const files = pending;
    const names = files.map((item) => item.file.name);
    const display =
      question ||
      (names.length ? `I attached ${names.join(", ")}.` : "");
    captureIdentityFromText(display);
    const nextMessages: ChatTurn[] = [
      ...messages,
      {
        role: "user",
        content: display,
        attachments: files.map((item) => ({
          name: item.file.name,
          type: item.file.type,
          previewUrl: item.previewUrl,
        })),
      },
    ];
    setMessages(nextMessages);
    setInput("");
    setPending([]);
    setBusy(true);
    setError(null);
    setActions([]);

    try {
      const images = (
        await Promise.all(files.map((item) => compressImage(item.file)))
      ).filter((item): item is { name: string; type: string; dataUrl: string } => !!item);
      const otherNames = files
        .filter((item) => !item.file.type.startsWith("image/"))
        .map((item) => item.file.name);
      const outbound = otherNames.length
        ? `${display}\n\nAttached files: ${otherNames.join(", ")}`
        : display;
      const payloadMessages = nextMessages.map((turn, index) =>
        index === nextMessages.length - 1 ? { ...turn, content: outbound } : turn,
      );

      const response = await fetch("/api/site-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          pagePath: pathRef.current,
          pageTitle,
          visitor: visitorHint(loadVisitor()),
          images,
          sessionId: hyperSessionId(),
        }),
      });
      const payload = (await response.json()) as {
        reply?: string;
        actions?: Action[];
        error?: string;
        takenOver?: boolean;
        messages?: ChatTurn[];
      };
      if (!response.ok) {
        setError(payload.error || "Try again.");
        return;
      }
      if (payload.takenOver) {
        setTakenOver(true);
        if (Array.isArray(payload.messages) && payload.messages.length > 0) {
          setMessages(payload.messages);
        }
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

  if (hidden) return null;

  const latestAssistantMessage =
    [...messages].reverse().find((message) => message.role === "assistant")?.content ||
    "Hi! I can help you find the right certification and next available class.";

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section
          className="flex h-[min(36rem,calc(100dvh-6.5rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(26,115,232,0.28)]"
          aria-label="Chat with Angela"
        >
          <header
            className="flex items-center gap-3 px-3 py-3 text-white"
            style={{
              backgroundColor: "#1a73e8",
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 10px, transparent 10px 20px), repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0 10px, transparent 10px 20px)",
            }}
          >
            <AgentAvatar src={AGENT.image} online />
            <p className="min-w-0 flex-1 text-[15px] font-semibold tracking-[-0.01em]">
              {AGENT.from}
            </p>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setPromptVisible(false);
                try {
                  sessionStorage.setItem(DISMISS_KEY, "1");
                } catch {
                  /* private mode */
                }
              }}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-black/20 text-white hover:bg-black/30"
              aria-label="Minimize chat"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-white px-3 py-4">
            <p className="text-center text-[13px] font-semibold text-[#334155]">{todayLabel()}</p>

            {interest ? (
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                  {interest.label}
                </p>
                <p className="mt-1 text-sm text-[#1f2c4a]">
                  {nextClass?.dates
                    ? `${nextClass.weekend ? "Weekend" : "Next class"} · ${nextClass.dates}`
                    : "I can pull the next live date."}
                </p>
                {(nextClass?.priceUsd ?? interest.priceUsd) != null ? (
                  <p className="mt-0.5 text-sm text-[#475569]">
                    ${Math.round(nextClass?.priceUsd ?? interest.priceUsd ?? 0)}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-col gap-2">
                  {nextClass?.enrollHref ? (
                    <a
                      href={nextClass.enrollHref}
                      className="block rounded-lg bg-[#1a73e8] px-3 py-2 text-center text-sm font-medium text-white hover:bg-[#1557c0]"
                    >
                      Enroll in {interest.label}
                    </a>
                  ) : null}
                  <a
                    href={interest.scheduleHref}
                    className="block text-center text-sm text-[#1a73e8] underline-offset-2 hover:underline"
                  >
                    See all {interest.label} dates
                  </a>
                </div>
              </div>
            ) : null}

            {messages.map((turn, index) =>
              turn.role === "user" ? (
                <div key={`user-${index}`} className="flex justify-end">
                  <div className="max-w-[82%]">
                    {turn.attachments && turn.attachments.length > 0 ? (
                      <div className="mb-1 flex flex-wrap justify-end gap-1">
                        {turn.attachments.map((file) =>
                          file.previewUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
                            <img
                              key={file.name}
                              src={file.previewUrl}
                              alt={file.name}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                          ) : (
                            <span
                              key={file.name}
                              className="rounded-lg bg-[#dbeafe] px-2 py-1 text-[11px] text-[#1e3a8a]"
                            >
                              {file.name}
                            </span>
                          ),
                        )}
                      </div>
                    ) : null}
                    <div className="whitespace-pre-wrap rounded-2xl bg-[#1a73e8] px-3 py-2 text-[15px] leading-relaxed text-white">
                      {turn.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={`assistant-${index}`} className="flex items-end gap-2">
                  <AgentAvatar src={index === 0 ? AGENT.logo : AGENT.image} size={32} />
                  <div className="max-w-[82%]">
                    {index > 0 ? (
                      <p className="mb-0.5 text-[11px] font-medium text-[#94a3b8]">{AGENT.name}</p>
                    ) : null}
                    <div className="whitespace-pre-wrap rounded-2xl bg-[#eef1f4] px-3 py-2 text-[15px] leading-relaxed text-[#334155]">
                      {renderText(turn.content)}
                    </div>
                  </div>
                </div>
              ),
            )}

            {busy && !takenOver && messages.length > 0 ? (
              <p className="pl-10 text-xs text-[#94a3b8]">Angela is typing…</p>
            ) : null}
            {error ? <p className="pl-10 text-sm text-red-600">{error}</p> : null}

            {actions.length > 0 ? (
              <div className="space-y-2 pl-10">
                {actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="block rounded-lg bg-[#1a73e8] px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-[#1557c0]"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <form
            className="border-t border-[#e2e8f0] bg-white p-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            {pending.length > 0 ? (
              <div className="mb-2 flex flex-wrap gap-2 px-1">
                {pending.map((item, index) => (
                  <span
                    key={`${item.file.name}-${index}`}
                    className="flex items-center gap-1 rounded-lg bg-[#f1f5f9] px-2 py-1 text-[11px] text-[#334155]"
                  >
                    {item.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
                      <img src={item.previewUrl} alt="" className="h-6 w-6 rounded object-cover" />
                    ) : null}
                    <span className="max-w-[9rem] truncate">{item.file.name}</span>
                    <button
                      type="button"
                      onClick={() => removePending(index)}
                      className="text-[#94a3b8] hover:text-[#1f2c4a]"
                      aria-label={`Remove ${item.file.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
            <div className="flex items-end gap-1">
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPT}
                multiple
                className="hidden"
                onChange={(event) => addFiles(event.target.files)}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1a73e8]"
                aria-label="Add attachment"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                  />
                </svg>
              </button>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void send(input);
                  }
                }}
                rows={2}
                placeholder="Your query"
                className="min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-[#1f2c4a] placeholder:font-mono placeholder:text-[#94a3b8] focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || (!input.trim() && pending.length === 0)}
                className="mb-1 rounded-lg bg-[#1a73e8] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#1557c0] disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      ) : (
        <div className="flex max-w-[calc(100vw-2rem)] items-end gap-2 sm:gap-3">
          {promptVisible ? (
            <div className="relative w-[min(21rem,calc(100vw-6.5rem))] rounded-2xl border border-[#1f2c4a]/15 bg-white p-4 pr-9 shadow-[0_16px_40px_rgba(31,44,74,0.2)] sm:p-5 sm:pr-10">
              <button
                type="button"
                onClick={() => {
                  setPromptVisible(false);
                  try {
                    sessionStorage.setItem(DISMISS_KEY, "1");
                  } catch {
                    /* private mode */
                  }
                }}
                className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-lg font-semibold text-[#94a3b8] hover:bg-[#eef3f8] hover:text-[#475569]"
                aria-label="Dismiss chat message"
              >
                ×
              </button>
              <button type="button" onClick={() => openChat()} className="block w-full text-left" aria-label="Open chat with Angela">
                <span className="flex items-center gap-2">
                  <AgentAvatar src={AGENT.image} size={30} online />
                  <span className="text-sm font-semibold text-[#1f2c4a]">{AGENT.from}</span>
                </span>
                <span className="mt-3 line-clamp-2 text-[15px] font-medium leading-6 text-[#334155]">
                  {previewText(latestAssistantMessage)}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a73e8]">
                  Reply to Angela
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </span>
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => openChat()}
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-white shadow-[0_12px_30px_rgba(26,115,232,0.35)] transition hover:-translate-y-0.5 hover:bg-[#1557c0] sm:h-16 sm:w-16"
            aria-expanded={false}
            aria-label="Chat with Angela"
          >
            <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20 11.5a8 8 0 0 1-8.4 8A9.5 9.5 0 0 1 7.7 18.4L3 20l1.5-4.3A8 8 0 1 1 20 11.5Z" />
            </svg>
            {promptVisible ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold text-white">
                1
              </span>
            ) : null}
          </button>
        </div>
      )}
    </div>
  );
}
