"use client";

/**
 * MOCKUP — Research-led homepage (dark, 2026-trendy)
 * ------------------------------------------------------------------
 * "Our tech & vision IS the product." Built on current patterns:
 *   - Bento grid for tech assets (asymmetric, aligned tiles)
 *   - Dark-mode elevation layers (grey gradients, not flat black)
 *   - A real horizontal timeline: line + nodes are the hero, media is
 *     a small thumbnail, click-to-expand
 *   - Full-bleed gallery band
 * Sections: 1 Hero · 2 Research & Tech Assets · 3 Milestones · 4 CTA.
 * No team section, no hiring. Dark base (#0A0A0A) + Pantone 265 (`brand`).
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, Expand } from "lucide-react";
import { CAPABILITIES, PARTNERS, MILESTONES, NEWSROOM, NEWS } from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, IndexRule, rise, VIEWPORT } from "./chrome";
import { ArticleCard } from "./cards";

function ViewAll({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-light hover:text-white"
    >
      {label}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* Full-width section divider — hairline within the page gutter. */
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="border-t border-white/10" />
    </div>
  );
}

/* ── One milestone column — calm by default, photo blooms at center ── */
function MilestoneColumn({
  m,
  index,
  center,
  onExpand,
}: {
  m: (typeof MILESTONES)[number];
  index: number;
  center: MotionValue<number>;
  onExpand: (src: string) => void;
}) {
  // Signed distance from center: <0 = still ahead (to the right), 0 = centered,
  // >0 = already passed. The bubble rises as it approaches, peaks at center,
  // then STAYS up (just dimmer + a touch smaller) once passed. Scrolling back
  // toward the start makes rel go negative again, so it sinks and disappears.
  const rel = useTransform(center, (c) => c - index);
  const bubbleOpacity = useTransform(rel, [-0.8, 0, 1.4, 7], [0, 1, 0.5, 0.45]);
  const bubbleY = useTransform(rel, [-1, 0, 7], [46, 0, 0]);
  const bubbleScale = useTransform(rel, [-1, 0, 1.4, 7], [0.96, 1, 0.9, 0.9]);
  const photoScale = useTransform(rel, [-1, 0, 1], [1.1, 1, 1.04]);
  const monthOpacity = useTransform(rel, [-1.6, 0, 1.6], [0.5, 1, 0.55]);
  const dotScale = useTransform(rel, [-1, 0, 1], [1, 1.7, 1]);

  return (
    <div className="grid h-[360px] w-[260px] shrink-0 grid-rows-[1fr_auto_auto] px-3">
      {/* bubble — rises in only when this node is centered */}
      <motion.div
        style={{ opacity: bubbleOpacity, y: bubbleY, scale: bubbleScale }}
        className="flex flex-col justify-end origin-bottom"
      >
        <div className="rounded-xl border border-white/10 bg-[#141416] p-2.5 shadow-[0_14px_36px_-22px_rgba(0,0,0,0.7)]">
          {m.image && (
            <button
              type="button"
              onClick={() => onExpand(m.image!)}
              className="group/photo relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10"
              aria-label={`Expand ${m.title} photo`}
            >
              <motion.img
                src={m.image}
                alt=""
                style={{ scale: photoScale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover/photo:opacity-100">
                <Expand size={11} />
              </span>
            </button>
          )}
          <div className={`px-1 pb-0.5 ${m.image ? "pt-2.5" : "pt-1"}`}>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-brand-light">
                {m.label}
              </span>
              {m.upcoming && (
                <span className="rounded-full bg-brand/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-brand-light">
                  Soon
                </span>
              )}
            </div>
            <h3 className="mt-2 line-clamp-1 text-sm font-semibold leading-snug text-white">{m.title}</h3>
            <p
              className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                m.placeholder ? "italic text-zinc-600" : "text-zinc-500"
              }`}
            >
              {m.text}
            </p>
          </div>
        </div>
        {/* short connector down to the line */}
        <span className="mx-auto mt-3 h-5 w-px bg-white/15" />
      </motion.div>

      {/* node on the dashed line */}
      <div className="relative flex h-3 items-center justify-center">
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-white/20" />
        <motion.span
          style={{ scale: dotScale }}
          className="relative h-2.5 w-2.5 rounded-full bg-brand-light ring-4 ring-[#0A0A0A]"
        />
      </div>

      {/* month marker */}
      <motion.div style={{ opacity: monthOpacity }} className="mt-4 text-center">
        <div className="font-mono text-xl font-bold tracking-tight text-white/90">{m.month}</div>
        <div className="mt-0.5 font-mono text-[11px] text-zinc-600">{m.date}</div>
      </motion.div>
    </div>
  );
}

/* ─────────────── Milestones — scroll-driven center-focus timeline ─────────────── */
// Column width (px) — must match MilestoneColumn's w-[260px] (box-border).
const COL = 260;

function MilestoneTimeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Symmetric 50vw-COL/2 spacers center the first & last columns at the two
  // ends, so horizontal travel is exactly (N-1)·COL regardless of viewport —
  // no DOM measurement needed, and x ↔ center stay perfectly in sync.
  const LAST = MILESTONES.length - 1;
  const dist = LAST * COL;

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  // Spring-smooth the scroll. Overdamped (no overshoot) so it never snaps past.
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 28, mass: 0.5 });
  // Finish the travel by 85% of the scroll, then DWELL on the last node for the
  // remaining 15% — guarantees you actually reach Aug (and the spring settles)
  // before the section unpins into whatever comes next.
  const END = 0.85;
  const x = useTransform(smooth, [0, END], [0, -dist]);
  const center = useTransform(smooth, [0, END], [0, LAST]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <>
      {/* 1.8× the horizontal distance in vertical scroll → calmer travel. */}
      <section ref={wrap} style={{ height: `calc(100vh + ${Math.round(dist * 1.8)}px)` }} className="relative">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-6">
            <IndexRule n="04" label="Track record" />
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="max-w-2xl text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold tracking-tight leading-tight">
                Eight months, founding to first product.
              </h2>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500">
                scroll to follow the timeline <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* center-focus track — symmetric spacers center first & last node */}
          <motion.div style={{ x }} className="mt-1 flex will-change-transform">
            <div className="shrink-0" style={{ width: `calc(50vw - ${COL / 2}px)` }} />
            {MILESTONES.map((m, i) => (
              <MilestoneColumn key={m.date} m={m} index={i} center={center} onExpand={setLightbox} />
            ))}
            <div className="shrink-0" style={{ width: `calc(50vw - ${COL / 2}px)` }} />
          </motion.div>

          <div className="mx-auto mt-8 w-full max-w-6xl px-6">
            <ViewAll href={NEWS} label="Read the full story" />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
        >
          <button
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 hover:border-white hover:text-white"
          >
            <X size={18} />
          </button>
          <motion.img
            key={lightbox}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            src={lightbox}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-[92vw] rounded-xl border border-white/10 object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

/* ─────────────── Page ─────────────── */

export function ResearchLedHome() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0A0A0A] text-white font-sans antialiased selection:bg-brand/30">
      <BackdropDecor />
      <SiteHeader />

      <main className="relative z-10">
        {/* ───── 1. Hero — identity & vision ───── */}
        <section className="relative isolate overflow-hidden">
          {/* Intro video — top banner, muted, loops continuously. Sits ABOVE
              the content (no overlap), shown crisp (no opacity/blend filter). */}
          <div className="relative h-[44vh] min-h-[300px] w-full overflow-hidden md:h-[56vh]">
            <video
              src="/WIGTN%20Intro/03_Dynamic-Black.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            {/* fade the video's bottom edge into the page */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#0A0A0A]"
            />
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-24">
          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            className="max-w-4xl text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05]"
          >
            Your partner for enterprise{" "}
            <span className="text-brand-light">AI transformation</span>.
          </motion.h1>

          <motion.p
            variants={rise}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-2xl text-pretty text-lg md:text-xl text-zinc-400 leading-relaxed"
          >
            We start from your requirements and bring AI into the way your team already
            works — from the first idea to a system running in production.
          </motion.p>
          </div>
        </section>

        {/* ───── 2. What we do — large-type, outline-free text layout ───── */}
        <section id="capabilities" className="max-w-6xl mx-auto px-6 pt-28 md:pt-40 scroll-mt-24">
          <h2 className="text-[clamp(2.5rem,7.5vw,6rem)] font-bold tracking-[-0.03em] leading-[0.98] text-brand-light">
            What we do
          </h2>
          <div className="mt-16 md:mt-24 divide-y divide-white/10 border-t border-white/10">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="grid gap-3 py-10 md:grid-cols-[5rem_1fr] md:gap-12 md:py-14"
              >
                <span className="font-mono text-3xl text-brand-light">{`0${i + 1}`}</span>
                <div>
                  <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-pretty text-base md:text-lg leading-relaxed text-zinc-400">
                    {c.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ───── Partners — centered logo wall (text stand-ins until assets land) ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-40 md:pb-40">
          <h2 className="text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
            Partners
          </h2>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 md:mt-16">
            {PARTNERS.map((name) => (
              <motion.div
                key={name}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="flex items-center justify-center"
              >
                {/* TODO: replace with <img> partner logo once assets exist */}
                <span className="text-xl font-semibold tracking-tight text-zinc-300 md:text-2xl">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ───── 3. Newsroom — featured news as article cards ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-40 md:pb-40">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(2.5rem,7.5vw,6rem)] font-bold tracking-[-0.03em] leading-[0.98] text-brand-light">
              Newsroom
            </h2>
            <ViewAll href={NEWS} label="All news" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {NEWSROOM.map((a, i) => (
              <ArticleCard key={a.slug} a={a} i={i} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ───── 4. Product — coming soon ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-40 md:pb-40">
          <h2 className="text-[clamp(2.5rem,7.5vw,6rem)] font-bold tracking-[-0.03em] leading-[0.98] text-brand-light">
            Product
          </h2>
          <p className="mt-8 text-pretty text-lg md:text-xl text-zinc-500">
            Coming soon. Our first product is in the works — stay tuned.
          </p>
        </section>

        <Divider />

        {/* ───── Track record — horizontal timeline (disabled for now) ───── */}
        {/* <MilestoneTimeline /> */}

        {/* ───── 5. CTA — text layout; only the contact link is boxed in purple ───── */}
        <section className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-light">
            Start your AI transformation
          </span>
          <h3 className="mt-5 max-w-3xl text-pretty text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight leading-[1.15]">
            Tell us where AI should move the needle in your business, and we’ll show you
            what’s genuinely possible for the way your team works today.
          </h3>
          <p className="mt-6 max-w-2xl text-pretty text-zinc-400 leading-relaxed">
            Whether it’s a proof of concept, a joint research project, or a full production
            system your team can rely on, we turn open research into AI that holds up in real
            operations. Tell us the problem, and we’ll tell you what it takes to solve it.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@wigtn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-brand-light px-6 py-3.5 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-white"
          >
            contact@wigtn.com <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
