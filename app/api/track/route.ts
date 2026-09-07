/**
 * Visitor tracking. Called by /hyper-agent.js on every pageview.
 * Logs city/state/page to website_visitors and emails Deadra on a new session.
 */
import { NextRequest, NextResponse } from "next/server";
import { findPersonForCompany, insertVisit, touchVisit, upsertPresence } from "@/app/lib/hyper/db";
import { identifyIp } from "@/app/lib/hyper/identify";
import { isHiddenWatchPath } from "@/app/lib/hyper/private-path";
import { sendVisitorAlert } from "@/app/lib/send-visitor-alert";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "";
}

function isBot(ua: string): boolean {
  return /bot|crawler|spider|preview|headless|lighthouse|pagespeed/i.test(ua);
}

function finiteOrNull(value: number | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function clampPct(value: number | undefined): number | null {
  const n = finiteOrNull(value);
  if (n == null) return null;
  return Math.min(100, Math.max(0, n));
}

function skipPath(path: string): boolean {
  return (
    path.startsWith("/admin") ||
    path.startsWith("/api") ||
    path.startsWith("/popm-workshop") ||
    path.startsWith("/_next")
  );
}

export async function POST(req: NextRequest) {
  let body: {
    type?: string;
    path?: string;
    title?: string;
    referrer?: string | null;
    sessionId?: string;
    visitorId?: string;
    mouseX?: number;
    mouseY?: number;
    scrollY?: number;
    scrollMax?: number;
    vw?: number;
    vh?: number;
    clicked?: boolean;
    private?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (body.type === "heartbeat" || body.type === "presence") {
    if (isBot(req.headers.get("user-agent") || "")) {
      return NextResponse.json({ ok: true, skipped: true });
    }
    if (body.sessionId) {
      await touchVisit(body.sessionId);
      if (body.type === "presence") {
        const path = (body.path || "/").slice(0, 400);
        const locked = Boolean(body.private) || isHiddenWatchPath(path);
        await upsertPresence({
          session_id: body.sessionId,
          visitor_id: body.visitorId ?? null,
          path,
          page_title: body.title?.slice(0, 200) ?? null,
          mouse_x: locked ? null : clampPct(body.mouseX),
          mouse_y: locked ? null : clampPct(body.mouseY),
          scroll_y: locked ? null : finiteOrNull(body.scrollY),
          scroll_max: locked ? null : finiteOrNull(body.scrollMax),
          viewport_w: locked ? null : finiteOrNull(body.vw),
          viewport_h: locked ? null : finiteOrNull(body.vh),
          is_private: locked,
          clicked: locked ? false : Boolean(body.clicked),
        });
      }
    }
    return NextResponse.json({ ok: true, heartbeat: true });
  }

  if (body.type !== "pageview") {
    return NextResponse.json({ ok: true });
  }

  const path = (body.path || "/").slice(0, 400);
  if (skipPath(path) || isBot(req.headers.get("user-agent") || "")) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const ip = clientIp(req);
  const identity = await identifyIp(ip);
  const person = identity.companyName ? await findPersonForCompany(identity.companyName) : null;

  const logged = await insertVisit({
    company: identity.isBusiness ? identity.companyName : null,
    page: path,
    page_title: body.title?.slice(0, 200) ?? null,
    referrer: body.referrer?.slice(0, 400) ?? null,
    session_id: body.sessionId ?? null,
    visitor_id: body.visitorId ?? null,
    city: identity.city,
    region: identity.region,
    country: identity.country,
    latitude: identity.latitude,
    longitude: identity.longitude,
    person,
  });

  const worthAlert = Boolean(identity.city || identity.region || identity.isBusiness);
  if (logged.ok && logged.newSession && worthAlert) {
    try {
      await sendVisitorAlert({
        city: identity.city,
        region: identity.region,
        country: identity.country,
        page: path,
        pageTitle: body.title ?? null,
        company: identity.isBusiness ? identity.companyName : null,
        personName: person?.person_name ?? null,
        referrer: body.referrer ?? null,
      });
    } catch (error) {
      console.error("[hyper] visitor alert failed:", error);
    }
  }

  return NextResponse.json({
    ok: true,
    logged: logged.ok,
    alerted: logged.ok && logged.newSession && worthAlert,
  });
}
