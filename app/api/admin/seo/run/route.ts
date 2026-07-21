import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import path from "path";
import os from "os";

export const dynamic = "force-dynamic";

const WORKSPACE = path.join(process.cwd(), "seo-agent-data");
const AGENT_PY = path.join(
  os.homedir(),
  ".claude/skills/seo-agent/.venv/bin/python"
);
const RUN_CYCLE = path.join(
  os.homedir(),
  ".claude/skills/seo-agent/scripts/run_cycle.py"
);
const ENV_FILE = path.join(os.homedir(), ".hermes/secrets/seo-agent.env");

async function loadSecrets(): Promise<Record<string, string>> {
  const env: Record<string, string> = {};
  try {
    const raw = await fs.readFile(ENV_FILE, "utf-8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) env[m[1]] = m[2];
    }
  } catch {
    // secrets file missing; run will report what it needs
  }
  return env;
}

export async function POST() {
  try {
    await Promise.all([fs.access(WORKSPACE), fs.access(AGENT_PY), fs.access(RUN_CYCLE)]);
  } catch {
    return NextResponse.json(
      { ok: false, error: "SEO agent is not installed on this machine. The data cycle can only be kicked off from the local dev server." },
      { status: 400 }
    );
  }

  const secrets = await loadSecrets();
  const started = new Date().toISOString();

  const output: string = await new Promise((resolve) => {
    const proc = spawn(AGENT_PY, [RUN_CYCLE, WORKSPACE], {
      env: { ...process.env, ...secrets },
      cwd: process.cwd(),
    });
    let buf = "";
    proc.stdout.on("data", (d) => (buf += d.toString()));
    proc.stderr.on("data", (d) => (buf += d.toString()));
    proc.on("close", () => resolve(buf));
    // The full cycle (GSC pull + SERP scrapes) takes a few minutes at most.
    setTimeout(() => {
      proc.kill();
      resolve(buf + "\n[timed out after 8 minutes]");
    }, 8 * 60 * 1000);
  });

  return NextResponse.json({ ok: true, started, output: output.slice(-8000) });
}
