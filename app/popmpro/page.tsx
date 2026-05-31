import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pro POPM Practice Exam | Agile36',
  description:
    'Short link to the SAFe Product Owner/Product Manager Pro practice exam (public, no login).',
  robots: 'noindex, nofollow',
};

/** Short public link → full POPM Pro practice exam (no login). */
export default function PopmProPage() {
  redirect('/popm-prep-pro');
}
