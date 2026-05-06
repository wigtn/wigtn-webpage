"use client";

import { useEffect, useState } from "react";

type Phase = "loading" | "entering" | "ready";

export function Crew() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    let active = true;
    const img = new window.Image();
    img.src = "/wigtn_logo.png";

    const start = () => {
      if (!active) return;
      requestAnimationFrame(() => {
        if (!active) return;
        setPhase("entering");
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

      {/* Background blobs moved to page-level <BackgroundDecor /> so the
          violet ambient gradient flows continuously across the entire
          page. `overflow-hidden` is kept on the section as a safety
          rail in case any descendant (e.g. tagline-in animation) ever
          translates past the viewport edges. */}

      {/* ═════ Centred content ═════
       *   Two shimmer slogan lines. The hierarchy is identity-first:
       *   the large/bold heading declares who we are, and the small/gray
       *   line below carries the working-mode cadence. Copy is rendered
       *   inline (rather than via the t.hero strings) so we can wrap
       *   `AI-native` and `peer-reviewed` in `whitespace-nowrap` spans —
       *   those hyphenated words otherwise break across lines on narrow
       *   viewports.
       *   The section's outer flexbox (`items-center justify-center` on
       *   the <section>) handles vertical + horizontal centering. */}
      <div className="relative z-30 text-center px-6">
        <div className={animate_ ? "hero-tagline-in" : "opacity-0"}>
          <p className="tagline-shimmer-strong text-balance text-3xl sm:text-4xl md:text-5xl font-semibold max-w-2xl md:max-w-3xl mx-auto leading-[1.1] tracking-tight px-2">
            An <span className="whitespace-nowrap">AI-native</span> engineering crew.
          </p>
          <p className="tagline-shimmer text-balance mt-4 md:mt-5 text-xl sm:text-2xl max-w-xl md:max-w-2xl mx-auto leading-snug px-2">
            Built fast. Shipped often. Sometimes{" "}
            <span className="whitespace-nowrap">peer-reviewed</span>.
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
