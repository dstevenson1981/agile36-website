"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createClient } from "@/app/lib/supabase/client";
import {
  POPM_ACTIVITIES,
  POPM_WORKSHOP_BOARD_ID,
  type PopmActivity,
} from "@/app/lib/popm-workshop";

type WorkshopNote = {
  id: string;
  board_id: string;
  activity_id: string;
  body: string;
  author_label: string | null;
  color: string;
  x: number;
  y: number;
  z_index: number;
};

const STICKY_COLORS = ["amber", "peach", "mint", "sky", "blush"] as const;
const COLOR_FILL: Record<string, string> = {
  amber: "#fde68a",
  peach: "#fed7aa",
  mint: "#bbf7d0",
  sky: "#bfdbfe",
  blush: "#fbcfe8",
};

const NAME_KEY = "agile36-popm-workshop-name";
const CLIENT_KEY = "agile36-popm-workshop-client";

function subscribeName() {
  return () => {};
}

function getStoredName() {
  return window.localStorage.getItem(NAME_KEY)?.trim() ?? "";
}

function getServerName() {
  return "";
}

function getOrCreateClientId() {
  if (typeof window === "undefined") return "guest";
  let storedClient = window.localStorage.getItem(CLIENT_KEY);
  if (!storedClient) {
    storedClient = crypto.randomUUID();
    window.localStorage.setItem(CLIENT_KEY, storedClient);
  }
  return storedClient;
}

function nextColor(count: number): string {
  return STICKY_COLORS[count % STICKY_COLORS.length];
}

export default function PopmWorkshopBoard() {
  const [activityId, setActivityId] = useState(POPM_ACTIVITIES[0].id);
  const [notes, setNotes] = useState<WorkshopNote[]>([]);
  const storedName = useSyncExternalStore(subscribeName, getStoredName, getServerName);
  const [name, setName] = useState("");
  const [nameDraft, setNameDraft] = useState("");
  const displayName = name || storedName;
  const needsName = !displayName;
  const [liveCount, setLiveCount] = useState(1);
  const [saving, setSaving] = useState(false);
  const dragRef = useRef<{
    id: string;
    dx: number;
    dy: number;
  } | null>(null);
  const saveTimers = useRef<Record<string, number>>({});
  const clientId = useRef<string | null>(null);
  if (clientId.current == null) clientId.current = getOrCreateClientId();

  const activity = useMemo(
    () => POPM_ACTIVITIES.find((a) => a.id === activityId) ?? POPM_ACTIVITIES[0],
    [activityId],
  );

  const supabase = useMemo(() => createClient(), []);

  const persistNote = useCallback(
    async (id: string, patch: Partial<WorkshopNote>) => {
      setSaving(true);
      const { error } = await supabase
        .from("workshop_notes")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) console.error("[popm-workshop] update", error.message);
      setSaving(false);
    },
    [supabase],
  );

  const queueBodySave = useCallback(
    (id: string, body: string) => {
      window.clearTimeout(saveTimers.current[id]);
      saveTimers.current[id] = window.setTimeout(() => {
        void persistNote(id, { body });
      }, 350);
    },
    [persistNote],
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data, error } = await supabase
        .from("workshop_notes")
        .select("id, board_id, activity_id, body, author_label, color, x, y, z_index")
        .eq("board_id", POPM_WORKSHOP_BOARD_ID)
        .eq("activity_id", activityId)
        .order("created_at", { ascending: true });
      if (cancelled) return;
      if (error) {
        console.error("[popm-workshop] load", error.message);
        return;
      }
      setNotes((data as WorkshopNote[]) ?? []);
    };

    void load();

    const channel = supabase
      .channel(`workshop:${POPM_WORKSHOP_BOARD_ID}:${activityId}`, {
        config: { presence: { key: clientId.current || "guest" } },
      })
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workshop_notes",
          filter: `activity_id=eq.${activityId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const row = payload.new as WorkshopNote;
            if (row.board_id !== POPM_WORKSHOP_BOARD_ID) return;
            setNotes((prev) => (prev.some((n) => n.id === row.id) ? prev : [...prev, row]));
          }
          if (payload.eventType === "UPDATE") {
            const row = payload.new as WorkshopNote;
            setNotes((prev) => prev.map((n) => (n.id === row.id ? { ...n, ...row } : n)));
          }
          if (payload.eventType === "DELETE") {
            const row = payload.old as { id?: string };
            if (row.id) setNotes((prev) => prev.filter((n) => n.id !== row.id));
          }
        },
      )
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setLiveCount(Math.max(1, Object.keys(state).length));
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            client: clientId.current,
            name: displayName || "Guest",
          });
        }
      });

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [activityId, displayName, supabase]);

  const addSticky = async () => {
    const cascade = notes.length;
    const payload = {
      board_id: POPM_WORKSHOP_BOARD_ID,
      activity_id: activityId,
      body: "",
      author_label: displayName || null,
      color: nextColor(cascade),
      x: 36 + (cascade % 6) * 28,
      y: 36 + Math.floor(cascade / 6) * 28,
      z_index: cascade + 1,
    };
    const { data, error } = await supabase
      .from("workshop_notes")
      .insert(payload)
      .select("id, board_id, activity_id, body, author_label, color, x, y, z_index")
      .single();
    if (error) {
      console.error("[popm-workshop] insert", error.message);
      return;
    }
    if (data) {
      setNotes((prev) => (prev.some((n) => n.id === data.id) ? prev : [...prev, data as WorkshopNote]));
    }
  };

  const removeSticky = async (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    const { error } = await supabase.from("workshop_notes").delete().eq("id", id);
    if (error) console.error("[popm-workshop] delete", error.message);
  };

  const onPointerDown = (event: React.PointerEvent, note: WorkshopNote) => {
    if ((event.target as HTMLElement).closest("textarea,button")) return;
    const board = event.currentTarget.closest("[data-board]") as HTMLElement | null;
    if (!board) return;
    event.preventDefault();
    const rect = board.getBoundingClientRect();
    const topZ = notes.reduce((max, n) => Math.max(max, n.z_index), 0) + 1;
    dragRef.current = {
      id: note.id,
      dx: event.clientX - rect.left - note.x,
      dy: event.clientY - rect.top - note.y,
    };
    setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, z_index: topZ } : n)));

    const onMove = (moveEvent: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const x = Math.max(8, moveEvent.clientX - rect.left - drag.dx);
      const y = Math.max(8, moveEvent.clientY - rect.top - drag.dy);
      setNotes((prev) => prev.map((n) => (n.id === drag.id ? { ...n, x, y } : n)));
    };
    const onUp = (upEvent: PointerEvent) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      const drag = dragRef.current;
      dragRef.current = null;
      if (!drag) return;
      const x = Math.max(8, upEvent.clientX - rect.left - drag.dx);
      const y = Math.max(8, upEvent.clientY - rect.top - drag.dy);
      setNotes((prev) => prev.map((n) => (n.id === drag.id ? { ...n, x, y, z_index: topZ } : n)));
      void persistNote(drag.id, { x, y, z_index: topZ });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const saveName = () => {
    const next = nameDraft.trim();
    if (!next) return;
    window.localStorage.setItem(NAME_KEY, next);
    setName(next);
  };

  return (
    <div className="flex min-h-screen bg-[#e8efe6] text-[#1f2c4a]">
      <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[#1f2c4a]/10 bg-[#1f2c4a] text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Live class board
          </p>
          <h1 className="mt-1 text-lg font-semibold tracking-[-0.03em]">POPM workshop</h1>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            Shared like a mural. What you type is what the room sees.
          </p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {POPM_ACTIVITIES.map((item) => (
            <ActivityButton
              key={item.id}
              item={item}
              active={item.id === activityId}
              onClick={() => setActivityId(item.id)}
            />
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f2c4a]/10 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              {activity.code}
            </p>
            <h2 className="truncate text-xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
              {activity.title}
            </h2>
            <p className="mt-0.5 text-sm text-[#475569]">{activity.prompt}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1f2c4a]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#475569]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {liveCount} here
            </span>
            <button
              type="button"
              onClick={() => void addSticky()}
              className="rounded-full bg-[#1f2c4a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16243f]"
            >
              Add sticky
            </button>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto border-b border-[#1f2c4a]/10 bg-white px-3 py-2 md:hidden">
          {POPM_ACTIVITIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivityId(item.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                item.id === activityId
                  ? "bg-[#1f2c4a] text-white"
                  : "bg-[#1f2c4a]/[0.06] text-[#1f2c4a]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div
          data-board
          className="relative min-h-0 flex-1 overflow-auto"
          style={{
            backgroundColor: "#d7e3d4",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(31,44,74,0.12) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="relative min-h-[1100px] min-w-[1100px] p-6">
            {notes.map((note) => (
              <article
                key={note.id}
                onPointerDown={(event) => onPointerDown(event, note)}
                className="absolute w-[210px] cursor-grab rounded-[4px] p-3 shadow-[0_10px_24px_rgba(31,44,74,0.12)] active:cursor-grabbing"
                style={{
                  left: note.x,
                  top: note.y,
                  zIndex: note.z_index,
                  background: COLOR_FILL[note.color] ?? COLOR_FILL.amber,
                  transform: `rotate(${note.z_index % 2 === 0 ? -1.4 : 1.2}deg)`,
                }}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1f2c4a]/55">
                    {note.author_label || "Guest"}
                  </p>
                  <button
                    type="button"
                    onClick={() => void removeSticky(note.id)}
                    className="rounded px-1 text-xs text-[#1f2c4a]/50 hover:bg-[#1f2c4a]/10 hover:text-[#1f2c4a]"
                    aria-label="Remove sticky"
                  >
                    ×
                  </button>
                </div>
                <textarea
                  value={note.body}
                  placeholder="Type here — the room sees it"
                  onChange={(event) => {
                    const body = event.target.value;
                    setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, body } : n)));
                    queueBodySave(note.id, body);
                  }}
                  className="h-[132px] w-full resize-none bg-transparent text-sm leading-snug text-[#1f2c4a] outline-none placeholder:text-[#1f2c4a]/35"
                />
              </article>
            ))}
            {notes.length === 0 ? (
              <p className="max-w-sm pt-8 text-sm text-[#475569]">
                Empty board. Add a sticky and start typing — everyone on this link sees it live.
              </p>
            ) : null}
          </div>
        </div>

        <p className="border-t border-[#1f2c4a]/10 bg-white px-4 py-2 text-[11px] text-[#94a3b8]">
          {saving ? "Saving…" : "Saved to the shared class board"}
          {displayName ? ` · ${displayName}` : ""}
        </p>
      </div>

      {needsName ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2c4a]/50 p-4 backdrop-blur-sm">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveName();
            }}
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              POPM class board
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
              What should we call you?
            </h2>
            <p className="mt-2 text-sm text-[#475569]">
              Your name shows on stickies so the class can tell who added what.
            </p>
            <input
              autoFocus
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value)}
              placeholder="Your name"
              className="mt-4 w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.03] px-3 py-2.5 text-sm text-[#1f2c4a] outline-none focus:border-[#1f2c4a]/40"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-[#1f2c4a] py-2.5 text-sm font-semibold text-white hover:bg-[#16243f]"
            >
              Join the board
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

function ActivityButton({
  item,
  active,
  onClick,
}: {
  item: PopmActivity;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2.5 text-left transition ${
        active ? "bg-white text-[#1f2c4a]" : "text-white/80 hover:bg-white/10"
      }`}
    >
      <span className={`block text-[10px] uppercase tracking-[0.14em] ${active ? "text-[#64748b]" : "text-white/45"}`}>
        {item.code}
      </span>
      <span className="block text-sm font-medium leading-snug">{item.title}</span>
    </button>
  );
}
