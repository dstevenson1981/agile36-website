import { getRegisteredCourseSlugs } from "@/app/lib/practice-exams";
import { createClient } from "@/app/lib/supabase/server";
import path from "path";

/** Owner emails that can always open AI PM materials for QA. */
const OWNER_PREVIEW_EMAILS = new Set([
  "d.stevenson@agile36.com",
  "d.stevenso1@agile36.com",
  "deadrastevenson@gmail.com",
  "deadra@agile36.com",
]);

export const AI_PM_COURSEBOOK = {
  courseSlug: "certified-ai-product-manager",
  title: "AI Product Management Coursebook",
  description: "Official digital coursebook for Certified AI Product Manager.",
  fileName: "AI-Product-Management.pdf",
  downloadName: "Agile36-AI-Product-Management-Coursebook.pdf",
  /** Absolute path on disk (not web-accessible). */
  absolutePath: path.join(
    process.cwd(),
    "content/coursebooks/AI-Product-Management.pdf"
  ),
  apiPath: "/api/account/coursebooks/ai-product-management",
} as const;

function matchesAiPmSlug(slug: string): boolean {
  const s = slug.trim().toLowerCase();
  return (
    s === "certified-ai-product-manager" ||
    s.includes("ai-product-manager") ||
    s.includes("ai-product-management")
  );
}

/** True when the signed-in user is enrolled in Certified AI Product Manager (or is an owner). */
export async function hasAiProductManagementCourseAccess(): Promise<boolean> {
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

  const emails = [user.email, profile?.email]
    .map((e) => e?.trim().toLowerCase())
    .filter((e): e is string => Boolean(e));
  if (emails.some((e) => OWNER_PREVIEW_EMAILS.has(e))) return true;

  const slugs = await getRegisteredCourseSlugs();
  return slugs.some(matchesAiPmSlug);
}

export type AccountMaterial = {
  id: string;
  title: string;
  description: string;
  courseName: string;
  href: string;
};

/** Materials visible on /account/materials for the current user. */
export async function getAccountMaterials(): Promise<AccountMaterial[]> {
  const materials: AccountMaterial[] = [];
  if (await hasAiProductManagementCourseAccess()) {
    materials.push({
      id: "ai-product-management-coursebook",
      title: AI_PM_COURSEBOOK.title,
      description: AI_PM_COURSEBOOK.description,
      courseName: "Certified AI Product Manager",
      href: AI_PM_COURSEBOOK.apiPath,
    });
  }
  return materials;
}
