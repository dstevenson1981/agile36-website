import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY required');
  return new Stripe(key);
};

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars required');
  return createClient(url, key);
};

/**
 * Grant pro access after successful checkout.
 * Takes payment_intent_id, fetches from Stripe, gets user_id and course_id from metadata,
 * upserts into user_access with plan_type: 'pro'.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paymentIntentId = body?.payment_intent_id || body?.paymentIntentId;

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'payment_intent_id required' }, { status: 400 });
    }

    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment not succeeded' }, { status: 400 });
    }

    const userId = paymentIntent.metadata?.userId;
    const courseId = paymentIntent.metadata?.courseSlug;
    const selectedPlan = paymentIntent.metadata?.selectedPlan;

    if (!userId || !courseId || selectedPlan !== 'pro') {
      return NextResponse.json({ error: 'No pro access to grant' }, { status: 200 });
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('user_access')
      .upsert(
        { user_id: userId, course_id: courseId, plan_type: 'pro' },
        { onConflict: 'user_id,course_id' }
      );

    if (error) {
      console.error('Grant access error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Grant access error:', err);
    return NextResponse.json({ error: err.message || 'Failed to grant access' }, { status: 500 });
  }
}
