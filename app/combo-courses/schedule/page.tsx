"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { COMBO_COURSES, type Combo } from "../data";

function ComboScheduleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comboId = searchParams.get("combo");
  const [combo, setCombo] = useState<Combo | null>(null);
  const [schedulesByCourse, setSchedulesByCourse] = useState<Record<string, { id: string; start_date: string; start_time: string; displayDate: string; displayTime: string }[]>>({});
  const [selectedSchedules, setSelectedSchedules] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = COMBO_COURSES.find((c) => c.id === comboId);
    setCombo(found || null);
  }, [comboId]);

  useEffect(() => {
    if (!combo) {
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      // Schedules come from Supabase course_schedules. Course slugs must match Supabase.
      // Deleted or cancelled classes (status != active) will not appear here.
      const result: Record<string, { id: string; start_date: string; start_time: string; displayDate: string; displayTime: string }[]> = {};
      for (const course of combo.courses) {
        try {
          const res = await fetch(`/api/course-schedules?course_slug=${course.slug}&status=active`);
          const data = await res.json();
          const schedules = (data.data || []).map((s: any) => ({
            id: s.id,
            start_date: s.start_date,
            start_time: s.start_time,
            displayDate: new Date(s.start_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
            displayTime: s.start_time ? new Date(`1970-01-01T${s.start_time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "TBD",
          }));
          result[course.slug] = schedules;
        } catch {
          result[course.slug] = [];
        }
      }
      setSchedulesByCourse(result);
      setLoading(false);
    };

    fetchAll();
  }, [combo]);

  const handleProceed = () => {
    if (!combo) {
      router.push(`/contact?combo=${comboId}`);
      return;
    }

    const selectedByCourse: Record<string, { scheduleId: string; displayDate: string; courseName: string }> = {};
    for (const course of combo.courses) {
      const scheduleId = selectedSchedules[course.slug];
      if (!scheduleId) {
        return;
      }
      const schedule = (schedulesByCourse[course.slug] || []).find((s) => s.id === scheduleId);
      selectedByCourse[course.slug] = {
        scheduleId,
        displayDate: schedule?.displayDate || "",
        courseName: course.name,
      };
    }

    const scheduleIds = Object.values(selectedByCourse).map((item) => item.scheduleId);
    router.push(
      `/combo-courses/checkout?combo=${comboId}&schedules=${scheduleIds.join(",")}&selections=${encodeURIComponent(JSON.stringify(selectedByCourse))}`
    );
  };

  if (!comboId || !combo) {
    return (
      <main className="min-h-screen bg-black text-[#1f2c4a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748b] mb-4">Combo not found.</p>
          <Link href="/combo-courses" className="text-[#d97706] font-medium hover:underline">
            Back to Combo Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#ffffff] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left - Info */}
          <div className="lg:w-2/5 bg-[#f0f9ff] p-8 lg:p-10">
            <h1 className="text-2xl font-bold text-[#334155] mb-6">
              Customize Your Training Experience
            </h1>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-[#475569]">
                <span className="text-emerald-600">✓</span> Flexible Learning Schedules
              </li>
              <li className="flex items-center gap-2 text-[#d97706] font-medium">
                <span className="text-emerald-600">✓</span> Top-Notch Professional Trainers
              </li>
              <li className="flex items-center gap-2 text-[#475569]">
                <span className="text-emerald-600">✓</span> Personalized Learning Journey
              </li>
            </ul>
            <div className="bg-[#1f2c4a]/[0.06] rounded-lg p-4 border border-[#1f2c4a]/15">
              <div className="text-sm font-semibold text-[#64748b] mb-2">Schedule</div>
              <div className="grid grid-cols-7 gap-1 text-xs text-center text-[#64748b] mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded border ${
                      i % 3 === 0 ? "bg-green-100 border-green-300" : i % 5 === 0 ? "bg-red-100 border-red-300" : "bg-[#1f2c4a]/[0.06] border-[#1f2c4a]/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Schedule selection */}
          <div className="lg:w-3/5 p-8 lg:p-10">
            <h2 className="text-xl font-bold text-[#334155] mb-6 pb-2 border-b-2 border-[#d97706]">
              Choose your schedules
            </h2>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {combo.courses.map((c) => (
                  <div key={c.id} className="bg-gray-100 rounded-lg h-24" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {combo.courses.map((course) => {
                  const schedules = schedulesByCourse[course.slug] || [];
                  const selectedId = selectedSchedules[course.slug];
                  return (
                    <div key={course.id} className="bg-[#1f2c4a]/[0.06] rounded-lg p-4 border border-[#1f2c4a]/15">
                      <h3 className="font-semibold text-[#1f2c4a] mb-3">{course.name}</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#64748b] mb-1">Choose Date*</label>
                          <select
                            className="w-full px-3 py-2 border border-[#1f2c4a]/20 rounded-md text-sm bg-white"
                            value={selectedId || ""}
                            onChange={(e) =>
                              setSelectedSchedules((prev) => ({ ...prev, [course.slug]: e.target.value }))
                            }
                          >
                            <option value="">Select date</option>
                            {schedules.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.displayDate}
                              </option>
                            ))}
                            {schedules.length === 0 && (
                              <option value="">No dates available</option>
                            )}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#64748b] mb-1">Time</label>
                          <div className="w-full px-3 py-2 border border-[#1f2c4a]/15 rounded-md text-sm bg-[#1f2c4a]/[0.06] text-[#475569]">
                            9am – 5pm EST
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              onClick={handleProceed}
              disabled={!combo?.courses.every((course) => Boolean(selectedSchedules[course.slug]))}
              className="w-full mt-8 bg-white hover:bg-[#16243f] text-[#1f2c4a] font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Proceed
            </button>
            <p className="text-xs text-[#64748b] mt-4 text-center">
              By tapping submit, you agree to our{" "}
              <Link href="/privacy-policy" className="text-[#d97706] hover:underline">
                Privacy policy
              </Link>{" "}
              and{" "}
              <Link href="/refund-policy" className="text-[#d97706] hover:underline">
                Terms & Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ComboSchedulePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-[#1f2c4a] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]" />
        </main>
      }
    >
      <ComboScheduleContent />
    </Suspense>
  );
}
