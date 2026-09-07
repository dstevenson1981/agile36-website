import { supabaseAdmin } from "@/app/lib/hyper/db";
import { OPENING_MESSAGE } from "./journey";

export type StoredRole = "user" | "assistant" | "owner";

export type StoredTurn = {
  id: string;
  role: StoredRole;
  content: string;
  at: string;
};

export type StoredChat = {
  sessionId: string;
  conversationId: string;
  takenOver: boolean;
  messages: StoredTurn[];
};

function admin() {
  return supabaseAdmin();
}

function asRole(value: unknown): StoredRole | null {
  return value === "user" || value === "assistant" || value === "owner" ? value : null;
}

export async function getChat(sessionId: string): Promise<StoredChat | null> {
  const sb = admin();
  const sid = sessionId.trim().slice(0, 80);
  if (!sb || !sid) return null;

  const { data: convo } = await sb
    .from("chat_conversations")
    .select("id, session_id, taken_over")
    .eq("session_id", sid)
    .maybeSingle();
  if (!convo) return null;

  const { data: rows } = await sb
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("conversation_id", convo.id)
    .order("created_at", { ascending: true })
    .limit(80);

  return {
    sessionId: sid,
    conversationId: String(convo.id),
    takenOver: Boolean(convo.taken_over),
    messages: (rows ?? [])
      .map((row) => {
        const role = asRole(row.role);
        if (!role || typeof row.content !== "string") return null;
        return {
          id: String(row.id),
          role,
          content: row.content,
          at: String(row.created_at ?? new Date().toISOString()),
        };
      })
      .filter((row): row is StoredTurn => !!row),
  };
}

export async function ensureChat(sessionId: string, pagePath?: string): Promise<StoredChat | null> {
  const sb = admin();
  const sid = sessionId.trim().slice(0, 80);
  if (!sb || !sid) return null;

  const existing = await getChat(sid);
  if (existing) {
    if (pagePath) {
      await sb.from("chat_conversations").update({ visitor_page: pagePath.slice(0, 200) }).eq("session_id", sid);
    }
    return existing;
  }

  const { error } = await sb.from("chat_conversations").insert({
    session_id: sid,
    visitor_page: pagePath?.slice(0, 200) ?? null,
    status: "active",
  });
  if (error && !/duplicate|unique/i.test(error.message)) {
    console.error("[site-chat]", error.message);
    return null;
  }
  return getChat(sid);
}

export async function seedChat(sessionId: string, pagePath?: string): Promise<StoredChat | null> {
  const chat = await ensureChat(sessionId, pagePath);
  if (!chat) return null;
  if (chat.messages.length > 0) return chat;
  return appendMessage(sessionId, "assistant", OPENING_MESSAGE);
}

export async function appendMessage(
  sessionId: string,
  role: StoredRole,
  content: string,
  pagePath?: string,
): Promise<StoredChat | null> {
  const text = content.trim().slice(0, 4000);
  if (!text) return getChat(sessionId);
  const chat = await ensureChat(sessionId, pagePath);
  const sb = admin();
  if (!chat || !sb) return chat;

  const last = chat.messages[chat.messages.length - 1];
  if (last && last.role === role && last.content === text) return chat;

  const { error } = await sb.from("chat_messages").insert({
    conversation_id: chat.conversationId,
    role,
    content: text,
  });
  if (error) {
    console.error("[site-chat]", error.message);
    return chat;
  }
  return getChat(sessionId);
}

export async function setTakenOver(sessionId: string, takenOver: boolean): Promise<StoredChat | null> {
  const sb = admin();
  const chat = await ensureChat(sessionId);
  if (!sb || !chat) return null;
  await sb
    .from("chat_conversations")
    .update({
      taken_over: takenOver,
      taken_over_at: takenOver ? new Date().toISOString() : null,
      status: "active",
    })
    .eq("session_id", sessionId.trim().slice(0, 80));
  const next = await getChat(sessionId);
  if (takenOver && next && next.messages.length === 0) {
    return appendMessage(sessionId, "assistant", OPENING_MESSAGE);
  }
  return next;
}

export async function listActiveChats(): Promise<
  Array<{ sessionId: string; takenOver: boolean; preview: string; at: string }>
> {
  const sb = admin();
  if (!sb) return [];
  const { data: convos } = await sb
    .from("chat_conversations")
    .select("id, session_id, taken_over")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(80);
  if (!convos?.length) return [];

  const out: Array<{ sessionId: string; takenOver: boolean; preview: string; at: string }> = [];
  await Promise.all(
    convos.map(async (convo) => {
      const { data: last } = await sb
        .from("chat_messages")
        .select("content, created_at, role")
        .eq("conversation_id", convo.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!last) return;
      out.push({
        sessionId: String(convo.session_id),
        takenOver: Boolean(convo.taken_over),
        preview: String(last.content ?? "").slice(0, 80),
        at: String(last.created_at ?? ""),
      });
    }),
  );
  return out;
}

export function publicTurns(chat: StoredChat): Array<{ role: "user" | "assistant"; content: string }> {
  return chat.messages.map((turn) => ({
    role: turn.role === "user" ? "user" : "assistant",
    content: turn.content,
  }));
}
