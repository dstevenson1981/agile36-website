import { NextRequest, NextResponse } from "next/server";
import { loadVisitors } from "@/app/lib/hyper/load-visitors";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const limit = Math.min(Math.max(Number(request.nextUrl.searchParams.get("limit") || 200), 1), 400);
    const payload = await loadVisitors(limit);
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load visitors" },
      { status: 500 },
    );
  }
}
