import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pro LPM Practice Exam | Agile36',
  description:
    'Short link to the SAFe LPM Pro practice exam (public share link with key).',
  robots: 'noindex, nofollow',
};

/** Short public link → full LPM Pro practice exam (no login). */
export default function LpmProPage() {
  redirect('/lpm-pro-temp');
}
