import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate billing setup | Agile36',
  description: 'Save a corporate card on file and get a billing code for your team enrollments.',
  robots: 'noindex, nofollow',
};

export default function CorporateOnboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
