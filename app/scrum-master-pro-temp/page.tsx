import { redirect } from 'next/navigation';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function ScrumMasterProTempPage() {
  redirect('/test/scrum-master');
}
