"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hero particle wave field. All motion lives in the vertex shader so per-frame
 * CPU cost is ~zero. Pauses when offscreen; flattens as the hero scrolls away;
 * swells gently around the cursor. Desktop only — the page renders a static
 * gradient instead on mobile / reduced motion (see CinematicHome).
 */
export default function HeroField({ heroSelector }: { heroSelector: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    gsap.registerPlugin(ScrollTrigger);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.2, 7.5);
    camera.lookAt(0, 0, 0);

    const COLS = 180;
    const ROWS = 90;
    const W = 26;
    const D = 13;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i * 3] = (c / (COLS - 1) - 0.5) * W;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r / (ROWS - 1) - 0.5) * D;
        seeds[i] = Math.random();
        i++;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uInk: { value: new THREE.Color("#141414") },
      uGoldA: { value: new THREE.Color("#F5B942") },
      uGoldB: { value: new THREE.Color("#FF8A3D") },
      uBronzeA: { value: new THREE.Color("#B07A10") },
      uBronzeB: { value: new THREE.Color("#8a5a08") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uMouse;
        uniform float uPixelRatio;
        attribute float aSeed;
        varying float vElevation;
        varying float vSeed;
        varying float vX;

        void main() {
          vec3 p = position;
          float t = uTime;
          float elevation =
            sin(p.x * 0.55 + t) * 0.55 +
            sin(p.z * 0.85 + t * 1.4) * 0.35 +
            sin((p.x + p.z) * 0.35 + t * 0.8) * 0.45;

          // cursor-follow swell
          float dMouse = distance(p.xz, uMouse * vec2(13.0, 6.5));
          elevation += smoothstep(4.5, 0.0, dMouse) * 1.2;

          // sea flattens as the hero scrolls away
          elevation *= (1.0 - uScroll * 0.85);

          p.y += elevation;
          vElevation = elevation;
          vSeed = aSeed;
          vX = position.x / 13.0;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.6 + aSeed * 1.8) * uPixelRatio * (6.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uInk;
        uniform vec3 uGoldA;
        uniform vec3 uGoldB;
        uniform vec3 uBronzeA;
        uniform vec3 uBronzeB;
        varying float vElevation;
        varying float vSeed;
        varying float vX;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          if (length(uv) > 0.5) discard;

          float energy = smoothstep(0.15, 1.3, abs(vElevation));
          float side = smoothstep(-0.4, 0.6, vX);
          vec3 warm = mix(uGoldA, uGoldB, vSeed);
          vec3 deep = mix(uBronzeA, uBronzeB, vSeed);
          vec3 hue = mix(warm, deep, side);
          vec3 color = mix(uInk, hue, energy);
          float alpha = (0.25 + energy * 0.65) * (0.55 + vSeed * 0.45);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -0.12;
    scene.add(points);

    // eased cursor
    const target = new THREE.Vector2(0, 0);
    const onPointer = (e: PointerEvent) => {
      target.set(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      );
    };
    window.addEventListener("pointermove", onPointer);

    // hero progress -> uScroll
    const st = ScrollTrigger.create({
      trigger: heroSelector,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        uniforms.uScroll.value = self.progress;
      },
    });

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // pause rendering offscreen
    let active = true;
    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    });
    io.observe(mount);

    const start = performance.now();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;
      uniforms.uTime.value = (performance.now() - start) / 1000;
      uniforms.uMouse.value.lerp(target, 0.05);
      camera.position.x = uniforms.uMouse.value.x * 0.5;
      camera.position.y = 2.2 + uniforms.uMouse.value.y * 0.25;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      st.kill();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [heroSelector]);

  return <div ref={mountRef} className="cine-hero-canvas" aria-hidden="true" />;
}
