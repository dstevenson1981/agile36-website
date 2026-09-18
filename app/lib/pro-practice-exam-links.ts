import { createClient } from "@supabase/supabase-js";

export type ProPracticeExamLink = {
  course_slug: string;
  course_name: string;
  path: string;
};

function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/$/, "") || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function supabaseForLinks() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getActiveClassExamByPath(
  pathname: string
): Promise<ProPracticeExamLink | null> {
  const path = normalizePath(pathname);
  const supabase = supabaseForLinks();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("pro_practice_exam_links")
    .select("course_slug, course_name, path")
    .eq("path", path)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

