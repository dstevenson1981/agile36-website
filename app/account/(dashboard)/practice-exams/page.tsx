import Link from 'next/link';

export default function PracticeExamsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Practice Exams</h1>
      <p className="text-slate-600 mb-8">
        Prepare for your certification with practice tests. Available when you purchase the Pro plan.
      </p>

      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm max-w-xl">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Practice exams coming soon</h2>
            <p className="text-slate-600 mt-2">
              Practice exams are included with the Pro plan. If you&apos;ve purchased a course with practice exam access, 
              you&apos;ll see them here once they&apos;re available.
            </p>
            <Link
              href="/"
              className="inline-flex items-center mt-4 text-[#fa4a23] font-medium hover:underline"
            >
              Browse courses with Pro plan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
