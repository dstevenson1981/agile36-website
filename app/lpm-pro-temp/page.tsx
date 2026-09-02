import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Public Pro bank retired — free LPM mock only. */
export default function LpmProTempPage() {
  redirect('/test/lean-portfolio-management');
}
