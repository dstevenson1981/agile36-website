import { createClient } from "@supabase/supabase-js";
import type { CourseScheduleRow } from "@/app/lib/schedule-display";

export async function fetchActiveCourseSchedules(
  courseSlug: string
): Promise<CourseScheduleRow[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return [];

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let query = supabase
    .from("course_schedules")
    .select("*")
    .eq("status", "active")
    .eq("course_slug", courseSlug)
    .gte("start_date", new Date().toISOString())
    .or("hidden.is.null,hidden.eq.false")
    .order("start_date", { ascending: true });

  let { data, error } = await query;

  if (
    error &&
    (error.code === "42703" || String(error.message).includes('column "hidden" does not exist'))
  ) {
    const retry = await supabase
      .from("course_schedules")
      .select("*")
      .eq("status", "active")
      .eq("course_slug", courseSlug)
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true });
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error("fetchActiveCourseSchedules:", error.message);
    return [];
  }

  return (data || []) as CourseScheduleRow[];
}
