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

    // Validate required fields
    if (!scheduleId || !courseSlug || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    // Store enrollment lead in Supabase
    const leadData = {
      schedule_id: scheduleId,
      course_slug: courseSlug,
      course_name: courseName || null,
      enrolling_for: enrollingFor || 'myself',
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: trimmedEmail,
      phone: phone.trim(),
      alternative_contact: alternativeContact?.trim() || null,
      referral_code: referralCode?.trim() || null,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: lead, error: leadError } = await supabase
      .from('enrollment_leads')
      .insert(leadData)
      .select()
      .single();

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

    // Create new Stripe customer when Basic Details are entered (always create new, no lookup).
    // Skipped when createStripeCustomer is false (e.g. subsequent combo schedule lead inserts).
    let stripeCustomerId: string | null = null;
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (createStripeCustomer !== false && stripeKey) {
      try {
        const stripe = new Stripe(stripeKey);
        const customerName = `${firstName.trim()} ${lastName.trim()}`;
        const isComboLead = Boolean(comboId);

        const customer = await stripe.customers.create({
          email: trimmedEmail,
          name: customerName,
          phone: phone.trim() || undefined,
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
      leadId: lead.id,
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









