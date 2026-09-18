import { notFound } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Retired. Live POPM class link is in pro_practice_exam_links (currently /popm-pro-sep19). */
export default function RetiredPopmProClassPage() {
  notFound();
}
