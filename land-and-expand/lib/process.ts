import {
  COMPANY_COOLDOWN_DAYS,
  DEFAULT_BATCH_SIZE,
  MIN_ENRICHMENT_CONFIDENCE,
  matchOfferFromTitle,
  offerFromPurchasedCourse,
  prospectLimitForCompanySize,
  scoreTitleRelevance,
  similarTitlesFor,
} from "./config";
import { matchPersonByEmail, searchCompanyProspects, type ApolloPerson } from "./apollo";
import { draftOutreach } from "./draft";
import { emailDomain, isPersonalEmail, splitName } from "./email";
import { getSupabase } from "./supabase";

export type OrderRow = {
  id: string;
  customer_email: string;
  customer_name: string | null;
  course_slug: string;
  course_name: string;
  amount: number | string;
  payment_status: string;
  created_at: string;
  upsell_signal_processed: boolean | null;
};

type Fact = { claim: string; source: string; at: string };

function fact(claim: string, source: string): Fact {
  return { claim, source, at: new Date().toISOString() };
}

function domainFromWebsite(website: string | null | undefined): string | null {
  if (!website) return null;
  try {
    const url = website.startsWith("http") ? website : `https://${website}`;
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return website.replace(/^www\./, "").toLowerCase();
  }
}

async function markOrderProcessed(orderId: string) {
  const supabase = getSupabase();
  await supabase.from("orders").update({ upsell_signal_processed: true }).eq("id", orderId);
}

async function upsertCompany(params: {
  apolloCompanyId?: string | null;
  name: string;
  domain?: string | null;
  industry?: string | null;
  employeeCount?: number | null;
  linkedinUrl?: string | null;
  facts: Fact[];
}) {
  const supabase = getSupabase();

  if (params.apolloCompanyId) {
    const { data: byApollo } = await supabase
      .from("land_expand_companies")
      .select("*")
      .eq("apollo_company_id", params.apolloCompanyId)
      .maybeSingle();
    if (byApollo) return byApollo;
  }

  if (params.domain) {
    const { data: byDomain } = await supabase
      .from("land_expand_companies")
      .select("*")
      .ilike("domain", params.domain)
      .maybeSingle();
    if (byDomain) {
      if (params.apolloCompanyId && !byDomain.apollo_company_id) {
        await supabase
          .from("land_expand_companies")
          .update({
            apollo_company_id: params.apolloCompanyId,
            updated_at: new Date().toISOString(),
          })
          .eq("id", byDomain.id);
      }
      return byDomain;
    }
  }

  let priorPurchaseCount = 0;
  if (params.domain) {
    const { count } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("payment_status", "succeeded")
      .ilike("customer_email", `%@${params.domain}`);
    priorPurchaseCount = count ?? 0;
  }

  const { data, error } = await supabase
    .from("land_expand_companies")
    .insert({
      apollo_company_id: params.apolloCompanyId || null,
      name: params.name,
      domain: params.domain || null,
      industry: params.industry || null,
      employee_count: params.employeeCount ?? null,
      linkedin_url: params.linkedinUrl || null,
      prior_agile36_purchase_count: priorPurchaseCount,
      fact_sources: params.facts,
    })
    .select("*")
    .single();

  if (error) throw new Error(`Failed to insert company: ${error.message}`);
  return data;
}

function scoreOpportunity(params: {
  employeeCount: number | null;
  seniority: string | null;
  priorPurchases: number;
  customerCountAtCompany: number;
  prospectCount: number;
}): { score: number; evidence: string[] } {
  let score = 0.35;
  const evidence: string[] = [];

  if (params.customerCountAtCompany > 1) {
    score += 0.15;
    evidence.push(`${params.customerCountAtCompany} Agile36 customers at this company`);
  }
  if (params.prospectCount >= 3) {
    score += 0.15;
    evidence.push(`${params.prospectCount} relevant roles found via Apollo`);
  }
  if (params.seniority && /director|vp|head|chief|c-level|partner|principal|manager/.test(params.seniority.toLowerCase())) {
    score += 0.15;
    evidence.push(`Source customer seniority: ${params.seniority}`);
  }
  if ((params.employeeCount || 0) >= 50) {
    score += 0.1;
    evidence.push(`Company size ~${params.employeeCount}`);
  }
  if (params.priorPurchases > 1) {
    score += 0.1;
    evidence.push(`Prior Agile36 purchases from company domain: ${params.priorPurchases}`);
  }

  return { score: Math.min(score, 0.99), evidence };
}

async function upsertProspect(companyId: string, person: ApolloPerson, sourceEmail: string) {
  const supabase = getSupabase();
  const emails = [
    person.email,
    ...(person.emails || []).map((e) => (typeof e === "string" ? e : e?.address)),
  ]
    .filter(Boolean)
    .map((e) => String(e).toLowerCase().trim());

  if (emails.includes(sourceEmail.toLowerCase().trim())) return null;

  const title = person.title || null;
  const relevance = scoreTitleRelevance(title);
  const fullName =
    person.name ||
    [person.first_name, person.last_name].filter(Boolean).join(" ") ||
    null;

  const row = {
    company_id: companyId,
    apollo_person_id: person.id || null,
    email: emails[0] || null,
    first_name: person.first_name || null,
    last_name: person.last_name || null,
    full_name: fullName,
    job_title: title,
    seniority: person.seniority || null,
    department: person.departments?.join(", ") || person.department || null,
    linkedin_url: person.linkedin_url || null,
    relevance_score: relevance,
    fact_sources: [fact("prospect from Apollo people search", "apollo.mixed_people.search")],
    apollo_raw: person,
    updated_at: new Date().toISOString(),
  };

  if (person.id) {
    const { data, error } = await supabase
      .from("land_expand_prospects")
      .upsert(row, { onConflict: "company_id,apollo_person_id" })
      .select("*")
      .single();
    if (error) throw new Error(`Prospect upsert failed: ${error.message}`);
    return data;
  }

  if (row.email) {
    const { data: existing } = await supabase
      .from("land_expand_prospects")
      .select("*")
      .eq("company_id", companyId)
      .ilike("email", row.email)
      .maybeSingle();
    if (existing) return existing;
  }

  const { data, error } = await supabase.from("land_expand_prospects").insert(row).select("*").single();
  if (error) throw new Error(`Prospect insert failed: ${error.message}`);
  return data;
}

export async function processOrder(
  order: OrderRow,
  agentRunId: string
): Promise<{ opportunityCreated: boolean; skipped?: string }> {
  const supabase = getSupabase();
  const email = order.customer_email.trim().toLowerCase();
  const { first_name, last_name } = splitName(order.customer_name);

  const { data: sourceCustomer, error: sourceError } = await supabase
    .from("land_expand_source_customers")
    .upsert(
      {
        order_id: order.id,
        email,
        name: order.customer_name,
        course_slug: order.course_slug,
        course_name: order.course_name,
        amount: order.amount,
        registered_at: order.created_at,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "order_id" }
    )
    .select("*")
    .single();

  if (sourceError || !sourceCustomer) {
    throw new Error(`source customer upsert failed: ${sourceError?.message}`);
  }

  if (isPersonalEmail(email)) {
    await supabase
      .from("land_expand_source_customers")
      .update({
        enrichment_status: "skipped_personal_email",
        skip_reason: "Personal email domain; no reliable employer",
        updated_at: new Date().toISOString(),
      })
      .eq("id", sourceCustomer.id);
    await markOrderProcessed(order.id);
    return { opportunityCreated: false, skipped: "personal_email" };
  }

  const enrich = await matchPersonByEmail({
    email,
    firstName: first_name,
    lastName: last_name,
  });

  if (!enrich.person || enrich.uncertain || enrich.confidence < MIN_ENRICHMENT_CONFIDENCE) {
    await supabase
      .from("land_expand_source_customers")
      .update({
        enrichment_status: enrich.person ? "uncertain" : "skipped_low_confidence",
        enrichment_confidence: enrich.confidence,
        needs_human_review: true,
        skip_reason: enrich.reason || "Apollo match below confidence threshold",
        apollo_person_id: enrich.person?.id || null,
        job_title: enrich.person?.title || null,
        apollo_raw: enrich.person || null,
        fact_sources: [fact(enrich.reason || "uncertain Apollo match", "apollo.people.match")],
        updated_at: new Date().toISOString(),
      })
      .eq("id", sourceCustomer.id);
    await markOrderProcessed(order.id);
    return { opportunityCreated: false, skipped: "uncertain_match" };
  }

  const person = enrich.person;
  const org = person.organization;
  const companyName = org?.name || person.organization_name;
  if (!companyName) {
    await supabase
      .from("land_expand_source_customers")
      .update({
        enrichment_status: "skipped_no_employer",
        needs_human_review: true,
        skip_reason: "No employer on Apollo match",
        apollo_raw: person,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sourceCustomer.id);
    await markOrderProcessed(order.id);
    return { opportunityCreated: false, skipped: "no_employer" };
  }

  const domain =
    org?.primary_domain ||
    domainFromWebsite(org?.website_url) ||
    emailDomain(email);

  const company = await upsertCompany({
    apolloCompanyId: org?.id || person.organization_id || null,
    name: companyName,
    domain,
    industry: org?.industry || null,
    employeeCount: org?.estimated_num_employees ?? null,
    linkedinUrl: org?.linkedin_url || null,
    facts: [fact(`employer from Apollo match for ${email}`, "apollo.people.match")],
  });

  if (company.blocked) {
    await supabase
      .from("land_expand_source_customers")
      .update({
        enrichment_status: "enriched",
        company_id: company.id,
        skip_reason: "Company blocked",
        updated_at: new Date().toISOString(),
      })
      .eq("id", sourceCustomer.id);
    await markOrderProcessed(order.id);
    return { opportunityCreated: false, skipped: "company_blocked" };
  }

  if (company.cooldown_until && new Date(company.cooldown_until) > new Date()) {
    await supabase
      .from("land_expand_source_customers")
      .update({
        enrichment_status: "enriched",
        company_id: company.id,
        skip_reason: `Company in cooldown until ${company.cooldown_until}`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sourceCustomer.id);
    await markOrderProcessed(order.id);
    return { opportunityCreated: false, skipped: "company_cooldown" };
  }

  // Self-employed / tiny shop with no employees signal
  if (company.employee_count === 1 || company.employee_count === 0) {
    await supabase
      .from("land_expand_source_customers")
      .update({
        enrichment_status: "enriched",
        company_id: company.id,
        skip_reason: "Self-employed / no employees signal",
        updated_at: new Date().toISOString(),
      })
      .eq("id", sourceCustomer.id);
    await markOrderProcessed(order.id);
    return { opportunityCreated: false, skipped: "self_employed" };
  }

  await supabase
    .from("land_expand_source_customers")
    .update({
      enrichment_status: "enriched",
      enrichment_confidence: enrich.confidence,
      company_id: company.id,
      job_title: person.title || null,
      department: person.departments?.join(", ") || person.department || null,
      seniority: person.seniority || null,
      linkedin_url: person.linkedin_url || null,
      apollo_person_id: person.id || null,
      apollo_raw: person,
      fact_sources: [fact("enriched via Apollo people match", "apollo.people.match")],
      updated_at: new Date().toISOString(),
    })
    .eq("id", sourceCustomer.id);

  const { count: customerCount } = await supabase
    .from("land_expand_source_customers")
    .select("id", { count: "exact", head: true })
    .eq("company_id", company.id)
    .eq("enrichment_status", "enriched");

  await supabase
    .from("land_expand_companies")
    .update({
      customer_count: customerCount || 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", company.id);

  const limit = prospectLimitForCompanySize(company.employee_count);
  const searchTitles = similarTitlesFor(person.title);
  const people = await searchCompanyProspects({
    organizationId: company.apollo_company_id,
    organizationName: company.name,
    titles: searchTitles,
    perPage: limit,
  });

  const prospectRows = [];
  for (const p of people) {
    const row = await upsertProspect(company.id, p, email);
    if (!row) continue;
    if (row.blocked || row.opted_out) continue;
    if (row.cooldown_until && new Date(row.cooldown_until) > new Date()) continue;
    if (!row.email) continue;
    prospectRows.push(row);
  }

  // Prefer prospects whose titles resemble the buyer's; fall back to generic relevance.
  const buyerTitle = (person.title || "").toLowerCase();
  prospectRows.sort((a, b) => {
    const aTitle = (a.job_title || "").toLowerCase();
    const bTitle = (b.job_title || "").toLowerCase();
    const aSimilar = buyerTitle && aTitle.includes(buyerTitle.split(" ")[0] || "") ? 1 : 0;
    const bSimilar = buyerTitle && bTitle.includes(buyerTitle.split(" ")[0] || "") ? 1 : 0;
    if (bSimilar !== aSimilar) return bSimilar - aSimilar;
    return Number(b.relevance_score) - Number(a.relevance_score);
  });
  const selected = prospectRows.slice(0, limit);

  if (selected.length === 0) {
    await markOrderProcessed(order.id);
    return { opportunityCreated: false, skipped: "no_prospects" };
  }

  // Default: sell the same class. Only fall back to title→offer mapping if course is missing.
  const offer =
    order.course_name || order.course_slug
      ? offerFromPurchasedCourse(order.course_slug, order.course_name)
      : matchOfferFromTitle(person.title || selected[0].job_title);
  const adminReason = order.course_name
    ? `Pitch the same class (${order.course_name}) to colleagues with titles similar to ${person.title || "the buyer"}.`
    : offer.reason;
  const { score, evidence } = scoreOpportunity({
    employeeCount: company.employee_count,
    seniority: person.seniority || null,
    priorPurchases: company.prior_agile36_purchase_count || 0,
    customerCountAtCompany: customerCount || 1,
    prospectCount: selected.length,
  });
  if (person.title) {
    evidence.push(`Apollo search titles similar to: ${person.title}`);
  }
  evidence.push(`Recommended same course: ${offer.offer}`);

  const { data: opportunity, error: oppError } = await supabase
    .from("land_expand_opportunities")
    .insert({
      agent_run_id: agentRunId,
      source_customer_id: sourceCustomer.id,
      company_id: company.id,
      recommended_offer: offer.offer,
      recommendation_reason: adminReason,
      opportunity_score: score,
      supporting_evidence: evidence,
      outreach_strategy:
        "Find peers with similar titles and pitch the same class the registrant bought. Do not mention the registrant.",
      estimated_seats: Math.min(selected.length, Math.max(2, Math.round((company.employee_count || 20) * 0.02))),
      status: "pending_approval",
    })
    .select("*")
    .single();

  if (oppError || !opportunity) {
    throw new Error(`Opportunity insert failed: ${oppError?.message}`);
  }

  await supabase.from("land_expand_opportunity_prospects").insert(
    selected.map((p) => ({ opportunity_id: opportunity.id, prospect_id: p.id }))
  );

  for (const prospect of selected) {
    const draft = await draftOutreach({
      prospectFirstName: prospect.first_name,
      prospectTitle: prospect.job_title,
      companyName: company.name,
      offer: offer.offer,
      offerReason: offer.reason,
    });

    await supabase.from("land_expand_outreach_messages").upsert(
      {
        opportunity_id: opportunity.id,
        prospect_id: prospect.id,
        subject: draft.subject,
        body_text: draft.bodyText,
        status: "pending_approval",
        fact_sources: [
          fact(
            draft.usedOpenAI
              ? "drafted by OpenAI from public role/company fields"
              : "template draft from role/company fields",
            draft.usedOpenAI ? "openai.chat.completions" : "land_expand.template"
          ),
        ],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "opportunity_id,prospect_id" }
    );
  }

  const cooldownUntil = new Date();
  cooldownUntil.setDate(cooldownUntil.getDate() + COMPANY_COOLDOWN_DAYS);
  await supabase
    .from("land_expand_companies")
    .update({
      cooldown_until: cooldownUntil.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", company.id);

  await markOrderProcessed(order.id);
  return { opportunityCreated: true };
}

/**
 * Event-driven entry: run land-and-expand for one paid order.
 * Corporate emails only — personal emails are marked processed and skipped.
 * Safe to call more than once (idempotent via upsell_signal_processed).
 */
export async function triggerLandExpandForPaidOrder(orderId: string): Promise<{
  skipped?: string;
  opportunityCreated?: boolean;
  runId?: string;
}> {
  const supabase = getSupabase();

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      "id, customer_email, customer_name, course_slug, course_name, amount, payment_status, created_at, upsell_signal_processed"
    )
    .eq("id", orderId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!order) return { skipped: "order_not_found" };
  if (order.payment_status !== "succeeded") return { skipped: "not_succeeded" };
  if (order.upsell_signal_processed) return { skipped: "already_processed" };

  const email = String(order.customer_email || "").trim().toLowerCase();
  if (!email || isPersonalEmail(email)) {
    await markOrderProcessed(order.id);
    console.log(`[land-expand] order=${order.id} skipped personal/missing email`);
    return { skipped: "personal_email" };
  }

  if (!process.env.APOLLO_API_KEY) {
    console.error("[land-expand] APOLLO_API_KEY missing; leaving order unprocessed for retry");
    return { skipped: "missing_apollo_key" };
  }

  const { data: run, error: runError } = await supabase
    .from("land_expand_agent_runs")
    .insert({
      status: "running",
      notes: `Triggered by paid order ${order.id}`,
    })
    .select("*")
    .single();
  if (runError || !run) throw new Error(`Failed to create agent run: ${runError?.message}`);

  try {
    const result = await processOrder(order as OrderRow, run.id);
    await supabase
      .from("land_expand_agent_runs")
      .update({
        status: "completed",
        finished_at: new Date().toISOString(),
        orders_seen: 1,
        orders_processed: 1,
        opportunities_created: result.opportunityCreated ? 1 : 0,
        notes: result.skipped
          ? `Triggered by paid order ${order.id}; skip=${result.skipped}`
          : `Triggered by paid order ${order.id}`,
      })
      .eq("id", run.id);

    console.log(
      `[land-expand] order=${order.id} email=${email} → ${
        result.opportunityCreated ? "opportunity" : `skip:${result.skipped}`
      }`
    );

    return {
      runId: run.id,
      opportunityCreated: result.opportunityCreated,
      skipped: result.skipped,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await supabase
      .from("land_expand_agent_runs")
      .update({
        status: "failed",
        finished_at: new Date().toISOString(),
        orders_seen: 1,
        orders_processed: 0,
        errors: [{ order_id: order.id, error: message }],
      })
      .eq("id", run.id);
    throw err;
  }
}

export async function runLandExpand(options?: { limit?: number }) {
  const supabase = getSupabase();
  const limit = options?.limit ?? DEFAULT_BATCH_SIZE;

  const { data: run, error: runError } = await supabase
    .from("land_expand_agent_runs")
    .insert({ status: "running" })
    .select("*")
    .single();
  if (runError || !run) throw new Error(`Failed to create agent run: ${runError?.message}`);

  const errors: Array<{ order_id?: string; error: string }> = [];
  let processed = 0;
  let opportunities = 0;

  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        "id, customer_email, customer_name, course_slug, course_name, amount, payment_status, created_at, upsell_signal_processed"
      )
      .eq("payment_status", "succeeded")
      .or("upsell_signal_processed.is.null,upsell_signal_processed.eq.false")
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) throw new Error(error.message);
    const batch = (orders || []) as OrderRow[];

    for (const order of batch) {
      try {
        const result = await processOrder(order, run.id);
        processed += 1;
        if (result.opportunityCreated) opportunities += 1;
        console.log(
          `[land-expand] order=${order.id} email=${order.customer_email} → ${
            result.opportunityCreated ? "opportunity" : `skip:${result.skipped}`
          }`
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push({ order_id: order.id, error: message });
        console.error(`[land-expand] order=${order.id} failed:`, message);
      }
    }

    await supabase
      .from("land_expand_agent_runs")
      .update({
        status: errors.length && processed === 0 ? "failed" : "completed",
        finished_at: new Date().toISOString(),
        orders_seen: batch.length,
        orders_processed: processed,
        opportunities_created: opportunities,
        errors,
      })
      .eq("id", run.id);

    return {
      runId: run.id,
      ordersSeen: batch.length,
      ordersProcessed: processed,
      opportunitiesCreated: opportunities,
      errors,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await supabase
      .from("land_expand_agent_runs")
      .update({
        status: "failed",
        finished_at: new Date().toISOString(),
        errors: [...errors, { error: message }],
      })
      .eq("id", run.id);
    throw err;
  }
}
