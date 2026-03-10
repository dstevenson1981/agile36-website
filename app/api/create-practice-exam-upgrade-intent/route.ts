import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/app/lib/supabase/server';
import { hasBasicPlanForCourse } from '@/app/lib/practice-exams';

const UPGRADE_AMOUNT_CENTS = 5000; // $50

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is required');
  return new Stripe(secretKey);
};

const COURSE_NAMES: Record<string, string> = {
  'product-owner-manager': 'SAFe Product Owner/Product Manager',
  'lean-portfolio-management': 'SAFe Lean Portfolio Management',
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to upgrade' }, { status: 401 });
    }

    const body = await request.json();
    const courseSlug = body?.courseSlug;
    if (!courseSlug || !['product-owner-manager', 'lean-portfolio-management'].includes(courseSlug)) {
      return NextResponse.json({ error: 'Invalid course' }, { status: 400 });
    }

    const eligible = await hasBasicPlanForCourse(courseSlug);
    if (!eligible) {
      return NextResponse.json(
        { error: 'You must have a Basic plan for this course to upgrade. You may already have Pro access.' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const courseName = COURSE_NAMES[courseSlug] || courseSlug;

    // Create or retrieve Stripe customer
    const email = user.email!;
    const name = user.user_metadata?.name || user.user_metadata?.full_name || email.split('@')[0];
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    let customer = existingCustomers.data[0];
    if (!customer) {
      customer = await stripe.customers.create({ email, name });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: UPGRADE_AMOUNT_CENTS,
      currency: 'usd',
      customer: customer.id,
      receipt_email: email,
      statement_descriptor: 'Agile36 Practice Exam',
      description: `${courseName} - Practice Exam Upgrade`,
      payment_method_types: ['card'],
      metadata: {
        userId: user.id,
        courseSlug,
        courseName,
        selectedPlan: 'pro',
        scheduleId: 'practice-exam-upgrade',
        customerEmail: email,
        customerName: name,
        quantity: '1',
        upgradeType: 'practice_exam_only',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: UPGRADE_AMOUNT_CENTS / 100,
    });
  } catch (error: any) {
    console.error('Practice exam upgrade error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  }
}
