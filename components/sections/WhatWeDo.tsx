"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { HOME_STATS } from "@/constants/projects";

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
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Quiet violet washes — same vocabulary as the rest of the site. */}
      <div
        aria-hidden
        className="absolute -top-40 -left-32 w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full bg-violet/[0.06] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full bg-indigo-200/[0.16] blur-3xl pointer-events-none"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-6xl mx-auto px-6 w-full"
      >
        <div className="max-w-2xl">
          {/* Eyebrow + one header + one short paragraph + a single-
              column stat list. Everything left-aligned at the same gutter. */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-3"
          >
            <span className="w-6 h-px bg-violet/40" />
            <span>{t.whatWeDo.eyebrow}</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-balance text-lg md:text-xl font-semibold text-foreground tracking-tight leading-snug"
          >
            {t.whatWeDo.heading}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-3 text-[14px] md:text-[15px] text-gray-600 leading-relaxed"
          >
            {processText(t.whatWeDo.lead)}
          </motion.p>

          {/* Stats — vertical 1-column stack, no big font, no animation
              panel. Each row is just `[value] [label]` so the four
              outputs read as a tight list. */}
          <motion.dl
            variants={itemVariants}
            className="mt-7 divide-y divide-black/[0.06] border-y border-black/[0.06]"
          >
            {HOME_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-4 py-2.5"
              >
                <dt className="w-6 text-[15px] font-semibold text-foreground tabular-nums">
                  {stat.value}
                </dt>
                <dd className="text-[14px] text-gray-600">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
