import { redirect } from 'next/navigation';

export const metadata = {
  title: 'LPM Pro Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

/** Short link → full LPM practice test (public, same question bank as Pro in account). */
export default function LpmProPage() {
  redirect('/test/lean-portfolio-management');
}
