type MemorialDayBannerArtProps = {
  /** Horizontal sticky strip (72px) or modal left panel */
  variant?: "strip" | "panel";
  className?: string;
};

function SaleMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-black italic tracking-wider shrink-0 ${className}`}
      style={{
        background: "linear-gradient(180deg, #fde68a 0%, #fbbf24 28%, #dc2626 58%, #7f1d1d 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(1px 2px 0 rgba(0,0,0,0.4))",
      }}
    >
      SALE
    </span>
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
        className={`absolute inset-0 flex flex-col justify-center bg-gradient-to-br from-[#1e3a8a] via-[#991b1b] to-[#1e3a8a] px-8 py-10 ${className}`}
        aria-hidden
      >
        <SaleMark className="text-5xl mb-4" />
        <p className="text-white text-xl sm:text-2xl font-semibold leading-snug tracking-wide max-w-sm">
          Memorial Day Sale — Enjoy Before It Ends
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full min-w-0 items-center overflow-hidden bg-transparent ${className}`}
      aria-hidden
    >
      <div className="flex min-w-0 items-center gap-3 px-3 sm:gap-5 sm:px-5 md:gap-6 md:px-6">
        <SaleMark className="text-2xl sm:text-3xl md:text-4xl" />
        <p className="min-w-0 truncate text-sm font-semibold tracking-wide text-white sm:text-base md:text-lg md:whitespace-nowrap">
          <span className="sm:hidden">Memorial Day Sale</span>
          <span className="hidden sm:inline">Memorial Day Sale — Enjoy Before It Ends</span>
        </p>
      </div>
    </div>
  );
}
