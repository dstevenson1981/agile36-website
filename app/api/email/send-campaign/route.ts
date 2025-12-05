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
    const { campaignId, tagFilters, sendImmediately = true } = await request.json();

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
    let contactsQuery = supabase
      .from('email_contacts')
      .select('*')
      .eq('subscribed', true);

    // Apply tag filters if provided
    if (tagFilters && tagFilters.length > 0) {
      contactsQuery = contactsQuery.contains('tags', tagFilters);
    }

    const { data: contacts, error: contactsError } = await contactsQuery;

    if (contactsError) {
      console.error('Error fetching contacts:', contactsError);
      return NextResponse.json(
        { error: 'Failed to fetch contacts' },
        { status: 500 }
      );
    }

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { error: 'No contacts found matching criteria' },
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

          // Store token in unsubscribes table (for tracking)
          await supabase
            .from('email_unsubscribes')
            .upsert({
              email: contact.email,
              token: token,
              campaign_id: campaignId,
            }, {
              onConflict: 'token'
            });

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

    // Also update contact subscription status if they unsubscribed
    const unsubscribedEmails = await supabase
      .from('email_unsubscribes')
      .select('email')
      .eq('campaign_id', campaignId);

    if (unsubscribedEmails.data) {
      for (const unsub of unsubscribedEmails.data) {
        await supabase
          .from('email_contacts')
          .update({ subscribed: false })
          .eq('email', unsub.email);
      }
    }

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

