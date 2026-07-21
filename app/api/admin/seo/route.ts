import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const WORKSPACE = path.join(process.cwd(), "seo-agent-data");

async function readIfExists(file: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(WORKSPACE, file), "utf-8");
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    await fs.access(WORKSPACE);
  } catch {
    return NextResponse.json({
      available: false,
      message:
        "SEO agent workspace not found. The agent runs on the local machine — open this page from the dev server (localhost) to see live data.",
    });
  }

  const [queue, history, gapZoneRaw, cronLog] = await Promise.all([
    readIfExists("queue.md"),
    readIfExists("history.md"),
    readIfExists("gap-zone.json"),
    readIfExists("cron.log"),
  ]);

  let rankings: { date: string; rows: number }[] = [];
  try {
    const files = await fs.readdir(path.join(WORKSPACE, "rankings"));
    rankings = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .sort()
        .map(async (f) => {
          const raw = await fs.readFile(path.join(WORKSPACE, "rankings", f), "utf-8");
          const rows = JSON.parse(raw);
          return { date: f.replace(".json", ""), rows: Array.isArray(rows) ? rows.length : 0 };
        })
    );
  } catch {
    // no snapshots yet
  }

  let gapZone: unknown[] = [];
  let gapCount = 0;
  if (gapZoneRaw) {
    try {
      const parsed = JSON.parse(gapZoneRaw);
      if (Array.isArray(parsed)) {
        gapCount = parsed.length;
        gapZone = parsed.slice(0, 20);
      }
    } catch {
      // unreadable gap zone file; leave empty
    }
  }

  return NextResponse.json({
    available: true,
    lastRun: rankings.length ? rankings[rankings.length - 1].date : null,
    snapshots: rankings,
    gapCount,
    gapZone,
    queue,
    history,
    cronLogTail: cronLog ? cronLog.split("\n").slice(-30).join("\n") : null,
  });
}
