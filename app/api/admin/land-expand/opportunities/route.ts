import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PROSPECT_COOLDOWN_DAYS } from "@/land-and-expand/lib/config";

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are required");
  }
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "pending_approval";
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "50", 10) || 50, 1), 100);
    const supabase = getSupabase();

    let query = supabase
      .from("land_expand_opportunities")
      .select(
        `
        id,
        recommended_offer,
        recommendation_reason,
        opportunity_score,
        supporting_evidence,
        outreach_strategy,
        estimated_seats,
        status,
        snooze_until,
        review_notes,
        created_at,
        company:land_expand_companies (
          id, name, domain, industry, employee_count, blocked, cooldown_until
        ),
        source_customer:land_expand_source_customers (
          id, email, name, course_name, course_slug, job_title, seniority, registered_at, amount
        ),
        messages:land_expand_outreach_messages (
          id, subject, body_text, edited_subject, edited_body_text, status,
          prospect:land_expand_prospects (
            id, email, first_name, last_name, full_name, job_title, linkedin_url, blocked
          )
        )
      `
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ opportunities: data || [] });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load opportunities" },
      { status: 500 }
    );
  }
}

type ActionBody = {
  action: "approve" | "reject" | "snooze" | "block_company" | "block_prospect" | "edit_message";
  opportunityId: string;
  messageId?: string;
  prospectId?: string;
  companyId?: string;
  subject?: string;
  bodyText?: string;
  snoozeDays?: number;
  notes?: string;
};

async function queueApprovedMessage(
  supabase: ReturnType<typeof getSupabase>,
  message: {
    id: string;
    subject: string;
    body_text: string;
    edited_subject?: string | null;
    edited_body_text?: string | null;
    prospect: { email: string | null; first_name: string | null; full_name: string | null } | null;
  }
) {
  const email = message.prospect?.email;
  if (!email) {
    throw new Error(`Message ${message.id} has no prospect email`);
  }

  const subject = message.edited_subject || message.subject;
  const body = message.edited_body_text || message.body_text;
  const name =
    message.prospect?.full_name ||
    message.prospect?.first_name ||
    email;

  const { data: queued, error } = await supabase
    .from("email_queue")
    .insert({
      recipient_email: email,
      recipient_name: name,
      subject,
      body,
      scheduled_for: new Date().toISOString(),
      status: "pending",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  const cooldownUntil = new Date();
  cooldownUntil.setDate(cooldownUntil.getDate() + PROSPECT_COOLDOWN_DAYS);

  await supabase
    .from("land_expand_outreach_messages")
    .update({
      status: "queued",
      email_queue_id: queued.id,
      scheduled_for: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", message.id);

  if (message.prospect && "id" in (message.prospect as object)) {
    // prospect id not always joined; update via message
  }

  const { data: msgRow } = await supabase
    .from("land_expand_outreach_messages")
    .select("prospect_id")
    .eq("id", message.id)
    .single();

  if (msgRow?.prospect_id) {
    await supabase
      .from("land_expand_prospects")
      .update({
        last_contacted_at: new Date().toISOString(),
        cooldown_until: cooldownUntil.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", msgRow.prospect_id);
  }

  return queued.id;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ActionBody;
    if (!body.opportunityId || !body.action) {
      return NextResponse.json({ error: "opportunityId and action are required" }, { status: 400 });
    }

    const supabase = getSupabase();
    const now = new Date().toISOString();

    if (body.action === "edit_message") {
      if (!body.messageId) {
        return NextResponse.json({ error: "messageId required" }, { status: 400 });
      }
      const { error } = await supabase
        .from("land_expand_outreach_messages")
        .update({
          edited_subject: body.subject ?? null,
          edited_body_text: body.bodyText ?? null,
          status: "edited",
          updated_at: now,
        })
        .eq("id", body.messageId)
        .eq("opportunity_id", body.opportunityId);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }

    if (body.action === "reject") {
      await supabase
        .from("land_expand_opportunities")
        .update({ status: "rejected", review_notes: body.notes || null, updated_at: now })
        .eq("id", body.opportunityId);
      await supabase
        .from("land_expand_outreach_messages")
        .update({ status: "rejected", updated_at: now })
        .eq("opportunity_id", body.opportunityId)
        .in("status", ["draft", "pending_approval", "edited"]);
      return NextResponse.json({ ok: true });
    }

    if (body.action === "snooze") {
      const days = body.snoozeDays ?? 14;
      const snoozeUntil = new Date();
      snoozeUntil.setDate(snoozeUntil.getDate() + days);
      await supabase
        .from("land_expand_opportunities")
        .update({
          status: "snoozed",
          snooze_until: snoozeUntil.toISOString(),
          review_notes: body.notes || null,
          updated_at: now,
        })
        .eq("id", body.opportunityId);
      await supabase
        .from("land_expand_outreach_messages")
        .update({ status: "snoozed", updated_at: now })
        .eq("opportunity_id", body.opportunityId)
        .in("status", ["draft", "pending_approval", "edited"]);
      return NextResponse.json({ ok: true, snooze_until: snoozeUntil.toISOString() });
    }

    if (body.action === "block_company") {
      const { data: opp } = await supabase
        .from("land_expand_opportunities")
        .select("company_id")
        .eq("id", body.opportunityId)
        .single();
      const companyId = body.companyId || opp?.company_id;
      if (!companyId) {
        return NextResponse.json({ error: "company not found" }, { status: 404 });
      }
      await supabase
        .from("land_expand_companies")
        .update({
          blocked: true,
          blocked_reason: body.notes || "Blocked from approval UI",
          updated_at: now,
        })
        .eq("id", companyId);
      await supabase
        .from("land_expand_opportunities")
        .update({ status: "blocked", review_notes: body.notes || null, updated_at: now })
        .eq("id", body.opportunityId);
      await supabase
        .from("land_expand_outreach_messages")
        .update({ status: "rejected", updated_at: now })
        .eq("opportunity_id", body.opportunityId)
        .in("status", ["draft", "pending_approval", "edited"]);
      return NextResponse.json({ ok: true });
    }

    if (body.action === "block_prospect") {
      if (!body.prospectId) {
        return NextResponse.json({ error: "prospectId required" }, { status: 400 });
      }
      await supabase
        .from("land_expand_prospects")
        .update({
          blocked: true,
          blocked_reason: body.notes || "Blocked from approval UI",
          updated_at: now,
        })
        .eq("id", body.prospectId);
      await supabase
        .from("land_expand_outreach_messages")
        .update({ status: "rejected", updated_at: now })
        .eq("opportunity_id", body.opportunityId)
        .eq("prospect_id", body.prospectId);
      return NextResponse.json({ ok: true });
    }

    if (body.action === "approve") {
      const { data: messages, error } = await supabase
        .from("land_expand_outreach_messages")
        .select(
          `
          id, subject, body_text, edited_subject, edited_body_text, status,
          prospect:land_expand_prospects ( email, first_name, full_name, blocked, opted_out )
        `
        )
        .eq("opportunity_id", body.opportunityId)
        .in("status", ["draft", "pending_approval", "edited", "approved"]);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      const queueIds: string[] = [];
      for (const message of messages || []) {
        const prospect = Array.isArray(message.prospect) ? message.prospect[0] : message.prospect;
        if (!prospect || prospect.blocked || prospect.opted_out || !prospect.email) continue;
        const id = await queueApprovedMessage(supabase, {
          ...message,
          prospect,
        });
        queueIds.push(id);
      }

      await supabase
        .from("land_expand_opportunities")
        .update({
          status: queueIds.length ? "executed" : "approved",
          review_notes: body.notes || null,
          updated_at: now,
        })
        .eq("id", body.opportunityId);

      const { data: opp } = await supabase
        .from("land_expand_opportunities")
        .select("company_id")
        .eq("id", body.opportunityId)
        .single();
      if (opp?.company_id) {
        await supabase
          .from("land_expand_companies")
          .update({ last_contacted_at: now, updated_at: now })
          .eq("id", opp.company_id);
      }

      return NextResponse.json({ ok: true, queued: queueIds.length, email_queue_ids: queueIds });
    }

    return NextResponse.json({ error: `Unknown action: ${body.action}` }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Action failed" },
      { status: 500 }
    );
  }
}
