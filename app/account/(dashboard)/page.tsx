import { createClient } from '@/app/lib/supabase/server';
import Link from 'next/link';

function ProfileCard({ completion }: { completion: number }) {
  return (
    <Link
      href="/account/profile"
      className="block liquid-glass rounded-2xl p-6 hover:bg-white/[0.1] transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeDasharray={`${completion}, 100`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white transition-colors">
            Complete Your Profile
          </h3>
          <p className="text-sm text-gray-400 mt-1">{completion}% Completed</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#fbbf24] mt-2 group-hover:gap-2 transition-all">
            Update profile →
          </span>
        </div>
      </div>
    </Link>
  );
}

function OrdersCard() {
  return (
    <Link
      href="/account/orders"
      className="block liquid-glass rounded-2xl p-6 hover:bg-white/[0.1] transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#fbbf24]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#fbbf24]/25 transition-colors">
          <svg className="w-7 h-7 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white transition-colors">
            Download Invoices & Receipts
          </h3>
          <p className="text-sm text-gray-400 mt-1">View and download your order history</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#fbbf24] mt-2 group-hover:gap-2 transition-all">
            View orders →
          </span>
        </div>
      </div>
    </Link>
  );
}

function PracticeExamsCard() {
  return (
    <Link
      href="/account/practice-exams"
      className="block liquid-glass rounded-2xl p-6 hover:bg-white/[0.1] transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-green-400/15 flex items-center justify-center flex-shrink-0 group-hover:bg-green-400/25 transition-colors">
          <svg className="w-7 h-7 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white transition-colors">
            Practice Exams
          </h3>
          <p className="text-sm text-gray-400 mt-1">Prepare for your certification exam</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#fbbf24] mt-2 group-hover:gap-2 transition-all">
            View practice exams →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function AccountDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('profile_completion_percent')
    .eq('user_id', user?.id)
    .single();

  const completion = profile?.profile_completion_percent ?? 25;

  return (
    <div>
      <h1 className="text-2xl font-normal text-white mb-2" style={{ letterSpacing: '-0.03em' }}>Welcome back</h1>
      <p className="text-gray-300 mb-8">Manage your account and access your learning resources.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileCard completion={completion} />
        <OrdersCard />
        <PracticeExamsCard />
      </div>
    </div>
  );
}
