"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { PROJECTS_BY_SECTION, PHASE_LABEL } from "@/constants/projects";
import type { Project } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { PhoneMockup } from "@/components/projects";

const AUTOPLAY_MS = 7000;

/**
 * Products carousel — every `section: "products"` project rendered as a
 * full-width slide. Desktop layout: phone mockup on the left, copy on the
 * right. Mobile (< md): stacked with phone on top.
 *
 * Auto-advances every 7s; user interaction (arrow click, dot click, swipe,
 * keyboard arrow) resets the timer.
 */
export function Products() {
  const products = PROJECTS_BY_SECTION.products;
  const { language } = useLanguage();
  const { processText } = useBudouX();

  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const total = products.length;

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
  }, [total]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
      resetAutoplay();
    },
    [total, resetAutoplay],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Start autoplay on mount
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  // Keyboard arrow support — scoped to the carousel region so off-screen
  // arrow presses can't silently mutate state the user can't see.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    },
    [next, prev],
  );

  if (total === 0) return null;

  return (
    <section id="products" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-section text-violet mb-2 tracking-wide">
            Our Products
          </h2>
          <p className="text-lg md:text-xl text-foreground">
            Mobile apps we&apos;re building right now.
          </p>
        </div>

        {/* Carousel */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Products"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) next();
              else prev();
            }
          }}
        >
          {/* Track (aria-live so slide changes are announced to screen readers) */}
          <div
            aria-live="polite"
            aria-atomic="false"
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                language={language}
                processText={processText}
                isActive={i === index}
                position={i + 1}
                total={total}
              />
            ))}
          </div>

          {/* Arrow controls — hidden if only one product */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous product"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-violet shadow-sm flex items-center justify-center transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next product"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-violet shadow-sm flex items-center justify-center transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {total > 1 && (
          <div
            className="flex justify-center items-center gap-2 mt-6"
            role="tablist"
            aria-label="Select a product"
          >
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-current={i === index ? "true" : undefined}
                aria-label={`Go to ${p.name}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-violet"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────── Card ─────────────── */

interface ProductCardProps {
  product: Project;
  language: "en" | "ko" | "ja";
  processText: (text: string) => ReactNode;
  isActive: boolean;
  position: number;
  total: number;
}

function ProductCard({
  product,
  language,
  processText,
  isActive,
  position,
  total,
}: ProductCardProps) {
  const statusLabel = PHASE_LABEL[product.phase];
  const statusDot =
    product.phase === "in-progress"
      ? "bg-amber-400 animate-pulse"
      : product.phase === "completed"
        ? "bg-emerald-400"
        : "bg-gray-400";

  const appStoreUrl = product.app?.appStoreUrl;

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${product.name} — ${position} of ${total}`}
      aria-hidden={!isActive}
      className="w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6 py-10 md:px-16 md:py-16"
    >
      {/* Phone mockup (left on desktop, top on mobile) */}
      <PhoneMockup
        screenshot={product.app?.screenshot}
        video={product.app?.video}
        alt={`${product.name} app preview`}
        gradient={product.gradient}
      />

      {/* Copy (right on desktop, bottom on mobile) */}
      <div className="flex-1 max-w-xl text-center md:text-left">
        {/* Status badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white border border-gray-200 text-gray-600 mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
          {statusLabel}
        </span>

        {/* Name */}
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-foreground/90 font-medium mb-4">
          {processText(product.tagline[language])}
        </p>

        {/* Description */}
        <p className="text-base text-gray-600 leading-relaxed mb-8">
          {processText(product.description[language])}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          {appStoreUrl ? (
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet text-white text-sm font-medium hover:bg-violet/90 transition-colors"
            >
              App Store
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
              title="Coming soon"
            >
              App Store
            </button>
          )}
          <Link
            href={`/projects/${product.slug}/`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:border-violet hover:text-violet transition-colors"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
