import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// This is your Stripe webhook secret - get it from Stripe Dashboard > Webhooks
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    console.error('Missing stripe-signature or webhook secret');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 400 }
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
    case 'payment_intent.succeeded':
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
      break;

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



