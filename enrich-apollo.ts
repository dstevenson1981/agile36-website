import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Apollo API configuration
const APOLLO_API_KEY = process.env.APOLLO_API_KEY || 'D2fPk6LElk4FnK7PAVSx3g';
const APOLLO_BULK_API_URL = 'https://api.apollo.io/api/v1/people/bulk_match';

// Sleep function for rate limiting
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to split name into first and last
function splitName(fullName: string): { first_name: string | null; last_name: string | null } {
  if (!fullName || fullName.trim() === '') {
    return { first_name: null, last_name: null };
  }
  
  const cleaned = fullName.trim();
  const parts = cleaned.split(' ');
  
  if (parts.length === 1) {
    return { first_name: parts[0], last_name: null };
  }
  
  const first_name = parts[0];
  const last_name = parts.slice(1).join(' ');
  
  return { first_name, last_name };
}

async function enrichBulkWithApollo(customers: any[]) {
  try {
    // Prepare the details array for bulk enrichment
    const details = customers.map(customer => {
      // Use existing first_name/last_name if available, otherwise split name
      let first_name = customer.first_name;
      let last_name = customer.last_name;
      
      if (!first_name && customer.name) {
        const split = splitName(customer.name);
        first_name = split.first_name;
        last_name = split.last_name;
      }
      
      return {
        first_name: first_name || null,
        last_name: last_name || null,
        email: customer.email
      };
    });

    // Log first customer for debugging
    if (details.length > 0) {
      console.log(`    Sending to Apollo: ${details[0].email} (${details[0].first_name} ${details[0].last_name})`);
    }

    // Prepare request body according to Apollo API docs
    const requestBody: any = {
      details: details
    };
    
    // Optionally reveal personal emails and phone numbers
    // Note: reveal_phone_number requires webhook_url, so we'll set to false
    // Set to true if you want personal contact info (may cost more credits)
    requestBody.reveal_personal_emails = false;
    requestBody.reveal_phone_number = false;

    const response = await fetch(APOLLO_BULK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': APOLLO_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`    Apollo API error: ${response.status} - ${errorText}`);
      throw new Error(`Apollo API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Apollo returns matches in different formats - check both
    const matches = data.matches || data.people || [];
    
    // Log first match structure for debugging
    if (matches.length > 0 && details.length > 0) {
      console.log(`    ✓ Apollo found ${matches.length} match(es) in this batch`);
      // Log structure of first match
      if (matches[0]) {
        console.log(`    Sample match structure:`, JSON.stringify(Object.keys(matches[0])).substring(0, 100));
      }
    } else if (matches.length === 0 && details.length > 0) {
      console.log(`    ⚠️  Apollo returned no matches for this batch`);
      // Log response structure if no matches
      console.log(`    Response keys:`, Object.keys(data).join(', '));
    }
    
    return matches;

  } catch (error: any) {
    console.error(`    Error with bulk enrichment:`, error.message);
    return [];
  }
}

async function enrichCustomers() {
  try {
    console.log('Fetching customers from Supabase...');
    
    // Get all customers with corporate emails that haven't been enriched yet
    // Only corporate emails (exclude Gmail, Yahoo, Hotmail, Outlook, AOL, iCloud, etc.)
    const { data: customers, error: fetchError } = await supabase
      .from('customers')
      .select('email, name, first_name, last_name, stripe_customer_id')
      .not('name', 'is', null)
      .not('email', 'is', null)
      .not('email', 'ilike', '%@gmail.com')
      .not('email', 'ilike', '%@yahoo.com')
      .not('email', 'ilike', '%@hotmail.com')
      .not('email', 'ilike', '%@outlook.com')
      .not('email', 'ilike', '%@aol.com')
      .not('email', 'ilike', '%@icloud.com')
      .not('email', 'ilike', '%@live.com')
      .not('email', 'ilike', '%@msn.com')
      .not('email', 'ilike', '%@protonmail.com')
      .not('email', 'ilike', '%@mail.com')
      .not('email', 'ilike', '%@yandex.com')
      .not('email', 'ilike', '%@zoho.com')
      .not('email', 'ilike', '%@gmx.com')
      // Only enrich customers that don't have apollo_raw_data yet
      // This prevents wasting credits on customers we already enriched
      .is('apollo_raw_data', null);
    
    if (fetchError) {
      throw new Error(`Error fetching customers: ${fetchError.message}`);
    }
    
    console.log(`Found ${customers.length} corporate email customers to enrich`);
    
    if (customers.length === 0) {
      console.log('No customers to enrich!');
      return;
    }

    let enriched = 0;
    let notFound = 0;
    let errors = 0;
    
    // Process in batches of 10 (Apollo bulk limit)
    const batchSize = 10;
    const totalBatches = Math.ceil(customers.length / batchSize);
    
    for (let i = 0; i < customers.length; i += batchSize) {
      const batchNum = Math.floor(i / batchSize) + 1;
      const batch = customers.slice(i, i + batchSize);
      
      console.log(`\nProcessing batch ${batchNum}/${totalBatches} (${i + 1}-${Math.min(i + batchSize, customers.length)} of ${customers.length})`);
      
      // Enrich batch with Apollo
      const matches = await enrichBulkWithApollo(batch);
      
      // Process each match
      // Apollo returns matches that may not be in the same order as the input
      // We need to match by email
      for (let j = 0; j < batch.length; j++) {
        const customer = batch[j];
        
        // Find the match for this customer by email
        const match = matches.find((m: any) => {
          if (!m) return false;
          const person = m.person || m;
          if (!person) return false;
          const matchEmails = [
            person.email,
            person.emails?.[0]?.address,
            ...(person.emails || []).map((e: any) => e?.address)
          ].filter(Boolean).map((e: string) => e.toLowerCase().trim());
          return matchEmails.includes(customer.email.toLowerCase().trim());
        });
        
        if (match && (match.person || match)) {
          const person = match.person || match;
          
          // CRITICAL: Verify email matches to ensure we have the right person
          // Apollo returns emails in various formats, so we check all email fields
          const apolloEmails = [
            person.email,
            person.emails?.[0]?.address,
            ...(person.emails || []).map((e: any) => e.address)
          ].filter(Boolean).map((e: string) => e.toLowerCase().trim());
          
          const customerEmail = customer.email.toLowerCase().trim();
          const emailMatches = apolloEmails.some((email: string) => email === customerEmail);
          
          if (!emailMatches) {
            console.log(`  ⚠️  ${customer.email}: Email mismatch - Apollo has ${apolloEmails[0] || 'no email'}, skipping`);
            notFound++;
            continue;
          }
          
          // Extract enriched data
          // Log person structure for first match to debug
          if (enriched === 0) {
            console.log(`    DEBUG - Person structure:`, JSON.stringify(Object.keys(person)).substring(0, 200));
            console.log(`    DEBUG - person.title:`, person.title);
            console.log(`    DEBUG - person.organization:`, person.organization ? JSON.stringify(Object.keys(person.organization)).substring(0, 100) : 'null');
          }
          
          // Apollo returns data in different structures - handle both
          // Sometimes organization is nested, sometimes it's at the person level
          const organization = person.organization || person.organization_name ? {
            name: person.organization?.name || person.organization_name || null,
            website_url: person.organization?.website_url || person.organization_website_url || null,
            estimated_num_employees: person.organization?.estimated_num_employees || person.organization_estimated_num_employees || null,
            industry: person.organization?.industry || person.organization_industry || null
          } : null;
          
          // Store the complete raw Apollo response as JSON
          const apolloRawData = JSON.parse(JSON.stringify(person)); // Deep copy to avoid circular references
          
          const enrichedData: any = {
            apollo_id: person.id?.toString() || null,
            job_title: person.title || person.job_title || null,
            company_name: organization?.name || person.company_name || null,
            company_website: organization?.website_url || person.company_website || null,
            company_size: organization?.estimated_num_employees?.toString() || person.company_size?.toString() || null,
            company_industry: organization?.industry || person.company_industry || null,
            linkedin_url: person.linkedin_url || null,
            phone_number: person.phone_numbers?.[0]?.raw_number || person.phone_numbers?.[0]?.sanitized_number || person.phone_number || null,
            city: person.city || null,
            state: person.state || null,
            country: person.country || null,
            seniority: person.seniority || null,
            departments: person.departments?.join(', ') || person.department || null,
            apollo_raw_data: apolloRawData, // Store complete Apollo response
            enriched_at: new Date().toISOString()
          };
          
          // Log what we're about to save
          if (enriched === 0) {
            console.log(`    DEBUG - enrichedData.job_title:`, enrichedData.job_title);
            console.log(`    DEBUG - enrichedData.company_name:`, enrichedData.company_name);
          }
          
          // Also update first_name and last_name if we have them from Apollo
          if (person.first_name) {
            enrichedData.first_name = person.first_name;
          }
          if (person.last_name) {
            enrichedData.last_name = person.last_name;
          }
          
          // Update in Supabase using email as primary key
          const { error: updateError, data: updateData } = await supabase
            .from('customers')
            .update(enrichedData)
            .eq('email', customer.email)
            .select('job_title, company_name')
            .single();
          
          if (updateError) {
            console.error(`  ❌ Error updating ${customer.email}:`, updateError.message);
            console.error(`  Update data attempted:`, JSON.stringify(enrichedData).substring(0, 200));
            errors++;
          } else {
            enriched++;
            // Verify what was actually saved
            const savedTitle = updateData?.job_title || 'N/A';
            const savedCompany = updateData?.company_name || 'N/A';
            console.log(`  ✓ ${customer.email}: ${savedTitle} at ${savedCompany} (verified email match)`);
            
            // Warn if data didn't save
            if (enrichedData.job_title && !updateData?.job_title) {
              console.log(`    ⚠️  WARNING: job_title not saved! Attempted: ${enrichedData.job_title}`);
            }
            if (enrichedData.company_name && !updateData?.company_name) {
              console.log(`    ⚠️  WARNING: company_name not saved! Attempted: ${enrichedData.company_name}`);
            }
          }
        } else {
          notFound++;
          console.log(`  ⚠️  ${customer.email}: No match found in Apollo`);
        }
      }
      
      // Rate limiting - brief pause between batches (Apollo rate limit is ~120 requests/min)
      if (i + batchSize < customers.length) {
        await sleep(1000); // 1 second between batches
      }
    }
    
    console.log('\n✅ Enrichment complete!');
    console.log(`   Successfully enriched: ${enriched}`);
    console.log(`   Not found in Apollo: ${notFound}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total processed: ${customers.length}`);
    
  } catch (error: any) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

enrichCustomers();
