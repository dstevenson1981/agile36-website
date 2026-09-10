import sgMail from "@sendgrid/mail";

export const ASSESSMENT_LEAD_NOTIFY_EMAIL = "d.stevenson@agile36.com";

type SendResult = { ok: true } | { ok: false; reason: string };

export type AssessmentLead = {
  name?: string | null;
  email: string;
  source?: string | null;
  exam_name?: string | null;
  message?: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function notifyTo(): string {
  return process.env.LEAD_NOTIFY_EMAIL?.trim() || ASSESSMENT_LEAD_NOTIFY_EMAIL;
}

export async function sendAssessmentLeadNotification(lead: AssessmentLead): Promise<SendResult> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: "no_sendgrid" };
  }

  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || "support@agile36.com";
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || "Agile36";
  const to = notifyTo();

  const name = lead.name?.trim() || "Not provided";
  const source = lead.source?.trim() || "assessment_emails";
  const exam = lead.exam_name?.trim() || "Not specified";
  const note = lead.message?.trim() || "No additional message.";

  const text = [
    "New record in assessment_emails",
    "",
    `Name: ${name}`,
    `Email: ${lead.email}`,
    `Source: ${source}`,
    `Exam / course: ${exam}`,
    `Message: ${note}`,
    "",
    "Reply to this email to reach the person.",
  ].join("\n");

  try {
    await sgMail.send({
      to,
      from: { email: fromEmail, name: fromName },
      replyTo: lead.email,
      subject: `New assessment lead — ${name}`,
      text,
      html: `
        <p style="margin:0 0 16px;font-size:16px;color:#1f2c4a"><strong>New record in assessment_emails</strong></p>
        <table style="border-collapse:collapse;font-size:14px;color:#475569">
          <tr><td style="padding:4px 16px 4px 0;color:#64748b">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#64748b">Source</td><td>${escapeHtml(source)}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#64748b">Exam / course</td><td>${escapeHtml(exam)}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#64748b;vertical-align:top">Message</td><td>${escapeHtml(note)}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:#94a3b8">Reply to this email to reach the person.</p>
      `.trim(),
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "send_failed";
    console.error("[sendAssessmentLeadNotification]", message);
    return { ok: false, reason: message };
  }
}
