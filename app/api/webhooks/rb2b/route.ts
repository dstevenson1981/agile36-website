/**
 * RB2B person-reveal webhook (Hyper). Point RB2B's webhook destination at
 * https://www.agile36.com/api/webhooks/rb2b
 * Optionally set RB2B_WEBHOOK_SECRET and append ?secret=... to the URL in RB2B.
 *
 * Stores the person in hyper_people and back-fills their name/email onto
 * website_visitors rows for the same company.
 */
import { NextRequest, NextResponse } from 'next/server';
import { recordPersonReveal } from '@/app/lib/hyper/db';
import { parseRb2bPayload } from '@/app/lib/hyper/people';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = process.env.RB2B_WEBHOOK_SECRET;
  if (secret && req.nextUrl.searchParams.get('secret') !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  const person = parseRb2bPayload(body);
  if (!person.firstName && !person.linkedinUrl && !person.email) {
    return NextResponse.json({ error: 'no person fields recognized in payload' }, { status: 400 });
  }

  await recordPersonReveal(person, body);
  console.log(
    `[hyper] rb2b reveal: ${person.firstName ?? ''} ${person.lastName ?? ''} — ${person.title ?? '?'} @ ${person.companyName ?? '?'}`
  );
  return NextResponse.json({ ok: true });
}
