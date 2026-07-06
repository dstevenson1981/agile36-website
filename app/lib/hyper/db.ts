/**
 * Supabase writes for visitor identification (service-role client, bypasses RLS).
 * Tables: website_visitors (one row per identified pageview), hyper_people
 * (RB2B reveals), hyper_ip_cache (IP lookup cache).
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { normalizeCompany, type Rb2bPerson } from './people';

let adminClient: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient | null {
  if (adminClient) return adminClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('[hyper] SUPABASE_SERVICE_ROLE_KEY not set — visitor sync disabled');
    return null;
  }
  adminClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}

const IP_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export async function getCachedIpResult(ip: string): Promise<unknown | null> {
  const sb = supabaseAdmin();
  if (!sb) return null;
  const { data } = await sb
    .from('hyper_ip_cache')
    .select('result, fetched_at')
    .eq('ip', ip)
    .maybeSingle();
  if (!data) return null;
  if (Date.now() - new Date(data.fetched_at).getTime() > IP_CACHE_TTL_MS) return null;
  return data.result;
}

export async function cacheIpResult(ip: string, result: unknown): Promise<void> {
  const sb = supabaseAdmin();
  if (!sb) return;
  await sb
    .from('hyper_ip_cache')
    .upsert({ ip, result, fetched_at: new Date().toISOString() }, { onConflict: 'ip' });
}

export interface KnownPerson {
  person_name: string | null;
  email: string | null;
  title: string | null;
  linkedin_url: string | null;
}

/** Most recently revealed person at a company (by normalized name). */
export async function findPersonForCompany(companyName: string): Promise<KnownPerson | null> {
  const sb = supabaseAdmin();
  const norm = normalizeCompany(companyName);
  if (!sb || !norm) return null;
  const { data } = await sb
    .from('hyper_people')
    .select('first_name, last_name, title, email, linkedin_url')
    .eq('company_norm', norm)
    .order('revealed_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  return {
    person_name: [data.first_name, data.last_name].filter(Boolean).join(' ') || null,
    email: data.email,
    title: data.title,
    linkedin_url: data.linkedin_url,
  };
}

export async function insertVisit(row: {
  company: string;
  page: string | null;
  session_id: string | null;
  person: KnownPerson | null;
}): Promise<void> {
  const sb = supabaseAdmin();
  if (!sb) return;
  const { error } = await sb.from('website_visitors').insert({
    company: row.company,
    company_norm: normalizeCompany(row.company),
    page: row.page,
    session_id: row.session_id,
    person_name: row.person?.person_name ?? null,
    email: row.person?.email ?? null,
    title: row.person?.title ?? null,
    linkedin_url: row.person?.linkedin_url ?? null,
  });
  if (error) console.error('[hyper] visit insert failed:', error.message);
}

/**
 * Store an RB2B reveal and back-fill the person onto existing rows for their
 * company. Inserts a standalone row when the company never appeared via IP.
 */
export async function recordPersonReveal(person: Rb2bPerson, raw: unknown): Promise<void> {
  const sb = supabaseAdmin();
  if (!sb) return;
  const norm = normalizeCompany(person.companyName);
  const name = [person.firstName, person.lastName].filter(Boolean).join(' ') || null;

  const { error: upsertError } = await sb.from('hyper_people').upsert(
    {
      revealed_at: new Date().toISOString(),
      first_name: person.firstName,
      last_name: person.lastName,
      title: person.title,
      email: person.email,
      linkedin_url: person.linkedinUrl,
      company_name: person.companyName,
      company_norm: norm || null,
      company_domain: person.companyDomain,
      city: person.city,
      region: person.region,
      raw,
    },
    { onConflict: 'linkedin_url,company_norm' }
  );
  if (upsertError) console.error('[hyper] person upsert failed:', upsertError.message);

  let updatedRows = 0;
  if (norm) {
    const { data, error } = await sb
      .from('website_visitors')
      .update({
        person_name: name,
        email: person.email,
        title: person.title,
        linkedin_url: person.linkedinUrl,
      })
      .eq('company_norm', norm)
      .is('person_name', null)
      .select('id');
    if (error) console.error('[hyper] person back-fill failed:', error.message);
    updatedRows = data?.length ?? 0;
  }

  // Company never appeared via IP (e.g. remote worker) — record the reveal on its own.
  if (updatedRows === 0) {
    const { error } = await sb.from('website_visitors').insert({
      company: person.companyName,
      company_norm: norm || null,
      page: null,
      session_id: null,
      person_name: name,
      email: person.email,
      title: person.title,
      linkedin_url: person.linkedinUrl,
    });
    if (error) console.error('[hyper] standalone reveal insert failed:', error.message);
  }
}
