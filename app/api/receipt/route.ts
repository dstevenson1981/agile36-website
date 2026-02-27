import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/app/lib/supabase/server';

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY required');
  return new Stripe(key);
};

export async function GET(request: NextRequest) {
  const paymentIntentId = request.nextUrl.searchParams.get('pi');
  if (!paymentIntentId) {
    return NextResponse.redirect(new URL('/account/orders', request.url));
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL('/account/login', request.url));
  }

  const { data: profile } = await supabase.from('profiles').select('email').eq('user_id', user.id).single();
  const email = profile?.email ?? user.email;

  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('payment_intent_id', paymentIntentId)
    .eq('customer_email', email)
    .single();

  if (!order) {
    return NextResponse.redirect(new URL('/account/orders', request.url));
  }

  try {
    const stripe = getStripe();
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['latest_charge'],
    });

    const charge = pi.latest_charge;
    if (charge && typeof charge === 'object' && charge.receipt_url) {
      return NextResponse.redirect(charge.receipt_url);
    }
  } catch (err) {
    console.error('Receipt fetch error:', err);
  }

  return NextResponse.redirect(new URL('/account/orders', request.url));
}
