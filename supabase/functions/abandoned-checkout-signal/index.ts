/**
 * Abandoned Checkout Signal
 *
 * Trigger: enrollment_leads with status='pending', order_id IS NULL, created_at > 1 hour ago
 * Action: Send follow-up email via SendGrid with discount + seats remaining urgency
 *
 * Runs every 30 minutes via pg_cron
 */

import { sendEmail } from '../_shared/sendgrid-client.ts';
import { supabase } from '../_shared/supabase-client.ts';

interface EnrollmentLead {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  course_slug: string;
  course_name?: string;
  status: string;
  created_at: string;
}

interface CourseSchedule {
  id: string;
  course_name: string;
  course_slug: string;
  start_date: string;
  seats_available: number;
  price: number;
}

interface EmailTemplate {
  id: string;
  subject: string;
  body_text: string;
  body_html?: string;
  discount_code?: string;
  discount_amount?: number;
  course_name?: string;
}

const SUPPRESSED_EMAILS = new Set([
  'jgriffin@uihna.com',
  'cteadt@uihna.com',
]);

Deno.serve(async (req) => {
  try {
    console.log(`[${new Date().toISOString()}] Starting Abandoned Checkout Signal...`);

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: abandonedLeads, error: leadsError } = await supabase
      .from('enrollment_leads')
      .select('*')
      .eq('status', 'pending')
      .is('order_id', null)
      .lt('created_at', oneHourAgo);

    if (leadsError) {
      console.error('Error querying enrollment_leads:', leadsError);
      return new Response(JSON.stringify({ success: false, error: leadsError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!abandonedLeads || abandonedLeads.length === 0) {
      console.log('No abandoned checkouts to process');
      return new Response(JSON.stringify({ success: true, processed: 0, skipped: 0, errors: 0 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`Found ${abandonedLeads.length} abandoned checkouts`);

    let processed = 0;
    let skipped = 0;
    let errors = 0;

    for (const lead of abandonedLeads as EnrollmentLead[]) {
      try {
        const { email, course_slug, first_name, last_name } = lead;
        const normalizedEmail = email.trim().toLowerCase();

        if (SUPPRESSED_EMAILS.has(normalizedEmail)) {
          console.log(`  Skipping ${email} - suppressed`);
          await supabase
            .from('enrollment_leads')
            .update({ status: 'abandoned', updated_at: new Date().toISOString() })
            .eq('id', lead.id);
          skipped++;
          continue;
        }

        const { data: paidOrders } = await supabase
          .from('orders')
          .select('id')
          .ilike('customer_email', normalizedEmail)
          .eq('payment_status', 'succeeded')
          .limit(1);

        if (paidOrders && paidOrders.length > 0) {
          console.log(`  Skipping ${email} - already paid`);
          await supabase
            .from('enrollment_leads')
            .update({ status: 'completed', updated_at: new Date().toISOString() })
            .eq('id', lead.id);
          skipped++;
          continue;
        }

        const { data: unsubscribed } = await supabase
          .from('email_unsubscribes')
          .select('id')
          .eq('email', email)
          .limit(1);

        if (unsubscribed && unsubscribed.length > 0) {
          console.log(`  Skipping ${email} - unsubscribed`);
          skipped++;
          continue;
        }

        const { data: cohorts } = await supabase
          .from('course_schedules')
          .select('*')
          .eq('course_slug', course_slug)
          .eq('status', 'active')
          .gt('start_date', new Date().toISOString())
          .order('start_date', { ascending: true })
          .limit(1);

        const cohort = cohorts?.[0] as CourseSchedule | undefined;

        let { data: templates } = await supabase
          .from('email_templates')
          .select('*')
          .eq('course_slug', course_slug)
          .eq('template_type', 'abandoned_cart')
          .eq('is_active', true)
          .limit(1);

        if (!templates || templates.length === 0) {
          const { data: genericTemplates } = await supabase
            .from('email_templates')
            .select('*')
            .eq('template_type', 'abandoned_cart')
            .eq('is_active', true)
            .limit(1);
          templates = genericTemplates;
        }

        if (!templates || templates.length === 0) {
          console.log(`  No template found for ${course_slug}, skipping`);
          skipped++;
          continue;
        }

        const template = templates[0] as EmailTemplate;

        let formattedDate = 'upcoming';
        let seatsLeft = 'limited';
        if (cohort?.start_date) {
          const startDate = new Date(cohort.start_date);
          formattedDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          seatsLeft = String(cohort.seats_available || 'limited');
        }

        const replacements: Record<string, string> = {
          '{first_name}': first_name || 'there',
          '{last_name}': last_name || '',
          '{course_name}': lead.course_name || template.course_name || '',
          '{next_cohort_date}': formattedDate,
          '{seats_left}': seatsLeft,
          '{discount_code}': template.discount_code || '150OFF',
          '{discount_amount}': String(template.discount_amount || 150),
        };

        let subject = template.subject;
        let bodyText = template.body_text;
        let bodyHtml = template.body_html || '';

        for (const [placeholder, value] of Object.entries(replacements)) {
          subject = subject.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
          bodyText = bodyText.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
          bodyHtml = bodyHtml.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
        }

        if (cohort && cohort.seats_available <= 10) {
          const urgencyText = `\n\nOnly ${seatsLeft} seats remaining for the ${formattedDate} cohort!`;
          const urgencyHtml = `<p style="color: #d32f2f; font-weight: bold;">Only ${seatsLeft} seats remaining for the ${formattedDate} cohort!</p>`;
          bodyText += urgencyText;
          bodyHtml = bodyHtml.replace('</body>', urgencyHtml + '</body>');
        }

        const result = await sendEmail(
          email,
          `${first_name || ''} ${last_name || ''}`.trim() || 'there',
          subject,
          bodyText,
          bodyHtml || undefined
        );

        if (result.success) {
          console.log(`  Sent abandoned cart email to ${email}`);

          await supabase
            .from('enrollment_leads')
            .update({ status: 'abandoned', updated_at: new Date().toISOString() })
            .eq('id', lead.id);

          await supabase.from('email_queue').insert({
            recipient_email: email,
            recipient_name: `${first_name || ''} ${last_name || ''}`.trim(),
            subject: subject,
            body: bodyText,
            html_body: bodyHtml || null,
            scheduled_for: new Date().toISOString(),
            sent_at: new Date().toISOString(),
            status: 'sent',
          });

          processed++;
        } else {
          console.log(`  Failed to send to ${email}: ${result.error}`);
          errors++;
        }
      } catch (e: any) {
        console.error(`  Error processing lead ${lead.id}:`, e.message);
        errors++;
      }
    }

    const summary = { success: true, processed, skipped, errors };
    console.log(`[${new Date().toISOString()}] Completed:`, summary);

    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Fatal error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
