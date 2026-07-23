"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMBO_COURSES, type Combo } from "./data";
import ComboCourseHeroCollage from "./ComboCourseHeroCollage";

const INDUSTRY_LOGOS = [
  { src: "/accenture-6.svg", alt: "Accenture" },
  { src: "/deloitte-1 (2).svg", alt: "Deloitte" },
  { src: "/jpmorgan-2 (1).svg", alt: "JPMorgan" },
  { src: "/bank-of-america-2 (1).svg", alt: "Bank of America" },
  { src: "/disney-2.svg", alt: "Disney" },
  { src: "/netflix-3.svg", alt: "Netflix" },
  { src: "/tesla-9.svg", alt: "Tesla" },
  { src: "/apple-11.svg", alt: "Apple" },
  { src: "/logo-amazon.svg", alt: "Amazon" },
];

const BENEFITS = [
  {
    title: "Bundled savings that compound",
    desc: "Pay less than enrolling course-by-course — dual credentials without dual sticker shock.",
    image: "/dylan-gillis-KdeqA3aTnBY-unsplash.jpg",
  },
  {
    title: "Coordinated live schedules",
    desc: "Pick dates for each course in the bundle. Weekday and weekend cohorts, SPC-led.",
    image: "/campaign-creators-gMsnXqILjp4-unsplash.jpg",
  },
  {
    title: "Career-stack credentials",
    desc: "Build a portfolio that hiring managers recognize — SAFe and AI paths that reinforce each other.",
    image: "/annie-spratt-QckxruozjRg-unsplash.jpg",
  },
];

/** Pulled in the same style as /testimonials (AVATAR2 portraits + learner voice). */
const REVIEWS = [
  {
    name: "A. Johnson",
    title: "Scrum Master",
    image: "/AVATAR2/image 12.png",
    quote:
      "Bundling SSM and LPM saved us budget and kept both courses on one coordinated schedule. Live instruction, exam prep, and separate certificates — exactly what we needed.",
  },
  {
    name: "M. Patel",
    title: "Product Owner",
    image: "/AVATAR2/image 24.png",
    quote:
      "The combo path made stacking credentials realistic. Clear materials, strong exam support, and certifications that hiring managers actually recognize.",
  },
  {
    name: "R. Chen",
    title: "Agile Coach",
    image: "/AVATAR2/image 47.png",
    quote:
      "Two live courses, one enrollment, real savings. Exam vouchers were included and the prep support helped our whole team feel ready.",
  },
];

const FAQS = [
  {
    q: "What are Agile36 Combo Courses?",
    a: "Agile36 Combo Courses pair two complementary certifications into one bundled enrollment — so you stack credentials faster, with coordinated live schedules and a lower total price than buying each course separately.",
  },
  {
    q: "How do Combo Courses help save costs?",
    a: "Bundled pricing is significantly lower than enrolling in each course on its own. You get both live trainings, materials, and certification exam paths in one package.",
  },
  {
    q: "Who should enroll in Combo Courses?",
    a: "They’re ideal for professionals who want to expand across related SAFe® or AI paths quickly — for example Scrum Masters adding LPM, or Product Owners pairing POPM with SASM.",
  },
  {
    q: "Are the certifications globally recognized?",
    a: "Yes. Certifications in our combos come from industry-recognized bodies such as Scaled Agile, Inc. and aligned AI credentialing partners.",
  },
  {
    q: "What is the typical combo course duration?",
    a: "Most combos include two 2-day live courses (about 16 hours each). You’ll choose cohort dates for each course at enrollment — weekday and weekend options are available.",
  },
  {
    q: "Can I choose my own course combinations?",
    a: "Browse our published two-course combos on this page. If you need a custom pairing for a team or corporate cohort, contact a course advisor and we’ll help you build it.",
  },
  {
    q: "Will I get separate certificates for each course?",
    a: "Yes. After you successfully complete each course and pass the related exam (when required), you receive individual certificates from the respective accreditation bodies.",
  },
  {
    q: "Are these courses delivered live or self-paced?",
    a: "All Agile36 Combo Courses are live, instructor-led (virtual classroom) with SPC faculty — not self-paced video libraries.",
  },
  {
    q: "Do Combo Courses include exam preparation support?",
    a: "Yes. Combos include certification exam attempts (where applicable), digital course materials, and exam preparation support so you’re ready when it’s time to certify.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function savePercent(combo: Combo): number {
  if (combo.originalPrice <= 0) return 0;
  return Math.round((100 * (combo.originalPrice - combo.comboPrice)) / combo.originalPrice);
}

function shortCourseLabel(name: string): string {
  const paren = name.match(/\(([^)]+)\)\s*$/);
  if (paren) return paren[1];
  if (name.includes("POPM")) return "POPM";
  if (name.includes("GenAI")) return "GenAI";
  return name.replace(/^AI-Empowered\s+/i, "").replace(/^SAFe\s+/i, "").slice(0, 28);
}

function comboIncludes(combo: Combo): string[] {
  const days = combo.courses.length * 2;
  const hours = days * 8;
  const certLabels = combo.courses.map((c) => shortCourseLabel(c.name));
  return [
    `${hours} Hours Live Training`,
    `${days} Days Across ${combo.courses.length} Courses`,
    ...certLabels.map((l) => `${l} Certification Path`),
    "Exam Attempts & Digital Materials",
    "Weekday & Weekend Cohort Options",
  ].slice(0, 5);
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ComboCourseCard({ combo, index }: { combo: Combo; index: number }) {
  const pct = savePercent(combo);
  const includes = comboIncludes(combo);

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1f2c4a]/15 bg-white shadow-[0_12px_40px_-18px_rgba(31,44,74,0.35)] transition-shadow duration-300 hover:border-[#1f2c4a]/30 hover:shadow-[0_22px_50px_-16px_rgba(31,44,74,0.4)]"
    >
      <div className="bg-gradient-to-r from-[#1f2c4a] to-[#33415f] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
        Live, instructor-led cohort
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-center justify-center gap-2">
          {combo.courses.map((course, idx) => (
            <div key={course.id} className="flex items-center gap-2">
              {idx > 0 ? (
                <span className="text-lg font-black text-[#94a3b8]" aria-hidden>
                  +
                </span>
              ) : null}
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-[#1f2c4a]/12 bg-[#f8fafc] shadow-sm transition duration-300 group-hover:scale-105">
                <Image
                  src={course.badge}
                  alt={course.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <h3 className="mb-1 text-center text-[0.95rem] font-semibold leading-snug text-[#1f2c4a]">
          {combo.name}
        </h3>
        {combo.enrolled ? (
          <p className="mb-4 text-center text-xs text-[#94a3b8]">{combo.enrolled} enrolled · Live Classroom</p>
        ) : (
          <div className="mb-4" />
        )}

        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">Starting from</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[1.75rem] font-semibold leading-none text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
            ${combo.comboPrice.toLocaleString()}
          </span>
          <span className="text-sm text-[#94a3b8] line-through">${combo.originalPrice.toLocaleString()}</span>
          {pct > 0 ? (
            <span className="rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold text-[#d97706]">
              SAVE {pct}%
            </span>
          ) : null}
        </div>

        <Link
          href={`/combo-courses/schedule?combo=${combo.id}`}
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1f2c4a] py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-[#16243f] group-hover:gap-2.5"
        >
          View Schedules & Enroll
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </Link>
        <p className="mt-2 text-center text-[11px] leading-snug text-[#94a3b8]">
          Weekday & weekend cohorts · secure Stripe checkout
        </p>

        <div className="mt-4 border-t border-[#1f2c4a]/10 pt-3.5">
          <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">What&apos;s included</p>
          <ul className="space-y-2.5">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] text-[#475569]">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2.5 rounded-lg bg-[#1f2c4a]/[0.04] px-3 py-2.5">
            <Image
              src="/Silver.png"
              alt="Scaled Agile Silver Partner"
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 object-contain"
            />
            <p className="text-[11px] leading-snug text-[#475569]">
              Official training under our{" "}
              <span className="font-semibold text-[#1f2c4a]">Scaled Agile Silver Partnership</span>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ComboCoursesPage() {
  const logoLoop = [...INDUSTRY_LOGOS, ...INDUSTRY_LOGOS];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-[#1f2c4a]">
      {/* Hero */}
      <section className="relative w-full px-4 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-16 lg:px-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,119,6,0.12),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(31,44,74,0.08),_transparent_45%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2 text-sm text-[#64748b]">
              <Link href="/" className="hover:text-[#1f2c4a]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#334155]">Combo Courses</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-3 inline-block">
              <span className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                <span className="text-[#d97706]">Two certifications.</span>{" "}
                <span className="text-[#1f2c4a]">One bundle.</span>
              </span>
              <svg viewBox="0 0 220 10" className="mt-1 h-2.5 w-56 text-[#d97706]" fill="none" aria-hidden>
                <path
                  d="M3 7c40-5 80-5 107-3 32 2 70 2 107-2"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mb-5 text-4xl font-normal leading-[1.08] text-[#1f2c4a] md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Stack credentials faster — and pay less doing it
            </motion.h1>
            <motion.p variants={fadeUp} className="mb-7 max-w-xl text-lg leading-relaxed text-[#475569]">
              Pair complementary SAFe® and AI certifications into one integrated path. Same live SPC-led
              instruction, bundled pricing, and a portfolio that compounds with every credential.
            </motion.p>

            <motion.div variants={fadeUp} className="mb-8 flex flex-wrap items-center gap-3">
              <div className="flex gap-0.5" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#64748b]">
                <span className="font-semibold text-[#1f2c4a]">4.9/5</span> · 2,500+ learner reviews
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#combo-catalog"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1f2c4a]/25 bg-white/70 px-7 py-3.5 font-medium text-[#1f2c4a] shadow-sm backdrop-blur transition hover:bg-[#1f2c4a] hover:text-white"
              >
                Explore Combo Courses
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1f2c4a] px-7 py-3.5 font-medium text-white shadow-lg shadow-[#1f2c4a]/20 transition hover:bg-[#16243f]"
              >
                Contact Course Advisor
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <ComboCourseHeroCollage />
          </motion.div>
        </div>
      </section>

      {/* Industry logos */}
      <section className="border-y border-[#1f2c4a]/8 bg-white/60 py-8">
        <div className="mx-auto mb-5 max-w-7xl px-4 text-center sm:px-6 lg:px-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
            Trusted by professionals at industry leaders
          </p>
        </div>
        <div className="marquee-mask marquee-paused overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-14 px-8">
            {logoLoop.map((logo, i) => (
              <Image
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 w-auto opacity-50 grayscale transition hover:opacity-90 hover:grayscale-0 sm:h-9"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits with imagery */}
      <section className="w-full px-4 py-16 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-10 text-center"
          >
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
              Why combos
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-normal text-[#1f2c4a] md:text-3xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Key Benefits of Combo Courses
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {BENEFITS.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-[#1f2c4a]/12 bg-white shadow-[0_12px_32px_-16px_rgba(31,44,74,0.25)]"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={benefit.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f2c4a]/55 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-[#1f2c4a]">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748b]">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Combo catalog */}
      <section id="combo-catalog" className="w-full scroll-mt-24 px-4 py-16 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">Catalog</p>
            <h2 className="text-2xl font-normal text-[#1f2c4a] md:text-3xl" style={{ letterSpacing: "-0.03em" }}>
              Combo Courses
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
              Two-course bundles across SAFe® and AI — mix and match credentials like SSM + LPM, LPM + APM, and more.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {COMBO_COURSES.map((combo, index) => (
              <ComboCourseCard key={combo.id} combo={combo} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 lg:px-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(31,44,74,0.06),_transparent_65%)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">Reviews</p>
            <h2 className="text-2xl font-normal text-[#1f2c4a] md:text-3xl" style={{ letterSpacing: "-0.03em" }}>
              What learners say
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#64748b]">
              Real feedback from professionals who trained with Agile36 — the same voices featured on our testimonials page.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {REVIEWS.map((review) => (
              <motion.article
                key={review.name}
                variants={fadeUp}
                className="flex h-full flex-col rounded-2xl border border-[#1f2c4a]/12 bg-white p-6 shadow-[0_12px_32px_-16px_rgba(31,44,74,0.25)]"
              >
                <div className="mb-4 flex gap-0.5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-[#475569]">&ldquo;{review.quote}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-[#1f2c4a]/10 pt-4">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#1f2c4a]/10 bg-[#f8fafc]">
                    <Image
                      src={review.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1f2c4a]">{review.name}</p>
                    <p className="text-xs text-[#64748b]">{review.title}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>


      {/* FAQ */}
      <section className="w-full px-4 py-16 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-2xl border border-[#1f2c4a]/12 bg-white shadow-sm transition hover:border-[#1f2c4a]/25"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-[#1f2c4a]">
                  <span>{faq.q}</span>
                  <svg
                    className="h-5 w-5 shrink-0 text-[#94a3b8] transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm leading-relaxed text-[#64748b]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
