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

function normalizeTagFilters(tagFilters: unknown): string[] {
  if (!Array.isArray(tagFilters)) return [];
  return Array.from(
    new Set(
      tagFilters
        .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
        .filter((tag) => tag.length > 0)
    )
  );
}

function normalizeContactIds(contactIds: unknown): number[] {
  if (!Array.isArray(contactIds)) return [];
  return Array.from(
    new Set(
      contactIds
        .map((id) => (typeof id === 'number' ? id : parseInt(String(id), 10)))
        .filter((id) => Number.isInteger(id) && id > 0)
    )
  );
}

async function fetchContactsPaged(params: {
  // Avoid over-constraining supabase-js generics across versions
  // (we only need the runtime query interface here).
  supabase: any;
  tag?: string;
  role?: string;
  company?: string;
  dateRange?: string;
  contactIds?: number[];
}) {
  const { supabase, tag, role, company, dateRange, contactIds } = params;
  const pageSize = 1000;
  const contacts: any[] = [];
  let page = 0;

  const now = new Date();
  let startDate: Date | null = null;
  if (dateRange) {
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
        startDate = null;
    }
  }

  while (true) {
    let q = supabase
      .from('email_contacts')
      .select('*')
      .eq('subscribed', true)
      .eq('blocked', false);

    if (role) q = q.eq('role', role);
    if (company) q = q.eq('company', company);
    if (startDate) q = q.gte('created_at', startDate.toISOString());
    if (tag) q = q.contains('tags', [tag]);
    if (contactIds && contactIds.length > 0) q = q.in('id', contactIds);

    const start = page * pageSize;
    const end = start + pageSize - 1;
    const { data, error } = await q.order('created_at', { ascending: false }).range(start, end);

    if (error) throw error;
    if (!data || data.length === 0) break;

    contacts.push(...data);
    if (data.length < pageSize) break;
    page++;
  }

  return contacts;
}

async function fetchContactsByIdsPaged(supabase: any, contactIds: number[]) {
  const contacts: any[] = [];
  const chunkSize = 500;

  for (let i = 0; i < contactIds.length; i += chunkSize) {
    const chunk = contactIds.slice(i, i + chunkSize);
    const chunkContacts = await fetchContactsPaged({ supabase, contactIds: chunk });
    contacts.push(...chunkContacts);
  }

  // Preserve uniqueness and only subscribed/unblocked contacts
  return Array.from(new Map(contacts.map((c) => [c.id, c])).values());
}

// Helper function to generate unsubscribe token
function generateUnsubscribeToken(email: string, campaignId: number): string {
  const data = `${email}-${campaignId}-${Date.now()}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Helper function to add unsubscribe link to email
function addUnsubscribeLink(htmlContent: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agile36.com';
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agile36.com';
  const unsubscribeUrl = `${baseUrl}/unsubscribe/${token}`;
  
  const unsubscribeFooter = `\n\n---\nYou're receiving this email because you subscribed to Agile36 updates.\nUnsubscribe: ${unsubscribeUrl}`;
  
  return textContent + unsubscribeFooter;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      campaignId,
      tagsToAdd,
      dateRange,
      role,
      company,
      sendImmediately = true,
    } = body;

    const requestTagFilters = normalizeTagFilters(body.tagFilters);
    const requestContactIds = normalizeContactIds(body.contactIds);
    const sendToAll = body.sendToAll === true;

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

    if (campaign.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Campaign is cancelled and cannot be sent' },
        { status: 400 }
      );
    }

    // Load stored audience
    const storedTagFilters = normalizeTagFilters(campaign.tag_filters);
    const { data: storedRecipients, error: storedRecipientsError } = await supabase
      .from('email_campaign_recipients')
      .select('contact_id')
      .eq('campaign_id', campaignId);

    if (storedRecipientsError) {
      console.error('Error loading stored recipients:', storedRecipientsError);
      return NextResponse.json(
        { error: `Failed to load campaign recipients: ${storedRecipientsError.message}` },
        { status: 500 }
      );
    }

    const storedContactIds = normalizeContactIds(
      (storedRecipients || []).map((row) => row.contact_id)
    );

    // Resolve audience priority:
    // 1) Explicit contactIds in request
    // 2) Stored campaign recipients (junction table)
    // 3) Explicit tagFilters in request
    // 4) Stored campaign.tag_filters
    // 5) Explicit sendToAll=true only
    // Never silently default to all subscribed contacts.
    let contacts: any[] = [];
    let audienceMode: 'contactIds' | 'tagFilters' | 'sendToAll' | null = null;
    let resolvedTagFilters: string[] = [];
    let resolvedContactIds: number[] = [];

    if (requestContactIds.length > 0) {
      audienceMode = 'contactIds';
      resolvedContactIds = requestContactIds;
    } else if (storedContactIds.length > 0) {
      audienceMode = 'contactIds';
      resolvedContactIds = storedContactIds;
    } else if (requestTagFilters.length > 0) {
      audienceMode = 'tagFilters';
      resolvedTagFilters = requestTagFilters;
    } else if (storedTagFilters.length > 0) {
      audienceMode = 'tagFilters';
      resolvedTagFilters = storedTagFilters;
    } else if (sendToAll) {
      audienceMode = 'sendToAll';
    } else {
      return NextResponse.json(
        {
          error:
            'No audience selected. Select recipients/tags in the campaign editor, or pass tagFilters/contactIds, or set sendToAll=true to intentionally email all subscribed contacts.',
        },
        { status: 400 }
      );
    }

    try {
      if (audienceMode === 'contactIds') {
        contacts = await fetchContactsByIdsPaged(supabase, resolvedContactIds);
        console.log(
          `Sending campaign ${campaignId} to ${contacts.length} stored/selected contact IDs`
        );
      } else if (audienceMode === 'tagFilters') {
        const allTagContacts = new Map<number, any>();
        for (const tag of resolvedTagFilters) {
          const tagContacts = await fetchContactsPaged({
            supabase,
            tag,
            role,
            company,
            dateRange,
          });
          tagContacts.forEach((c: any) => allTagContacts.set(c.id, c));
        }
        contacts = Array.from(allTagContacts.values());
        console.log(
          `Sending campaign ${campaignId} to ${contacts.length} contacts with tags: ${resolvedTagFilters.join(', ')}`
        );
      } else {
        contacts = await fetchContactsPaged({ supabase, role, company, dateRange });
        console.log(
          `Sending campaign ${campaignId} to ALL ${contacts.length} subscribed contacts (sendToAll=true)`
        );
      }
    } catch (err: any) {
      console.error('Error fetching contacts:', err);
      return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }

    const { data: unsubscribedRows } = await supabase
      .from('email_unsubscribes')
      .select('email')
      .not('unsubscribed_at', 'is', null);
    const unsubscribed = new Set(
      (unsubscribedRows || []).map((row: { email?: string }) =>
        String(row.email || '').trim().toLowerCase()
      )
    );
    contacts = contacts.filter(
      (contact) => !unsubscribed.has(String(contact.email || '').trim().toLowerCase())
    );

    if (!contacts || contacts.length === 0) {
      const audienceHint =
        audienceMode === 'tagFilters'
          ? ` with tags: ${resolvedTagFilters.join(', ')}`
          : audienceMode === 'contactIds'
            ? ' for the selected contact IDs'
            : '';
      return NextResponse.json(
        { error: `No subscribed contacts found matching criteria${audienceHint}` },
        { status: 400 }
      );
    }

    // Persist resolved audience filters when provided on this send
    if (requestTagFilters.length > 0 || requestContactIds.length > 0) {
      if (requestTagFilters.length > 0) {
        await supabase
          .from('email_campaigns')
          .update({ tag_filters: requestTagFilters })
          .eq('id', campaignId);
      }

      if (requestContactIds.length > 0) {
        await supabase
          .from('email_campaign_recipients')
          .delete()
          .eq('campaign_id', campaignId);

        const rows = requestContactIds.map((contactId) => ({
          campaign_id: campaignId,
          contact_id: contactId,
        }));
        const chunkSize = 500;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const { error: insertError } = await supabase
            .from('email_campaign_recipients')
            .insert(rows.slice(i, i + chunkSize));
          if (insertError) {
            console.error('Error persisting request contact IDs:', insertError);
          }
        }
      }
    }

    // Update campaign status
    await supabase
      .from('email_campaigns')
      .update({ 
        status: sendImmediately ? 'sending' : 'scheduled',
        scheduled_at: sendImmediately ? null : new Date().toISOString()
      })
      .eq('id', campaignId);

    if (!sendImmediately) {
      return NextResponse.json({
        success: true,
        scheduled: true,
        total: contacts.length,
        audienceMode,
        tagFilters: resolvedTagFilters,
      });
    }

    // Send emails with rate limiting
    let sentCount = 0;
    let errorCount = 0;
    let cancelledMidSend = false;
    const errors: string[] = [];

    // Process in batches to respect rate limits
    for (let i = 0; i < contacts.length; i += RATE_LIMIT_PER_SECOND) {
      // Re-check campaign status so a mid-send cancel can stop the loop
      const { data: liveCampaign } = await supabase
        .from('email_campaigns')
        .select('status')
        .eq('id', campaignId)
        .single();

      if (liveCampaign?.status === 'cancelled') {
        cancelledMidSend = true;
        console.log(`Campaign ${campaignId} cancelled mid-send after ${sentCount} emails`);
        break;
      }

      const batch = contacts.slice(i, i + RATE_LIMIT_PER_SECOND);
      const promises = batch.map(async (contact) => {
        try {
          // Generate unsubscribe token and store it so the link works on click.
          const token = generateUnsubscribeToken(contact.email, campaignId);
          const { error: tokenError } = await supabase
            .from('email_unsubscribes')
            .insert({
              email: String(contact.email).trim().toLowerCase(),
              token,
              campaign_id: campaignId,
            });
          if (tokenError) {
            console.error('Failed to store unsubscribe token:', tokenError);
          }

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

          const sentAt = new Date().toISOString();

          // Log send to email_sends table
          await supabase
            .from('email_sends')
            .insert({
              campaign_id: campaignId,
              contact_id: contact.id,
              sent_at: sentAt,
              sendgrid_message_id: response.headers['x-message-id'] || null,
            });

          // Mark recipient as sent in junction table when present
          await supabase
            .from('email_campaign_recipients')
            .update({ sent_at: sentAt })
            .eq('campaign_id', campaignId)
            .eq('contact_id', contact.id);

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
        status: cancelledMidSend ? 'cancelled' : 'sent',
        sent_count: sentCount,
        sent_at: new Date().toISOString(),
      })
      .eq('id', campaignId);

    return NextResponse.json({
      success: true,
      sent: sentCount,
      errors: errorCount,
      errorDetails: errors,
      total: contacts.length,
      cancelled: cancelledMidSend,
      audienceMode,
      tagFilters: resolvedTagFilters,
    });
  } catch (error: any) {
    console.error('Error sending campaign:', error);
    return NextResponse.json(
      { error: `Failed to send campaign: ${error.message}` },
      { status: 500 }
    );
  }
}
