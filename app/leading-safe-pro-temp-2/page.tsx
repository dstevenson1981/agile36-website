import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Leading SAFe Pro Practice Exam | Agile36',
  description:
    'Leading SAFe (SAFe Agilist) Pro practice exam — same full exam as Agile36 Pro students.',
  robots: 'noindex, nofollow',
};

/** Legacy temp URL → canonical public Leading SAFe Pro practice exam. */
export default function LeadingSafeProTemp2Page() {
  redirect('/test/leading-safe-pro');
}
