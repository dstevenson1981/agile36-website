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

/** Check if the logged-in user has Pro plan for LPM (lean-portfolio-management) */
export async function hasLpmProAccess(): Promise<boolean> {
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

  // Check for Pro order
  const { data: orders } = await supabase
    .from('orders')
    .select('id')
    .eq('customer_email', lookupEmail)
    .eq('course_slug', 'lean-portfolio-management')
    .eq('plan', 'pro')
    .limit(1);

  if ((orders?.length ?? 0) > 0) return true;

  // Check whitelist (grants access without Pro order)
  const { data: whitelist } = await supabase
    .from('lpm_pro_access_whitelist')
    .select('id')
    .eq('email', lookupEmail.toLowerCase())
    .limit(1);

  return (whitelist?.length ?? 0) > 0;
}
