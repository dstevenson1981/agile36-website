import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import {
  formatAttendeesSummary,
  formatEnrollingForLabel,
  isEnrollingForSomeoneElse,
  parseAttendees,
} from '@/app/lib/registration-display';

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId parameter is required' },
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

    const results: any = {
      customerId,
      customer: null,
      paymentIntents: [],
      orders: [],
      analysis: null,
    };

    // 1. Get customer details from Stripe
    try {
      const customer = await stripe.customers.retrieve(customerId);
      
      // Check if customer is deleted
      if (customer.deleted) {
        return NextResponse.json(
          { error: 'Customer has been deleted' },
          { status: 404 }
        );
      }
      
      results.customer = {
        id: customer.id,
        email: customer.email || null,
        name: customer.name || null,
        created: new Date(customer.created * 1000).toISOString(),
      };
    } catch (error: any) {
      return NextResponse.json(
        { error: `Failed to retrieve customer: ${error.message}` },
        { status: 404 }
      );
    }

    // 2. Get payment intents for this customer
    try {
      const paymentIntents = await stripe.paymentIntents.list({
        customer: customerId,
        limit: 10,
      });

      for (const pi of paymentIntents.data) {
        const piData: any = {
          id: pi.id,
          status: pi.status,
          amount: pi.amount / 100,
          currency: pi.currency.toUpperCase(),
          created: new Date(pi.created * 1000).toISOString(),
          metadata: pi.metadata || {},
        };

        // Get charges for this payment intent
        try {
          const charges = await stripe.charges.list({
            payment_intent: pi.id,
            limit: 10,
          });
          piData.charges = charges.data.map(charge => ({
            id: charge.id,
            amount: charge.amount / 100,
            status: charge.status,
            receipt_url: charge.receipt_url,
          }));
        } catch (error) {
          console.error('Error retrieving charges:', error);
        }

        // Calculate expected vs actual
        const originalAmount = pi.metadata?.originalAmount ? parseFloat(pi.metadata.originalAmount) : null;
        const promoDiscount = pi.metadata?.promoDiscount ? parseFloat(pi.metadata.promoDiscount) : 0;
        const actualAmount = pi.amount / 100;

        if (originalAmount) {
          const expectedAmount = originalAmount - promoDiscount;
          piData.analysis = {
            originalAmount,
            promoDiscount,
            expectedAmount: Math.max(0, expectedAmount),
            actualAmount,
            difference: actualAmount - Math.max(0, expectedAmount),
            hasMismatch: Math.abs(actualAmount - Math.max(0, expectedAmount)) > 0.01,
          };
        }

        results.paymentIntents.push(piData);
      }
    } catch (error: any) {
      console.error('Error retrieving payment intents:', error);
    }

    // 3. Get orders from database
    try {
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_customer_id', customerId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (ordersError) {
        console.error('Error querying orders:', ordersError);
      } else if (orders) {
        results.orders = orders.map((order) => ({
          ...order,
          enrollment_type: formatEnrollingForLabel(order.enrolling_for),
          enrolling_for_someone_else: isEnrollingForSomeoneElse(order.enrolling_for),
          paid_by: {
            name: order.customer_name || null,
            email: order.customer_email || null,
            phone: order.customer_phone || null,
          },
          attendees: parseAttendees(order.alternative_contact),
          attendees_summary: formatAttendeesSummary(order.alternative_contact),
        }));
      }
    } catch (error: any) {
      console.error('Error retrieving orders:', error);
    }

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Error investigating payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to investigate payment' },
      { status: 500 }
    );
  }
}

