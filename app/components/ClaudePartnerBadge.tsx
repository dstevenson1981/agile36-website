"use client";

import Image from "next/image";
import Script from "next/script";
import {
  CLAUDE_PARTNER_BADGE_ID,
  CLAUDE_PARTNER_BADGE_URL,
} from "@/app/lib/course-partners";

type Variant = "mark" | "footer" | "embed";

type Props = {
  variant?: Variant;
};

export default function ClaudePartnerBadge({ variant = "footer" }: Props) {
  if (variant === "embed") {
    return (
      <div className="flex justify-center">
        <div
          data-iframe-width="150"
          data-iframe-height="270"
          data-share-badge-id={CLAUDE_PARTNER_BADGE_ID}
          data-share-badge-host="https://www.credly.com"
        />
        <Script src="https://cdn.credly.com/assets/utilities/embed.js" strategy="lazyOnload" />
      </div>
    );
  }

  if (variant === "mark") {
    return (
      <a
        href={CLAUDE_PARTNER_BADGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[11px] font-medium text-[#475569] hover:text-[#1f2c4a]"
      >
        <Image
          src="/claude-partner-badge.png"
          alt="Claude Partner Badge — Claude Code"
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
        Claude Partner
      </a>
    );
  }

  return (
    <a
      href={CLAUDE_PARTNER_BADGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex items-center gap-2.5 rounded-lg bg-[#1f2c4a]/[0.04] px-3 py-2.5 transition hover:bg-[#1f2c4a]/[0.07]"
    >
      <Image
        src="/claude-partner-badge.png"
        alt="Claude Partner Badge — Claude Code, issued by Anthropic"
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 object-contain"
      />
      <p className="text-[11px] leading-snug text-[#475569]">
        Taught under our{" "}
        <span className="font-semibold text-[#1f2c4a]">Claude Partner</span>{" "}
        badge — Claude Code
      </p>
    </a>
  );
}
