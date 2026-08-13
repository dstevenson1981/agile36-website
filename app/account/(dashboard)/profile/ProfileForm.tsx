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
          email: initialData.email,
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
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 max-w-xl shadow-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#475569] mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#1f2c4a]/15 text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#475569] mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={initialData.email}
            disabled
            className="w-full px-4 py-3 rounded-lg bg-[#f1f5f9] border border-[#1f2c4a]/10 text-[#64748b]"
          />
          <p className="text-xs text-[#94a3b8] mt-1">Email cannot be changed.</p>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#475569] mb-1">Phone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#1f2c4a]/15 text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[#475569] mb-1">Company</label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#1f2c4a]/15 text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40 outline-none transition-colors"
          />
        </div>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-6 px-6 py-3 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] disabled:opacity-50 transition"
      >
        {saving ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  );
}
