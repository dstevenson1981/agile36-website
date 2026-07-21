"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMBO_COURSES, type Combo } from "./data";

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

const LEADERS = [
  {
    name: "Deadra Stevenson",
    title: "CEO & Founder · SPC",
    image: "/Deadra.jpeg",
    trained: "25K+",
    blurb: "Enterprise Agile & AI transformation leader trusted by global brands.",
  },
  {
    name: "Marcus Ball",
    title: "Enterprise Agile Coach · SPC",
    image: "/marcus.jpeg",
    trained: "13K+",
    blurb: "Hands-on SAFe coaching that turns framework theory into delivery results.",
  },
  {
    name: "Joe Puoci",
    title: "Enterprise Trainer · SPC",
    image: "/Joe.jpeg",
    trained: "13K+",
    blurb: "Practical, outcome-oriented instruction across the SAFe portfolio.",
  },
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

const FAQS = [
  {
    q: "What are Agile36 Combo Courses?",
    a: "Agile36 Combo Courses combine two or more related certifications into a single, streamlined learning path to help you learn faster and save on fees.",
  },
  {
    q: "How do Combo Courses help save costs?",
    a: "We offer bundled pricing, which is significantly lower than enrolling for each training program and certification separately.",
  },
  {
    q: "Who should enroll in Combo Courses?",
    a: "Our combo courses are ideal for professionals aiming to expand skills across related frameworks quickly and efficiently.",
  },
  {
    q: "Are the certifications globally recognized?",
    a: "Yes, all certifications included in the combos are recognized by industry-leading bodies such as Scaled Agile and aligned AI credentialing partners.",
  },
  {
    q: "Will I get separate certificates for each course?",
    a: "Yes, you will receive individual certificates upon successful completion of each course and passing the exam (if applicable) in the combo from the respective accreditation bodies.",
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
  if (name.includes("PMP")) return "PMP";
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
              <div className="flex -space-x-2">
                {["/Deadra.jpeg", "/Joe.jpeg", "/marcus.jpeg"].map((src) => (
                  <div
                    key={src}
                    className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-[#1f2c4a]/10"
                  >
                    <Image src={src} alt="" width={36} height={36} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
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
            <div aria-hidden className="absolute -inset-8 rounded-full bg-[#d97706]/[0.1] blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-[#1f2c4a]/12 shadow-2xl shadow-[#1f2c4a]/20">
              <Image
                src="/combo-hero.jpg"
                alt="Agile36 live instructor-led combo certification training"
                width={1376}
                height={768}
                priority
                className="relative w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2c4a]/50 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute -left-3 bottom-10 hidden max-w-[11.5rem] rounded-2xl border border-white/60 bg-white/95 p-3 shadow-xl backdrop-blur sm:block md:-left-6"
            >
              <div className="mb-2 flex -space-x-2">
                {["/Deadra.jpeg", "/Joe.jpeg", "/marcus.jpeg"].map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-[#1f2c4a]">SPC-led live cohorts</p>
              <p className="text-[11px] text-[#64748b]">Deadra · Marcus · Joe</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="absolute -right-2 top-8 hidden rounded-2xl border border-white/60 bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur sm:block md:-right-4"
            >
              <div className="flex items-center gap-2">
                <Image src="/Silver.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#1f2c4a]">Silver Partner</p>
                  <p className="text-[11px] text-[#64748b]">Scaled Agile</p>
                </div>
              </div>
            </motion.div>
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

      {/* Industry leaders */}
      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 lg:px-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(31,44,74,0.06),_transparent_65%)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">Faculty</p>
            <h2 className="text-2xl font-normal text-[#1f2c4a] md:text-3xl" style={{ letterSpacing: "-0.03em" }}>
              Learn from industry leaders
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#64748b]">
              Every combo is delivered live by SAFe® Practice Consultants who train thousands of professionals each year.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {LEADERS.map((leader) => (
              <motion.div
                key={leader.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-[#1f2c4a]/12 bg-white shadow-[0_12px_32px_-16px_rgba(31,44,74,0.25)]"
              >
                <div className="relative h-56 overflow-hidden bg-[#1f2c4a]/5">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-top transition duration-500 hover:scale-[1.03]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[#1f2c4a]">{leader.name}</h3>
                    <span className="rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold text-[#d97706]">
                      {leader.trained} trained
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-[#64748b]">{leader.title}</p>
                  <p className="text-sm leading-relaxed text-[#475569]">{leader.blurb}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual strip */}
      <section className="w-full px-4 py-10 sm:px-6 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
          {[
            { src: "/LeadingSAFeHome.jpg", label: "Live virtual classrooms" },
            { src: "/brooke-cagle--uHVRvDr7pg-unsplash.jpg", label: "Collaborative learning" },
            { src: "/christina-wocintechchat-com-faEfWCdOKIg-unsplash.jpg", label: "Career-ready cohorts" },
          ].map((shot, i) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative h-44 overflow-hidden rounded-2xl border border-[#1f2c4a]/10 sm:h-52"
            >
              <Image src={shot.src} alt={shot.label} fill className="object-cover" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2c4a]/70 to-transparent" />
              <p className="absolute bottom-3 left-3 text-sm font-semibold text-white">{shot.label}</p>
            </motion.div>
          ))}
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
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium text-[#1f2c4a]">
                  {faq.q}
                  <svg
                    className="ml-2 h-5 w-5 shrink-0 text-[#94a3b8] transition-transform group-open:rotate-180"
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
