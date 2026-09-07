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
  company: string | null;
  page: string | null;
  page_title?: string | null;
  referrer?: string | null;
  session_id: string | null;
  visitor_id?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  person: KnownPerson | null;
}): Promise<{ ok: boolean; newSession: boolean }> {
  const sb = supabaseAdmin();
  if (!sb) return { ok: false, newSession: false };

  let newSession = true;
  if (row.session_id) {
    const since = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
    const { data } = await sb
      .from('website_visitors')
      .select('id')
      .eq('session_id', row.session_id)
      .gte('visited_at', since)
      .limit(1);
    newSession = !data?.length;
  }

  const { error } = await sb.from('website_visitors').insert({
    company: row.company,
    company_norm: row.company ? normalizeCompany(row.company) : null,
    page: row.page,
    page_title: row.page_title ?? null,
    referrer: row.referrer ?? null,
    session_id: row.session_id,
    visitor_id: row.visitor_id ?? null,
    city: row.city ?? null,
    region: row.region ?? null,
    country: row.country ?? null,
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,
    person_name: row.person?.person_name ?? null,
    email: row.person?.email ?? null,
    title: row.person?.title ?? null,
    linkedin_url: row.person?.linkedin_url ?? null,
  });
  if (error) {
    console.error('[hyper] visit insert failed:', error.message);
    return { ok: false, newSession: false };
  }
  return { ok: true, newSession };
}

/** Keep a tab marked live without writing another pageview row. */
export async function touchVisit(sessionId: string | null): Promise<void> {
  const sb = supabaseAdmin();
  if (!sb || !sessionId) return;
  const { data } = await sb
    .from("website_visitors")
    .select("id")
    .eq("session_id", sessionId)
    .order("visited_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data?.id) return;
  await sb
    .from("website_visitors")
    .update({ visited_at: new Date().toISOString() })
    .eq("id", data.id);
}

export type VisitorPresence = {
  session_id: string;
  visitor_id: string | null;
  path: string | null;
  page_title: string | null;
  mouse_x: number | null;
  mouse_y: number | null;
  scroll_y: number | null;
  scroll_max: number | null;
  viewport_w: number | null;
  viewport_h: number | null;
  is_private: boolean;
  clicked_at: string | null;
  updated_at: string;
};

export async function upsertPresence(row: {
  session_id: string;
  visitor_id?: string | null;
  path?: string | null;
  page_title?: string | null;
  mouse_x?: number | null;
  mouse_y?: number | null;
  scroll_y?: number | null;
  scroll_max?: number | null;
  viewport_w?: number | null;
  viewport_h?: number | null;
  is_private?: boolean;
  clicked?: boolean;
}): Promise<void> {
  const sb = supabaseAdmin();
  if (!sb || !row.session_id) return;
  const payload: Record<string, unknown> = {
    session_id: row.session_id,
    visitor_id: row.visitor_id ?? null,
    path: row.path ?? null,
    page_title: row.page_title ?? null,
    is_private: Boolean(row.is_private),
    updated_at: new Date().toISOString(),
  };
  if (!row.is_private) {
    payload.mouse_x = row.mouse_x ?? null;
    payload.mouse_y = row.mouse_y ?? null;
    payload.scroll_y = row.scroll_y ?? null;
    payload.scroll_max = row.scroll_max ?? null;
    payload.viewport_w = row.viewport_w ?? null;
    payload.viewport_h = row.viewport_h ?? null;
    if (row.clicked) payload.clicked_at = new Date().toISOString();
  } else {
    payload.mouse_x = null;
    payload.mouse_y = null;
    payload.scroll_y = null;
    payload.scroll_max = null;
    payload.clicked_at = null;
  }
  await sb.from("visitor_presence").upsert(payload, { onConflict: "session_id" });
}

export async function getPresence(sessionId: string): Promise<VisitorPresence | null> {
  const sb = supabaseAdmin();
  if (!sb || !sessionId) return null;
  const { data } = await sb.from("visitor_presence").select("*").eq("session_id", sessionId).maybeSingle();
  return (data as VisitorPresence | null) ?? null;
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
