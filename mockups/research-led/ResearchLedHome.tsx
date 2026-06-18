"use client";

/**
 * MOCKUP — Research-led homepage (dark, SORI-inspired)
 * ------------------------------------------------------------------
 * Black base + Pantone 265 accent (`brand`). Short, teaser-only page.
 * Signature interactions modeled on sori-ai.com:
 *   - sticky always-on header (in chrome)
 *   - two-tone display hero
 *   - scroll-highlight "strengths" list (rows light up as they enter)
 *   - horizontal swipe carousel with numbered tabs for selected work
 *   - big-CTA footer with a "system status" detail (in chrome)
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  WORK,
  NEWS,
  STATS,
  STRENGTHS,
  HIGHLIGHTS,
  LATEST_NEWS,
  articleHref,
} from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, rise } from "./chrome";
import { ArticleRow } from "./cards";

/* ─────────────── Preloader ───────────────
 * Uses the BLACK-bg intro variant + mix-blend-screen so the mark shows on
 * the #0A0A0A page (screen drops black). Plays once per page load. */
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
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#0A0A0A] transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        src="/WIGTN%20Intro/03_Dynamic-Black.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
        className="h-full w-full object-cover mix-blend-screen"
      />
    </div>
  );
}

/* Small section label with a "view all" link. */
function SectionHead({ label, href, cta }: { label: string; href: string; cta: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
        {label}
      </span>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-light hover:text-white"
      >
        {cta}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

/* ─────────────── Strengths — scroll-highlight list ─────────────── */
function StrengthList() {
  return (
    <div className="border-t border-white/10">
      {STRENGTHS.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0.25 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-40% 0px -40% 0px" }}
          transition={{ duration: 0.4 }}
          className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-4 border-b border-white/10 py-10 md:py-14 transition-colors hover:bg-white/[0.02]"
        >
          <div className="flex items-start gap-6">
            <span className="font-mono text-sm text-zinc-600">0{i + 1}</span>
            <span className="max-w-[14rem] text-sm text-zinc-500">{s.kicker}</span>
          </div>
          <h3 className="text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold tracking-tight leading-[1.05] text-zinc-600 transition-colors duration-300 group-hover:text-brand-light">
            {s.title}
          </h3>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────── Selected work — swipe carousel ─────────────── */
function WorkCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const go = (i: number) => {
    setActive(i);
    cards.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.current.forEach((c, i) => {
      if (!c) return;
      const cardCenter = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <div>
      {/* numbered tabs */}
      <div className="mb-6 flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10 pb-4">
        {HIGHLIGHTS.map((h, i) => (
          <button
            key={h.article.slug}
            onClick={() => go(i)}
            className={`group inline-flex items-baseline gap-2 text-sm transition-colors ${
              active === i ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className={`font-mono text-xs ${active === i ? "text-brand-light" : "text-zinc-600"}`}>
              0{i + 1}
            </span>
            <span className="font-medium tracking-wide uppercase">{h.short}</span>
          </button>
        ))}
      </div>

      {/* horizontal scroll-snap cards */}
      <div
        ref={scroller}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {HIGHLIGHTS.map((h, i) => (
          <Link
            key={h.article.slug}
            href={articleHref(h.article.slug)}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="group relative aspect-[4/3] w-[78%] sm:w-[58%] lg:w-[42%] shrink-0 snap-center overflow-hidden rounded-lg border border-white/10"
          >
            {h.article.image && (
              <img
                src={h.article.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-brand-light">
                {h.article.tag}
              </span>
              <h3 className="mt-2 text-xl font-semibold leading-snug text-white">{h.article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── Page ─────────────── */
let introPlayed = false;

export function ResearchLedHome() {
  const [introDone, setIntroDone] = useState(introPlayed);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-brand/30">
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
        {/* ───── Hero ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-20 md:pt-40 md:pb-28">
          <motion.span
            variants={rise}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-light mb-7"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Deep-tech research &amp; consulting
          </motion.span>

          <motion.h1
            variants={rise}
            custom={1}
            initial="hidden"
            animate="show"
            className="max-w-4xl text-[clamp(2.75rem,8vw,6rem)] font-bold tracking-[-0.03em] leading-[0.98]"
          >
            We prove deep-tech by <span className="text-brand-light">what we publish.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-xl text-lg md:text-xl text-zinc-400 leading-relaxed"
          >
            WIGTN is a five-person AI research crew. We study AI in the open and turn
            it into systems enterprises can run.
          </motion.p>

          <motion.div
            variants={rise}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href={WORK}
              className="inline-flex items-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-light hover:text-[#0A0A0A] transition-colors"
            >
              See our work <ArrowUpRight size={16} />
            </Link>
            <a
              href="mailto:contact@wigtn.com"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-zinc-300 hover:border-white hover:text-white transition-colors"
            >
              Talk to us
            </a>
          </motion.div>

          {/* Proof strip */}
          <motion.div
            variants={rise}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-20 flex flex-wrap gap-x-14 gap-y-6 border-t border-white/10 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="mt-1 font-mono text-xs md:text-sm text-zinc-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ───── Strengths (scroll-highlight) ───── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-4">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
              Our strength
            </span>
          </div>
          <StrengthList />
        </section>

        {/* ───── Selected work (swipe) ───── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <SectionHead label="Selected work" href={WORK} cta="All work" />
          <WorkCarousel />
        </section>

        {/* ───── Latest news ───── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <SectionHead label="Latest news" href={NEWS} cta="All news" />
          <div className="divide-y divide-white/10 border-y border-white/10">
            {LATEST_NEWS.map((a, i) => (
              <ArticleRow key={a.slug} a={a} i={i} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
