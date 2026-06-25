import Link from 'next/link';

export default function CorporateOnboardCancelPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f3] py-16 px-4">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#1f2c4a]/10 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-[#1f2c4a]">Card setup cancelled</h1>
        <p className="mt-3 text-[#64748b]">
          No card was saved. You can restart corporate billing setup whenever you&apos;re ready.
        </p>
        <Link
          href="/corporate/onboard"
          className="mt-8 inline-block rounded-lg bg-[#1f2c4a] px-8 py-3 font-medium text-white hover:bg-[#16243f]"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}
