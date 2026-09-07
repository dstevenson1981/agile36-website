import { NextRequest, NextResponse } from "next/server";
import { buildVisitorContext } from "@/app/lib/site-assistant/context";
import { llmConfigured, runSiteAssistant, type ChatImage, type ChatTurn } from "@/app/lib/site-assistant/llm";
import { appendMessage, getChat, publicTurns, seedChat } from "@/app/lib/site-assistant/live-chat";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 20;
const hits = new Map<string, number[]>();

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function asImages(value: unknown): ChatImage[] {
  if (!Array.isArray(value)) return [];
  const images: ChatImage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as { name?: unknown; type?: unknown; dataUrl?: unknown };
    const name = typeof row.name === "string" ? row.name.trim().slice(0, 120) : "";
    const type = typeof row.type === "string" ? row.type.trim().slice(0, 80) : "";
    const dataUrl = typeof row.dataUrl === "string" ? row.dataUrl : "";
    if (!name || !dataUrl.startsWith("data:image/") || dataUrl.length > 900_000) continue;
    images.push({ name, type: type || "image/jpeg", dataUrl });
    if (images.length >= 3) break;
  }
  return images;
}

function asTurns(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];
  const turns: ChatTurn[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as { role?: unknown; content?: unknown };
    if ((row.role !== "user" && row.role !== "assistant") || typeof row.content !== "string") continue;
    const content = row.content.trim();
    if (!content || content.length > 2000) continue;
    turns.push({ role: row.role, content });
  }
  return turns.slice(-16);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const sessionId = typeof payload.sessionId === "string" ? payload.sessionId.trim().slice(0, 80) : "";
  const pagePath = typeof payload.pagePath === "string" ? payload.pagePath.slice(0, 200) : undefined;
  const pageTitle = typeof payload.pageTitle === "string" ? payload.pageTitle.slice(0, 200) : undefined;

  if (payload.seed === true && sessionId) {
    const chat = await seedChat(sessionId, pagePath);
    return NextResponse.json({
      takenOver: Boolean(chat?.takenOver),
      messages: chat ? publicTurns(chat) : [],
    });
  }

  const engage = payload.engage === true;
  const messages = asTurns(payload.messages);
  if (!engage && (messages.length === 0 || messages[messages.length - 1]?.role !== "user")) {
    return NextResponse.json({ error: "Send a question." }, { status: 400 });
  }
  if (engage && messages.length > 0) {
    return NextResponse.json({ error: "Already in a conversation." }, { status: 400 });
  }

  const last = messages[messages.length - 1];
  if (sessionId && last?.role === "user") {
    const chat = await appendMessage(sessionId, "user", last.content, pagePath);
    if (chat?.takenOver) {
      return NextResponse.json({
        takenOver: true,
        reply: "",
        actions: [],
        messages: publicTurns(chat),
      });
    }
  }

  if (!llmConfigured()) {
    return NextResponse.json({ error: "Chat is not configured yet." }, { status: 503 });
  }

  if (!allow(clientIp(request))) {
    return NextResponse.json({ error: "Too many messages. Try again in a few minutes." }, { status: 429 });
  }

  const images = asImages(payload.images);
  const visitorContext = await buildVisitorContext({
    rawHint: payload.visitor,
    cookieValue: request.cookies.get("a36v")?.value,
    ip: clientIp(request),
  });

  try {
    const result = await runSiteAssistant({
      messages,
      mode: "public",
      pagePath,
      pageTitle,
      visitorContext,
      engage,
      images: engage ? [] : images,
    });
    if (sessionId && result.reply) {
      const latest = await getChat(sessionId);
      if (latest?.takenOver) {
        return NextResponse.json({
          takenOver: true,
          reply: "",
          actions: [],
          messages: publicTurns(latest),
        });
      }
      await appendMessage(sessionId, "assistant", result.reply, pagePath);
    }
    return NextResponse.json({ ...result, takenOver: false });
  } catch (error) {
    console.error("[site-assistant]", error);
    return NextResponse.json({ error: "I could not answer that just now. Try again." }, { status: 500 });
  }
}
