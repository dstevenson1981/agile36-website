import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pro Leading SAFe Practice Exam | Agile36',
  description:
    'Short link to the SAFe Agilist (Leading SAFe) Pro practice exam (public, no login).',
  robots: 'noindex, nofollow',
};

/** Short public link → full Leading SAFe Pro practice exam (no login). */
export default function LeadingSafeProPage() {
  redirect('/leading-safe-pro-temp');
}
