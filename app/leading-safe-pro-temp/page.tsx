import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function LeadingSafeProTempPage() {
  redirect('/test/leading-safe');
}
