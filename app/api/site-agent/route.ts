import { NextRequest, NextResponse } from "next/server";
import {
  buildSiteAgentSystemPrompt,
  formatScheduleForPrompt,
  loadLiveScheduleRows,
  loadSiteAgentSops,
} from "@/app/lib/site-agent/context";
import { createSiteAgentSupabase } from "@/app/lib/site-agent/supabase";
import {
  executeSiteAgentTool,
  SITE_AGENT_TOOLS,
  type LiveSession,
} from "@/app/lib/site-agent/tools";

export const dynamic = "force-dynamic";

const SESSION_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_MESSAGE = 2000;
const MAX_PER_HOUR = 24;

type ChatMessageRow = {
  role: string;
  content: string;
  created_at: string;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function extractEmail(text: string): string | null {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].toLowerCase() : null;
}

type AgentMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content?: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
};

async function completeAssistant(messages: AgentMessage[], withTools: boolean) {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.SITE_AGENT_MODEL || process.env.OPENAI_MODEL || "x-ai/grok-4.6";
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://agile36.com",
      "X-Title": "Agile36 Site Agent",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 1200,
      reasoning: { effort: "low" },
      messages,
      ...(withTools ? { tools: SITE_AGENT_TOOLS, tool_choice: "auto" } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("site-agent model error:", res.status, detail.slice(0, 400));
    throw new Error("Model request failed");
  }

  const payload = (await res.json()) as {
    choices?: Array<{
      message?: {
        content?: string | null;
        tool_calls?: AgentMessage["tool_calls"];
      };
    }>;
  };
  return payload.choices?.[0]?.message || {};
}

async function runSiteAgent(
  system: string,
  history: { role: "user" | "assistant"; content: string }[],
  sessions: LiveSession[],
  conversationId: string,
) {
  const messages: AgentMessage[] = [{ role: "system", content: system }, ...history];

  for (let step = 0; step < 4; step += 1) {
    const message = await completeAssistant(messages, true);
    const toolCalls = message.tool_calls || [];
    if (toolCalls.length === 0) {
      return (message.content || "").trim();
    }

    messages.push({
      role: "assistant",
      content: message.content || "",
      tool_calls: toolCalls,
    });

    for (const call of toolCalls) {
      const result = await executeSiteAgentTool(call.function.name, call.function.arguments, {
        conversationId,
        sessions,
      });
      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result),
      });
    }
  }

  const fallback = await completeAssistant(messages, false);
  return (fallback.content || "").trim();
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id") || "";
  if (!SESSION_RE.test(sessionId)) return jsonError("Invalid session");

  const supabase = createSiteAgentSupabase();
  if (!supabase) return jsonError("Database not configured", 500);

  const { data: conversation, error: convError } = await supabase
    .from("chat_conversations")
    .select("id, taken_over, needs_handoff, visitor_name, visitor_email")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (convError) return jsonError("Failed to load conversation", 500);
  if (!conversation) {
    return NextResponse.json({
      messages: [],
      taken_over: false,
      needs_handoff: false,
    });
  }

  const { data: messages, error: msgError } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("conversation_id", conversation.id)
    .in("role", ["user", "assistant", "owner"])
    .order("created_at", { ascending: true })
    .limit(80);

  if (msgError) return jsonError("Failed to load messages", 500);

  return NextResponse.json({
    messages: messages || [],
    taken_over: Boolean(conversation.taken_over),
    needs_handoff: Boolean(conversation.needs_handoff),
    visitor_name: conversation.visitor_name,
    visitor_email: conversation.visitor_email,
  });
}

export async function POST(request: NextRequest) {
  const supabase = createSiteAgentSupabase();
  if (!supabase) return jsonError("Database not configured", 500);

  let body: {
    session_id?: string;
    message?: string;
    page?: string;
    name?: string;
    email?: string;
  };
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON");
  }

  const sessionId = String(body.session_id || "");
  const message = String(body.message || "").trim();
  const page = String(body.page || "/").slice(0, 200);
  if (!SESSION_RE.test(sessionId)) return jsonError("Invalid session");
  if (!message || message.length > MAX_MESSAGE) return jsonError("Message is required");

  const { data: existing } = await supabase
    .from("chat_conversations")
    .select("id, taken_over, visitor_name, visitor_email")
    .eq("session_id", sessionId)
    .maybeSingle();

  let conversationId = existing?.id as string | undefined;
  const visitorEmail = String(body.email || existing?.visitor_email || extractEmail(message) || "")
    .trim()
    .toLowerCase()
    .slice(0, 120);
  const visitorName = String(body.name || existing?.visitor_name || "").trim().slice(0, 80);

  if (!conversationId) {
    const { data: created, error } = await supabase
      .from("chat_conversations")
      .insert({
        session_id: sessionId,
        visitor_page: page,
        status: "active",
        visitor_name: visitorName || null,
        visitor_email: visitorEmail || null,
      })
      .select("id")
      .single();
    if (error || !created) {
      console.error("site-agent create conversation:", error?.message);
      return jsonError("Failed to start conversation", 500);
    }
    conversationId = created.id;
  } else {
    await supabase
      .from("chat_conversations")
      .update({
        visitor_page: page,
        visitor_name: visitorName || existing?.visitor_name || null,
        visitor_email: visitorEmail || existing?.visitor_email || null,
      })
      .eq("id", conversationId);
  }

  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("chat_messages")
    .select("id", { count: "exact", head: true })
    .eq("conversation_id", conversationId)
    .eq("role", "user")
    .gte("created_at", hourAgo);
  if ((count || 0) >= MAX_PER_HOUR) {
    return jsonError("Too many messages. Email d.stevenson@agile36.com or call 310-620-7966.", 429);
  }

  const { error: userInsertError } = await supabase.from("chat_messages").insert({
    conversation_id: conversationId,
    role: "user",
    content: message,
  });
  if (userInsertError) {
    console.error("site-agent user message:", userInsertError.message);
    return jsonError("Failed to save message", 500);
  }

  if (existing?.taken_over) {
    return NextResponse.json({
      reply: null,
      taken_over: true,
      needs_handoff: true,
    });
  }

  const { data: historyRows } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("conversation_id", conversationId)
    .in("role", ["user", "assistant", "owner"])
    .order("created_at", { ascending: true })
    .limit(24);

  const history = ((historyRows || []) as ChatMessageRow[])
    .filter((row) => row.role === "user" || row.role === "assistant" || row.role === "owner")
    .map((row) => ({
      role: row.role === "user" ? ("user" as const) : ("assistant" as const),
      content: row.content,
    }));

  if (!conversationId) return jsonError("Failed to start conversation", 500);

  try {
    const [sops, sessions] = await Promise.all([loadSiteAgentSops(), loadLiveScheduleRows()]);
    const system = buildSiteAgentSystemPrompt(sops, formatScheduleForPrompt(sessions), page);
    const raw = await runSiteAgent(system, history, sessions, conversationId);
    const needsHandoff = raw.startsWith("[[HANDOFF]]");
    const reply = raw
      .replace(/^\[\[HANDOFF\]\]\s*/i, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim() || "I can have Deadra follow up. What email should she use?";

    await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      role: "assistant",
      content: reply,
    });

    if (needsHandoff) {
      await supabase
        .from("chat_conversations")
        .update({ needs_handoff: true })
        .eq("id", conversationId);
    }

    return NextResponse.json({
      reply,
      taken_over: false,
      needs_handoff: needsHandoff,
    });
  } catch (error) {
    console.error("site-agent reply:", error);
    return NextResponse.json({
      reply:
        "I could not finish that reply. Email d.stevenson@agile36.com or call 310-620-7966 (Mon–Fri, 9AM–5PM EST).",
      taken_over: false,
      needs_handoff: true,
    });
  }
}
