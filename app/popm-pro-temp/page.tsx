import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Public Pro bank retired — free POPM mock only. */
export default function PopmProTempPage() {
  redirect('/test/product-owner-manager');
}
