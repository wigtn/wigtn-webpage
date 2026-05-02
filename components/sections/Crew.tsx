"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LightRays from "./LightRays";
import Lightning from "./Lightning";
import { useLanguage } from "@/lib/i18n";

type Phase = "loading" | "entering" | "ready";

export function Crew() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>("loading");
  // Lightning runs once on entrance, then unmounts so the WebGL RAF loop
  // doesn't keep rendering invisible frames for the rest of the session.
  const [showLightning, setShowLightning] = useState(false);
  // LightRays is the calm violet wash that takes over after the lightning
  // bolt has fired. Hidden until the bolt finishes its peak so the two
  // effects don't compete on entrance.
  const [showRays, setShowRays] = useState(false);
  // LightRays is a continuous WebGL canvas — we only render it while the
  // hero is actually on screen. Once the user scrolls past, the canvas is
  // unmounted (kills its RAF loop), and remounted if they scroll back.
  const sectionRef = useRef<HTMLElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    let active = true;
    const img = new window.Image();
    img.src = "/wigtn_logo.png";

    const start = () => {
      if (!active) return;
      requestAnimationFrame(() => {
        if (!active) return;
        setPhase("entering");
        // Fire the lightning bolt with the logo crash, then unmount once
        // its CSS fade-out has finished (animation = 1.4 s + 0.25 s delay).
        setShowLightning(true);
        setTimeout(() => {
          if (active) setShowLightning(false);
        }, 1800);
        // LightRays mounts ~1.5 s after entrance — once the bolt's peak
        // has passed so the two don't compete visually. The CSS
        // `hero-rays-in` keyframe then fades it in to its resting opacity.
        setTimeout(() => {
          if (active) setShowRays(true);
        }, 1500);
        setTimeout(() => {
          if (active) setPhase("ready");
        }, 2200);
      });
    };

    if (img.complete) {
      const t = setTimeout(start, 250);
      return () => {
        active = false;
        clearTimeout(t);
      };
    }

    const onLoad = () => start();
    const onError = () => start();
    const fallback = setTimeout(start, 2500);
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      active = false;
      clearTimeout(fallback);
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, []);

  // Intersection observer — track whether the hero section is on screen.
  // The LightRays canvas (a continuous RAF loop) is conditionally rendered
  // off this flag so it doesn't burn GPU cycles while the user reads the
  // rest of the page. `rootMargin` widens the visibility window slightly
  // so the canvas remounts a hair before the section scrolls back in,
  // avoiding a perceptible flash.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setHeroVisible(entry.isIntersecting);
        }
      },
      { root: null, rootMargin: "100px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animate_ = phase !== "loading";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
    >
      {/* SVG defs — knockout filter + hex pattern */}
      <svg
        aria-hidden
        className="absolute w-0 h-0 pointer-events-none"
        focusable="false"
      >
        <defs>
          <filter id="logo-knockout-white" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
                1  0  0  0  0
                0  1  0  0  0
                0  0  1  0  0
               -1 -1 -1  0  3
              "
              result="luma"
            />
            <feComposite in="luma" in2="SourceGraphic" operator="in" />
          </filter>

          <pattern
            id="hex-dots"
            width="48"
            height="42"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="10.5" r="1" fill="rgba(124,58,237,0.22)" />
            <circle cx="36" cy="10.5" r="1" fill="rgba(124,58,237,0.22)" />
            <circle cx="0" cy="31.5" r="1" fill="rgba(124,58,237,0.22)" />
            <circle cx="24" cy="31.5" r="1" fill="rgba(124,58,237,0.22)" />
            <circle cx="48" cy="31.5" r="1" fill="rgba(124,58,237,0.22)" />
          </pattern>
        </defs>
      </svg>

      {/* ═════ Background — two corner orbs + hex pattern ═════
       *
       *   Two subtle violet/indigo blobs anchored at the top-left and
       *   bottom-right corners. */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 sm:-top-40 sm:-left-40 w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] rounded-full bg-violet/[0.06] sm:bg-violet/[0.09] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 sm:-bottom-40 sm:-right-40 w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] rounded-full bg-indigo-300/[0.06] sm:bg-indigo-300/[0.09] blur-3xl pointer-events-none"
      />

      {/* ═════ LightRays (reactbits) — soft violet rays from above ═════
       *
       *   The canvas blends with `mix-blend-multiply` against the FAFAFA
       *   page background, so each ray pixel multiplies the page's
       *   near-white into a gentle violet tint instead of stamping a
       *   solid-coloured beam onto it. A medium-light violet (#A78BFA)
       *   plus reduced saturation keeps the wash harmonious — visible
       *   enough to read as illumination, not loud enough to fight the
       *   logo. */}
      {/* Soft lavender wash that mounts AFTER the entrance lightning has
         done its job. The shader paints rays as `strength * raysColor`,
         so we tame the otherwise-dark stripes with reduced saturation,
         a wider/more-diffuse beam, more grain, and a low resting opacity.
         The wrapper's `hero-rays-in` keyframe ramps that opacity from 0
         to 0.4 over 1.4 s once the rays mount. */}
      {heroVisible && showRays && (
        <div className="hero-rays-in absolute inset-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#DDD6FE"
            raysSpeed={0.5}
            lightSpread={0.85}
            rayLength={1.4}
            fadeDistance={1.5}
            saturation={0.6}
            noiseAmount={0.08}
            distortion={0.04}
          />
        </div>
      )}

      {/* ═════ One-shot lightning strike during entrance ═════
       *   Whisper-soft: intensity 0.5 + 22 % wrapper opacity. The bolt
       *   barely shows as a faint violet shimmer that flashes through and
       *   disappears — present, not shouty. */}
      {showLightning && (
        <div className="hero-lightning-shot absolute inset-0 pointer-events-none opacity-[0.22]">
          <Lightning
            hue={268}
            speed={1.6}
            intensity={0.5}
            size={1.1}
          />
        </div>
      )}

      {/* Hex-dot lattice — same calm grid texture, centre punched out so the
       *   logo sits on a clean canvas. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black_55%,black_88%,transparent_100%)]"
      >
        <svg className="w-full h-full">
          <rect width="100%" height="100%" fill="url(#hex-dots)" />
        </svg>
      </div>

      {/* ═════ Centred content ═════
       *   Logo + two shimmer slogan lines. Logo restored on top so the
       *   brand anchor reads first; the surrounding sections carry the
       *   proof signals. */}
      <div className="relative z-30 text-center px-6 flex flex-col items-center">
        <div className={animate_ ? "hero-logo-in" : "opacity-0"}>
          <Image
            src="/images/wigtn_logo_banner.jpg"
            alt="WIGTN"
            width={920}
            height={280}
            priority
            unoptimized
            className="block mx-auto h-16 sm:h-20 md:h-24 lg:h-28 w-auto mb-12 md:mb-16"
          />
        </div>

        <div className={animate_ ? "hero-tagline-in" : "opacity-0"}>
          <p className="tagline-shimmer text-balance text-base sm:text-lg max-w-md md:max-w-2xl mx-auto leading-relaxed px-2">
            {t.hero.taglineLight}
          </p>
          <p className="tagline-shimmer-strong text-balance mt-3 text-xl sm:text-2xl md:text-3xl font-semibold max-w-md md:max-w-2xl mx-auto leading-snug tracking-tight px-2">
            {t.hero.taglineStrong}
          </p>
        </div>
      </div>

      {/* Loading overlay — white-tone backdrop matches the rest of the page
          so the transition into the hero is seamless. A single violet ring
          spinner keeps the screen alive without competing with the logo. */}
      {phase !== "ready" && (
        <div
          aria-hidden={phase !== "loading"}
          className="absolute inset-0 z-50 pointer-events-none bg-[#FAFAFA] transition-opacity duration-700 ease-out"
          style={{ opacity: phase === "loading" ? 1 : 0 }}
        >
          {/* Centering wrapper — keeps the translate(-50%, -50%) on its own
              transform so the inner SVG's rotation doesn't fight with it.
              `animate-spin` overrides `transform`, so if it lived on the SVG
              with the centering classes the rotate would replace the
              translate and the spinner would drift instead of spin. */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="animate-spin block"
              style={{ animationDuration: "0.9s" }}
              width="40"
              height="40"
              viewBox="0 0 50 50"
              aria-label="Loading"
            >
              {/* Track ring */}
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
              {/* Active arc */}
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="90 126"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
