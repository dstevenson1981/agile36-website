'use client';

import { useCallback, useEffect, useState } from 'react';

type CorporateAccount = {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_title: string | null;
  corp_code: string;
  status: string;
  authorized_email_domains: string[] | null;
  terms_accepted_at: string | null;
  welcome_email_sent_at: string | null;
  created_at: string;
};

export default function AdminCorporatePage() {
  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [accounts, setAccounts] = useState<CorporateAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadAccounts = useCallback(async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (search) params.set('q', search);
      const response = await fetch(`/api/admin/corporate?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to load accounts');
      setAccounts(data.accounts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load accounts');
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAccounts(query);
  }, [loadAccounts, query]);

  const setStatus = async (id: string, status: 'active' | 'inactive') => {
    setUpdatingId(id);
    try {
      const response = await fetch('/api/admin/corporate', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Update failed');
      await loadAccounts(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Corporate billing accounts</h1>
          <p className="mt-2 text-slate-600">
            View billing codes, authorized email domains, and activate or deactivate accounts.
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
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search company, email, or code…"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2"
          />
          <button type="submit" className="rounded-lg bg-slate-900 px-5 py-2 text-white">
            Search
          </button>
        </form>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : accounts.length === 0 ? (
          <p className="text-slate-600">No corporate accounts found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Code</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Domains</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accounts.map((account) => (
                  <tr key={account.id} className="text-slate-800">
                    <td className="px-4 py-3 font-medium">{account.company_name}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => copyCode(account.corp_code)}
                        className="font-mono text-[#e8431f] hover:underline"
                        title="Click to copy"
                      >
                        {account.corp_code}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div>{account.contact_name}</div>
                      <div className="text-slate-500">{account.contact_email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {(account.authorized_email_domains ?? []).map((d) => `@${d}`).join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          account.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : account.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {account.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(account.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {account.status === 'active' ? (
                        <button
                          type="button"
                          disabled={updatingId === account.id}
                          onClick={() => setStatus(account.id, 'inactive')}
                          className="text-sm text-red-600 hover:underline disabled:opacity-50"
                        >
                          Deactivate
                        </button>
                      ) : account.status === 'inactive' ? (
                        <button
                          type="button"
                          disabled={updatingId === account.id}
                          onClick={() => setStatus(account.id, 'active')}
                          className="text-sm text-emerald-700 hover:underline disabled:opacity-50"
                        >
                          Activate
                        </button>
                      ) : (
                        <span className="text-slate-400">Pending setup</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
