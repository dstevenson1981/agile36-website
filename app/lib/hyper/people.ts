/**
 * Company-name normalization and RB2B payload parsing for visitor identification.
 * Pure functions — ported from the hyper prototype (unit-tested there).
 */

/**
 * Normalize a company name for fuzzy matching:
 * "Apple Inc." / "APPLE, INC" / "Apple" all normalize to "apple".
 */
export function normalizeCompany(name: string | null | undefined): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[.,'"()]/g, ' ')
    .replace(
      /\b(incorporated|inc|llc|l\.l\.c|ltd|limited|corp|corporation|co|company|gmbh|s\.a|plc|holdings|group|technologies|technology|labs)\b/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
}

export interface Rb2bPerson {
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  email: string | null;
  linkedinUrl: string | null;
  companyName: string | null;
  companyDomain: string | null;
  city: string | null;
  region: string | null;
}

/**
 * Normalize an RB2B webhook payload. RB2B has shipped several field-name styles
 * (PascalCase and camelCase); accept both plus a few sensible aliases.
 */
export function parseRb2bPayload(body: Record<string, unknown>): Rb2bPerson {
  const pick = (...keys: string[]): string | null => {
    for (const k of keys) {
      const v = body[k];
      if (typeof v === 'string' && v.trim()) return v.trim();
    }
    return null;
  };
  return {
    firstName: pick('FirstName', 'firstName', 'first_name'),
    lastName: pick('LastName', 'lastName', 'last_name'),
    title: pick('Title', 'title', 'JobTitle', 'jobTitle', 'job_title'),
    email: pick('Email', 'email', 'BusinessEmail', 'businessEmail', 'business_email'),
    linkedinUrl: pick('LinkedInUrl', 'LinkedInURL', 'linkedInUrl', 'linkedin_url', 'linkedinUrl'),
    companyName: pick('CompanyName', 'companyName', 'company_name', 'Company', 'company'),
    companyDomain: pick('Website', 'website', 'CompanyDomain', 'companyDomain', 'company_domain', 'domain'),
    city: pick('City', 'city'),
    region: pick('State', 'state', 'Region', 'region'),
  };
}
