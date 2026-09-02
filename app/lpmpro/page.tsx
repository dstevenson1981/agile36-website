import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Short alias → free LPM mock. */
export default function LpmProShortcutPage() {
  redirect('/test/lean-portfolio-management');
}
