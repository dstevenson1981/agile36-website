'use client';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/** Optional corporate billing code at course checkout (bills the company card on file). */
export default function CorporateBillingCodeField({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="corporateBillingCode" className="mb-2 block text-sm font-medium text-[#475569]">
        Corporate billing code <span className="font-normal text-[#94a3b8]">(optional)</span>
      </label>
      <input
        id="corporateBillingCode"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder="AGILE-XXXXXX"
        className="w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/5 px-4 py-3 font-mono text-[#1f2c4a] uppercase placeholder:normal-case placeholder:font-sans focus:border-[#1f2c4a]/40 focus:outline-none"
        autoComplete="off"
      />
      <p className="mt-1 text-xs text-[#94a3b8]">
        If your company set up corporate billing, enter the code here to charge your organization&apos;s card.
      </p>
    </div>
  );
}
