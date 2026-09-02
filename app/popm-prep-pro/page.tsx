import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Legacy alias → free POPM mock. */
export default function PopmPrepProPage() {
  redirect('/test/product-owner-manager');
}
