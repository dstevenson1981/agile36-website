import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function LpmProShortcutPage() {
  redirect('/test/lean-portfolio-management');
}
