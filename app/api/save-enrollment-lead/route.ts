import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are required');
  }
  return createClient(supabaseUrl, supabaseKey);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      scheduleId,
      courseSlug,
      courseName,
      enrollingFor,
      firstName,
      lastName,
      email,
      phone,
      alternativeContact,
      referralCode,
      comboId,
      // When saving multiple combo schedule leads, only the first call should create a Stripe customer
      createStripeCustomer = true,
    } = body;

    // Email + course are enough. Names/phone/schedule come later if they continue.
    if (!courseSlug || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = getSupabase();
    } catch (error: any) {
      console.error('Supabase configuration error:', error);
      return NextResponse.json(
        { error: 'Supabase configuration error. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.' },
        { status: 500 }
      );
    }

    // Skip insert if email is in abandoned cart suppressions (no email will be sent)
    const trimmedEmail = email.trim().toLowerCase();
    const hardSuppressed = new Set([
      'enriquesan@iadb.org',
      'steven.garcia@sncorp.com',
      'kristen.kunkel@gmail.com',
    ]);
    if (hardSuppressed.has(trimmedEmail)) {
      return NextResponse.json({
        success: true,
        message: 'Enrollment lead not stored (suppressed)',
        suppressed: true,
      });
    }
    const { data: suppressed } = await supabase
      .from('abandoned_cart_suppressions')
      .select('id')
      .ilike('email', trimmedEmail)
      .limit(1);
    if (suppressed?.length) {
      return NextResponse.json({
        success: true,
        message: 'Enrollment lead not stored (suppressed)',
        suppressed: true,
      });
    }

    const first = typeof firstName === 'string' ? firstName.trim() : '';
    const last = typeof lastName === 'string' ? lastName.trim() : '';
    const phoneValue = typeof phone === 'string' ? phone.trim() : '';
    const resolvedScheduleId =
      typeof scheduleId === 'string' && scheduleId.trim()
        ? scheduleId.trim()
        : 'unknown';

    const { data: existingRows } = await supabase
      .from('enrollment_leads')
      .select('id, first_name, last_name, phone, schedule_id, status')
      .eq('email', trimmedEmail)
      .eq('course_slug', courseSlug)
      .in('status', ['pending', 'abandoned'])
      .order('created_at', { ascending: false })
      .limit(1);
    const existing = existingRows?.[0] ?? null;

    const leadData = {
      schedule_id:
        resolvedScheduleId !== 'unknown'
          ? resolvedScheduleId
          : existing?.schedule_id || 'unknown',
      course_slug: courseSlug,
      course_name: courseName || null,
      enrolling_for: enrollingFor || 'myself',
      first_name: first || existing?.first_name || '',
      last_name: last || existing?.last_name || '',
      email: trimmedEmail,
      phone: phoneValue || existing?.phone || '',
      alternative_contact: alternativeContact?.trim() || null,
      referral_code: referralCode?.trim() || null,
      status: existing?.status === 'abandoned' ? 'pending' : existing?.status || 'pending',
      updated_at: new Date().toISOString(),
    };

    let lead: { id: string } | null = existing ? { id: existing.id } : null;
    let leadError: { code?: string; message?: string } | null = null;

    if (existing?.id) {
      const { error } = await supabase
        .from('enrollment_leads')
        .update(leadData)
        .eq('id', existing.id);
      leadError = error;
    } else {
      const inserted = await supabase
        .from('enrollment_leads')
        .insert({
          ...leadData,
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single();
      lead = inserted.data;
      leadError = inserted.error;
    }

    if (leadError) {
      console.error('Error saving enrollment lead:', leadError);
      // If it's a duplicate, that's okay - we still want to return success
      // as the lead was already captured
      if (leadError.code === '23505') { // Unique constraint violation
        return NextResponse.json({
          success: true,
          message: 'Enrollment lead already exists',
          duplicate: true,
        });
      }
      return NextResponse.json(
        { error: 'Failed to save enrollment lead', details: leadError.message },
        { status: 500 }
      );
    }

    // Stripe customer only when they have a real name (Continue), not email-only capture.
    let stripeCustomerId: string | null = null;
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const hasIdentity = Boolean(first && last);
    if (createStripeCustomer !== false && hasIdentity && stripeKey) {
      try {
        const stripe = new Stripe(stripeKey);
        const customerName = `${first} ${last}`.trim();
        const isComboLead = Boolean(comboId);

        const customer = await stripe.customers.create({
          email: trimmedEmail,
          name: customerName,
          phone: phoneValue || undefined,
          metadata: {
            courseSlug: courseSlug || '',
            ...(isComboLead ? { comboId: String(comboId) } : {}),
            source: isComboLead ? 'combo_enrollment_lead' : 'course_enrollment_lead',
          },
        });
        stripeCustomerId = customer.id;
        console.log('Stripe customer created:', customer.id, customer.email);
      } catch (stripeError: any) {
        console.error('Error creating Stripe customer (lead still saved):', stripeError);
        // Don't fail the request - lead is saved; create-payment-intent will create customer at payment time
      }
    }

    return NextResponse.json({
      success: true,
      leadId: lead?.id,
      stripeCustomerId,
      message: 'Enrollment lead saved successfully',
    });
  } catch (error: any) {
    console.error('Error in save-enrollment-lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save enrollment lead' },
      { status: 500 }
    );
  }
}









