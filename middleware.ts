import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
// Relative imports: some Vercel Edge middleware bundlers fail on `@/` aliases.
import { AGILE36_CONTENT_SECURITY_POLICY } from './app/lib/csp-header';
import {
  areProPracticeExamsEnabled,
  isProPracticeExamPath,
} from './app/lib/pro-practice-exams-enabled';
import {
  getScrumMasterProShareKey,
  SSM_PRO_OPEN_COOKIE,
  SSM_PRO_OPEN_COOKIE_VALUE,
} from './app/lib/ssm-pro-open-gate';

// Paths that don't need auth (skip Supabase session refresh to avoid refresh_token errors)
const PUBLIC_PATHS = ['/combo-courses', '/courses', '/contact', '/corporate', '/about', '/'];

const STATIC_FILE = /\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff2?|ttf|eot|map)$/i;

function applyCspAndHreflang(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) return;

  const lastSegment = pathname.split('/').pop() ?? '';
  if (STATIC_FILE.test(lastSegment)) return;

  response.headers.set('Content-Security-Policy', AGILE36_CONTENT_SECURITY_POLICY);

  const canonical = `${request.nextUrl.origin}${pathname}${request.nextUrl.search}`;
  const hreflang =
    `<${canonical}>; rel="alternate"; hreflang="x-default", ` +
    `<${canonical}>; rel="alternate"; hreflang="en", ` +
    `<${canonical}>; rel="alternate"; hreflang="en-US"`;
  const existing = response.headers.get('Link');
  response.headers.set('Link', existing ? `${existing}, ${hreflang}` : hreflang);
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-agile36-path', request.nextUrl.pathname + request.nextUrl.search);

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  const pathname = request.nextUrl.pathname;

  if (!areProPracticeExamsEnabled() && isProPracticeExamPath(pathname)) {
    const notFound = new NextResponse(null, { status: 404, statusText: 'Not Found' });
    applyCspAndHreflang(request, notFound);
    return notFound;
  }

  if (PUBLIC_PATHS.some((p) => p === pathname || (p !== '/' && pathname.startsWith(p)))) {
    applyCspAndHreflang(request, response);
    return response;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      applyCspAndHreflang(request, response);
      return response;
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    await supabase.auth.getUser();
  } catch {
    // Don't block requests if Supabase auth fails
  }

  // Temporary: SSM Pro practice exam open link (?ssm_pro=KEY → httpOnly cookie, strip query). Retire with ssm-pro-open-gate.
  const ssmPracticePath = '/account/practice-exams/scrum-master';
  if (areProPracticeExamsEnabled() && pathname === ssmPracticePath) {
    const token = request.nextUrl.searchParams.get('ssm_pro');
    if (token && token === getScrumMasterProShareKey()) {
      const dest = new URL(ssmPracticePath, request.url);
      const redirectRes = NextResponse.redirect(dest);
      for (const c of response.cookies.getAll()) {
        redirectRes.cookies.set(c.name, c.value);
      }
      redirectRes.cookies.set(SSM_PRO_OPEN_COOKIE, SSM_PRO_OPEN_COOKIE_VALUE, {
        path: ssmPracticePath,
        maxAge: 60 * 60 * 24 * 180,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      });
      applyCspAndHreflang(request, redirectRes);
      return redirectRes;
    }
  }

  applyCspAndHreflang(request, response);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
