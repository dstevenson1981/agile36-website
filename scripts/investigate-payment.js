/**
 * Script to investigate a specific customer's payment issue
 * Usage: node scripts/investigate-payment.js cus_TlgDdhsGj1JClj
 */

require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function investigatePayment(customerId) {
  console.log(`\n🔍 Investigating payment for customer: ${customerId}\n`);
  console.log('=' .repeat(60));

  try {
    // 1. Get customer details from Stripe
    console.log('\n1. Customer Details from Stripe:');
    console.log('-'.repeat(60));
    const customer = await stripe.customers.retrieve(customerId);
    console.log(`   Email: ${customer.email}`);
    console.log(`   Name: ${customer.name || 'N/A'}`);
    console.log(`   Created: ${new Date(customer.created * 1000).toISOString()}`);

    // 2. Get payment intents for this customer
    console.log('\n2. Payment Intents for this customer:');
    console.log('-'.repeat(60));
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 10,
    });

    if (paymentIntents.data.length === 0) {
      console.log('   No payment intents found for this customer');
    } else {
      for (const pi of paymentIntents.data) {
        console.log(`\n   Payment Intent ID: ${pi.id}`);
        console.log(`   Status: ${pi.status}`);
        console.log(`   Amount: $${(pi.amount / 100).toFixed(2)}`);
        console.log(`   Currency: ${pi.currency.toUpperCase()}`);
        console.log(`   Created: ${new Date(pi.created * 1000).toISOString()}`);
        
        if (pi.metadata) {
          console.log(`   Metadata:`);
          console.log(`     - Course: ${pi.metadata.courseName || 'N/A'}`);
          console.log(`     - Course Slug: ${pi.metadata.courseSlug || 'N/A'}`);
          console.log(`     - Plan: ${pi.metadata.selectedPlan || 'N/A'}`);
          console.log(`     - Quantity: ${pi.metadata.quantity || '1'}`);
          console.log(`     - Promo Code: ${pi.metadata.promoCode || 'N/A'}`);
          console.log(`     - Promo Discount: $${pi.metadata.promoDiscount || '0'}`);
          console.log(`     - Original Amount: $${pi.metadata.originalAmount ? (parseFloat(pi.metadata.originalAmount)).toFixed(2) : 'N/A'}`);
          console.log(`     - Final Amount: $${pi.metadata.finalAmount ? (parseFloat(pi.metadata.finalAmount)).toFixed(2) : 'N/A'}`);
          
          // Calculate expected vs actual
          const originalAmount = pi.metadata.originalAmount ? parseFloat(pi.metadata.originalAmount) : null;
          const promoDiscount = pi.metadata.promoDiscount ? parseFloat(pi.metadata.promoDiscount) : 0;
          const actualAmount = pi.amount / 100;
          
          if (originalAmount) {
            const expectedAmount = originalAmount - promoDiscount;
            console.log(`\n   ⚠️  AMOUNT ANALYSIS:`);
            console.log(`     - Expected (with discount): $${expectedAmount.toFixed(2)}`);
            console.log(`     - Actually Charged: $${actualAmount.toFixed(2)}`);
            console.log(`     - Difference: $${(actualAmount - expectedAmount).toFixed(2)}`);
            
            if (Math.abs(actualAmount - expectedAmount) > 0.01) {
              console.log(`     ❌ MISMATCH DETECTED!`);
            } else {
              console.log(`     ✅ Amounts match`);
            }
          }
        }

        // Get charges for this payment intent
        const charges = await stripe.charges.list({
          payment_intent: pi.id,
          limit: 10,
        });
        
        if (charges.data.length > 0) {
          console.log(`\n   Charges:`);
          for (const charge of charges.data) {
            console.log(`     - Charge ID: ${charge.id}`);
            console.log(`       Amount: $${(charge.amount / 100).toFixed(2)}`);
            console.log(`       Status: ${charge.status}`);
            console.log(`       Receipt URL: ${charge.receipt_url || 'N/A'}`);
          }
        }
      }
    }

    // 3. Get orders from database
    console.log('\n3. Orders in Database:');
    console.log('-'.repeat(60));
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (ordersError) {
      console.log(`   Error querying orders: ${ordersError.message}`);
    } else if (!orders || orders.length === 0) {
      console.log('   No orders found in database for this customer');
    } else {
      for (const order of orders) {
        console.log(`\n   Order ID: ${order.id}`);
        console.log(`   Payment Intent ID: ${order.payment_intent_id}`);
        console.log(`   Course: ${order.course_name || 'N/A'}`);
        console.log(`   Amount: $${order.amount?.toFixed(2) || 'N/A'}`);
        console.log(`   Plan: ${order.plan || 'N/A'}`);
        console.log(`   Quantity: ${order.quantity || '1'}`);
        console.log(`   Customer Email: ${order.customer_email || 'N/A'}`);
        console.log(`   Created: ${order.created_at || 'N/A'}`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('Investigation complete!\n');

  } catch (error) {
    console.error('Error investigating payment:', error);
    process.exit(1);
  }
}

// Get customer ID from command line arguments
const customerId = process.argv[2];

if (!customerId) {
  console.error('Please provide a Stripe customer ID');
  console.error('Usage: node scripts/investigate-payment.js cus_XXXXX');
  process.exit(1);
}

investigatePayment(customerId);

