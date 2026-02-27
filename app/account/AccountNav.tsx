'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client';

const navItems = [
  { href: '/account', label: 'Dashboard', icon: '🏠' },
  { href: '/account/profile', label: 'My Profile', icon: '👤' },
  { href: '/account/orders', label: 'Orders & Receipts', icon: '📄' },
  { href: '/account/practice-exams', label: 'Practice Exams', icon: '📝' },
];

export default function AccountNav({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/account/login');
    router.refresh();
  };

  return (
    <nav className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-8">
      {userEmail && (
        <p className="text-sm text-slate-500 mb-4 truncate" title={userEmail}>
          {userEmail}
        </p>
      )}
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/account' && pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#fa4a23] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 pt-4 border-t border-slate-200 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to Courses
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-red-600 w-full text-left"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
