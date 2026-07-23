import Image from "next/image";

const CURSORS = [
  { name: "Maya", color: "#16a34a", className: "top-[10%] left-[6%] pt-collage-drift-a" },
  { name: "Jordan", color: "#db2777", className: "top-[62%] left-[72%] pt-collage-drift-b" },
  { name: "Alex", color: "#2563eb", className: "top-[76%] left-[16%] pt-collage-drift-c" },
  { name: "Sam", color: "#d97706", className: "top-[20%] left-[74%] pt-collage-drift-d" },
] as const;

const BADGES = [
  { label: "SA", top: "8%", left: "44%", bg: "#1f2c4a", anim: "pt-collage-bob-a" },
  { label: "LPM", top: "32%", left: "84%", bg: "#0f766e", anim: "pt-collage-bob-b" },
  { label: "POPM", top: "80%", left: "56%", bg: "#b45309", anim: "pt-collage-bob-c" },
  { label: "SSM", top: "50%", left: "6%", bg: "#4338ca", anim: "pt-collage-bob-d" },
] as const;

/**
 * Lightweight CSS-animated collage (no framer-motion).
 * Uses transform/opacity only + prefers-reduced-motion.
 */
export default function PracticeTestHeroCollage() {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-lg">
      <div className="relative aspect-square w-[78%] max-w-[22rem] select-none sm:w-[72%] sm:max-w-[24rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(217,119,6,0.12),transparent_65%)] pt-collage-glow"
        />

        <div className="absolute left-[8%] top-[10%] z-10 h-[18%] w-[18%] overflow-hidden rounded-full border-[3px] border-[#99f6e4] shadow-md pt-collage-bob-a">
          <Image
            src="/brooke-cagle--uHVRvDr7pg-unsplash.jpg"
            alt=""
            fill
            sizes="90px"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div
          className="absolute right-[16%] top-[6%] z-20 flex h-[16%] w-[24%] flex-col items-center justify-center bg-[#f5b942] px-2 text-center shadow-md pt-collage-bob-b"
          style={{ borderRadius: "0.85rem 2.2rem 0.85rem 0.85rem" }}
        >
          <p className="text-2xl font-black leading-none tracking-tight text-[#1f2c4a] sm:text-3xl">7+</p>
          <p className="mt-0.5 text-[8px] font-semibold uppercase leading-tight tracking-wide text-[#1f2c4a]/80 sm:text-[9px]">
            Free Practice
            <br />
            Mocks
          </p>
        </div>

        <div className="absolute bottom-[20%] right-[6%] z-10 h-[30%] w-[17%] overflow-hidden rounded-[999px] border-[3px] border-[#1f2c4a] shadow-lg pt-collage-bob-c">
          <Image
            src="/dylan-gillis-KdeqA3aTnBY-unsplash.jpg"
            alt=""
            fill
            sizes="90px"
            loading="lazy"
            className="object-cover object-center"
          />
        </div>

        <div
          className="absolute left-[6%] top-[40%] z-10 h-[24%] w-[32%] overflow-hidden shadow-lg pt-collage-bob-d"
          style={{ borderRadius: "1.4rem 0.9rem 1.8rem 0.9rem" }}
        >
          <Image
            src="/annie-spratt-QckxruozjRg-unsplash.jpg"
            alt=""
            fill
            sizes="160px"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div
          className="absolute left-1/2 top-[48%] z-30 flex h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 items-center justify-center pt-collage-bob-a"
          aria-hidden
        >
          <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-md">
            <path
              d="M60 12c22 0 40 14 44 34 4 18-4 34-18 42-10 6-22 10-26 22-1 3-4 4-6 2-8-10-22-12-34-20C8 82 4 62 12 44 20 24 40 12 60 12z"
              fill="#e2e8f0"
            />
            <ellipse cx="46" cy="48" rx="7" ry="11" fill="white" />
            <ellipse cx="70" cy="48" rx="7" ry="11" fill="white" />
            <ellipse cx="47" cy="50" rx="2.5" ry="3.5" fill="#1f2c4a" />
            <ellipse cx="71" cy="50" rx="2.5" ry="3.5" fill="#1f2c4a" />
          </svg>
        </div>

        <div
          className="absolute bottom-[8%] left-[28%] z-20 flex h-[15%] w-[22%] flex-col items-center justify-center bg-[#99f6e4] text-center shadow-md pt-collage-bob-b"
          style={{ borderRadius: "50% 50% 50% 1rem" }}
        >
          <p className="text-xl font-black leading-none tracking-tight text-[#1f2c4a] sm:text-2xl">25K+</p>
          <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide text-[#1f2c4a]/75 sm:text-[9px]">
            Learners
          </p>
        </div>

        {BADGES.map((badge) => (
          <div
            key={badge.label}
            className={`absolute z-40 flex h-8 w-8 items-center justify-center rounded-full text-[8px] font-bold text-white shadow-md sm:h-9 sm:w-9 sm:text-[9px] ${badge.anim}`}
            style={{ top: badge.top, left: badge.left, backgroundColor: badge.bg }}
            aria-hidden
          >
            {badge.label}
          </div>
        ))}

        {CURSORS.map((cursor) => (
          <div
            key={cursor.name}
            className={`absolute z-50 flex items-start ${cursor.className}`}
            aria-hidden
          >
            <svg width="14" height="17" viewBox="0 0 18 22" fill="none" className="drop-shadow-sm">
              <path
                d="M1 1l15 8.5-6.8 1.6L6.5 20 1 1z"
                fill={cursor.color}
                stroke="white"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="mt-2 -ml-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold text-white shadow-sm"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </span>
          </div>
        ))}

        <span
          aria-hidden
          className="absolute bottom-[16%] right-[34%] z-30 h-2 w-2 rounded-full bg-[#ef4444] pt-collage-bob-c"
        />
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute left-[50%] top-[20%] z-40 h-3.5 w-3.5 text-[#1f2c4a] pt-collage-spin"
          fill="currentColor"
        >
          <path d="M12 2l1.8 5.5L19 9.5l-4.2 3.2L16.2 19 12 15.8 7.8 19l1.4-6.3L5 9.5l5.2-2L12 2z" />
        </svg>
      </div>
    </div>
  );
}
