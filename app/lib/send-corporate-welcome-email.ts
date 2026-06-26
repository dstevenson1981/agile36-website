import sgMail from '@sendgrid/mail';
import type { CorporateAccountRow } from '@/app/lib/corporate';

type SendResult = { ok: true } | { ok: false; reason: string };

export async function sendCorporateWelcomeEmail(
  account: Pick<
    CorporateAccountRow,
    'contact_email' | 'contact_name' | 'company_name' | 'corp_code' | 'authorized_email_domains'
  >,
  siteUrl: string,
): Promise<SendResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: 'no_sendgrid' };
  }

  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || 'support@agile36.com';
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || 'Agile36';
  const greeting = account.contact_name?.trim() ? `Hi ${account.contact_name.trim()},` : 'Hi,';
  const domains =
    account.authorized_email_domains?.length > 0
      ? account.authorized_email_domains.map((d) => `@${d}`).join(', ')
      : 'your company email domain';

  const coursesUrl = `${siteUrl}/courses`;
  const termsUrl = `${siteUrl}/corporate/terms`;

  const text = [
    'Your Agile36 Corporate Billing Account is active',
    '',
    greeting,
    '',
    `Corporate billing for ${account.company_name} is set up. Share the billing code below with employees who will register for training.`,
    '',
    `Billing code: ${account.corp_code}`,
    '',
    'How employees enroll:',
    `1. Browse courses at ${coursesUrl}`,
    '2. At checkout, enter the billing code in the "Corporate billing code" field',
    `3. Employees must register with an authorized work email (${domains})`,
    '4. Your corporate card on file is charged automatically — employees do not enter card details',
    '',
    `Terms: ${termsUrl}`,
    `Refund policy: ${siteUrl}/refund-policy`,
    '',
    'Questions? Reply to this email or contact support@agile36.com',
    '',
    '- Agile36',
  ].join('\n');

  const html = `
    <p>${greeting}</p>
    <p>Corporate billing for <strong>${account.company_name}</strong> is active. Share the billing code below with employees who will register for training.</p>
    <p style="margin:24px 0;padding:16px 20px;background:#f8f7f3;border-radius:12px;font-family:monospace;font-size:22px;font-weight:700;letter-spacing:0.05em;color:#e8431f">${account.corp_code}</p>
    <p><strong>How employees enroll</strong></p>
    <ol style="color:#475569;line-height:1.6">
      <li>Browse courses at <a href="${coursesUrl}">agile36.com/courses</a></li>
      <li>At checkout, enter the code in <strong>Corporate billing code</strong></li>
      <li>Use an authorized work email (${domains})</li>
      <li>Your corporate card is charged automatically</li>
    </ol>
    <p style="font-size:13px;color:#64748b">
      <a href="${termsUrl}">Corporate billing terms</a> ·
      <a href="${siteUrl}/refund-policy">Refund policy</a>
    </p>
    <p style="font-size:13px;color:#64748b">Questions? Contact <a href="mailto:support@agile36.com">support@agile36.com</a></p>
  `.trim();

  try {
    await sgMail.send({
      to: account.contact_email,
      from: { email: fromEmail, name: fromName },
      subject: `Corporate billing active — your code is ${account.corp_code}`,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'send_failed';
    console.error('[sendCorporateWelcomeEmail]', message);
    return { ok: false, reason: message };
  }
}
