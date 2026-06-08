"use client";

import { useCallback, useEffect, useState } from "react";

type PaidBy = {
  name: string | null;
  email: string | null;
  phone: string | null;
};

type Attendee = {
  name: string | null;
  email: string | null;
  rawLine: string;
};

type Registration = {
  id: string;
  created_at: string;
  payment_intent_id: string;
  stripe_customer_id: string | null;
  course_name: string;
  course_slug: string;
  plan: string;
  quantity: number;
  amount: number;
  payment_status: string;
  enrollment_type: string;
  enrolling_for_someone_else: boolean;
  paid_by: PaidBy;
  attendees: Attendee[];
  attendees_summary: string;
  class_dates: string | null;
  instructor_name: string | null;
  promo_code: string | null;
};

export default function AdminRegistrationsPage() {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRegistrations = useCallback(async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (search) params.set("q", search);
      const response = await fetch(`/api/admin/registrations?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load registrations");
      setRegistrations(data.registrations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load registrations");
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRegistrations(query);
  }, [loadRegistrations, query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Registrations</h1>
          <p className="mt-2 text-slate-600">
            See who paid and who is attending. Search by Stripe customer ID, email, name, or payment intent.
          </p>
        </div>

        <form
          className="mb-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setQuery(searchInput.trim());
          }}
        >
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search cus_..., email, name, pi_..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#fa4a23] focus:outline-none focus:ring-2 focus:ring-[#fa4a23]/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#01203d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023a5e]"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              setQuery("");
            }}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Clear
          </button>
        </form>

        {loading && <p className="text-slate-600">Loading registrations...</p>}
        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {!loading && !error && registrations.length === 0 && (
          <p className="rounded-lg border border-slate-200 bg-white px-4 py-8 text-center text-slate-600">
            No registrations found.
          </p>
        )}

        <div className="space-y-4">
          {registrations.map((registration) => (
            <article
              key={registration.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{registration.course_name}</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {registration.class_dates || "Class date TBA"}
                      {registration.instructor_name ? ` • ${registration.instructor_name}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        registration.enrolling_for_someone_else
                          ? "bg-amber-100 text-amber-900"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {registration.enrollment_type}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                      {registration.plan}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      ${Number(registration.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-2">
                <section className="border-b border-slate-100 px-5 py-4 md:border-b-0 md:border-r">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Paid by</h3>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {registration.paid_by.name || "Name not provided"}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{registration.paid_by.email}</p>
                  {registration.paid_by.phone && (
                    <p className="mt-1 text-sm text-slate-600">{registration.paid_by.phone}</p>
                  )}
                  {registration.stripe_customer_id && (
                    <p className="mt-3 font-mono text-xs text-slate-500">{registration.stripe_customer_id}</p>
                  )}
                </section>

                <section className="px-5 py-4">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Attendee</h3>
                  {registration.enrolling_for_someone_else ? (
                    registration.attendees.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {registration.attendees.map((attendee, index) => (
                          <li key={`${registration.id}-attendee-${index}`} className="text-sm text-slate-800">
                            <span className="font-semibold">{attendee.name || "Name not provided"}</span>
                            {attendee.email ? (
                              <span className="text-slate-600"> • {attendee.email}</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-amber-700">
                        Marked as &quot;someone else&quot; but no attendee details were saved.
                      </p>
                    )
                  ) : (
                    <p className="mt-2 text-sm text-slate-700">
                      Same as paid by:{" "}
                      <span className="font-semibold">{registration.paid_by.name || registration.paid_by.email}</span>
                    </p>
                  )}
                </section>
              </div>

              <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                <span>
                  Registered {new Date(registration.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                </span>
                <span className="mx-2">•</span>
                <span className="font-mono">{registration.payment_intent_id}</span>
                {registration.promo_code && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Promo: {registration.promo_code}</span>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
