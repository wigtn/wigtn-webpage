"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { HOME_STATS } from "@/constants/projects";
import { LogoLoop } from "./LogoLoop";

const CAROUSEL_IMAGES = [
  "/images/carousel/snowflake-hackathon-stage.jpg",
  "/images/carousel/wigvo-test1.jpg",
  "/images/carousel/trae_hackthon_seoul.png",
  "/images/carousel/wigtnocr-huggingface.png",
  "/images/carousel/wigtn-flake-cortex.jpg",
  "/images/carousel/wigvo_logo.png",
  "/images/carousel/Gemini3_seoul_hackthon.jpg",
  "/images/carousel/wigss-npm.png",
  "/images/carousel/timelens_hero.png",
  "/images/carousel/trae_hackthon_seoul2.jpg",
  "/images/carousel/wigvo-test2.jpg",
  "/images/carousel/llm-loadtester-dashboard.png",
  "/images/carousel/cursor-hackthon-seoul.jpg",
  "/images/carousel/wigtnocr-logo.png",
  "/images/carousel/timelens_logo.png",
  "/images/carousel/wigvo_screenshot_call.png",
];

const CAROUSEL_LOGOS = CAROUSEL_IMAGES.map((src) => ({
  src,
  alt: "Project preview",
}));

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

export function About() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section
      id="about"
      className="relative min-h-screen py-16 md:py-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Quiet violet wash */}
      <div
        aria-hidden
        className="absolute -top-40 -left-32 w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full bg-violet/[0.06] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full bg-violet/[0.10] blur-3xl pointer-events-none"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-5xl mx-auto px-7 md:px-5 w-full text-left md:text-center"
      >
        {/* Editorial pull-quote — load-bearing positioning line promoted from
            the footer. Sits above the eyebrow as the section's first read so
            the team's stance lands before the explanatory copy. */}
        <motion.blockquote
          variants={itemVariants}
          className="text-balance text-[18px] sm:text-[22px] md:text-[28px] font-medium text-foreground tracking-tight leading-snug italic md:mx-auto md:max-w-3xl mb-10 md:mb-14"
        >
          &ldquo;{t.hero.tagline}&rdquo;
        </motion.blockquote>

        {/* Eyebrow — left-aligned on mobile, centred on desktop */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-4 md:mb-6 md:justify-center"
        >
          <span className="w-6 h-px bg-violet/40" />
          <span>About us</span>
          <span className="hidden md:inline-block w-6 h-px bg-violet/40" />
        </motion.div>

        {/* Headline — left on mobile, centred on desktop */}
        <motion.h2
          variants={itemVariants}
          className="text-balance text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] text-foreground font-semibold tracking-tight leading-[1.25] md:leading-[1.2] md:mx-auto md:max-w-4xl"
        >
          {t.about.heading}
        </motion.h2>

        {/* Paragraphs — left on mobile, centred on desktop */}
        <div className="mt-5 md:mt-8 md:max-w-[72ch] md:mx-auto space-y-4 md:space-y-5">
          {t.about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-[14.5px] md:text-[17px] text-gray-600 leading-[1.7] md:leading-[1.75] text-pretty"
            >
              {processText(paragraph)}
            </motion.p>
          ))}
        </div>

        {/* ──────── BY THE NUMBERS — emphasised stat panel ────────
            Tinted gradient panel + violet ring so the numbers feel like a
            distinct block. Heading is two-tier (eyebrow + big label) so it
            visibly outranks a normal section divider. */}
        <motion.div
          variants={itemVariants}
          className="relative mt-10 md:mt-20"
        >
          {/* Tinted panel */}
          <div className="relative rounded-2xl md:rounded-3xl bg-gradient-to-br from-violet/[0.05] via-white to-indigo-50/60 ring-1 ring-violet/15 p-5 md:p-10 overflow-hidden">
            {/* Decorative dot grid */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-[0.45] [background-image:radial-gradient(rgba(124,58,237,0.12)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]"
            />

            {/* Header — centred to match the section */}
            <div className="relative text-center mb-8 md:mb-10">
              <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-2.5">
                <span className="w-6 h-px bg-violet/40" />
                <span>By the numbers</span>
                <span className="w-6 h-px bg-violet/40" />
              </div>
              <h3 className="text-balance text-xl md:text-[28px] font-bold text-foreground tracking-tight leading-tight">
                What we&apos;ve shipped so far.
              </h3>
            </div>

            {/* Stat grid */}
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x divide-violet/10">
              {HOME_STATS.map((stat, i) => (
                <StatTile key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Film ticker — rAF-driven LogoLoop. Pauses on hover and when the
          section is off-screen, so the rest of the page scrolls cleanly. */}
      <div className="mt-14 md:mt-20">
        <LogoLoop
          logos={CAROUSEL_LOGOS}
          speed={45}
          direction="left"
          logoHeight={140}
          gap={20}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#FAFAFA"
          ariaLabel="Project highlights ticker"
          className="md:hidden"
        />
        <LogoLoop
          logos={CAROUSEL_LOGOS}
          speed={55}
          direction="left"
          logoHeight={180}
          gap={24}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#FAFAFA"
          ariaLabel="Project highlights ticker"
          className="hidden md:block"
        />
      </div>
    </section>
  );
}

/* ─────────────── Stat tile ───────────────
 *
 * Each tile renders an odometer-style number: every count-up tick replaces
 * the displayed string and AnimatePresence slides the new value down into
 * place from above (and slides the old one further down on exit). On top of
 * that, a violet sheen sweeps across the digit once it settles, drawing the
 * eye to the just-completed value.
 */
function StatTile({
  stat,
  index,
}: {
  stat: { value: string; label: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");
  const [settled, setSettled] = useState(false);

  // Count-up. Per-digit slide animation is driven by `key={display}`.
  useEffect(() => {
    const target = Number(stat.value);
    if (!inView || Number.isNaN(target)) {
      if (Number.isNaN(target)) setDisplay(stat.value);
      setSettled(true);
      return;
    }
    const startDelay = 250 + index * 90;
    const startTimer = setTimeout(() => {
      const ctrl = animate(0, target, {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (n) => setDisplay(Math.round(n).toString()),
        onComplete: () => setSettled(true),
      });
      return () => ctrl.stop();
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [inView, stat.value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
        delay: 0.15 + index * 0.08,
      }}
      className="group relative md:px-6 first:md:pl-0 last:md:pr-0 flex flex-col items-center text-center"
    >
      {/* Label first — establishes what's being measured before the number */}
      <div className="text-[11px] md:text-[12px] text-gray-500 uppercase tracking-[0.18em] font-semibold mb-3 md:mb-4">
        {stat.label}
      </div>

      {/* Big numeral with odometer-style per-update slide.
          The container is overflow-hidden so old digits slide out cleanly. */}
      <div className="relative h-[64px] md:h-[88px] w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "-110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "110%", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center text-[56px] md:text-[80px] font-bold text-foreground tabular-nums leading-none tracking-tight"
          >
            {display}
          </motion.span>
        </AnimatePresence>

        {/* Sheen sweep — single-pass shimmer once the count settles. */}
        {settled && (
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none stat-sheen bg-gradient-to-r from-transparent via-violet/45 to-transparent mix-blend-overlay"
          />
        )}
      </div>
    </motion.div>
  );
}
