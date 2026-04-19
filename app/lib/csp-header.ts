/**
 * CSP applied in middleware (see middleware.ts).
 *
 * **Regression check (before/after deploy):** In a clean Chrome window, open DevTools
 * → Console on `/`, `/courses/leading-safe`, a `/blog/...` post, and `/contact`.
 * Any line like `Refused to load … Content Security Policy` means a directive needs
 * a host added (prefer narrow origins over `https:` in script-src).
 *
 * **Known stack:** `app/globals.css` `@import`s Google Fonts; root layout loads Crisp,
 * Apollo, Stripe (checkout), Vercel Analytics; FingerprintJS may fetch agent code
 * from fpcdn/openfpcdn depending on version/build.
 */
export const AGILE36_CONTENT_SECURITY_POLICY =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' " +
  "https://js.stripe.com " +
  "https://m.stripe.network " +
  "https://client.crisp.chat " +
  "https://*.crisp.chat " +
  "https://assets.apollo.io " +
  "https://va.vercel-scripts.com " +
  "https://vercel.live " +
  "https://openfpcdn.io " +
  "https://fpcdn.io " +
  "https://*.fpjs.io; " +
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src 'self' data: https://fonts.gstatic.com; " +
  "img-src 'self' data: https: blob:; " +
  "connect-src 'self' https: wss:; " +
  "frame-src 'self' https:; " +
  "worker-src 'self' blob:; " +
  "object-src 'none'; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "upgrade-insecure-requests";
