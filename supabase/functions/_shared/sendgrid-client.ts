/**
 * SendGrid Email Client
 * Base URL: https://api.sendgrid.com/v3/mail/send
 * API Key: Set via SENDGRID_API_KEY environment variable
 * From Email: m.ball@agile36.com
 */

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY') || '';
const SENDGRID_BASE_URL = 'https://api.sendgrid.com/v3/mail/send';
const FROM_EMAIL = Deno.env.get('SENDGRID_FROM_EMAIL') || 'm.ball@agile36.com';
const FROM_NAME = Deno.env.get('SENDGRID_FROM_NAME') || 'Agile36';

if (!SENDGRID_API_KEY) {
  console.warn('Warning: SENDGRID_API_KEY not set. SendGrid email functions will fail.');
}

interface SendEmailOptions {
  to: string;
  name: string;
  subject: string;
  body: string;
  htmlBody?: string;
}

interface SendGridResponse {
  message?: string;
  errors?: Array<{ message: string; field?: string; help?: string }>;
}

/**
 * Send an email via SendGrid
 */
export async function sendEmail(
  to: string,
  name: string,
  subject: string,
  body: string,
  htmlBody?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!SENDGRID_API_KEY) {
    return {
      success: false,
      error: 'SENDGRID_API_KEY environment variable is not set',
    };
  }

  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const emailPayload = {
        personalizations: [
          {
            to: [
              {
                email: to,
                name: name,
              },
            ],
            subject: subject,
          },
        ],
        from: {
          email: FROM_EMAIL,
          name: FROM_NAME,
        },
        content: [
          {
            type: 'text/plain',
            value: body,
          },
        ],
      };

      // Add HTML content if provided
      if (htmlBody) {
        emailPayload.content.push({
          type: 'text/html',
          value: htmlBody,
        });
      }

      const response = await fetch(SENDGRID_BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) {
        const errorData: SendGridResponse = await response.json().catch(() => ({}));
        const errorMessage = errorData.errors?.map(e => e.message).join(', ') || `HTTP ${response.status}`;
        throw new Error(`SendGrid API error: ${errorMessage}`);
      }

      // SendGrid returns 202 Accepted on success
      const messageId = response.headers.get('x-message-id') || undefined;
      
      console.log(`Email sent successfully to ${to} (${name}) - Message ID: ${messageId}`);
      
      return {
        success: true,
        messageId: messageId,
      };
    } catch (error: any) {
      lastError = error;
      console.error(`SendGrid sendEmail attempt ${attempt} failed:`, error.message);
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  const errorMessage = lastError?.message || 'Failed to send email after retries';
  console.error(`Failed to send email to ${to}: ${errorMessage}`);
  
  return {
    success: false,
    error: errorMessage,
  };
}

/**
 * Send email with full options object
 */
export async function sendEmailWithOptions(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  return sendEmail(
    options.to,
    options.name,
    options.subject,
    options.body,
    options.htmlBody
  );
}
