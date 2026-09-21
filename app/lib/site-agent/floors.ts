import {
  PUBLIC_CATALOG_COURSES,
  getCatalogCourseAcronym,
  getCatalogCourseSlug,
  getCatalogCourseUrl,
  type CatalogCourse,
} from "@/app/lib/course-catalog";

const NAMED_FLOORS: Record<string, number> = {
  "leading-safe": 399,
  "scrum-master": 399,
  "product-owner-manager": 399,
  "lean-portfolio-management": 750,
  "agile-product-management": 750,
  "advanced-scrum-master": 465,
};

const ALIASES: Record<string, string> = {
  popm: "product-owner-manager",
  "product owner": "product-owner-manager",
  "leading safe": "leading-safe",
  "safe agilist": "leading-safe",
  sa: "leading-safe",
  ssm: "scrum-master",
  "scrum master": "scrum-master",
  lpm: "lean-portfolio-management",
  "lean portfolio": "lean-portfolio-management",
  apm: "agile-product-management",
  "agile product": "agile-product-management",
  sasm: "advanced-scrum-master",
  "advanced scrum": "advanced-scrum-master",
  rte: "release-train-engineer",
  "release train": "release-train-engineer",
  s4t: "safe-for-teams",
  "safe for teams": "safe-for-teams",
  arch: "safe-for-architects",
  architects: "safe-for-architects",
  devops: "devops",
  vsm: "value-stream-mapping",
  rai: "responsible-ai",
  egl: "executive-genai-leadership",
};

export type ResolvedCourse = {
  title: string;
  slug: string;
  url: string;
  category: CatalogCourse["category"];
  listPrice: number;
  hours: string;
  days: string;
  skills: string;
  privateClass: boolean;
  acronym: string;
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[®™]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function catalogCourse(course: CatalogCourse): ResolvedCourse {
  const slug = getCatalogCourseSlug(course);
  return {
    title: course.title,
    slug,
    url: getCatalogCourseUrl(course),
    category: course.category,
    listPrice: course.price,
    hours: course.hours,
    days: course.days,
    skills: course.skills,
    privateClass: Boolean(course.privateClass),
    acronym: getCatalogCourseAcronym(course.title),
  };
}

export function listPublicCourses(): ResolvedCourse[] {
  return PUBLIC_CATALOG_COURSES.map(catalogCourse);
}

export function findCourses(query: string): ResolvedCourse[] {
  const raw = query.trim();
  if (!raw) return listPublicCourses();

  const needle = normalize(raw);
  const aliasSlug = ALIASES[needle];
  const courses = listPublicCourses();

  if (aliasSlug) {
    const exact = courses.filter((course) => course.slug === aliasSlug);
    if (exact.length) return exact;
  }

  const scored = courses
    .map((course) => {
      const hay = normalize(`${course.title} ${course.slug} ${course.acronym} ${course.skills}`);
      let score = 0;
      if (course.slug === needle || course.acronym.toLowerCase() === needle) score += 8;
      if (hay.includes(needle)) score += 4;
      for (const token of needle.split(" ").filter(Boolean)) {
        if (hay.includes(token)) score += 1;
      }
      return { course, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 5).map((row) => row.course);
}

export function floorForCourse(course: ResolvedCourse, publicPrice: number): {
  floor: number | null;
  rule: string;
} {
  const named = NAMED_FLOORS[course.slug];
  if (named != null) {
    return { floor: named, rule: `Named floor for ${course.slug}` };
  }
  if (course.category === "AI Courses") {
    return { floor: Math.max(0, publicPrice - 200), rule: "AI courses: at most $200 off public price" };
  }
  return {
    floor: null,
    rule: "No public floor. Do not invent a public cut. Corporate 20% or hand off if unsure.",
  };
}

export function allowedOffer(args: {
  course: ResolvedCourse;
  publicPrice: number;
  proposed?: number;
  corporate?: boolean;
}): {
  publicPrice: number;
  floor: number | null;
  lowestAllowed: number | null;
  proposed: number | null;
  allowed: boolean;
  handoff: boolean;
  rule: string;
} {
  const { floor, rule } = floorForCourse(args.course, args.publicPrice);
  const corporatePrice = Math.round(args.publicPrice * 0.8);
  let lowestAllowed = floor;

  if (args.corporate) {
    lowestAllowed = floor == null ? corporatePrice : Math.max(floor, corporatePrice);
  }

  const proposed = args.proposed ?? null;
  if (proposed == null) {
    return {
      publicPrice: args.publicPrice,
      floor,
      lowestAllowed,
      proposed,
      allowed: true,
      handoff: false,
      rule: args.corporate ? `${rule} Corporate 20% is $${corporatePrice} before the floor.` : rule,
    };
  }

  if (lowestAllowed == null) {
    return {
      publicPrice: args.publicPrice,
      floor,
      lowestAllowed,
      proposed,
      allowed: false,
      handoff: true,
      rule,
    };
  }

  const allowed = proposed >= lowestAllowed && proposed <= args.publicPrice;
  return {
    publicPrice: args.publicPrice,
    floor,
    lowestAllowed,
    proposed,
    allowed,
    handoff: !allowed && proposed < lowestAllowed,
    rule,
  };
}
