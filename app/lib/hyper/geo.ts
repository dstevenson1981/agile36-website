/** Approximate map placement when an IP lookup has no lat/lng yet. */

export type LatLng = { latitude: number; longitude: number };

const COUNTRY_CENTROIDS: Record<string, LatLng> = {
  US: { latitude: 39.8, longitude: -98.6 },
  CA: { latitude: 56.1, longitude: -106.3 },
  MX: { latitude: 23.6, longitude: -102.5 },
  GB: { latitude: 54.0, longitude: -2.0 },
  UK: { latitude: 54.0, longitude: -2.0 },
  IE: { latitude: 53.1, longitude: -8.2 },
  FR: { latitude: 46.2, longitude: 2.2 },
  DE: { latitude: 51.2, longitude: 10.5 },
  NL: { latitude: 52.1, longitude: 5.3 },
  BE: { latitude: 50.5, longitude: 4.5 },
  ES: { latitude: 40.5, longitude: -3.7 },
  IT: { latitude: 41.9, longitude: 12.6 },
  PT: { latitude: 39.4, longitude: -8.2 },
  CH: { latitude: 46.8, longitude: 8.2 },
  AT: { latitude: 47.5, longitude: 14.6 },
  SE: { latitude: 60.1, longitude: 18.6 },
  NO: { latitude: 60.5, longitude: 8.5 },
  DK: { latitude: 56.3, longitude: 9.5 },
  FI: { latitude: 64.0, longitude: 26.0 },
  PL: { latitude: 51.9, longitude: 19.1 },
  HU: { latitude: 47.2, longitude: 19.5 },
  RO: { latitude: 45.9, longitude: 25.0 },
  UA: { latitude: 48.4, longitude: 31.2 },
  RU: { latitude: 61.5, longitude: 105.3 },
  TR: { latitude: 38.96, longitude: 35.2 },
  AE: { latitude: 23.4, longitude: 53.8 },
  SA: { latitude: 23.9, longitude: 45.1 },
  QA: { latitude: 25.3, longitude: 51.2 },
  BH: { latitude: 26.0, longitude: 50.55 },
  OM: { latitude: 21.5, longitude: 55.9 },
  IL: { latitude: 31.0, longitude: 34.9 },
  EG: { latitude: 26.8, longitude: 30.8 },
  TN: { latitude: 34.0, longitude: 9.5 },
  ZA: { latitude: -30.6, longitude: 22.9 },
  NG: { latitude: 9.1, longitude: 8.7 },
  KE: { latitude: 0.0, longitude: 37.9 },
  IN: { latitude: 20.6, longitude: 79.0 },
  PK: { latitude: 30.4, longitude: 69.3 },
  BD: { latitude: 23.7, longitude: 90.4 },
  LK: { latitude: 7.9, longitude: 80.8 },
  CN: { latitude: 35.9, longitude: 104.2 },
  HK: { latitude: 22.3, longitude: 114.2 },
  TW: { latitude: 23.7, longitude: 121.0 },
  JP: { latitude: 36.2, longitude: 138.3 },
  KR: { latitude: 35.9, longitude: 127.8 },
  SG: { latitude: 1.35, longitude: 103.82 },
  MY: { latitude: 4.2, longitude: 101.98 },
  TH: { latitude: 15.87, longitude: 100.99 },
  VN: { latitude: 14.06, longitude: 108.3 },
  PH: { latitude: 12.9, longitude: 121.8 },
  ID: { latitude: -0.8, longitude: 113.9 },
  AU: { latitude: -25.3, longitude: 133.8 },
  NZ: { latitude: -40.9, longitude: 174.9 },
  BR: { latitude: -14.2, longitude: -51.9 },
  AR: { latitude: -38.4, longitude: -63.6 },
  CL: { latitude: -35.7, longitude: -71.5 },
  CO: { latitude: 4.6, longitude: -74.3 },
  PE: { latitude: -9.2, longitude: -75.0 },
};

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  GB: "United Kingdom",
  UK: "United Kingdom",
  IE: "Ireland",
  FR: "France",
  DE: "Germany",
  NL: "Netherlands",
  BE: "Belgium",
  ES: "Spain",
  IT: "Italy",
  PT: "Portugal",
  CH: "Switzerland",
  AT: "Austria",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  PL: "Poland",
  HU: "Hungary",
  RO: "Romania",
  UA: "Ukraine",
  RU: "Russia",
  TR: "Turkey",
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  QA: "Qatar",
  BH: "Bahrain",
  OM: "Oman",
  IL: "Israel",
  EG: "Egypt",
  TN: "Tunisia",
  ZA: "South Africa",
  NG: "Nigeria",
  KE: "Kenya",
  IN: "India",
  PK: "Pakistan",
  BD: "Bangladesh",
  LK: "Sri Lanka",
  CN: "China",
  HK: "Hong Kong",
  TW: "Taiwan",
  JP: "Japan",
  KR: "South Korea",
  SG: "Singapore",
  MY: "Malaysia",
  TH: "Thailand",
  VN: "Vietnam",
  PH: "Philippines",
  ID: "Indonesia",
  AU: "Australia",
  NZ: "New Zealand",
  BR: "Brazil",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  PE: "Peru",
};

const CITY_COORDS: Record<string, LatLng> = {
  "new york city|us": { latitude: 40.71, longitude: -74.01 },
  "new york|us": { latitude: 40.71, longitude: -74.01 },
  "los angeles|us": { latitude: 34.05, longitude: -118.24 },
  "chicago|us": { latitude: 41.88, longitude: -87.63 },
  "houston|us": { latitude: 29.76, longitude: -95.37 },
  "dallas|us": { latitude: 32.78, longitude: -96.8 },
  "austin|us": { latitude: 30.27, longitude: -97.74 },
  "san francisco|us": { latitude: 37.77, longitude: -122.42 },
  "san jose|us": { latitude: 37.34, longitude: -121.89 },
  "seattle|us": { latitude: 47.61, longitude: -122.33 },
  "denver|us": { latitude: 39.74, longitude: -104.99 },
  "atlanta|us": { latitude: 33.75, longitude: -84.39 },
  "miami|us": { latitude: 25.76, longitude: -80.19 },
  "boston|us": { latitude: 42.36, longitude: -71.06 },
  "washington|us": { latitude: 38.91, longitude: -77.04 },
  "ashburn|us": { latitude: 39.04, longitude: -77.49 },
  "reston|us": { latitude: 38.96, longitude: -77.36 },
  "boardman|us": { latitude: 45.84, longitude: -119.7 },
  "moses lake|us": { latitude: 47.13, longitude: -119.28 },
  "hapeville|us": { latitude: 33.66, longitude: -84.41 },
  "ephrata|us": { latitude: 40.18, longitude: -76.18 },
  "toronto|ca": { latitude: 43.65, longitude: -79.38 },
  "vancouver|ca": { latitude: 49.28, longitude: -123.12 },
  "calgary|ca": { latitude: 51.05, longitude: -114.07 },
  "montreal|ca": { latitude: 45.5, longitude: -73.57 },
  "cornwall|ca": { latitude: 45.03, longitude: -74.73 },
  "london|gb": { latitude: 51.51, longitude: -0.13 },
  "manchester|gb": { latitude: 53.48, longitude: -2.24 },
  "frankfurt am main|de": { latitude: 50.11, longitude: 8.68 },
  "berlin|de": { latitude: 52.52, longitude: 13.4 },
  "amsterdam|nl": { latitude: 52.37, longitude: 4.9 },
  "lelystad|nl": { latitude: 52.51, longitude: 5.48 },
  "paris|fr": { latitude: 48.86, longitude: 2.35 },
  "wissembourg|fr": { latitude: 49.04, longitude: 7.95 },
  "budapest|hu": { latitude: 47.5, longitude: 19.04 },
  "singapore|sg": { latitude: 1.35, longitude: 103.82 },
  "hong kong|hk": { latitude: 22.32, longitude: 114.17 },
  "tokyo|jp": { latitude: 35.68, longitude: 139.69 },
  "baraki|jp": { latitude: 35.7, longitude: 139.8 },
  "sydney|au": { latitude: -33.87, longitude: 151.21 },
  "melbourne|au": { latitude: -37.81, longitude: 144.96 },
  "mumbai|in": { latitude: 19.08, longitude: 72.88 },
  "bengaluru|in": { latitude: 12.97, longitude: 77.59 },
  "chennai|in": { latitude: 13.08, longitude: 80.27 },
  "chengalpattu|in": { latitude: 12.68, longitude: 79.98 },
  "beijing|cn": { latitude: 39.9, longitude: 116.4 },
  "shanghai|cn": { latitude: 31.23, longitude: 121.47 },
  "shenzhen|cn": { latitude: 22.54, longitude: 114.06 },
  "nanjing|cn": { latitude: 32.06, longitude: 118.8 },
  "shenyang|cn": { latitude: 41.8, longitude: 123.43 },
  "nanchang|cn": { latitude: 28.68, longitude: 115.86 },
  "ho chi minh city|vn": { latitude: 10.82, longitude: 106.63 },
  "thu dau mot|vn": { latitude: 10.98, longitude: 106.65 },
  "hanoi|vn": { latitude: 21.03, longitude: 105.85 },
  "mexico city|mx": { latitude: 19.43, longitude: -99.13 },
  "temixco|mx": { latitude: 18.85, longitude: -99.23 },
  "sao paulo|br": { latitude: -23.55, longitude: -46.63 },
  "salvador|br": { latitude: -12.97, longitude: -38.5 },
  "cairo|eg": { latitude: 30.04, longitude: 31.24 },
  "alexandria|eg": { latitude: 31.2, longitude: 29.92 },
  "bangkok|th": { latitude: 13.76, longitude: 100.5 },
  "muscat|om": { latitude: 23.59, longitude: 58.38 },
  "al muharraq|bh": { latitude: 26.26, longitude: 50.61 },
  "kairouan|tn": { latitude: 35.68, longitude: 10.1 },
  "barranquilla|co": { latitude: 10.96, longitude: -74.8 },
  "vina del mar|cl": { latitude: -33.02, longitude: -71.55 },
  "dnipro|ua": { latitude: 48.46, longitude: 35.05 },
};

const STATE_COORDS: Record<string, LatLng> = {
  alabama: { latitude: 32.8, longitude: -86.8 },
  alaska: { latitude: 64.2, longitude: -153.4 },
  arizona: { latitude: 34.0, longitude: -111.9 },
  arkansas: { latitude: 34.9, longitude: -92.4 },
  california: { latitude: 36.8, longitude: -119.4 },
  colorado: { latitude: 39.1, longitude: -105.3 },
  connecticut: { latitude: 41.6, longitude: -72.8 },
  delaware: { latitude: 39.0, longitude: -75.5 },
  florida: { latitude: 27.8, longitude: -81.7 },
  georgia: { latitude: 32.7, longitude: -83.4 },
  hawaii: { latitude: 20.8, longitude: -156.3 },
  idaho: { latitude: 44.2, longitude: -114.5 },
  illinois: { latitude: 40.3, longitude: -89.0 },
  indiana: { latitude: 39.8, longitude: -86.3 },
  iowa: { latitude: 42.0, longitude: -93.2 },
  kansas: { latitude: 38.5, longitude: -98.0 },
  kentucky: { latitude: 37.8, longitude: -84.9 },
  louisiana: { latitude: 31.2, longitude: -91.9 },
  maine: { latitude: 45.3, longitude: -69.2 },
  maryland: { latitude: 39.1, longitude: -76.8 },
  massachusetts: { latitude: 42.2, longitude: -71.5 },
  michigan: { latitude: 43.3, longitude: -84.5 },
  minnesota: { latitude: 46.3, longitude: -94.3 },
  mississippi: { latitude: 32.7, longitude: -89.7 },
  missouri: { latitude: 38.5, longitude: -92.5 },
  montana: { latitude: 47.1, longitude: -109.6 },
  nebraska: { latitude: 41.5, longitude: -99.9 },
  nevada: { latitude: 38.8, longitude: -116.4 },
  "new hampshire": { latitude: 43.5, longitude: -71.6 },
  "new jersey": { latitude: 40.3, longitude: -74.5 },
  "new mexico": { latitude: 34.4, longitude: -106.1 },
  "new york": { latitude: 42.9, longitude: -75.5 },
  "north carolina": { latitude: 35.6, longitude: -79.4 },
  "north dakota": { latitude: 47.5, longitude: -100.3 },
  ohio: { latitude: 40.4, longitude: -82.8 },
  oklahoma: { latitude: 35.6, longitude: -97.5 },
  oregon: { latitude: 43.8, longitude: -120.6 },
  pennsylvania: { latitude: 40.9, longitude: -77.8 },
  "rhode island": { latitude: 41.7, longitude: -71.5 },
  "south carolina": { latitude: 33.9, longitude: -80.9 },
  "south dakota": { latitude: 44.3, longitude: -99.9 },
  tennessee: { latitude: 35.7, longitude: -86.6 },
  texas: { latitude: 31.5, longitude: -99.3 },
  utah: { latitude: 39.3, longitude: -111.7 },
  vermont: { latitude: 44.1, longitude: -72.6 },
  virginia: { latitude: 37.5, longitude: -78.6 },
  washington: { latitude: 47.4, longitude: -120.5 },
  "west virginia": { latitude: 38.6, longitude: -80.6 },
  wisconsin: { latitude: 44.3, longitude: -89.6 },
  wyoming: { latitude: 43.1, longitude: -107.6 },
};

function norm(value: string | null | undefined): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function countryCode(country: string | null | undefined): string | null {
  if (!country) return null;
  const raw = country.trim();
  if (/^[A-Za-z]{2}$/.test(raw)) return raw.toUpperCase() === "UK" ? "GB" : raw.toUpperCase();
  const hit = Object.entries(COUNTRY_NAMES).find(([, name]) => name.toLowerCase() === raw.toLowerCase());
  return hit ? (hit[0] === "UK" ? "GB" : hit[0]) : null;
}

export function countryFlag(country: string | null | undefined): string {
  const code = countryCode(country);
  if (!code) return "";
  return String.fromCodePoint(...[...code].map((char) => 127397 + char.charCodeAt(0)));
}

export function countryLabel(country: string | null | undefined): string {
  const code = countryCode(country);
  if (code && COUNTRY_NAMES[code]) return COUNTRY_NAMES[code];
  return country?.trim() || "";
}

export function fallbackCoords(input: {
  city?: string | null;
  region?: string | null;
  country?: string | null;
}): LatLng | null {
  const code = countryCode(input.country);
  const city = norm(input.city);
  if (city && code) {
    const exact = CITY_COORDS[`${city}|${code.toLowerCase()}`];
    if (exact) return exact;
  }
  if (city) {
    const loose = Object.entries(CITY_COORDS).find(([key]) => key.startsWith(`${city}|`));
    if (loose) return loose[1];
  }
  const region = norm(input.region);
  if (region && STATE_COORDS[region]) return STATE_COORDS[region];
  if (code && COUNTRY_CENTROIDS[code]) return COUNTRY_CENTROIDS[code];
  return null;
}

export function projectEquirectangular(latitude: number, longitude: number): { x: number; y: number } {
  return {
    x: ((longitude + 180) / 360) * 100,
    y: ((90 - latitude) / 180) * 100,
  };
}

export function jitter(seed: string, coords: LatLng): LatLng {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  const dx = ((hash % 17) - 8) * 0.08;
  const dy = (((hash >> 5) % 17) - 8) * 0.05;
  return { latitude: coords.latitude + dy, longitude: coords.longitude + dx };
}
