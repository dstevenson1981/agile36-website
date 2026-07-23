import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function PopmPrepProPage() {
  redirect('/test/product-owner-manager');
}
