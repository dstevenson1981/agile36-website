import { createClient } from '@/app/lib/supabase/server';
import { hasAiProductManagementExamAccess } from '@/app/lib/exams/ai-product-management-access';
import Link from 'next/link';

function ProfileCard({ completion }: { completion: number }) {
  return (
    <Link
      href="/account/profile"
      className="block rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm hover:border-[#1f2c4a]/20 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(31,44,74,0.12)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#d97706"
              strokeWidth="3"
              strokeDasharray={`${completion}, 100`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#1f2c4a] transition-colors">
            Complete Your Profile
          </h3>
          <p className="text-sm text-[#64748b] mt-1">{completion}% Completed</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#d97706] mt-2 group-hover:gap-2 transition-all">
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
      className="block rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm hover:border-[#1f2c4a]/20 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#d97706]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d97706]/15 transition-colors">
          <svg className="w-7 h-7 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#1f2c4a] transition-colors">
            Download Invoices & Receipts
          </h3>
          <p className="text-sm text-[#64748b] mt-1">View and download your order history</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#d97706] mt-2 group-hover:gap-2 transition-all">
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
      className="block rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm hover:border-[#1f2c4a]/20 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/15 transition-colors">
          <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#1f2c4a] transition-colors">
            Practice Exams
          </h3>
          <p className="text-sm text-[#64748b] mt-1">Prepare for your certification exam</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#d97706] mt-2 group-hover:gap-2 transition-all">
            View practice exams →
          </span>
        </div>
      </div>
    </Link>
  );
}

function CourseExamsCard() {
  return (
    <Link
      href="/account/exams"
      className="block rounded-2xl border border-[#d97706]/35 bg-white p-6 shadow-sm hover:border-[#d97706]/50 hover:shadow-md transition-all group ring-1 ring-[#d97706]/20"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#d97706]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d97706]/15 transition-colors">
          <svg className="w-7 h-7 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#1f2c4a] transition-colors">
            Course Exams
          </h3>
          <p className="text-sm text-[#64748b] mt-1">
            AI Product Management exam — closed book, timed, scored
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#d97706] mt-2 group-hover:gap-2 transition-all">
            Open your exam →
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
  const showCourseExams = await hasAiProductManagementExamAccess();

  return (
    <div>
      <h1 className="text-2xl font-normal text-[#1f2c4a] mb-2" style={{ letterSpacing: '-0.03em' }}>Welcome back</h1>
      <p className="text-[#64748b] mb-8">Manage your account and access your learning resources.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileCard completion={completion} />
        <OrdersCard />
        <PracticeExamsCard />
        {showCourseExams && <CourseExamsCard />}
      </div>
    </div>
  );
}
