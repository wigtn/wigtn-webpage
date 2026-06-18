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
import {
  WORK,
  NEWS,
  STATS,
  PUBLICATIONS,
  OPEN_SOURCE,
  DEMOS,
  MILESTONES,
  articleHref,
  getArticle,
} from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, IndexRule, rise, VIEWPORT } from "./chrome";

/* Shared tile surface — flat elevation + inset hairline, brand glow on hover. */
const TILE =
  "group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.025] ring-1 ring-inset ring-white/[0.07] transition-all duration-300 hover:bg-white/[0.045] hover:ring-white/15";

/* Soft brand spotlight that fades in on hover (top-center). */
function TileGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: "radial-gradient(420px circle at 50% -10%, rgba(117,59,189,0.16), transparent 70%)" }}
    />
  );
}

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
      {children}
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
    <div className="grid h-[440px] w-[260px] shrink-0 grid-rows-[1fr_auto_auto] px-3">
      {/* bubble — rises in only when this node is centered */}
      <motion.div
        style={{ opacity: bubbleOpacity, y: bubbleY, scale: bubbleScale }}
        className="flex flex-col justify-end origin-bottom"
      >
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] backdrop-blur-sm">
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
              <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/photo:opacity-100">
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
function MilestoneTimeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el) return;
      setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  // Spring-smooth the scroll so fast flicks glide instead of snapping past.
  const smooth = useSpring(scrollYProgress, { stiffness: 42, damping: 18, mass: 0.45 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);
  // Which column is centered, as a continuous index (0 → last).
  const center = useTransform(smooth, [0, 1], [0, MILESTONES.length - 1]);

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
      <section ref={wrap} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
        {/* ambient brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(50% 45% at 50% 55%, rgba(117,59,189,0.10), transparent 70%)" }}
        />
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-6">
            <IndexRule n="02" label="Milestones — building in public" />
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="max-w-2xl font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold tracking-tight leading-tight">
                Eight months, founding to first product.
              </h2>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500">
                scroll to travel <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* center-focus track */}
          <motion.div ref={track} style={{ x }} className="mt-5 flex will-change-transform">
            <div className="shrink-0 w-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]" />
            {MILESTONES.map((m, i) => (
              <MilestoneColumn key={m.date} m={m} index={i} center={center} onExpand={setLightbox} />
            ))}
            <div className="shrink-0 w-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]" />
          </motion.div>

          <div className="mx-auto mt-8 w-full max-w-6xl px-6">
            <ViewAll href={NEWS} label="Read our notes" />
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
let introPlayed = false;

export function ResearchLedHome() {
  const [introDone, setIntroDone] = useState(introPlayed);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0A0A0A] text-white font-body antialiased selection:bg-brand/30">
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
        {/* ───── 1. Hero — identity & vision ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-44 md:pb-24">
          <motion.span
            variants={rise}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-light mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            AI research &amp; engineering crew
          </motion.span>

          <motion.h1
            variants={rise}
            custom={1}
            initial="hidden"
            animate="show"
            className="max-w-4xl font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-bold tracking-[-0.03em] leading-[1.0]"
          >
            We do AI research in the <span className="text-brand-light">open</span> — and ship it.
          </motion.h1>

          <motion.p
            variants={rise}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-10 max-w-xl text-lg md:text-xl text-zinc-400 leading-relaxed"
          >
            We don’t write papers to file them away — we ship the research. Open models,
            award-winning systems, and tools the developer community actually uses.
          </motion.p>

          <motion.div
            variants={rise}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-wrap gap-3"
          >
            <Link
              href={WORK}
              className="inline-flex items-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-light hover:text-[#0A0A0A] transition-colors"
            >
              See our research <ArrowUpRight size={16} />
            </Link>
            <a
              href="mailto:contact@wigtn.com"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-zinc-300 hover:border-white hover:text-white transition-colors"
            >
              Work with us
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-24 grid grid-cols-2 gap-y-8 gap-x-6 border-t border-white/10 pt-10 sm:flex sm:flex-wrap sm:gap-x-16"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="mt-1.5 font-mono text-xs md:text-sm text-zinc-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ───── 2. Research & Tech Assets (centerpiece) ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 md:pt-40">
          <IndexRule n="01" label="Research & Tech Assets" />

          {/* Publications */}
          <div className="mb-20">
            <Eyebrow>Publications</Eyebrow>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {PUBLICATIONS.map((pub, i) => {
                const a = getArticle(pub.slug)!;
                return (
                  <motion.div key={pub.slug} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                    <Link href={articleHref(pub.slug)} className="group flex items-start gap-6 py-6">
                      <span className="w-28 shrink-0 font-mono text-sm text-brand-light">{pub.venue}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-brand-light transition-colors">
                          {a.title}
                        </h3>
                        <div className="mt-1 text-sm text-zinc-500">{pub.status}</div>
                      </div>
                      <ArrowUpRight size={18} className="mt-1 shrink-0 text-zinc-600 group-hover:text-brand-light transition-colors" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open source (bento) + Demos (uniform grid) */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-28 md:pt-24 md:pb-40">
          <div className="mb-20">
            <Eyebrow>Open source &amp; models</Eyebrow>
            <div className="grid gap-4 md:grid-cols-3 md:auto-rows-[188px]">
              {OPEN_SOURCE.map((os, i) => {
                const featured = i === 0;
                const art = os.slug ? getArticle(os.slug) : undefined;
                if (featured) {
                  return (
                    <motion.a
                      key={os.name}
                      href={os.href}
                      target="_blank"
                      rel="noreferrer"
                      variants={rise}
                      custom={i}
                      initial="hidden"
                      whileInView="show"
                      viewport={VIEWPORT}
                      className={`${TILE} md:col-span-2 md:row-span-2`}
                    >
                      {/* image header — visible, crisp, with a soft fade into the body */}
                      <div className="relative h-52 shrink-0 overflow-hidden">
                        {art?.image && (
                          <img
                            src={art.image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-transparent to-transparent" />
                        <span className="absolute left-6 top-5 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-brand-light backdrop-blur-sm">
                          {os.platform}
                        </span>
                        <ArrowUpRight size={18} className="absolute right-5 top-5 text-white/80 transition-colors group-hover:text-brand-light" />
                      </div>
                      {/* body */}
                      <div className="relative flex flex-1 flex-col justify-end p-7">
                        <TileGlow />
                        <h3 className="relative font-display text-3xl font-semibold tracking-tight text-white">
                          {os.name}
                        </h3>
                        <p className="relative mt-2.5 max-w-md text-sm leading-relaxed text-zinc-400">{os.desc}</p>
                        <div className="relative mt-5 flex flex-wrap gap-2">
                          {["#1 KoGovDoc-Bench", "2B params", "Runs on 1 GPU"].map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.a>
                  );
                }
                return (
                  <motion.a
                    key={os.name}
                    href={os.href}
                    target="_blank"
                    rel="noreferrer"
                    variants={rise}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className={`${TILE} p-7`}
                  >
                    <TileGlow />
                    <div className="relative flex items-start justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wide text-brand-light">
                        {os.platform}
                      </span>
                      <ArrowUpRight size={16} className="text-zinc-500 transition-colors group-hover:text-brand-light" />
                    </div>
                    <div className="relative mt-auto pt-10">
                      <h3 className="text-lg font-semibold tracking-tight text-white">{os.name}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{os.desc}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Demos — uniform 3-up grid */}
          <div>
            <Eyebrow>Demos &amp; playground</Eyebrow>
            <div className="grid gap-4 sm:grid-cols-3">
              {DEMOS.map((d, i) => (
                <motion.a
                  key={d.name}
                  href={d.href}
                  target="_blank"
                  rel="noreferrer"
                  variants={rise}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  className={`${TILE} min-h-[176px] p-6`}
                >
                  <TileGlow />
                  <div className="relative flex items-center justify-between">
                    <span className="rounded-full bg-brand/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-light">
                      {d.tag}
                    </span>
                    <ArrowUpRight size={16} className="text-zinc-500 transition-colors group-hover:text-brand-light" />
                  </div>
                  <div className="relative mt-auto pt-8">
                    <h3 className="text-lg font-semibold tracking-tight text-white">{d.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{d.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 3. Milestones — horizontal timeline ───── */}
        <MilestoneTimeline />

        {/* ───── 4. CTA — collaborate (PoC) ───── */}
        <section className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.015] p-10 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(117,59,189,0.25), transparent 70%)" }}
            />
            <div className="relative">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-light">
                Let’s collaborate
              </span>
              <h3 className="mt-5 max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1]">
                PoC, joint research, or applied AI — proposals are always welcome.
              </h3>
              <p className="mt-5 max-w-xl text-zinc-400 leading-relaxed">
                We turn open research into systems enterprises can actually run. Tell us the problem;
                we’ll tell you what’s possible.
              </p>
              <a
                href="mailto:contact@wigtn.com"
                className="mt-9 inline-flex items-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-light hover:text-[#0A0A0A] transition-colors"
              >
                contact@wigtn.com <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
