import { LEVEL_UP_SALE_ENDS_SHORT, BANNER_COUPON_CODE } from "@/app/lib/level-up-sale-promo";

type LevelUpSaleBannerArtProps = {
  /** Horizontal sticky strip or modal left panel */
  variant?: "strip" | "panel";
  className?: string;
};

const STRIP_BG =
  "bg-gradient-to-r from-[#e3f2fd] via-[#eef6fc] to-[#e8f4fc]";

function LevelUpLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 flex-col leading-none ${className}`} aria-hidden>
      <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#111] sm:text-[10px]">
        Level
      </span>
      <span className="relative mt-0.5 inline-flex items-end gap-0.5">
        <span
          className="text-[1.65rem] font-black uppercase leading-none text-[#e53935] sm:text-[2rem]"
          style={{ fontStyle: "italic" }}
        >
          Up
        </span>
        <svg
          className="mb-0.5 h-4 w-4 text-[#e53935] sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 18 L14 8 L14 14 L20 14 L20 4 L4 18 Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="relative -mt-1 inline-block">
        <span className="absolute inset-x-0 bottom-0 h-2.5 skew-x-[-12deg] bg-[#e53935]" aria-hidden />
        <span className="relative px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white sm:text-[10px]">
          Sale
        </span>
      </span>
    </span>
  );
}

function EndsDate({ className = "" }: { className?: string }) {
  return (
    <p className={`shrink-0 font-bold text-[#111] ${className}`}>
      <span className="sm:hidden">Until {LEVEL_UP_SALE_ENDS_SHORT}</span>
      <span className="hidden sm:inline">Only Until {LEVEL_UP_SALE_ENDS_SHORT}</span>
    </p>
  );
}

function Tagline({ className = "" }: { className?: string }) {
  return (
    <p
      className={`min-w-0 font-bold text-[#e53935] ${className}`}
    >
      <span className="hidden lg:inline">Skill Up Today, Thank Yourself Tomorrow</span>
      <span className="hidden sm:inline lg:hidden">Skill Up Today — Thank Yourself Tomorrow</span>
      <span className="sm:hidden">Skill Up Today</span>
      <span className="ml-1 inline-block align-middle text-[#e53935]" aria-hidden>
        ↗
      </span>
    </p>
  );
}

function CouponBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`shrink-0 rounded border-2 border-[#e53935]/80 bg-white/70 px-2 py-1 text-center sm:px-3 sm:py-1.5 ${className}`}
    >
      <p className="text-[10px] font-semibold text-[#111] sm:text-xs">
        Use <span className="font-extrabold text-[#111]">{BANNER_COUPON_CODE}</span>
      </p>
      <p className="text-[10px] font-semibold text-[#111] sm:text-xs">
        flat <span className="font-extrabold text-[#e53935]">$100 Off</span>
      </p>
    </div>
  );
}

function EndsSoon({ className = "" }: { className?: string }) {
  return (
    <p className={`shrink-0 font-bold text-[#111] ${className}`}>Ends Soon!</p>
  );
}

function Divider() {
  return (
    <span
      className="hidden h-8 w-px shrink-0 bg-[#111]/20 sm:block"
      aria-hidden
    />
  );
}

/**
 * Level Up Sale promo art — HTML/CSS only (matches reference strip layout).
 */
export default function LevelUpSaleBannerArt({
  variant = "strip",
  className = "",
}: LevelUpSaleBannerArtProps) {
  if (variant === "panel") {
    return (
      <div
        className={`absolute inset-0 flex flex-col justify-center ${STRIP_BG} px-8 py-10 ${className}`}
        aria-hidden
      >
        <LevelUpLogo className="scale-125 origin-left" />
        <EndsDate className="mt-5 text-lg" />
        <Tagline className="mt-3 text-xl sm:text-2xl leading-snug max-w-md" />
        <CouponBox className="mt-5 inline-block" />
        <EndsSoon className="mt-4 text-lg" />
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full min-w-0 items-center overflow-hidden ${STRIP_BG} ${className}`}
      aria-hidden
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden px-3 sm:gap-3 sm:px-4 md:gap-4 md:px-5">
        <LevelUpLogo />
        <Divider />
        <EndsDate className="hidden text-xs sm:block sm:text-sm md:text-base" />
        <Divider />
        <Tagline className="truncate text-xs sm:text-sm md:text-base lg:whitespace-nowrap" />
        <CouponBox className="hidden md:block" />
        <Divider />
        <EndsSoon className="hidden text-xs sm:block sm:text-sm md:text-base" />
      </div>
      <div className="flex shrink-0 items-center gap-2 pr-3 sm:hidden">
        <CouponBox />
      </div>
    </div>
  );
}
