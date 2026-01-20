import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

// Initialize Stripe - NOTE: You need your SECRET KEY (sk_live_...), not the publishable key (pk_live_...)
const stripeKey = process.env.STRIPE_SECRET_KEY 
  || process.env.STRIPE_SECRET_KEY_LIVE 
  || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  || process.env.SK_LIVE_STRIPE_KEY;
const stripe = new Stripe(stripeKey || '', {
  apiVersion: '2025-11-17.clover' as any,
});

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

if (!stripeKey) {
  console.error('Missing Stripe secret key');
  console.error('NOTE: You need your SECRET KEY (sk_live_...), not the publishable key (pk_live_...)');
  console.error('Set STRIPE_SECRET_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncCustomerNames() {
  try {
    console.log('Fetching customers from Supabase...');
    
    // Get all customers with stripe_customer_id from Supabase (with pagination)
    let allCustomers: any[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;
    
    while (hasMore) {
      const { data: customers, error: fetchError } = await supabase
        .from('customers')
        .select('email, stripe_customer_id, name')
        .not('stripe_customer_id', 'is', null)
        .range(page * pageSize, (page + 1) * pageSize - 1);
      
      if (fetchError) {
        throw new Error(`Error fetching customers: ${fetchError.message}`);
      }
      
      if (customers && customers.length > 0) {
        allCustomers = allCustomers.concat(customers);
        console.log(`Fetched page ${page + 1}: ${customers.length} customers (total so far: ${allCustomers.length})`);
        page++;
        hasMore = customers.length === pageSize;
      } else {
        hasMore = false;
      }
    }
    
    const customers = allCustomers;
    console.log(`Found ${customers.length} total customers with Stripe IDs in Supabase`);
    
    let updated = 0;
    let skipped = 0;
    let notFound = 0;
    let errors = 0;
    
    // Process each customer
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      
      // Skip if already has a name
      if (customer.name && customer.name.trim() !== '') {
        skipped++;
        if (i % 100 === 0) {
          console.log(`Processed ${i}/${customers.length}... (skipping ${customer.email} - already has name)`);
        }
        continue;
      }
      
      try {
        // Fetch customer from Stripe using stripe_customer_id
        const stripeCustomer = await stripe.customers.retrieve(customer.stripe_customer_id);
        
        if (stripeCustomer.deleted) {
          console.log(`⚠️  Customer ${customer.stripe_customer_id} is deleted in Stripe`);
          notFound++;
          continue;
        }
        
        // Get the name - try multiple fields
        let fullName = stripeCustomer.name;
        
        // If no name, try description or metadata
        if (!fullName || fullName.trim() === '') {
          fullName = stripeCustomer.description || '';
        }
        
        // Try metadata if still no name
        if ((!fullName || fullName.trim() === '') && stripeCustomer.metadata) {
          fullName = stripeCustomer.metadata.name || stripeCustomer.metadata.customer_name || '';
        }
        
        if (!fullName || fullName.trim() === '') {
          console.log(`⚠️  No name found for ${customer.email} (${customer.stripe_customer_id})`);
          notFound++;
          continue;
        }
        
        // Update in Supabase using email as primary key
        const { error: updateError } = await supabase
          .from('customers')
          .update({
            name: fullName.trim()
          })
          .eq('email', customer.email);
        
        if (updateError) {
          console.error(`Error updating ${customer.email}:`, updateError);
          errors++;
        } else {
          updated++;
          console.log(`✓ Updated ${i + 1}/${customers.length}: ${fullName} (${customer.email})`);
        }
        
        // Rate limiting - Stripe allows 100 requests per second, so this is conservative
        if (i % 50 === 0 && i > 0) {
          console.log(`Processed ${i}/${customers.length}... pausing briefly`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error: any) {
        if (error.code === 'resource_missing') {
          console.log(`⚠️  Customer ${customer.stripe_customer_id} not found in Stripe`);
          notFound++;
        } else {
          console.error(`Error processing ${customer.email} (${customer.stripe_customer_id}):`, error.message);
          errors++;
        }
      }
    }
    
    console.log('\n✅ Sync complete!');
    console.log(`   Updated: ${updated}`);
    console.log(`   Skipped (already had name): ${skipped}`);
    console.log(`   Not found/No name: ${notFound}`);
    console.log(`   Errors: ${errors}`);
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

syncCustomerNames();
