import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  // This is your Stripe webhook secret - get it from Stripe Dashboard > Webhooks
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error('Missing stripe-signature or webhook secret');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
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

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const courseId = session.metadata?.course_id;
      if (userId && courseId) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (supabaseUrl && supabaseKey) {
          try {
            const { error: fnError } = await supabase.functions.invoke('grant-pro-access', {
              body: { user_id: userId, course_id: courseId },
            });
            if (fnError) console.error('Failed to grant pro access:', fnError);
          } catch (err) {
            console.error('Error calling grant-pro-access:', err);
          }
        }
      }
      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);

      // Update order status in Supabase if needed
      if (paymentIntent.id) {
        await supabase
          .from('orders')
          .update({
            payment_status: 'succeeded',
            updated_at: new Date().toISOString(),
          })
          .eq('payment_intent_id', paymentIntent.id);
      }

      // Grant pro access for practice exams when user_id in metadata and plan is pro
      const userId = paymentIntent.metadata?.userId;
      const courseSlug = paymentIntent.metadata?.courseSlug;
      const selectedPlan = paymentIntent.metadata?.selectedPlan;
      if (userId && courseSlug && selectedPlan === 'pro') {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (supabaseUrl && supabaseKey) {
          try {
            const { error: fnError } = await supabase.functions.invoke('grant-pro-access', {
              body: { user_id: userId, course_id: courseSlug },
            });
            if (fnError) {
              console.error('Failed to grant pro access:', fnError);
            } else {
              console.log('Granted pro access:', userId, courseSlug);
            }
          } catch (err) {
            console.error('Error calling grant-pro-access:', err);
          }
        }
      }
      break;
    }

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      
      // Update order status
      if (failedPayment.id) {
        await supabase
          .from('orders')
          .update({ 
            payment_status: 'failed',
            updated_at: new Date().toISOString(),
          })
          .eq('payment_intent_id', failedPayment.id);
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Disable body parsing for webhooks
export const runtime = 'nodejs';



