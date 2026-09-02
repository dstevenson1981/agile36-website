import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Short alias → free POPM mock. */
export default function PopmProShortcutPage() {
  redirect('/test/product-owner-manager');
}
