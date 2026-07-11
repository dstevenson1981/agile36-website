import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import matter from 'gray-matter';
import { existsSync, readFileSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod/v4';

import {
  CATALOG_COURSES,
  COURSE_CATEGORIES,
  type CatalogCourse,
  type CourseCategory,
  getCatalogCourseAcronym,
  getCatalogCourseSlug,
  getCatalogCourseUrl,
  getCatalogScheduleUrl,
} from '../app/lib/course-catalog';
import { COURSE_HERO_SCHEDULE_LIST_USD } from '../app/lib/course-hero-schedule-pricing';
import { normalizeCompany } from '../app/lib/hyper/people';

type WriteMode = 'off' | 'draft' | 'live';
type JsonObject = Record<string, unknown>;
type McpTextResult = { content: Array<{ type: 'text'; text: string }> };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = resolveRootDir();

dotenv.config({ path: path.join(ROOT_DIR, '.env.local') });
dotenv.config({ path: path.join(ROOT_DIR, '.env') });

const OUTBOX_DIR = path.resolve(ROOT_DIR, process.env.AGILE36_MCP_OUTBOX_DIR ?? 'mcp/outbox');

const WRITE_MODE = parseWriteMode(process.env.AGILE36_MCP_WRITE_MODE);
const ENABLE_WEBHOOKS = process.env.AGILE36_MCP_ENABLE_WEBHOOKS === 'true';
const ENABLE_CONTENT_STAGING = process.env.AGILE36_MCP_ENABLE_CONTENT_STAGING !== 'false';
const ENABLE_LIVE_PUBLISH = process.env.AGILE36_MCP_ENABLE_LIVE_PUBLISH === 'true';
const AGILE36_SITE_URL = process.env.AGILE36_SITE_URL ?? 'https://www.agile36.com';
const SERVER_VERSION = '0.1.0';

const toolNames: string[] = [];

function resolveRootDir(): string {
  const explicitRoot = process.env.AGILE36_MCP_ROOT_DIR;
  if (explicitRoot) return path.resolve(explicitRoot);

  const candidates = [
    process.cwd(),
    path.resolve(__dirname, '..'),
    path.resolve(__dirname, '../..'),
  ];

  for (const candidate of candidates) {
    if (isAgile36Root(candidate)) return candidate;
  }

  return path.resolve(__dirname, '..');
}

function isAgile36Root(candidate: string): boolean {
  try {
    const packagePath = path.join(candidate, 'package.json');
    if (!existsSync(packagePath)) return false;
    const pkg = JSON.parse(readFileSync(packagePath, 'utf8')) as { name?: string };
    return pkg.name === 'agile36-site';
  } catch {
    return false;
  }
}

function parseWriteMode(value: string | undefined): WriteMode {
  if (value === 'off' || value === 'live') return value;
  return 'draft';
}

function jsonText(value: unknown): McpTextResult {
  return {
    content: [
      {
        type: 'text',
        text: typeof value === 'string' ? value : JSON.stringify(value, null, 2),
      },
    ],
  };
}

function clampLimit(value: number | undefined, fallback: number, max: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(Math.max(Math.floor(value ?? fallback), 1), max);
}

function redactError(error: unknown): JsonObject {
  if (error instanceof Error) {
    return { message: error.message };
  }
  if (typeof error === 'object' && error !== null) {
    const record = error as Record<string, unknown>;
    return {
      message: typeof record.message === 'string' ? record.message : 'Unknown error',
      code: typeof record.code === 'string' ? record.code : undefined,
    };
  }
  return { message: String(error) };
}

let supabaseClient: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  supabaseClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return supabaseClient;
}

function supabaseState(): JsonObject {
  return {
    configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
    serviceRoleAvailable: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
}

function courseToOperatingRecord(course: CatalogCourse): JsonObject {
  const slug = getCatalogCourseSlug(course);
  const schedulePricing = COURSE_HERO_SCHEDULE_LIST_USD[slug];
  return {
    id: course.id,
    slug,
    title: course.title,
    acronym: getCatalogCourseAcronym(course.title),
    category: course.category,
    price: schedulePricing?.current ?? course.price,
    originalPrice: schedulePricing?.original ?? course.originalPrice,
    hours: course.hours,
    days: course.days,
    enrolled: course.enrolled,
    skills: course.skills,
    flags: {
      popular: Boolean(course.popular),
      trending: Boolean(course.trending),
      advanced: Boolean(course.advanced),
      privateClass: Boolean(course.privateClass),
    },
    url: `${AGILE36_SITE_URL}${getCatalogCourseUrl(course)}`,
    scheduleUrl: `${AGILE36_SITE_URL}${getCatalogScheduleUrl(course)}`,
  };
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function findCourse(slugOrTitle: string): CatalogCourse | null {
  const needle = normalizeSearchText(slugOrTitle);
  if (!needle) return null;

  return (
    CATALOG_COURSES.find((course) => getCatalogCourseSlug(course) === slugOrTitle) ??
    CATALOG_COURSES.find((course) => normalizeSearchText(getCatalogCourseSlug(course)) === needle) ??
    CATALOG_COURSES.find((course) => normalizeSearchText(course.title).includes(needle)) ??
    CATALOG_COURSES.find((course) => normalizeSearchText(getCatalogCourseAcronym(course.title)) === needle) ??
    null
  );
}

function createManifest(): JsonObject {
  return {
    name: 'Agile36 Business MCP',
    version: SERVER_VERSION,
    purpose:
      'Expose Agile36 as an AI-operable business interface for revenue operations, visitor/company intelligence, content optimization, and gated sales actions.',
    site: AGILE36_SITE_URL,
    writeMode: WRITE_MODE,
    capabilities: {
      courses: true,
      schedules: true,
      contentSearch: true,
      visitors: true,
      leads: true,
      companyProfiles: true,
      intentScoring: true,
      salesDrafting: true,
      contentDrafting: true,
      experimentDrafting: true,
      stagedActions: WRITE_MODE !== 'off',
      liveDatabaseWrites: WRITE_MODE === 'live',
      liveWebhooks: WRITE_MODE === 'live' && ENABLE_WEBHOOKS,
      livePublishing: WRITE_MODE === 'live' && ENABLE_LIVE_PUBLISH,
    },
    dataSources: {
      catalog: 'app/lib/course-catalog.ts',
      schedulePricing: 'app/lib/course-hero-schedule-pricing.ts',
      schedules: 'Supabase course_schedules',
      visitors: 'Supabase website_visitors and hyper_people',
      leads: 'Supabase enrollment_leads, coupon_leads, assessment_emails, corporate_accounts',
      content: 'content/blog, app routes, data/seoPages.js',
    },
    supabase: supabaseState(),
    tools: toolNames,
  };
}

function guardrails(): JsonObject {
  return {
    authorityModel: {
      off: 'No writes. Tools return plans only.',
      draft: 'Default. Potential actions are saved to local outbox files for human review.',
      live: 'Database/webhook writes may run only for tools that explicitly support live mode and only when required env vars are set.',
    },
    hardStops: [
      'Do not publish content, change pricing, issue refunds, charge cards, email customers, or update production records unless the specific live capability is enabled.',
      'Never reveal environment variable values, service-role keys, payment secrets, or raw webhook secrets.',
      'Treat visitor/company identification as a signal, not proof. A person browsing from a company network may still be an individual learner.',
      'For corporate sales actions, draft and alert first unless live mode has been intentionally enabled.',
    ],
    defaultWriteMode: 'draft',
    currentWriteMode: WRITE_MODE,
    outboxDir: path.relative(ROOT_DIR, OUTBOX_DIR),
  };
}

async function writeOutbox(kind: string, payload: JsonObject): Promise<JsonObject> {
  if (WRITE_MODE === 'off') {
    return {
      written: false,
      mode: WRITE_MODE,
      reason: 'AGILE36_MCP_WRITE_MODE=off',
      payload,
    };
  }

  await fs.mkdir(OUTBOX_DIR, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeKind = kind.replace(/[^a-z0-9_-]+/gi, '-').toLowerCase();
  const filePath = path.join(OUTBOX_DIR, `${timestamp}-${safeKind}.json`);
  await fs.writeFile(
    filePath,
    `${JSON.stringify(
      {
        kind,
        mode: WRITE_MODE,
        createdAt: new Date().toISOString(),
        payload,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );

  return {
    written: true,
    mode: WRITE_MODE,
    path: path.relative(ROOT_DIR, filePath),
  };
}

async function readTextFile(filePath: string, maxChars = 24000): Promise<string> {
  const text = await fs.readFile(filePath, 'utf8');
  return text.length > maxChars ? `${text.slice(0, maxChars)}\n\n[truncated]` : text;
}

async function walkFiles(startDir: string, predicate: (filePath: string) => boolean, limit = 400): Promise<string[]> {
  const results: string[] = [];

  async function walk(dir: string): Promise<void> {
    if (results.length >= limit) return;
    let entries: Array<import('node:fs').Dirent>;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (results.length >= limit) return;
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (predicate(fullPath)) {
        results.push(fullPath);
      }
    }
  }

  await walk(startDir);
  return results;
}

function stripSourceForSearch(raw: string): string {
  return raw
    .replace(/import[\s\S]*?from ['"][^'"]+['"];?/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[{}()[\]<>`'"|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSnippet(text: string, query: string, maxLength = 420): string {
  const normalized = text.toLowerCase();
  const queryTerms = normalizeSearchText(query).split(' ').filter(Boolean);
  const firstIndex = queryTerms.reduce((best, term) => {
    const idx = normalized.indexOf(term);
    if (idx < 0) return best;
    return best < 0 ? idx : Math.min(best, idx);
  }, -1);

  const start = Math.max((firstIndex < 0 ? 0 : firstIndex) - 120, 0);
  return text.slice(start, start + maxLength).trim();
}

async function getSearchableFiles(includeCode: boolean): Promise<string[]> {
  const contentFiles = await walkFiles(
    path.join(ROOT_DIR, 'content'),
    (filePath) => /\.(mdx|md|txt)$/i.test(filePath),
    300,
  );
  const dataFiles = await walkFiles(path.join(ROOT_DIR, 'data'), (filePath) => /\.(js|ts|json)$/i.test(filePath), 80);

  if (!includeCode) return [...contentFiles, ...dataFiles];

  const appFiles = await walkFiles(
    path.join(ROOT_DIR, 'app'),
    (filePath) => /\/(page|layout)\.(tsx|ts|jsx|js)$/i.test(filePath) || /\/api\/.+\/route\.ts$/i.test(filePath),
    260,
  );
  return [...contentFiles, ...dataFiles, ...appFiles];
}

function routeToCandidates(route: string): string[] {
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  const trimmed = normalizedRoute.replace(/^\/+|\/+$/g, '');
  const candidates = new Set<string>();

  if (!trimmed) {
    candidates.add(path.join(ROOT_DIR, 'app/page.tsx'));
  } else {
    candidates.add(path.join(ROOT_DIR, 'app', trimmed, 'page.tsx'));
    candidates.add(path.join(ROOT_DIR, 'app', trimmed, 'layout.tsx'));
  }

  if (trimmed.startsWith('blog/')) {
    const slug = trimmed.replace(/^blog\//, '');
    candidates.add(path.join(ROOT_DIR, 'content/blog', slug, 'index.mdx'));
  }

  if (trimmed.startsWith('courses/')) {
    candidates.add(path.join(ROOT_DIR, 'app/courses/[slug]/page.tsx'));
    candidates.add(path.join(ROOT_DIR, 'app/courses', trimmed.replace(/^courses\//, ''), 'page.tsx'));
  }

  candidates.add(path.join(ROOT_DIR, 'data/seoPages.js'));
  return [...candidates];
}

async function listSchedules(input: {
  courseSlug?: string;
  status?: string;
  daysAhead?: number;
  includeHidden?: boolean;
  limit?: number;
}): Promise<JsonObject> {
  const sb = getSupabase();
  if (!sb) {
    return {
      configured: false,
      reason: 'NEXT_PUBLIC_SUPABASE_URL plus SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY are required.',
    };
  }

  const status = input.status ?? 'active';
  const limit = clampLimit(input.limit, 30, 200);
  const daysAhead = clampLimit(input.daysAhead, 180, 730);
  const since = new Date().toISOString();
  const until = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000).toISOString();

  let query = sb
    .from('course_schedules')
    .select('*')
    .eq('status', status)
    .gte('start_date', since)
    .lte('start_date', until)
    .order('start_date', { ascending: true })
    .limit(limit);

  if (!input.includeHidden) query = query.or('hidden.is.null,hidden.eq.false');
  if (input.courseSlug) query = query.eq('course_slug', input.courseSlug);

  let { data, error } = await query;
  if (error && !input.includeHidden && (error.code === '42703' || error.message?.includes('hidden'))) {
    let retry = sb
      .from('course_schedules')
      .select('*')
      .eq('status', status)
      .gte('start_date', since)
      .lte('start_date', until)
      .order('start_date', { ascending: true })
      .limit(limit);
    if (input.courseSlug) retry = retry.eq('course_slug', input.courseSlug);
    const result = await retry;
    data = result.data;
    error = result.error;
  }

  if (error) {
    return { configured: true, error: redactError(error) };
  }

  return { configured: true, count: data?.length ?? 0, schedules: data ?? [] };
}

async function getRecentVisitors(input: { limit?: number; company?: string; pageContains?: string }): Promise<JsonObject> {
  const sb = getSupabase();
  if (!sb) return { configured: false, reason: 'Supabase env vars are required.' };

  const limit = clampLimit(input.limit, 25, 200);
  let query = sb
    .from('website_visitors')
    .select('id, created_at, company, company_norm, page, session_id, person_name, email, title, linkedin_url')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (input.company) {
    const normalized = normalizeCompany(input.company);
    if (normalized) query = query.eq('company_norm', normalized);
    else query = query.ilike('company', `%${input.company}%`);
  }
  if (input.pageContains) query = query.ilike('page', `%${input.pageContains}%`);

  const { data, error } = await query;
  if (error) return { configured: true, error: redactError(error) };
  return { configured: true, count: data?.length ?? 0, visitors: data ?? [] };
}

async function getTableRows(
  table: string,
  select: string,
  limit: number,
  emailDomain?: string,
  orderColumn = 'created_at',
): Promise<JsonObject> {
  const sb = getSupabase();
  if (!sb) return { configured: false, table, reason: 'Supabase env vars are required.' };

  let query = sb.from(table).select(select).order(orderColumn, { ascending: false }).limit(limit);
  if (emailDomain) query = query.ilike('email', `%@${emailDomain.replace(/^@/, '')}`);

  const { data, error } = await query;
  if (error) return { configured: true, table, error: redactError(error), rows: [] };
  return { configured: true, table, count: data?.length ?? 0, rows: data ?? [] };
}

async function getLeads(input: { source?: string; limit?: number; emailDomain?: string }): Promise<JsonObject> {
  const limit = clampLimit(input.limit, 25, 100);
  const source = input.source ?? 'all';
  const tasks: Array<Promise<JsonObject>> = [];

  if (source === 'all' || source === 'enrollment') {
    tasks.push(
      getTableRows(
        'enrollment_leads',
        'id, created_at, updated_at, course_slug, course_name, enrolling_for, first_name, last_name, email, phone, status, referral_code',
        limit,
        input.emailDomain,
      ),
    );
  }
  if (source === 'all' || source === 'coupon') {
    tasks.push(getTableRows('coupon_leads', 'id, created_at, email, course, coupon_code', limit, input.emailDomain));
  }
  if (source === 'all' || source === 'assessment') {
    tasks.push(getTableRows('assessment_emails', 'id, created_at, name, email, source, exam_name, message', limit, input.emailDomain));
  }
  if (source === 'all' || source === 'corporate') {
    tasks.push(
      getTableRows(
        'corporate_accounts',
        'id, created_at, updated_at, company_name, contact_name, contact_title, contact_email, corp_code, status, authorized_email_domains',
        limit,
        undefined,
      ),
    );
  }

  const results = await Promise.all(tasks);
  return {
    source,
    results,
  };
}

async function getCompanyProfile(companyName: string): Promise<JsonObject> {
  const sb = getSupabase();
  const companyNorm = normalizeCompany(companyName);
  if (!sb) return { configured: false, companyName, companyNorm, reason: 'Supabase env vars are required.' };
  if (!companyNorm) return { configured: true, error: { message: 'A company name is required.' } };

  const [visits, people] = await Promise.all([
    sb
      .from('website_visitors')
      .select('id, created_at, company, page, session_id, person_name, email, title, linkedin_url')
      .eq('company_norm', companyNorm)
      .order('created_at', { ascending: false })
      .limit(100),
    sb
      .from('hyper_people')
      .select('revealed_at, first_name, last_name, title, email, linkedin_url, company_name, company_domain, city, region')
      .eq('company_norm', companyNorm)
      .order('revealed_at', { ascending: false })
      .limit(20),
  ]);

  const visitRows = visits.data ?? [];
  const pages = [...new Set(visitRows.map((row) => row.page).filter(Boolean))];
  const sessions = new Set(visitRows.map((row) => row.session_id).filter(Boolean));
  const contacts = [
    ...(people.data ?? []).map((person) => ({
      name: [person.first_name, person.last_name].filter(Boolean).join(' ') || null,
      title: person.title,
      email: person.email,
      linkedinUrl: person.linkedin_url,
      source: 'hyper_people',
      revealedAt: person.revealed_at,
    })),
    ...visitRows
      .filter((row) => row.person_name || row.email)
      .map((row) => ({
        name: row.person_name,
        title: row.title,
        email: row.email,
        linkedinUrl: row.linkedin_url,
        source: 'website_visitors',
        revealedAt: row.created_at,
      })),
  ];

  return {
    configured: true,
    companyName,
    companyNorm,
    errors: [visits.error, people.error].filter(Boolean).map(redactError),
    summary: {
      visitCount: visitRows.length,
      uniqueSessions: sessions.size,
      knownContacts: contacts.length,
      firstSeenAt: visitRows.at(-1)?.created_at ?? null,
      lastSeenAt: visitRows[0]?.created_at ?? null,
      pages,
    },
    recentVisits: visitRows.slice(0, 25),
    contacts: contacts.slice(0, 20),
  };
}

function scoreRevenueIntent(input: {
  pages?: string[];
  visitor?: JsonObject;
  companyProfile?: JsonObject;
  courseSlug?: string;
}): JsonObject {
  const pages = (input.pages ?? [])
    .map((page) => String(page ?? '').toLowerCase())
    .filter(Boolean);
  const signals: Array<{ signal: string; points: number }> = [];

  const add = (signal: string, points: number) => signals.push({ signal, points });

  if (input.courseSlug) add('Specific course interest is known', 12);
  if (pages.some((page) => page.includes('/corporate'))) add('Visited corporate training flow', 30);
  if (pages.some((page) => page.includes('/checkout') || page.includes('/enroll'))) add('Reached checkout or enrollment flow', 25);
  if (pages.some((page) => page.includes('/schedule'))) add('Viewed live schedule', 20);
  if (pages.some((page) => page.includes('/courses/'))) add('Viewed course page', 10);
  if (pages.some((page) => page.includes('coupon') || page.includes('promo'))) add('Engaged with coupon or promo', 15);
  if (pages.some((page) => page.includes('/contact') || page.includes('/book'))) add('Reached contact or booking path', 20);

  const visitCount = Number((input.companyProfile?.summary as JsonObject | undefined)?.visitCount ?? 0);
  const uniqueSessions = Number((input.companyProfile?.summary as JsonObject | undefined)?.uniqueSessions ?? 0);
  const knownContacts = Number((input.companyProfile?.summary as JsonObject | undefined)?.knownContacts ?? 0);
  if (visitCount >= 5) add('Multiple visits from same company', 20);
  if (uniqueSessions >= 2) add('Multiple sessions from same company', 15);
  if (knownContacts > 0) add('Known contact revealed', 15);
  if (input.visitor?.email) add('Visitor email is known', 20);
  if (input.visitor?.title) add('Visitor role/title is known', 8);

  const score = Math.min(
    100,
    Math.round(signals.reduce((total, signal) => total + signal.points, 0)),
  );
  const tier = score >= 75 ? 'hot' : score >= 45 ? 'warm' : score >= 20 ? 'research' : 'low';
  const motion = determineMotion(pages, input.courseSlug, visitCount, uniqueSessions);

  return {
    score,
    tier,
    motion,
    signals,
    recommendedActions: recommendedActionsForTier(tier, motion),
    caveat:
      'Company identification is probabilistic. Do not assume a visitor is a corporate buyer solely because they work at, or browse from, a company network.',
  };
}

function determineMotion(pages: string[], courseSlug?: string, visitCount = 0, uniqueSessions = 0): string {
  if (pages.some((page) => page.includes('/corporate')) || uniqueSessions >= 3) return 'corporate_training';
  if (pages.some((page) => page.includes('/checkout') || page.includes('/enroll'))) return 'checkout_recovery';
  if (courseSlug || pages.some((page) => page.includes('/courses/'))) return 'individual_or_team_enrollment';
  if (visitCount > 0) return 'content_research';
  return 'unknown';
}

function recommendedActionsForTier(tier: string, motion: string): string[] {
  if (tier === 'hot') {
    return [
      'Create a sales alert with the company/profile summary and pages viewed.',
      'Draft a course-specific or corporate-training follow-up.',
      'Offer the fastest path to schedule, quote, or invoice depending on the motion.',
    ];
  }
  if (tier === 'warm') {
    return [
      'Personalize the next page or follow-up around the course/category they viewed.',
      'Check whether the company has prior leads, coupon captures, or corporate account history.',
      'Stage a helpful non-pushy email or retargeting audience note.',
    ];
  }
  if (motion === 'content_research') {
    return [
      'Recommend related course pages or comparison content.',
      'Watch for a second high-intent signal before escalating to sales.',
    ];
  }
  return ['Continue observing; no direct revenue action recommended yet.'];
}

function recommendNextActions(context: string, maxActions: number): JsonObject {
  const normalized = context.toLowerCase();
  const actions: JsonObject[] = [];
  const push = (action: string, why: string, tool?: string) => actions.push({ action, why, tool });

  if (normalized.includes('corporate') || normalized.includes('team') || normalized.includes('group')) {
    push('Build a corporate-training brief', 'The context suggests multiple seats or organizational training.', 'get_company_profile');
    push('Draft a procurement-friendly email', 'Corporate buyers usually need schedule, invoice, and outcome clarity.', 'draft_followup_email');
    push('Stage a sales alert', 'This should go to the owner while the account is fresh.', 'send_sales_alert');
  }

  if (normalized.includes('checkout') || normalized.includes('cart') || normalized.includes('payment')) {
    push('Score checkout recovery intent', 'Checkout behavior is one of the strongest enrollment signals.', 'score_revenue_intent');
    push('Draft a short recovery email', 'The next message should reduce friction, not sell broadly.', 'draft_followup_email');
  }

  if (normalized.includes('course') || normalized.includes('schedule') || normalized.includes('certification')) {
    push('Pull course and schedule details', 'Specific course interest allows a precise recommendation.', 'get_course');
    push('Recommend nearby live classes', 'Schedule clarity is often the conversion blocker.', 'list_schedules');
  }

  if (normalized.includes('content') || normalized.includes('blog') || normalized.includes('seo')) {
    push('Draft a page update', 'Content intent can be converted with stronger course bridges.', 'draft_page_update');
    push('Create an experiment draft', 'The change should be measured against a revenue-adjacent metric.', 'draft_experiment');
  }

  if (actions.length === 0) {
    push('Gather visitor and lead context', 'The context is too broad to safely execute; enrich first.', 'get_recent_visitors');
    push('Score revenue intent', 'Use deterministic signals before choosing a sales motion.', 'score_revenue_intent');
    push('Draft next best action', 'Keep action staged until the signal is clearer.', 'log_agent_action');
  }

  return { actions: actions.slice(0, maxActions) };
}

function draftFollowupEmail(input: {
  recipientName?: string;
  companyName?: string;
  courseSlug?: string;
  motion?: string;
  notes?: string;
  senderName?: string;
}): JsonObject {
  const course = input.courseSlug ? findCourse(input.courseSlug) : null;
  const courseRecord = course ? courseToOperatingRecord(course) : null;
  const recipient = input.recipientName || 'there';
  const sender = input.senderName || 'Agile36';
  const companyLine = input.companyName ? `I noticed interest from ${input.companyName}` : 'I noticed some activity on Agile36';
  const courseLine = courseRecord
    ? `around ${courseRecord.title}, including upcoming live training options.`
    : 'around Agile36 training options.';
  const corporate = input.motion === 'corporate_training';

  const subject = corporate
    ? `Training options for ${input.companyName ?? 'your team'}`
    : courseRecord
      ? `${courseRecord.title}: upcoming options`
      : 'Agile36 training options';

  const body = [
    `Hi ${recipient},`,
    '',
    `${companyLine} ${courseLine}`,
    corporate
      ? 'If you are evaluating training for a group, I can help map the right course, schedule, seat count, and billing path without making your team chase details.'
      : 'If you are comparing options, I can help you find the right class date and answer anything about certification, format, or enrollment.',
    courseRecord ? `The course page is ${courseRecord.url} and the schedule page is ${courseRecord.scheduleUrl}.` : '',
    input.notes ? `Context I am working from: ${input.notes}` : '',
    '',
    'Would it be useful if I sent over the next available dates and the simplest enrollment path?',
    '',
    `Best,`,
    sender,
  ]
    .filter((line) => line !== '')
    .join('\n');

  return {
    subject,
    body,
    mode: WRITE_MODE,
    note: 'Draft only. This tool does not send email.',
  };
}

function draftPageUpdate(input: { route: string; audience?: string; goal: string; constraints?: string }): JsonObject {
  const audience = input.audience || 'high-intent training buyers';
  return {
    route: input.route,
    audience,
    goal: input.goal,
    proposedChanges: [
      {
        area: 'Above-the-fold CTA',
        change: `Make the primary action match ${audience}: choose schedule, request team quote, or compare course options.`,
        reason: 'The first action should reflect the buyer motion instead of forcing every visitor into the same path.',
      },
      {
        area: 'Trust and proof',
        change: 'Add concise proof near the decision point: certification outcome, format, duration, and company/team fit.',
        reason: 'Revenue pages need proof close to the CTA, not buried lower on the page.',
      },
      {
        area: 'Next-step routing',
        change: 'Create separate routing for individual enrollment vs team/corporate training.',
        reason: 'A corporate buyer and an individual learner need different friction removed.',
      },
    ],
    constraints: input.constraints ?? null,
    status: ENABLE_CONTENT_STAGING ? 'draftable' : 'content staging disabled',
  };
}

function draftExperiment(input: { route: string; hypothesis: string; metric: string; audience?: string }): JsonObject {
  return {
    route: input.route,
    hypothesis: input.hypothesis,
    audience: input.audience ?? 'all eligible visitors',
    primaryMetric: input.metric,
    variants: [
      {
        name: 'control',
        description: 'Current page experience.',
      },
      {
        name: 'revenue-intent routing',
        description:
          'CTA and page emphasis adapt to detected intent: course schedule for individuals, quote/contact path for company or team signals.',
      },
    ],
    guardrails: [
      'Do not alter price claims without owner approval.',
      'Do not hide required course/certification details.',
      'Evaluate lead quality, not only click volume.',
    ],
  };
}

async function postWebhook(subject: string, summary: string, payload?: JsonObject): Promise<JsonObject> {
  const webhookUrl = process.env.AGILE36_MCP_ALERT_WEBHOOK_URL;
  if (WRITE_MODE !== 'live' || !ENABLE_WEBHOOKS || !webhookUrl) {
    return writeOutbox('sales-alert', {
      subject,
      summary,
      payload,
      reason: 'Webhook not sent because live mode, AGILE36_MCP_ENABLE_WEBHOOKS, or AGILE36_MCP_ALERT_WEBHOOK_URL is not enabled.',
    });
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ subject, summary, payload, createdAt: new Date().toISOString() }),
  });

  return {
    sent: response.ok,
    status: response.status,
    mode: WRITE_MODE,
  };
}

async function createCorporateLead(input: JsonObject): Promise<JsonObject> {
  if (WRITE_MODE !== 'live') {
    const staged = await writeOutbox('corporate-lead', input);
    return {
      created: false,
      staged,
      reason: 'Corporate lead creation is staged unless AGILE36_MCP_WRITE_MODE=live.',
    };
  }

  const sb = getSupabase();
  const table = process.env.AGILE36_MCP_LEAD_TABLE ?? 'mcp_leads';
  if (!sb) return { created: false, error: { message: 'Supabase env vars are required for live lead creation.' } };

  const { data, error } = await sb
    .from(table)
    .insert({
      source: 'agile36_mcp',
      payload: input,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    const staged = await writeOutbox('corporate-lead-live-failed', { input, error: redactError(error) });
    return { created: false, table, error: redactError(error), staged };
  }

  return { created: true, table, lead: data };
}

function registerJsonResource(server: McpServer, name: string, uri: string, title: string, description: string, producer: () => unknown | Promise<unknown>) {
  server.registerResource(
    name,
    uri,
    {
      title,
      description,
      mimeType: 'application/json',
    },
    async () => ({
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(await producer(), null, 2),
        },
      ],
    }),
  );
}

function registerTool<Input extends Record<string, z.ZodTypeAny> | undefined>(
  server: McpServer,
  name: string,
  config: {
    title: string;
    description: string;
    inputSchema?: Input;
    readOnly?: boolean;
  },
  callback: Input extends Record<string, z.ZodTypeAny>
    ? (args: z.infer<z.ZodObject<Input>>) => Promise<unknown> | unknown
    : () => Promise<unknown> | unknown,
) {
  toolNames.push(name);
  const handler = (async (args: unknown) =>
    jsonText(await (callback as (args?: unknown) => Promise<unknown> | unknown)(args)));
  const register = server.registerTool.bind(server) as unknown as (
    toolName: string,
    toolConfig: Record<string, unknown>,
    toolCallback: (args: unknown) => Promise<McpTextResult>,
  ) => void;

  register(
    name,
    {
      title: config.title,
      description: config.description,
      inputSchema: config.inputSchema,
      annotations: config.readOnly
        ? {
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
          }
        : {
            readOnlyHint: false,
            destructiveHint: false,
            idempotentHint: false,
          },
    },
    handler,
  );
}

export function createAgile36McpServer(): McpServer {
  toolNames.length = 0;
  const server = new McpServer({
    name: 'agile36-business-mcp',
    version: SERVER_VERSION,
  });

  registerJsonResource(
    server,
    'operating-manifest',
    'agile36://manifest',
    'Agile36 MCP Operating Manifest',
    'Capability map, write mode, data sources, and exposed tools.',
    createManifest,
  );
  registerJsonResource(
    server,
    'guardrails',
    'agile36://guardrails',
    'Agile36 MCP Guardrails',
    'Authority model and hard stops for AI operators.',
    guardrails,
  );
  registerJsonResource(
    server,
    'courses',
    'agile36://courses',
    'Agile36 Course Catalog',
    'Revenue-facing catalog with prices, URLs, and schedule URLs.',
    () => CATALOG_COURSES.map(courseToOperatingRecord),
  );
  registerJsonResource(
    server,
    'site-map',
    'agile36://site-map',
    'Agile36 Site Map',
    'Core pages and dynamic route families available to AI operators.',
    async () => ({
      staticRoutes: [
        '/',
        '/courses',
        '/blog',
        '/corporate',
        '/corporate/onboard',
        '/contact',
        '/ai-agent-builder',
      ],
      courseRoutes: CATALOG_COURSES.map((course) => getCatalogCourseUrl(course)),
      blogRoutes: (await walkFiles(path.join(ROOT_DIR, 'content/blog'), (filePath) => filePath.endsWith('index.mdx'), 150)).map(
        (filePath) => `/blog/${path.basename(path.dirname(filePath))}`,
      ),
    }),
  );

  server.registerPrompt(
    'daily_revenue_operator',
    {
      title: 'Daily Revenue Operator',
      description: 'Review visitor, lead, schedule, and content signals and recommend the next revenue actions.',
    },
    async () => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text:
              'Act as the Agile36 revenue operator. Read the manifest and guardrails, inspect recent visitors/leads/schedules, score intent, and return the highest-leverage staged actions for today.',
          },
        },
      ],
    }),
  );
  server.registerPrompt(
    'high_intent_visitor_playbook',
    {
      title: 'High Intent Visitor Playbook',
      description: 'Turn a visitor/company signal into a responsible sales motion.',
      argsSchema: {
        companyName: z.string().optional().describe('Company to investigate'),
        courseSlug: z.string().optional().describe('Course slug if known'),
      },
    },
    async ({ companyName, courseSlug }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Investigate ${companyName ?? 'the current visitor/company'}${courseSlug ? ` for ${courseSlug}` : ''}. Build a profile, score intent, respect the guardrails, and stage the best next action.`,
          },
        },
      ],
    }),
  );
  server.registerPrompt(
    'course_page_optimizer',
    {
      title: 'Course Page Optimizer',
      description: 'Optimize a course page for conversion without changing unapproved pricing or certification claims.',
      argsSchema: {
        route: z.string().describe('Route to optimize, such as /courses/leading-safe'),
        goal: z.string().default('increase qualified enrollment starts'),
      },
    },
    async ({ route, goal }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Review ${route}, search related content, and draft a staged page update and experiment to ${goal}. Do not publish changes.`,
          },
        },
      ],
    }),
  );
  server.registerPrompt(
    'corporate_training_operator',
    {
      title: 'Corporate Training Operator',
      description: 'Prepare a corporate-training motion from company, visitor, lead, and schedule signals.',
      argsSchema: {
        companyName: z.string().describe('Company to investigate'),
      },
    },
    async ({ companyName }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Build a corporate-training operating brief for ${companyName}. Include known visits, contacts, likely courses, buying signals, and a staged sales alert or follow-up draft.`,
          },
        },
      ],
    }),
  );

  registerTool(server, 'get_operating_manifest', {
    title: 'Get Operating Manifest',
    description: 'Return the Agile36 MCP capability map, write mode, tools, and data-source status.',
    readOnly: true,
  }, () => createManifest());

  registerTool(
    server,
    'list_courses',
    {
      title: 'List Courses',
      description: 'List Agile36 revenue catalog courses with prices, URLs, schedule URLs, and course flags.',
      readOnly: true,
      inputSchema: {
        category: z.enum(COURSE_CATEGORIES as [CourseCategory, ...CourseCategory[]]).optional(),
        query: z.string().optional(),
        limit: z.number().int().positive().max(50).optional(),
      },
    },
    ({ category, query, limit }) => {
      const normalizedQuery = query ? normalizeSearchText(query) : '';
      const courses = CATALOG_COURSES.filter((course) => !category || course.category === category)
        .filter((course) => {
          if (!normalizedQuery) return true;
          return normalizeSearchText(`${course.title} ${course.skills} ${getCatalogCourseSlug(course)}`).includes(normalizedQuery);
        })
        .slice(0, clampLimit(limit, 50, 50))
        .map(courseToOperatingRecord);
      return { count: courses.length, courses };
    },
  );

  registerTool(
    server,
    'get_course',
    {
      title: 'Get Course',
      description: 'Return one Agile36 course by slug, title, or acronym.',
      readOnly: true,
      inputSchema: {
        slugOrTitle: z.string().describe('Course slug, title, or acronym.'),
      },
    },
    ({ slugOrTitle }) => {
      const course = findCourse(slugOrTitle);
      if (!course) return { found: false, slugOrTitle };
      return { found: true, course: courseToOperatingRecord(course) };
    },
  );

  registerTool(
    server,
    'list_schedules',
    {
      title: 'List Schedules',
      description: 'Read active future course schedules from Supabase.',
      readOnly: true,
      inputSchema: {
        courseSlug: z.string().optional(),
        status: z.string().default('active').optional(),
        daysAhead: z.number().int().positive().max(730).default(180).optional(),
        includeHidden: z.boolean().default(false).optional(),
        limit: z.number().int().positive().max(200).default(30).optional(),
      },
    },
    listSchedules,
  );

  registerTool(
    server,
    'search_site_content',
    {
      title: 'Search Site Content',
      description: 'Search Agile36 MDX/content/data/pages for topics, courses, CTAs, and conversion copy.',
      readOnly: true,
      inputSchema: {
        query: z.string().min(1),
        limit: z.number().int().positive().max(30).default(10).optional(),
        includeCode: z.boolean().default(false).optional(),
      },
    },
    async ({ query, limit, includeCode }) => {
      const files = await getSearchableFiles(Boolean(includeCode));
      const terms = normalizeSearchText(query).split(' ').filter(Boolean);
      const matches: JsonObject[] = [];

      for (const filePath of files) {
        const raw = await readTextFile(filePath, 80000);
        const parsed = path.extname(filePath) === '.mdx' || path.extname(filePath) === '.md' ? matter(raw).content : raw;
        const searchable = stripSourceForSearch(parsed);
        const haystack = normalizeSearchText(searchable);
        const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
        if (score > 0) {
          matches.push({
            file: path.relative(ROOT_DIR, filePath),
            score,
            snippet: buildSnippet(searchable, query),
          });
        }
      }

      matches.sort((a, b) => Number(b.score) - Number(a.score));
      return { query, count: matches.length, matches: matches.slice(0, clampLimit(limit, 10, 30)) };
    },
  );

  registerTool(
    server,
    'get_page_content',
    {
      title: 'Get Page Content',
      description: 'Read the likely source file for a route, course page, blog post, or SEO data entry.',
      readOnly: true,
      inputSchema: {
        route: z.string().min(1),
        maxChars: z.number().int().positive().max(50000).default(20000).optional(),
      },
    },
    async ({ route, maxChars }) => {
      const candidates = routeToCandidates(route);
      const found: JsonObject[] = [];
      for (const candidate of candidates) {
        try {
          const stat = await fs.stat(candidate);
          if (!stat.isFile()) continue;
          found.push({
            file: path.relative(ROOT_DIR, candidate),
            text: await readTextFile(candidate, clampLimit(maxChars, 20000, 50000)),
          });
        } catch {
          // Candidate did not exist.
        }
      }
      return { route, found };
    },
  );

  registerTool(
    server,
    'get_recent_visitors',
    {
      title: 'Get Recent Visitors',
      description: 'Read recent identified website visitors and RB2B-enriched person fields from Supabase.',
      readOnly: true,
      inputSchema: {
        limit: z.number().int().positive().max(200).default(25).optional(),
        company: z.string().optional(),
        pageContains: z.string().optional(),
      },
    },
    getRecentVisitors,
  );

  registerTool(
    server,
    'get_leads',
    {
      title: 'Get Leads',
      description: 'Read enrollment, coupon, assessment, and corporate lead data from Supabase.',
      readOnly: true,
      inputSchema: {
        source: z.enum(['enrollment', 'coupon', 'assessment', 'corporate', 'all']).default('all').optional(),
        limit: z.number().int().positive().max(100).default(25).optional(),
        emailDomain: z.string().optional(),
      },
    },
    getLeads,
  );

  registerTool(
    server,
    'get_company_profile',
    {
      title: 'Get Company Profile',
      description: 'Aggregate recent visitor, person reveal, page, and contact signals for one company.',
      readOnly: true,
      inputSchema: {
        companyName: z.string().min(1),
      },
    },
    ({ companyName }) => getCompanyProfile(companyName),
  );

  registerTool(
    server,
    'score_revenue_intent',
    {
      title: 'Score Revenue Intent',
      description: 'Score visitor/company buying intent using transparent deterministic rules.',
      readOnly: true,
      inputSchema: {
        pages: z.array(z.string()).optional(),
        visitor: z.record(z.string(), z.unknown()).optional(),
        companyProfile: z.record(z.string(), z.unknown()).optional(),
        courseSlug: z.string().optional(),
      },
    },
    scoreRevenueIntent,
  );

  registerTool(
    server,
    'recommend_next_actions',
    {
      title: 'Recommend Next Actions',
      description: 'Recommend staged revenue actions based on free-form context.',
      readOnly: true,
      inputSchema: {
        context: z.string().min(1),
        maxActions: z.number().int().positive().max(10).default(5).optional(),
      },
    },
    ({ context, maxActions }) => recommendNextActions(context, clampLimit(maxActions, 5, 10)),
  );

  registerTool(
    server,
    'draft_followup_email',
    {
      title: 'Draft Follow-Up Email',
      description: 'Draft a sales follow-up without sending it.',
      readOnly: true,
      inputSchema: {
        recipientName: z.string().optional(),
        companyName: z.string().optional(),
        courseSlug: z.string().optional(),
        motion: z.enum(['corporate_training', 'checkout_recovery', 'individual_or_team_enrollment', 'content_research', 'unknown']).optional(),
        notes: z.string().optional(),
        senderName: z.string().optional(),
      },
    },
    draftFollowupEmail,
  );

  registerTool(
    server,
    'draft_page_update',
    {
      title: 'Draft Page Update',
      description: 'Draft conversion-focused page changes without editing files.',
      readOnly: true,
      inputSchema: {
        route: z.string().min(1),
        audience: z.string().optional(),
        goal: z.string().min(1),
        constraints: z.string().optional(),
      },
    },
    draftPageUpdate,
  );

  registerTool(
    server,
    'draft_experiment',
    {
      title: 'Draft Experiment',
      description: 'Draft an A/B or personalization experiment without launching it.',
      readOnly: true,
      inputSchema: {
        route: z.string().min(1),
        hypothesis: z.string().min(1),
        metric: z.string().min(1),
        audience: z.string().optional(),
      },
    },
    draftExperiment,
  );

  registerTool(
    server,
    'log_agent_action',
    {
      title: 'Log Agent Action',
      description: 'Stage or log an AI operator action for review/audit.',
      inputSchema: {
        actionType: z.string().min(1),
        summary: z.string().min(1),
        payload: z.record(z.string(), z.unknown()).optional(),
        riskLevel: z.enum(['low', 'medium', 'high']).default('medium').optional(),
      },
    },
    async ({ actionType, summary, payload, riskLevel }) => {
      const record = { actionType, summary, payload: payload ?? {}, riskLevel: riskLevel ?? 'medium' };
      if (WRITE_MODE !== 'live') {
        return { logged: false, staged: await writeOutbox('agent-action', record) };
      }

      const sb = getSupabase();
      if (!sb) return { logged: false, staged: await writeOutbox('agent-action-no-db', record) };
      const table = process.env.AGILE36_MCP_ACTION_TABLE ?? 'mcp_agent_actions';
      const { data, error } = await sb
        .from(table)
        .insert({
          action_type: actionType,
          summary,
          payload: payload ?? {},
          risk_level: riskLevel ?? 'medium',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) return { logged: false, table, error: redactError(error), staged: await writeOutbox('agent-action-live-failed', record) };
      return { logged: true, table, action: data };
    },
  );

  registerTool(
    server,
    'create_corporate_lead',
    {
      title: 'Create Corporate Lead',
      description: 'Stage or create a corporate sales lead. Defaults to staging unless live mode is enabled.',
      inputSchema: {
        companyName: z.string().min(1),
        contactName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        courseInterest: z.string().optional(),
        seats: z.number().int().positive().optional(),
        timeline: z.string().optional(),
        notes: z.string().optional(),
        dryRun: z.boolean().default(false).optional(),
      },
    },
    async (input) => {
      if (input.dryRun) return { created: false, dryRun: true, input };
      return createCorporateLead(input);
    },
  );

  registerTool(
    server,
    'send_sales_alert',
    {
      title: 'Send Sales Alert',
      description: 'Send a live webhook alert only when enabled; otherwise stage the alert in the outbox.',
      inputSchema: {
        subject: z.string().min(1),
        summary: z.string().min(1),
        payload: z.record(z.string(), z.unknown()).optional(),
      },
    },
    ({ subject, summary, payload }) => postWebhook(subject, summary, payload),
  );

  registerTool(
    server,
    'stage_content_change',
    {
      title: 'Stage Content Change',
      description: 'Save a proposed content/page change to the local MCP outbox for human review.',
      inputSchema: {
        route: z.string().min(1),
        title: z.string().min(1),
        rationale: z.string().min(1),
        patchPlan: z.string().min(1),
        proposedContent: z.string().optional(),
      },
    },
    async (input) => {
      if (!ENABLE_CONTENT_STAGING) return { staged: false, reason: 'AGILE36_MCP_ENABLE_CONTENT_STAGING=false' };
      return writeOutbox('content-change', input);
    },
  );

  registerTool(
    server,
    'create_experiment_draft',
    {
      title: 'Create Experiment Draft',
      description: 'Save an experiment plan to the local MCP outbox for review.',
      inputSchema: {
        route: z.string().min(1),
        hypothesis: z.string().min(1),
        metric: z.string().min(1),
        audience: z.string().optional(),
        variants: z.array(z.record(z.string(), z.unknown())).optional(),
      },
    },
    async (input) => writeOutbox('experiment-draft', input),
  );

  registerTool(
    server,
    'publish_approved_change',
    {
      title: 'Publish Approved Change',
      description: 'Reserved live publishing hook. Disabled unless explicit live publish flag is enabled.',
      inputSchema: {
        approvalId: z.string().min(1),
        route: z.string().min(1),
        summary: z.string().min(1),
      },
    },
    async (input) => {
      if (WRITE_MODE !== 'live' || !ENABLE_LIVE_PUBLISH) {
        return {
          published: false,
          reason: 'Publishing is disabled. Requires AGILE36_MCP_WRITE_MODE=live and AGILE36_MCP_ENABLE_LIVE_PUBLISH=true.',
          input,
        };
      }
      return writeOutbox('approved-publish-request', input);
    },
  );

  return server;
}

export async function runAgile36McpSelfTest(): Promise<void> {
  createAgile36McpServer();
  const course = courseToOperatingRecord(CATALOG_COURSES[0]);
  const scheduleProbe = await listSchedules({ limit: 1, daysAhead: 30 });
  const output = {
    ok: true,
    manifest: createManifest(),
    sampleCourse: course,
    scheduleProbe: {
      configured: scheduleProbe.configured,
      count: scheduleProbe.count ?? 0,
      error: scheduleProbe.error,
    },
  };
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}
