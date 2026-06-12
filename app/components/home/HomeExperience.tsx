"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  CATALOG_COURSES,
  COURSE_CATEGORIES,
  getCatalogCourseUrl,
  type CatalogCourse,
  type CourseCategory,
} from "@/app/lib/course-catalog";

declare global {
  interface Window {
    $crisp?: unknown[];
  }
}

const HERO_VIDEO_SRC = "/hero-video.mp4";

const COMPANY_LOGOS = [
  { src: "/logo-amazon.svg", alt: "Amazon" },
  { src: "/apple-11.svg", alt: "Apple" },
  { src: "/accenture-6.svg", alt: "Accenture" },
  { src: "/tesla-9.svg", alt: "Tesla" },
  { src: "/netflix-3.svg", alt: "Netflix" },
  { src: "/disney-2.svg", alt: "Disney" },
  { src: "/deloitte-1 (2).svg", alt: "Deloitte" },
];

const INSTRUCTORS = [
  {
    name: "Deadra Stevenson",
    title: "CEO & Founder",
    subtitle: "SAFe® Practice Consultant (SPC®) · Enterprise Agile Coach · AI Transformation Leader",
    image: "/Deadra.jpeg",
    experience: "20+ years",
    linkedin: "https://www.linkedin.com/in/deadra-stevenson-a20a6a1a2/",
    description:
      "Welcome to Agile36. Deadra Stevenson, CEO and Founder, is proud to lead one of the most trusted training and transformation firms in the Lean-Agile space. With more than 15 years of experience guiding organizations through large-scale change, she has built a strong reputation for delivering impactful, results-driven Agile and AI transformation experiences.\n\nAbout Her\n\nBased in Miami, Florida, Deadra has led more than 30 major Lean-Agile transformations across a wide range of organizations, including global brands such as Coca-Cola and Netflix. Her background spans enterprise coaching, portfolio transformation, executive alignment, and helping leaders adopt the Scaled Agile Framework to improve performance and strategic execution.\n\nWhile her expertise is grounded in Lean and Agile, she also leads AI-focused transformation initiatives. She helps organizations understand how AI can enhance decision-making, elevate delivery flow, and modernize ways of working. Her dual expertise ensures clients receive guidance that is both proven and forward-thinking.\n\nWhy Train With Her\n\nOrganizations choose Agile36 because Deadra brings a rare combination of deep SAFe expertise, practical leadership insight, and a modern understanding of how AI is influencing the future of work. She makes complex concepts simple, relatable, and actionable for teams and executives.\n\nShe holds advanced certifications including SAFe® Program Consultant (SPC 6), PMP, CSM, CSP, CSPO, and LSSGB. These credentials reflect her commitment to excellence and her dedication to staying at the forefront of Agile and AI transformation practices.\n\nAt Agile36, her training is hands-on, grounded in real enterprise challenges, and designed to create measurable outcomes. She blends strong SAFe foundations with modern transformation techniques, helping organizations strengthen delivery, improve alignment, and prepare their teams for the future.\n\nEvery organization is unique. When clients train with Agile36, they gain a partner who understands their goals and provides tailored guidance to support long-term success in both Agile and AI-enabled environments.",
  },
  {
    name: "Marcus Ball",
    title: "Enterprise Agile Coach",
    subtitle: "SAFe® Practice Consultant (SPC®) · Enterprise Agile Coach",
    image: "/marcus.jpeg",
    experience: "15+ years",
    description:
      "Welcome to my profile. I'm Marcus Ball, an Enterprise Agile Coach with Agile36, specializing in Scaled Agile Framework (SAFe) certification training and enterprise transformation coaching. I am committed to helping organizations build stronger delivery teams, improve alignment, and navigate today's fast-paced business landscape with agility and confidence.\n\nAbout Me\n\nMy work as an Agile Coach is rooted in the belief that organizations unlock extraordinary potential when they embrace Lean-Agile principles. Over the course of my career, I have guided teams and leaders through the process of adopting Agile practices, strengthening collaboration, and building a culture that supports continuous improvement.\n\nMy Expertise\n\nWith Agile36, I deliver high-quality SAFe certification training designed to equip teams, leaders, and organizations with the skills needed to improve flow, increase value delivery, and operate more effectively. I focus on practical application, clear guidance, and developing the capabilities required for long-term success with Agile and SAFe.\n\nWhy Train With Me\n\nI bring extensive hands-on experience supporting organizations at various stages of their Agile journey, helping them achieve meaningful and lasting transformation. As a certified SAFe Program Consultant (SPC) and seasoned Agile professional, I offer a depth of knowledge and a practical approach that teams can apply immediately. My goal is to empower individuals and organizations to reach higher levels of performance and deliver exceptional value.",
  },
  {
    name: "Joe Puoci",
    title: "Enterprise Agile Coach",
    subtitle: "SAFe® Practice Consultant (SPC®) · Enterprise Agile Coach",
    image: "/Joe.jpeg",
    experience: "15+ years",
    description:
      "Joe Puoci is a SAFe Program Consultant (SPC) and enterprise trainer with Agile36, delivering live virtual SAFe certification courses across the portfolio. He focuses on practical application of the Scaled Agile Framework so teams and leaders can improve flow, alignment, and delivery outcomes.\n\nAbout Joe\n\nJoe brings hands-on experience guiding organizations through SAFe adoption, team-level execution, and program-level planning. His training emphasizes real-world scenarios, clear facilitation, and skills learners can apply immediately after class.\n\nWhy Train With Joe\n\nLearners work with an SPC who combines deep framework knowledge with a straightforward, outcome-oriented teaching style—helping you prepare for certification and for the day-to-day work of operating in a SAFe environment.",
  },
];

const FAQS = [
  {
    q: "Are the classes live or self-paced?",
    a: "Every course is 100% live and instructor-led, delivered virtually. You interact with the instructor and other learners in real time — no pre-recorded videos.",
  },
  {
    q: "Who teaches the courses?",
    a: "All SAFe® courses are taught by certified SAFe Practice Consultants (SPCs) with hands-on enterprise transformation experience at companies like Coca-Cola and Netflix.",
  },
  {
    q: "How do I prepare for my certification exam?",
    a: "Alongside the class itself, we offer free practice exams that mirror the real certification tests, so you can walk in confident on exam day.",
  },
  {
    q: "Do you offer private training for teams?",
    a: "Yes — we run private cohorts and enterprise programs tailored to your organization. Visit our corporate training page or talk to an advisor to scope it.",
  },
];

const FILTER_TABS: Array<"All" | CourseCategory> = ["All", ...COURSE_CATEGORIES];

/**
 * Homepage cards use the lifestyle photography (public/untitled folder) rather
 * than the certification badge logos — those stay in the courses dropdown.
 * A couple of courses share a catalog photo, so they get unique substitutes.
 */
const COURSE_PHOTO_OVERRIDES: Record<string, string> = {
  "23": "/untitled folder/chase-chappell-2V4y81bbfA0-unsplash.jpg",
  "25": "/untitled folder/annie-spratt-sggw4-qDD54-unsplash.jpg",
};

function homeCourseImage(course: CatalogCourse): string {
  return COURSE_PHOTO_OVERRIDES[course.id] ?? course.image;
}

function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

function openChat(e: React.MouseEvent) {
  // Crisp is loaded globally in the root layout; fall back to /contact if absent.
  if (typeof window !== "undefined" && window.$crisp) {
    e.preventDefault();
    window.$crisp.push(["do", "chat:open"]);
  }
}

/** Fades children in after `delay` ms. */
function FadeIn({
  delay = 0,
  duration = 1000,
  className = "",
  children,
}: {
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}) {
  // Owner feedback: no delayed fade-ins — everything visible on load.
  const [visible] = useState(true);
  void delay;
  return (
    <div
      className={`transition-opacity ${visible ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

/** Splits text on \n into lines and animates each character in with a stagger. */
function AnimatedHeading({ text, className = "" }: { text: string; className?: string }) {
  const [started, setStarted] = useState(false);
  const CHAR_DELAY = 30;
  const INITIAL_DELAY = 200;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), INITIAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  const lines = text.split("\n");
  let charCounter = 0;

  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split("").map((char, charIndex) => {
            const delay = charCounter * CHAR_DELAY;
            charCounter++;
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(-18px)",
                  transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
                }}
              >
                {char === " " ? " " : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function CourseCard({ course }: { course: CatalogCourse }) {
  const isPrivate = course.privateClass || course.price === 0;
  return (
    <Link
      href={getCatalogCourseUrl(course)}
      className="course-card group relative flex flex-col overflow-hidden rounded-2xl liquid-glass transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={homeCourseImage(course)}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="liquid-glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#1f2c4a]">
            {course.category}
          </span>
          {course.popular && (
            <span className="rounded-full bg-[#1f2c4a] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Popular
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium leading-snug text-[#1f2c4a]">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64748b]">
          {course.skills}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#64748b]">
          <span>{course.hours}</span>
          <span>{course.days}</span>
          <span>{course.enrolled}</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-[#1f2c4a]/10 pt-4">
          {isPrivate ? (
            <span className="text-sm font-medium text-[#1f2c4a]">Private cohort</span>
          ) : (
            <span className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-[#1f2c4a]">
                {formatPrice(course.price)}
              </span>
              <span className="text-sm text-[#94a3b8] line-through">
                {formatPrice(course.originalPrice)}
              </span>
            </span>
          )}
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f2c4a]/20 text-[#1f2c4a] transition-all duration-300 group-hover:bg-[#1f2c4a] group-hover:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div data-reveal className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
        {eyebrow}
      </p>
      <h2
        className="text-4xl font-normal leading-[1.08] text-[#1f2c4a] md:text-5xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {copy && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#475569] md:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}

export function HomeExperienceBody({
  externalScroll = false,
}: {
  /** When true, Lenis is provided by a parent (e.g. cinematic SmoothScroll). */
  externalScroll?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"All" | CourseCategory>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedInstructor, setExpandedInstructor] = useState<number | null>(null);
  const firstRender = useRef(true);

  const visibleCourses =
    activeTab === "All"
      ? CATALOG_COURSES
      : CATALOG_COURSES.filter((c) => c.category === activeTab);

  // Browsers pause offscreen background videos and don't always resume them;
  // re-play each one whenever it scrolls back into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const videos = [...root.querySelectorAll<HTMLVideoElement>("video.bg-video")];
    const tryPlay = (v: HTMLVideoElement) => {
      v.muted = true;
      v.play().catch(() => {});
    };
    videos.forEach(tryPlay);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && v.paused) tryPlay(v);
        });
      },
      { threshold: 0.1 }
    );
    videos.forEach((v) => observer.observe(v));
    // Chrome also pauses videos while the tab is hidden; resume when it shows.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        videos.forEach((v) => v.paused && tryPlay(v));
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // Scroll reveals + animated counters for everything below the hero.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let raf: ((time: number) => void) | null = null;
      let lenis: Lenis | null = null;

      if (!externalScroll) {
        lenis = new Lenis({ lerp: 0.1 });
        lenis.on("scroll", ScrollTrigger.update);
        raf = (time: number) => lenis!.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      }

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = parseFloat(el.dataset.count || "0");
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => {
              el.textContent = counter.v.toFixed(decimals);
            },
          });
        });

        // Gentle parallax drift on framed imagery.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 6 },
            {
              yPercent: -6,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      }, rootRef);

      return () => {
        ctx.revert();
        if (raf) gsap.ticker.remove(raf);
        lenis?.destroy();
      };
    });

    return () => mm.revert();
  }, [externalScroll]);

  // Re-stagger course cards when the filter changes (skip initial load — the
  // scroll reveal owns that moment).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".course-card"),
      { y: 26, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: "power3.out", overwrite: true }
    );
  }, [activeTab]);

  return (
    <div ref={rootRef} className="relative isolate overflow-x-clip bg-gradient-to-b from-white via-[#f3f7fd] to-[#e9f1fa] text-[#1f2c4a]">
      {/* Ambient color depth — fixed glows the glass surfaces refract while scrolling */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-48 -top-48 h-[65vh] w-[65vh] rounded-full bg-[#d97706]/[0.08] blur-[140px]" />
        <div className="absolute -right-48 top-1/4 h-[75vh] w-[75vh] rounded-full bg-blue-500/[0.10] blur-[160px]" />
        <div className="absolute -bottom-32 left-1/4 h-[55vh] w-[55vh] rounded-full bg-cyan-400/[0.07] blur-[140px]" />
      </div>

      {/* Film grain over the whole page — barely there, but it reads "shot on film" */}
      <div className="film-grain" aria-hidden="true" />

      {/* ========================== TRUSTED BY ============================ */}
      <section className="-mt-6 border-b border-[#1f2c4a]/10 px-6 pb-16 pt-2 md:-mt-10 md:px-12 md:pb-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d97706]">
              Trusted by professionals from
            </p>
            <h2
              className="mx-auto mt-4 max-w-3xl text-2xl font-medium text-[#1f2c4a] md:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              25,000+ certified at the world&apos;s most demanding companies
            </h2>
          </div>
          <div
            data-reveal
            className="mx-auto mt-9 flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-5 md:gap-x-8"
          >
            {COMPANY_LOGOS.map((logo) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-6 w-auto opacity-60 grayscale transition-opacity duration-300 hover:opacity-90 md:h-8"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= BENTO: WHY US ========================== */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Agile36"
            title="Training that behaves like coaching"
            copy="We are a transformation firm that teaches — not a content mill that certifies."
          />

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[210px]">
            {/* Feature tile — certified SPC coaches */}
            <div
              data-reveal
              className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-[#1f2c4a]/10 md:col-span-2 lg:row-span-2 lg:min-h-0"
            >
              <Image
                src="/coaches-tile.jpg"
                alt="Agile36 instructor coaching a team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="ken-burns object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d97706]">
                  Certified SPC Instructors
                </p>
                <h3 className="mt-3 max-w-md text-2xl font-normal text-[#1f2c4a] md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
                  Coaches who run real enterprise transformations
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#475569]">
                  <span data-count={30}>30</span>+ rollouts at brands like
                  Coca-Cola and Netflix — then they teach your cohort.
                </p>
              </div>
            </div>

            {/* Stat — professionals trained */}
            <div data-reveal className="flex flex-col justify-between rounded-3xl liquid-glass p-7 transition-colors duration-300 hover:bg-[#1f2c4a]/[0.06]">
              <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Professionals trained
              </p>
              <p className="text-5xl font-semibold text-[#1f2c4a] md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
                <span data-count={25}>25</span>
                <span className="text-[#d97706]">K+</span>
              </p>
            </div>

            {/* Stat — instructor rating */}
            <div data-reveal className="flex flex-col justify-between rounded-3xl liquid-glass p-7 transition-colors duration-300 hover:bg-[#1f2c4a]/[0.06]">
              <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Average instructor rating
              </p>
              <div>
                <p className="text-5xl font-semibold text-[#1f2c4a] md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
                  <span data-count={4.9} data-decimals={1}>4.9</span>
                </p>
                <p className="mt-1 text-sm tracking-[0.2em] text-[#d97706]">★★★★★</p>
              </div>
            </div>

            {/* Scaled Agile Silver Partner */}
            <div data-reveal className="flex flex-col justify-between gap-4 rounded-3xl liquid-glass p-7 transition-colors duration-300 hover:bg-[#1f2c4a]/[0.06] md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d97706]">
                Scaled Agile Silver Partner
              </p>
              <div>
                <h3 className="text-xl font-normal text-[#1f2c4a] md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
                  Official partner, official curriculum
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  Every SAFe® course is delivered under Scaled Agile partnership
                  — current materials, real certifications, no shortcuts.
                </p>
              </div>
            </div>

            {/* AI woven into every class */}
            <div data-reveal className="flex flex-col justify-between gap-4 rounded-3xl liquid-glass p-7 transition-colors duration-300 hover:bg-[#1f2c4a]/[0.06] md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d97706]">
                AI in every class
              </p>
              <div>
                <h3 className="text-xl font-normal text-[#1f2c4a] md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
                  Learn the way modern teams actually work
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  From AI-empowered SAFe to GenAI product leadership — AI is in
                  the loop of every course, not bolted on at the end.
                </p>
              </div>
            </div>

            {/* Live, virtual, global */}
            <div data-reveal className="flex flex-col justify-between gap-4 rounded-3xl liquid-glass p-7 transition-colors duration-300 hover:bg-[#1f2c4a]/[0.06]">
              <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Live, virtual, global
              </p>
              <div>
                <p className="text-4xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
                  <span data-count={15}>15</span>
                  <span className="text-[#d97706]">+</span>
                </p>
                <p className="mt-1 text-sm text-[#64748b]">
                  live courses across time zones — no recordings, ever
                </p>
              </div>
            </div>

            {/* Exam-ready */}
            <Link
              href="/test"
              data-reveal
              className="group flex flex-col justify-between gap-4 rounded-3xl liquid-glass p-7 transition-colors duration-300 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                Exam-ready by design
              </p>
              <div>
                <p className="text-sm leading-relaxed text-[#64748b]">
                  Free practice exams that mirror the real tests.
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#1f2c4a]">
                  Try one free
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ PROGRAMS ============================ */}
      <section id="programs" className="scroll-mt-12 px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Catalog"
            title="Programs built for the AI era"
            copy="SAFe® certifications, Generative AI credentials, and AI product leadership — every course live, every instructor certified."
          />

          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-2.5">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#1f2c4a] text-white"
                    : "liquid-glass text-[#475569] hover:text-[#1f2c4a]"
                }`}
              >
                {tab}
                <span className={`ml-2 text-xs ${activeTab === tab ? "text-[#94a3b8]" : "text-[#94a3b8]"}`}>
                  {tab === "All"
                    ? CATALOG_COURSES.length
                    : CATALOG_COURSES.filter((c) => c.category === tab).length}
                </span>
              </button>
            ))}
          </div>

          <div
            ref={gridRef}
            data-reveal
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {visibleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= PRACTICE EXAMS ========================= */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div data-reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">
              Free Practice Exams
            </p>
            <h2 className="text-4xl font-normal leading-[1.08] text-[#1f2c4a] md:text-5xl" style={{ letterSpacing: "-0.03em" }}>
              Walk into the exam already knowing you passed
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Realistic questions modeled on the live certification exams",
                "Instant scoring with explanations for every answer",
                "Unlimited retakes — drill until it is muscle memory",
                "Covers SAFe® Scrum Master, Leading SAFe®, POPM and more",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-[#475569] md:text-lg">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97706]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/test"
              className="mt-9 inline-block rounded-lg bg-white px-8 py-3 font-medium text-[#1f2c4a] transition-colors hover:bg-[#16243f]"
            >
              Try a Practice Exam — Free
            </Link>
          </div>
          <div data-reveal>
            {/* Live-class loop replaces the old static screenshot (Exampic.png) */}
            <video
              src="/practice-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={(e) => {
                const el = e.currentTarget;
                if (el.paused) el.play().catch(() => {});
              }}
              data-parallax
              className="bg-video w-full rounded-2xl border border-[#1f2c4a]/10 shadow-xl shadow-[#1f2c4a]/10"
            />
          </div>
        </div>
      </section>

      {/* ============================ TWO PATHS =========================== */}
      <section className="px-6 pb-24 md:px-12 md:pb-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div data-reveal className="liquid-glass rounded-2xl p-10 md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">For Individuals</p>
            <h3 className="mt-4 text-3xl font-normal text-[#1f2c4a] md:text-4xl" style={{ letterSpacing: "-0.03em" }}>
              Your next role is one certification away
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#475569] md:text-lg">
              Scrum Masters, Product Owners, RTEs and AI product leaders — find
              the cohort that fits your calendar and get certified in days, not
              months.
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-block rounded-lg bg-white px-7 py-3 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#16243f]"
            >
              Browse Upcoming Cohorts
            </Link>
          </div>

          <div data-reveal className="liquid-glass rounded-2xl p-10 md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#94a3b8]">For Teams & Enterprises</p>
            <h3 className="mt-4 text-3xl font-normal text-[#1f2c4a] md:text-4xl" style={{ letterSpacing: "-0.03em" }}>
              Skill up the whole train, not one wagon
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#475569] md:text-lg">
              Private cohorts, volume pricing, and transformation coaching from
              SPCs who have led 30+ enterprise rollouts. We train the way you
              ship.
            </p>
            <Link
              href="/corporate"
              className="liquid-glass mt-8 inline-block rounded-lg border border-[#1f2c4a]/20 px-7 py-3 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
            >
              Explore Corporate Training
            </Link>
          </div>
        </div>
      </section>

      {/* =========================== INSTRUCTORS ========================== */}
      <section className="border-t border-[#1f2c4a]/10 px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Faculty"
            title="Learn from coaches, not content"
            copy="The same consultants who lead Fortune 500 transformations teach every Agile36 cohort."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {INSTRUCTORS.map((person, i) => {
              const isExpanded = expandedInstructor === i;
              return (
              <div
                key={person.name}
                data-reveal
                className="group flex flex-col rounded-2xl liquid-glass p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full border border-[#1f2c4a]/15 object-cover object-top"
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium text-[#1f2c4a]">{person.name}</h3>
                    <p className="text-sm font-medium text-[#d97706]">{person.title}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#64748b]">{person.subtitle}</p>
                <div className="mt-4">
                  <p
                    className={`whitespace-pre-line text-sm leading-relaxed text-[#475569] ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    {person.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setExpandedInstructor(isExpanded ? null : i)}
                    aria-expanded={isExpanded}
                    className="mt-2 text-sm font-semibold text-[#d97706] transition-colors hover:text-[#b45309]"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[#1f2c4a]/10 pt-4">
                  <span className="text-xs font-medium text-[#64748b]">
                    {person.experience} experience
                  </span>
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f2c4a]/20 text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== FAQ =============================== */}
      <section id="faq" className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Before you ask" />
          <div className="mt-12 space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  data-reveal
                  className={`liquid-glass overflow-hidden rounded-2xl transition-colors duration-300 ${
                    open ? "bg-[#1f2c4a]/[0.06]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                  >
                    <span className="text-lg font-medium text-[#1f2c4a]">{faq.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1f2c4a]/20 transition-all duration-300 ${
                        open ? "rotate-45 bg-[#1f2c4a] text-white" : "text-[#1f2c4a]"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-7 pb-6 leading-relaxed text-[#64748b]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ FINAL CTA =========================== */}
      <section className="px-6 pb-24 md:px-12 md:pb-32 lg:px-16">
        <div
          data-reveal
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#1f2c4a]/10 px-8 py-20 text-center md:py-28"
        >
          {/* The same film, returning for the closing scene */}
          <video
            src={HERO_VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={(e) => {
              const el = e.currentTarget;
              if (el.paused) el.play().catch(() => {});
            }}
            className="bg-video absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#64748b]">
            Cohorts fill weeks in advance
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-normal leading-[1.05] text-[#1f2c4a] md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
            Your next certification starts here
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-[#475569] md:text-lg">
            Join 25,000+ professionals who trained with Agile36 — live classes,
            certified instructors, zero fluff.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/courses"
              className="rounded-lg bg-white px-9 py-3.5 font-medium text-[#1f2c4a] transition-colors hover:bg-[#16243f]"
            >
              Find Your Cohort
            </Link>
            <Link
              href="/contact"
              className="liquid-glass rounded-lg border border-[#1f2c4a]/20 px-9 py-3.5 font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
            >
              Ask Us Anything
            </Link>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeVideoHero() {
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>(".hero-section .hero-video");
    if (!video) return;
    const tryPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };
    tryPlay();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && video.paused) tryPlay();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(".hero-video", {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-content", {
          yPercent: -25,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "75% top",
            scrub: true,
          },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="hero-section relative -mt-[75px] flex h-svh min-h-[640px] flex-col overflow-hidden text-white">
      <video
        src={HERO_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={(e) => {
          const el = e.currentTarget;
          if (el.paused) el.play().catch(() => {});
        }}
        className="bg-video hero-video absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-36 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="hero-content relative z-10 flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <AnimatedHeading
              text={"Shaping tomorrow\nwith Agile and AI."}
              className="mb-4 text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
            />
            <FadeIn delay={800} duration={1000}>
              <p className="mb-5 text-base text-white/90 md:text-lg">
                Live SAFe® and AI certification training from the coaches who
                define what comes next.
              </p>
            </FadeIn>
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  onClick={openChat}
                  className="rounded-lg bg-white px-8 py-3 font-medium text-[#1f2c4a] transition-colors hover:bg-white/90"
                >
                  Start a Chat
                </Link>
                <a
                  href="#programs"
                  className="rounded-lg border border-white/30 bg-[#10131c]/40 px-8 py-3 font-medium text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#1f2c4a]"
                >
                  Explore Now
                </a>
              </div>
            </FadeIn>
          </div>
          <div className="mt-10 flex items-end justify-start lg:mt-0 lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="rounded-xl border border-white/25 bg-[#10131c]/40 px-6 py-3 backdrop-blur-md">
                <span className="text-lg font-light text-white md:text-xl lg:text-2xl">
                  Training. Certification. Transformation.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeExperience() {
  return (
    <>
      <HomeVideoHero />
      <HomeExperienceBody />
    </>
  );
}
