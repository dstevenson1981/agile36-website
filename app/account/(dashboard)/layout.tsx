import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import { hasAiProductManagementExamAccess } from '@/app/lib/exams/ai-product-management-access';
import { hasAiProductManagementCourseAccess } from '@/app/lib/course-materials';
import AccountNav from '../AccountNav';

export const dynamic = 'force-dynamic';

/** Temporary: Pro practice exams open for class use — direct URL only, not linked from the public site. */
function isPublicAccountPath(pathWithSearch: string): boolean {
  const path = pathWithSearch.split('?')[0] || '';
  return (
    path === '/account/practice-exams/scrum-master' ||
    path === '/account/practice-exams/agile-product-management'
  );
}

function PublicPracticeExamShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f9fd]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <main className="min-w-0 rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm sm:p-8">
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

  let user: { email?: string | null } | null = null;
  let showCourseExams = false;
  let showCourseMaterials = false;

  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    user = authUser;

    if (authUser) {
      [showCourseExams, showCourseMaterials] = await Promise.all([
        hasAiProductManagementExamAccess(),
        hasAiProductManagementCourseAccess(),
      ]);
    }
  } catch {
    if (publicPath) {
      return <PublicPracticeExamShell>{children}</PublicPracticeExamShell>;
    }
  }

  if (!user) {
    if (publicPath) {
      return <PublicPracticeExamShell>{children}</PublicPracticeExamShell>;
    }
    redirect(`/account/login?next=${encodeURIComponent(pathWithSearch)}`);
  }

  const path = pathWithSearch.split('?')[0] || '';
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
