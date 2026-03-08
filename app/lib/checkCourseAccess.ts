import { createClient } from '@/app/lib/supabase/server';

export async function checkProAccess(courseId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('user_access')
    .select('plan_type')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .single();

  return data?.plan_type === 'pro';
}
