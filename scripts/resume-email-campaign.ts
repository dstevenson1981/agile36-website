#!/usr/bin/env tsx
/**
 * Resume a campaign send without duplicating people who already got it.
 *
 *   npx tsx scripts/resume-email-campaign.ts 53
 *
 * Runs locally so Vercel's 5-minute API timeout cannot stop a large remainder.
 */
import crypto from "node:crypto";
import { config } from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

config({ path: ".env.local" });

const CAMPAIGN_ID = Number(process.argv[2] || 53);
const RATE_LIMIT = 50;
const DELAY_MS = 1000;
const PAGE = 1000;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function addUnsubscribeLink(htmlContent: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agile36.com";
  const unsubscribeUrl = `${baseUrl}/unsubscribe/${token}`;
  const footer = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;">
      <p>You're receiving this email because you subscribed to Agile36 updates.</p>
      <p><a href="${unsubscribeUrl}" style="color: #0066cc;">Unsubscribe from this list</a></p>
    </div>
  `;
  if (htmlContent.includes("</body>")) {
    return htmlContent.replace("</body>", `${footer}</body>`);
  }
  return htmlContent + footer;
}

function addUnsubscribeLinkText(textContent: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agile36.com";
  const unsubscribeUrl = `${baseUrl}/unsubscribe/${token}`;
  return `${textContent}\n\n---\nYou're receiving this email because you subscribed to Agile36 updates.\nUnsubscribe: ${unsubscribeUrl}`;
}

async function fetchAllIds(
  supabase: SupabaseClient,
  table: string,
  column: string,
  apply: (q: any) => any
): Promise<number[]> {
  const ids: number[] = [];
  let from = 0;
  while (true) {
    let q = supabase.from(table).select(column);
    q = apply(q);
    const { data, error } = await q.range(from, from + PAGE - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    for (const row of data as unknown as Record<string, number>[]) {
      if (typeof row[column] === "number") ids.push(row[column]);
    }
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return ids;
}

async function main() {
  if (!Number.isInteger(CAMPAIGN_ID) || CAMPAIGN_ID <= 0) {
    throw new Error("Pass a campaign id, e.g. npx tsx scripts/resume-email-campaign.ts 53");
  }

  const supabase = createClient(requireEnv("NEXT_PUBLIC_SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  sgMail.setApiKey(requireEnv("SENDGRID_API_KEY"));
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || "noreply@agile36.com";

  const { data: campaign, error: campaignError } = await supabase
    .from("email_campaigns")
    .select("id, name, subject, html_content, text_content, status")
    .eq("id", CAMPAIGN_ID)
    .single();
  if (campaignError || !campaign) throw new Error(campaignError?.message || "Campaign not found");
  if (campaign.status === "cancelled") throw new Error("Campaign is cancelled");

  const listedIds = await fetchAllIds(supabase, "email_campaign_recipients", "contact_id", (q) =>
    q.eq("campaign_id", CAMPAIGN_ID)
  );
  const sentIds = new Set(
    await fetchAllIds(supabase, "email_sends", "contact_id", (q) =>
      q.eq("campaign_id", CAMPAIGN_ID).not("sendgrid_message_id", "is", null)
    )
  );
  const remainingIds = listedIds.filter((id) => !sentIds.has(id));
  console.log(
    `Campaign ${CAMPAIGN_ID} (${campaign.name}): ${sentIds.size} already sent, ${remainingIds.length} remaining of ${listedIds.length}`
  );
  if (remainingIds.length === 0) {
    await supabase
      .from("email_campaigns")
      .update({ status: "sent", sent_count: sentIds.size, sent_at: new Date().toISOString() })
      .eq("id", CAMPAIGN_ID);
    console.log("Nothing left to send.");
    return;
  }

  const { data: unsubRows } = await supabase
    .from("email_unsubscribes")
    .select("email")
    .not("unsubscribed_at", "is", null);
  const unsubscribed = new Set(
    (unsubRows || []).map((row: { email?: string }) => String(row.email || "").trim().toLowerCase())
  );

  const contacts: { id: number; email: string }[] = [];
  for (let i = 0; i < remainingIds.length; i += 500) {
    const chunk = remainingIds.slice(i, i + 500);
    const { data, error } = await supabase
      .from("email_contacts")
      .select("id, email, subscribed, blocked")
      .in("id", chunk)
      .eq("subscribed", true)
      .eq("blocked", false);
    if (error) throw error;
    for (const row of data || []) {
      const email = String(row.email || "").trim().toLowerCase();
      if (!email || unsubscribed.has(email)) continue;
      contacts.push({ id: row.id, email: String(row.email).trim() });
    }
  }

  console.log(`Eligible remaining contacts: ${contacts.length}`);
  await supabase
    .from("email_campaigns")
    .update({ status: "sending", sent_count: sentIds.size })
    .eq("id", CAMPAIGN_ID);

  let sentThisRun = 0;
  let errorsThisRun = 0;

  for (let i = 0; i < contacts.length; i += RATE_LIMIT) {
    const { data: live } = await supabase
      .from("email_campaigns")
      .select("status")
      .eq("id", CAMPAIGN_ID)
      .single();
    if (live?.status === "cancelled") {
      console.log(`Cancelled mid-send after ${sentThisRun} new sends.`);
      break;
    }

    const batch = contacts.slice(i, i + RATE_LIMIT);
    await Promise.all(
      batch.map(async (contact) => {
        try {
          const token = crypto
            .createHash("sha256")
            .update(`${contact.email}-${CAMPAIGN_ID}-${Date.now()}`)
            .digest("hex");
          await supabase.from("email_unsubscribes").insert({
            email: contact.email.toLowerCase(),
            token,
            campaign_id: CAMPAIGN_ID,
            unsubscribed_at: null,
          });

          const [response] = await sgMail.send({
            to: contact.email,
            from: fromEmail,
            subject: campaign.subject,
            html: addUnsubscribeLink(campaign.html_content || "", token),
            text: addUnsubscribeLinkText(campaign.text_content || "", token),
            trackingSettings: {
              clickTracking: { enable: true },
              openTracking: { enable: true },
            },
            customArgs: {
              campaign_id: String(CAMPAIGN_ID),
              contact_id: String(contact.id),
              token,
            },
          });

          const sentAt = new Date().toISOString();
          await supabase.from("email_sends").insert({
            campaign_id: CAMPAIGN_ID,
            contact_id: contact.id,
            sent_at: sentAt,
            sendgrid_message_id: response.headers["x-message-id"] || null,
          });
          await supabase
            .from("email_campaign_recipients")
            .update({ sent_at: sentAt })
            .eq("campaign_id", CAMPAIGN_ID)
            .eq("contact_id", contact.id);
          sentThisRun++;
        } catch (err) {
          errorsThisRun++;
          const message = err instanceof Error ? err.message : String(err);
          console.error(`Send failed for contact ${contact.id}: ${message}`);
          await supabase.from("email_sends").insert({
            campaign_id: CAMPAIGN_ID,
            contact_id: contact.id,
            sent_at: new Date().toISOString(),
            bounced: true,
            bounce_reason: message,
          });
        }
      })
    );

    const acceptedSoFar = sentIds.size + sentThisRun;
    await supabase
      .from("email_campaigns")
      .update({ status: "sending", sent_count: acceptedSoFar })
      .eq("id", CAMPAIGN_ID);

    if ((i / RATE_LIMIT) % 10 === 0 || i + RATE_LIMIT >= contacts.length) {
      console.log(
        `Progress: ${sentThisRun} new sends, ${errorsThisRun} errors, ${Math.min(i + RATE_LIMIT, contacts.length)}/${contacts.length} attempted`
      );
    }

    if (i + RATE_LIMIT < contacts.length) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }

  const { count: finalAccepted } = await supabase
    .from("email_sends")
    .select("id", { count: "exact", head: true })
    .eq("campaign_id", CAMPAIGN_ID)
    .not("sendgrid_message_id", "is", null);

  await supabase
    .from("email_campaigns")
    .update({
      status: "sent",
      sent_count: finalAccepted ?? sentIds.size + sentThisRun,
      sent_at: new Date().toISOString(),
    })
    .eq("id", CAMPAIGN_ID);

  console.log(
    `Done. New sends: ${sentThisRun}. Errors: ${errorsThisRun}. Accepted total: ${finalAccepted ?? sentIds.size + sentThisRun}.`
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
