"use client";

import { useCallback, useEffect, useState } from "react";

type Prospect = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  job_title: string | null;
  linkedin_url: string | null;
  blocked: boolean;
};

type Message = {
  id: string;
  subject: string;
  body_text: string;
  edited_subject: string | null;
  edited_body_text: string | null;
  status: string;
  prospect: Prospect | Prospect[] | null;
};

type Opportunity = {
  id: string;
  recommended_offer: string;
  recommendation_reason: string;
  opportunity_score: number;
  supporting_evidence: string[] | null;
  outreach_strategy: string | null;
  estimated_seats: number | null;
  status: string;
  created_at: string;
  company: {
    id: string;
    name: string;
    domain: string | null;
    industry: string | null;
    employee_count: number | null;
    blocked: boolean;
  } | null;
  source_customer: {
    id: string;
    email: string;
    name: string | null;
    course_name: string;
    job_title: string | null;
    seniority: string | null;
    amount: number;
  } | null;
  messages: Message[];
};

function asOne<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] || null : value;
}

export default function LandExpandAdminPage() {
  const [status, setStatus] = useState("pending_approval");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, { subject: string; body: string }>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/land-expand/opportunities?status=${encodeURIComponent(status)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setOpportunities(data.opportunities || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(payload: Record<string, unknown>) {
    const opportunityId = String(payload.opportunityId);
    setBusyId(opportunityId);
    setError(null);
    try {
      const res = await fetch("/api/admin/land-expand/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Land & Expand</h1>
            <p className="mt-2 text-slate-600">
              New paid corporate-email registrations are processed automatically. Review drafts here —
              nothing sends without your approval.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="pending_approval">Pending approval</option>
              <option value="snoozed">Snoozed</option>
              <option value="executed">Executed</option>
              <option value="rejected">Rejected</option>
              <option value="blocked">Blocked</option>
              <option value="all">All</option>
            </select>
            <button
              type="button"
              onClick={() => load()}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : opportunities.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            No opportunities in this queue.
          </div>
        ) : (
          <div className="space-y-6">
            {opportunities.map((opp) => {
              const company = asOne(opp.company);
              const source = asOne(opp.source_customer);
              const busy = busyId === opp.id;

              return (
                <article key={opp.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {company?.name || "Unknown company"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {company?.domain || "—"}
                        {company?.employee_count ? ` · ~${company.employee_count} employees` : ""}
                        {company?.industry ? ` · ${company.industry}` : ""}
                      </p>
                      <p className="mt-2 text-sm text-slate-800">
                        <span className="font-medium">Offer:</span> {opp.recommended_offer}
                      </p>
                      <p className="text-sm text-slate-600">{opp.recommendation_reason}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        Score {Number(opp.opportunity_score).toFixed(2)}
                        {opp.estimated_seats ? ` · ~${opp.estimated_seats} seats` : ""}
                        {source
                          ? ` · sourced from order (${source.course_name}) — do not mention registrant in outreach`
                          : ""}
                      </p>
                      {Array.isArray(opp.supporting_evidence) && opp.supporting_evidence.length > 0 && (
                        <ul className="mt-2 list-disc pl-5 text-xs text-slate-500">
                          {opp.supporting_evidence.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => act({ action: "approve", opportunityId: opp.id })}
                        className="rounded-lg bg-[#fa4a23] px-3 py-2 text-sm font-semibold text-white hover:bg-[#e03d1a] disabled:opacity-50"
                      >
                        Approve & queue
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => act({ action: "snooze", opportunityId: opp.id, snoozeDays: 14 })}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        Snooze 14d
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => act({ action: "reject", opportunityId: opp.id })}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          act({
                            action: "block_company",
                            opportunityId: opp.id,
                            companyId: company?.id,
                          })
                        }
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                      >
                        Block company
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    {(opp.messages || []).map((message) => {
                      const prospect = asOne(message.prospect);
                      const draft = editing[message.id] || {
                        subject: message.edited_subject || message.subject,
                        body: message.edited_body_text || message.body_text,
                      };

                      return (
                        <div key={message.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="font-medium text-slate-900">
                                {prospect?.full_name || prospect?.email || "Prospect"}
                              </p>
                              <p className="text-xs text-slate-600">
                                {prospect?.job_title || "—"}
                                {prospect?.email ? ` · ${prospect.email}` : " · no email"}
                                {prospect?.linkedin_url ? (
                                  <>
                                    {" · "}
                                    <a
                                      href={prospect.linkedin_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[#01203d] underline"
                                    >
                                      LinkedIn
                                    </a>
                                  </>
                                ) : null}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {prospect?.id && (
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() =>
                                    act({
                                      action: "block_prospect",
                                      opportunityId: opp.id,
                                      prospectId: prospect.id,
                                    })
                                  }
                                  className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-white"
                                >
                                  Block prospect
                                </button>
                              )}
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() =>
                                  act({
                                    action: "edit_message",
                                    opportunityId: opp.id,
                                    messageId: message.id,
                                    subject: draft.subject,
                                    bodyText: draft.body,
                                  })
                                }
                                className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-white"
                              >
                                Save edit
                              </button>
                            </div>
                          </div>
                          <input
                            value={draft.subject}
                            onChange={(e) =>
                              setEditing((prev) => ({
                                ...prev,
                                [message.id]: { ...draft, subject: e.target.value },
                              }))
                            }
                            className="mb-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
                          />
                          <textarea
                            value={draft.body}
                            onChange={(e) =>
                              setEditing((prev) => ({
                                ...prev,
                                [message.id]: { ...draft, body: e.target.value },
                              }))
                            }
                            rows={6}
                            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm leading-relaxed"
                          />
                          <p className="mt-1 text-xs text-slate-500">Status: {message.status}</p>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
