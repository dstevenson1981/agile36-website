import { NextRequest, NextResponse, after } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { finalizeCorporateActivation } from '@/app/lib/corporate-activation';
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

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);

      if (paymentIntent.id) {
        await supabase
          .from('orders')
          .update({
            payment_status: 'succeeded',
            updated_at: new Date().toISOString(),
          })
          .eq('payment_intent_id', paymentIntent.id);

        const { data: paidOrder } = await supabase
          .from('orders')
          .select('id')
          .eq('payment_intent_id', paymentIntent.id)
          .maybeSingle();

        if (paidOrder?.id) {
          const orderId = paidOrder.id as string;
          after(async () => {
            try {
              await triggerLandExpandForPaidOrder(orderId);
            } catch (landExpandError) {
              console.error('[land-expand] stripe webhook trigger failed:', landExpandError);
            }
          });
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
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

      // Failed payments should not get abandoned-cart recovery emails.
      // Cancel pending enrollment_leads for this buyer so N8N skips them.
      let failedEmail = (
        failedPayment.receipt_email ||
        failedPayment.metadata?.customerEmail ||
        failedPayment.metadata?.email ||
        ''
      )
        .trim()
        .toLowerCase();

      if (!failedEmail && failedPayment.id) {
        const { data: failedOrder } = await supabase
          .from('orders')
          .select('customer_email')
          .eq('payment_intent_id', failedPayment.id)
          .maybeSingle();
        failedEmail = String(failedOrder?.customer_email || '')
          .trim()
          .toLowerCase();
      }

      if (failedEmail) {
        const { error: cancelLeadError } = await supabase
          .from('enrollment_leads')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('email', failedEmail)
          .eq('status', 'pending');

        if (cancelLeadError) {
          console.error(
            'Error cancelling enrollment_leads after payment failure:',
            cancelLeadError
          );
        } else {
          console.log(
            'Cancelled pending enrollment_leads after payment failure for',
            failedEmail
          );
        }
      }
      break;
    }

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === 'setup' && session.metadata?.corporate_account_id) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.agile36.com';
        await finalizeCorporateActivation(stripe, supabase, session, siteUrl);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Disable body parsing for webhooks
export const runtime = 'nodejs';



