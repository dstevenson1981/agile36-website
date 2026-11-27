import { createClient } from '@/app/lib/supabase/server';
import { hasAiProductManagementExamAccess } from '@/app/lib/exams/ai-product-management-access';
import { hasAiProductManagementCourseAccess } from '@/app/lib/course-materials';
import { hasPracticeExamHubAccess } from '@/app/lib/practice-exams';
import Link from 'next/link';
import PrepaidCredits from './PrepaidCredits';
import { DATE_LATER_SCHEDULE_ID } from '@/app/lib/pay-later';

function ProfileCard({ completion }: { completion: number }) {
  return (
    <Link
      href="/account/profile"
      className="block rounded-2xl border border-[#111111]/10 bg-white p-6 shadow-sm hover:border-[#111111]/20 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(17, 17, 17,0.12)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#B8860B"
              strokeWidth="3"
              strokeDasharray={`${completion}, 100`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#111111] transition-colors">
            Complete Your Profile
          </h3>
          <p className="text-sm text-[#64748b] mt-1">{completion}% Completed</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#B8860B] mt-2 group-hover:gap-2 transition-all">
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
      className="block rounded-2xl border border-[#111111]/10 bg-white p-6 shadow-sm hover:border-[#111111]/20 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#B8860B]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#B8860B]/15 transition-colors">
          <svg className="w-7 h-7 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#111111] transition-colors">
            Download Invoices & Receipts
          </h3>
          <p className="text-sm text-[#64748b] mt-1">View and download your order history</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#B8860B] mt-2 group-hover:gap-2 transition-all">
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
      className="block rounded-2xl border border-[#111111]/10 bg-white p-6 shadow-sm hover:border-[#111111]/20 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/15 transition-colors">
          <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#111111] transition-colors">
            Pro Practice Exams
          </h3>
          <p className="text-sm text-[#64748b] mt-1">Enrolled Pro banks for your courses</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#B8860B] mt-2 group-hover:gap-2 transition-all">
            View Pro practice exams →
          </span>
        </div>
      </div>
    </Link>
  );
}

function CourseMaterialsCard() {
  return (
    <Link
      href="/account/materials"
      className="block rounded-2xl border border-[#111111]/10 bg-white p-6 shadow-sm hover:border-[#111111]/20 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#111111]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#111111]/15 transition-colors">
          <svg className="w-7 h-7 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#111111] transition-colors">
            Course Materials
          </h3>
          <p className="text-sm text-[#64748b] mt-1">
            AI Product Management coursebook PDF
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#B8860B] mt-2 group-hover:gap-2 transition-all">
            Open materials →
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
      className="block rounded-2xl border border-[#B8860B]/35 bg-white p-6 shadow-sm hover:border-[#B8860B]/50 hover:shadow-md transition-all group ring-1 ring-[#B8860B]/20"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#B8860B]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#B8860B]/15 transition-colors">
          <svg className="w-7 h-7 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#111111] transition-colors">
            Course Exams
          </h3>
          <p className="text-sm text-[#64748b] mt-1">
            AI Product Management exam — assigned, not open yet
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#64748b] mt-2">
            Locked
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
  const email = user?.email?.trim();
  const { data: creditRows } = email
    ? await supabase
        .from('orders')
        .select('payment_intent_id, course_name, course_slug')
        .eq('schedule_id', DATE_LATER_SCHEDULE_ID)
        .eq('payment_status', 'succeeded')
        .ilike('customer_email', email)
    : { data: [] };
  const credits = (creditRows ?? [])
    .filter((row) => row.payment_intent_id && row.course_slug)
    .map((row) => ({
      paymentIntentId: String(row.payment_intent_id),
      courseName: String(row.course_name || row.course_slug),
      courseSlug: String(row.course_slug),
    }));
  const [showCourseExams, showCourseMaterials, showPracticeExams] = await Promise.all([
    hasAiProductManagementExamAccess(),
    hasAiProductManagementCourseAccess(),
    hasPracticeExamHubAccess(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-normal text-[#111111] mb-2" style={{ letterSpacing: '-0.03em' }}>Welcome back</h1>
      <p className="text-[#64748b] mb-8">Manage your account and access your learning resources.</p>

      <PrepaidCredits credits={credits} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileCard completion={completion} />
        <OrdersCard />
        {showPracticeExams && <PracticeExamsCard />}
        {showCourseMaterials && <CourseMaterialsCard />}
        {showCourseExams && <CourseExamsCard />}
      </div>
    </div>
  );
}
