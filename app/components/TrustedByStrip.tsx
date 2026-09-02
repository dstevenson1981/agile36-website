/** Scrolling "Trusted by industry leaders" logo marquee — used under course page heroes. */

import { TRUSTED_BY_LOGOS } from "@/app/lib/trusted-by-logos";

export default function TrustedByStrip() {
  return (
    <section className="w-full border-y border-[#1f2c4a]/[0.06] bg-black px-4 py-10 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
          Trusted by industry leaders
        </p>
        <div className="marquee-mask marquee-paused overflow-hidden">
          <div
            className="marquee-row flex w-max items-center gap-16 pr-16 md:gap-20 md:pr-20"
            style={{ "--marquee-duration": "52s" } as React.CSSProperties}
          >
            {[...TRUSTED_BY_LOGOS, ...TRUSTED_BY_LOGOS].map((logo, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                aria-hidden={i >= TRUSTED_BY_LOGOS.length}
                className="trusted-by-logo h-6 w-auto md:h-7"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
