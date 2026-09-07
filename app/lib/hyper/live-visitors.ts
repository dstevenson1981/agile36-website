import {
  countryCode,
  countryFlag,
  countryLabel,
  fallbackCoords,
  jitter,
  projectEquirectangular,
} from "./geo";

export const LIVE_MS = 10 * 60 * 1000;
export const ACTIVE_MS = 3 * 60 * 1000;

export type VisitRow = {
  id: number;
  visited_at: string;
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  page: string | null;
  page_title: string | null;
  company: string | null;
  person_name: string | null;
  email: string | null;
  session_id: string | null;
  visitor_id: string | null;
  referrer: string | null;
};

export type LiveVisitor = {
  id: string;
  label: string;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  flag: string;
  place: string;
  latitude: number | null;
  longitude: number | null;
  x: number | null;
  y: number | null;
  page: string | null;
  pageTitle: string | null;
  company: string | null;
  personName: string | null;
  email: string | null;
  lastSeen: string;
  live: boolean;
  active: boolean;
  pages: { path: string | null; title: string | null; at: string }[];
};

function sessionKey(row: VisitRow): string {
  return row.session_id || row.visitor_id || `row-${row.id}`;
}

function visitorLabel(row: VisitRow): string {
  if (row.person_name?.trim()) return row.person_name.trim();
  const raw = (row.visitor_id || row.session_id || String(row.id)).replace(/[^a-zA-Z0-9]/g, "");
  return `visitor${raw.slice(-5) || row.id}`;
}

function placeLabel(row: VisitRow): string {
  if (row.city && row.region) return `${row.city}, ${row.region}`;
  if (row.city) return row.city;
  if (row.region) return row.region;
  return countryLabel(row.country) || "Unknown location";
}

export function groupLiveVisitors(rows: VisitRow[], now = Date.now()): LiveVisitor[] {
  const groups = new Map<string, VisitRow[]>();
  for (const row of rows) {
    const key = sessionKey(row);
    const list = groups.get(key) ?? [];
    list.push(row);
    groups.set(key, list);
  }

  const visitors: LiveVisitor[] = [];
  for (const [id, list] of groups) {
    list.sort((a, b) => +new Date(b.visited_at) - +new Date(a.visited_at));
    const latest = list[0];
    const age = now - +new Date(latest.visited_at);
    const raw =
      typeof latest.latitude === "number" && typeof latest.longitude === "number"
        ? { latitude: latest.latitude, longitude: latest.longitude }
        : fallbackCoords(latest);
    const placed = raw ? jitter(id, raw) : null;
    const projected = placed ? projectEquirectangular(placed.latitude, placed.longitude) : null;
    const seen = new Set<string>();
    const pages: LiveVisitor["pages"] = [];
    for (const row of list) {
      const path = row.page || "/";
      if (seen.has(path)) continue;
      seen.add(path);
      pages.push({ path, title: row.page_title, at: row.visited_at });
    }

    visitors.push({
      id,
      label: visitorLabel(latest),
      city: latest.city,
      region: latest.region,
      country: latest.country,
      countryCode: countryCode(latest.country),
      flag: countryFlag(latest.country),
      place: placeLabel(latest),
      latitude: placed?.latitude ?? null,
      longitude: placed?.longitude ?? null,
      x: projected?.x ?? null,
      y: projected?.y ?? null,
      page: latest.page,
      pageTitle: latest.page_title,
      company: latest.company,
      personName: latest.person_name,
      email: latest.email,
      lastSeen: latest.visited_at,
      live: age <= LIVE_MS,
      active: age <= ACTIVE_MS,
      pages,
    });
  }

  visitors.sort((a, b) => +new Date(b.lastSeen) - +new Date(a.lastSeen));
  return visitors;
}
