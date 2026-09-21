"use client";

import Image from "next/image";

type Variant = "mark" | "footer" | "hero";

type Props = {
  variant?: Variant;
};

export default function ClaudePartnerBadge({ variant = "footer" }: Props) {
  if (variant === "hero") {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-[#1f2c4a]/10 bg-white px-4 py-3 shadow-[0_16px_40px_-32px_rgba(31,44,74,.55)]">
        <Image
          src="/claude-partner-badge.png"
          alt="Claude Partner Badge — Claude Code"
          width={88}
          height={88}
          className="h-[5.5rem] w-[5.5rem] shrink-0 object-contain"
          priority
        />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
            Partner badge
          </p>
          <p className="mt-1 text-sm font-semibold text-[#1f2c4a]">Claude Partner</p>
          <p className="mt-0.5 text-xs leading-5 text-[#64748b]">Claude Code · issued by Anthropic</p>
        </div>
      </div>
    );
  }

  if (variant === "mark") {
    return (
      <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#475569]">
        <Image
          src="/claude-partner-badge.png"
          alt="Claude Partner Badge — Claude Code"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        Claude Partner
      </span>
    );
  }

  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg bg-[#1f2c4a]/[0.04] px-3 py-2.5">
      <Image
        src="/claude-partner-badge.png"
        alt="Claude Partner Badge — Claude Code"
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 object-contain"
      />
      <p className="text-[12px] leading-snug text-[#475569]">
        Taught under our{" "}
        <span className="font-semibold text-[#1f2c4a]">Claude Partner</span> badge
      </p>
    </div>
  );
}
