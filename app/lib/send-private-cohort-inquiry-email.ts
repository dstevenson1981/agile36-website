import sgMail from '@sendgrid/mail';

export const PRIVATE_COHORT_INQUIRY_NOTIFY_EMAIL = 'd.stevenson@agile36.com';

type SendResult = { ok: true } | { ok: false; reason: string };

export type PrivateCohortInquiryLead = {
  name?: string | null;
  email: string;
  source?: string | null;
  exam_name?: string | null;
  message?: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function isRtePrivateCohortInquiry(
  source?: string | null,
  examName?: string | null,
): boolean {
  const haystack = `${source ?? ''} ${examName ?? ''}`.toLowerCase();
  const isPrivateCohort = haystack.includes('private cohort');
  const isRte =
    haystack.includes('release-train-engineer') ||
    haystack.includes('release train engineer') ||
    /\brte\b/.test(haystack);
  return isPrivateCohort && isRte;
}

export async function sendPrivateCohortInquiryDigest(
  leads: PrivateCohortInquiryLead[],
): Promise<SendResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: 'no_sendgrid' };
  }
  if (leads.length === 0) {
    return { ok: true };
  }

  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || 'support@agile36.com';
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || 'Agile36';
  const to =
    process.env.LEAD_NOTIFY_EMAIL?.trim() || PRIVATE_COHORT_INQUIRY_NOTIFY_EMAIL;

  const lines = leads.map((lead, i) => {
    const name = lead.name?.trim() || 'Not provided';
    return `${i + 1}. ${name} <${lead.email}> — ${lead.exam_name || 'RTE'} (${lead.source || 'private cohort'})`;
  });

  const rows = leads
    .map((lead) => {
      const name = escapeHtml(lead.name?.trim() || 'Not provided');
      const email = escapeHtml(lead.email);
      const course = escapeHtml(lead.exam_name?.trim() || 'SAFe Release Train Engineer (RTE)');
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0"><a href="mailto:${email}">${email}</a></td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${course}</td>
      </tr>`;
    })
    .join('');

  try {
    await sgMail.send({
      to,
      from: { email: fromEmail, name: fromName },
      subject: `Private cohort RTE inquiries (${leads.length})`,
      text: ['Existing private cohort RTE inquiries in assessment_emails', '', ...lines].join('\n'),
      html: `
        <p style="margin:0 0 16px;font-size:16px;color:#1f2c4a"><strong>Existing private cohort RTE inquiries</strong></p>
        <p style="margin:0 0 12px;font-size:14px;color:#64748b">These were already in assessment_emails. New inquiries will email you as they come in.</p>
        <table style="border-collapse:collapse;font-size:14px;color:#475569;width:100%">
          <tr>
            <th align="left" style="padding:8px 12px;border-bottom:2px solid #1f2c4a;color:#1f2c4a">Name</th>
            <th align="left" style="padding:8px 12px;border-bottom:2px solid #1f2c4a;color:#1f2c4a">Email</th>
            <th align="left" style="padding:8px 12px;border-bottom:2px solid #1f2c4a;color:#1f2c4a">Course</th>
          </tr>
          ${rows}
        </table>
      `.trim(),
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'send_failed';
    console.error('[sendPrivateCohortInquiryDigest]', message);
    return { ok: false, reason: message };
  }
}

export async function sendPrivateCohortInquiryNotification(
  lead: PrivateCohortInquiryLead,
): Promise<SendResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: 'no_sendgrid' };
  }

  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || 'support@agile36.com';
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || 'Agile36';
  const to =
    process.env.LEAD_NOTIFY_EMAIL?.trim() || PRIVATE_COHORT_INQUIRY_NOTIFY_EMAIL;

  const name = lead.name?.trim() || 'Not provided';
  const course = lead.exam_name?.trim() || 'SAFe Release Train Engineer (RTE)';
  const source = lead.source?.trim() || 'Private cohort inquiry';
  const note = lead.message?.trim() || 'No additional message.';

  const text = [
    'New private cohort RTE inquiry',
    '',
    `Name: ${name}`,
    `Email: ${lead.email}`,
    `Course: ${course}`,
    `Source: ${source}`,
    `Message: ${note}`,
    '',
    'Stored in assessment_emails. Reply to this email to reach the inquirer.',
  ].join('\n');

  const html = `
    <p style="margin:0 0 16px;font-size:16px;color:#1f2c4a"><strong>New private cohort RTE inquiry</strong></p>
    <table style="border-collapse:collapse;font-size:14px;color:#475569">
      <tr><td style="padding:4px 16px 4px 0;color:#64748b">Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#64748b">Course</td><td>${escapeHtml(course)}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#64748b">Source</td><td>${escapeHtml(source)}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#64748b;vertical-align:top">Message</td><td>${escapeHtml(note)}</td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:13px;color:#94a3b8">Stored in assessment_emails. Reply to this email to reach the inquirer.</p>
  `.trim();

  try {
    await sgMail.send({
      to,
      from: { email: fromEmail, name: fromName },
      replyTo: lead.email,
      subject: `Private cohort RTE inquiry — ${name}`,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'send_failed';
    console.error('[sendPrivateCohortInquiryNotification]', message);
    return { ok: false, reason: message };
  }
}
