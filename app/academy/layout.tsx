import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Academy | Agile36',
  description: 'Agile36 AI Academy — agents, tools, case studies, and class materials.',
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#1f2c4a]">
      {children}
    </div>
  );
}
