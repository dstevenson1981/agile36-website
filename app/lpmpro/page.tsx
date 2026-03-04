import { redirect } from 'next/navigation';

export const metadata = {
  title: 'LPM Pro Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

/** /lpmpro URL disabled - redirect to protected practice exam (requires login + Pro/whitelist) */
export default function LpmProPage() {
  redirect('/account/practice-exams/lpm');
}
