import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Leading SAFe Pro Practice Exam | Agile36',
  description:
    'Leading SAFe (SAFe Agilist) Pro practice exam — full question set for Pro students.',
  robots: 'noindex, nofollow',
};

/** Legacy temp URL → canonical public Leading SAFe Pro practice exam. */
export default function LeadingSafeProTempPage() {
  redirect('/test/leading-safe-pro');
}
