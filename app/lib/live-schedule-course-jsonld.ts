import { createClient } from "@supabase/supabase-js";
import type { LocationSegment } from "@/app/lib/location-training-metadata";
import { SAF_TRAINING_HUBS } from "@/app/lib/saf-training-hubs";
import {
  SCHEMA_DEFAULT_OG_IMAGE_URL,
  SCHEMA_INSTRUCTOR_DEADRA_STEVENSON_ID,
  SCHEMA_INSTRUCTOR_JOE_PUOCI_ID,
  SCHEMA_INSTRUCTOR_MARCUS_BALL_ID,
  SCHEMA_INSTRUCTOR_PERSON_NODES,
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_VIRTUAL_CLASS_SCHEDULE,
} from "@/app/lib/schema-site";

const SITE = "https://www.agile36.com";

declare global {
  /** Dedupes missing-env warnings across repeated fetches (one line per Node worker during build). */
  var __agile36SupabaseJsonLdEnvWarned: boolean | undefined;
}

function warnMissingSupabaseEnvOnce(): void {
  if (globalThis.__agile36SupabaseJsonLdEnvWarned) return;
  globalThis.__agile36SupabaseJsonLdEnvWarned = true;
  console.warn(
    "[fetchScheduleJsonLdCohorts] Supabase env missing — Course JSON-LD omits hasCourseInstance until NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) are configured."
  );
}

export type ScheduleCohortJsonLd = {
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  instructorRefId: string | null;
  instructorName: string;
};

export type ScheduleJsonLdFetchResult =
  | { status: "ok"; cohorts: ScheduleCohortJsonLd[] }
  | { status: "empty" }
  | { status: "error" };

type ScheduleRow = {
  start_date: string;
  end_date: string;
  instructor_name: string | null;
  price: number | string | null;
  currency: string | null;
};

function toDateOnly(value: string): string {
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(value);
  if (m) return m[1];
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value.slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function parsePrice(n: number | string | null | undefined): number {
  if (n == null || n === "") return NaN;
  return typeof n === "number" ? n : Number(n);
}

function resolveInstructor(
  raw: string | null | undefined
): { refId: string | null; name: string } {
  const t = (raw ?? "").trim();
  if (!t) {
    return { refId: null, name: "Agile36 certified instructor" };
  }
  const lower = t.toLowerCase();
  if (lower.includes("marcus") && lower.includes("ball")) {
    return { refId: SCHEMA_INSTRUCTOR_MARCUS_BALL_ID, name: "Marcus Ball" };
  }
  if (lower.includes("marcus")) {
    return { refId: SCHEMA_INSTRUCTOR_MARCUS_BALL_ID, name: "Marcus Ball" };
  }
  if (lower.includes("deadra")) {
    return { refId: SCHEMA_INSTRUCTOR_DEADRA_STEVENSON_ID, name: "Deadra Stevenson" };
  }
  if (lower.includes("puoci")) {
    return { refId: SCHEMA_INSTRUCTOR_JOE_PUOCI_ID, name: "Joe Puoci" };
  }
  return { refId: null, name: t };
}

function rowToCohort(row: ScheduleRow): ScheduleCohortJsonLd | null {
  const startDate = toDateOnly(row.start_date);
  const endDate = toDateOnly(row.end_date);
  const price = parsePrice(row.price);
  const currency = (row.currency || "USD").trim() || "USD";
  const inst = resolveInstructor(row.instructor_name);
  if (Number.isNaN(price) || price <= 0) {
    return null;
  }
  return {
    startDate,
    endDate,
    price,
    currency,
    instructorRefId: inst.refId,
    instructorName: inst.name,
  };
}

/** Next `limit` future rows from `course_schedules` (same filters as `/api/course-schedules`). */
export async function fetchScheduleJsonLdCohorts(
  courseSlug: string,
  limit = 3
): Promise<ScheduleJsonLdFetchResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    warnMissingSupabaseEnvOnce();
    return { status: "error" };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    let query = supabase
      .from("course_schedules")
      .select("start_date,end_date,instructor_name,price,currency")
      .eq("status", "active")
      .or("hidden.is.null,hidden.eq.false")
      .eq("course_slug", courseSlug)
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true })
      .limit(limit);

    let { data, error } = await query;

    if (
      error &&
      (error.code === "42703" ||
        String(error.message).includes('column "hidden" does not exist'))
    ) {
      query = supabase
        .from("course_schedules")
        .select("start_date,end_date,instructor_name,price,currency")
        .eq("status", "active")
        .eq("course_slug", courseSlug)
        .gte("start_date", new Date().toISOString())
        .order("start_date", { ascending: true })
        .limit(limit);
      const retry = await query;
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error(
        "[fetchScheduleJsonLdCohorts] Query failed:",
        courseSlug,
        error.message
      );
      return { status: "error" };
    }

    const rows = (data || []) as ScheduleRow[];
    const cohorts = rows
      .map((r) => rowToCohort(r))
      .filter((c): c is ScheduleCohortJsonLd => c != null);

    if (!cohorts.length) {
      return { status: "empty" };
    }
    return { status: "ok", cohorts };
  } catch (e) {
    console.error("[fetchScheduleJsonLdCohorts] Exception:", courseSlug, e);
    return { status: "error" };
  }
}

export async function fetchScheduleJsonLdCohortsForSegment(
  segment: LocationSegment
): Promise<ScheduleJsonLdFetchResult> {
  const slug = SAF_TRAINING_HUBS[segment].courseSlug;
  return fetchScheduleJsonLdCohorts(slug, 3);
}

export function scheduleCohortInstructorField(
  cohort: ScheduleCohortJsonLd
): Record<string, unknown> {
  if (cohort.instructorRefId) {
    return { "@id": cohort.instructorRefId };
  }
  return {
    "@type": "Person",
    name: cohort.instructorName,
    jobTitle: "Agile36 Instructor",
  };
}

export function instructorPersonNodesForCohorts(
  cohorts: ScheduleCohortJsonLd[]
): Record<string, unknown>[] {
  const ids = new Set<string>();
  for (const c of cohorts) {
    if (c.instructorRefId) ids.add(c.instructorRefId);
  }
  return [...ids]
    .map((id) => SCHEMA_INSTRUCTOR_PERSON_NODES[id])
    .filter((n): n is Record<string, unknown> => Boolean(n));
}

function normalizeCredential(
  input: string | Record<string, unknown>
): Record<string, unknown> {
  if (typeof input === "string") {
    return {
      "@type": "EducationalOccupationalCredential",
      name: input,
      credentialCategory: "certification",
    };
  }
  return input;
}

export type LiveScheduleCourseHubConfig = {
  courseSlug: string;
  canonical: string;
  schedulePath: string;
  courseDisplayName: string;
  description: string;
  teaches: string[];
  imageUrl?: string;
  eventImageUrl?: string;
  breadcrumbLeafName: string;
  coursesCrumbLabel?: string;
  defaultPrice: number;
  defaultCurrency: string;
  timeRequired: string;
  inLanguage?: string;
  educationalCredentialAwarded: string | Record<string, unknown>;
  courseCode?: string;
  coursePrerequisites?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  offerExtras?: {
    validFrom?: string;
    priceValidUntil?: string;
    courseOfferUrl?: string;
    category?: string;
  };
};

function courseInstanceFromSchedule(
  cfg: LiveScheduleCourseHubConfig,
  cohort: ScheduleCohortJsonLd,
  index: number
): Record<string, unknown> {
  const scheduleUrl = `${SITE}${cfg.schedulePath}`;
  return {
    "@type": "CourseInstance",
    "@id": `${cfg.canonical}#instance-${index + 1}`,
    url: `${cfg.canonical}#instance-${index + 1}`,
    name: `${cfg.courseDisplayName} — cohort starting ${cohort.startDate}`,
    courseMode: "online",
    courseWorkload: cfg.timeRequired,
    courseSchedule: { ...SCHEMA_VIRTUAL_CLASS_SCHEDULE },
    startDate: cohort.startDate,
    endDate: cohort.endDate,
    location: {
      "@type": "VirtualLocation",
      url: cfg.canonical,
      name: "Live virtual classroom",
    },
    instructor: scheduleCohortInstructorField(cohort),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    offers: {
      "@type": "Offer",
      url: scheduleUrl,
      price: cohort.price,
      priceCurrency: cohort.currency,
    },
  };
}

function eventFromSchedule(
  cfg: LiveScheduleCourseHubConfig,
  courseId: string,
  cohort: ScheduleCohortJsonLd,
  index: number,
  eventImage: string
): Record<string, unknown> {
  const scheduleUrl = `${SITE}${cfg.schedulePath}`;
  return {
    "@type": "Event",
    "@id": `${cfg.canonical}#event-${index + 1}`,
    name: `${cfg.courseDisplayName} — cohort ${cohort.startDate} (live virtual)`,
    description: `Instructor-led public session for ${cfg.courseDisplayName}; schedule and enrollment on Agile36.`,
    startDate: cohort.startDate,
    endDate: cohort.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    about: { "@id": courseId },
    location: {
      "@type": "VirtualLocation",
      url: cfg.canonical,
      name: "Live virtual classroom",
    },
    organizer: { "@id": SCHEMA_ORGANIZATION_ID },
    performer: scheduleCohortInstructorField(cohort),
    offers: {
      "@type": "Offer",
      url: scheduleUrl,
      price: cohort.price,
      priceCurrency: cohort.currency,
      availability: "https://schema.org/InStock",
    },
    image: eventImage,
  };
}

/**
 * Course hub JSON-LD from live `course_schedules` only when rows exist.
 * On empty DB or query failure: Course without `hasCourseInstance` / cohort Events.
 */
export function buildLiveScheduleCourseGraphLd(
  cfg: LiveScheduleCourseHubConfig,
  scheduleResult: ScheduleJsonLdFetchResult
): Record<string, unknown> {
  const pageId = `${cfg.canonical}#webpage`;
  const courseId = `${cfg.canonical}#course`;
  const coursesMid = cfg.coursesCrumbLabel ?? "Courses";
  const imageUrl = cfg.imageUrl ?? SCHEMA_DEFAULT_OG_IMAGE_URL;
  const eventImage = cfg.eventImageUrl ?? imageUrl;
  const courseOfferUrl = cfg.offerExtras?.courseOfferUrl ?? cfg.canonical;

  const hasSchedule =
    scheduleResult.status === "ok" && scheduleResult.cohorts.length > 0;

  const firstOfferPrice = hasSchedule
    ? scheduleResult.cohorts[0].price
    : cfg.defaultPrice;
  const firstOfferCurrency = hasSchedule
    ? scheduleResult.cohorts[0].currency
    : cfg.defaultCurrency;

  const offerBase: Record<string, unknown> = {
    "@type": "Offer",
    price: firstOfferPrice,
    priceCurrency: firstOfferCurrency,
    availability: "https://schema.org/InStock",
    url: courseOfferUrl,
    category: cfg.offerExtras?.category ?? "Training / Certification",
  };
  if (cfg.offerExtras?.validFrom) {
    offerBase.validFrom = cfg.offerExtras.validFrom;
  }
  if (cfg.offerExtras?.priceValidUntil) {
    offerBase.priceValidUntil = cfg.offerExtras.priceValidUntil;
  }

  const courseNode: Record<string, unknown> = {
    "@type": "Course",
    "@id": courseId,
    name: cfg.courseDisplayName,
    url: cfg.canonical,
    description: cfg.description,
    image: imageUrl,
    provider: { "@id": SCHEMA_ORGANIZATION_ID },
    educationalCredentialAwarded: normalizeCredential(
      cfg.educationalCredentialAwarded
    ),
    teaches: cfg.teaches,
    timeRequired: cfg.timeRequired,
    inLanguage: cfg.inLanguage ?? "en-US",
    offers: offerBase,
    mainEntityOfPage: { "@id": pageId },
  };

  if (cfg.courseCode) {
    courseNode.courseCode = cfg.courseCode;
  }
  if (cfg.coursePrerequisites) {
    courseNode.coursePrerequisites = cfg.coursePrerequisites;
  }
  if (cfg.aggregateRating) {
    courseNode.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: cfg.aggregateRating.ratingValue,
      reviewCount: cfg.aggregateRating.reviewCount,
      ...(cfg.aggregateRating.bestRating != null
        ? { bestRating: cfg.aggregateRating.bestRating }
        : {}),
      ...(cfg.aggregateRating.worstRating != null
        ? { worstRating: cfg.aggregateRating.worstRating }
        : {}),
    };
  }

  const persons = hasSchedule
    ? instructorPersonNodesForCohorts(scheduleResult.cohorts)
    : [];

  if (hasSchedule) {
    courseNode.hasCourseInstance = scheduleResult.cohorts.map((c, i) =>
      courseInstanceFromSchedule(cfg, c, i)
    );
  }

  const events = hasSchedule
    ? scheduleResult.cohorts.map((c, i) =>
        eventFromSchedule(cfg, courseId, c, i, eventImage)
      )
    : [];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: coursesMid,
          item: `${SITE}/courses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: cfg.breadcrumbLeafName,
          item: cfg.canonical,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: cfg.canonical,
      name: cfg.courseDisplayName,
      description: cfg.description,
      isPartOf: { "@type": "WebSite", name: "Agile36", url: SITE },
      about: { "@id": courseId },
    },
    ...persons,
    courseNode,
    ...events,
  ];

  return { "@context": "https://schema.org", "@graph": graph };
}

export type SafCourseHubGraphOptions = {
  courseDisplayName: string;
  description: string;
  teaches: string[];
  breadcrumbLeafName: string;
  coursesCrumbLabel?: string;
  courseCode?: string;
  coursePrerequisites?: string;
  inLanguage?: string;
  imageUrl?: string;
  eventImageUrl?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  offerExtras?: {
    validFrom?: string;
    priceValidUntil?: string;
    courseOfferUrl?: string;
    category?: string;
  };
};

export function buildSafCourseHubGraphLd(
  segment: LocationSegment,
  opts: SafCourseHubGraphOptions,
  scheduleResult: ScheduleJsonLdFetchResult
): Record<string, unknown> {
  const hub = SAF_TRAINING_HUBS[segment];
  const canonical = `${SITE}${hub.coursePath}`;
  const credential = {
    "@type": "EducationalOccupationalCredential",
    name: hub.credentialName,
    credentialCategory: "certification",
    recognizedBy: {
      "@type": "Organization",
      name: hub.recognizedByName,
      url: hub.recognizedByUrl,
    },
  };

  return buildLiveScheduleCourseGraphLd(
    {
      courseSlug: hub.courseSlug,
      canonical,
      schedulePath: hub.schedulePath,
      courseDisplayName: opts.courseDisplayName,
      description: opts.description,
      teaches: opts.teaches,
      imageUrl: opts.imageUrl,
      eventImageUrl: opts.eventImageUrl,
      breadcrumbLeafName: opts.breadcrumbLeafName,
      coursesCrumbLabel: opts.coursesCrumbLabel,
      defaultPrice: hub.price,
      defaultCurrency: hub.currency,
      timeRequired: hub.timeRequired,
      inLanguage: opts.inLanguage,
      educationalCredentialAwarded: credential,
      courseCode: opts.courseCode,
      coursePrerequisites: opts.coursePrerequisites,
      aggregateRating: opts.aggregateRating,
      offerExtras: opts.offerExtras,
    },
    scheduleResult
  );
}
