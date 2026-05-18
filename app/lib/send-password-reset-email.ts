import sgMail from '@sendgrid/mail';

type SendResult = { ok: true } | { ok: false; reason: string };

export async function sendPasswordResetEmail(
  to: string,
  resetLink: string,
): Promise<SendResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: 'no_sendgrid' };
  }

  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || 'm.ball@agile36.com';
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || 'Agile36';

  const text = [
    'Reset your Agile36 password',
    '',
    'Click the link below to choose a new password. This link expires in 1 hour.',
    '',
    resetLink,
    '',
    'If you did not request this, you can ignore this email.',
    '',
    '— Agile36',
  ].join('\n');

  const html = `
    <p>Reset your Agile36 password</p>
    <p>Click the button below to choose a new password. This link expires in 1 hour.</p>
    <p style="margin:24px 0">
      <a href="${resetLink}" style="background:#fa4a23;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">
        Reset password
      </a>
    </p>
    <p style="font-size:13px;color:#64748b">Or copy this link into your browser:<br><a href="${resetLink}">${resetLink}</a></p>
    <p style="font-size:13px;color:#64748b">If you did not request this, you can ignore this email.</p>
  `.trim();

  try {
    await sgMail.send({
      to,
      from: { email: fromEmail, name: fromName },
      subject: 'Reset your Agile36 password',
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'send_failed';
    console.error('[sendPasswordResetEmail]', message);
    return { ok: false, reason: message };
  }
}
