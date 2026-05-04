"use client";

import { useEffect, useState } from "react";
import Lightning from "./Lightning";
import { useLanguage } from "@/lib/i18n";

type Phase = "loading" | "entering" | "ready";

export function Crew() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>("loading");
  // Lightning runs once on entrance, then unmounts so the WebGL RAF loop
  // doesn't keep rendering invisible frames for the rest of the session.
  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    let active = true;
    const img = new window.Image();
    img.src = "/wigtn_logo.png";

    const start = () => {
      if (!active) return;
      requestAnimationFrame(() => {
        if (!active) return;
        setPhase("entering");
        // Fire the lightning bolt with the entrance, then unmount once
        // its CSS fade-out has finished (animation = 1.4 s + 0.25 s delay).
        setShowLightning(true);
        setTimeout(() => {
          if (active) setShowLightning(false);
        }, 1800);
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

  const animate_ = phase !== "loading";

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* SVG defs — knockout filter kept for a future logo asset; the
          hex-dot pattern + LightRays canvas were removed to declutter
          the Hero. */}
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
        </defs>
      </svg>

      {/* ═════ Background — two corner orbs ═════
       *
       *   Zigzag pattern across the page: this section anchors orbs at
       *   top-LEFT (violet) + bottom-RIGHT (indigo). The next section
       *   (WhatWeDo) picks up on the right side at top-RIGHT, then flips
       *   to bottom-LEFT — and so on. Strength bumped ~50% over the
       *   previous values so the gradient reads clearly.  */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 sm:-top-40 sm:-left-40 w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] rounded-full bg-violet/[0.09] sm:bg-violet/[0.13] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 sm:-bottom-40 sm:-right-40 w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] rounded-full bg-indigo-300/[0.09] sm:bg-indigo-300/[0.13] blur-3xl pointer-events-none"
      />

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

      {/* ═════ Centred content ═════
       *   Two shimmer slogan lines. Logo removed pending a transparent
       *   asset — the JPG had a white frame that didn't blend cleanly.
       *   The section's outer flexbox (`items-center justify-center` on
       *   the <section>) handles vertical + horizontal centering. */}
      <div className="relative z-30 text-center px-6">
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
          spinner keeps the screen alive while the entrance prepares. */}
      {phase !== "ready" && (
        <div
          aria-hidden={phase !== "loading"}
          className="absolute inset-0 z-50 pointer-events-none bg-[#FAFAFA] transition-opacity duration-700 ease-out"
          style={{ opacity: phase === "loading" ? 1 : 0 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="animate-spin block"
              style={{ animationDuration: "0.9s" }}
              width="40"
              height="40"
              viewBox="0 0 50 50"
              aria-label="Loading"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
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
