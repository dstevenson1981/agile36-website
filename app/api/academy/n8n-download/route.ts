import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOSTS = new Set([
  'raw.githubusercontent.com',
  'cdn.jsdelivr.net',
]);

function safeFilename(name: string): string {
  const base = name.replace(/[/\\?%*:|"<>]/g, '_').trim() || 'workflow.json';
  return base.endsWith('.json') ? base : `${base}.json`;
}

/**
 * Proxies n8n workflow JSON with Content-Disposition so browsers download
 * instead of opening raw GitHub JSON in a new tab.
 */
export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url');
  const filenameParam = req.nextUrl.searchParams.get('filename') || 'workflow.json';

  if (!urlParam) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(urlParam);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 400 });
  }

  const upstream = await fetch(parsed.toString(), {
    headers: { Accept: 'application/json,text/plain,*/*' },
    next: { revalidate: 3600 },
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: `Upstream failed (${upstream.status})` },
      { status: 502 }
    );
  }

  const body = await upstream.arrayBuffer();
  const filename = safeFilename(filenameParam);

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
