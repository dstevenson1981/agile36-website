import { redirect } from 'next/navigation';
import { POPM_PRO_PUBLIC_PATH } from '@/app/lib/popm-pro-temp-access';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Short alias → unlisted POPM Pro practice exam. */
export default function PopmProShortcutPage() {
  redirect(POPM_PRO_PUBLIC_PATH);
}
