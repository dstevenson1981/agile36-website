import { NextRequest, NextResponse } from "next/server";
import { createSiteAgentSupabase } from "@/app/lib/site-agent/supabase";

export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  const supabase = createSiteAgentSupabase();
  if (!supabase) return jsonError("Database not configured", 500);

  const conversationId = request.nextUrl.searchParams.get("id");

  if (conversationId) {
    const { data: conversation, error } = await supabase
      .from("chat_conversations")
      .select(
        "id, session_id, visitor_page, visitor_name, visitor_email, status, taken_over, needs_handoff, created_at",
      )
      .eq("id", conversationId)
      .maybeSingle();
    if (error || !conversation) return jsonError("Conversation not found", 404);

    const { data: messages } = await supabase
      .from("chat_messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", conversationId)
      .in("role", ["user", "assistant", "owner"])
      .order("created_at", { ascending: true });

    return NextResponse.json({ conversation, messages: messages || [] });
  }

  const { data: conversations, error } = await supabase
    .from("chat_conversations")
    .select(
      "id, session_id, visitor_page, visitor_name, visitor_email, status, taken_over, needs_handoff, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(80);

  if (error) return jsonError("Failed to load conversations", 500);
  return NextResponse.json({ conversations: conversations || [] });
}

export async function POST(request: NextRequest) {
  const supabase = createSiteAgentSupabase();
  if (!supabase) return jsonError("Database not configured", 500);

  let body: { id?: string; action?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON");
  }

  const id = String(body.id || "");
  const action = String(body.action || "");
  if (!id) return jsonError("Missing conversation id");

  if (action === "takeover") {
    const { error } = await supabase
      .from("chat_conversations")
      .update({
        taken_over: true,
        taken_over_at: new Date().toISOString(),
        needs_handoff: true,
      })
      .eq("id", id);
    if (error) return jsonError("Failed to take over", 500);
    return NextResponse.json({ ok: true });
  }

  if (action === "reply") {
    const message = String(body.message || "").trim();
    if (!message) return jsonError("Message is required");
    const { error: takeError } = await supabase
      .from("chat_conversations")
      .update({
        taken_over: true,
        taken_over_at: new Date().toISOString(),
        needs_handoff: true,
      })
      .eq("id", id);
    if (takeError) return jsonError("Failed to take over", 500);
    const { error } = await supabase.from("chat_messages").insert({
      conversation_id: id,
      role: "owner",
      content: message,
    });
    if (error) return jsonError("Failed to send reply", 500);
    return NextResponse.json({ ok: true });
  }

  return jsonError("Unknown action");
}
