import { NextRequest, NextResponse } from "next/server";
import { llmConfigured, runSiteAssistant, type ChatTurn } from "@/app/lib/site-assistant/llm";

export const dynamic = "force-dynamic";

function asTurns(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];
  const turns: ChatTurn[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as { role?: unknown; content?: unknown };
    if ((row.role !== "user" && row.role !== "assistant") || typeof row.content !== "string") continue;
    const content = row.content.trim();
    if (!content || content.length > 8000) continue;
    turns.push({ role: row.role, content });
  }
  return turns.slice(-16);
}

export async function POST(request: NextRequest) {
  if (!llmConfigured()) {
    return NextResponse.json({ error: "The assistant is not configured yet." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const messages = asTurns(payload.messages);
  if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "Send a question." }, { status: 400 });
  }

  try {
    const result = await runSiteAssistant({ messages, mode: "owner" });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[admin-assistant]", error);
    return NextResponse.json({ error: "Lookup failed. Try again." }, { status: 500 });
  }
}
