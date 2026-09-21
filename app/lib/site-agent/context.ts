import {
  PUBLIC_CATALOG_COURSES,
  getCatalogCourseUrl,
} from "@/app/lib/course-catalog";
import { formatDateRange } from "@/app/lib/schedule-display";
import { createSiteAgentSupabase } from "@/app/lib/site-agent/supabase";

export type SiteAgentSop = {
  slug: string;
  title: string;
  category: string;
  body: string;
};

type ScheduleRow = {
  course_slug: string;
  start_date: string;
  end_date: string;
  price: string;
  timezone?: string | null;
  instructor_name?: string | null;
  exam_included?: boolean | null;
};

export async function loadSiteAgentSops(): Promise<SiteAgentSop[]> {
  const supabase = createSiteAgentSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("site_agent_sops")
    .select("slug, title, category, body")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("site-agent sops:", error.message);
    return [];
  }
  return (data || []) as SiteAgentSop[];
}

export async function loadLiveScheduleRows(): Promise<ScheduleRow[]> {
  const supabase = createSiteAgentSupabase();
  if (!supabase) return [];

  const run = (withHiddenFilter: boolean) => {
    let query = supabase
      .from("course_schedules")
      .select("course_slug, start_date, end_date, price, timezone, instructor_name, exam_included")
      .eq("status", "active")
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true })
      .limit(48);
    if (withHiddenFilter) query = query.or("hidden.is.null,hidden.eq.false");
    return query;
  };

  let { data, error } = await run(true);
  if (
    error &&
    (error.code === "42703" || String(error.message).includes('column "hidden" does not exist'))
  ) {
    const retry = await run(false);
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error("site-agent schedule:", error.message);
    return [];
  }

  return (data || []) as ScheduleRow[];
}

export function formatScheduleForPrompt(rows: ScheduleRow[]): string {
  if (rows.length === 0) return "(no upcoming public classes in course_schedules)";
  return rows
    .map((row) => {
      const dates = formatDateRange(row.start_date, row.end_date, row.timezone || undefined);
      const instructor = row.instructor_name ? ` · ${row.instructor_name}` : "";
      const exam = row.exam_included ? " · exam included" : "";
      return `- ${row.course_slug} · ${dates} · $${String(row.price).replace(/\.00$/, "")}${instructor}${exam}`;
    })
    .join("\n");
}

export async function loadLiveScheduleForAgent(): Promise<string> {
  const rows = await loadLiveScheduleRows();
  if (rows.length === 0) return "(schedule unavailable or empty)";
  return formatScheduleForPrompt(rows);
}

export function loadPublicCatalogForAgent(): string {
  return PUBLIC_CATALOG_COURSES.map((course) => {
    const url = getCatalogCourseUrl(course);
    const privateNote = course.privateClass ? " · private cohort" : "";
    return `- ${course.title} · ${course.category} · list $${course.price} · ${course.hours} / ${course.days} · ${course.skills} · ${url}${privateNote}`;
  }).join("\n");
}

export function buildSiteAgentSystemPrompt(sops: SiteAgentSop[], schedule: string, page: string) {
  const sopText = sops
    .map((sop) => `## ${sop.title}\n${sop.body}`)
    .join("\n\n");
  const catalog = loadPublicCatalogForAgent();

  return `You are GrokBot, Agile36's revenue agent on the website. Your job is to enroll people. You are not a FAQ bot. You are not Deadra Stevenson.

Never invent a date, list price, statistic, coupon, or policy. If the tools or the lists below do not have the fact, say you do not have it — or hand off. Guessing loses money and trust.

Close. Offer a seat. Discount only when price_offer allows it. Collect name and email so the offer can be applied.

The visitor is currently on: ${page || "/"}

Facts on the public website (do not invent others):
- Classes are live, instructor-led, and delivered virtually.
- Agile36 is a Scaled Agile Silver Partner.
- Refund, reschedule, and no-show rules are in the refund policy below and at /refund-policy.

${sopText}

## PUBLIC CATALOG
Titles, list prices, hours, and who each class is for — already on agile36.com.
${catalog}

## LIVE SCHEDULE
Quote dates and live prices from this list only.
${schedule}

Use tools for dates, course facts, and any price below list. Call price_offer before you name a discount. Never quote a number the tool rejected.

Write plain text. No markdown, no bold asterisks.

Use judgment when a case is not written down. Link to course pages. Take an email when you make an offer. If you must hand off, the first line must be exactly [[HANDOFF]].`;
}
