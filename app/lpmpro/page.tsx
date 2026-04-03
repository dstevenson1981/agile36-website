import { redirect } from 'next/navigation';

export const metadata = {
  title: 'LPM Sample Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

/** Short link → public sample (45 Q). Full Pro bank: /account/practice-exams/lpm after login. */
export default function LpmProPage() {
  redirect('/test/lean-portfolio-management');
}
