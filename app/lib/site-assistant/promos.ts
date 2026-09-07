import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  BANNER_COUPON_CODE,
  BANNER_DISCOUNT_AMOUNT,
  PROMO_ENDS_AT_ISO,
  isSitePromoActive,
} from "@/app/lib/site-promo";
import {
  POPM_PROMO_CAP,
  SASM465_PROMO_CAP,
  discountPerSeatForCap,
  getCoursePromoCapByCode,
} from "@/app/lib/course-promo-caps";
import {
  PUBLIC_CATALOG_COURSES,
  getCatalogCourseAcronym,
  getCatalogCourseSlug,
} from "@/app/lib/course-catalog";

export type LivePromo = {
  code: string;
  discountType: "fixed" | "percentage";
  discountValue: number;
  courseSlug: string | null;
  expiresAt: string | null;
  description: string | null;
};

export type DiscountOffer = {
  canOffer: boolean;
  code: string | null;
  amountUsd: number | null;
  percent: number | null;
  payUsd: number | null;
  endsAt: string | null;
  stacks: false;
  note: string;
  comboInstead: boolean;
};

function admin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function stillValid(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  return Date.parse(expiresAt) > Date.now();
}

export async function fetchLivePromos(): Promise<{ promos: LivePromo[]; error: string | null }> {
  const supabase = admin();
  if (!supabase) return { promos: [], error: "Supabase is not configured." };

  const { data, error } = await supabase
    .from("promo_codes")
    .select("code, discount_type, discount_value, course_slug, expires_at, description, active")
    .eq("active", true);

  if (error) return { promos: [], error: error.message };

  const promos = (data ?? [])
    .filter((row) => stillValid(row.expires_at))
    .map((row) => ({
      code: String(row.code).trim(),
      discountType: row.discount_type === "percentage" ? ("percentage" as const) : ("fixed" as const),
      discountValue: Number(row.discount_value),
      courseSlug: row.course_slug ? String(row.course_slug) : null,
      expiresAt: row.expires_at ? String(row.expires_at) : null,
      description: row.description ? String(row.description) : null,
    }))
    .filter((row) => row.code && Number.isFinite(row.discountValue));

  return { promos, error: null };
}

function findPromo(promos: LivePromo[], code: string): LivePromo | undefined {
  return promos.find((promo) => promo.code.toUpperCase() === code.toUpperCase());
}

function dollarsOff(promo: LivePromo, listPrice: number | null): number {
  if (promo.discountType === "percentage") {
    if (!listPrice) return 0;
    return Math.round(listPrice * (promo.discountValue / 100) * 100) / 100;
  }
  return promo.discountValue;
}

async function nextListPrice(courseSlug: string): Promise<number | null> {
  const supabase = admin();
  if (!supabase) return null;
  const { data } = await supabase
    .from("course_schedules")
    .select("price")
    .eq("course_slug", courseSlug)
    .eq("status", "active")
    .or("hidden.is.null,hidden.eq.false")
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true })
    .limit(1)
    .maybeSingle();
  const price = data?.price != null ? Number(data.price) : null;
  return price && Number.isFinite(price) ? price : null;
}

async function hasOpenLead(email: string): Promise<boolean> {
  const supabase = admin();
  if (!supabase || !email.includes("@")) return false;
  const safe = email.replace(/[%_]/g, "");
  const { data } = await supabase
    .from("enrollment_leads")
    .select("status")
    .ilike("email", safe)
    .order("created_at", { ascending: false })
    .limit(5);
  return (data ?? []).some((row) => row.status !== "completed" && row.status !== "cancelled");
}

function resolveSlug(raw: string): string {
  const needle = raw.trim().toLowerCase().replace(/^\/courses\//, "").replace(/\/$/, "");
  if (!needle) return "";
  const match =
    PUBLIC_CATALOG_COURSES.find((course) => getCatalogCourseSlug(course) === needle) ??
    PUBLIC_CATALOG_COURSES.find(
      (course) => getCatalogCourseAcronym(course.title).toLowerCase() === needle,
    );
  return match ? getCatalogCourseSlug(match) : needle;
}

export async function publicSaleFromSupabase(): Promise<{
  active: boolean;
  code?: string;
  amountUsd?: number;
  endsAt?: string;
  note: string;
  source: "supabase" | "fallback";
}> {
  const { promos, error } = await fetchLivePromos();
  const sale = findPromo(promos, BANNER_COUPON_CODE);
  if (sale) {
    return {
      active: true,
      code: sale.code.toUpperCase(),
      amountUsd: sale.discountValue,
      endsAt: sale.expiresAt ?? undefined,
      note: "They type this code at checkout. One code only. Discounted enrollments are not refundable.",
      source: "supabase",
    };
  }
  if (error) {
    return {
      active: isSitePromoActive(),
      code: isSitePromoActive() ? BANNER_COUPON_CODE : undefined,
      amountUsd: isSitePromoActive() ? BANNER_DISCOUNT_AMOUNT : undefined,
      endsAt: isSitePromoActive() ? PROMO_ENDS_AT_ISO : undefined,
      note: error,
      source: "fallback",
    };
  }
  if (isSitePromoActive()) {
    return {
      active: true,
      code: BANNER_COUPON_CODE,
      amountUsd: BANNER_DISCOUNT_AMOUNT,
      endsAt: PROMO_ENDS_AT_ISO,
      note: "They type this code at checkout. One code only. Discounted enrollments are not refundable.",
      source: "fallback",
    };
  }
  return { active: false, note: "No public sale is active in promo_codes.", source: "supabase" };
}

export async function decideDiscount(input: {
  courseSlug?: string;
  askedForMore?: boolean;
  seats?: number;
  isCombo?: boolean;
  email?: string;
  listPriceUsd?: number;
}): Promise<DiscountOffer> {
  const seats = input.seats && input.seats > 0 ? input.seats : 1;
  const courseSlug = input.courseSlug ? resolveSlug(input.courseSlug) : "";
  const { promos } = await fetchLivePromos();
  const listPrice = input.listPriceUsd ?? (courseSlug ? await nextListPrice(courseSlug) : null);
  const openLead = input.email ? await hasOpenLead(input.email) : false;

  if (input.isCombo || courseSlug.startsWith("combo")) {
    return {
      canOffer: false,
      code: null,
      amountUsd: null,
      percent: null,
      payUsd: null,
      endsAt: null,
      stacks: false,
      comboInstead: true,
      note: "Combo already has the bundle price. Checkout will not take another promo code.",
    };
  }

  type Candidate = {
    code: string;
    amountUsd: number;
    percent: number | null;
    payUsd: number | null;
    endsAt: string | null;
    note: string;
  };
  const candidates: Candidate[] = [];

  const sale = findPromo(promos, "100OFF");
  if (sale) {
    const off = dollarsOff(sale, listPrice);
    candidates.push({
      code: "100OFF",
      amountUsd: off,
      percent: null,
      payUsd: listPrice ? Math.max(0, listPrice - off) : null,
      endsAt: sale.expiresAt,
      note: "Current public sale. One code at checkout.",
    });
  }

  const extra = findPromo(promos, "150OFF") || findPromo(promos, "150off");
  if (extra && (input.askedForMore || openLead)) {
    const off = dollarsOff(extra, listPrice);
    candidates.push({
      code: extra.code.toUpperCase(),
      amountUsd: off,
      percent: null,
      payUsd: listPrice ? Math.max(0, listPrice - off) : null,
      endsAt: extra.expiresAt,
      note: "Extra $50 beyond the public sale. Use this instead of 100OFF — codes do not stack.",
    });
  }

  const apm = findPromo(promos, "APM");
  if (apm && courseSlug === "agile-product-management") {
    const off = dollarsOff(apm, listPrice);
    candidates.push({
      code: "APM",
      amountUsd: off,
      percent: null,
      payUsd: listPrice ? Math.max(0, listPrice - off) : null,
      endsAt: apm.expiresAt,
      note: "APM-only code. Better than the sitewide sale on this class.",
    });
  }

  const group = findPromo(promos, "GROUP");
  if (group && seats >= 3) {
    const off = dollarsOff(group, listPrice);
    candidates.push({
      code: "GROUP",
      amountUsd: off,
      percent: group.discountType === "percentage" ? group.discountValue : null,
      payUsd: listPrice ? Math.max(0, listPrice - off) : null,
      endsAt: group.expiresAt,
      note: "15% off when they are buying 3 or more seats.",
    });
  }

  if (courseSlug === POPM_PROMO_CAP.courseSlug && listPrice) {
    const cap = discountPerSeatForCap(listPrice, POPM_PROMO_CAP);
    if (cap.ok && (input.askedForMore || openLead)) {
      candidates.push({
        code: POPM_PROMO_CAP.code,
        amountUsd: cap.discountPerSeat,
        percent: null,
        payUsd: POPM_PROMO_CAP.pricePerSeat,
        endsAt: null,
        note: "POPM floor. Lands the seat at $399. Use this instead of 100OFF.",
      });
    }
  }

  if (courseSlug === SASM465_PROMO_CAP.courseSlug && listPrice && getCoursePromoCapByCode("SASM465")) {
    const cap = discountPerSeatForCap(listPrice, SASM465_PROMO_CAP);
    if (cap.ok && (input.askedForMore || openLead)) {
      candidates.push({
        code: SASM465_PROMO_CAP.code,
        amountUsd: cap.discountPerSeat,
        percent: null,
        payUsd: SASM465_PROMO_CAP.pricePerSeat,
        endsAt: null,
        note: "SASM floor. Lands the seat at $465.",
      });
    }
  }

  candidates.sort((a, b) => b.amountUsd - a.amountUsd);
  const best = candidates[0];
  if (!best) {
    return {
      canOffer: false,
      code: null,
      amountUsd: null,
      percent: null,
      payUsd: listPrice,
      endsAt: null,
      stacks: false,
      comboInstead: false,
      note: "No live promo applies. Do not invent a code. Hold the listed price, or send them to a combo / team quote.",
    };
  }

  return {
    canOffer: true,
    code: best.code,
    amountUsd: best.amountUsd,
    percent: best.percent,
    payUsd: best.payUsd,
    endsAt: best.endsAt,
    stacks: false,
    comboInstead: false,
    note: `${best.note} Checkout takes one code. Discounted enrollments are not refundable.`,
  };
}

