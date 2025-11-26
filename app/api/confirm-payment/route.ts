import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    // Store order in Supabase
    const orderData = {
      payment_intent_id: paymentIntent.id,
      stripe_customer_id: (paymentIntent.customer as string) || paymentIntent.metadata?.customerId || null,
      schedule_id: paymentIntent.metadata?.scheduleId || '',
      course_slug: paymentIntent.metadata?.courseSlug || '',
      course_name: paymentIntent.metadata?.courseName || '',
      plan: paymentIntent.metadata?.selectedPlan || 'basic',
      quantity: parseInt(paymentIntent.metadata?.quantity || '1'),
      amount: paymentIntent.amount / 100, // Convert from cents
      currency: paymentIntent.currency,
      customer_email: paymentIntent.metadata?.customerEmail || paymentIntent.receipt_email || '',
      customer_name: paymentIntent.metadata?.customerName || '',
      customer_phone: paymentIntent.metadata?.phone || enrollmentData?.phone || '',
      alternative_contact: paymentIntent.metadata?.alternativeContact || enrollmentData?.alternativeContact || '',
      enrolling_for: paymentIntent.metadata?.enrollingFor || enrollmentData?.enrollingFor || 'myself',
      payment_status: paymentIntent.status,
      schedule_date: paymentIntent.metadata?.scheduleDate || '',
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

