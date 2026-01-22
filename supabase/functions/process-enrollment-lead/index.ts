/**
 * Process Enrollment Lead Edge Function
 * 
 * Triggered when a new row is inserted into enrollment_leads.
 * Handles:
 * - Person enrichment via Apollo API
 * - Lookalike generation
 * - Recovery email scheduling
 */

import { enrichPerson, searchLookalikes } from '../_shared/apollo-client.ts';
import { supabase } from '../_shared/supabase-client.ts';

// Free email providers to skip enrichment
const FREE_EMAIL_PROVIDERS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'yandex.com',
];

interface EnrollmentLead {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  job_title?: string | null;
  company_name?: string | null;
  company_size?: number | null;
  seniority?: string | null;
  enriched_at?: string | null;
}

interface LookalikePerson {
  email?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  title?: string;
  job_title?: string;
  organization?: {
    name?: string;
    estimated_num_employees?: number;
  };
  linkedin_url?: string;
  seniority?: string;
}

function isCorporateEmail(email: string): boolean {
  if (!email) return false;
  
  const emailLower = email.toLowerCase();
  return !FREE_EMAIL_PROVIDERS.some(provider => emailLower.includes(`@${provider}`));
}

Deno.serve(async (req) => {
  try {
    console.log('Processing enrollment lead...');
    
    // Parse request body
    const body = await req.json();
    const record: EnrollmentLead = body.record || body;
    
    if (!record || !record.email) {
      console.error('Invalid enrollment lead record:', record);
      return new Response(
        JSON.stringify({ error: 'Invalid enrollment lead record' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { id, email, first_name, last_name, created_at } = record;
    console.log(`Processing enrollment lead: ${email} (ID: ${id})`);

    // Step 3: Check if corporate email
    const isCorporate = isCorporateEmail(email);
    console.log(`Email ${email} is ${isCorporate ? 'corporate' : 'free email provider'}`);

    // Step 4: Enrich and expand (corporate emails only)
    if (isCorporate) {
      try {
        console.log(`Enriching person: ${email}`);
        const enrichedPerson = await enrichPerson(email);

        if (enrichedPerson) {
          console.log('Enrichment successful:', {
            job_title: enrichedPerson.title || enrichedPerson.job_title,
            company: enrichedPerson.organization?.name,
            company_size: enrichedPerson.organization?.estimated_num_employees,
            seniority: enrichedPerson.seniority,
          });

          // Update enrollment_leads with enrichment data
          const updateData: any = {
            enriched_at: new Date().toISOString(),
          };

          if (enrichedPerson.title || enrichedPerson.job_title) {
            updateData.job_title = enrichedPerson.title || enrichedPerson.job_title;
          }
          if (enrichedPerson.organization?.name) {
            updateData.company_name = enrichedPerson.organization.name;
          }
          if (enrichedPerson.organization?.estimated_num_employees) {
            updateData.company_size = enrichedPerson.organization.estimated_num_employees;
          }
          if (enrichedPerson.seniority) {
            updateData.seniority = enrichedPerson.seniority;
          }

          const { error: updateError } = await supabase
            .from('enrollment_leads')
            .update(updateData)
            .eq('id', id);

          if (updateError) {
            console.error('Error updating enrollment_leads:', updateError);
          } else {
            console.log('Successfully updated enrollment_leads with enrichment data');
          }

          // Search for lookalikes if we have company and job title
          const companyName = enrichedPerson.organization?.name;
          const jobTitle = enrichedPerson.title || enrichedPerson.job_title;

          if (companyName && jobTitle) {
            try {
              console.log(`Searching for lookalikes at ${companyName} with job title ${jobTitle}`);
              const lookalikes = await searchLookalikes(companyName, jobTitle, 7);

              console.log(`Found ${lookalikes.length} lookalikes`);

              // Insert lookalikes into expansion_opportunities
              if (lookalikes.length > 0) {
                const expansionOpportunities = lookalikes
                  .filter((lookalike: LookalikePerson) => {
                    // Only include if has email and email is different from original
                    return lookalike.email && 
                           lookalike.email.toLowerCase() !== email.toLowerCase();
                  })
                  .map((lookalike: LookalikePerson) => ({
                    email: lookalike.email?.toLowerCase() || '',
                    first_name: lookalike.first_name || lookalike.name?.split(' ')[0] || null,
                    last_name: lookalike.last_name || lookalike.name?.split(' ').slice(1).join(' ') || null,
                    job_title: lookalike.title || lookalike.job_title || null,
                    company_name: companyName,
                    company_size: lookalike.organization?.estimated_num_employees || null,
                    seniority: lookalike.seniority || null,
                    linkedin_url: lookalike.linkedin_url || null,
                    source: 'enrollment_lookalike',
                    source_email: email,
                  }));

                if (expansionOpportunities.length > 0) {
                  const { error: insertError } = await supabase
                    .from('expansion_opportunities')
                    .upsert(expansionOpportunities, {
                      onConflict: 'email,source',
                      ignoreDuplicates: true,
                    });

                  if (insertError) {
                    console.error('Error inserting expansion opportunities:', insertError);
                  } else {
                    console.log(`Successfully inserted ${expansionOpportunities.length} expansion opportunities`);
                  }
                }
              }
            } catch (lookalikeError: any) {
              console.error('Error searching for lookalikes:', lookalikeError.message);
              // Continue even if lookalike search fails
            }
          } else {
            console.log('Skipping lookalike search - missing company_name or job_title');
          }
        } else {
          console.log('No enrichment data returned from Apollo');
        }
      } catch (enrichmentError: any) {
        console.error('Error enriching person:', enrichmentError.message);
        // Continue to email scheduling even if enrichment fails
      }
    } else {
      console.log('Skipping enrichment for free email provider');
    }

    // Step 5: Schedule recovery email
    try {
      const recipientName = first_name || 'there';
      const emailSubject = 'Complete your order - $150 OFF inside';
      const emailBody = `Hi ${recipientName},

You started checking out but didn't complete your order. Complete your purchase now with $150 OFF using code 150OFF.

Visit: https://agile36.com

Thank you,
Agile36 Team`;

      // Calculate scheduled_for: created_at + 1 hour
      const createdAt = new Date(created_at);
      const scheduledFor = new Date(createdAt.getTime() + 60 * 60 * 1000); // Add 1 hour

      const { error: emailQueueError } = await supabase
        .from('email_queue')
        .insert({
          recipient_email: email,
          recipient_name: recipientName,
          subject: emailSubject,
          body: emailBody,
          scheduled_for: scheduledFor.toISOString(),
          status: 'pending',
        });

      if (emailQueueError) {
        console.error('Error inserting into email_queue:', emailQueueError);
        // Still return success - the main processing is done
      } else {
        console.log(`Recovery email scheduled for ${scheduledFor.toISOString()}`);
      }
    } catch (emailError: any) {
      console.error('Error scheduling recovery email:', emailError.message);
      // Still return success - enrichment was the main goal
    }

    // Step 6: Return success response
    console.log(`Successfully processed enrollment lead: ${email}`);
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enrollment lead processed successfully',
        enrollment_id: id,
        email: email,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Fatal error processing enrollment lead:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error processing enrollment lead',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});
