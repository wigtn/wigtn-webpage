"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

/* ─────────────── Category previews ───────────────
 *
 * Each card here is a one-line introduction to a category that lives
 * fully expanded in the <Categories /> tabbed section below. Clicking a
 * card sets the URL hash, which `Categories.tsx`'s hashchange listener
 * picks up to switch to the matching tab and smooth-scroll the section
 * into view. Native <a href="#..."> handles the hash transition without
 * a JS click handler — fewer moving parts, fewer SSR pitfalls. */
const CATEGORY_KEYS = [
  { hash: "#research", translationKey: "research" as const },
  { hash: "#awards", translationKey: "awards" as const },
  { hash: "#open-source", translationKey: "openSource" as const },
  { hash: "#products", translationKey: "products" as const },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhatWeDo() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section
      id="what-we-do"
      className="relative min-h-screen flex flex-col justify-center py-20 md:py-28 overflow-hidden"
    >
      {/* Zigzag blob continuation — Crew ends bottom-RIGHT, so this
          section opens with top-RIGHT to keep the violet flowing on the
          same side. Closes at bottom-LEFT, handing off to Categories'
          top-LEFT. Strength +50% over prior values. */}
      <div
        aria-hidden
        className="absolute -top-40 -right-32 w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full bg-violet/[0.09] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-24 w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full bg-violet/[0.13] blur-3xl pointer-events-none"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-6xl mx-auto px-6 w-full"
      >
        {/* Two-column grid on lg+: heading/lead on the left, category
            cards on the right. `items-center` keeps the left text block
            and the right card grid vertically balanced — without it the
            short heading sat near the top while the taller card column
            stretched below, breaking the visual centerline. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* ─── Left column — eyebrow + display heading + lead ─── */}
          <div>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-4"
            >
              <span className="w-6 h-px bg-violet/40" />
              <span>{t.whatWeDo.eyebrow}</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-balance text-4xl md:text-5xl font-semibold text-foreground tracking-[-0.02em] leading-[1.1]"
            >
              {t.whatWeDo.heading}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-5 md:mt-6 text-[14.5px] md:text-[16px] text-gray-600 leading-relaxed max-w-md"
            >
              {processText(t.whatWeDo.lead)}
            </motion.p>
          </div>

          {/* ─── Right column — 2×2 category preview grid ───
              Each card is an anchor to the matching tab in <Categories />.
              Clicking sets the hash, which the Categories component picks
              up via its hashchange listener (switches tab + smooth-scrolls). */}
          <motion.ul
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
          >
            {CATEGORY_KEYS.map(({ hash, translationKey }) => {
              const cat = t.whatWeDo.categories[translationKey];
              return (
                <li key={hash}>
                  <a
                    href={hash}
                    className="group relative flex flex-col h-full rounded-xl border border-black/[0.07] bg-white/70 backdrop-blur-sm p-5 md:p-6 transition-[border,box-shadow,transform] duration-300 hover:-translate-y-[2px] hover:border-violet/40 hover:shadow-[0_18px_40px_-22px_rgba(76,29,149,0.28)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight group-hover:text-violet transition-colors">
                        {cat.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-violet transition-colors flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="mt-2 text-[13px] md:text-[13.5px] text-gray-600 leading-relaxed">
                      {processText(cat.description)}
                    </p>
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
