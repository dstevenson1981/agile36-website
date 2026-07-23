import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function LeadingSafeProShortcutPage() {
  redirect('/test/leading-safe');
}
