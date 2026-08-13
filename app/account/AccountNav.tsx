'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client';

const baseNavItems = [
  { href: '/account', label: 'Dashboard', icon: '🏠' },
  { href: '/account/profile', label: 'My Profile', icon: '👤' },
  { href: '/account/orders', label: 'Orders & Receipts', icon: '📄' },
  { href: '/account/practice-exams', label: 'Practice Exams', icon: '📝' },
];

export default function AccountNav({
  userEmail,
  showCourseExams = false,
}: {
  userEmail?: string;
  /** AI PM (and future) rostered course exams — only show when the user is on a roster. */
  showCourseExams?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = showCourseExams
    ? [
        ...baseNavItems,
        { href: '/account/exams', label: 'Course Exams', icon: '🎓' },
      ]
    : baseNavItems;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/account/login');
    router.refresh();
  };

  return (
    <nav className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-4 shadow-sm sticky top-8">
      {userEmail && (
        <p className="text-sm text-[#64748b] mb-4 truncate" title={userEmail}>
          {userEmail}
        </p>
      )}
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/account' && pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1f2c4a] text-white'
                    : 'text-[#475569] hover:bg-[#1f2c4a]/5 hover:text-[#1f2c4a]'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 pt-4 border-t border-[#1f2c4a]/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm text-[#64748b] hover:text-[#1f2c4a] transition-colors"
        >
          ← Back to Courses
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm text-[#64748b] hover:text-red-600 w-full text-left transition-colors"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
