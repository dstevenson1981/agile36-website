import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";
import {
  discountPerSeatForCap,
  getCoursePromoCapByCode,
  roundMoney,
} from "@/app/lib/course-promo-caps";

/** Stored on orders until the buyer chooses a cohort. Not a real schedule id. */
export const DATE_LATER_SCHEDULE_ID = "date-later";

export type PayLaterOffer = {
  slug: string;
  courseName: string;
  price: number;
};

const COURSE_NAMES: Record<string, string> = {
  "product-owner-manager": "AI-Empowered SAFe Product Owner/Product Manager",
  "leading-safe": "AI-Empowered Leading SAFe® / SAFe Agilist",
  "scrum-master": "AI-Empowered SAFe Scrum Master",
  "lean-portfolio-management": "SAFe Lean Portfolio Management",
  "agile-product-management": "SAFe Agile Product Management",
  "safe-for-architects": "SAFe for Architects",
  "safe-for-teams": "AI-Empowered SAFe for Teams",
  "devops": "SAFe DevOps",
  "advanced-scrum-master": "AI-Empowered SAFe Advanced Scrum Master",
  "release-train-engineer": "AI-Empowered SAFe Release Train Engineer",
  "value-stream-mapping": "SAFe Value Stream Mapping",
  "responsible-ai": "Responsible AI with SAFe",
  "ai-driven-scrum-master": "AI-Driven Scrum Master™",
  "certified-genai-practitioner": "Certified GenAI Practitioner",
  "certified-ai-product-manager": "Certified AI Product Manager",
  "ai-agent-builder": "No-Code AI Agents & Automation™",
  "ai-workflow-automation": "AI Workflow Automation™",
  "ai-app-builder": "No-Code AI App Builder™",
  "executive-genai-leadership": "Executive GenAI Leadership",
  "generative-ai-project-managers": "Generative AI for Project Managers",
};

export function listPayLaterOffers(): PayLaterOffer[] {
  return Object.keys(COURSE_HERO_SCHEDULE_LIST_USD)
    .map((slug) => payLaterOffer(slug))
    .filter((offer): offer is PayLaterOffer => offer != null);
}

export function payLaterOffer(slug: string): PayLaterOffer | null {
  const key = slug.trim();
  const price = COURSE_HERO_SCHEDULE_LIST_USD[key]?.current;
  if (!price || price <= 0) return null;
  return { slug: key, courseName: COURSE_NAMES[key] || key, price };
}

type PromoRow = {
  code: string;
  discount_type: string;
  discount_value: string | number;
  active: boolean;
  expires_at: string | null;
  usage_limit: number | null;
  usage_count: number | null;
  course_slug?: string | null;
};

type PromoClient = {
  rpc: (fn: string, args: { p_code: string }) => PromiseLike<{ data: unknown }>;
  from: (table: string) => {
    select: (columns: string) => {
      ilike: (column: string, value: string) => {
        maybeSingle: () => PromiseLike<{ data: unknown; error: { message: string } | null }>;
      };
    };
  };
};

export function prepaidCheckoutSchedule(slug: string) {
  const offer = payLaterOffer(slug);
  if (!offer) return null;
  const original = COURSE_HERO_SCHEDULE_LIST_USD[offer.slug]?.original ?? offer.price;
  return {
    id: DATE_LATER_SCHEDULE_ID,
    price: String(offer.price),
    original_price: String(original),
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    timezone: "",
    duration: "",
    prepaid: true as const,
  };
}

export async function priceDateLater(
  supabase: PromoClient,
  args: { courseSlug: string; code: string; selectedPlan?: unknown; quantity?: unknown },
): Promise<
  | { charge: number; discount: number; original: number; courseName: string; code: string }
  | { error: string }
> {
  const offer = payLaterOffer(args.courseSlug);
  if (!offer) return { error: "This course cannot be purchased without a date." };

  const quantity = Math.max(1, Math.min(100, parseInt(String(args.quantity ?? 1), 10) || 1));
  const unit = args.selectedPlan === "pro" ? roundMoney(offer.price * 1.15) : offer.price;
  const original = roundMoney(unit * quantity);
  const code = args.code.trim();
  if (!code) {
    return { charge: original, discount: 0, original, courseName: offer.courseName, code: "" };
  }

  const cap = getCoursePromoCapByCode(code);
  if (cap) {
    if (cap.courseSlug !== offer.slug) {
      return { error: `This promo code is only valid for the ${cap.courseSlug} course` };
    }
    const result = discountPerSeatForCap(unit, cap);
    if (!result.ok) return { error: "This promo code does not apply to this class price." };
    const discount = roundMoney(result.discountPerSeat * quantity);
    return {
      charge: roundMoney(original - discount),
      discount,
      original,
      courseName: offer.courseName,
      code: cap.code,
    };
  }

  let promo: PromoRow | null = null;
  const { data: rpcData } = await supabase.rpc("get_promo_code_by_code", { p_code: code });
  const first = Array.isArray(rpcData) ? rpcData[0] : rpcData;
  if (first && typeof first === "object") promo = first as PromoRow;
  if (!promo) {
    const { data: row } = await supabase.from("promo_codes").select("*").ilike("code", code).maybeSingle();
    if (row) promo = row as PromoRow;
  }
  if (!promo || !promo.active) return { error: "This promo code is no longer active." };
  if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
    return { error: "This promo code has expired." };
  }
  if (promo.usage_limit && (promo.usage_count ?? 0) >= promo.usage_limit) {
    return { error: "This promo code has reached its usage limit." };
  }
  const allowed = (promo.course_slug || "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
  if (allowed.length > 0 && !allowed.includes(offer.slug)) {
    return { error: "This promo code does not apply to this class." };
  }

  const value = Number(promo.discount_value);
  if (!Number.isFinite(value) || value <= 0) return { error: "This promo code has no discount." };
  const discount =
    promo.discount_type === "percentage"
      ? roundMoney((original * value) / 100)
      : roundMoney(Math.min(value, original));
  return {
    charge: roundMoney(Math.max(0, original - discount)),
    discount,
    original,
    courseName: offer.courseName,
    code: promo.code,
  };
}
