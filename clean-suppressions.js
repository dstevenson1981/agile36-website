#!/usr/bin/env node

/**
 * Clean Suppressions Script
 * 
 * Fetches all suppressed emails from SendGrid API and deletes them from Supabase.
 * 
 * Usage: node clean-suppressions.js
 * 
 * Environment variables required:
 * - SENDGRID_API_KEY
 * - NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL)
 * - SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!SENDGRID_API_KEY) {
  console.error('❌ Error: SENDGRID_API_KEY environment variable is required');
  process.exit(1);
}

if (!SUPABASE_URL) {
  console.error('❌ Error: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL environment variable is required');
  process.exit(1);
}

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Fetch all suppressed emails from SendGrid API with pagination
 * @param {string} endpoint - SendGrid API endpoint
 * @param {string} type - Type of suppression (for logging)
 * @returns {Promise<string[]>} Array of email addresses
 */
async function fetchSuppressedEmails(endpoint, type) {
  const emails = [];
  let page = 1;
  const pageSize = 500; // SendGrid max per page
  let hasMore = true;

  console.log(`\n📥 Fetching ${type} from SendGrid...`);

  while (hasMore) {
    try {
      const url = `${endpoint}?page_size=${pageSize}&page=${page}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SendGrid API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn(`⚠️  Unexpected response format for ${type}`);
        break;
      }

      // Extract email addresses from the response
      const pageEmails = data.map(item => {
        // Handle different response formats
        if (typeof item === 'string') {
          return item;
        } else if (item.email) {
          return item.email;
        } else if (item.created && item.email) {
          return item.email;
        }
        return null;
      }).filter(email => email && email.includes('@'));

      emails.push(...pageEmails);
      console.log(`   Page ${page}: Found ${pageEmails.length} emails (Total: ${emails.length})`);

      // Check if there are more pages
      if (data.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Error fetching ${type} (page ${page}):`, error.message);
      hasMore = false;
    }
  }

  console.log(`✅ Total ${type}: ${emails.length} emails`);
  return emails;
}

/**
 * Delete emails from Supabase
 * @param {string[]} emails - Array of email addresses to delete
 * @returns {Promise<{deleted: number, notFound: number}>}
 */
async function deleteEmailsFromSupabase(emails) {
  if (emails.length === 0) {
    return { deleted: 0, notFound: 0 };
  }

  console.log(`\n🗑️  Deleting ${emails.length} emails from Supabase...`);

  // Normalize emails (lowercase, trim)
  const normalizedEmails = emails.map(email => email.toLowerCase().trim());

  // Delete in batches to avoid query size limits
  const batchSize = 100; // Reduced batch size for better reliability
  let totalDeleted = 0;
  let totalNotFound = 0;

  for (let i = 0; i < normalizedEmails.length; i += batchSize) {
    const batch = normalizedEmails.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    
    try {
      // First, check how many exist
      const { data: existing, error: checkError } = await supabase
        .from('email_contacts')
        .select('email')
        .in('email', batch);

      if (checkError) {
        console.error(`❌ Error checking batch ${batchNum}:`, checkError.message);
        continue;
      }

      const existingEmails = existing?.map(r => r.email.toLowerCase()) || [];
      const toDelete = batch.filter(email => existingEmails.includes(email.toLowerCase()));

      if (toDelete.length === 0) {
        console.log(`   Batch ${batchNum}: No matching contacts found (${batch.length} emails checked)`);
        totalNotFound += batch.length;
        continue;
      }

      // Delete the emails that exist
      const { data: deleted, error } = await supabase
        .from('email_contacts')
        .delete()
        .in('email', toDelete)
        .select('email');

      if (error) {
        console.error(`❌ Error deleting batch ${batchNum}:`, error.message);
        console.error(`   Error details:`, error);
        continue;
      }

      const deletedCount = deleted?.length || 0;
      totalDeleted += deletedCount;
      totalNotFound += (batch.length - deletedCount);

      console.log(`   Batch ${batchNum}: Deleted ${deletedCount} contacts (${batch.length - deletedCount} not found)`);
      
      // Small delay between batches
      if (i + batchSize < normalizedEmails.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`❌ Error processing batch ${batchNum}:`, error.message);
      console.error(`   Stack:`, error.stack);
    }
  }

  return { deleted: totalDeleted, notFound: totalNotFound };
}

/**
 * Test Supabase connection
 */
async function testSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    const { data, error } = await supabase
      .from('email_contacts')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error.message);
      console.error('   Code:', error.code);
      console.error('   Details:', error.details);
      return false;
    }
    
    console.log('✅ Supabase connection successful\n');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test error:', error.message);
    console.error('   Stack:', error.stack);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting clean-suppressions script...\n');
  
  // Test Supabase connection first
  const connectionOk = await testSupabaseConnection();
  if (!connectionOk) {
    console.error('\n❌ Cannot connect to Supabase. Please check:');
    console.error('   1. NEXT_PUBLIC_SUPABASE_URL is correct');
    console.error('   2. SUPABASE_SERVICE_ROLE_KEY is correct');
    console.error('   3. Network connectivity to Supabase');
    process.exit(1);
  }
  
  console.log('📋 Fetching suppressed emails from SendGrid API...\n');

  const startTime = Date.now();

  try {
    // Fetch all types of suppressions
    const [bounces, spamReports, blocks, invalidEmails] = await Promise.all([
      fetchSuppressedEmails('https://api.sendgrid.com/v3/suppression/bounces', 'Bounces'),
      fetchSuppressedEmails('https://api.sendgrid.com/v3/suppression/spam_reports', 'Spam Reports'),
      fetchSuppressedEmails('https://api.sendgrid.com/v3/suppression/blocks', 'Blocks'),
      fetchSuppressedEmails('https://api.sendgrid.com/v3/suppression/invalid_emails', 'Invalid Emails'),
    ]);

    // Combine all emails and remove duplicates
    const allEmails = [...bounces, ...spamReports, ...blocks, ...invalidEmails];
    const uniqueEmails = [...new Set(allEmails.map(email => email.toLowerCase().trim()))];

    console.log(`\n📊 Summary:`);
    console.log(`   Bounces: ${bounces.length}`);
    console.log(`   Spam Reports: ${spamReports.length}`);
    console.log(`   Blocks: ${blocks.length}`);
    console.log(`   Invalid Emails: ${invalidEmails.length}`);
    console.log(`   Total (with duplicates): ${allEmails.length}`);
    console.log(`   Unique emails: ${uniqueEmails.length}`);

    if (uniqueEmails.length === 0) {
      console.log('\n✅ No suppressed emails found. Nothing to delete.');
      return;
    }

    // Delete from Supabase
    const { deleted, notFound } = await deleteEmailsFromSupabase(uniqueEmails);

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(`\n✅ Cleanup complete!`);
    console.log(`   Total emails processed: ${uniqueEmails.length}`);
    console.log(`   Deleted: ${deleted}`);
    console.log(`   Not found in database: ${notFound}`);
    console.log(`   Duration: ${duration}s`);
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

