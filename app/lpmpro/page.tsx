import { redirect } from 'next/navigation';

export const metadata = {
  title: 'LPM Full Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

/** Short link → same full 51-Q exam as /test/lean-portfolio-management (and Pro in account). */
export default function LpmProPage() {
  redirect('/test/lean-portfolio-management');
}
