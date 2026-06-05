import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pro SSM Practice Exam | Agile36',
  description:
    'Short link to the SAFe Scrum Master (SSM) Pro practice exam (public, no login).',
  robots: 'noindex, nofollow',
};

/** Short public link → full SSM Pro practice exam (no login required). */
export default function SsmProPage() {
  redirect('/scrum-master-pro-temp');
}
