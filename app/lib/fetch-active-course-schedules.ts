import { createClient } from "@supabase/supabase-js";
import type { CourseScheduleRow } from "@/app/lib/schedule-display";

export async function fetchActiveCourseSchedules(
  courseSlug: string,
  options?: { includeHidden?: boolean }
): Promise<CourseScheduleRow[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return [];

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const includeHidden = options?.includeHidden === true;
  const softHiddenSlugs = new Set(["release-train-engineer"]);
  const allowHiddenList = includeHidden && softHiddenSlugs.has(courseSlug);

  const run = (withHiddenFilter: boolean) => {
    let query = supabase
      .from("course_schedules")
      .select("*")
      .eq("status", "active")
      .eq("course_slug", courseSlug)
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true });
    if (withHiddenFilter) {
      query = query.or("hidden.is.null,hidden.eq.false");
    }
    return query;
  };

  let { data, error } = await run(!allowHiddenList);

  if (
    error &&
    (error.code === "42703" || String(error.message).includes('column "hidden" does not exist'))
  ) {
    const retry = await run(false);
    data = retry.data;
    error = retry.error;
  } else if (error) {
    const retry = await run(!allowHiddenList);
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error("fetchActiveCourseSchedules:", error.message);
    return [];
  }

  return (data || []) as CourseScheduleRow[];
}
