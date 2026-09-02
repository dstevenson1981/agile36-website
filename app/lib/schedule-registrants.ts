import type { SupabaseClient } from '@supabase/supabase-js';

export type ScheduleRegistrant = {
  name: string;
  email: string;
  plan: string | null;
  quantity: number;
  source: 'direct' | 'combo' | 'enrollment_lead';
  courseSlug: string | null;
  orderId?: string | null;
  paymentStatus?: string | null;
};

/**
 * Resolve people on a cohort, including combo/bundled enrollments.
 *
 * Combo checkouts store multiple schedule UUIDs in orders.schedule_id
 * (comma-separated) and also write per-class enrollment_leads rows.
 * A plain `.eq('schedule_id', id)` on orders misses those combo rows.
 */
export async function getRegistrantsForSchedule(
  supabase: SupabaseClient,
  scheduleId: string,
): Promise<ScheduleRegistrant[]> {
  const sid = scheduleId?.trim();
  if (!sid) return [];

  const [{ data: directOrders }, { data: comboOrders }, { data: leads }] = await Promise.all([
    supabase
      .from('orders')
      .select('id, customer_name, customer_email, quantity, plan, payment_status, course_slug, schedule_id')
      .eq('schedule_id', sid)
      .eq('payment_status', 'succeeded'),
    supabase
      .from('orders')
      .select('id, customer_name, customer_email, quantity, plan, payment_status, course_slug, schedule_id')
      .ilike('course_slug', 'combo%')
      .eq('payment_status', 'succeeded')
      .like('schedule_id', `%${sid}%`),
    supabase
      .from('enrollment_leads')
      .select('first_name, last_name, email, status, order_id, course_slug')
      .eq('schedule_id', sid)
      .eq('status', 'completed'),
  ]);

  const byEmail = new Map<string, ScheduleRegistrant>();

  const upsert = (row: ScheduleRegistrant) => {
    const key = row.email.trim().toLowerCase();
    if (!key) return;
    const existing = byEmail.get(key);
    // Prefer paid order rows over leads; prefer direct over combo only if already present.
    if (!existing || (existing.source === 'enrollment_lead' && row.source !== 'enrollment_lead')) {
      byEmail.set(key, row);
    }
  };

  for (const o of directOrders ?? []) {
    upsert({
      name: (o.customer_name || '').trim() || '(no name)',
      email: o.customer_email || '',
      plan: o.plan ?? null,
      quantity: o.quantity ?? 1,
      source: 'direct',
      courseSlug: o.course_slug ?? null,
      orderId: o.id,
      paymentStatus: o.payment_status,
    });
  }

  for (const o of comboOrders ?? []) {
    const ids = String(o.schedule_id || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!ids.includes(sid)) continue;
    upsert({
      name: (o.customer_name || '').trim() || '(no name)',
      email: o.customer_email || '',
      plan: o.plan ?? null,
      quantity: o.quantity ?? 1,
      source: 'combo',
      courseSlug: o.course_slug ?? null,
      orderId: o.id,
      paymentStatus: o.payment_status,
    });
  }

  for (const lead of leads ?? []) {
    const name = [lead.first_name, lead.last_name].filter(Boolean).join(' ').trim();
    upsert({
      name: name || '(no name)',
      email: lead.email || '',
      plan: null,
      quantity: 1,
      source: 'enrollment_lead',
      courseSlug: lead.course_slug ?? null,
      orderId: lead.order_id,
      paymentStatus: 'completed',
    });
  }

  return [...byEmail.values()].sort((a, b) => a.name.localeCompare(b.name));
}
