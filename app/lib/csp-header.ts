/**
 * CSP applied in middleware (see middleware.ts).
 *
 * **Regression check (before/after deploy):** In a clean Chrome window, open DevTools
 * → Console on `/`, `/courses/leading-safe`, a `/blog/...` post, and `/contact`.
 * Any line like `Refused to load … Content Security Policy` means a directive needs
 * a host added (prefer narrow origins over `https:` in script-src).
 *
 * **Known stack:** `app/globals.css` `@import`s Google Fonts; root layout loads Crisp,
 * Apollo, Warmly, Stripe (checkout), Vercel Analytics
 * from fpcdn/openfpcdn depending on version/build.
 *
 * **Crisp:** needs script + **style** (CSS is served from client.crisp.chat), fonts,
 * websocket relay, frames (game widget), and media — see Crisp CSP docs.
 */
export const AGILE36_CONTENT_SECURITY_POLICY =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' " +
  "https://js.stripe.com " +
  "https://m.stripe.network " +
  "https://client.crisp.chat " +
  "https://*.crisp.chat " +
  "https://assets.apollo.io " +
  "https://opps-widget.getwarmly.com " +
  "https://*.getwarmly.com " +
  "https://app.upvert.io " +
  "https://*.warmly.ai " +
  "https://va.vercel-scripts.com " +
  "https://vercel.live " +
  "https://openfpcdn.io " +
  "https://fpcdn.io " +
  "https://*.fpjs.io; " +
  "style-src 'self' 'unsafe-inline' " +
  "https://fonts.googleapis.com " +
  "https://api.fontshare.com " +
  "https://client.crisp.chat " +
  "https://*.crisp.chat; " +
  "font-src 'self' data: " +
  "https://fonts.gstatic.com " +
  "https://cdn.fontshare.com " +
  "https://client.crisp.chat " +
  "https://*.crisp.chat; " +
  "img-src 'self' data: https: blob: " +
  "https://image.crisp.chat " +
  "https://client.crisp.chat; " +
  "connect-src 'self' https: wss: " +
  "https://client.crisp.chat " +
  "https://*.crisp.chat " +
  "wss://client.relay.crisp.chat " +
  "wss://*.relay.crisp.chat; " +
  "frame-src 'self' https: " +
  "https://game.crisp.chat " +
  "https://*.getwarmly.com; " +
  "media-src 'self' blob: " +
  "https://client.crisp.chat " +
  "https://*.crisp.chat; " +
  "worker-src 'self' blob:; " +
  "object-src 'none'; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "upgrade-insecure-requests";
