"use client";

import { motion } from "framer-motion";

/**
 * Achievement marquee — a thin, monochrome horizontal ticker that runs the
 * team's load-bearing credentials past the visitor before they've scrolled
 * far. Modeled on a journal byline / paper "submitted to" header rather than
 * a SaaS feature ribbon, so it reads as understated credibility, not as
 * marketing fluff.
 *
 * The list is rendered twice in sequence and translated by exactly half the
 * width to make the loop seam invisible.
 */

const ITEMS: string[] = [
  "ACL 2026 — Speech & Multimodal",
  "EMNLP 2026 — Document AI",
  "Build with TRAE Seoul · Grand Prize",
  "ByteDance · TRAE",
  "OmniDocBench Top-Tier",
  "KoGovDoc-Bench #1",
  "Google Gemini Live Agent Challenge",
  "Snowflake Korea 2026",
  "npm:wigss",
  "Claude Code Plugins",
  "Hugging Face · Wigtn",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Highlights"
      className="py-7 md:py-8 border-y border-black/[0.06] bg-white overflow-hidden"
    >
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-10 md:gap-14 whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3.5 text-[13px] md:text-sm text-gray-500 tracking-wide"
            >
              <span aria-hidden className="text-gray-300 select-none">
                /
              </span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
