import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function LeadingSafeProTemp2Page() {
  redirect('/test/leading-safe');
}
