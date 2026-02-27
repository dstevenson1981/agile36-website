import { createClient } from '@/app/lib/supabase/server';

/** Check if the logged-in user has Pro plan for POPM (product-owner-manager) */
export async function hasPopmProAccess(): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const email = user.email;
  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();
  const lookupEmail = profile?.email ?? email;

  const { data: orders } = await supabase
    .from('orders')
    .select('id')
    .eq('customer_email', lookupEmail)
    .eq('course_slug', 'product-owner-manager')
    .eq('plan', 'pro')
    .limit(1);

  return (orders?.length ?? 0) > 0;
}
