import { createClient } from "@supabase/supabase-js";
import { COMBO_COURSES } from "@/app/combo-courses/data";
import {
  PUBLIC_CATALOG_COURSES,
  getCatalogCourseAcronym,
  getCatalogCourseSlug,
  getCatalogCourseUrl,
  getCatalogScheduleUrl,
  type CatalogCourse,
} from "@/app/lib/course-catalog";
import { formatDateRange, formatHoursPerDay, formatTimezoneLabel } from "@/app/lib/schedule-display";
import { searchSite } from "@/app/lib/site-search";
import { decideDiscount, fetchLivePromos, publicSaleFromSupabase } from "./promos";

const SITE = "https://www.agile36.com";

export type AssistantAction = { label: string; href: string };

export type ToolResult = {
  data: unknown;
  actions?: AssistantAction[];
  handoff?: boolean;
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asLimit(value: unknown, fallback: number, max: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(Math.floor(n), max);
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function courseRecord(course: CatalogCourse) {
  const path = getCatalogCourseUrl(course);
  const slug = getCatalogCourseSlug(course);
  return {
    slug,
    acronym: getCatalogCourseAcronym(course.title),
    title: course.title,
    category: course.category,
    priceUsd: course.price,
    originalPriceUsd: course.originalPrice,
    duration: course.days,
    hours: course.hours,
    skills: course.skills,
    url: `${SITE}${path}`,
    scheduleUrl: `${SITE}${getCatalogScheduleUrl(course)}`,
  };
}

export function findPublicCourse(query: string): CatalogCourse | null {
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

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const ASSISTANT_TOOL_DEFS = [
  {
    type: "function" as const,
    function: {
      name: "list_courses",
      description: "List public courses with list prices and URLs. Filter by category or keywords.",
      parameters: {
        type: "object",
        properties: {
          category: { type: "string", enum: ["SAFe", "Generative AI", "AI Product"] },
          query: { type: "string" },
          limit: { type: "integer", minimum: 1, maximum: 30 },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_course",
      description: "One course by slug, acronym (POPM, LPM, SSM), or title.",
      parameters: {
        type: "object",
        properties: { slugOrTitle: { type: "string" } },
        required: ["slugOrTitle"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "list_schedules",
      description:
        "Upcoming live class dates and checkout prices. Always call this before naming a date. courseSlug accepts a catalog slug or acronym (POPM, LPM, SSM).",
      parameters: {
        type: "object",
        properties: {
          courseSlug: { type: "string" },
          limit: { type: "integer", minimum: 1, maximum: 20 },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_promo",
      description:
        "Read live promo_codes from Supabase. Public sale first. Call this before naming a discount.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "decide_discount",
      description:
        "Read live promo_codes and this visitor's checkout lead, then pick ONE code. Use when they ask for a discount or for more off. Codes do not stack.",
      parameters: {
        type: "object",
        properties: {
          courseSlug: { type: "string", description: "Catalog slug or acronym, e.g. POPM" },
          askedForMore: { type: "boolean", description: "True if they asked for extra off on top of the sale" },
          seats: { type: "integer", minimum: 1, maximum: 100 },
          isCombo: { type: "boolean" },
          email: { type: "string", description: "Their email, if we have it" },
          listPriceUsd: { type: "number" },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_policies",
      description: "Refund, reschedule, exam, format, and contact facts.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "search_site",
      description: "Search public pages: courses, combos, practice exams.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
          limit: { type: "integer", minimum: 1, maximum: 12 },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "enroll_link",
      description: "Offer a checkout button for a specific class. Call after you pick a schedule id. Does not move the page.",
      parameters: {
        type: "object",
        properties: {
          courseSlug: { type: "string" },
          scheduleId: { type: "string" },
          label: { type: "string", description: "Button label, e.g. Enroll Sep 17 POPM" },
        },
        required: ["courseSlug", "scheduleId"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "save_follow_up",
      description: "Save a visitor email so Agile36 can follow up. Only if they gave the address.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          interest: { type: "string" },
        },
        required: ["email"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "lookup_person",
      description:
        "Look up paid orders and checkout leads. On the public site, only by the visitor's own email.",
      parameters: {
        type: "object",
        properties: {
          email: { type: "string" },
          name: { type: "string" },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "recent_checkouts",
      description: "Recent unpaid checkout leads and recent paid orders. Use when she asks what is happening.",
      parameters: {
        type: "object",
        properties: {
          days: { type: "integer", minimum: 1, maximum: 90 },
        },
      },
    },
  },
];

const PUBLIC_TOOL_NAMES = new Set([
  "list_courses",
  "get_course",
  "list_schedules",
  "get_promo",
  "decide_discount",
  "get_policies",
  "search_site",
  "enroll_link",
  "save_follow_up",
  "lookup_person",
]);

export const PUBLIC_ASSISTANT_TOOL_DEFS = ASSISTANT_TOOL_DEFS.filter((tool) =>
  PUBLIC_TOOL_NAMES.has(tool.function.name),
);

export async function runAssistantTool(
  name: string,
  rawArgs: unknown,
  mode: "public" | "owner" = "public",
): Promise<ToolResult> {
  const args = rawArgs && typeof rawArgs === "object" ? (rawArgs as Record<string, unknown>) : {};

  if (name === "list_courses") {
    const category = asText(args.category);
    const query = normalize(asText(args.query));
    const limit = asLimit(args.limit, 20, 30);
    const courses = PUBLIC_CATALOG_COURSES.filter((course) => {
      if (category && course.category !== category) return false;
      if (!query) return true;
      return normalize(
        `${course.title} ${course.skills} ${getCatalogCourseSlug(course)} ${getCatalogCourseAcronym(course.title)}`,
      ).includes(query);
    })
      .slice(0, limit)
      .map(courseRecord);
    const combos = COMBO_COURSES.slice(0, 6).map((combo) => ({
      id: combo.id,
      name: combo.name,
      comboPriceUsd: combo.comboPrice,
      originalPriceUsd: combo.originalPrice,
      url: `${SITE}/combo-courses`,
    }));
    return { data: { courses, combos: query ? [] : combos } };
  }

  if (name === "get_course") {
    const slugOrTitle = asText(args.slugOrTitle);
    const course = findPublicCourse(slugOrTitle);
    if (!course) return { data: { found: false, slugOrTitle } };
    return { data: { found: true, course: courseRecord(course) } };
  }

  if (name === "list_schedules") {
    const requested = asText(args.courseSlug);
    const matched = requested ? findPublicCourse(requested) : null;
    const courseSlug = matched ? getCatalogCourseSlug(matched) : requested;
    const limit = asLimit(args.limit, 8, 20);
    const supabase = supabaseAdmin();
    if (!supabase) return { data: { error: "Schedule lookup is not configured." } };

    let query = supabase
      .from("course_schedules")
      .select(
        "id, course_slug, course_name, start_date, end_date, start_time, end_time, timezone, duration, is_weekend, instructor_name, price, original_price, exam_included",
      )
      .eq("status", "active")
      .or("hidden.is.null,hidden.eq.false")
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true })
      .limit(limit);

    if (courseSlug) query = query.eq("course_slug", courseSlug);

    const { data, error } = await query;
    if (error) return { data: { error: error.message } };

    const classes = (data ?? []).map((row) => {
      const slug = String(row.course_slug ?? courseSlug ?? "");
      const start = String(row.start_date ?? "");
      const end = String(row.end_date ?? "");
      const timezone = String(row.timezone ?? "America/New_York");
      return {
        scheduleId: row.id,
        courseSlug: slug,
        courseName: row.course_name,
        dates: start && end ? formatDateRange(start, end, timezone) : null,
        hoursPerDay: formatHoursPerDay(String(row.start_time ?? ""), String(row.end_time ?? "")),
        timezone: formatTimezoneLabel(timezone),
        weekend: Boolean(row.is_weekend),
        instructor: row.instructor_name ?? null,
        priceUsd: row.price != null ? Number(row.price) : null,
        originalPriceUsd: row.original_price != null ? Number(row.original_price) : null,
        examIncluded: Boolean(row.exam_included),
        enrollUrl: slug && row.id ? `${SITE}/courses/${slug}/schedule/checkout?schedule=${row.id}&course=${slug}` : null,
      };
    });
    return { data: { count: classes.length, classes } };
  }

  if (name === "get_promo") {
    const sale = await publicSaleFromSupabase();
    if (mode === "owner") {
      const { promos, error } = await fetchLivePromos();
      return { data: { sale, liveCodes: promos, error } };
    }
    return { data: sale };
  }

  if (name === "decide_discount") {
    const offer = await decideDiscount({
      courseSlug: asText(args.courseSlug) || undefined,
      askedForMore: args.askedForMore === true,
      seats: typeof args.seats === "number" ? args.seats : undefined,
      isCombo: args.isCombo === true,
      email: asText(args.email).toLowerCase() || undefined,
      listPriceUsd: typeof args.listPriceUsd === "number" ? args.listPriceUsd : undefined,
    });
    return { data: offer };
  }

  if (name === "get_policies") {
    return {
      data: {
        format: "Live virtual, instructor-led. Most SAFe classes are 2 days; APM and RTE are 3 days.",
        exam: "The certification exam fee is included in the course price for SAFe classes.",
        passRate: "98% of Agile36 students pass the certification exam.",
        selfPayDiscount:
          "Discounts are available for people who are between jobs or paying out of pocket. If they say that's them, call decide_discount with askedForMore true and give the one code it returns. Do not invent a code in the opening.",
        refund:
          "Full refund if they cancel 30 or more days before the original start, at full (non-promo) price. No refund inside 30 days. Promo or discounted registrations are never refundable.",
        reschedule: "Free if they email at least 24 hours before start. Customer-requested reschedules are not refundable.",
        noShow: "No refund, credit, or transfer.",
        contact: {
          phone: "+1-310-620-7966",
          email: "d.stevenson@agile36.com",
          corporate: `${SITE}/corporate`,
          refundPolicy: `${SITE}/refund-policy`,
        },
      },
    };
  }

  if (name === "search_site") {
    const query = asText(args.query);
    if (!query) return { data: { error: "query is required." } };
    const limit = asLimit(args.limit, 8, 12);
    const result = searchSite(query, limit);
    return {
      data: {
        query,
        results: result.results.map((item) => ({
          type: item.type,
          title: item.title,
          url: item.href.startsWith("http") ? item.href : `${SITE}${item.href}`,
          priceUsd: item.price ?? null,
        })),
      },
    };
  }

  if (name === "enroll_link") {
    const requested = asText(args.courseSlug);
    const matched = requested ? findPublicCourse(requested) : null;
    const courseSlug = matched ? getCatalogCourseSlug(matched) : requested;
    const scheduleId = asText(args.scheduleId);
    if (!courseSlug || !scheduleId) return { data: { error: "courseSlug and scheduleId are required." } };
    const href = `/courses/${courseSlug}/schedule/checkout?schedule=${scheduleId}&course=${courseSlug}`;
    const label = asText(args.label) || "Enroll in this class";
    return {
      data: { href: `${SITE}${href}`, courseSlug, scheduleId },
      actions: [{ label, href }],
    };
  }

  if (name === "save_follow_up") {
    const email = asText(args.email);
    if (!email.includes("@")) return { data: { error: "Need a real email." } };
    const supabase = supabaseAdmin();
    if (!supabase) return { data: { error: "Could not save the follow-up." } };
    const { error } = await supabase.from("assessment_emails").insert({
      name: asText(args.name) || null,
      email,
      source: "Site assistant",
      exam_name: asText(args.interest) || null,
      message: asText(args.interest) || null,
      created_at: new Date().toISOString(),
    });
    if (error) return { data: { error: error.message } };
    return { data: { saved: true, email } };
  }

  if (name === "lookup_person") {
    const email = asText(args.email).toLowerCase();
    const name = asText(args.name);
    if (mode === "public" && !email.includes("@")) {
      return { data: { error: "Ask them for the email they used at checkout." } };
    }
    if (!email && !name) return { data: { error: "Need an email or a name." } };
    const supabase = supabaseAdmin();
    if (!supabase) return { data: { error: "Database is not configured." } };

    let orderQuery = supabase
      .from("orders")
      .select(
        "id, created_at, payment_status, amount, currency, course_name, course_slug, customer_email, customer_name, customer_phone, promo_code, schedule_date, plan, quantity",
      )
      .order("created_at", { ascending: false })
      .limit(20);
    let leadQuery = supabase
      .from("enrollment_leads")
      .select("id, created_at, status, email, first_name, last_name, phone, course_slug, course_name")
      .order("created_at", { ascending: false })
      .limit(20);

    if (email) {
      const safeEmail = email.replace(/[%_]/g, "");
      orderQuery = orderQuery.ilike("customer_email", safeEmail);
      leadQuery = leadQuery.ilike("email", safeEmail);
    } else {
      orderQuery = orderQuery.ilike("customer_name", `%${name}%`);
      leadQuery = leadQuery.or(`first_name.ilike.%${name}%,last_name.ilike.%${name}%`);
    }

    const [orders, leads] = await Promise.all([orderQuery, leadQuery]);
    if (mode === "public") {
      return {
        data: {
          orders: (orders.data ?? []).map((row) => ({
            created_at: row.created_at,
            payment_status: row.payment_status,
            amount: row.amount,
            currency: row.currency,
            course_name: row.course_name,
            course_slug: row.course_slug,
            promo_code: row.promo_code,
            schedule_date: row.schedule_date,
            plan: row.plan,
            quantity: row.quantity,
          })),
          leads: (leads.data ?? []).map((row) => ({
            created_at: row.created_at,
            status: row.status,
            course_name: row.course_name,
            course_slug: row.course_slug,
          })),
          orderError: orders.error?.message ?? null,
          leadError: leads.error?.message ?? null,
        },
      };
    }
    return {
      data: {
        orders: orders.data ?? [],
        orderError: orders.error?.message ?? null,
        leads: leads.data ?? [],
        leadError: leads.error?.message ?? null,
      },
    };
  }

  if (name === "recent_checkouts") {
    if (mode !== "owner") return { data: { error: "Not available." } };
    const days = asLimit(args.days, 14, 90);
    const since = new Date(Date.now() - days * 86400000).toISOString();
    const supabase = supabaseAdmin();
    if (!supabase) return { data: { error: "Database is not configured." } };

    const [orders, leads] = await Promise.all([
      supabase
        .from("orders")
        .select(
          "id, created_at, payment_status, amount, course_name, customer_email, customer_name, promo_code",
        )
        .gte("created_at", since)
        .eq("payment_status", "succeeded")
        .order("created_at", { ascending: false })
        .limit(25),
      supabase
        .from("enrollment_leads")
        .select("id, created_at, status, email, first_name, last_name, course_name")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(25),
    ]);

    return {
      data: {
        since,
        paid: orders.data ?? [],
        paidError: orders.error?.message ?? null,
        leads: leads.data ?? [],
        leadError: leads.error?.message ?? null,
      },
    };
  }

  return { data: { error: `Unknown tool: ${name}` } };
}
