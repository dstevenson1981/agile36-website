import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pro LPM Practice Exam | Agile36',
  robots: 'noindex, nofollow',
};

/** Short link → gated LPM practice exam (account / Pro access required). */
export default function LpmProPage() {
  redirect('/account/practice-exams/lpm');
}
