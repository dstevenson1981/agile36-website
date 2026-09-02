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
  lane: string;
};

type WsjfRow = {
  feature: string;
  ubv: string;
  time: string;
  rroe: string;
  jobSize: string;
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
const NOTE_SELECT =
  "id, board_id, activity_id, body, author_label, color, x, y, z_index, lane";

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

function emptyWsjf(): WsjfRow {
  return { feature: "", ubv: "", time: "", rroe: "", jobSize: "" };
}

function parseWsjf(body: string): WsjfRow {
  try {
    const parsed = JSON.parse(body) as Partial<WsjfRow>;
    if (parsed && typeof parsed === "object") {
      return {
        feature: String(parsed.feature ?? ""),
        ubv: String(parsed.ubv ?? ""),
        time: String(parsed.time ?? ""),
        rroe: String(parsed.rroe ?? ""),
        jobSize: String(parsed.jobSize ?? ""),
      };
    }
  } catch {
    /* plain text fallback */
  }
  return { ...emptyWsjf(), feature: body };
}

function fib(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
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
  const saveTimers = useRef<Record<string, number>>({});
  const clientId = useRef<string | null>(null);
  if (clientId.current == null) clientId.current = getOrCreateClientId();

  const activity = useMemo(
    () => POPM_ACTIVITIES.find((item) => item.id === activityId) ?? POPM_ACTIVITIES[0],
    [activityId],
  );

  const supabase = useMemo(() => createClient(), []);

  const persistNote = useCallback(
    async (id: string, patch: { body?: string; lane?: string }) => {
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
        .select(NOTE_SELECT)
        .eq("board_id", POPM_WORKSHOP_BOARD_ID)
        .eq("activity_id", activityId)
        .order("created_at", { ascending: true });
      if (cancelled) return;
      if (error) {
        console.error("[popm-workshop] load", error.message);
        return;
      }
      setNotes(((data as WorkshopNote[]) ?? []).map((note) => ({ ...note, lane: note.lane || "board" })));
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
            setNotes((prev) => (prev.some((n) => n.id === row.id) ? prev : [...prev, { ...row, lane: row.lane || "board" }]));
          }
          if (payload.eventType === "UPDATE") {
            const row = payload.new as WorkshopNote;
            setNotes((prev) => prev.map((n) => (n.id === row.id ? { ...n, ...row, lane: row.lane || n.lane } : n)));
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

  const addSticky = async (lane: string, starter: string = "") => {
    const cascade = notes.filter((note) => note.lane === lane).length;
    const payload = {
      board_id: POPM_WORKSHOP_BOARD_ID,
      activity_id: activityId,
      body: starter,
      author_label: displayName || null,
      color: nextColor(cascade),
      x: 40,
      y: 40,
      z_index: cascade + 1,
      lane,
    };
    const { data, error } = await supabase.from("workshop_notes").insert(payload).select(NOTE_SELECT).single();
    if (error) {
      console.error("[popm-workshop] insert", error.message);
      return;
    }
    if (data) {
      const row = data as WorkshopNote;
      setNotes((prev) => (prev.some((n) => n.id === row.id) ? prev : [...prev, { ...row, lane: row.lane || lane }]));
    }
  };

  const removeSticky = async (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    const { error } = await supabase.from("workshop_notes").delete().eq("id", id);
    if (error) console.error("[popm-workshop] delete", error.message);
  };

  const moveSticky = async (id: string, lane: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, lane } : n)));
    await persistNote(id, { lane });
  };

  const saveName = () => {
    const next = nameDraft.trim();
    if (!next) return;
    window.localStorage.setItem(NAME_KEY, next);
    setName(next);
  };

  const notesIn = (lane: string) => notes.filter((note) => (note.lane || "board") === lane);

  return (
    <div className="flex min-h-screen bg-[#eef3f8] text-[#1f2c4a]">
      <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[#1f2c4a]/10 bg-[#1f2c4a] text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
            POPM class board
          </p>
          <h1 className="mt-1 text-lg font-semibold tracking-[-0.03em]">Lessons &amp; Activities</h1>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            Three live templates. What you type, the room sees.
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
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f2c4a]/10 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              {activity.code}
            </p>
            <h2 className="truncate text-xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
              {activity.title}
            </h2>
            <p className="mt-0.5 text-sm text-[#475569]">{activity.prompt}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1f2c4a]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#475569]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {liveCount} here
          </span>
        </header>

        <div className="flex gap-2 overflow-x-auto border-b border-[#1f2c4a]/10 bg-white px-3 py-2 md:hidden">
          {POPM_ACTIVITIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivityId(item.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                item.id === activityId ? "bg-[#1f2c4a] text-white" : "bg-[#1f2c4a]/[0.06] text-[#1f2c4a]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
          {activity.template === "storm" ? (
            <StormTemplate
              stormNotes={notesIn("storm")}
              refinedNotes={notesIn("refined")}
              onAdd={(lane) => void addSticky(lane)}
              onRemove={(id) => void removeSticky(id)}
              onMove={(id, lane) => void moveSticky(id, lane)}
              onBody={(id, body) => {
                setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, body } : n)));
                queueBodySave(id, body);
              }}
            />
          ) : null}
          {activity.template === "wsjf" ? (
            <WsjfTemplate
              rows={notesIn("wsjf-row")}
              onAdd={() => void addSticky("wsjf-row", JSON.stringify(emptyWsjf()))}
              onRemove={(id) => void removeSticky(id)}
              onChange={(id, row) => {
                const body = JSON.stringify(row);
                setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, body } : n)));
                queueBodySave(id, body);
              }}
            />
          ) : null}
          {activity.template === "stories" ? (
            <StoriesTemplate
              featureNotes={notesIn("feature")}
              storyNotes={notesIn("story")}
              acNotes={notesIn("ac")}
              onAdd={(lane) => void addSticky(lane)}
              onRemove={(id) => void removeSticky(id)}
              onBody={(id, body) => {
                setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, body } : n)));
                queueBodySave(id, body);
              }}
            />
          ) : null}
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
              Your name shows on cards so the class can tell who added what.
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

function StickyCard({
  note,
  placeholder,
  onRemove,
  onBody,
  onMove,
  moveLabel,
}: {
  note: WorkshopNote;
  placeholder: string;
  onRemove: () => void;
  onBody: (body: string) => void;
  onMove?: () => void;
  moveLabel?: string;
}) {
  return (
    <article
      className="relative z-10 w-[200px] rounded-[3px] p-3 shadow-[0_8px_18px_rgba(31,44,74,0.12)]"
      style={{
        background: COLOR_FILL[note.color] ?? COLOR_FILL.amber,
        transform: `rotate(${note.z_index % 2 === 0 ? -1.1 : 0.9}deg)`,
      }}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1f2c4a]/55">
          {note.author_label || "Guest"}
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="rounded px-1 text-xs text-[#1f2c4a]/50 hover:bg-[#1f2c4a]/10 hover:text-[#1f2c4a]"
          aria-label="Remove sticky"
        >
          ×
        </button>
      </div>
      <textarea
        value={note.body}
        placeholder={placeholder}
        onChange={(event) => onBody(event.target.value)}
        className="h-[120px] w-full resize-none bg-transparent text-sm leading-snug text-[#1f2c4a] outline-none placeholder:text-[#1f2c4a]/35"
      />
      {onMove ? (
        <button
          type="button"
          onClick={onMove}
          className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1f2c4a]/60 hover:text-[#1f2c4a]"
        >
          {moveLabel || "Move"}
        </button>
      ) : null}
    </article>
  );
}

function TemplateLane({
  title,
  hint,
  headerClass,
  bodyClass,
  notes,
  placeholder,
  addLabel,
  onAdd,
  onRemove,
  onBody,
}: {
  title: string;
  hint?: string;
  headerClass: string;
  bodyClass: string;
  notes: WorkshopNote[];
  placeholder: string;
  addLabel: string;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onBody: (id: string, body: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#1f2c4a]/10 bg-white shadow-sm">
      <div className={`flex items-center justify-between gap-3 px-4 py-2.5 ${headerClass}`}>
        <h3 className="text-sm font-semibold tracking-[-0.02em]">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold hover:bg-white/25"
        >
          {addLabel}
        </button>
      </div>
      <div className={`min-h-[220px] p-4 ${bodyClass}`}>
        {hint ? <p className="mb-3 text-xs text-[#64748b]">{hint}</p> : null}
        <div className="flex flex-wrap gap-4">
          {notes.map((note) => (
            <StickyCard
              key={note.id}
              note={note}
              placeholder={placeholder}
              onRemove={() => onRemove(note.id)}
              onBody={(body) => onBody(note.id, body)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const GRID_BG =
  "bg-[linear-gradient(#d7e3ef_1px,transparent_1px),linear-gradient(90deg,#d7e3ef_1px,transparent_1px)] bg-[size:28px_28px] bg-[#eef6fb]";

function StormTemplate({
  stormNotes,
  refinedNotes,
  onAdd,
  onRemove,
  onMove,
  onBody,
}: {
  stormNotes: WorkshopNote[];
  refinedNotes: WorkshopNote[];
  onAdd: (lane: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, lane: string) => void;
  onBody: (id: string, body: string) => void;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <section className="overflow-hidden rounded-xl border border-[#1f2c4a]/10 bg-white shadow-sm">
        <div className="bg-[#16325c] px-5 py-2.5">
          <h3 className="text-sm font-semibold tracking-[-0.02em] text-white">Epic</h3>
        </div>
        <div className="relative min-h-[280px] bg-white p-5">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-10 opacity-[0.18]">
            <svg viewBox="0 0 220 180" className="h-40 w-48 text-[#7dd3fc]" aria-hidden>
              <path
                fill="currentColor"
                d="M110 18c28 0 52 18 62 44 16 4 28 18 28 36 0 20-16 36-36 38-10 22-34 36-60 36s-50-14-60-36c-20-2-36-18-36-38 0-18 12-32 28-36 10-26 34-44 62-44z"
              />
              <path
                fill="none"
                stroke="#16325c"
                strokeWidth="3"
                d="M70 108c18-22 38-28 70-18M88 128c22-8 40-6 58 10"
              />
            </svg>
          </div>
          <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
            <h4 className="text-xl font-medium tracking-[-0.03em] text-[#64748b]">Feature Storming</h4>
            <button
              type="button"
              onClick={() => onAdd("storm")}
              className="rounded-full bg-[#16325c] px-3 py-1 text-xs font-semibold text-white hover:bg-[#1f2c4a]"
            >
              Add feature
            </button>
          </div>
          <div className="relative z-10 flex flex-wrap gap-4">
            {stormNotes.map((note) => (
              <StickyCard
                key={note.id}
                note={note}
                placeholder="Feature name"
                onRemove={() => onRemove(note.id)}
                onBody={(body) => onBody(note.id, body)}
                onMove={() => onMove(note.id, "refined")}
                moveLabel="Move to refined →"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-[#1f2c4a]/10 bg-white shadow-sm">
        <div className="bg-[#2b6cb0] px-5 py-2.5 text-center">
          <h3 className="text-sm font-semibold tracking-[-0.02em] text-white">Refined Features</h3>
        </div>
        <div className={`min-h-[260px] p-5 ${GRID_BG}`}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs text-[#64748b]">
              Move keepers here. Add benefit and acceptance criteria on the sticky.
            </p>
            <button
              type="button"
              onClick={() => onAdd("refined")}
              className="rounded-full bg-[#2b6cb0] px-3 py-1 text-xs font-semibold text-white hover:bg-[#245ea0]"
            >
              Add refined feature
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {refinedNotes.map((note) => (
              <StickyCard
                key={note.id}
                note={note}
                placeholder="Refined feature + benefit + AC"
                onRemove={() => onRemove(note.id)}
                onBody={(body) => onBody(note.id, body)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StoriesTemplate({
  featureNotes,
  storyNotes,
  acNotes,
  onAdd,
  onRemove,
  onBody,
}: {
  featureNotes: WorkshopNote[];
  storyNotes: WorkshopNote[];
  acNotes: WorkshopNote[];
  onAdd: (lane: string) => void;
  onRemove: (id: string) => void;
  onBody: (id: string, body: string) => void;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <TemplateLane
        title="Selected Feature"
        hint="Enter selected Feature here."
        headerClass="bg-[#16325c] text-white"
        bodyClass="bg-white"
        notes={featureNotes}
        placeholder="FEATURE: name. Benefit. AC."
        addLabel="Add feature"
        onAdd={() => onAdd("feature")}
        onRemove={onRemove}
        onBody={onBody}
      />
      <section className="overflow-hidden rounded-xl border border-[#1f2c4a]/10 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 bg-[#16325c] px-4 py-2.5 text-white">
          <h3 className="text-sm font-semibold tracking-[-0.02em]">Refined Story</h3>
          <button
            type="button"
            onClick={() => onAdd("story")}
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold hover:bg-white/25"
          >
            Add story
          </button>
        </div>
        <div className={`flex min-h-[220px] ${GRID_BG}`}>
          <div className="flex w-[120px] shrink-0 flex-col justify-center gap-6 border-r border-[#1f2c4a]/10 bg-white/70 px-3 py-6 text-sm font-medium text-[#64748b]">
            <p>As a…</p>
            <p>I want…</p>
            <p>So that…</p>
          </div>
          <div className="flex flex-1 flex-wrap gap-4 p-4">
            {storyNotes.map((note) => (
              <StickyCard
                key={note.id}
                note={note}
                placeholder={"As a …\nI want …\nSo that …"}
                onRemove={() => onRemove(note.id)}
                onBody={(body) => onBody(note.id, body)}
              />
            ))}
          </div>
        </div>
      </section>
      <TemplateLane
        title="Acceptance Criteria"
        hint="What must be true for this story to be done?"
        headerClass="bg-[#16325c] text-white"
        bodyClass={GRID_BG}
        notes={acNotes}
        placeholder="Given / when / then, or a short AC list"
        addLabel="Add AC"
        onAdd={() => onAdd("ac")}
        onRemove={onRemove}
        onBody={onBody}
      />
    </div>
  );
}

function WsjfTemplate({
  rows,
  onAdd,
  onRemove,
  onChange,
}: {
  rows: WorkshopNote[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, row: WsjfRow) => void;
}) {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-[#1f2c4a]/10 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#1f2c4a]/10 bg-white px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold tracking-[-0.02em] text-[#16325c]">
            Prioritize Features using WSJF
          </h3>
          <p className="text-[11px] text-[#64748b]">Fibonacci: 1, 2, 3, 5, 8, 13, 21</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full bg-[#16325c] px-3 py-1 text-xs font-semibold text-white hover:bg-[#1f2c4a]"
        >
          Add feature row
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#1f2c4a]/15 text-left text-[#16325c]">
              <th className="px-3 py-3 font-semibold">
                Feature
                <span className="mt-0.5 block text-[10px] font-normal text-[#94a3b8]">1, 2, 3, 5, 8, 13, 21</span>
              </th>
              <th className="px-3 py-3 font-semibold">User-business value</th>
              <th className="px-3 py-3 text-center font-semibold text-[#94a3b8]">+</th>
              <th className="px-3 py-3 font-semibold">Time criticality</th>
              <th className="px-3 py-3 text-center font-semibold text-[#94a3b8]">+</th>
              <th className="px-3 py-3 font-semibold">RR / OE value</th>
              <th className="px-3 py-3 text-center font-semibold text-[#94a3b8]">=</th>
              <th className="px-3 py-3 font-semibold">Cost of Delay</th>
              <th className="px-3 py-3 text-center font-semibold text-[#94a3b8]">÷</th>
              <th className="px-3 py-3 font-semibold">Job size</th>
              <th className="px-3 py-3 font-semibold">WSJF</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((note) => {
              const row = parseWsjf(note.body);
              const cost = fib(row.ubv) + fib(row.time) + fib(row.rroe);
              const size = fib(row.jobSize);
              const score = size > 0 ? (cost / size).toFixed(2) : "—";
              const patch = (part: Partial<WsjfRow>) => onChange(note.id, { ...row, ...part });
              return (
                <tr key={note.id} className="border-t border-[#1f2c4a]/10">
                  <td className="px-2 py-2">
                    <input
                      value={row.feature}
                      onChange={(event) => patch({ feature: event.target.value })}
                      placeholder="Feature"
                      className="w-full rounded border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-2 py-1.5 text-[#1f2c4a] outline-none"
                    />
                  </td>
                  <WsjfCell value={row.ubv} onChange={(ubv) => patch({ ubv })} />
                  <td className="text-center text-[#94a3b8]">+</td>
                  <WsjfCell value={row.time} onChange={(time) => patch({ time })} />
                  <td className="text-center text-[#94a3b8]">+</td>
                  <WsjfCell value={row.rroe} onChange={(rroe) => patch({ rroe })} />
                  <td className="text-center text-[#94a3b8]">=</td>
                  <td className="px-3 py-2 font-semibold text-[#1f2c4a]">{cost || "—"}</td>
                  <td className="text-center text-[#94a3b8]">÷</td>
                  <WsjfCell value={row.jobSize} onChange={(jobSize) => patch({ jobSize })} />
                  <td className="px-3 py-2 font-semibold text-[#d97706]">{score}</td>
                  <td className="px-2 py-2">
                    <button
                      type="button"
                      onClick={() => onRemove(note.id)}
                      className="text-xs text-[#94a3b8] hover:text-[#1f2c4a]"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-8 text-sm text-[#64748b]">
                  Add a feature row. Scores save live for everyone on this link.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WsjfCell({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <td className="px-2 py-2">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="1–21"
        className="w-20 rounded border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-2 py-1.5 text-center text-[#1f2c4a] outline-none"
      />
    </td>
  );
}
