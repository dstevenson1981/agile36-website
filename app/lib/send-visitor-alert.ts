import sgMail from "@sendgrid/mail";

const DEFAULT_TO = "d.stevenson@agile36.com";

export type VisitorAlert = {
  city: string | null;
  region: string | null;
  country: string | null;
  page: string | null;
  pageTitle: string | null;
  company: string | null;
  personName: string | null;
  referrer: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function place(alert: VisitorAlert): string {
  const city = alert.city?.trim();
  const region = alert.region?.trim();
  if (city && region) return `${city}, ${region}`;
  if (city) return city;
  if (region) return region;
  if (alert.country) return alert.country;
  return "Unknown location";
}

export async function sendVisitorAlert(alert: VisitorAlert): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) return;

  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || "support@agile36.com";
  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || "Agile36";
  const to = process.env.VISITOR_ALERT_EMAIL?.trim() || process.env.LEAD_NOTIFY_EMAIL?.trim() || DEFAULT_TO;
  const where = place(alert);
  const page = alert.page || "/";
  const title = alert.pageTitle || page;
  const who = [alert.personName, alert.company].filter(Boolean).join(" · ") || "Someone";

  const text = [
    `${who} is on the site.`,
    `Location: ${where}`,
    `Page: ${title} (${page})`,
    alert.referrer ? `From: ${alert.referrer}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await sgMail.send({
    to,
    from: { email: fromEmail, name: fromName },
    subject: `${where} — ${title}`,
    text,
    html: `
      <p style="margin:0 0 12px;font-size:16px;color:#1f2c4a"><strong>${escapeHtml(who)} is on the site.</strong></p>
      <p style="margin:0 0 8px;font-size:14px;color:#475569"><strong>Location:</strong> ${escapeHtml(where)}</p>
      <p style="margin:0 0 8px;font-size:14px;color:#475569"><strong>Page:</strong> ${escapeHtml(title)} <span style="color:#94a3b8">${escapeHtml(page)}</span></p>
      ${alert.referrer ? `<p style="margin:0;font-size:14px;color:#475569"><strong>From:</strong> ${escapeHtml(alert.referrer)}</p>` : ""}
    `.trim(),
  });
}
