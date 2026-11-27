"use client";

import { useEffect, useState } from "react";
import { formatDateRange, formatTimeRange, type CourseScheduleRow } from "@/app/lib/schedule-display";

export type PrepaidCredit = {
  paymentIntentId: string;
  courseName: string;
  courseSlug: string;
};

export default function PrepaidCredits({ credits }: { credits: PrepaidCredit[] }) {
  if (credits.length === 0) return null;
  return (
    <div className="mb-8 space-y-4">
      {credits.map((credit) => (
        <CreditCard key={credit.paymentIntentId} credit={credit} />
      ))}
    </div>
  );
}

function CreditCard({ credit }: { credit: PrepaidCredit }) {
  const [rows, setRows] = useState<CourseScheduleRow[]>([]);
  const [scheduleId, setScheduleId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/course-schedules?course_slug=${encodeURIComponent(credit.courseSlug)}&status=active`)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        const list = (data.data || []) as CourseScheduleRow[];
        setRows(list);
        setScheduleId(list[0]?.id || "");
      })
      .catch(() => {
        if (!cancelled) setError("Could not load dates.");
      });
    return () => {
      cancelled = true;
    };
  }, [credit.courseSlug]);

  const confirm = async () => {
    if (!scheduleId) return;
    setBusy(true);
    setError(null);
    const response = await fetch("/api/pay-later/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId: credit.paymentIntentId, scheduleId }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setError(data.error || "Could not confirm that date.");
      return;
    }
    const when = [data.scheduleDate, data.scheduleTime].filter(Boolean).join(", ");
    setDone(when || "Date confirmed.");
  };

  return (
    <article className="rounded-2xl border border-[#EAEAEA] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8860B]">Prepaid Training</p>
      <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[#111111]">
        You have a credit for {credit.courseName}
      </h2>
      {done ? (
        <p className="mt-3 text-sm leading-6 text-[#374151]">You are registered for {done}. This credit is used.</p>
      ) : (
        <>
          <label className="mt-4 block text-sm font-medium text-[#111111]">
            Upcoming dates
            <select
              value={scheduleId}
              onChange={(event) => setScheduleId(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 text-sm"
            >
              {rows.length === 0 ? <option value="">No upcoming dates yet</option> : null}
              {rows.map((row) => {
                const when = formatDateRange(row.start_date, row.end_date, row.timezone);
                const time = formatTimeRange(row.start_time, row.end_time);
                return (
                  <option key={row.id} value={row.id}>
                    {when}
                    {time ? ` · ${time}` : ""}
                  </option>
                );
              })}
            </select>
          </label>
          {error ? <p className="mt-2 text-sm text-[#9f1239]">{error}</p> : null}
          <button
            type="button"
            onClick={confirm}
            disabled={busy || !scheduleId}
            className="mt-4 rounded-lg bg-[#F5B942] px-4 py-2 text-sm font-bold text-[#111111] disabled:opacity-50"
          >
            {busy ? "Confirming…" : "Confirm date"}
          </button>
        </>
      )}
    </article>
  );
}
