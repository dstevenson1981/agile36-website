import {
  PUBLIC_CATALOG_COURSES,
  getCatalogCourseAcronym,
  getCatalogCourseSlug,
  getCatalogCourseUrl,
  getCatalogScheduleUrl,
  type CatalogCourse,
} from "@/app/lib/course-catalog";
import { formatDateRange, formatHoursPerDay } from "@/app/lib/schedule-display";
import { searchSite } from "@/app/lib/site-search";

const SITE_ORIGIN = "https://www.agile36.com";

const READ_ONLY = { readOnlyHint: true, untrustedContentHint: false } as const;

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asLimit(value: unknown, fallback: number, max: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(Math.floor(n), max);
}

function courseRecord(course: CatalogCourse) {
  const path = getCatalogCourseUrl(course);
  const schedulePath = getCatalogScheduleUrl(course);
  return {
    slug: getCatalogCourseSlug(course),
    acronym: getCatalogCourseAcronym(course.title),
    title: course.title,
    category: course.category,
    priceUsd: course.price,
    originalPriceUsd: course.originalPrice,
    duration: course.days,
    hours: course.hours,
    skills: course.skills,
    url: `${SITE_ORIGIN}${path}`,
    scheduleUrl: `${SITE_ORIGIN}${schedulePath}`,
  };
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function findPublicCourse(query: string): CatalogCourse | null {
  const raw = query.trim();
  if (!raw) return null;
  const needle = normalize(raw);
  const slugNeedle = raw.toLowerCase().replace(/^\/courses\//, "").replace(/\/$/, "");

  const bySlug = PUBLIC_CATALOG_COURSES.find((course) => getCatalogCourseSlug(course) === slugNeedle);
  if (bySlug) return bySlug;

  const byAcronym = PUBLIC_CATALOG_COURSES.find(
    (course) => getCatalogCourseAcronym(course.title).toLowerCase() === raw.toLowerCase(),
  );
  if (byAcronym) return byAcronym;

  return (
    PUBLIC_CATALOG_COURSES.find((course) => normalize(course.title) === needle) ??
    PUBLIC_CATALOG_COURSES.find((course) => normalize(course.title).includes(needle)) ??
    null
  );
}

function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

function pageTextExcerpt(maxChars = 2000): string {
  const root =
    document.querySelector("main, [role='main']") ??
    document.querySelector(".flex-1") ??
    document.body;
  if (!root) return "";
  const clone = root.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("script, style, noscript, nav, footer, iframe").forEach((node) => node.remove());
  return (clone.innerText || "").replace(/\s+/g, " ").trim().slice(0, maxChars);
}

export const agile36WebMcpTools: ModelContextTool[] = [
  {
    name: "get_site_overview",
    title: "Agile36 overview",
    description:
      "Describe Agile36: SAFe and AI training provider, formats, how to enroll, contact, and key URLs. Use this first when a user asks what the site offers.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
    async execute() {
      return {
        name: "Agile36",
        url: SITE_ORIGIN,
        summary:
          "Scaled Agile Silver Partner offering live virtual instructor-led SAFe, Generative AI, and AI Product certification courses. Exams included. Classes run in US Eastern time.",
        contact: {
          phone: "+1-310-620-7966",
          email: "d.stevenson@agile36.com",
          contactPage: `${SITE_ORIGIN}/contact`,
          corporateTraining: `${SITE_ORIGIN}/corporate`,
        },
        llmsTxt: `${SITE_ORIGIN}/llms.txt`,
        catalog: `${SITE_ORIGIN}/courses`,
        scheduleHint: "Use list_courses then list_schedules with a course slug for upcoming dates.",
      };
    },
  },
  {
    name: "list_courses",
    title: "List courses",
    description:
      "List public Agile36 certification courses with prices, duration, and URLs. Filter by category (SAFe, Generative AI, AI Product) or a search query.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["SAFe", "Generative AI", "AI Product"],
          description: "Optional catalog category.",
        },
        query: { type: "string", description: "Optional title or skill keywords." },
        limit: { type: "integer", minimum: 1, maximum: 50, description: "Max courses to return. Default 25." },
      },
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    async execute(input) {
      const category = asText(input.category);
      const query = normalize(asText(input.query));
      const limit = asLimit(input.limit, 25, 50);
      const courses = PUBLIC_CATALOG_COURSES.filter((course) => {
        if (category && course.category !== category) return false;
        if (!query) return true;
        return normalize(`${course.title} ${course.skills} ${getCatalogCourseSlug(course)} ${getCatalogCourseAcronym(course.title)}`).includes(query);
      })
        .slice(0, limit)
        .map(courseRecord);
      return { count: courses.length, courses };
    },
  },
  {
    name: "get_course",
    title: "Get course",
    description:
      "Return one public Agile36 course by slug, acronym (POPM, LPM, RTE, SSM), or title. Includes price and schedule URL.",
    inputSchema: {
      type: "object",
      properties: {
        slugOrTitle: {
          type: "string",
          description: "Course slug (leading-safe), acronym (LPM), or title.",
        },
      },
      required: ["slugOrTitle"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    async execute(input) {
      const slugOrTitle = asText(input.slugOrTitle);
      const course = findPublicCourse(slugOrTitle);
      if (!course) return { found: false, slugOrTitle };
      return { found: true, course: courseRecord(course) };
    },
  },
  {
    name: "list_schedules",
    title: "List class dates",
    description:
      "List upcoming public live-virtual class dates from the current catalog. Optionally filter by course slug such as leading-safe or lean-portfolio-management.",
    inputSchema: {
      type: "object",
      properties: {
        courseSlug: {
          type: "string",
          description: "Optional course slug, e.g. lean-portfolio-management.",
        },
        limit: { type: "integer", minimum: 1, maximum: 40, description: "Max classes to return. Default 12." },
      },
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    async execute(input) {
      const courseSlug = asText(input.courseSlug);
      const limit = asLimit(input.limit, 12, 40);
      const params = new URLSearchParams({ status: "active" });
      if (courseSlug) params.set("course_slug", courseSlug);
      const response = await fetch(`/api/course-schedules?${params.toString()}`, { cache: "no-store" });
      if (!response.ok) {
        return { error: `Could not load schedules (${response.status}).` };
      }
      const payload = (await response.json()) as { success?: boolean; data?: Array<Record<string, unknown>> };
      const rows = Array.isArray(payload.data) ? payload.data : [];
      const classes = rows.slice(0, limit).map((row) => {
        const start = String(row.start_date ?? "");
        const end = String(row.end_date ?? "");
        const timezone = String(row.timezone ?? "America/New_York");
        const slug = String(row.course_slug ?? courseSlug ?? "");
        return {
          id: row.id,
          courseName: row.course_name,
          courseSlug: slug,
          dates: start && end ? formatDateRange(start, end, timezone) : null,
          hoursPerDay: formatHoursPerDay(String(row.start_time ?? ""), String(row.end_time ?? "")),
          instructor: row.instructor_name ?? null,
          priceUsd: row.price != null ? Number(row.price) : null,
          timezone,
          weekend: Boolean(row.is_weekend),
          examIncluded: Boolean(row.exam_included),
          url: slug ? `${SITE_ORIGIN}/courses/${slug}/schedule?course=${slug}` : `${SITE_ORIGIN}/courses`,
        };
      });
      return { count: classes.length, classes };
    },
  },
  {
    name: "search_site",
    title: "Search the site",
    description:
      "Search public Agile36 pages for courses, combo bundles, practice exams, and key site pages. Returns titles and URLs.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What the user is looking for." },
        limit: { type: "integer", minimum: 1, maximum: 15, description: "Max results. Default 8." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    async execute(input) {
      const query = asText(input.query);
      if (!query) return { error: "query is required." };
      const limit = asLimit(input.limit, 8, 15);
      const result = searchSite(query, limit);
      return {
        query,
        didYouMean: result.didYouMean ?? null,
        results: result.results.map((item) => ({
          type: item.type,
          title: item.title,
          subtitle: item.subtitle ?? null,
          url: absoluteUrl(item.href),
          priceUsd: item.price ?? null,
        })),
      };
    },
  },
  {
    name: "get_page_context",
    title: "Read this page",
    description:
      "Return the current page URL, title, heading, and a short text excerpt so an agent can understand what the visitor is looking at. Skips private account pages.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
    async execute() {
      const path = window.location.pathname;
      if (path.startsWith("/account") || path.startsWith("/api/") || path.startsWith("/private/")) {
        return {
          private: true,
          url: window.location.href,
          note: "This page is private. Use public catalog tools instead of reading account content.",
        };
      }
      const description =
        document.querySelector('meta[name="description"]')?.getAttribute("content") ??
        document.querySelector('meta[property="og:description"]')?.getAttribute("content") ??
        null;
      return {
        url: window.location.href,
        title: document.title,
        heading: document.querySelector("h1")?.textContent?.trim() ?? null,
        description,
        excerpt: pageTextExcerpt(),
      };
    },
  },
  {
    name: "open_course",
    title: "Open a course page",
    description:
      "Navigate this browser tab to a public course page or its class schedule. Does not enroll or charge a card.",
    inputSchema: {
      type: "object",
      properties: {
        slugOrTitle: { type: "string", description: "Course slug, acronym, or title." },
        view: {
          type: "string",
          enum: ["course", "schedule"],
          description: "Open the course overview or upcoming dates. Default course.",
        },
      },
      required: ["slugOrTitle"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    async execute(input) {
      const course = findPublicCourse(asText(input.slugOrTitle));
      if (!course) return { error: "Course not found.", slugOrTitle: input.slugOrTitle };
      const view = asText(input.view) === "schedule" ? "schedule" : "course";
      const path = view === "schedule" ? getCatalogScheduleUrl(course) : getCatalogCourseUrl(course);
      window.location.assign(path);
      return { opened: path, course: courseRecord(course), view };
    },
  },
];
