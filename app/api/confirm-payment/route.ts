import { NextRequest, NextResponse, after } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { grantProPracticeAccessForEmail } from '@/app/lib/grant-pro-practice-access';
import { triggerLandExpandForPaidOrder } from '@/land-and-expand/lib/process';

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is required');
  }
  return new Stripe(secretKey);
};

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are required');
  }
  return createClient(supabaseUrl, supabaseKey);
};

const parseMetadataJson = (value: string | undefined): Record<string, string> => {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object') return {};
    return Object.fromEntries(
      Object.entries(parsed).map(([key, val]) => [String(key), val == null ? '' : String(val)])
    );
  } catch {
    return {};
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentIntentId, enrollmentData } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    let stripe: Stripe;
    try {
      stripe = getStripe();
    } catch (error: any) {
      console.error('Stripe configuration error:', error);
      return NextResponse.json(
        { error: 'Stripe configuration error. Check STRIPE_SECRET_KEY.' },
        { status: 500 }
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

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not succeeded', status: paymentIntent.status },
        { status: 400 }
      );
    }

    // Ensure customer has name and email in Stripe
    if (paymentIntent.customer) {
      try {
        const customerId = paymentIntent.customer as string;
        const customerEmail = paymentIntent.metadata?.customerEmail || paymentIntent.receipt_email;
        const customerName = paymentIntent.metadata?.customerName;
        
        if (customerEmail || customerName) {
          const updateData: any = {};
          if (customerEmail) {
            updateData.email = customerEmail;
          }
          if (customerName) {
            updateData.name = customerName;
          }
          
          if (Object.keys(updateData).length > 0) {
            await stripe.customers.update(customerId, updateData);
            console.log('Updated Stripe customer with name and email:', customerId);
          }
        }
      } catch (error) {
        console.error('Error updating Stripe customer:', error);
        // Don't fail if customer update fails
      }
    }

    // Get payment method details for better tracking
    let paymentMethodDetails = null;
    if (paymentIntent.payment_method) {
      try {
        const paymentMethod = await stripe.paymentMethods.retrieve(
          paymentIntent.payment_method as string
        );
        paymentMethodDetails = {
          type: paymentMethod.type,
          card: paymentMethod.card ? {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            exp_month: paymentMethod.card.exp_month,
            exp_year: paymentMethod.card.exp_year,
          } : null,
        };
      } catch (error) {
        console.error('Error retrieving payment method:', error);
      }
    }

    // Store order in Supabase (combo orders use comboId for course_slug)
    // Combo checkouts never accept promo / corporate / group discounts — charge amount is already final.
    const comboId = paymentIntent.metadata?.comboId || '';
    const metadataCourseSlug = paymentIntent.metadata?.courseSlug || '';
    const metadataScheduleIds = (paymentIntent.metadata?.scheduleIds || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    const comboScheduleMap = parseMetadataJson(paymentIntent.metadata?.comboScheduleMap);
    const comboScheduleDates = parseMetadataJson(paymentIntent.metadata?.comboScheduleDates);
    const comboCourseNames = parseMetadataJson(paymentIntent.metadata?.comboCourseNames);
    const isComboOrder =
      Boolean(comboId) ||
      metadataCourseSlug.startsWith('combo-') ||
      Object.keys(comboScheduleMap).length > 0;
    const resolvedComboId =
      comboId ||
      (metadataCourseSlug.startsWith('combo-') ? metadataCourseSlug.slice('combo-'.length) : '');
    const comboPrimaryScheduleId = paymentIntent.metadata?.scheduleId || '';
    const orderData = {
      payment_intent_id: paymentIntent.id,
      stripe_customer_id: (paymentIntent.customer as string) || paymentIntent.metadata?.customerId || null,
      schedule_id: isComboOrder
        ? (metadataScheduleIds.length ? metadataScheduleIds.join(',') : comboPrimaryScheduleId)
        : comboPrimaryScheduleId,
      course_slug: resolvedComboId
        ? `combo-${resolvedComboId}`
        : metadataCourseSlug,
      course_name: paymentIntent.metadata?.courseName || '',
      plan: paymentIntent.metadata?.selectedPlan || 'basic',
      quantity: parseInt(paymentIntent.metadata?.quantity || '1'),
      // Always use Stripe-charged amount (combo PIs are created at catalog price with promo forced to 0)
      amount: paymentIntent.amount / 100, // Convert from cents
      currency: paymentIntent.currency,
      customer_email: paymentIntent.metadata?.customerEmail || paymentIntent.receipt_email || '',
      customer_name: paymentIntent.metadata?.customerName || '',
      customer_phone: paymentIntent.metadata?.phone || enrollmentData?.phone || '',
      alternative_contact: paymentIntent.metadata?.alternativeContact || enrollmentData?.alternativeContact || '',
      enrolling_for: paymentIntent.metadata?.enrollingFor || enrollmentData?.enrollingFor || 'myself',
      payment_status: paymentIntent.status,
      schedule_date: isComboOrder
        ? JSON.stringify(comboScheduleDates)
        : (paymentIntent.metadata?.scheduleDate || ''),
      schedule_time: paymentIntent.metadata?.scheduleTime || '',
      duration: paymentIntent.metadata?.duration || '',
      timezone: paymentIntent.metadata?.timezone || '',
      created_at: new Date().toISOString(),
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error('Error storing order:', orderError);
      // Don't fail the request if order storage fails, payment is already successful
    }

    // $50 practice-exam-only upgrades unlock immediately; full Pro enrollments stay locked until manual unlock.
    if (
      paymentIntent.metadata?.upgradeType === 'practice_exam_only' &&
      paymentIntent.metadata?.courseSlug &&
      orderData.customer_email
    ) {
      try {
        await grantProPracticeAccessForEmail(
          supabase,
          orderData.customer_email,
          paymentIntent.metadata.courseSlug,
        );
      } catch (grantError) {
        console.error('Error granting practice exam upgrade access:', grantError);
      }
    }

    // Mark matching enrollment_leads as completed (same email + schedule)
    if (!isComboOrder && order?.id && orderData.customer_email && orderData.schedule_id) {
      const customerEmail = String(orderData.customer_email).trim().toLowerCase();
      const { error: leadUpdateError } = await supabase
        .from('enrollment_leads')
        .update({
          status: 'completed',
          order_id: order.id,
          updated_at: new Date().toISOString(),
        })
        .eq('email', customerEmail)
        .eq('schedule_id', orderData.schedule_id)
        .eq('status', 'pending');
      if (leadUpdateError) {
        console.error('Error updating enrollment_leads status:', leadUpdateError);
      }
    }

    // For combo orders, ensure each selected class/date is represented in enrollment_leads.
    if (isComboOrder && order?.id && orderData.customer_email) {
      const customerEmail = String(orderData.customer_email).trim().toLowerCase();
      const comboLeadRows = Object.entries(comboScheduleMap)
        .filter(([, scheduleId]) => Boolean(scheduleId))
        .map(([courseSlug, scheduleId]) => ({
          schedule_id: scheduleId,
          course_slug: courseSlug,
          course_name: comboCourseNames[courseSlug] || courseSlug,
          enrolling_for: orderData.enrolling_for,
          first_name: (paymentIntent.metadata?.customerName || '').split(' ')[0] || '',
          last_name: (paymentIntent.metadata?.customerName || '').split(' ').slice(1).join(' ') || '',
          email: customerEmail,
          phone: orderData.customer_phone || '',
          alternative_contact: orderData.alternative_contact || '',
          status: 'completed',
          order_id: order.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));

      for (const row of comboLeadRows) {
        const { data: existingLead, error: existingLeadError } = await supabase
          .from('enrollment_leads')
          .select('id')
          .eq('email', customerEmail)
          .eq('schedule_id', row.schedule_id)
          .maybeSingle();

        if (existingLeadError) {
          console.error('Error checking existing combo enrollment lead:', existingLeadError);
          continue;
        }

        if (existingLead?.id) {
          const { error: updateComboLeadError } = await supabase
            .from('enrollment_leads')
            .update({
              status: 'completed',
              order_id: order.id,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingLead.id);
          if (updateComboLeadError) {
            console.error('Error updating combo enrollment lead:', updateComboLeadError);
          }
          continue;
        }

        const { error: insertComboLeadError } = await supabase
          .from('enrollment_leads')
          .insert(row);
        if (insertComboLeadError) {
          console.error('Error inserting combo enrollment lead:', insertComboLeadError);
        }
      }
    }

    // Corporate-email land-and-expand: runs after the response so checkout is not delayed.
    if (order?.id && orderData.payment_status === 'succeeded') {
      const orderId = order.id as string;
      after(async () => {
        try {
          await triggerLandExpandForPaidOrder(orderId);
        } catch (landExpandError) {
          console.error('[land-expand] confirm-payment trigger failed:', landExpandError);
        }
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order?.id,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Error confirming payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}

