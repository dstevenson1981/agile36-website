/**
 * Visitor tracking ingestion (Hyper). Called by /hyper-agent.js on every pageview.
 * Identifies the visitor's company from their IP and, when it's a real business
 * network, writes a row to the website_visitors table (with any known person
 * from RB2B reveals at that company).
 */
import { NextRequest, NextResponse } from 'next/server';
import { findPersonForCompany, insertVisit } from '@/app/lib/hyper/db';
import { identifyIp } from '@/app/lib/hyper/identify';

export const runtime = 'nodejs';

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? '';
}

export async function POST(req: NextRequest) {
  let body: {
    type?: string;
    path?: string;
    sessionId?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  // Only pageviews produce rows; other event types are acknowledged and dropped.
  if (body.type !== 'pageview') {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);
  const identity = await identifyIp(ip);
  if (!identity.isBusiness || !identity.companyName) {
    // Residential/ISP/cloud traffic — nothing to record.
    return NextResponse.json({ ok: true, identified: false });
  }

  const person = await findPersonForCompany(identity.companyName);
  await insertVisit({
    company: identity.companyName,
    page: body.path ?? null,
    session_id: body.sessionId ?? null,
    person,
  });

  return NextResponse.json({ ok: true, identified: true });
}
