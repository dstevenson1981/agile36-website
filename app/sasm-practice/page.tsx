import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

/** Public Pro bank retired — no free SASM mock; send to course. */
export default function SasmPracticePage() {
  redirect('/courses/advanced-scrum-master');
}
