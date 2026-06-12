"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SmoothScroll from "./SmoothScroll";
import {
  CATALOG_COURSES,
  getCatalogCourseUrl,
  type CatalogCourse,
} from "@/app/lib/course-catalog";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRUST_LOGOS = [
  { src: "/logo-amazon.svg", alt: "Amazon" },
  { src: "/apple-11.svg", alt: "Apple" },
  { src: "/accenture-6.svg", alt: "Accenture" },
  { src: "/tesla-9.svg", alt: "Tesla" },
  { src: "/netflix-3.svg", alt: "Netflix" },
  { src: "/disney-2.svg", alt: "Disney" },
];

const TEAM = [
  {
    name: "Deadra Stevenson",
    cred: "CEO & Founder · SAFe® Practice Consultant (SPC) · 20+ years",
    image: "/Deadra.jpeg",
    count: "30+ transformations",
  },
  {
    name: "Marcus Ball",
    cred: "Enterprise Agile Coach · SAFe® Practice Consultant (SPC)",
    image: "/marcus.jpeg",
    count: "15+ years coaching",
  },
  {
    name: "Joe Puoci",
    cred: "Enterprise Agile Coach · SAFe® Practice Consultant (SPC)",
    image: "/Joe.jpeg",
    count: "15+ years coaching",
  },
];

const STATS = [
  { target: 100000, suffix: "+", label: "Professionals trained" },
  { target: 4.94, decimals: 2, suffix: "", label: "Average rating" },
  { target: 25, suffix: "+", label: "Years of experience" },
  { target: 6000, suffix: "+", label: "Companies served" },
];

function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

function courseTags(c: CatalogCourse) {
  return `${c.hours} • LIVE REMOTE • 4.94★ • ${c.enrolled.replace(" Enrolled", "").toUpperCase()} ENROLLED`;
}

/** Wrap each word, then group words into masked lines by their offsetTop. */
function splitLines(el: HTMLElement) {
  const text = el.textContent || "";
  el.textContent = "";
  const words = text.split(/\s+/).filter(Boolean);
  const spans = words.map((w) => {
    const s = document.createElement("span");
    s.textContent = w;
    s.style.display = "inline-block";
    el.appendChild(s);
    // real text-node space between inline-blocks so words keep their gaps
    el.appendChild(document.createTextNode(" "));
    return s;
  });
  const lines: HTMLElement[][] = [];
  let top: number | null = null;
  spans.forEach((s) => {
    if (s.offsetTop !== top) {
      lines.push([]);
      top = s.offsetTop;
    }
    lines[lines.length - 1].push(s);
  });
  el.textContent = "";
  return lines.map((lineWords) => {
    const line = document.createElement("span");
    line.className = "split-line";
    const inner = document.createElement("span");
    inner.className = "split-line__inner";
    lineWords.forEach((w) => {
      inner.appendChild(w);
      inner.appendChild(document.createTextNode(" "));
    });
    line.appendChild(inner);
    el.appendChild(line);
    return inner;
  });
}

export default function CinematicHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [showField, setShowField] = useState(false);

  // Shader only on desktop without reduced motion; re-evaluate on changes
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowField(wide.matches && !reduced.matches);
    update();
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".cine-line, .anim-fade", { clearProps: "all" });
        return;
      }

      // Hero entrance
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(".cine-hero .cine-line", {
          yPercent: 110,
          duration: 1.4,
          stagger: 0.12,
          delay: 0.1,
        })
        .from(
          ".cine-hero .cine-sq",
          { scale: 0, duration: 1, stagger: 0.1 },
          "-=1"
        )
        .from(
          ".cine-hero .anim-fade",
          { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.08 },
          "-=0.8"
        );

      // Split-line masked reveals after fonts are ready
      document.fonts.ready.then(() => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const inners = splitLines(el);
          gsap.from(inners, {
            yPercent: 110,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        ScrollTrigger.refresh();
      });

      // Generic fade-ups outside hero
      gsap.utils
        .toArray<HTMLElement>(".cine-section .anim-fade, .cine-band .anim-fade")
        .forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 28,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

      // Gradient panel reveals + scrub parallax
      gsap.utils.toArray<HTMLElement>(".cine-panel").forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 78%",
          once: true,
          onEnter: () => panel.classList.add("is-visible"),
        });
        gsap.fromTo(
          panel.querySelector(".idx"),
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: panel, scrub: true },
          }
        );
      });

      // Counters
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.counter || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = decimals
              ? obj.v.toFixed(decimals)
              : Math.round(obj.v).toLocaleString("en-US");
          },
        });
      });

      // Marquee drift + scroll-velocity boost
      const track = marqueeRef.current;
      if (track) {
        const drift = gsap.to(track, {
          xPercent: -50,
          ease: "none",
          duration: 22,
          repeat: -1,
        });
        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1200, 3);
            gsap.to(drift, { timeScale: boost, duration: 0.4, overwrite: true });
          },
        });
      }
    },
    { scope: rootRef }
  );

  const courses = CATALOG_COURSES.slice(0, 6);
  const panelKinds = ["gold", "ink", "ember"] as const;

  return (
    <SmoothScroll>
      <div ref={rootRef} className="cine">
        {/* ============================ HERO ============================ */}
        <section className="cine-hero" id="cine-hero">
          {showField ? <HeroField heroSelector="#cine-hero" /> : <div className="cine-hero-static" />}
          <div className="cine-wrap">
            <div className="cine-meta anim-fade">
              <div>
                <b>SAFe® Silver Partner</b>
                <span>#1-rated on Scaled Agile</span>
              </div>
              <div>
                <b>100K+ professionals</b>
                <span>certified</span>
              </div>
              <div>
                <b>Live virtual</b>
                <span>worldwide</span>
              </div>
            </div>

            <h1 className="cine-title">
              <span className="cine-mask">
                <span className="cine-line">
                  Expert<span className="cine-sq" aria-hidden="true" />Training
                </span>
              </span>
              <span className="cine-mask cine-title-indent">
                <span className="cine-line cine-line--sub">
                  Agile·AI·Product
                </span>
              </span>
            </h1>

            <div className="cine-hero-bottom">
              <p className="cine-tagline anim-fade">
                Live virtual SAFe®, Agile &amp; AI certification taught by SPCs
                — not recordings.
              </p>
              <div className="cine-hero-ctas anim-fade">
                <Link href="/courses" className="cine-pill">
                  <span className="lbl lbl--main">Explore courses</span>
                  <span className="lbl lbl--ghost" aria-hidden="true">
                    Explore courses
                  </span>
                </Link>
                <Link href="/test" className="cine-link-quiet">
                  Free practice tests →
                </Link>
              </div>
            </div>

            <div className="cine-trust anim-fade">
              <span className="cine-trust-label">
                Trusted by 6,000+ companies · ★4.94 on Scaled Agile
              </span>
              {TRUST_LOGOS.map((l) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        {/* ========================= MANIFESTO ========================== */}
        <section className="cine-section">
          <div className="cine-wrap">
            <span className="cine-kicker anim-fade">( Why Agile36 )</span>
            <h2 className="cine-display" data-split>
              We don&apos;t read you slides. We train you the way enterprises
              actually work.
            </h2>
            <div className="cine-manifesto-grid">
              <p className="anim-fade">
                Every cohort is taught live by a practicing SAFe® Practice
                Consultant — people who run real transformations between
                classes. That&apos;s why learners rate us 4.94 on Scaled Agile,
                and why exam support is part of the course, not an upsell.
              </p>
              <div className="cine-words anim-fade" aria-hidden="true">
                <span className="w w--ember">Learn.</span>
                <span className="w w--gold">Certify.</span>
                <span className="w">Lead.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================== STATEMENT BAND ======================== */}
        <div className="cine-band">
          <div className="cine-wrap">
            <p className="cine-band-line anim-fade">
              Certification that holds up in the room.
            </p>
          </div>
        </div>

        {/* =========================== COURSES =========================== */}
        <section className="cine-section">
          <div className="cine-wrap">
            <span className="cine-kicker anim-fade">( Certifications )</span>
            <h2 className="cine-display" data-split>
              Courses that move careers.
            </h2>
            <div style={{ marginTop: "6rem" }}>
              {courses.map((c, i) => (
                <article className="cine-row" key={c.id}>
                  <div className={`cine-panel cine-panel--${panelKinds[i % 3]}`}>
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="cover" aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{c.title}</h3>
                    <p className="desc">{c.skills}</p>
                    <p className="tags">{courseTags(c)}</p>
                    <p className="price">
                      {c.privateClass || c.price === 0 ? (
                        <span>Private cohort</span>
                      ) : (
                        <>
                          <span>{formatPrice(c.price)}</span>
                          <s>{formatPrice(c.originalPrice)}</s>
                        </>
                      )}
                    </p>
                    <Link href={getCatalogCourseUrl(c)} className="enroll">
                      Enroll →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <p style={{ marginTop: "4rem" }} className="anim-fade">
              <Link href="/courses" className="cine-link-quiet">
                View all courses →
              </Link>
            </p>
          </div>
        </section>

        {/* ============================ STATS ============================ */}
        <div className="cine-band">
          <div className="cine-wrap">
            <div className="cine-stats">
              {STATS.map((s) => (
                <div key={s.label} className="anim-fade">
                  <p className="num">
                    <span data-counter={s.target} data-decimals={s.decimals ?? 0}>
                      0
                    </span>
                    {s.suffix}
                  </p>
                  <p className="lab">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================== PRACTICE TESTS ====================== */}
        <section className="cine-section">
          <div className="cine-wrap">
            <span className="cine-kicker anim-fade">( Free prep )</span>
            <h2 className="cine-display" data-split>
              Pass the exam before you take it.
            </h2>
            <div className="cine-manifesto-grid">
              <p className="anim-fade">
                Free practice tests built to mirror the real certification
                exams — unlimited attempts, real exam-style questions, instant
                scoring, and analytics that show you exactly where to focus.
              </p>
              <p className="anim-fade" style={{ alignSelf: "end" }}>
                <Link href="/test" className="cine-pill">
                  <span className="lbl lbl--main">Start a free test</span>
                  <span className="lbl lbl--ghost" aria-hidden="true">
                    Start a free test
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* =========================== MARQUEE =========================== */}
        <div className="cine-marquee" aria-hidden="true">
          <div className="track" ref={marqueeRef}>
            {[0, 1].map((dup) => (
              <span className="chunk" key={dup}>
                Live. Not recorded. <em>—</em> #1-rated SAFe® partner{" "}
                <em>—</em> 4.94★ on Scaled Agile <em>—</em> Exam support
                included <em>—</em>{" "}
              </span>
            ))}
          </div>
        </div>

        {/* ============================= TEAM ============================ */}
        <section className="cine-section">
          <div className="cine-wrap">
            <span className="cine-kicker anim-fade">( Your instructors )</span>
            <h2 className="cine-display" data-split>
              Taught by consultants, not presenters.
            </h2>
            <div style={{ marginTop: "5rem" }}>
              {TEAM.map((t) => (
                <div className="cine-team-row anim-fade" key={t.name}>
                  <Image src={t.image} alt={t.name} width={64} height={64} />
                  <div className="who">
                    <b>{t.name}</b>
                    <span>{t.cred}</span>
                  </div>
                  <span className="count">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================== CORPORATE STRIP ===================== */}
        <div className="cine-band">
          <div className="cine-wrap cine-corp">
            <p className="anim-fade">Training teams of 10–10,000?</p>
            <Link href="/corporate" className="cine-pill anim-fade">
              <span className="lbl lbl--main">Corporate training →</span>
              <span className="lbl lbl--ghost" aria-hidden="true">
                Corporate training →
              </span>
            </Link>
          </div>
        </div>

        {/* ========================== FOOTER CTA ========================= */}
        <section className="cine-section">
          <div className="cine-wrap">
            <span className="cine-kicker anim-fade">
              ( Cohorts run every month )
            </span>
            <Link href="/courses" className="cine-giant-link" data-split>
              <span>Find your course →</span>
            </Link>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
