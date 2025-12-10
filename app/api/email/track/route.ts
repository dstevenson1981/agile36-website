import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// SendGrid webhook handler for tracking events (opens, clicks, bounces)
export async function POST(request: NextRequest) {
  try {
    const events = await request.json();

    // SendGrid sends events as an array
    if (!Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Invalid event format' },
        { status: 400 }
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

    // Process each event
    for (const event of events) {
      const { event: eventType, email, timestamp, sg_message_id, campaign_id, contact_id } = event;

      if (!email || !eventType) {
        continue;
      }

      // Find the email_send record by sendgrid_message_id or campaign_id + contact_id
      let emailSendQuery = supabase
        .from('email_sends')
        .select('id');

      if (sg_message_id) {
        emailSendQuery = emailSendQuery.eq('sendgrid_message_id', sg_message_id);
      } else if (campaign_id && contact_id) {
        emailSendQuery = emailSendQuery
          .eq('campaign_id', campaign_id)
          .eq('contact_id', contact_id);
      } else {
        // Try to find by email and campaign_id
        if (campaign_id) {
          const { data: contact } = await supabase
            .from('email_contacts')
            .select('id')
            .eq('email', email)
            .single();

          if (contact) {
            emailSendQuery = emailSendQuery
              .eq('campaign_id', campaign_id)
              .eq('contact_id', contact.id);
          } else {
            continue;
          }
        } else {
          continue;
        }
      }

      const { data: emailSend, error: findError } = await emailSendQuery.single();

      if (findError || !emailSend) {
        console.error('Could not find email_send record:', findError);
        continue;
      }

      // Update based on event type
      const updateData: any = {};

      switch (eventType) {
        case 'open':
        case 'uniqueopen':
          updateData.opened_at = new Date(timestamp * 1000).toISOString();
          break;

        case 'click':
          updateData.clicked_at = new Date(timestamp * 1000).toISOString();
          break;

        case 'bounce':
        case 'dropped':
        case 'blocked':
        case 'spamreport':
          updateData.bounced = true;
          updateData.bounce_reason = event.reason || event.type || event.event || 'Unknown';
          
          // Auto-unsubscribe and block the contact
          const bounceReason = event.reason || event.type || event.event || 'Bounced/Blocked';
          await supabase
            .from('email_contacts')
            .update({ 
              subscribed: false,
              blocked: true,
              blocked_at: new Date().toISOString(),
              blocked_reason: `Auto-blocked: ${bounceReason}`
            })
            .eq('email', email);
          break;

        case 'unsubscribe':
          updateData.unsubscribed = true;
          // Also update contact
          await supabase
            .from('email_contacts')
            .update({ subscribed: false })
            .eq('email', email);

          // Add to unsubscribes table if not exists
          const { data: unsubscribeRecord } = await supabase
            .from('email_unsubscribes')
            .select('id')
            .eq('email', email)
            .single();

          if (!unsubscribeRecord) {
            await supabase
              .from('email_unsubscribes')
              .insert({
                email: email,
                token: event.token || crypto.randomBytes(32).toString('hex'),
                campaign_id: campaign_id || null,
                reason: 'Unsubscribed via email',
              });
          }
          break;

        default:
          // Unknown event type, skip
          continue;
      }

      // Update email_sends record
      if (Object.keys(updateData).length > 0) {
        await supabase
          .from('email_sends')
          .update(updateData)
          .eq('id', emailSend.id);
      }
    }

    return NextResponse.json({ success: true, processed: events.length });
  } catch (error: any) {
    console.error('Error processing SendGrid webhook:', error);
    return NextResponse.json(
      { error: `Failed to process webhook: ${error.message}` },
      { status: 500 }
    );
  }
}

