import { MEMORIAL_DAY_PROMO_ENDS_SHORT } from "@/app/lib/memorial-day-promo";

type MemorialDayBannerArtProps = {
  /** Horizontal sticky strip (72px) or modal left panel */
  variant?: "strip" | "panel";
  className?: string;
};

const BANNER_GRADIENT_CLASS =
  "bg-gradient-to-r from-[#1e3a8a] via-[#dc2626] to-[#1e3a8a]";

function MemorialDayFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-6 w-9 shrink-0 ${className}`}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="24" height="16" fill="#B22234" />
      <path
        fill="#fff"
        d="M0 1.23h24M0 3.08h24M0 4.92h24M0 6.77h24M0 8.62h24M0 10.46h24M0 12.31h24M0 14.15h24"
      />
      <rect width="9.6" height="8.62" fill="#3C3B6E" />
      <circle cx="1.6" cy="1.5" r="0.55" fill="#fff" />
      <circle cx="3.2" cy="1.5" r="0.55" fill="#fff" />
      <circle cx="4.8" cy="1.5" r="0.55" fill="#fff" />
      <circle cx="6.4" cy="1.5" r="0.55" fill="#fff" />
      <circle cx="2.4" cy="2.9" r="0.55" fill="#fff" />
      <circle cx="4" cy="2.9" r="0.55" fill="#fff" />
      <circle cx="5.6" cy="2.9" r="0.55" fill="#fff" />
      <circle cx="1.6" cy="4.3" r="0.55" fill="#fff" />
      <circle cx="3.2" cy="4.3" r="0.55" fill="#fff" />
      <circle cx="4.8" cy="4.3" r="0.55" fill="#fff" />
      <circle cx="6.4" cy="4.3" r="0.55" fill="#fff" />
      <circle cx="2.4" cy="5.7" r="0.55" fill="#fff" />
      <circle cx="4" cy="5.7" r="0.55" fill="#fff" />
      <circle cx="5.6" cy="5.7" r="0.55" fill="#fff" />
    </svg>
  );
}

function SaleMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block font-black italic leading-none tracking-wider shrink-0 ${className}`}
      style={{
        transform: "skewX(-8deg)",
        textShadow: "3px 3px 0 rgba(0,0,0,0.4)",
        background: "linear-gradient(180deg, #fde68a 0%, #fbbf24 28%, #dc2626 58%, #7f1d1d 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      SALE
    </span>
  );
}

function MemorialDayTagline({ className = "" }: { className?: string }) {
  return (
    <p
      className={`min-w-0 font-semibold tracking-wide text-white ${className}`}
    >
      <span className="sm:hidden">Ends {MEMORIAL_DAY_PROMO_ENDS_SHORT}</span>
      <span className="hidden sm:inline">
        Memorial Day Sale — Ends {MEMORIAL_DAY_PROMO_ENDS_SHORT}
      </span>
    </p>
  );
}

/**
 * Crisp Memorial Day promo art — HTML/CSS only (no raster assets).
 */
export default function MemorialDayBannerArt({
  variant = "strip",
  className = "",
}: MemorialDayBannerArtProps) {
  if (variant === "panel") {
    return (
      <div
        className={`absolute inset-0 flex flex-col justify-center ${BANNER_GRADIENT_CLASS} px-8 py-10 ${className}`}
        aria-hidden
      >
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 max-w-md">
          <MemorialDayFlag className="-rotate-[10deg]" />
          <SaleMark className="text-5xl sm:text-6xl" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 max-w-lg">
          <MemorialDayTagline className="text-xl sm:text-2xl leading-snug" />
          <MemorialDayFlag className="rotate-[10deg]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full min-w-0 items-center overflow-hidden ${BANNER_GRADIENT_CLASS} ${className}`}
      aria-hidden
    >
      <div className="flex min-w-0 items-center gap-2 px-3 sm:gap-4 sm:px-5 md:gap-5 md:px-6">
        <MemorialDayFlag className="-rotate-[10deg]" />
        <SaleMark className="text-4xl sm:text-5xl" />
        <MemorialDayTagline className="truncate text-sm sm:text-base md:text-lg md:whitespace-nowrap" />
        <MemorialDayFlag className="rotate-[10deg]" />
      </div>
    </div>
  );
}
