import { formatDateRange } from "@/app/lib/schedule-display";
import { allowedOffer, findCourses } from "@/app/lib/site-agent/floors";
import { createSiteAgentSupabase } from "@/app/lib/site-agent/supabase";

export const SITE_AGENT_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "lookup_course",
      description: "Find a public catalog course by name, acronym, or slug.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Course name, acronym (POPM, LPM), or slug" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "lookup_schedule",
      description: "Upcoming public class dates and live prices. Filter by course when you know it.",
      parameters: {
        type: "object",
        properties: {
          course: { type: "string", description: "Course name or slug. Omit for the next upcoming classes." },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "price_offer",
      description:
        "Check whether a price is allowed. Call this before naming any price below list. Floors are enforced here.",
      parameters: {
        type: "object",
        properties: {
          course: { type: "string", description: "Course name, acronym, or slug" },
          proposed_price: { type: "number", description: "Dollar amount you want to offer" },
          corporate: { type: "boolean", description: "True for a team / private / corporate 20% quote" },
        },
        required: ["course"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "save_contact",
      description: "Save the visitor's name, email, company, and what they want.",
      parameters: {
        type: "object",
        properties: {
          email: { type: "string" },
          name: { type: "string" },
          company: { type: "string" },
          note: { type: "string" },
        },
        required: ["email"],
      },
    },
  },
];

export type LiveSession = {
  course_slug: string;
  start_date: string;
  end_date: string;
  price: string;
  timezone?: string | null;
  instructor_name?: string | null;
  exam_included?: boolean | null;
};

export type ToolContext = {
  conversationId: string;
  sessions: LiveSession[];
};

function parseArgs(raw: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(raw || "{}") as Record<string, unknown>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function money(value: string | number): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function sessionLine(row: LiveSession): string {
  const dates = formatDateRange(row.start_date, row.end_date, row.timezone || undefined);
  const instructor = row.instructor_name ? ` · ${row.instructor_name}` : "";
  const exam = row.exam_included ? " · exam included" : "";
  return `${row.course_slug} · ${dates} · $${String(row.price).replace(/\.00$/, "")}${instructor}${exam}`;
}

function sessionsForCourse(sessions: LiveSession[], slug: string): LiveSession[] {
  return sessions.filter((row) => row.course_slug === slug);
}

function publicPriceFor(slug: string, listPrice: number, sessions: LiveSession[]): number {
  const live = sessionsForCourse(sessions, slug);
  if (live.length === 0) return listPrice;
  const prices = [...new Set(live.map((row) => money(row.price)).filter((n) => n > 0))];
  if (prices.length === 1) return prices[0];
  if (listPrice > 0 && prices.includes(listPrice)) return listPrice;
  return Math.min(...prices);
}

export async function executeSiteAgentTool(
  name: string,
  rawArgs: string,
  context: ToolContext,
): Promise<unknown> {
  const args = parseArgs(rawArgs);

  if (name === "lookup_course") {
    const query = String(args.query || "");
    const courses = findCourses(query);
    if (courses.length === 0) return { found: false, message: "No matching public course." };
    return {
      found: true,
      courses: courses.map((course) => ({
        title: course.title,
        slug: course.slug,
        url: course.url,
        list_price: course.listPrice || null,
        hours: course.hours,
        days: course.days,
        who_for: course.skills,
        category: course.category,
        private_cohort: course.privateClass,
      })),
    };
  }

  if (name === "lookup_schedule") {
    const query = String(args.course || "").trim();
    const matched = query ? findCourses(query) : [];
    const slugs = new Set(matched.map((course) => course.slug));
    const rows = query
      ? context.sessions.filter((row) => slugs.has(row.course_slug) || row.course_slug.includes(query.toLowerCase()))
      : context.sessions.slice(0, 16);
    if (rows.length === 0) {
      return { found: false, message: "No upcoming public date for that class." };
    }
    return { found: true, sessions: rows.map(sessionLine) };
  }

  if (name === "price_offer") {
    const query = String(args.course || "");
    const course = findCourses(query)[0];
    if (!course) return { ok: false, message: "Unknown course. Look it up first." };

    const publicPrice = publicPriceFor(course.slug, course.listPrice, context.sessions);
    if (publicPrice <= 0) {
      return {
        ok: false,
        handoff: true,
        message: "No public list price. Ask for email and hand off, or quote corporate 20% only after a live price exists.",
      };
    }

    const proposed =
      typeof args.proposed_price === "number"
        ? args.proposed_price
        : typeof args.proposed_price === "string"
          ? Number(args.proposed_price)
          : undefined;
    const result = allowedOffer({
      course,
      publicPrice,
      proposed: Number.isFinite(proposed) ? proposed : undefined,
      corporate: Boolean(args.corporate),
    });

    return {
      course: course.title,
      slug: course.slug,
      url: course.url,
      public_price: result.publicPrice,
      floor: result.floor,
      lowest_allowed: result.lowestAllowed,
      proposed: result.proposed,
      allowed: result.allowed,
      handoff: result.handoff,
      rule: result.rule,
      live_dates: sessionsForCourse(context.sessions, course.slug).slice(0, 6).map(sessionLine),
      guidance: result.allowed
        ? result.proposed == null
          ? "You may offer at or above lowest_allowed. Do not open at the floor unless you need to close."
          : `You may offer $${result.proposed}. Take their email so the price can be applied.`
        : result.handoff
          ? "Under the floor. Do not offer it. Hand off."
          : "That number is not an allowed public offer.",
    };
  }

  if (name === "save_contact") {
    const email = String(args.email || "").trim().toLowerCase().slice(0, 120);
    if (!email.includes("@")) return { ok: false, message: "Need a real email." };
    const supabase = createSiteAgentSupabase();
    if (!supabase) return { ok: false, message: "Could not save contact." };
    const name = String(args.name || "").trim().slice(0, 80);
    const { data: current } = await supabase
      .from("chat_conversations")
      .select("visitor_name")
      .eq("id", context.conversationId)
      .maybeSingle();
    await supabase
      .from("chat_conversations")
      .update({
        visitor_email: email,
        visitor_name: name || current?.visitor_name || null,
      })
      .eq("id", context.conversationId);
    return { ok: true, saved: email };
  }

  return { ok: false, message: `Unknown tool ${name}` };
}
