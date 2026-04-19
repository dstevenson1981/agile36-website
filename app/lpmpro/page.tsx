import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pro LPM Practice Exam | Agile36',
  description:
    'Short link to the gated SAFe LPM practice exam (Agile36 Pro / account access).',
  robots: 'noindex, nofollow',
};

/** Short link → gated LPM practice exam (account / Pro access required). */
export default function LpmProPage() {
  redirect('/account/practice-exams/lpm');
}
