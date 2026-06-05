import { redirect } from 'next/navigation';

export const metadata = {
  title: 'SAFe Scrum Master Pro Practice Exam | Agile36',
  description:
    'SAFe Scrum Master (SSM) Pro practice exam — same full exam as Agile36 Pro students.',
  robots: 'noindex, nofollow',
};

/** Legacy temp URL → public SSM Pro practice exam (no key required). */
export default function ScrumMasterProTemp2Page() {
  redirect('/scrum-master-pro-temp');
}
