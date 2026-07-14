import { NextRequest, NextResponse } from "next/server";
import { runLandExpand } from "@/land-and-expand/lib/process";

/**
 * Trigger a land-and-expand batch.
 * Protect with CRON_SECRET when calling from a scheduler:
 *   Authorization: Bearer <CRON_SECRET>
 */
export async function POST(request: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const auth = request.headers.get("authorization") || "";
      if (auth !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (!process.env.APOLLO_API_KEY) {
      return NextResponse.json(
        { error: "APOLLO_API_KEY is not configured" },
        { status: 500 }
      );
    }

    if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY (or OPENROUTER_API_KEY) is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const limit = typeof body.limit === "number" ? body.limit : undefined;
    const result = await runLandExpand({ limit });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Run failed" },
      { status: 500 }
    );
  }
}
