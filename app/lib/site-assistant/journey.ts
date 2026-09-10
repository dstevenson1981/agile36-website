export type JourneyPage = {
  path: string;
  title: string;
  at: number;
};

export type VisitorProfile = {
  id: string;
  name: string;
  email: string;
  firstSeen: number;
  lastSeen: number;
  visitCount: number;
  pages: JourneyPage[];
};

export type VisitorHint = {
  name?: string;
  email?: string;
  visitCount?: number;
  firstSeen?: number;
  pages?: Array<{ path: string; title?: string }>;
};

const STORAGE_KEY = "a36_journey";
const COOKIE_NAME = "a36v";
const MAX_PAGES = 24;

function uid(): string {
  return `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function emptyProfile(): VisitorProfile {
  const now = Date.now();
  return {
    id: uid(),
    name: "",
    email: "",
    firstSeen: now,
    lastSeen: now,
    visitCount: 1,
    pages: [],
  };
}

function asProfile(value: unknown): VisitorProfile {
  const row = value && typeof value === "object" ? (value as Partial<VisitorProfile>) : {};
  const now = Date.now();
  return {
    id: typeof row.id === "string" && row.id ? row.id : uid(),
    name: typeof row.name === "string" ? row.name.trim().slice(0, 80) : "",
    email: typeof row.email === "string" ? row.email.trim().toLowerCase().slice(0, 120) : "",
    firstSeen: typeof row.firstSeen === "number" ? row.firstSeen : now,
    lastSeen: typeof row.lastSeen === "number" ? row.lastSeen : now,
    visitCount: typeof row.visitCount === "number" && row.visitCount > 0 ? row.visitCount : 1,
    pages: Array.isArray(row.pages)
      ? row.pages
          .filter((page): page is JourneyPage => !!page && typeof page.path === "string")
          .map((page) => ({
            path: String(page.path).slice(0, 200),
            title: typeof page.title === "string" ? page.title.slice(0, 120) : "",
            at: typeof page.at === "number" ? page.at : now,
          }))
          .slice(-MAX_PAGES)
      : [],
  };
}

function readCookie(): Partial<VisitorProfile> | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as Partial<VisitorProfile>;
  } catch {
    return null;
  }
}

function writeCookie(profile: VisitorProfile) {
  if (typeof document === "undefined") return;
  const compact = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    visitCount: profile.visitCount,
    firstSeen: profile.firstSeen,
  };
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(compact))}; Path=/; Expires=${expires}; SameSite=Lax`;
}

function persist(profile: VisitorProfile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // private mode
  }
  writeCookie(profile);
}

export function loadVisitor(): VisitorProfile {
  if (typeof window === "undefined") return emptyProfile();
  let stored: unknown = null;
  try {
    stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    stored = null;
  }
  const profile = asProfile(stored ?? readCookie());
  const lastDay = new Date(profile.lastSeen).toDateString();
  const today = new Date().toDateString();
  if (stored && lastDay !== today) profile.visitCount += 1;
  profile.lastSeen = Date.now();
  persist(profile);
  return profile;
}

export function rememberVisitor(partial: { name?: string; email?: string }) {
  if (typeof window === "undefined") return;
  const profile = loadVisitor();
  const name = partial.name?.trim();
  const email = partial.email?.trim().toLowerCase();
  if (name && name.length < 80) profile.name = name;
  if (email && email.includes("@") && email.length < 120) profile.email = email;
  persist(profile);
}

export function recordPageView(path: string, title: string) {
  if (typeof window === "undefined") return;
  if (!path || path.startsWith("/admin") || path.startsWith("/popm-workshop")) return;
  const profile = loadVisitor();
  const last = profile.pages[profile.pages.length - 1];
  if (last && last.path === path) {
    last.title = title.slice(0, 120) || last.title;
    last.at = Date.now();
  } else {
    profile.pages.push({
      path: path.slice(0, 200),
      title: title.slice(0, 120),
      at: Date.now(),
    });
    if (profile.pages.length > MAX_PAGES) profile.pages = profile.pages.slice(-MAX_PAGES);
  }
  persist(profile);
}

export function captureIdentityFromText(text: string) {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  if (email) rememberVisitor({ email });
}

export function visitorHint(profile: VisitorProfile): VisitorHint {
  return {
    name: profile.name || undefined,
    email: profile.email || undefined,
    visitCount: profile.visitCount,
    firstSeen: profile.firstSeen,
    pages: profile.pages.slice(-12).map((page) => ({ path: page.path, title: page.title })),
  };
}

const COURSE_LABELS: Record<string, string> = {
  "leading-safe": "Leading SAFe",
  "product-owner-manager": "POPM",
  "scrum-master": "Scrum Master",
  "advanced-scrum-master": "Advanced Scrum Master",
  "lean-portfolio-management": "LPM",
  "agile-product-management": "APM",
  "safe-for-teams": "SAFe for Teams",
  "safe-for-architects": "SAFe for Architects",
  "release-train-engineer": "RTE",
  "devops": "DevOps",
  "value-stream-mapping": "Value Stream Mapping",
  "certified-ai-product-manager": "AI Product Manager",
  "responsible-ai": "Responsible AI",
  "certified-genai-practitioner": "GenAI Practitioner",
  "executive-genai-leadership": "Executive GenAI",
  "generative-ai-project-managers": "GenAI for PMs",
  "ai-driven-scrum-master": "AI-Driven Scrum Master",
  "ai-agent-builder": "AI Agent Builder",
  "ai-workflow-automation": "AI Workflow Automation",
  "ai-app-builder": "AI App Builder",
};

export function labelPath(path: string): string {
  if (path === "/" || path === "") return "the homepage";
  if (path.startsWith("/combo-courses")) return "combo courses";
  if (path.startsWith("/corporate")) return "corporate training";
  if (path.startsWith("/contact")) return "contact";
  if (path.startsWith("/refund-policy")) return "the refund policy";
  if (path.startsWith("/safe-certifications")) return "SAFe certifications";
  if (path.includes("/checkout")) {
    const slug = path.split("/")[2];
    return `${COURSE_LABELS[slug] || slug || "a class"} checkout`;
  }
  if (path.startsWith("/courses/")) {
    const slug = path.split("/")[2] || "";
    const label = COURSE_LABELS[slug] || slug.replace(/-/g, " ");
    if (path.includes("/schedule")) return `${label} dates`;
    return label;
  }
  if (path.startsWith("/test/")) return "a practice exam";
  if (path.startsWith("/blog/")) return "a blog post";
  return path.replace(/^\//, "").replace(/-/g, " ") || "the site";
}

export function firstNameOf(name: string): string {
  return name.trim().split(/\s+/)[0] || "";
}

export type CourseInterest = {
  slug: string;
  label: string;
  href: string;
  scheduleHref: string;
  priceUsd: number | null;
};

const HUB_TO_SLUG: Array<[string, string]> = [
  ["safe-product-owner-product-manager-certification-training", "product-owner-manager"],
  ["lean-portfolio-management-certification-training", "lean-portfolio-management"],
  ["safe-for-teams-certification-training", "safe-for-teams"],
  ["scrum-master-certification-training", "scrum-master"],
  ["leading-safe-certification-training", "leading-safe"],
  ["release-train-engineer-certification-training", "release-train-engineer"],
  ["agile-product-management-certification-training", "agile-product-management"],
];

function interestForSlug(slug: string): CourseInterest | null {
  const label = COURSE_LABELS[slug];
  if (!label) return null;
  return {
    slug,
    label,
    href: `/courses/${slug}`,
    scheduleHref: `/courses/${slug}/schedule`,
    priceUsd: null,
  };
}

export function courseInterestFromPath(path: string): CourseInterest | null {
  const course = path.match(/^\/courses\/([a-z0-9-]+)/);
  if (course?.[1]) return interestForSlug(course[1]);

  for (const [hub, slug] of HUB_TO_SLUG) {
    if (path.includes(hub)) return interestForSlug(slug);
  }

  if (/^\/(popm-pro-class|popmpro|popm-prep-pro|popm-practice-temp)/.test(path)) {
    return interestForSlug("product-owner-manager");
  }
  if (/^\/(leading-safe-pro-class|leading-safepro|leading-safe-pro-temp)/.test(path)) {
    return interestForSlug("leading-safe");
  }
  if (/^\/(scrum-master-pro-class|ssmpro|scrum-master-pro-temp)/.test(path)) {
    return interestForSlug("scrum-master");
  }
  if (/^\/(lpm-pro-class|lpmpro|lpm-pro-temp)/.test(path)) {
    return interestForSlug("lean-portfolio-management");
  }
  if (/^\/(apm-pro-class|apm-pro-temp)/.test(path)) {
    return interestForSlug("agile-product-management");
  }
  return null;
}

export function courseInterestFromVisitor(
  pages: Array<{ path: string }>,
  currentPath?: string,
): CourseInterest | null {
  if (currentPath) {
    const now = courseInterestFromPath(currentPath);
    if (now) return now;
  }
  for (let i = pages.length - 1; i >= 0; i -= 1) {
    const found = courseInterestFromPath(pages[i]?.path || "");
    if (found) return found;
  }
  return null;
}

export function lastCourseLabel(pages: Array<{ path: string }>): string | null {
  for (let i = pages.length - 1; i >= 0; i -= 1) {
    const path = pages[i]?.path || "";
    if (path.startsWith("/courses/") || path.startsWith("/combo-courses") || path.startsWith("/corporate")) {
      return labelPath(path);
    }
  }
  return null;
}

export const OPENING_MESSAGE =
  "We offer special pricing for self-paying professionals and those who are between jobs. The certification exam fee is included, and 98% of our students pass the exam.\n\nWhich course are you interested in?";

export function greetingFor(_profile?: VisitorProfile, _currentPath?: string): string {
  return OPENING_MESSAGE;
}

export function startersFor(profile: VisitorProfile): string[] {
  const pages = profile.pages;
  const lastCourse = [...pages].reverse().find((page) => page.path.startsWith("/courses/"));
  const slug = lastCourse?.path.split("/")[2] || "";
  const label = COURSE_LABELS[slug];
  const onCheckout = pages.some((page) => page.path.includes("/checkout"));
  const onRefund = pages.some((page) => page.path.includes("refund"));
  const onCorporate = pages.some((page) => page.path.startsWith("/corporate"));

  const starters: string[] = [];
  if (onCheckout && label) starters.push(`Finish enrolling in ${label}`);
  if (label) starters.push(`Next ${label} date`);
  if (onRefund) starters.push("Can I get a refund?");
  if (onCorporate) starters.push("I need this for a team");
  starters.push("Which cert should I start with?");
  starters.push("Any discount right now?");
  if (!onRefund) starters.push("Can I get a refund?");
  return [...new Set(starters)].slice(0, 3);
}
