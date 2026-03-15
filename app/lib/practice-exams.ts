import { createClient } from '@/app/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { checkProAccess } from '@/app/lib/checkCourseAccess';

/** Get course slugs the user has registered for (any order, basic or pro) */
export async function getRegisteredCourseSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return [];

  const email = user.email;
  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();
  const lookupEmail = profile?.email ?? email;

  // Use ilike for case-insensitive email match (orders may have different casing)
  const { data: orders } = await supabase
    .from('orders')
    .select('course_slug')
    .ilike('customer_email', lookupEmail);

  if (!orders?.length) return [];
  return [...new Set(orders.map((o) => o.course_slug).filter(Boolean))];
}

/** Check if user has Basic (not Pro) for a course - eligible for $50 upgrade */
export async function hasBasicPlanForCourse(courseSlug: string): Promise<boolean> {
  const hasPro = await checkProAccess(courseSlug);
  if (hasPro) return false;

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
    .eq('course_slug', courseSlug)
    .eq('plan', 'basic')
    .limit(1);

  return (orders?.length ?? 0) > 0;
}

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

/** Check if the logged-in user has Pro plan for Leading SAFe (leading-safe) */
export async function hasLeadingSafeProAccess(): Promise<boolean> {
  const fromUserAccess = await checkProAccess('leading-safe');
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

  // Check orders - use ilike for case-insensitive email match
  const { data: orders } = await supabase
    .from('orders')
    .select('id, course_slug')
    .ilike('customer_email', lookupEmail)
    .eq('plan', 'pro')
    .limit(10);

  const hasLeadingSafeOrder = orders?.some(
    (o) => o.course_slug === 'leading-safe' || o.course_slug?.startsWith('combo-leading-safe')
  );
  if (hasLeadingSafeOrder) return true;

  // Check whitelist (grants access without Pro order) - use service role to bypass RLS
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !serviceUrl) return false;

  const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
  const { data: whitelist, error } = await serviceSupabase
    .from('leading_safe_pro_access_whitelist')
    .select('id')
    .ilike('email', lookupEmail)
    .limit(1);

  if (error) return false;
  return (whitelist?.length ?? 0) > 0;
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
