"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS_BY_SECTION, PHASE_LABEL } from "@/constants/projects";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { PhoneMockup } from "@/components/projects";

/** Parse the structured "key::value\nkey::value" description format. */
function parseDescription(raw: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const idx = line.indexOf("::");
    if (idx !== -1) {
      map[line.slice(0, idx)] = line.slice(idx + 2);
    }
  }
  return map;
}

const PHASE_KEYS = ["before", "during", "after"] as const;

/* Direction-aware horizontal slide variants — paginating forward sends the
 * old slide off to the left and brings the new one in from the right; the
 * scale + rotate at the edges add a touch of motion without making the
 * transition disorienting. */
const SLIDE_VARIANTS: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 220 : -220,
    opacity: 0,
    scale: 0.92,
    rotate: direction > 0 ? 4 : -4,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -220 : 220,
    opacity: 0,
    scale: 0.92,
    rotate: direction > 0 ? -4 : 4,
  }),
};

/* Ambient blob morphs colour and scales subtly as we transition between
 * products. Using a separate variants object for it (driven off the same
 * `direction` custom prop) lets the blob animate independently of the
 * slide content and gives the section a distinct "atmosphere shift" feel. */
const BLOB_VARIANTS: Variants = {
  enter: { opacity: 0, scale: 0.85 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
};

/* Past these thresholds (offset OR velocity) we count the gesture as a
 * page-turn rather than a hesitation drag. */
const SWIPE_OFFSET = 80;
const SWIPE_VELOCITY = 400;

export function Products() {
  const products = PROJECTS_BY_SECTION.products;
  const { processText } = useBudouX();
  const [[current, direction], setPage] = useState<[number, number]>([0, 0]);

  if (products.length === 0) return null;

  const product = products[current];
  const statusLabel = PHASE_LABEL[product.phase];
  const statusDot =
    product.phase === "in-progress"
      ? "bg-amber-400 animate-pulse"
      : product.phase === "completed"
        ? "bg-emerald-400"
        : "bg-gray-400";

  const desc = parseDescription(product.description);
  const total = products.length;

  const paginate = (delta: number) => {
    const next = current + delta;
    if (next < 0 || next >= total) return;
    setPage([next, delta]);
  };

  const goTo = (i: number) => {
    if (i === current) return;
    setPage([i, i > current ? 1 : -1]);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -SWIPE_OFFSET || velocity < -SWIPE_VELOCITY) {
      paginate(1);
    } else if (offset > SWIPE_OFFSET || velocity > SWIPE_VELOCITY) {
      paginate(-1);
    }
  };

  const hasPrev = current > 0;
  const hasNext = current < total - 1;

  return (
    <section
      id="products"
      className="relative min-h-screen py-10 md:py-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Faint dot grid texture, masked to the centre so the edges fade
          out cleanly into the page background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4] pointer-events-none [background-image:radial-gradient(rgba(124,58,237,0.10)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-12 flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-3 md:mb-4">
              <span className="w-6 h-px bg-violet/40" />
              <span>Our products</span>
            </div>
            <h2 className="text-balance text-[24px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] leading-[1.1] md:leading-[1.05]">
              Mobile apps we&apos;re building right now.
            </h2>
          </div>
          {total > 1 && (
            <div className="flex items-baseline gap-2 tabular-nums">
              <span className="text-xl md:text-3xl font-bold text-foreground">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-gray-400">
                / {String(total).padStart(2, "0")}
              </span>
            </div>
          )}
        </motion.div>

        {/* ──────── Stage — no box, free-floating phone ──────── */}
        <div className="relative md:min-h-[640px] flex items-center">
          {/* Ambient glow blob — colour morphs with each product. Sits
              behind everything so the phone reads as floating in light. */}
          <AnimatePresence custom={direction}>
            <motion.div
              key={`blob-${product.id}`}
              custom={direction}
              variants={BLOB_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
              className={`absolute left-1/4 top-1/2 -translate-y-1/2 w-[680px] h-[680px] md:w-[820px] md:h-[820px] rounded-full bg-gradient-to-br ${product.gradient} opacity-30 md:opacity-40 blur-[100px] md:blur-[140px] pointer-events-none`}
            />
          </AnimatePresence>

          {/* Slide content — phone + copy. Drag-enabled across both. */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={product.id}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 280, damping: 32 },
                rotate: { type: "spring", stiffness: 200, damping: 24 },
                scale: { type: "spring", stiffness: 200, damping: 24 },
                opacity: { duration: 0.25 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 w-full items-center cursor-grab active:cursor-grabbing select-none px-2 md:px-4 py-2 md:py-8"
            >
              {/* Phone — static, no float animation. */}
              <div className="relative pointer-events-none flex justify-center md:justify-start drop-shadow-[0_30px_50px_rgba(76,29,149,0.25)]">
                <PhoneMockup
                  screenshot={product.app?.screenshot}
                  video={product.app?.video}
                  alt={`${product.name} app preview`}
                  gradient={product.gradient}
                />
              </div>

              {/* Copy column */}
              <div className="relative flex-1 max-w-xl flex flex-col text-left">
                <div className="mb-2 md:mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full border border-gray-200 bg-white/80 backdrop-blur text-gray-600 mb-2 md:mb-4">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                    {statusLabel}
                  </span>
                  <h3 className="text-[24px] md:text-[44px] font-bold text-foreground mb-1 md:mb-2 tracking-tight leading-[1.05]">
                    {product.name}
                  </h3>
                  <p className="text-[13px] md:text-lg text-foreground/80 font-medium leading-snug">
                    {processText(product.tagline)}
                  </p>
                </div>

                {/* 3-phase narrative — title only on mobile, full on desktop */}
                <div className="flex-1 flex flex-col gap-2 md:gap-4 mt-1 md:mt-2">
                  {PHASE_KEYS.map((key, i) => (
                    <div
                      key={key}
                      className="grid grid-cols-[auto_1fr] gap-x-3 md:gap-x-4 items-baseline"
                    >
                      <span className="text-[10px] md:text-[11px] font-semibold text-violet/70 tabular-nums tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-[10.5px] md:text-[11px] font-semibold text-foreground uppercase tracking-[0.14em] mb-0.5 md:mb-1">
                          {desc[`${key}_title`]}
                        </h4>
                        <p className="text-[12px] md:text-sm text-gray-600 leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-none">
                          {processText(desc[key] ?? "")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Store buttons */}
                <div className="flex flex-wrap items-center justify-start gap-2 md:gap-3 mt-3 md:mt-6">
                  {product.app?.appStoreUrl ? (
                    <a
                      href={product.app.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onPointerDown={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 md:gap-2.5 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl bg-foreground text-white text-[12px] md:text-sm font-medium hover:bg-foreground/90 transition-colors"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      App Store
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 md:gap-2.5 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl bg-gray-200 text-gray-500 text-[12px] md:text-sm font-medium cursor-not-allowed"
                      title="Coming soon"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      App Store
                    </button>
                  )}
                  {product.app?.playStoreUrl ? (
                    <a
                      href={product.app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onPointerDown={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 md:gap-2.5 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl bg-foreground text-white text-[12px] md:text-sm font-medium hover:bg-foreground/90 transition-colors"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.144 1.24a1 1 0 0 1 0 1.724l-2.144 1.24-2.53-2.53 2.53-2.674zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/></svg>
                      Google Play
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 md:gap-2.5 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl bg-gray-200 text-gray-500 text-[12px] md:text-sm font-medium cursor-not-allowed"
                      title="Coming soon"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.144 1.24a1 1 0 0 1 0 1.724l-2.144 1.24-2.53-2.53 2.53-2.674zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/></svg>
                      Google Play
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows. Mobile: positioned at the phone's vertical centre
              (top:180px = half of the 360px mobile phone height + ~12px
              top margin from py-2) so they hover beside the device, not
              over the copy text underneath. Desktop: original mid-stage
              position. */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                disabled={!hasPrev}
                className="absolute left-1 md:-left-2 top-[180px] md:top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur border border-black/[0.06] shadow-[0_8px_24px_-8px_rgba(76,29,149,0.25)] flex items-center justify-center text-gray-600 hover:text-violet hover:border-violet/40 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                disabled={!hasNext}
                className="absolute right-1 md:-right-2 top-[180px] md:top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur border border-black/[0.06] shadow-[0_8px_24px_-8px_rgba(76,29,149,0.25)] flex items-center justify-center text-gray-600 hover:text-violet hover:border-violet/40 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.2} />
              </button>
            </>
          )}
        </div>

        {/* Pagination — labeled product chips with violet underline highlight */}
        {total > 1 && (
          <div className="mt-8 md:mt-10 flex items-center justify-center gap-2 md:gap-3 flex-wrap">
            {products.map((p, i) => {
              const active = i === current;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${p.name}`}
                  aria-current={active}
                  className={`group relative inline-flex items-center gap-2 px-3.5 md:px-4 py-2 rounded-full border text-[12px] md:text-[13px] font-semibold tracking-wide transition-all ${
                    active
                      ? "bg-foreground text-white border-foreground"
                      : "bg-white text-gray-500 border-black/[0.08] hover:border-violet/40 hover:text-violet"
                  }`}
                >
                  <span className="tabular-nums text-[10px] opacity-70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
