import { getRegisteredCourseSlugs } from "@/app/lib/practice-exams";

/** True when the signed-in user has a paid order for Certified AI Product Manager. */
export async function hasAiProductManagementExamAccess(): Promise<boolean> {
  const slugs = await getRegisteredCourseSlugs();
  return slugs.some((slug) => {
    const s = slug.trim().toLowerCase();
    return (
      s === "certified-ai-product-manager" ||
      s.includes("ai-product-manager") ||
      s.includes("ai-product-management")
    );
  });
}
