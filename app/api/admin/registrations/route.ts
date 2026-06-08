import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  formatAttendeesSummary,
  formatEnrollingForLabel,
  isEnrollingForSomeoneElse,
  parseAttendees,
} from "@/app/lib/registration-display";

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

function formatClassDates(startDate?: string | null, endDate?: string | null): string | null {
  if (!startDate) return null;
  try {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    const startLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (!end) return startLabel;
    const endLabel = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${startLabel} – ${endLabel}`;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "50", 10) || 50, 1), 200);

    const supabase = getSupabase();
    let query = supabase
      .from("orders")
      .select(
        "id, created_at, payment_intent_id, stripe_customer_id, schedule_id, course_slug, course_name, plan, quantity, amount, currency, customer_email, customer_name, customer_phone, alternative_contact, enrolling_for, payment_status, promo_code, schedule_date, schedule_time, duration, timezone"
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (q) {
      const escaped = q.replace(/[%_]/g, "\\$&");
      query = query.or(
        [
          `stripe_customer_id.ilike.%${escaped}%`,
          `customer_email.ilike.%${escaped}%`,
          `customer_name.ilike.%${escaped}%`,
          `payment_intent_id.ilike.%${escaped}%`,
          `alternative_contact.ilike.%${escaped}%`,
        ].join(",")
      );
    }

    const { data: orders, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const scheduleIds = Array.from(
      new Set(
        (orders || [])
          .flatMap((order) => String(order.schedule_id || "").split(",").map((id) => id.trim()))
          .filter(Boolean)
      )
    );

    const scheduleMap = new Map<string, Record<string, unknown>>();
    if (scheduleIds.length > 0) {
      const { data: schedules } = await supabase
        .from("course_schedules")
        .select("id, start_date, end_date, instructor_name, start_time, end_time")
        .in("id", scheduleIds);

      for (const schedule of schedules || []) {
        scheduleMap.set(String(schedule.id), schedule);
      }
    }

    const registrations = (orders || []).map((order) => {
      const primaryScheduleId = String(order.schedule_id || "").split(",")[0]?.trim() || "";
      const schedule = primaryScheduleId ? scheduleMap.get(primaryScheduleId) : undefined;
      const attendees = parseAttendees(order.alternative_contact);
      const enrollingForSomeoneElse = isEnrollingForSomeoneElse(order.enrolling_for);

      return {
        ...order,
        enrollment_type: formatEnrollingForLabel(order.enrolling_for),
        enrolling_for_someone_else: enrollingForSomeoneElse,
        paid_by: {
          name: order.customer_name || null,
          email: order.customer_email || null,
          phone: order.customer_phone || null,
        },
        attendees,
        attendees_summary: formatAttendeesSummary(order.alternative_contact),
        class_dates:
          order.schedule_date ||
          formatClassDates(
            schedule?.start_date as string | undefined,
            schedule?.end_date as string | undefined
          ),
        instructor_name: (schedule?.instructor_name as string | undefined) || null,
      };
    });

    return NextResponse.json({ registrations, count: registrations.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load registrations";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
