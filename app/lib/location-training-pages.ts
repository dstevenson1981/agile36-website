import type { LocationSegment } from "@/app/lib/location-training-metadata";

/** Historical city set used for sitemap / geo landings before the prune. */
export const LOCATION_TRAINING_CITIES = [
  "new-york",
  "los-angeles",
  "chicago",
  "houston",
  "phoenix",
  "philadelphia",
  "san-antonio",
  "san-diego",
  "dallas",
  "san-jose",
  "austin",
  "jacksonville",
  "fort-worth",
  "columbus",
  "charlotte",
  "san-francisco",
  "indianapolis",
  "seattle",
  "denver",
  "washington",
  "boston",
  "nashville",
  "oklahoma-city",
  "las-vegas",
  "portland",
  "miami",
  "tampa",
  "orlando",
  "raleigh",
  "baltimore",
] as const;

export type LocationTrainingCity = (typeof LOCATION_TRAINING_CITIES)[number];

export const LOCATION_SEGMENT_PARENT: Record<LocationSegment, string> = {
  "leading-safe-certification-training": "/courses/leading-safe",
  "scrum-master-certification-training": "/courses/scrum-master",
  "release-train-engineer-certification-training":
    "/courses/release-train-engineer",
  "safe-for-teams-certification-training": "/courses/safe-for-teams",
  "lean-portfolio-management-certification-training":
    "/courses/lean-portfolio-management",
  "safe-product-owner-product-manager-certification-training":
    "/courses/product-owner-manager",
  "agile-product-management-certification-training":
    "/courses/agile-product-management",
};

/** Only these course×city landings remain indexed / statically generated. */
export const KEPT_LOCATION_PAGES: ReadonlyArray<{
  segment: LocationSegment;
  city: LocationTrainingCity;
}> = [
  { segment: "leading-safe-certification-training", city: "new-york" },
  { segment: "safe-product-owner-product-manager-certification-training", city: "phoenix" },
  { segment: "safe-product-owner-product-manager-certification-training", city: "houston" },
  { segment: "lean-portfolio-management-certification-training", city: "chicago" },
  { segment: "lean-portfolio-management-certification-training", city: "orlando" },
  { segment: "safe-for-teams-certification-training", city: "indianapolis" },
  { segment: "safe-for-teams-certification-training", city: "raleigh" },
  { segment: "leading-safe-certification-training", city: "raleigh" },
  { segment: "leading-safe-certification-training", city: "boston" },
  { segment: "scrum-master-certification-training", city: "austin" },
  { segment: "scrum-master-certification-training", city: "dallas" },
];

const KEEP_KEY = new Set(
  KEPT_LOCATION_PAGES.map(({ segment, city }) => `${segment}/${city}`)
);

export const LOCATION_SEGMENTS = Object.keys(
  LOCATION_SEGMENT_PARENT
) as LocationSegment[];

export function isKeptLocationPage(segment: string, city: string): boolean {
  return KEEP_KEY.has(`${segment}/${city}`);
}

export function generateLocationStaticParams(
  segment: LocationSegment
): { city: string }[] {
  return KEPT_LOCATION_PAGES.filter((p) => p.segment === segment).map(
    ({ city }) => ({ city })
  );
}

/**
 * Permanent redirects for city URLs that are not kept.
 * Segments with zero keeps use a single `/:city` rule.
 * Segments with keeps list every non-kept historical city explicitly —
 * a catch-all would also match kept cities (redirects run before pages).
 */
export function locationTrainingRedirects(): Array<{
  source: string;
  destination: string;
  permanent: true;
}> {
  const redirects: Array<{
    source: string;
    destination: string;
    permanent: true;
  }> = [];

  for (const segment of LOCATION_SEGMENTS) {
    const parent = LOCATION_SEGMENT_PARENT[segment];
    const keptCities = new Set(
      KEPT_LOCATION_PAGES.filter((p) => p.segment === segment).map((p) => p.city)
    );

    if (keptCities.size === 0) {
      redirects.push({
        source: `/${segment}/:city`,
        destination: parent,
        permanent: true,
      });
      continue;
    }

    for (const city of LOCATION_TRAINING_CITIES) {
      if (keptCities.has(city)) continue;
      redirects.push({
        source: `/${segment}/${city}`,
        destination: parent,
        permanent: true,
      });
    }
  }

  return redirects;
}

/** Parent course hub for a location segment, or null if not a geo segment. */
export function parentCourseForLocationPath(
  pathname: string
): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  const [segment, city] = parts;
  const parent =
    LOCATION_SEGMENT_PARENT[segment as LocationSegment] ?? null;
  if (!parent) return null;
  if (isKeptLocationPage(segment, city)) return null;
  return parent;
}