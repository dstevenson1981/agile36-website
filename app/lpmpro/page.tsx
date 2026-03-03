import { redirect } from 'next/navigation';

export const metadata = {
  title: 'LPM Pro Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

export default function LpmProPage() {
  redirect('/account/practice-exams/lpm');
}
