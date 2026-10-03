import crypto from "crypto";

const GA4_PROPERTY_ID = "392873766";
const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const CLARITY_URL = "https://www.clarity.ms/export-data/api/v1/project-live-insights";
const CACHE_MS = 6 * 60 * 60 * 1000;

const AI_SOURCES = [
  "chatgpt",
  "openai",
  "perplexity",
  "claude",
  "anthropic",
  "gemini",
  "bard",
  "copilot",
  "deepseek",
  "grok",
  "you.com",
  "phind",
  "meta.ai",
  "poe.com",
];

const SOCIAL_SOURCES = [
  "linkedin",
  "facebook",
  "fb.com",
  "instagram",
  "twitter",
  "t.co",
  "x.com",
  "tiktok",
  "youtube",
  "pinterest",
  "reddit",
  "threads",
];

export type CountRow = { name: string; sessions: number };
export type SourceRow = { source: string; medium: string; sessions: number };

export type InsightsSnapshot = {
  generatedAt: string;
  google: {
    connected: boolean;
    setup: string | null;
    error: string | null;
    rangeLabel: string;
    sessions: number | null;
    users: number | null;
    views: number | null;
    channels: CountRow[];
    ai: SourceRow[];
    social: SourceRow[];
    pages: CountRow[];
    countries: CountRow[];
    devices: CountRow[];
  };
  clarity: {
    connected: boolean;
    setup: string | null;
    error: string | null;
    rangeLabel: string;
    sessions: number | null;
    users: number | null;
    botSessions: number | null;
    deadClicks: number | null;
    rageClicks: number | null;
    sources: CountRow[];
    pages: CountRow[];
  };
};

type CacheEntry = { at: number; value: InsightsSnapshot };
const cache = new Map<string, CacheEntry>();

function emptyGoogle(setup: string | null, error: string | null): InsightsSnapshot["google"] {
  return {
    connected: false,
    setup,
    error,
    rangeLabel: "Last 28 days",
    sessions: null,
    users: null,
    views: null,
    channels: [],
    ai: [],
    social: [],
    pages: [],
    countries: [],
    devices: [],
  };
}

function emptyClarity(setup: string | null, error: string | null): InsightsSnapshot["clarity"] {
  return {
    connected: false,
    setup,
    error,
    rangeLabel: "Last 3 days",
    sessions: null,
    users: null,
    botSessions: null,
    deadClicks: null,
    rageClicks: null,
    sources: [],
    pages: [],
  };
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function matchesHost(value: string, needles: string[]): boolean {
  const haystack = value.toLowerCase();
  return needles.some((needle) => haystack.includes(needle));
}

type ServiceAccount = { client_email: string; private_key: string };

function readServiceAccount(): ServiceAccount | null {
  const raw = process.env.GA4_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { client_email?: string; private_key?: string };
    if (!parsed.client_email || !parsed.private_key) return null;
    return {
      client_email: parsed.client_email,
      private_key: parsed.private_key.replace(/\\n/g, "\n"),
    };
  } catch {
    return null;
  }
}

function base64url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function googleAccessToken(account: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: account.client_email,
      scope: GA_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  signer.end();
  const signature = signer.sign(account.private_key).toString("base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${signature}`,
    }),
  });
  const body = (await response.json()) as { access_token?: string; error?: string };
  if (!response.ok || !body.access_token) {
    throw new Error(body.error || "Google Analytics refused the service account.");
  }
  return body.access_token;
}

type GaReport = {
  rows?: { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] }[];
};

function metricAt(row: NonNullable<GaReport["rows"]>[number], index: number): number {
  return asNumber(row.metricValues?.[index]?.value);
}

function dimAt(row: NonNullable<GaReport["rows"]>[number], index: number): string {
  return row.dimensionValues?.[index]?.value || "(not set)";
}

async function loadGoogle(): Promise<InsightsSnapshot["google"]> {
  const account = readServiceAccount();
  if (!account) {
    return emptyGoogle(
      "Google Analytics is already collecting visits. To show them here, add a service account as a Viewer on the www.agile36.com GA4 property, then set GA4_SERVICE_ACCOUNT_JSON in Vercel.",
      null
    );
  }

  const token = await googleAccessToken(account);
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:batchRunReports`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
            metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
          },
          {
            dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
            dimensions: [{ name: "sessionDefaultChannelGroup" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 12,
          },
          {
            dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
            dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 50,
          },
          {
            dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
            dimensions: [{ name: "landingPagePlusQueryString" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 10,
          },
          {
            dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
            dimensions: [{ name: "country" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 8,
          },
          {
            dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
            dimensions: [{ name: "deviceCategory" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 6,
          },
        ],
      }),
    }
  );

  const body = (await response.json()) as { reports?: GaReport[]; error?: { message?: string } };
  if (!response.ok) {
    throw new Error(body.error?.message || "Google Analytics data request failed.");
  }

  const reports = body.reports || [];
  const totals = reports[0]?.rows?.[0];
  const sources = (reports[2]?.rows || []).map((row) => ({
    source: dimAt(row, 0),
    medium: dimAt(row, 1),
    sessions: metricAt(row, 0),
  }));

  return {
    connected: true,
    setup: null,
    error: null,
    rangeLabel: "Last 28 days",
    sessions: totals ? metricAt(totals, 0) : null,
    users: totals ? metricAt(totals, 1) : null,
    views: totals ? metricAt(totals, 2) : null,
    channels: (reports[1]?.rows || []).map((row) => ({
      name: dimAt(row, 0),
      sessions: metricAt(row, 0),
    })),
    ai: sources.filter((row) => matchesHost(`${row.source} ${row.medium}`, AI_SOURCES)),
    social: sources.filter(
      (row) =>
        !matchesHost(`${row.source} ${row.medium}`, AI_SOURCES) &&
        matchesHost(`${row.source} ${row.medium}`, SOCIAL_SOURCES)
    ),
    pages: (reports[3]?.rows || []).map((row) => ({
      name: dimAt(row, 0),
      sessions: metricAt(row, 0),
    })),
    countries: (reports[4]?.rows || []).map((row) => ({
      name: dimAt(row, 0),
      sessions: metricAt(row, 0),
    })),
    devices: (reports[5]?.rows || []).map((row) => ({
      name: dimAt(row, 0),
      sessions: metricAt(row, 0),
    })),
  };
}

type ClarityBlock = {
  metricName?: string;
  information?: Record<string, unknown>[];
};

function sumField(rows: Record<string, unknown>[], names: string[]): number | null {
  let total = 0;
  let found = false;
  for (const row of rows) {
    for (const name of names) {
      if (row[name] != null && row[name] !== "") {
        total += asNumber(row[name]);
        found = true;
        break;
      }
    }
  }
  return found ? total : null;
}

function dimensionRows(rows: Record<string, unknown>[], dimensions: string[]): CountRow[] {
  return rows
    .map((row) => ({
      name: String(
        dimensions.map((dimension) => row[dimension]).find((value) => value != null && String(value).trim()) ||
          "Unknown"
      ),
      sessions: asNumber(
        row.totalSessionCount ?? row.sessionsCount ?? row.Sessions ?? row.subTotal ?? 0
      ),
    }))
    .filter((row) => row.sessions > 0)
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 10);
}

async function clarityRequest(token: string, dimension: string): Promise<ClarityBlock[]> {
  const url = new URL(CLARITY_URL);
  url.searchParams.set("numOfDays", "3");
  url.searchParams.set("dimension1", dimension);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(
      response.status === 429
        ? "Clarity allows 10 data pulls a day. This view will refresh from the saved copy."
        : `Clarity returned ${response.status}.`
    );
  }
  const body = (await response.json()) as ClarityBlock[] | { message?: string };
  if (!Array.isArray(body)) {
    throw new Error(body.message || "Clarity returned an unexpected response.");
  }
  return body;
}

function block(blocks: ClarityBlock[], name: string): Record<string, unknown>[] {
  const match = blocks.find((item) => (item.metricName || "").toLowerCase().includes(name.toLowerCase()));
  return match?.information || [];
}

async function loadClarity(): Promise<InsightsSnapshot["clarity"]> {
  const token = process.env.CLARITY_API_TOKEN?.trim();
  if (!token) {
    return emptyClarity(
      "Clarity is already recording sessions. To show the numbers here, open the Clarity project, go to Settings, then Data Export, generate an API token, and set CLARITY_API_TOKEN in Vercel.",
      null
    );
  }

  const [bySource, byUrl] = await Promise.all([
    clarityRequest(token, "Source"),
    clarityRequest(token, "URL"),
  ]);
  const traffic = block(bySource, "traffic");
  const pages = block(byUrl, "popular") ;
  const pageRows = pages.length > 0 ? pages : block(byUrl, "traffic");

  return {
    connected: true,
    setup: null,
    error: null,
    rangeLabel: "Last 3 days",
    sessions: sumField(traffic, ["totalSessionCount"]),
    users: sumField(traffic, ["distantUserCount", "distinctUserCount"]),
    botSessions: sumField(traffic, ["totalBotSessionCount"]),
    deadClicks: sumField(block(bySource, "dead"), ["subTotal", "sessionsCount", "count"]),
    rageClicks: sumField(block(bySource, "rage"), ["subTotal", "sessionsCount", "count"]),
    sources: dimensionRows(traffic, ["Source"]),
    pages: dimensionRows(pageRows, ["Url", "URL"]),
  };
}

export async function loadInsights(): Promise<InsightsSnapshot> {
  const cached = cache.get("insights");
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.value;

  const [google, clarity] = await Promise.all([
    loadGoogle().catch((error: unknown) =>
      emptyGoogle(null, error instanceof Error ? error.message : "Google Analytics could not be read.")
    ),
    loadClarity().catch((error: unknown) =>
      emptyClarity(null, error instanceof Error ? error.message : "Clarity could not be read.")
    ),
  ]);

  const snapshot: InsightsSnapshot = {
    generatedAt: new Date().toISOString(),
    google,
    clarity,
  };
  if (google.connected || clarity.connected) {
    cache.set("insights", { at: Date.now(), value: snapshot });
  }
  return snapshot;
}
