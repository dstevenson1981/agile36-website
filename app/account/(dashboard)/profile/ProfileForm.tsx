'use client';

import { useState } from 'react';
import { createClient } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';

type ProfileFormProps = {
  userId: string;
  initialData: { name: string; email: string; phone: string; company: string };
};

export default function ProfileForm({ userId, initialData }: ProfileFormProps) {
  const [name, setName] = useState(initialData.name);
  const [phone, setPhone] = useState(initialData.phone);
  const [company, setCompany] = useState(initialData.company);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const completion = [name, phone, company].filter(Boolean).length;
    const profileCompletion = completion >= 3 ? 100 : completion >= 2 ? 75 : completion >= 1 ? 50 : 25;

    const { error } = await supabase
      .from('profiles')
      .upsert(
        {
          user_id: userId,
          name: name || null,
          phone: phone || null,
          company: company || null,
          profile_completion_percent: profileCompletion,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setSaving(false);
      return;
    }

    setMessage({ type: 'success', text: 'Profile updated!' });
    setSaving(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={initialData.email}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500"
          />
          <p className="text-xs text-slate-500 mt-1">Email cannot be changed.</p>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company</label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none"
          />
        </div>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-6 px-6 py-3 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] disabled:opacity-50 transition"
      >
        {saving ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  );
}
