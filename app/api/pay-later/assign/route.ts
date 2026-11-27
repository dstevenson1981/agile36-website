import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createAuthClient } from "@/app/lib/supabase/server";
import { DATE_LATER_SCHEDULE_ID } from "@/app/lib/pay-later";
import { formatDateRange, formatTimeRange } from "@/app/lib/schedule-display";
import { sendPrepaidDateEmail } from "@/app/lib/send-prepaid-training-email";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paymentIntentId = typeof body.paymentIntentId === "string" ? body.paymentIntentId.trim() : "";
    const scheduleId = typeof body.scheduleId === "string" ? body.scheduleId.trim() : "";
    const auth = await createAuthClient();
    const { data: { user } } = await auth.auth.getUser();
    const email = user?.email?.trim().toLowerCase() || "";
    if (!email) {
      return NextResponse.json({ error: "Log in with the checkout email to confirm a date." }, { status: 401 });
    }
    if (!paymentIntentId || !scheduleId || scheduleId === DATE_LATER_SCHEDULE_ID) {
      return NextResponse.json({ error: "Choose a date." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, customer_email, course_slug, course_name, payment_status, schedule_id, quantity")
      .eq("payment_intent_id", paymentIntentId)
      .maybeSingle();
    if (orderError || !order || order.payment_status !== "succeeded") {
      return NextResponse.json({ error: "We couldn't find that payment." }, { status: 404 });
    }
    if (String(order.customer_email || "").trim().toLowerCase() !== email) {
      return NextResponse.json({ error: "That email does not match this payment." }, { status: 403 });
    }
    if (order.schedule_id !== DATE_LATER_SCHEDULE_ID) {
      return NextResponse.json({ error: "A date is already chosen for this payment." }, { status: 409 });
    }

    const { data: schedule, error: scheduleError } = await supabase
      .from("course_schedules")
      .select("id, course_slug, start_date, end_date, start_time, end_time, timezone, duration, status, hidden")
      .eq("id", scheduleId)
      .maybeSingle();
    if (scheduleError || !schedule || schedule.status !== "active" || schedule.hidden === true) {
      return NextResponse.json({ error: "That class date is not available." }, { status: 400 });
    }
    if (schedule.course_slug !== order.course_slug) {
      return NextResponse.json({ error: "Choose a date for the course you paid for." }, { status: 400 });
    }
    if (new Date(schedule.start_date).getTime() < Date.now()) {
      return NextResponse.json({ error: "That class has already started." }, { status: 400 });
    }

    const scheduleDate = formatDateRange(schedule.start_date, schedule.end_date, schedule.timezone || undefined);
    const scheduleTime = formatTimeRange(schedule.start_time, schedule.end_time) || "";
    const { data: updated, error: updateError } = await supabase
      .from("orders")
      .update({
        schedule_id: schedule.id,
        schedule_date: scheduleDate,
        schedule_time: scheduleTime,
        duration: schedule.duration || "",
        timezone: schedule.timezone || "",
      })
      .eq("id", order.id)
      .eq("schedule_id", DATE_LATER_SCHEDULE_ID)
      .select("id, schedule_date, schedule_time, timezone")
      .maybeSingle();
    if (updateError || !updated) {
      return NextResponse.json({ error: "A date is already chosen for this payment." }, { status: 409 });
    }

    const quantity = Math.max(1, Number(order.quantity) || 1);
    const { error: bumpError } = await supabase.rpc("increment_schedule_registrants", {
      p_schedule_ids: schedule.id,
      p_quantity: quantity,
    });
    if (bumpError) {
      console.error("Pay-later seat count update failed:", bumpError);
    }

    await sendPrepaidDateEmail(
      email,
      String(order.course_name || "your course"),
      scheduleDate,
      scheduleTime,
    );

    return NextResponse.json({
      ok: true,
      courseName: order.course_name,
      scheduleDate: updated.schedule_date,
      scheduleTime: updated.schedule_time,
      timezone: updated.timezone,
    });
  } catch (error) {
    console.error("Pay-later assign failed:", error);
    return NextResponse.json({ error: "Could not save that date." }, { status: 500 });
  }
}
