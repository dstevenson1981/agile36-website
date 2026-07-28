import { redirect } from 'next/navigation';
import { POPM_PRO_PUBLIC_PATH } from '@/app/lib/popm-pro-temp-access';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Legacy alias → unlisted POPM Pro practice exam. */
export default function PopmPrepProPage() {
  redirect(POPM_PRO_PUBLIC_PATH);
}
