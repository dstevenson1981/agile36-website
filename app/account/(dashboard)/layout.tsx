import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import { hasAiProductManagementExamAccess } from '@/app/lib/exams/ai-product-management-access';
import { hasAiProductManagementCourseAccess } from '@/app/lib/course-materials';
import { hasPracticeExamHubAccess } from '@/app/lib/practice-exams';
import AccountNav from '../AccountNav';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const pathWithSearch = hdrs.get('x-agile36-path') || '/account';

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/account/login?next=${encodeURIComponent(pathWithSearch)}`);
  }

  const [showCourseExams, showCourseMaterials, showPracticeExams] = await Promise.all([
    hasAiProductManagementExamAccess(),
    hasAiProductManagementCourseAccess(),
    hasPracticeExamHubAccess(),
  ]);

  const path = (pathWithSearch.split('?')[0] || '').replace(/\/$/, '') || '/';
  if (path.startsWith('/account/practice-exams') && !showPracticeExams) {
    redirect('/account');
  }

  const isFullscreenExam = path === '/account/exams/ai-product-management';

  if (isFullscreenExam) {
    return <div className="min-h-screen bg-[#e8eef5]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#1f2c4a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 flex-shrink-0">
            <AccountNav
              userEmail={user.email ?? undefined}
              showPracticeExams={showPracticeExams}
              showCourseExams={showCourseExams}
              showCourseMaterials={showCourseMaterials}
            />
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
