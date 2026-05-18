/** Canonical site origin for auth email links (must match Supabase redirect allow list). */
export function getAuthSiteUrl(request?: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  let url = fromEnv || request?.headers.get('origin')?.trim() || 'https://www.agile36.com';
  url = url.replace(/\/$/, '');
  if (url === 'https://agile36.com') {
    url = 'https://www.agile36.com';
  }
  return url;
}

export function passwordResetRedirectUrl(siteUrl?: string): string {
  const base = siteUrl ?? getAuthSiteUrl();
  return `${base}/auth/confirm?next=/account/reset-password`;
}

export function signupConfirmRedirectUrl(siteUrl?: string): string {
  const base = siteUrl ?? getAuthSiteUrl();
  return `${base}/auth/confirm?next=/account`;
}
