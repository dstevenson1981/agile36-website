import { redirect } from 'next/navigation';
import { LPM_PRO_PUBLIC_PATH } from '@/app/lib/lpm-pro-temp-access';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Short alias → unlisted LPM Pro practice exam. */
export default function LpmProShortcutPage() {
  redirect(LPM_PRO_PUBLIC_PATH);
}
