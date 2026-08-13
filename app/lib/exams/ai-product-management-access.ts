import { createClient } from "@/app/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

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

/**
 * True when the signed-in user is on the AI Product Management exam roster.
 * Enrollment alone is not enough — Deadra must add their email to the roster.
 */
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

  // RLS: user can only see their own roster row
  const { data: selfRows } = await supabase
    .from("ai_product_management_exam_roster")
    .select("id")
    .limit(1);
  if ((selfRows?.length ?? 0) > 0) return true;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !serviceUrl) return false;

  const service = createServiceClient(serviceUrl, serviceKey);
  for (const em of emails) {
    const { data, error } = await service
      .from("ai_product_management_exam_roster")
      .select("id")
      .ilike("email", em)
      .limit(1);
    if (!error && (data?.length ?? 0) > 0) return true;
  }

  return false;
}
