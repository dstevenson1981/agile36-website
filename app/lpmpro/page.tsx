import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pro LPM Practice Exam | Agile36',
  robots: 'noindex, nofollow',
};

/** Short link → Pro LPM 51-question exam (/test/lean-portfolio-management). */
export default function LpmProPage() {
  redirect('/test/lean-portfolio-management');
}
