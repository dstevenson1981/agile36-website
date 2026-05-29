import { redirect } from 'next/navigation';
import { LPM_PRO_TEMP_PUBLIC_PATH } from '@/app/lib/lpm-pro-temp-access';

export const metadata = {
  title: 'Pro LPM Practice Exam | Agile36',
  description:
    'Short link to the SAFe LPM Pro practice exam (public share link with key).',
  robots: 'noindex, nofollow',
};

/** Short public link → full LPM Pro practice exam (no login). */
export default function LpmProPage() {
  redirect(LPM_PRO_TEMP_PUBLIC_PATH);
}
