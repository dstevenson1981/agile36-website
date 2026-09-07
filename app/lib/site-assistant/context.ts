import { createClient } from "@/app/lib/supabase/server";
import { identifyIp } from "@/app/lib/hyper/identify";
import { labelPath, type VisitorHint } from "./journey";
import { createClient as createAdminClient } from "@supabase/supabase-js";

function asText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseHint(raw: unknown): VisitorHint {
  if (!raw || typeof raw !== "object") return {};
  const row = raw as Record<string, unknown>;
  const pages = Array.isArray(row.pages)
    ? row.pages
        .filter((page): page is { path: string; title?: string } => !!page && typeof (page as { path?: unknown }).path === "string")
        .slice(-12)
        .map((page) => ({
          path: String(page.path).slice(0, 200),
          title: typeof page.title === "string" ? page.title.slice(0, 120) : undefined,
        }))
    : [];
  return {
    name: asText(row.name, 80) || undefined,
    email: asText(row.email, 120).toLowerCase() || undefined,
    visitCount: typeof row.visitCount === "number" ? row.visitCount : undefined,
    firstSeen: typeof row.firstSeen === "number" ? row.firstSeen : undefined,
    pages,
  };
}

function parseCookie(value: string | undefined): VisitorHint {
  if (!value) return {};
  try {
    return parseHint(JSON.parse(decodeURIComponent(value)));
  } catch {
    return {};
  }
}

function mergeHints(...hints: VisitorHint[]): VisitorHint {
  const out: VisitorHint = {};
  for (const hint of hints) {
    if (hint.name) out.name = hint.name;
    if (hint.email) out.email = hint.email;
    if (typeof hint.visitCount === "number") out.visitCount = hint.visitCount;
    if (typeof hint.firstSeen === "number") out.firstSeen = hint.firstSeen;
    if (hint.pages?.length) out.pages = hint.pages;
  }
  return out;
}

async function accountIdentity(): Promise<VisitorHint> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return {};
    const name =
      (typeof user.user_metadata?.name === "string" && user.user_metadata.name) ||
      (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
      "";
    return {
      name: name.trim() || undefined,
      email: user.email || undefined,
    };
  } catch {
    return {};
  }
}

async function lookupOwnRecord(email: string): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !email.includes("@")) return null;
  const supabase = createAdminClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const safeEmail = email.replace(/[%_]/g, "");
  const [orders, leads] = await Promise.all([
    supabase
      .from("orders")
      .select("created_at, payment_status, course_name, course_slug, promo_code, schedule_date, plan")
      .ilike("customer_email", safeEmail)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("enrollment_leads")
      .select("created_at, status, course_name, course_slug")
      .ilike("email", safeEmail)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  const paid = (orders.data ?? []).filter((row) => row.payment_status === "succeeded");
  const openLeads = (leads.data ?? []).filter((row) => row.status !== "completed" && row.status !== "cancelled");
  const lines: string[] = [];
  if (paid[0]) {
    lines.push(
      `They already paid for ${paid[0].course_name || paid[0].course_slug}${paid[0].schedule_date ? ` (${paid[0].schedule_date})` : ""}. Help them, do not re-sell that class.`,
    );
  }
  if (!paid[0] && openLeads[0]) {
    lines.push(
      `They started checkout for ${openLeads[0].course_name || openLeads[0].course_slug} and did not finish. Make it easy to complete.`,
    );
  }
  return lines.length ? lines.join("\n") : null;
}

async function networkHint(ip: string): Promise<string | null> {
  if (!ip || ip === "unknown" || ip === "127.0.0.1" || ip === "::1") return null;
  try {
    const identity = await identifyIp(ip);
    const place = [identity.city, identity.region].filter(Boolean).join(", ");
    const bits: string[] = [];
    if (place) bits.push(`They appear to be in ${place}. You can mention the city if it helps pick a timezone. Do not say you tracked them.`);
    if (identity.isBusiness && identity.companyName) {
      bits.push(
        `Possible company from their network: ${identity.companyName}. Do not greet them as that company or name it unless they said it. Use it only to decide team vs individual.`,
      );
    }
    return bits.length ? bits.join(" ") : null;
  } catch {
    return null;
  }
}

export async function buildVisitorContext(input: {
  rawHint: unknown;
  cookieValue?: string;
  ip: string;
}): Promise<string> {
  const hint = mergeHints(parseCookie(input.cookieValue), await accountIdentity(), parseHint(input.rawHint));
  const lines: string[] = [];

  if (hint.name) lines.push(`Known first-party name: ${hint.name}. Use the first name sparingly.`);
  if (hint.email) lines.push(`Known email: ${hint.email}. You may look them up.`);
  if (hint.visitCount && hint.visitCount > 1) {
    lines.push(`Returning visitor. Visit count: ${hint.visitCount}.`);
  } else {
    lines.push("First visit we know about.");
  }
  if (hint.firstSeen) {
    const days = Math.max(0, Math.floor((Date.now() - hint.firstSeen) / 86400000));
    if (days > 0) lines.push(`First seen ${days} day${days === 1 ? "" : "s"} ago.`);
  }

  const pages = hint.pages ?? [];
  if (pages.length > 0) {
    const labeled = pages.map((page) => labelPath(page.path)).filter(Boolean);
    const unique = [...new Set(labeled)].slice(-8);
    lines.push(`Pages they viewed: ${unique.join(" → ")}.`);
    if (pages.some((page) => page.path.includes("/checkout"))) {
      lines.push("They reached checkout. If they did not pay, offer the enroll button for that class.");
    }
  }

  if (hint.email) {
    const record = await lookupOwnRecord(hint.email);
    if (record) lines.push(record);
  }

  const network = await networkHint(input.ip);
  if (network) lines.push(network);

  return lines.join("\n");
}
