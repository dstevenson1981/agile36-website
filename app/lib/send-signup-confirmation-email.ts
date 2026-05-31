import sgMail from '@sendgrid/mail';

type SendResult = { ok: true } | { ok: false; reason: string };

export async function sendSignupConfirmationEmail(
  to: string,
  confirmationLink: string,
  name?: string,
): Promise<SendResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: 'no_sendgrid' };
  }

  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || 'm.ball@agile36.com';
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || 'Agile36';
  const greeting = name?.trim() ? `Hi ${name.trim()},` : 'Hi,';

  const text = [
    'Confirm your Agile36 account',
    '',
    greeting,
    '',
    'Click the link below to confirm your email address. You will not be able to sign in until your email is confirmed.',
    '',
    confirmationLink,
    '',
    'If you did not create this account, you can ignore this email.',
    '',
    '- Agile36',
  ].join('\n');

  const html = `
    <p>Confirm your Agile36 account</p>
    <p>${greeting}</p>
    <p>Click the button below to confirm your email address. You will not be able to sign in until your email is confirmed.</p>
    <p style="margin:24px 0">
      <a href="${confirmationLink}" style="background:#fa4a23;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">
        Confirm email
      </a>
    </p>
    <p style="font-size:13px;color:#64748b">Or copy this link into your browser:<br><a href="${confirmationLink}">${confirmationLink}</a></p>
    <p style="font-size:13px;color:#64748b">If you did not create this account, you can ignore this email.</p>
  `.trim();

  try {
    await sgMail.send({
      to,
      from: { email: fromEmail, name: fromName },
      subject: 'Confirm your Agile36 account',
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'send_failed';
    console.error('[sendSignupConfirmationEmail]', message);
    return { ok: false, reason: message };
  }
}
