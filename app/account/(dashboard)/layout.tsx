import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import AccountNav from '../AccountNav';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const hdrs = await headers();
    const pathWithSearch = hdrs.get('x-agile36-path') || '/account';
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect(`/account/login?next=${encodeURIComponent(pathWithSearch)}`);
    }

    return (
      <div className="min-h-screen bg-slate-50">
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
    redirect('/account/login');
  }
}
