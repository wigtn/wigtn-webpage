"use client";

/**
 * MOCKUP — Research-led homepage (minimal, teaser-only)
 * ------------------------------------------------------------------
 * Reworked per team feedback + reference sites (Next Securities,
 * MakinaRocks, SORI): the homepage is SHORT. It states the philosophy,
 * names what we do, teases a couple of highlights, and links out. Depth
 * lives on /work, /news, /team — not in one long scroll.
 *
 * "We have few products to list, so showing a lot is a liability." → lead
 * with philosophy + capability; reveal only selected, portfolio-worthy
 * work; let whitespace be intentional.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  WORK,
  NEWS,
  STATS,
  PILLARS,
  PARTNERS,
  POWERED_BY,
  SELECTED_WORK,
  LATEST_NEWS,
} from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, rise, VIEWPORT } from "./chrome";
import { ArticleCard, ArticleRow } from "./cards";

/* ─────────────── Preloader ─────────────── */
function Preloader({ onDone }: { onDone: () => void }) {
  const [hide, setHide] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setHide(true);
    setTimeout(onDone, 700);
  };

  useEffect(() => {
    const t = setTimeout(finish, 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#FAFAFA] transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        src="/WIGTN%20Intro/04_Dynamic-White.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
        className="h-full w-full object-cover mix-blend-multiply"
      />
    </div>
  );
}

/* Small section header: label on the left, "view all" link on the right. */
function SectionHead({ label, href, cta }: { label: string; href: string; cta: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
        {label}
      </span>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-violet-dark hover:text-violet"
      >
        {cta}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

/* ─────────────── Page ─────────────── */

let introPlayed = false;

export function ResearchLedHome() {
  const [introDone, setIntroDone] = useState(introPlayed);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans antialiased">
      {!introDone && (
        <Preloader
          onDone={() => {
            introPlayed = true;
            setIntroDone(true);
          }}
        />
      )}
      <BackdropDecor />
      <SiteHeader />

      <main className="relative z-10">
        {/* ───── Hero — philosophy ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-36 md:pb-24">
          <motion.span
            variants={rise}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-violet mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            Deep-tech research &amp; consulting
          </motion.span>

          <motion.h1
            variants={rise}
            custom={1}
            initial="hidden"
            animate="show"
            className="max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.03em] leading-[1.03]"
          >
            We prove deep-tech by <span className="text-violet">what we publish.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl text-lg md:text-xl text-gray-500 leading-relaxed"
          >
            WIGTN is a five-person AI research crew. We study AI in the open and turn
            it into systems enterprises can run.
          </motion.p>

          <motion.div
            variants={rise}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href={WORK}
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-white px-6 py-3 text-sm font-medium hover:bg-violet-dark transition-colors"
            >
              See our work <ArrowUpRight size={16} />
            </Link>
            <a
              href="mailto:contact@wigtn.com"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium hover:border-foreground transition-colors"
            >
              Talk to us
            </a>
          </motion.div>

          {/* Slim proof strip */}
          <motion.div
            variants={rise}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-gray-200 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="mt-1 text-xs md:text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ───── What we do — capability pillars ───── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
              What we do
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200">
            {PILLARS.map((pill) => (
              <div key={pill.title} className="bg-[#FAFAFA] p-7 md:p-8">
                <h3 className="text-xl font-semibold tracking-tight">{pill.title}</h3>
                <p className="mt-3 text-gray-500 leading-relaxed">{pill.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Selected work ───── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <SectionHead label="Selected work" href={WORK} cta="All work" />
          <div className="grid md:grid-cols-2 gap-6">
            {SELECTED_WORK.map((a, i) => (
              <ArticleCard key={a.slug} a={a} i={i} />
            ))}
          </div>
        </section>

        {/* ───── Latest news ───── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <SectionHead label="Latest news" href={NEWS} cta="All news" />
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {LATEST_NEWS.map((a, i) => (
              <ArticleRow key={a.slug} a={a} i={i} />
            ))}
          </div>
        </section>

        {/* ───── Partners (slim) ───── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <motion.div variants={rise} initial="hidden" whileInView="show" viewport={VIEWPORT}>
            <p className="text-center text-[11px] tracking-[0.22em] uppercase text-gray-400 mb-8">
              Partners
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {PARTNERS.map((p) => (
                <div
                  key={p}
                  className={`flex h-20 items-center justify-center rounded-xl border text-sm font-semibold tracking-wide ${
                    p === "MEGACODE"
                      ? "border-violet/40 bg-violet/5 text-violet-dark"
                      : "border-gray-200 text-gray-400"
                  }`}
                >
                  {p}
                </div>
              ))}
            </div>
            <div className="mt-12">
              <p className="text-center text-[11px] tracking-[0.22em] uppercase text-gray-400 mb-5">
                Powered by
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-gray-300 text-sm font-medium">
                {POWERED_BY.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
