import { NextRequest, NextResponse } from "next/server";

export const VISITORS_COOKIE = "a36_watch";
export const VISITORS_QUERY = "k";

function visitorsSecret(): string {
  return process.env.ADMIN_VISITORS_SECRET?.trim() || "";
}

function sameSecret(given: string, secret: string): boolean {
  if (!given || !secret || given.length !== secret.length) return false;
  let mismatch = 0;
  for (let i = 0; i < secret.length; i++) {
    mismatch |= given.charCodeAt(i) ^ secret.charCodeAt(i);
  }
  return mismatch === 0;
}

export function visitorsKeyFromRequest(request: NextRequest): string {
  return (
    request.cookies.get(VISITORS_COOKIE)?.value ||
    request.nextUrl.searchParams.get(VISITORS_QUERY) ||
    ""
  );
}

export function isVisitorsAuthorized(request: NextRequest): boolean {
  const secret = visitorsSecret();
  if (!secret) return false;
  return sameSecret(visitorsKeyFromRequest(request), secret);
}

export function visitorsUnauthorizedResponse(): NextResponse {
  return new NextResponse(null, { status: 404, statusText: "Not Found" });
}

export function attachVisitorsCookie(response: NextResponse): NextResponse {
  const secret = visitorsSecret();
  if (!secret) return response;
  response.cookies.set(VISITORS_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}

export function isVisitorsPath(pathname: string): boolean {
  return pathname === "/admin/visitors" || pathname.startsWith("/admin/visitors/") || pathname.startsWith("/api/admin/visitors");
}
