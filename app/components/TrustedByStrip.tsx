/** Scrolling "Trusted by industry leaders" logo marquee — used under course page heroes. */

const LOGOS = [
  { src: "/logo-amazon.svg", alt: "Amazon" },
  { src: "/apple-11.svg", alt: "Apple" },
  { src: "/accenture-6.svg", alt: "Accenture" },
  { src: "/tesla-9.svg", alt: "Tesla" },
  { src: "/netflix-3.svg", alt: "Netflix" },
  { src: "/disney-2.svg", alt: "Disney" },
  { src: "/deloitte-1 (2).svg", alt: "Deloitte" },
];

export default function TrustedByStrip() {
  return (
    <section className="w-full border-y border-[#1f2c4a]/[0.06] bg-black px-4 py-10 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
          Trusted by industry leaders
        </p>
        <div className="marquee-mask marquee-paused overflow-hidden">
          <div className="marquee-row flex w-max items-center gap-16 pr-16 md:gap-20 md:pr-20" style={{ "--marquee-duration": "38s" } as React.CSSProperties}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                aria-hidden={i >= LOGOS.length}
                className="h-6 w-auto opacity-60 grayscale transition-opacity duration-300 hover:opacity-100 md:h-7"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
