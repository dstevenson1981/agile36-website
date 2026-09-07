import { NextRequest, NextResponse } from "next/server";
import {
  appendMessage,
  getChat,
  listActiveChats,
  setTakenOver,
} from "@/app/lib/site-assistant/live-chat";
import { isVisitorsAuthorized, visitorsUnauthorizedResponse } from "@/app/lib/hyper/visitors-gate";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isVisitorsAuthorized(request)) return visitorsUnauthorizedResponse();
  const sessionId = request.nextUrl.searchParams.get("session")?.trim().slice(0, 80) || "";
  if (!sessionId) {
    const chats = await listActiveChats();
    return NextResponse.json({ chats });
  }
  const chat = await getChat(sessionId);
  return NextResponse.json({
    takenOver: Boolean(chat?.takenOver),
    messages: chat?.messages ?? [],
  });
}

export async function POST(request: NextRequest) {
  if (!isVisitorsAuthorized(request)) return visitorsUnauthorizedResponse();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const sessionId = typeof payload.sessionId === "string" ? payload.sessionId.trim().slice(0, 80) : "";
  if (!sessionId) return NextResponse.json({ error: "Missing session." }, { status: 400 });

  const action = payload.action === "release" ? "release" : payload.action === "send" ? "send" : "takeover";

  if (action === "takeover") {
    const chat = await setTakenOver(sessionId, true);
    return NextResponse.json({ takenOver: true, messages: chat?.messages ?? [] });
  }
  if (action === "release") {
    const chat = await setTakenOver(sessionId, false);
    return NextResponse.json({ takenOver: false, messages: chat?.messages ?? [] });
  }

  const content = typeof payload.content === "string" ? payload.content.trim() : "";
  if (!content) return NextResponse.json({ error: "Type a reply." }, { status: 400 });
  await setTakenOver(sessionId, true);
  const chat = await appendMessage(sessionId, "owner", content);
  return NextResponse.json({ takenOver: true, messages: chat?.messages ?? [] });
}
