/**
 * CSP applied in middleware so it is present on HTML responses (Vercel project
 * headers from vercel.json were not reliably surfacing Content-Security-Policy).
 */
export const AGILE36_CONTENT_SECURITY_POLICY =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' https://js.stripe.com https://m.stripe.network https://client.crisp.chat https://assets.apollo.io https://va.vercel-scripts.com https://vercel.live; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: https: blob:; " +
  "font-src 'self' data:; " +
  "connect-src 'self' https: wss:; " +
  "frame-src 'self' https:; " +
  "worker-src 'self' blob:; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "upgrade-insecure-requests";
