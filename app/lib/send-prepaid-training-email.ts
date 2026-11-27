import sgMail from "@sendgrid/mail";

type SendResult = { ok: true } | { ok: false; reason: string };

function mailer() {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) return null;
  sgMail.setApiKey(apiKey);
  return {
    email: process.env.SENDGRID_FROM_EMAIL?.trim() || "m.ball@agile36.com",
    name: process.env.SENDGRID_FROM_NAME?.trim() || "Agile36",
  };
}

async function send(to: string, subject: string, text: string, html: string): Promise<SendResult> {
  const from = mailer();
  if (!from) return { ok: false, reason: "no_sendgrid" };
  try {
    await sgMail.send({ to, from, subject, text, html });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "send_failed";
    console.error("[send-prepaid-training-email]", message);
    return { ok: false, reason: message };
  }
}

export async function sendPrepaidPaidEmail(to: string, courseName: string): Promise<SendResult> {
  const accountUrl = "https://www.agile36.com/account/login?next=/account";
  const text = [
    `You paid for ${courseName}.`,
    "",
    "You are not on a class roster yet. Create an account or log in with this email, then confirm a date in My Account. There is no second charge.",
    "",
    accountUrl,
  ].join("\n");
  const html = `
    <p>You paid for <strong>${courseName}</strong>.</p>
    <p>You are not on a class roster yet. Create an account or log in with this email, then confirm a date in My Account. There is no second charge.</p>
    <p><a href="${accountUrl}">Open My Account</a></p>
  `.trim();
  return send(to, `Prepaid Training received — ${courseName}`, text, html);
}

export async function sendPrepaidDateEmail(
  to: string,
  courseName: string,
  scheduleDate: string,
  scheduleTime: string,
): Promise<SendResult> {
  const when = [scheduleDate, scheduleTime].filter(Boolean).join(", ");
  const text = [
    `Your date is confirmed for ${courseName}.`,
    "",
    when || "Your class date is saved on your account.",
    "",
    "This used your Prepaid Training credit. You will not be charged again for this seat.",
  ].join("\n");
  const html = `
    <p>Your date is confirmed for <strong>${courseName}</strong>.</p>
    <p>${when || "Your class date is saved on your account."}</p>
    <p>This used your Prepaid Training credit. You will not be charged again for this seat.</p>
  `.trim();
  return send(to, `Class date confirmed — ${courseName}`, text, html);
}
