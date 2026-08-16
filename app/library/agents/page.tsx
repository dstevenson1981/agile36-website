import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/app/lib/supabase/server';
import AgencyAgentsBrowser from '@/app/academy/ai-agents/agents/AgencyAgentsBrowser';
import { AGENCY_AGENTS_BUSINESS_CATALOG } from '@/app/lib/academy/agency-agents';

export const metadata: Metadata = {
  title: 'Agent Library (Business) | Agile36',
  description: 'Internal agency-agents inventory for Agile36 client delivery and offers.',
  robots: 'noindex, nofollow',
};

const OWNER_EMAILS = new Set([
  'd.stevenson@agile36.com',
  'd.stevenso1@agile36.com',
]);

export default async function BusinessAgentLibraryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.trim().toLowerCase() || '';
  if (!email || !OWNER_EMAILS.has(email)) {
    redirect(`/account/login?next=${encodeURIComponent('/library/agents')}`);
  }

  const total = AGENCY_AGENTS_BUSINESS_CATALOG.agents.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
        Business · internal
      </p>
      <h1 className="text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
        Agent library
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
        Your full inventory ({total.toLocaleString()} agents) for client work and delivery packs —
        not the student class set. Seeded from{' '}
        <a
          href={AGENCY_AGENTS_BUSINESS_CATALOG.sourceRepo}
          className="font-medium text-[#1f2c4a] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          msitarzewski/agency-agents
        </a>
        . Grow this into the moat: keep what works with clients, drop what doesn&apos;t.
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link href="/academy/ai-agents/agents" className="font-medium text-[#1f2c4a] hover:underline">
          ← Class marketplace (students)
        </Link>
        <Link href="/library/automations" className="font-medium text-[#64748b] hover:text-[#1f2c4a] hover:underline">
          Automation library
        </Link>
        <a
          href={AGENCY_AGENTS_BUSINESS_CATALOG.sourceGallery}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#64748b] hover:text-[#1f2c4a] hover:underline"
        >
          External app
        </a>
      </div>

      <div className="mt-8">
        <AgencyAgentsBrowser catalog={AGENCY_AGENTS_BUSINESS_CATALOG} mode="business" />
      </div>
    </main>
  );
}
