import { NextRequest, NextResponse } from "next/server";
import { getChat, publicTurns } from "@/app/lib/site-assistant/live-chat";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session")?.trim().slice(0, 80) || "";
  if (!sessionId) return NextResponse.json({ takenOver: false, messages: [] });
  const chat = await getChat(sessionId);
  return NextResponse.json({
    takenOver: Boolean(chat?.takenOver),
    messages: chat ? publicTurns(chat) : [],
  });
}
