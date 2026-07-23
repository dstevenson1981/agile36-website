import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function PopmPracticeTempPage() {
  redirect('/test/product-owner-manager');
}
