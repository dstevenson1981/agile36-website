import { PERSONAL_EMAIL_DOMAINS } from "./config";

export function emailDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 0) return null;
  return email.slice(at + 1).toLowerCase().trim();
}

export function isPersonalEmail(email: string): boolean {
  const domain = emailDomain(email);
  if (!domain) return true;
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}

export function splitName(fullName: string | null | undefined): {
  first_name: string | null;
  last_name: string | null;
} {
  if (!fullName?.trim()) return { first_name: null, last_name: null };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0], last_name: null };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}
