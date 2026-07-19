import {
  CATALOG_COURSES,
  getCatalogCourseImage,
  getCatalogCourseUrl,
  type CatalogCourse,
} from "@/app/lib/course-catalog";
import { COMBO_COURSES } from "@/app/combo-courses/data";

export type SearchResultType = "course" | "combo" | "practice" | "page";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  href: string;
  subtitle?: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  score: number;
}

export interface SiteSearchResponse {
  results: SearchResult[];
  didYouMean?: string;
  expandedQuery?: string;
}

interface SearchDocument {
  id: string;
  type: SearchResultType;
  title: string;
  href: string;
  subtitle?: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  /** Normalized haystack for matching */
  haystack: string;
  /** Tokens used for fuzzy / acronym matching */
  tokens: string[];
  /** Intent tags (popm, lpm, practice, etc.) */
  intents: string[];
}

/** Intent keywords → canonical intent ids that map to courses/pages. */
const INTENT_KEYWORDS: Record<string, string[]> = {
  popm: [
    "popm",
    "po/pm",
    "po pm",
    "product owner",
    "product manager",
    "product owner product manager",
    "safe popm",
    "po pm certification",
  ],
  lpm: [
    "lpm",
    "portfolio",
    "lean portfolio",
    "lean portfolio management",
    "portfolio management",
    "investment funding",
  ],
  leading_safe: [
    "leading safe",
    "leading saFe",
    "safe agilist",
    "safe agilist",
    "sa certification",
    "leading-safe",
  ],
  sa: ["sa", "agilist"],
  ssm: [
    "ssm",
    "scrum master",
    "safe scrum master",
    "scrummaster",
  ],
  sasm: [
    "sasm",
    "advanced scrum",
    "advanced scrum master",
    "safe advanced scrum master",
  ],
  rte: ["rte", "release train engineer", "release train"],
  apm: [
    "apm",
    "agile product management",
    "safe apm",
    "product management certification",
  ],
  s4t: ["s4t", "safe for teams", "for teams", "sp certification"],
  devops: ["devops", "safe devops", "sdp", "continuous delivery"],
  vsm: ["vsm", "value stream", "value stream mapping"],
  rai: ["responsible ai", "rai", "ai ethics", "ai governance"],
  genai: [
    "genai",
    "generative ai",
    "gen ai",
    "chatgpt",
    "prompt engineering",
  ],
  ai_courses: ["ai", "artificial intelligence", "ai course", "ai training"],
  practice: [
    "practice",
    "practice test",
    "practice exam",
    "mock",
    "mock exam",
    "mock test",
    "exam prep",
    "free test",
  ],
  combo: ["combo", "bundle", "package", "combo course", "combo courses"],
  corporate: ["corporate", "private class", "team training", "enterprise"],
  blog: ["blog", "blogs", "article", "articles", "guide"],
};

/** Common typos / shorthand → preferred correction shown in “Did you mean”. */
const TYPO_CORRECTIONS: Array<{ pattern: RegExp; suggestion: string }> = [
  { pattern: /\bscrum\s*mster\b/i, suggestion: "scrum master" },
  { pattern: /\bscrumaster\b/i, suggestion: "scrum master" },
  { pattern: /\bleading\s*saef\b/i, suggestion: "leading safe" },
  { pattern: /\bleading\s*saf\b/i, suggestion: "leading safe" },
  { pattern: /\bprodoct\b/i, suggestion: "product" },
  { pattern: /\bproc\b/i, suggestion: "product" },
  { pattern: /\bportfoilo\b/i, suggestion: "portfolio" },
  { pattern: /\bpractise\b/i, suggestion: "practice" },
  { pattern: /\bcertifcation\b/i, suggestion: "certification" },
];

const PRACTICE_TESTS: Array<{
  id: string;
  title: string;
  href: string;
  image: string;
  intents: string[];
  keywords: string[];
}> = [
  {
    id: "pt-leading-safe",
    title: "Leading SAFe Practice Test | SAFe Agilist Mock",
    href: "/test/leading-safe",
    image: "/Leading SAFe.png",
    intents: ["leading_safe", "sa", "practice"],
    keywords: ["leading safe", "safe agilist", "sa", "mock"],
  },
  {
    id: "pt-lpm",
    title: "Lean Portfolio Management Practice Test",
    href: "/test/lean-portfolio-management",
    image: "/Lean Portfolio.png",
    intents: ["lpm", "practice"],
    keywords: ["lpm", "lean portfolio", "portfolio"],
  },
  {
    id: "pt-popm",
    title: "SAFe Product Owner/Product Manager Practice Test",
    href: "/test/product-owner-manager",
    image: "/POPM.jpg",
    intents: ["popm", "practice"],
    keywords: ["popm", "product owner", "product manager"],
  },
  {
    id: "pt-ssm",
    title: "SAFe Scrum Master Practice Test",
    href: "/test/scrum-master",
    image: "/SSM.jpeg",
    intents: ["ssm", "practice"],
    keywords: ["ssm", "scrum master"],
  },
  {
    id: "pt-sasm",
    title: "SAFe Advanced Scrum Master Practice Test",
    href: "/test/advanced-scrum-master",
    image: "/AdvancedSM.png",
    intents: ["sasm", "practice"],
    keywords: ["sasm", "advanced scrum master"],
  },
  {
    id: "pt-devops",
    title: "SAFe DevOps Practice Test",
    href: "/test/devops",
    image: "/Devops.png",
    intents: ["devops", "practice"],
    keywords: ["devops", "sdp"],
  },
  {
    id: "pt-apm",
    title: "SAFe Agile Product Management Practice Test",
    href: "/test/agile-product-management",
    image: "/AgileProductManagment.png",
    intents: ["apm", "practice"],
    keywords: ["apm", "agile product management"],
  },
  {
    id: "pt-s4t",
    title: "SAFe for Teams Practice Test",
    href: "/test/safe-for-teams",
    image: "/SAFe for Teams.png",
    intents: ["s4t", "practice"],
    keywords: ["safe for teams", "s4t"],
  },
];

const KEY_PAGES: Array<{
  id: string;
  title: string;
  href: string;
  subtitle: string;
  intents: string[];
  keywords: string[];
}> = [
  {
    id: "page-courses",
    title: "All Courses",
    href: "/courses",
    subtitle: "Browse SAFe, AI, and product training",
    intents: ["ai_courses", "genai"],
    keywords: ["courses", "training", "certification", "catalog"],
  },
  {
    id: "page-combo",
    title: "Combo Courses",
    href: "/combo-courses",
    subtitle: "Bundled certifications at a lower price",
    intents: ["combo"],
    keywords: ["combo", "bundle", "package", "save"],
  },
  {
    id: "page-practice",
    title: "Practice Tests",
    href: "/test",
    subtitle: "Free SAFe mock exams and practice tests",
    intents: ["practice"],
    keywords: ["practice tests", "mock exams", "exam prep"],
  },
  {
    id: "page-blog",
    title: "Blog",
    href: "/blog",
    subtitle: "Guides on SAFe, Agile, and AI",
    intents: ["blog"],
    keywords: ["blog", "articles", "guides"],
  },
  {
    id: "page-corporate",
    title: "Corporate Training",
    href: "/corporate",
    subtitle: "Private classes for teams and enterprises",
    intents: ["corporate"],
    keywords: ["corporate", "enterprise", "private class", "team training"],
  },
  {
    id: "page-contact",
    title: "Contact Us",
    href: "/contact",
    subtitle: "Talk with the Agile36 team",
    intents: [],
    keywords: ["contact", "support", "help", "enquire", "inquiry"],
  },
  {
    id: "page-testimonials",
    title: "Testimonials",
    href: "/testimonials",
    subtitle: "What learners say about Agile36",
    intents: [],
    keywords: ["testimonials", "reviews", "ratings"],
  },
  {
    id: "page-account",
    title: "My Account",
    href: "/account",
    subtitle: "Practice exams and course access",
    intents: ["practice"],
    keywords: ["account", "login", "my account", "dashboard"],
  },
  {
    id: "blog-popm-ssm",
    title: "POPM vs Scrum Master",
    href: "/blog/popm-vs-scrum-master",
    subtitle: "Blog · Compare certifications",
    intents: ["popm", "ssm", "blog"],
    keywords: ["popm vs", "scrum master vs product owner"],
  },
  {
    id: "blog-lpm-popm",
    title: "SAFe LPM vs POPM",
    href: "/blog/safe-lpm-vs-popm",
    subtitle: "Blog · Which path fits you",
    intents: ["lpm", "popm", "blog"],
    keywords: ["lpm vs popm", "portfolio vs product"],
  },
  {
    id: "blog-leading-safe-cost",
    title: "Leading SAFe Certification Cost 2026",
    href: "/blog/leading-safe-certification-cost-2026",
    subtitle: "Blog · Pricing guide",
    intents: ["leading_safe", "blog"],
    keywords: ["leading safe cost", "safe agilist cost", "price"],
  },
  {
    id: "blog-ssm-exam",
    title: "SAFe Scrum Master Exam Questions",
    href: "/blog/safe-scrum-master-exam-questions",
    subtitle: "Blog · Exam prep",
    intents: ["ssm", "practice", "blog"],
    keywords: ["ssm exam", "scrum master exam questions"],
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/®|™/g, "")
    .replace(/[^a-z0-9+/.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[\s/.-]+/)
    .filter((t) => t.length > 0);
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items));
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

function fuzzyTokenMatch(queryToken: string, candidateToken: string): boolean {
  if (queryToken === candidateToken) return true;
  if (queryToken.length < 3 || candidateToken.length < 3) return false;
  if (candidateToken.startsWith(queryToken) || queryToken.startsWith(candidateToken)) {
    return true;
  }
  // Prefix typo tolerance: "proc" ≈ "prod…" (product), "scru" ≈ "scrum"
  if (
    queryToken.length >= 3 &&
    candidateToken.length > queryToken.length &&
    levenshtein(queryToken, candidateToken.slice(0, queryToken.length)) <= 1
  ) {
    return true;
  }
  const maxDist =
    Math.min(queryToken.length, candidateToken.length) <= 4
      ? 1
      : Math.min(queryToken.length, candidateToken.length) <= 7
        ? 1
        : 2;
  return levenshtein(queryToken, candidateToken) <= maxDist;
}

function courseIntents(course: CatalogCourse): string[] {
  const title = course.title.toLowerCase();
  const intents: string[] = [];
  if (
    title.includes("product owner/product manager") ||
    title.includes("product owner") ||
    title.includes("safe popm")
  ) {
    intents.push("popm");
  }
  if (title.includes("lean portfolio")) intents.push("lpm");
  if (title.includes("leading safe") || title.includes("safe agilist")) {
    intents.push("leading_safe", "sa");
  }
  if (title.includes("advanced scrum")) intents.push("sasm");
  else if (title.includes("scrum master")) intents.push("ssm");
  if (title.includes("release train")) intents.push("rte");
  if (title.includes("agile product management")) intents.push("apm");
  if (title.includes("for teams")) intents.push("s4t");
  if (title.includes("devops")) intents.push("devops");
  if (title.includes("value stream")) intents.push("vsm");
  if (title.includes("responsible ai")) intents.push("rai");
  if (
    course.category === "Generative AI" ||
    course.category === "AI Product" ||
    title.includes("ai-") ||
    title.includes("genai") ||
    /\bai\b/.test(title)
  ) {
    intents.push("ai_courses", "genai");
  }
  return unique(intents);
}

function buildDocuments(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  for (const course of CATALOG_COURSES) {
    const intents = courseIntents(course);
    const acronymBits = intents.flatMap((i) => {
      if (i === "popm") return ["popm"];
      if (i === "lpm") return ["lpm"];
      if (i === "ssm") return ["ssm"];
      if (i === "sasm") return ["sasm"];
      if (i === "rte") return ["rte"];
      if (i === "apm") return ["apm"];
      if (i === "s4t") return ["s4t", "sp"];
      if (i === "leading_safe") return ["sa", "leading safe"];
      return [];
    });
    const haystack = normalize(
      [
        course.title,
        course.category,
        course.skills,
        ...acronymBits,
        ...intents,
      ].join(" ")
    );
    docs.push({
      id: `course-${course.id}`,
      type: "course",
      title: course.title,
      href: getCatalogCourseUrl(course),
      subtitle: `${course.category} · ${course.days}`,
      image: getCatalogCourseImage(course),
      price: course.price > 0 ? course.price : undefined,
      originalPrice: course.originalPrice > 0 ? course.originalPrice : undefined,
      haystack,
      tokens: unique([...tokenize(course.title), ...tokenize(course.skills), ...acronymBits]),
      intents,
    });
  }

  for (const combo of COMBO_COURSES) {
    const courseNames = combo.courses.map((c) => c.name).join(" ");
    const intents = unique([
      "combo",
      ...combo.courses.flatMap((c) => {
        const slug = c.slug;
        if (slug.includes("product-owner")) return ["popm"];
        if (slug.includes("lean-portfolio")) return ["lpm"];
        if (slug.includes("leading-safe")) return ["leading_safe", "sa"];
        if (slug.includes("advanced-scrum")) return ["sasm"];
        if (slug.includes("scrum-master")) return ["ssm"];
        if (slug.includes("safe-for-teams")) return ["s4t"];
        if (slug.includes("devops")) return ["devops"];
        if (slug.includes("agile-product")) return ["apm"];
        if (slug.includes("release-train")) return ["rte"];
        return [];
      }),
    ]);
    const haystack = normalize([combo.name, courseNames, combo.category, "combo", "bundle"].join(" "));
    docs.push({
      id: `combo-${combo.id}`,
      type: "combo",
      title: combo.name,
      href: `/combo-courses/schedule?combo=${combo.id}`,
      subtitle: `Combo · Save $${combo.discount}`,
      image: combo.courses[0]?.badge,
      price: combo.comboPrice,
      originalPrice: combo.originalPrice,
      haystack,
      tokens: unique([...tokenize(combo.name), ...tokenize(courseNames), "combo", "bundle"]),
      intents,
    });
  }

  for (const test of PRACTICE_TESTS) {
    const haystack = normalize([test.title, ...test.keywords, "practice test", "mock exam"].join(" "));
    docs.push({
      id: test.id,
      type: "practice",
      title: test.title,
      href: test.href,
      subtitle: "Practice Test",
      image: test.image,
      haystack,
      tokens: unique([...tokenize(test.title), ...test.keywords.map(normalize)]),
      intents: test.intents,
    });
  }

  for (const page of KEY_PAGES) {
    const haystack = normalize([page.title, page.subtitle, ...page.keywords].join(" "));
    docs.push({
      id: page.id,
      type: "page",
      title: page.title,
      href: page.href,
      subtitle: page.subtitle,
      haystack,
      tokens: unique([...tokenize(page.title), ...page.keywords.map(normalize)]),
      intents: page.intents,
    });
  }

  return docs;
}

let cachedDocs: SearchDocument[] | null = null;

function getDocuments(): SearchDocument[] {
  if (!cachedDocs) cachedDocs = buildDocuments();
  return cachedDocs;
}

function detectIntents(normalizedQuery: string): string[] {
  const matched: string[] = [];
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      const nk = normalize(keyword);
      if (!nk) continue;
      if (normalizedQuery === nk || normalizedQuery.includes(` ${nk} `) || normalizedQuery.startsWith(`${nk} `) || normalizedQuery.endsWith(` ${nk}`) || normalizedQuery === nk) {
        matched.push(intent);
        continue;
      }
      // Whole-query acronym / short alias
      if (nk.length <= 5 && normalizedQuery === nk) {
        matched.push(intent);
      }
    }
  }
  // Also match when query is exactly an intent alias token
  const qTokens = tokenize(normalizedQuery);
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      const kt = tokenize(keyword);
      if (kt.length === 1 && qTokens.includes(kt[0])) {
        matched.push(intent);
      }
    }
  }
  return unique(matched);
}

function expandQuery(query: string): { normalized: string; intents: string[]; suggestion?: string } {
  let working = query.trim();
  let suggestion: string | undefined;

  for (const { pattern, suggestion: fix } of TYPO_CORRECTIONS) {
    if (pattern.test(working)) {
      const next = working.replace(pattern, fix);
      if (next !== working) {
        suggestion = normalize(next);
        working = next;
      }
    }
  }

  const normalized = normalize(working);
  const intents = detectIntents(normalized);

  // Typo-tolerant intent detection on tokens (e.g. "scrum mster")
  const tokens = tokenize(normalized);
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      const kTokens = tokenize(keyword);
      if (kTokens.length === 1 && tokens.some((t) => fuzzyTokenMatch(t, kTokens[0]))) {
        intents.push(intent);
      }
      if (
        kTokens.length > 1 &&
        kTokens.every((kt) => tokens.some((t) => fuzzyTokenMatch(t, kt) || t.includes(kt) || kt.includes(t)))
      ) {
        intents.push(intent);
      }
    }
  }

  return { normalized, intents: unique(intents), suggestion };
}

function scoreDocument(
  doc: SearchDocument,
  normalizedQuery: string,
  queryTokens: string[],
  intents: string[]
): number {
  if (!normalizedQuery) return 0;
  let score = 0;
  const titleNorm = normalize(doc.title);

  if (titleNorm === normalizedQuery) score += 120;
  else if (titleNorm.startsWith(normalizedQuery)) score += 90;
  else if (titleNorm.includes(normalizedQuery)) score += 70;
  else if (doc.haystack.includes(normalizedQuery)) score += 45;

  let tokenHits = 0;
  for (const qt of queryTokens) {
    if (qt.length < 2) continue;
    if (doc.tokens.some((dt) => dt === qt)) {
      tokenHits += 1;
      score += qt.length <= 4 ? 18 : 14;
    } else if (doc.tokens.some((dt) => dt.startsWith(qt) && qt.length >= 3)) {
      // Prefix typing: "proc" → product, "scru" → scrum
      tokenHits += 1;
      score += 16;
    } else if (doc.tokens.some((dt) => fuzzyTokenMatch(qt, dt))) {
      tokenHits += 1;
      score += 10;
    } else if (doc.haystack.includes(qt)) {
      tokenHits += 0.5;
      score += 6;
    }
  }

  if (queryTokens.length > 0 && tokenHits / queryTokens.length >= 0.6) {
    score += 12;
  }

  const intentOverlap = intents.filter((i) => doc.intents.includes(i));
  if (intentOverlap.length) {
    score += intentOverlap.length * 28;
    // Prefer courses for role intents; practice docs when practice intent present
    if (doc.type === "course" && !intents.includes("practice") && !intents.includes("combo")) {
      score += 8;
    }
    if (doc.type === "practice" && intents.includes("practice")) {
      score += 20;
    }
    if (doc.type === "combo" && intents.includes("combo")) {
      score += 20;
    }
    if (doc.type === "page" && (intents.includes("blog") || intents.includes("corporate") || intents.includes("combo") || intents.includes("practice"))) {
      score += 10;
    }
  }

  // Acronym-only queries like "popm" / "lpm"
  if (queryTokens.length === 1 && queryTokens[0].length <= 5) {
    const acronym = queryTokens[0];
    if (doc.tokens.includes(acronym) || doc.intents.includes(acronym) || doc.haystack.includes(acronym)) {
      score += 40;
    }
    // Prefer the primary course over combos/blogs for short acronym searches
    if (doc.type === "course" && intentOverlap.some((i) => i === acronym || intents.includes(i))) {
      score += 50;
    }
  }

  // Type priority: courses first unless the query is clearly combo/practice/blog
  if (doc.type === "course") score += 12;
  else if (doc.type === "practice" && intents.includes("practice")) score += 10;
  else if (doc.type === "combo" && intents.includes("combo")) score += 10;
  else if (doc.type === "combo") score += 2;
  else if (doc.type === "practice") score += 1;

  return score;
}

const TYPE_LABEL: Record<SearchResultType, string> = {
  course: "Course",
  combo: "Combo",
  practice: "Practice Test",
  page: "Page",
};

export function getSearchTypeLabel(type: SearchResultType): string {
  return TYPE_LABEL[type];
}

/**
 * Client-side smart site search: synonym/intent mapping + fuzzy tokens.
 * No network / LLM — safe to call on every keystroke.
 */
export function searchSite(query: string, limit = 10): SiteSearchResponse {
  const trimmed = query.trim();
  if (!trimmed) {
    return { results: [] };
  }

  const { normalized, intents, suggestion } = expandQuery(trimmed);
  const queryTokens = tokenize(normalized);
  const docs = getDocuments();

  const scored = docs
    .map((doc) => ({
      doc,
      score: scoreDocument(doc, normalized, queryTokens, intents),
    }))
    .filter((row) => row.score >= 14)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));

  const results: SearchResult[] = scored.slice(0, limit).map(({ doc, score }) => ({
    id: doc.id,
    type: doc.type,
    title: doc.title,
    href: doc.href,
    subtitle: doc.subtitle,
    image: doc.image,
    price: doc.price,
    originalPrice: doc.originalPrice,
    score,
  }));

  let didYouMean: string | undefined;
  if (results.length === 0 && suggestion && suggestion !== normalized) {
    didYouMean = suggestion;
  } else if (results.length === 0 && intents.length > 0) {
    // Suggest a friendly phrase for the strongest intent
    const intentHint: Record<string, string> = {
      popm: "product owner",
      lpm: "lean portfolio",
      leading_safe: "leading safe",
      ssm: "scrum master",
      sasm: "advanced scrum master",
      practice: "practice test",
      combo: "combo courses",
    };
    didYouMean = intentHint[intents[0]];
  } else if (suggestion && suggestion !== normalized && results.length > 0) {
    didYouMean = suggestion;
  }

  return {
    results,
    didYouMean,
    expandedQuery: intents.length ? normalized : undefined,
  };
}
