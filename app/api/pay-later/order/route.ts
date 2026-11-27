import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DATE_LATER_SCHEDULE_ID } from "@/app/lib/pay-later";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const paymentIntentId = request.nextUrl.searchParams.get("payment_intent")?.trim() || "";
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase() || "";
  if (!paymentIntentId || !email) {
    return NextResponse.json({ error: "Payment and email are required." }, { status: 400 });
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: order } = await supabase
    .from("orders")
    .select("customer_email, course_slug, course_name, payment_status, schedule_id, schedule_date, schedule_time, timezone")
    .eq("payment_intent_id", paymentIntentId)
    .maybeSingle();
  if (!order || order.payment_status !== "succeeded") {
    return NextResponse.json({ error: "We couldn't find that payment." }, { status: 404 });
  }
  if (String(order.customer_email || "").trim().toLowerCase() !== email) {
    return NextResponse.json({ error: "That email does not match this payment." }, { status: 403 });
  }
  const open = order.schedule_id === DATE_LATER_SCHEDULE_ID;
  return NextResponse.json({
    courseSlug: order.course_slug,
    courseName: order.course_name,
    scheduled: !open,
    scheduleDate: open ? "" : order.schedule_date || "",
    scheduleTime: open ? "" : order.schedule_time || "",
    timezone: open ? "" : order.timezone || "",
  });
}
