"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/* ─────────────── Category previews ───────────────
 *
 * Each entry is an anchor link to the matching tab in <Categories />.
 * Clicking sets the URL hash, which Categories.tsx's hashchange listener
 * picks up to switch tabs and smooth-scroll the section into view.
 * Native <a href="#..."> handles the hash transition without a JS click
 * handler — fewer moving parts, fewer SSR pitfalls. */
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

  return (
    <section
      id="what-we-do"
      className="relative min-h-screen flex flex-col justify-center py-20 md:py-28"
    >
      {/* Background blobs moved to page-level <BackgroundDecor />. */}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-6xl mx-auto px-6 w-full"
      >
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

            {/* Lead paragraph — semantic multi-word chunks are wrapped in
                `whitespace-nowrap` spans so they never break mid-phrase
                across line boundaries. The container's `max-w-[44ch]`
                gives the lines enough room that the last line carries
                more than a couple of words (no typographic widow).
                Em-dash binds to the preceding chunk via NBSP so it
                never lands alone at the start of a new line. */}
            <motion.p
              variants={itemVariants}
              className="mt-5 md:mt-6 text-[14.5px] md:text-[16px] text-gray-600 leading-relaxed max-w-[44ch]"
            >
              An independent crew of{" "}
              <span className="whitespace-nowrap">5 AI engineers</span>. We
              start from{" "}
              <span className="whitespace-nowrap">real-world friction</span>
              {" "}and take ideas all the way to{" "}
              <span className="whitespace-nowrap">production-grade systems</span>
              {" — across research, "}
              <span className="whitespace-nowrap">open source</span>, awards,
              and products.
            </motion.p>
          </div>

          {/* ─── Right column — typography-led anchor list ───
              Border / background / shadow removed entirely. Each entry
              is a 2x2 grid cell with a header row (title + ↗) over a
              hairline divider, with a tone-down description below.
              Hovering shifts title + arrow + underline to violet and
              translates the arrow a hair toward its destination. */}
          <motion.ul
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10"
          >
            {CATEGORY_KEYS.map(({ hash, translationKey }) => {
              const cat = t.whatWeDo.categories[translationKey];
              return (
                <li key={hash}>
                  <a
                    href={hash}
                    onClick={(e) => {
                      // Native anchor behaviour fails when the URL hash
                      // already matches — the browser fires no event and
                      // doesn't scroll. Manually scroll to the Categories
                      // section so a re-click always brings the user back
                      // to it. When the hash is changing, fall through to
                      // the native handler so Categories.tsx's hashchange
                      // listener picks up the tab switch.
                      if (typeof window === "undefined") return;
                      if (window.location.hash === hash) {
                        e.preventDefault();
                        const main = document.querySelector("main");
                        const target = document.getElementById("what-we-build");
                        if (main && target) {
                          main.scrollTo({
                            top: target.offsetTop - 64,
                            behavior: "smooth",
                          });
                        }
                      }
                    }}
                    className="group block transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet rounded-sm"
                  >
                    {/* Header row — title + arrow */}
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground group-hover:text-violet transition-colors duration-200 ease-out">
                        {cat.title}
                      </h3>
                      <ArrowUpRight
                        className="w-5 h-5 text-gray-300 group-hover:text-violet transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Hairline divider — switches to violet on hover */}
                    <div className="mt-3 h-px w-full bg-gray-200 group-hover:bg-violet transition-colors duration-200 ease-out" />

                    {/* Description — toned-down gray */}
                    <p className="mt-3 text-[13.5px] md:text-[14px] text-gray-500 leading-relaxed">
                      {cat.description}
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
