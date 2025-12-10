import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Rate limiting: SendGrid allows 100 emails per second on free tier
const RATE_LIMIT_PER_SECOND = 50; // Conservative limit
const DELAY_BETWEEN_BATCHES = 1000; // 1 second

// Helper function to generate unsubscribe token
function generateUnsubscribeToken(email: string, campaignId: number): string {
  const data = `${email}-${campaignId}-${Date.now()}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Helper function to add unsubscribe link to email
function addUnsubscribeLink(htmlContent: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agile36.com';
  const unsubscribeUrl = `${baseUrl}/unsubscribe/${token}`;
  
  const unsubscribeFooter = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;">
      <p>You're receiving this email because you subscribed to Agile36 updates.</p>
      <p><a href="${unsubscribeUrl}" style="color: #0066cc;">Unsubscribe from this list</a></p>
    </div>
  `;
  
  // Insert before closing body tag, or append if no body tag
  if (htmlContent.includes('</body>')) {
    return htmlContent.replace('</body>', `${unsubscribeFooter}</body>`);
  }
  return htmlContent + unsubscribeFooter;
}

// Helper function to add unsubscribe link to plain text email
function addUnsubscribeLinkText(textContent: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agile36.com';
  const unsubscribeUrl = `${baseUrl}/unsubscribe/${token}`;
  
  const unsubscribeFooter = `\n\n---\nYou're receiving this email because you subscribed to Agile36 updates.\nUnsubscribe: ${unsubscribeUrl}`;
  
  return textContent + unsubscribeFooter;
}

export async function POST(request: NextRequest) {
  try {
    const { campaignId, tagFilters, tagsToAdd, dateRange, sendImmediately = true } = await request.json();

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    // Check SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json(
        { error: 'SendGrid API key not configured' },
        { status: 500 }
      );
    }

    // Supabase setup
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Get campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    if (campaign.status === 'sent') {
      return NextResponse.json(
        { error: 'Campaign has already been sent' },
        { status: 400 }
      );
    }

    // Get contacts based on filters
    // Exclude blocked contacts and only get subscribed contacts
    let contactsQuery = supabase
      .from('email_contacts')
      .select('*')
      .eq('subscribed', true)
      .eq('blocked', false); // Exclude blocked contacts

    // Declare contacts variable
    let contacts: any[] = [];

    // If dateRange is provided, filter by creation date first
    if (dateRange) {
      const now = new Date();
      let startDate: Date;
      
      switch (dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'lastHour':
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case 'last24Hours':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'lastWeek':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(0);
      }
      
      contactsQuery = contactsQuery.gte('created_at', startDate.toISOString());
    }

    // If tag filters are provided, use database-level filtering for better performance
    if (tagFilters && tagFilters.length > 0) {
      // Use Supabase's contains filter - check if tags array contains any of the requested tags
      // Note: contains checks if the array contains ALL elements, so we need to check each tag separately
      // We'll use OR logic by checking each tag and combining results
      const tagQueries = tagFilters.map((tag: string) => 
        supabase
          .from('email_contacts')
          .select('*')
          .eq('subscribed', true)
          .contains('tags', [tag])
      );
      
      // Execute all tag queries
      const tagQueryResults = await Promise.all(tagQueries);
      const allTagContacts = new Map();
      
      // Combine results, removing duplicates
      tagQueryResults.forEach(({ data, error }) => {
        if (!error && data) {
          data.forEach((contact: any) => {
            allTagContacts.set(contact.id, contact);
          });
        }
      });
      
      const { data: allContacts, error: contactsError } = { 
        data: Array.from(allTagContacts.values()), 
        error: null 
      };
      
      if (contactsError) {
        console.error('Error fetching contacts:', contactsError);
        return NextResponse.json(
          { error: 'Failed to fetch contacts' },
          { status: 500 }
        );
      }
      
      contacts = allContacts || [];
      console.log(`Database query found ${contacts.length} subscribed contacts with tags: ${tagFilters.join(', ')}`);
    } else {
      // Fetch all subscribed contacts if no tag filters
      const { data: allContacts, error: contactsError } = await contactsQuery;

      if (contactsError) {
        console.error('Error fetching contacts:', contactsError);
        return NextResponse.json(
          { error: 'Failed to fetch contacts' },
          { status: 500 }
        );
      }
      
      contacts = allContacts || [];
    }
    
    // Additional JavaScript filtering for edge cases (if needed)
    if (tagFilters && tagFilters.length > 0 && contacts.length === 0) {
      console.log('Filtering by tags:', tagFilters);
      console.log(`Total subscribed contacts before filtering: ${contacts.length}`);
      
      // Fetch all subscribed contacts for debugging
      const { data: allContactsForDebug } = await supabase
        .from('email_contacts')
        .select('*')
        .eq('subscribed', true);
      
      // Debug: Show sample of contact tags
      const sampleContacts = allContactsForDebug?.slice(0, 5) || [];
      console.log('Sample contact tags:', sampleContacts.map((c: any) => ({ email: c.email, tags: c.tags, tagsType: typeof c.tags, isArray: Array.isArray(c.tags) })));
      console.log('Requested tag filters:', tagFilters);
      console.log('Tag filters type:', tagFilters.map((t: string) => ({ tag: t, type: typeof t, length: t.length, charCodes: t.split('').map((c: string) => c.charCodeAt(0)) })));
      
      contacts = contacts.filter((contact: any) => {
        if (!contact.tags) {
          return false; // No tags means doesn't match
        }
        
        // Handle both array and non-array tags
        let contactTags: string[] = [];
        if (Array.isArray(contact.tags)) {
          contactTags = contact.tags;
        } else if (typeof contact.tags === 'string') {
          // If tags is a string, try to parse it as JSON array
          try {
            contactTags = JSON.parse(contact.tags);
          } catch {
            contactTags = [contact.tags];
          }
        }
        
        if (contactTags.length === 0) {
          return false;
        }
        
        // Check if contact has at least one of the selected tags (case-insensitive)
        const hasMatchingTag = tagFilters.some((tag: string) => {
          const normalizedTag = tag?.toString().trim().toLowerCase();
          return contactTags.some((contactTag: string) => {
            const normalizedContactTag = contactTag?.toString().trim().toLowerCase();
            const matches = normalizedContactTag === normalizedTag;
            if (matches) {
              console.log(`Match found: "${contactTag}" matches "${tag}" for contact ${contact.email}`);
            }
            return matches;
          });
        });
        
        return hasMatchingTag;
      });
      
      console.log(`Filtered to ${contacts.length} contacts with tags: ${tagFilters.join(', ')}`);
      
      if (contacts.length === 0) {
        // Additional debug info - check ALL contacts (including unsubscribed) to see if tag exists
        const { data: allContactsIncludingUnsubscribed } = await supabase
          .from('email_contacts')
          .select('*');
        
        // Also try a direct database query using PostgreSQL array operators
        // Try using Supabase's array contains operator
        let directQueryResults: any[] = [];
        for (const tag of tagFilters) {
          const { data: results } = await supabase
            .from('email_contacts')
            .select('*')
            .eq('subscribed', true)
            .contains('tags', [tag]);
          if (results) {
            directQueryResults = [...directQueryResults, ...results];
          }
        }
        // Remove duplicates
        const uniqueDirectResults = Array.from(new Map(directQueryResults.map(c => [c.id, c])).values());
        
        console.log('Direct PostgreSQL query results:', uniqueDirectResults.length);
        
        const contactsWithTags = allContactsForDebug?.filter((c: any) => {
          if (!c.tags) return false;
          const tags = Array.isArray(c.tags) ? c.tags : (typeof c.tags === 'string' ? JSON.parse(c.tags) : []);
          return tags.length > 0;
        }) || [];
        
        const allContactsWithRequestedTags = allContactsIncludingUnsubscribed?.filter((c: any) => {
          if (!c.tags) return false;
          let contactTags: string[] = [];
          if (Array.isArray(c.tags)) {
            contactTags = c.tags;
          } else if (typeof c.tags === 'string') {
            try {
              contactTags = JSON.parse(c.tags);
            } catch {
              contactTags = [c.tags];
            }
          }
          return tagFilters.some((tag: string) => 
            contactTags.some((contactTag: string) => 
              contactTag?.toString().trim().toLowerCase() === tag?.toString().trim().toLowerCase()
            )
          );
        }) || [];
        
        const subscribedContactsWithTags = allContactsWithRequestedTags.filter((c: any) => c.subscribed === true);
        const unsubscribedContactsWithTags = allContactsWithRequestedTags.filter((c: any) => c.subscribed === false);
        
        console.log(`Total contacts with any tags: ${contactsWithTags.length}`);
        console.log(`Total contacts (including unsubscribed) with requested tags: ${allContactsWithRequestedTags.length}`);
        console.log(`Subscribed contacts with requested tags: ${subscribedContactsWithTags.length}`);
        console.log(`Unsubscribed contacts with requested tags: ${unsubscribedContactsWithTags.length}`);
        console.log(`Direct PostgreSQL query found: ${directQueryResults?.length || 0} contacts`);
        
        // Show sample of what tags actually look like
        const sampleTagData = allContactsForDebug?.slice(0, 3).map((c: any) => ({
          email: c.email,
          tags: c.tags,
          tagsType: typeof c.tags,
          isArray: Array.isArray(c.tags),
          tagsStringified: JSON.stringify(c.tags)
        })) || [];
        console.log('Sample tag data from database:', sampleTagData);
        
        const allUniqueTags = new Set<string>();
        contactsWithTags.forEach((c: any) => {
          const tags = Array.isArray(c.tags) ? c.tags : (typeof c.tags === 'string' ? JSON.parse(c.tags) : []);
          tags.forEach((tag: string) => allUniqueTags.add(tag));
        });
        console.log(`All unique tags in subscribed contacts:`, Array.from(allUniqueTags));
        
        let errorMessage = `No subscribed contacts found with tags: ${tagFilters.join(', ')}`;
        if (unsubscribedContactsWithTags.length > 0) {
          errorMessage += `. Found ${unsubscribedContactsWithTags.length} unsubscribed contact(s) with this tag. They need to be subscribed to receive emails.`;
        } else if (allContactsWithRequestedTags.length === 0) {
          errorMessage += `. No contacts found with this tag (checked both subscribed and unsubscribed).`;
        }
        
        return NextResponse.json(
          { 
            error: errorMessage,
            debug: {
              totalSubscribedContacts: allContactsForDebug?.length || 0,
              subscribedContactsWithTags: contactsWithTags.length,
              totalContactsWithRequestedTags: allContactsWithRequestedTags.length,
              subscribedContactsWithRequestedTags: subscribedContactsWithTags.length,
              unsubscribedContactsWithRequestedTags: unsubscribedContactsWithTags.length,
              directPostgreSQLQueryResults: directQueryResults?.length || 0,
              allUniqueTags: Array.from(allUniqueTags),
              requestedTags: tagFilters,
              sampleTagData: sampleTagData
            }
          },
          { status: 400 }
        );
      }
    } else {
      console.log(`No tag filters - sending to all ${contacts.length} subscribed contacts`);
    }

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { error: `No contacts found matching criteria${tagFilters && tagFilters.length > 0 ? ` with tags: ${tagFilters.join(', ')}` : ''}` },
        { status: 400 }
      );
    }

    // Update campaign status
    await supabase
      .from('email_campaigns')
      .update({ 
        status: sendImmediately ? 'sending' : 'scheduled',
        scheduled_at: sendImmediately ? null : new Date().toISOString()
      })
      .eq('id', campaignId);

    // Send emails with rate limiting
    let sentCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process in batches to respect rate limits
    for (let i = 0; i < contacts.length; i += RATE_LIMIT_PER_SECOND) {
      const batch = contacts.slice(i, i + RATE_LIMIT_PER_SECOND);
      const promises = batch.map(async (contact) => {
        try {
          // Generate unsubscribe token
          const token = generateUnsubscribeToken(contact.email, campaignId);

          // Note: We don't store the token in unsubscribes table here
          // It will only be added when someone actually unsubscribes

          // Add unsubscribe link to email
          const htmlWithUnsubscribe = addUnsubscribeLink(campaign.html_content, token);
          const textContent = addUnsubscribeLinkText(campaign.text_content || '', token);

          // Send via SendGrid
          const msg = {
            to: contact.email,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@agile36.com',
            subject: campaign.subject,
            html: htmlWithUnsubscribe,
            text: textContent,
            trackingSettings: {
              clickTracking: { enable: true },
              openTracking: { enable: true },
            },
            customArgs: {
              campaign_id: campaignId.toString(),
              contact_id: contact.id.toString(),
              token: token,
            },
          };

          const [response] = await sgMail.send(msg);

          // Log send to email_sends table
          await supabase
            .from('email_sends')
            .insert({
              campaign_id: campaignId,
              contact_id: contact.id,
              sent_at: new Date().toISOString(),
              sendgrid_message_id: response.headers['x-message-id'] || null,
            });

          // Add tags to recipient if specified
          if (tagsToAdd && Array.isArray(tagsToAdd) && tagsToAdd.length > 0) {
            const currentTags = contact.tags || [];
            const tagsArray = Array.isArray(currentTags) ? currentTags : [];
            const newTags = [...tagsArray];
            
            // Add new tags that don't already exist (case-insensitive)
            tagsToAdd.forEach((tag: string) => {
              const normalizedTag = tag.trim();
              if (normalizedTag && !newTags.some(t => t.trim().toLowerCase() === normalizedTag.toLowerCase())) {
                newTags.push(normalizedTag);
              }
            });
            
            // Update contact with new tags
            await supabase
              .from('email_contacts')
              .update({ tags: newTags })
              .eq('id', contact.id);
          }

          sentCount++;
          return { success: true, email: contact.email };
        } catch (error: any) {
          errorCount++;
          const errorMsg = `Failed to send to ${contact.email}: ${error.message}`;
          errors.push(errorMsg);
          console.error(errorMsg, error);

          // Log failed send
          await supabase
            .from('email_sends')
            .insert({
              campaign_id: campaignId,
              contact_id: contact.id,
              sent_at: new Date().toISOString(),
              bounced: true,
              bounce_reason: error.message,
            });

          return { success: false, email: contact.email, error: error.message };
        }
      });

      await Promise.all(promises);

      // Rate limiting: wait before next batch (except for last batch)
      if (i + RATE_LIMIT_PER_SECOND < contacts.length) {
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
      }
    }

    // Update campaign with final status
    await supabase
      .from('email_campaigns')
      .update({
        status: 'sent',
        sent_count: sentCount,
        sent_at: new Date().toISOString(),
      })
      .eq('id', campaignId);

    // Note: We don't update subscription status here
    // Subscription status is only updated when someone actually clicks unsubscribe
    // via the /api/email/unsubscribe endpoint or SendGrid webhook

    return NextResponse.json({
      success: true,
      sent: sentCount,
      errors: errorCount,
      errorDetails: errors,
      total: contacts.length,
    });
  } catch (error: any) {
    console.error('Error sending campaign:', error);
    return NextResponse.json(
      { error: `Failed to send campaign: ${error.message}` },
      { status: 500 }
    );
  }
}

