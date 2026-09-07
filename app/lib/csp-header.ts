/**
 * CSP applied in middleware (see middleware.ts).
 *
 * **Regression check (before/after deploy):** In a clean Chrome window, open DevTools
 * → Console on `/`, `/courses/leading-safe`, a `/blog/...` post, and `/contact`.
 * Any line like `Refused to load … Content Security Policy` means a directive needs
 * a host added (prefer narrow origins over `https:` in script-src).
 *
 * **Known stack:** `app/globals.css` `@import`s Google Fonts; root layout loads
 * Apollo, RB2B (via /hyper-agent.js), Stripe (checkout), Microsoft Clarity,
 * Vercel Analytics from fpcdn/openfpcdn depending on version/build.
 */
export const AGILE36_CONTENT_SECURITY_POLICY =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' " +
  "https://js.stripe.com " +
  "https://m.stripe.network " +
  "https://assets.apollo.io " +
  "https://ddwl4m2hdecbv.cloudfront.net " + // RB2B person-identification pixel (loaded by /hyper-agent.js)
  "https://*.reb2b.com " +
  "https://app.upvert.io " +
  "https://va.vercel-scripts.com " +
  "https://vercel.live " +
  "https://www.clarity.ms " +
  "https://scripts.clarity.ms " +
  "https://*.clarity.ms " +
  "https://openfpcdn.io " +
  "https://fpcdn.io " +
  "https://*.fpjs.io; " +
  "style-src 'self' 'unsafe-inline' " +
  "https://fonts.googleapis.com " +
  "https://api.fontshare.com; " +
  "font-src 'self' data: " +
  "https://fonts.gstatic.com " +
  "https://fonts.googleapis.com " +
  "https://cdn.fontshare.com; " +
  "img-src 'self' data: https: blob:; " +
  "connect-src 'self' https: wss: " +
  "https://www.clarity.ms " +
  "https://*.clarity.ms " +
  "https://c.bing.com; " +
  "frame-src 'self' https:; " +
  "media-src 'self' blob:; " +
  "worker-src 'self' blob:; " +
  "object-src 'none'; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "upgrade-insecure-requests";

/** Webpack dev uses eval() for source maps. Production bundles do not. */
export function agile36Csp(allowEval = false): string {
  if (!allowEval) return AGILE36_CONTENT_SECURITY_POLICY;
  return AGILE36_CONTENT_SECURITY_POLICY.replace(
    "script-src 'self' 'unsafe-inline' ",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' ",
  );
}
