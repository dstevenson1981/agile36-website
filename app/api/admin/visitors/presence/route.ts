import { NextRequest, NextResponse } from "next/server";
import { getPresence } from "@/app/lib/hyper/db";
import { isHiddenWatchPath } from "@/app/lib/hyper/private-path";
import { isVisitorsAuthorized, visitorsUnauthorizedResponse } from "@/app/lib/hyper/visitors-gate";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isVisitorsAuthorized(request)) return visitorsUnauthorizedResponse();
  const session = request.nextUrl.searchParams.get("session")?.trim();
  if (!session) {
    return NextResponse.json({ error: "Missing session" }, { status: 400 });
  }
  try {
    const presence = await getPresence(session);
    if (presence && isHiddenWatchPath(presence.path)) {
      return NextResponse.json({
        presence: {
          ...presence,
          is_private: true,
          mouse_x: null,
          mouse_y: null,
          scroll_y: null,
          scroll_max: null,
          clicked_at: null,
        },
      });
    }
    return NextResponse.json({ presence });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load presence" },
      { status: 500 },
    );
  }
}
