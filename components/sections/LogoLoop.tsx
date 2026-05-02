"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * LogoLoop — reactbits-inspired infinite horizontal scroller.
 *
 * Renders a continuous, seamless horizontal scroll of logos / images. Uses
 * requestAnimationFrame against a measured "set width" so the scroll wraps
 * cleanly at the seam regardless of how many items there are. Pauses on
 * hover and when the component scrolls out of view (so it doesn't burn GPU
 * cycles for content the user isn't looking at).
 *
 * Two ways to feed items:
 *   • Image variant — `{ src, alt?, href? }[]`
 *   • Node variant  — `{ node, title?, href? }[]`
 * Pass either via the `logos` prop. Internally every item is rendered at
 * `logoHeight` px tall; widths fall out from the source's natural ratio.
 */

interface ImageLogo {
  src: string;
  alt?: string;
  href?: string;
}

interface NodeLogo {
  node: ReactNode;
  title?: string;
  href?: string;
}

type LoopItem = ImageLogo | NodeLogo;

function isImageLogo(item: LoopItem): item is ImageLogo {
  return "src" in item;
}

interface LogoLoopProps {
  logos: LoopItem[];
  /** Pixels per second (default 80). */
  speed?: number;
  direction?: "left" | "right";
  /** Item height in px (default 48). */
  logoHeight?: number;
  /** Gap between items in px (default 40). */
  gap?: number;
  /** Pause animation while the cursor is over the strip. */
  pauseOnHover?: boolean;
  /** Subtle scale-up on per-item hover. */
  scaleOnHover?: boolean;
  /** Mask the strip's edges so items fade in/out instead of clipping. */
  fadeOut?: boolean;
  /**
   * Background colour the fade should resolve to. Used as fallback when
   * `mask-image` isn't supported. */
  fadeOutColor?: string;
  className?: string;
  ariaLabel?: string;
}

export function LogoLoop({
  logos,
  speed = 80,
  direction = "left",
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true,
  scaleOnHover = false,
  fadeOut = true,
  fadeOutColor = "#FAFAFA",
  className = "",
  ariaLabel = "Logo carousel",
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const setRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [setWidth, setSetWidth] = useState(0);

  // Measure the width of a single (un-duplicated) set of logos. We render
  // two copies side-by-side; once the offset crosses one set width, we wrap
  // back by that amount so the loop appears continuous.
  useEffect(() => {
    const setEl = setRef.current;
    if (!setEl) return;

    const measure = () => {
      // Width of the items + the trailing gap between sets, so wrap is
      // exactly seamless (no double-gap at the seam).
      setSetWidth(setEl.scrollWidth + gap);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(setEl);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [logos, logoHeight, gap]);

  // Pause when off-screen — IntersectionObserver flips the state and the
  // RAF tick early-returns without advancing the offset. Keeps the device
  // GPU idle for the rest of the page.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setPaused(!e.isIntersecting);
      },
      { threshold: 0, rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Animation loop — rAF translates the track by speed*dt every frame and
  // wraps the offset when it crosses one full set.
  useEffect(() => {
    if (setWidth === 0) return;
    const sign = direction === "left" ? -1 : 1;

    const tick = (now: number) => {
      const isPaused = paused || (pauseOnHover && hovered);

      if (isPaused) {
        lastTimeRef.current = now;
      } else {
        if (lastTimeRef.current === null) lastTimeRef.current = now;
        const dt = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;
        offsetRef.current += sign * speed * dt;

        // Wrap into [-setWidth, 0] for left, [0, setWidth] for right
        if (sign < 0) {
          while (offsetRef.current <= -setWidth) offsetRef.current += setWidth;
        } else {
          while (offsetRef.current >= setWidth) offsetRef.current -= setWidth;
        }
        const t = trackRef.current;
        if (t) t.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [setWidth, speed, direction, paused, pauseOnHover, hovered]);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => setHovered(false), []);

  const containerStyle: CSSProperties = useMemo(() => {
    if (!fadeOut) return {};
    const mask =
      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";
    return {
      maskImage: mask,
      WebkitMaskImage: mask,
      // fadeOutColor is referenced for non-mask fallback environments — kept
      // as a CSS custom prop so consumers can use it in surrounding chrome.
      ["--logo-loop-fade-color" as string]: fadeOutColor,
    };
  }, [fadeOut, fadeOutColor]);

  const renderItem = (item: LoopItem, key: string) => {
    const inner = isImageLogo(item) ? (
      <Image
        src={item.src}
        alt={item.alt ?? ""}
        width={Math.round(logoHeight * 1.78)}
        height={logoHeight}
        loading="lazy"
        className="block h-full w-auto object-cover rounded-lg"
        unoptimized
      />
    ) : (
      <div className="flex items-center" title={item.title}>
        {item.node}
      </div>
    );

    const itemClass = `flex-shrink-0 ${
      scaleOnHover
        ? "transition-transform duration-300 ease-out hover:scale-[1.06]"
        : ""
    }`;

    if (item.href) {
      return (
        <a
          key={key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ height: logoHeight }}
          className={itemClass}
        >
          {inner}
        </a>
      );
    }
    return (
      <div key={key} style={{ height: logoHeight }} className={itemClass}>
        {inner}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {/* Two copies, side by side. The first is measured to derive the
            wrap width; visually they're identical. */}
        <div
          ref={setRef}
          className="flex flex-shrink-0"
          style={{ gap: `${gap}px` }}
        >
          {logos.map((item, i) => renderItem(item, `a-${i}`))}
        </div>
        <div className="flex flex-shrink-0" style={{ gap: `${gap}px` }}>
          {logos.map((item, i) => renderItem(item, `b-${i}`))}
        </div>
      </div>
    </div>
  );
}
