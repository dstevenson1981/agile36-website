export interface ComboCourse {
  id: string;
  name: string;
  slug: string;
  badge: string;
  price: number;
}

export interface Combo {
  id: string;
  name: string;
  courses: ComboCourse[];
  comboPrice: number;
  originalPrice: number;
  discount: number;
  enrolled?: string;
}

export const BADGES: Record<string, string> = {
  "leading-safe": "/Leading SAFe.png",
  "scrum-master": "/SSM.jpeg",
  "product-owner-manager": "/POPM.jpg",
  "safe-for-teams": "/SAFe for Teams.png",
  "devops": "/Devops.png",
  "lean-portfolio-management": "/Lean Portfolio.png",
  "agile-product-management": "/AgileProductManagment.png",
  "advanced-scrum-master": "/AdvancedSM.png",
  "release-train-engineer": "/RTE.png",
  "value-stream-mapping": "/MicroCredential.jpeg",
  "responsible-ai": "/MicroCredential.jpeg",
  "ai-driven-scrum-master": "/GenAI_2.png",
  "certified-genai-practitioner": "/GenAI_2.png",
  "certified-ai-product-manager": "/PMAI.jpeg",
  "executive-genai-leadership": "/GenAI_2.png",
  "generative-ai-project-managers": "/GenAI_2.png",
};

type CatalogEntry = {
  slug: string;
  name: string;
  shortName: string;
  price: number;
  original: number;
};

/** Courses eligible for two-course combo pairings (SAFe + AI). */
const CATALOG: CatalogEntry[] = [
  { slug: "leading-safe", name: "AI-Empowered Leading SAFe (SA)", shortName: "Leading SAFe", price: 515, original: 1030 },
  { slug: "scrum-master", name: "AI-Empowered SAFe Scrum Master (SSM)", shortName: "SSM", price: 515, original: 1030 },
  { slug: "product-owner-manager", name: "AI-Empowered SAFe POPM", shortName: "POPM", price: 515, original: 1030 },
  { slug: "safe-for-teams", name: "AI-Empowered SAFe for Teams (SP)", shortName: "SAFe for Teams", price: 599, original: 1030 },
  { slug: "advanced-scrum-master", name: "AI-Empowered SAFe Advanced Scrum Master (SASM)", shortName: "SASM", price: 599, original: 1198 },
  { slug: "devops", name: "SAFe DevOps", shortName: "DevOps", price: 599, original: 1398 },
  { slug: "lean-portfolio-management", name: "SAFe Lean Portfolio Management", shortName: "LPM", price: 950, original: 1900 },
  { slug: "agile-product-management", name: "SAFe Agile Product Management", shortName: "APM", price: 1299, original: 2598 },
  { slug: "release-train-engineer", name: "AI-Empowered SAFe Release Train Engineer (RTE)", shortName: "RTE", price: 1299, original: 1699 },
  { slug: "ai-driven-scrum-master", name: "AI-Driven Scrum Master™", shortName: "AI Scrum Master", price: 555, original: 1110 },
  { slug: "certified-genai-practitioner", name: "Certified GenAI Practitioner™", shortName: "GenAI Practitioner", price: 299, original: 598 },
  { slug: "certified-ai-product-manager", name: "Certified AI Product Manager", shortName: "AI Product Manager", price: 400, original: 800 },
  { slug: "executive-genai-leadership", name: "Executive GenAI Leadership", shortName: "Exec GenAI", price: 400, original: 800 },
  { slug: "generative-ai-project-managers", name: "Generative AI for Project Managers", shortName: "GenAI for PMs", price: 400, original: 800 },
];

const BY_SLUG = Object.fromEntries(CATALOG.map((c) => [c.slug, c])) as Record<string, CatalogEntry>;

/** Keep legacy URL/order IDs for existing combos. */
const LEGACY_IDS: Record<string, string> = {
  "leading-safe|scrum-master": "leading-safe-ssm",
  "leading-safe|product-owner-manager": "leading-safe-popm",
  "scrum-master|product-owner-manager": "ssm-popm",
  "leading-safe|safe-for-teams": "leading-safe-teams",
  "leading-safe|lean-portfolio-management": "leading-safe-lpm",
  "scrum-master|safe-for-teams": "ssm-teams",
  "product-owner-manager|safe-for-teams": "popm-teams",
  "scrum-master|advanced-scrum-master": "ssm-advanced",
  "advanced-scrum-master|product-owner-manager": "sasm-popm",
  "scrum-master|release-train-engineer": "ssm-rte",
  "lean-portfolio-management|agile-product-management": "lpm-apm",
  "ai-driven-scrum-master|certified-genai-practitioner": "ai-scrum-genai",
  "ai-driven-scrum-master|certified-ai-product-manager": "ai-scrum-ai-product",
  "certified-genai-practitioner|certified-ai-product-manager": "genai-ai-product",
  "scrum-master|ai-driven-scrum-master": "ssm-ai-scrum",
  "product-owner-manager|certified-ai-product-manager": "popm-ai-product",
};

function pairKey(a: string, b: string): string {
  return [a, b].sort().join("|");
}

function shortId(slug: string): string {
  const map: Record<string, string> = {
    "leading-safe": "sa",
    "scrum-master": "ssm",
    "product-owner-manager": "popm",
    "safe-for-teams": "teams",
    "advanced-scrum-master": "sasm",
    "devops": "devops",
    "lean-portfolio-management": "lpm",
    "agile-product-management": "apm",
    "release-train-engineer": "rte",
    "ai-driven-scrum-master": "ai-scrum",
    "certified-genai-practitioner": "genai",
    "certified-ai-product-manager": "ai-pm",
    "executive-genai-leadership": "exec-genai",
    "generative-ai-project-managers": "genai-pm",
  };
  return map[slug] ?? slug;
}

function priceForPair(a: CatalogEntry, b: CatalogEntry): { comboPrice: number; originalPrice: number; discount: number } {
  const max = Math.max(a.price, b.price);
  const min = Math.min(a.price, b.price);
  const originalPrice = a.original + b.original;

  let comboPrice: number;
  if (max <= 400) {
    comboPrice = 499;
  } else if (max <= 555) {
    comboPrice = 699;
  } else if (max <= 599) {
    comboPrice = 799;
  } else if (max <= 950 && min <= 599) {
    // LPM / mid + foundation
    comboPrice = 1350;
  } else if (max >= 1299 && min >= 950) {
    // LPM+APM, LPM+RTE, APM+RTE
    comboPrice = 1700;
  } else if (max >= 1299 && min <= 599) {
    // APM/RTE + foundation
    comboPrice = 1350;
  } else if (max >= 950) {
    comboPrice = 1450;
  } else {
    comboPrice = 799;
  }

  // Known overrides matching historical catalog prices
  const key = pairKey(a.slug, b.slug);
  const overrides: Record<string, number> = {
    "leading-safe|scrum-master": 799,
    "lean-portfolio-management|agile-product-management": 1700,
    "leading-safe|lean-portfolio-management": 1350,
    "scrum-master|release-train-engineer": 1350,
    "ai-driven-scrum-master|certified-genai-practitioner": 399,
    "ai-driven-scrum-master|certified-ai-product-manager": 549,
    "certified-genai-practitioner|certified-ai-product-manager": 499,
    "scrum-master|ai-driven-scrum-master": 699,
    "product-owner-manager|certified-ai-product-manager": 799,
    "scrum-master|safe-for-teams": 850,
  };
  if (overrides[key] != null) comboPrice = overrides[key];

  return {
    comboPrice,
    originalPrice,
    discount: originalPrice - comboPrice,
  };
}

function buildCombo(aSlug: string, bSlug: string): Combo {
  const first = BY_SLUG[aSlug];
  const second = BY_SLUG[bSlug];
  if (!first || !second) throw new Error(`Unknown combo course: ${aSlug} / ${bSlug}`);

  // Display order follows catalog rank
  const [a, b] =
    PAIR_ORDER.indexOf(aSlug) <= PAIR_ORDER.indexOf(bSlug) ? [first, second] : [second, first];

  const key = pairKey(a.slug, b.slug);
  const id = LEGACY_IDS[key] ?? `${shortId(a.slug)}-${shortId(b.slug)}`;
  const pricing = priceForPair(a, b);

  return {
    id,
    name: `${a.shortName} & ${b.shortName} Certification Training`,
    courses: [
      { id: "1", name: a.name, slug: a.slug, badge: BADGES[a.slug], price: a.price },
      { id: "2", name: b.name, slug: b.slug, badge: BADGES[b.slug], price: b.price },
    ],
    ...pricing,
    enrolled: "52k",
  };
}

/** Prefer this display order when listing pairs. */
const PAIR_ORDER = CATALOG.map((c) => c.slug);

function allTwoCoursePairs(slugs: string[]): [string, string][] {
  const pairs: [string, string][] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push([slugs[i], slugs[j]]);
    }
  }
  return pairs;
}

const SAFE_SLUGS = [
  "leading-safe",
  "scrum-master",
  "product-owner-manager",
  "safe-for-teams",
  "advanced-scrum-master",
  "devops",
  "lean-portfolio-management",
  "agile-product-management",
  "release-train-engineer",
];

const AI_SLUGS = [
  "ai-driven-scrum-master",
  "certified-genai-practitioner",
  "certified-ai-product-manager",
  "executive-genai-leadership",
  "generative-ai-project-managers",
];

/** Cross-pair popular SAFe roles with each AI course. */
const CROSS_SAFE = [
  "leading-safe",
  "scrum-master",
  "product-owner-manager",
  "advanced-scrum-master",
  "lean-portfolio-management",
  "agile-product-management",
];

function buildAllCombos(): Combo[] {
  const seen = new Set<string>();
  const combos: Combo[] = [];

  const add = (a: string, b: string) => {
    const key = pairKey(a, b);
    if (seen.has(key)) return;
    seen.add(key);
    combos.push(buildCombo(a, b));
  };

  for (const [a, b] of allTwoCoursePairs(SAFE_SLUGS)) add(a, b);
  for (const [a, b] of allTwoCoursePairs(AI_SLUGS)) add(a, b);
  for (const safe of CROSS_SAFE) {
    for (const ai of AI_SLUGS) add(safe, ai);
  }

  // Stable-ish order: by first course in PAIR_ORDER, then second
  const rank = (slug: string) => {
    const i = PAIR_ORDER.indexOf(slug);
    return i === -1 ? 999 : i;
  };
  combos.sort((x, y) => {
    const ax = rank(x.courses[0].slug);
    const ay = rank(y.courses[0].slug);
    if (ax !== ay) return ax - ay;
    return rank(x.courses[1].slug) - rank(y.courses[1].slug);
  });

  return combos;
}

export const COMBO_COURSES: Combo[] = buildAllCombos();

/** Combos that include a given course slug (for course-hero carousels). */
export function combosForCourseSlug(courseSlug: string): Combo[] {
  return COMBO_COURSES.filter((c) => c.courses.some((x) => x.slug === courseSlug));
}

/** @deprecated Use combosForCourseSlug — categories removed; returns all combos. */
export function combosForCategory(_category?: string): Combo[] {
  return COMBO_COURSES;
}

/** @deprecated Categories removed; kept for call-site compatibility. */
export function comboCategoryForCourseSlug(_slug: string): string {
  return "safe";
}

/** Show combo carousel when this course appears in any combo. */
export function shouldShowCourseHeroCombos(courseSlug: string): boolean {
  return COMBO_COURSES.some((c) => c.courses.some((x) => x.slug === courseSlug));
}
