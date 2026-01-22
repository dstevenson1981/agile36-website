/**
 * Send Scheduled Emails Edge Function
 * 
 * Runs on a cron schedule (every hour) to send pending emails from email_queue.
 * Processes up to 100 emails per run.
 */

import { sendEmail } from '../_shared/sendgrid-client.ts';
import { supabase } from '../_shared/supabase-client.ts';

interface EmailQueueItem {
  id: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  body: string;
  html_body?: string | null;
  scheduled_for: string;
  status: string;
  error_message?: string | null;
}

Deno.serve(async (req) => {
  try {
    console.log('Starting scheduled email processing...');
    
    // Step 1: Query email_queue for pending emails
    const { data: pendingEmails, error: queryError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .order('scheduled_for', { ascending: true })
      .limit(100);

    if (queryError) {
      console.error('Error querying email_queue:', queryError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to query email queue',
          details: queryError.message,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!pendingEmails || pendingEmails.length === 0) {
      console.log('No pending emails to send');
      return new Response(
        JSON.stringify({
          success: true,
          total: 0,
          sent: 0,
          failed: 0,
          message: 'No pending emails to send',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Found ${pendingEmails.length} pending emails to process`);

    // Step 2: Process each email
    let sentCount = 0;
    let failedCount = 0;
    const errors: Array<{ email: string; error: string }> = [];

    for (const email of pendingEmails as EmailQueueItem[]) {
      try {
        console.log(`Processing email ${email.id} to ${email.recipient_email}`);

        // Send email via SendGrid
        const result = await sendEmail(
          email.recipient_email,
          email.recipient_name || 'there',
          email.subject,
          email.body,
          email.html_body || undefined
        );

        if (result.success) {
          // Update status to 'sent'
          const { error: updateError } = await supabase
            .from('email_queue')
            .update({
              status: 'sent',
              sent_at: new Date().toISOString(),
              error_message: null,
            })
            .eq('id', email.id);

          if (updateError) {
            console.error(`Error updating email ${email.id} to sent:`, updateError);
            // Don't fail the whole process, just log it
          } else {
            console.log(`✓ Email ${email.id} sent successfully to ${email.recipient_email}`);
            sentCount++;
          }
        } else {
          // Update status to 'failed'
          const errorMessage = result.error || 'Unknown error';
          const { error: updateError } = await supabase
            .from('email_queue')
            .update({
              status: 'failed',
              error_message: errorMessage,
            })
            .eq('id', email.id);

          if (updateError) {
            console.error(`Error updating email ${email.id} to failed:`, updateError);
          } else {
            console.error(`✗ Email ${email.id} failed to send: ${errorMessage}`);
            failedCount++;
            errors.push({
              email: email.recipient_email,
              error: errorMessage,
            });
          }
        }
      } catch (emailError: any) {
        // Handle unexpected errors
        const errorMessage = emailError.message || 'Unexpected error';
        console.error(`Error processing email ${email.id}:`, errorMessage);

        // Update status to 'failed'
        const { error: updateError } = await supabase
          .from('email_queue')
          .update({
            status: 'failed',
            error_message: errorMessage,
          })
          .eq('id', email.id);

        if (updateError) {
          console.error(`Error updating email ${email.id} after exception:`, updateError);
        }

        failedCount++;
        errors.push({
          email: email.recipient_email,
          error: errorMessage,
        });
      }
    }

    // Step 3: Return response with summary
    const summary = {
      success: true,
      total: pendingEmails.length,
      sent: sentCount,
      failed: failedCount,
      errors: errors.length > 0 ? errors : undefined,
    };

    console.log('Email processing complete:', summary);

    return new Response(
      JSON.stringify(summary),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Fatal error in send-scheduled-emails:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error processing scheduled emails',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});
