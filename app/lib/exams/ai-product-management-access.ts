import { createClient } from "@/app/lib/supabase/server";
import { getRegisteredCourseSlugs } from "@/app/lib/practice-exams";
import { resolvePracticeExamCourseIds } from "@/app/lib/grant-pro-practice-access";

/** Owner / instructor emails that can always open the exam for preview and QA. */
const OWNER_PREVIEW_EMAILS = new Set([
  "d.stevenson@agile36.com",
  "deadrastevenson@gmail.com",
  "deadra@agile36.com",
]);

function distinctEmails(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): string[] {
  const a = authEmail?.trim() ?? "";
  const p = profileEmail?.trim() ?? "";
  return [...new Set([p, a].filter((e) => e.length > 0))];
}

/** True when the signed-in user bought Certified AI Product Manager (or is an owner). */
export async function hasAiProductManagementExamAccess(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("email")
    .eq("user_id", user.id)
    .maybeSingle();

  const emails = distinctEmails(user.email, profile?.email);
  if (emails.some((e) => OWNER_PREVIEW_EMAILS.has(e.toLowerCase()))) {
    return true;
  }

  const slugs = await getRegisteredCourseSlugs();
  return slugs.some((slug) =>
    resolvePracticeExamCourseIds(slug).includes("certified-ai-product-manager")
  );
}
