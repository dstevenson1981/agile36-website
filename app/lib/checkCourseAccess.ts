import { createClient } from '@/app/lib/supabase/server';
import { resolvePracticeExamCourseIds } from '@/app/lib/grant-pro-practice-access';

function distinctEmails(authEmail?: string, profileEmail?: string | null): string[] {
  const a = authEmail?.trim() ?? '';
  const p = profileEmail?.trim() ?? '';
  return [...new Set([p, a].filter((e) => e.length > 0))];
}

/** True when the signed-in user has a Pro order that covers this practice-exam course. */
export async function checkProAccess(courseId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  for (const em of distinctEmails(user.email, profile?.email)) {
    const { data: orders } = await supabase
      .from('orders')
      .select('course_slug')
      .ilike('customer_email', em)
      .eq('plan', 'pro')
      .limit(25);

    if (
      orders?.some((o) =>
        resolvePracticeExamCourseIds(o.course_slug || '').includes(courseId),
      )
    ) {
      return true;
    }
  }

  return false;
}
