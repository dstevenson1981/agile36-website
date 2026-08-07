import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import AccountNav from '../AccountNav';

export const dynamic = 'force-dynamic';

/** Paths under /account that anyone can open without logging in. */
function isPublicAccountPath(pathWithSearch: string): boolean {
  const path = pathWithSearch.split('?')[0] || '';
  return (
    path === '/account/practice-exams/advanced-scrum-master' ||
    path === '/account/practice-exams/safe-for-teams'
  );
}

function PublicPracticeExamShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f9fd]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="min-w-0 rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 sm:p-8 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const pathWithSearch = hdrs.get('x-agile36-path') || '/account';
  const publicPath = isPublicAccountPath(pathWithSearch);

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      if (publicPath) {
        return <PublicPracticeExamShell>{children}</PublicPracticeExamShell>;
      }
      redirect(`/account/login?next=${encodeURIComponent(pathWithSearch)}`);
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-56 flex-shrink-0">
              <AccountNav userEmail={user.email} />
            </aside>
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  } catch {
    if (publicPath) {
      return <PublicPracticeExamShell>{children}</PublicPracticeExamShell>;
    }
    redirect('/account/login');
  }
}
