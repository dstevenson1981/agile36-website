import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/app/lib/supabase/server';
import N8nWorkflowsBrowser from '@/app/academy/ai-agents/n8n-workflows/N8nWorkflowsBrowser';
import { N8N_BUSINESS_CATALOG } from '@/app/lib/academy/n8n-workflows';

export const metadata: Metadata = {
  title: 'Automation Library (Business) | Agile36',
  description: 'Internal n8n automation inventory for Agile36 delivery and offers.',
  robots: 'noindex, nofollow',
};

const OWNER_EMAILS = new Set([
  'd.stevenson@agile36.com',
  'd.stevenso1@agile36.com',
]);

export default async function BusinessAutomationLibraryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.trim().toLowerCase() || '';
  if (!email || !OWNER_EMAILS.has(email)) {
    redirect(`/account/login?next=${encodeURIComponent('/library/automations')}`);
  }

  const total = N8N_BUSINESS_CATALOG.workflows.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
        Business · internal
      </p>
      <h1 className="text-3xl font-normal text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
        Automation library
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b]">
        Your full inventory ({total.toLocaleString()} workflows) for building client offers and
        delivery — not the student class set. Source:{' '}
        <a
          href={N8N_BUSINESS_CATALOG.sourceRepo}
          className="font-medium text-[#1f2c4a] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zie619/n8n-workflows
        </a>
        .
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link href="/academy/ai-agents/n8n-workflows" className="font-medium text-[#1f2c4a] hover:underline">
          ← Class templates (students)
        </Link>
        <a
          href={N8N_BUSINESS_CATALOG.sourceGallery}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#64748b] hover:text-[#1f2c4a] hover:underline"
        >
          External gallery
        </a>
      </div>

      <div className="mt-8">
        <N8nWorkflowsBrowser catalog={N8N_BUSINESS_CATALOG} />
      </div>
    </main>
  );
}
