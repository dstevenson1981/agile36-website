/**
 * IP -> company identification with consumer-ISP/cloud filtering.
 * Uses ipinfo.io when IPINFO_TOKEN is set, else ip-api.com (free tier).
 * Results are cached in Supabase (hyper_ip_cache) for 7 days.
 */
import { cacheIpResult, getCachedIpResult } from './db';

export interface IpIdentity {
  ip: string;
  companyName: string | null;
  domain: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  asn: string | null;
  isBusiness: boolean;
  source: 'ipinfo' | 'ip-api' | 'none';
}

// Consumer ISPs, mobile carriers, and hosting providers — traffic from these
// networks can't be attributed to a company.
const NON_BUSINESS_PATTERNS: RegExp[] = [
  /\b(comcast|xfinity|verizon|at&t|att-|t-mobile|sprint|spectrum|charter|cox communications|centurylink|lumen|frontier|windstream|optimum|altice|mediacom|wow!|earthlink)\b/i,
  /\b(vodafone|orange|telefonica|telecom italia|deutsche telekom|bt group|british telecom|sky broadband|virgin media|telstra|optus|rogers|bell canada|shaw|telus|videotron|swisscom|kpn|proximus|telenor|telia|claro|america movil|airtel|jio|mtn)\b/i,
  /\b(broadband|cable ?vision|cellular|wireless|mobile network|telecommunications|telecom|telekom|internet service|isp\b)/i,
  /\b(amazon(\.com)? inc|amazon technologies|amazon data services|aws|google llc|google cloud|google fiber|microsoft azure|azure|digitalocean|linode|akamai|ovh|hetzner|vultr|cloudflare|fastly|oracle cloud|alibaba cloud|tencent cloud|leaseweb|contabo|render|fly\.io|vercel|netlify|heroku)\b/i,
  /\b(vpn|proxy|tor exit|hosting|host(ed|ing)? services|datacenter|data center|colocation|colo\b|dedicated servers|cdn)\b/i,
];

export function looksLikeBusiness(org: string | null | undefined): boolean {
  if (!org) return false;
  return !NON_BUSINESS_PATTERNS.some((re) => re.test(org));
}

export function parseAsnOrg(org: string): { asn: string | null; name: string } {
  const m = org.match(/^(AS\d+)\s+(.*)$/);
  if (m) return { asn: m[1], name: m[2].trim() };
  return { asn: null, name: org.trim() };
}

function isPrivateIp(ip: string): boolean {
  return (
    /^(10\.|127\.|192\.168\.|169\.254\.|::1|fc|fd)/.test(ip) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip === 'localhost'
  );
}

async function lookupIpinfo(ip: string, token: string): Promise<IpIdentity | null> {
  const res = await fetch(`https://ipinfo.io/${ip}?token=${token}`, {
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    org?: string;
    city?: string;
    region?: string;
    country?: string;
    company?: { name?: string; domain?: string; type?: string };
    privacy?: { vpn?: boolean; proxy?: boolean; hosting?: boolean };
  };
  const company = data.company;
  const parsed = data.org ? parseAsnOrg(data.org) : { asn: null, name: '' };
  const name = company?.name ?? (parsed.name || null);
  const flaggedNonBusiness =
    company?.type === 'isp' ||
    company?.type === 'hosting' ||
    data.privacy?.vpn === true ||
    data.privacy?.proxy === true ||
    data.privacy?.hosting === true;
  return {
    ip,
    companyName: name,
    domain: company?.domain ?? null,
    city: data.city ?? null,
    region: data.region ?? null,
    country: data.country ?? null,
    asn: parsed.asn,
    isBusiness: !flaggedNonBusiness && looksLikeBusiness(name),
    source: 'ipinfo',
  };
}

async function lookupIpApi(ip: string): Promise<IpIdentity | null> {
  // Free for non-commercial use, 45 req/min. Set IPINFO_TOKEN for production.
  const res = await fetch(
    `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org,as,asname,proxy,hosting`,
    { signal: AbortSignal.timeout(4000) }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status: string;
    country?: string;
    regionName?: string;
    city?: string;
    isp?: string;
    org?: string;
    as?: string;
    proxy?: boolean;
    hosting?: boolean;
  };
  if (data.status !== 'success') return null;
  const name = data.org || data.isp || null;
  const asn = data.as ? data.as.split(' ')[0] : null;
  const flaggedNonBusiness = data.proxy === true || data.hosting === true;
  return {
    ip,
    companyName: name,
    domain: null,
    city: data.city ?? null,
    region: data.regionName ?? null,
    country: data.country ?? null,
    asn,
    isBusiness: !flaggedNonBusiness && looksLikeBusiness(name),
    source: 'ip-api',
  };
}

export async function identifyIp(ip: string): Promise<IpIdentity> {
  const none: IpIdentity = {
    ip,
    companyName: null,
    domain: null,
    city: null,
    region: null,
    country: null,
    asn: null,
    isBusiness: false,
    source: 'none',
  };
  if (!ip || isPrivateIp(ip)) return none;

  const cached = (await getCachedIpResult(ip)) as IpIdentity | null;
  if (cached) return cached;

  let identity: IpIdentity | null = null;
  try {
    const token = process.env.IPINFO_TOKEN;
    identity = token ? await lookupIpinfo(ip, token) : await lookupIpApi(ip);
  } catch (err) {
    console.error(`[hyper] IP lookup failed for ${ip}:`, err);
  }
  if (identity) await cacheIpResult(ip, identity);
  return identity ?? none;
}
