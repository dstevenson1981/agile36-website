import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Public Pro bank retired — free Leading SAFe mock only. */
export default function LeadingSafeProPublicPracticeTestPage() {
  redirect('/test/leading-safe');
}
