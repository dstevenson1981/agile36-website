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
    <nav className="liquid-glass rounded-2xl p-4 sticky top-8">
      {userEmail && (
        <p className="text-sm text-gray-400 mb-4 truncate" title={userEmail}>
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
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 pt-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Courses
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-red-300 w-full text-left transition-colors"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
