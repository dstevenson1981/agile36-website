import { createClient } from '@/app/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { checkProAccess } from '@/app/lib/checkCourseAccess';

/** Check if the logged-in user has Pro plan for POPM (product-owner-manager) */
export async function hasPopmProAccess(): Promise<boolean> {
  // Prefer user_access table (grants from Stripe webhook)
  const fromUserAccess = await checkProAccess('product-owner-manager');
  if (fromUserAccess) return true;

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
  // Prefer user_access table (grants from Stripe webhook)
  const fromUserAccess = await checkProAccess('lean-portfolio-management');
  if (fromUserAccess) return true;

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

  // Check whitelist (grants access without Pro order) - use service role to bypass RLS
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !serviceUrl) return false;

  const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
  const { data: whitelist, error } = await serviceSupabase
    .from('lpm_pro_access_whitelist')
    .select('id')
    .ilike('email', lookupEmail)
    .limit(1);

  if (error) return false;
  return (whitelist?.length ?? 0) > 0;
}
