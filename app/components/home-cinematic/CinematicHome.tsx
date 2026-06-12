"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SmoothScroll from "./SmoothScroll";
import { HomeExperienceBody } from "@/app/components/home/HomeExperience";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

/** Register GSAP plugins only in the browser — never during SSR module evaluation. */
function ensureGsapPlugins() {
  if (typeof window === "undefined") return false;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  return true;
}

export default function CinematicHome() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gsapPluginsReady = useRef(false);
  const [showField, setShowField] = useState(false);

  if (!gsapPluginsReady.current) {
    gsapPluginsReady.current = ensureGsapPlugins();
  }

  useEffect(() => {
    document.documentElement.dataset.homeHero = "cinematic";
    return () => {
      delete document.documentElement.dataset.homeHero;
    };
  }, []);

  // Particle field runs on all screen sizes; only reduced-motion turns it off.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowField(!reduced.matches);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      ensureGsapPlugins();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".cine-line, .anim-fade", { clearProps: "all" });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(".cine-hero .cine-line", {
          yPercent: 110,
          duration: 1.4,
          stagger: 0.12,
          delay: 0.1,
        })
        .from(
          ".cine-hero .anim-fade",
          { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.08 },
          "-=0.9"
        );
    },
    { scope: heroRef }
  );

  return (
    <SmoothScroll>
      <div ref={heroRef} className="cine">
        <section className="cine-hero" id="cine-hero">
          {showField ? (
            <HeroField heroSelector="#cine-hero" />
          ) : (
            <div className="cine-hero-static" />
          )}
          <div className="cine-wrap">
            <h1 className="cine-title">
              <span className="cine-mask">
                <span className="cine-line">Shaping tomorrow</span>
              </span>
              <span className="cine-mask">
                <span className="cine-line">
                  with{" "}
                  <span className="cine-title-accent">Agile and AI.</span>
                </span>
              </span>
            </h1>

            <div className="cine-hero-bottom">
              <p className="cine-tagline anim-fade">
                Live SAFe® and AI certification training from the coaches who
                define what comes next.
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
          </div>
        </section>
      </div>
      <HomeExperienceBody externalScroll />
    </SmoothScroll>
  );
}
