"use client";

/**
 * Research-led homepage (light, open-community positioning)
 * ------------------------------------------------------------------
 * Card-less, type-led layout. Built on current patterns:
 *   - Display grotesk (Space Grotesk) headlines + mono (JetBrains Mono)
 *     micro-labels; Pretendard body
 *   - Warm off-white base (#F8F8F5), single accent = Pantone 265 (`brand`,
 *     leaning on `accent` for legibility on light)
 *   - Editorial sections separated by hairlines, not boxes/cards
 *   - "What we do": sticky left header + compact right capability list
 * Sections: 1 Hero · 2 What we do · Friends · 3 Updates · 4 Community · 5 CTA.
 * MilestoneTimeline is retained but currently unrouted.
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
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-ink"
    >
      {label}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ── Hero intro clip ──────────────────────────────────────────────────────
 * The 7.0s intro is not a loop and its last frame is not its best frame. The
 * wordmark assembles by ~3.5s, the tagline types out to "Huh, it works!" by
 * ~4.6s, and the final ~2s fade everything back to an empty backdrop. Letting
 * it run to the end therefore parks a large banner on blank paper, and letting
 * it loop turns an opening title into restless wallpaper.
 *
 * So: play once, then stop on the completed lockup and hold it. Tune the
 * resting frame with this one constant; 4.6s is the first frame where the
 * tagline is fully typed and the caret is not drawn.
 * ───────────────────────────────────────────────────────────────────────── */
const INTRO_HOLD_AT = 4.6;

function IntroVideo({ src, className }: { src: string; className: string }) {
  // `timeupdate` fires roughly 4x/sec, so it always overshoots a little. Seek
  // back to the exact mark after pausing, otherwise the resting frame drifts
  // by up to ~250ms between loads and can land on a caret-blink frame.
  const holdAtMark = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.dataset.held || v.currentTime < INTRO_HOLD_AT) return;
    v.dataset.held = "1";
    v.pause();
    v.currentTime = INTRO_HOLD_AT;
  };

  return (
    <video
      src={src}
      autoPlay
      muted
      playsInline
      aria-hidden
      onTimeUpdate={holdAtMark}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

/* Keyword labels: scannable metadata, not boxed chips (no card aesthetic). */
function Tags({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-4"
        >
          <span aria-hidden className="h-1 w-1 rounded-full bg-brand/60" />
          {t}
        </span>
      ))}
    </div>
  );
}

/* Full-width section divider: hairline within the page gutter. */
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="border-t border-line/[0.08]" />
    </div>
  );
}

/* ── One milestone column: calm by default, photo blooms at center ── */
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
      {/* bubble: rises in only when this node is centered */}
      <motion.div
        style={{ opacity: bubbleOpacity, y: bubbleY, scale: bubbleScale }}
        className="flex flex-col justify-end origin-bottom"
      >
        <div className="rounded-xl border border-line/[0.08] bg-paper-raised p-2.5 shadow-[0_14px_36px_-22px_rgba(21,21,21,0.28)]">
          {m.image && (
            <button
              type="button"
              onClick={() => onExpand(m.image!)}
              className="group/photo relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-line/[0.08]"
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
              <span className="rounded-full border border-line/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
                {m.label}
              </span>
              {m.upcoming && (
                <span className="rounded-full bg-brand/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
                  Soon
                </span>
              )}
            </div>
            <h3 className="mt-2 line-clamp-1 text-sm font-semibold leading-snug text-ink">{m.title}</h3>
            <p
              className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                m.placeholder ? "italic text-ink-5" : "text-ink-4"
              }`}
            >
              {m.text}
            </p>
          </div>
        </div>
        {/* short connector down to the line */}
        <span className="mx-auto mt-3 h-5 w-px bg-line/15" />
      </motion.div>

      {/* node on the dashed line */}
      <div className="relative flex h-3 items-center justify-center">
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-line/20" />
        <motion.span
          style={{ scale: dotScale }}
          className="relative h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-paper"
        />
      </div>

      {/* month marker */}
      <motion.div style={{ opacity: monthOpacity }} className="mt-4 text-center">
        <div className="font-mono text-xl font-bold tracking-tight text-ink-2">{m.month}</div>
        <div className="mt-0.5 font-mono text-[11px] text-ink-5">{m.date}</div>
      </motion.div>
    </div>
  );
}

/* ─────────────── Milestones: scroll-driven center-focus timeline ─────────────── */
// Column width (px); must match MilestoneColumn's w-[260px] (box-border).
const COL = 260;

function MilestoneTimeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Symmetric 50vw-COL/2 spacers center the first & last columns at the two
  // ends, so horizontal travel is exactly (N-1)·COL regardless of viewport:
  // no DOM measurement needed, and x ↔ center stay perfectly in sync.
  const LAST = MILESTONES.length - 1;
  const dist = LAST * COL;

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  // Spring-smooth the scroll. Overdamped (no overshoot) so it never snaps past.
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 28, mass: 0.5 });
  // Finish the travel by 85% of the scroll, then DWELL on the last node for the
  // remaining 15%. This guarantees you actually reach Aug (and the spring settles)
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
              <h2 className="font-display max-w-2xl text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold tracking-tight leading-tight">
                Eight months, founding to first product.
              </h2>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-4">
                scroll to follow the timeline <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* center-focus track: symmetric spacers center first & last node */}
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
    <div className="relative min-h-screen overflow-x-clip bg-paper text-ink font-sans antialiased selection:bg-brand/20">
      <BackdropDecor />
      <SiteHeader />

      <main className="relative z-10">
        {/* ───── 1. Hero: identity & vision ───── */}
        <section className="relative isolate overflow-hidden">
          {/* Intro video: top banner, muted, plays once and holds on the
              finished lockup. Sits ABOVE the content (no overlap), shown crisp
              (no opacity/blend filter).
              The clip is baked onto a solid backdrop, so each theme needs its
              own cut: White on paper, Black on ink. Both are rendered and
              swapped by CSS (same pattern as the wordmark in chrome.tsx) so
              the right one is showing on the very first paint, before React
              hydrates and long before any theme state exists in JS. */}
          <div className="relative h-[44vh] min-h-[300px] w-full overflow-hidden md:h-[56vh]">
            <IntroVideo
              src="/WIGTN%20Intro/04_Dynamic-White.mp4"
              className="dark:hidden"
            />
            <IntroVideo
              src="/WIGTN%20Intro/03_Dynamic-Black.mp4"
              className="hidden dark:block"
            />
            {/* fade the video's bottom edge into the page */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-paper"
            />
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-24">
          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            className="font-display max-w-4xl text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05]"
          >
            We learn, build, and{" "}
            <span className="text-accent">share AI in the open</span>.
          </motion.h1>

          <motion.p
            variants={rise}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-2xl text-pretty text-lg md:text-xl text-ink-3 leading-relaxed"
          >
            WIGTN is a community of AI builders. We publish research, release open-source
            models and tools, and pass on everything we learn, through meetups, seminars,
            and code anyone can use.
          </motion.p>
          </div>
        </section>

        {/* ───── 2. What we do: sticky left header + compact right list (no cards) ───── */}
        <section id="capabilities" className="max-w-6xl mx-auto px-6 pt-28 md:pt-40 scroll-mt-24">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            {/* left: sticky header + eyebrow + CTA, anchors the column while the list scrolls */}
            <div className="md:sticky md:top-24 md:self-start">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-4">
                Activities · 01–04
              </span>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-[-0.03em] leading-[1.02] text-accent">
                What we do together
              </h2>
              <p className="mt-5 max-w-xs text-pretty leading-relaxed text-ink-3">
                From open research to open source, and the meetups where we share it all.
              </p>
            </div>

            {/* right: index + title + lead + labels (body dropped to keep rows short) */}
            <div className="divide-y divide-line/[0.08] border-t border-line/[0.08]">
              {CAPABILITIES.map((c, i) => (
                <motion.div
                  key={c.title}
                  variants={rise}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  className="flex items-start gap-5 py-8 md:py-10"
                >
                  <span className="pt-1.5 font-mono text-sm text-accent">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-pretty leading-relaxed text-ink-2">{c.lead}</p>
                    <Tags tags={c.tags} className="mt-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Friends: centered logo wall (text stand-ins until assets land) ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-40 md:pb-40">
          <h2 className="font-display text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
            Friends &amp; Collaborators
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
                <span className="text-xl font-semibold tracking-tight text-ink-2 md:text-2xl">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ───── 3. Updates: featured items as article cards ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-40 md:pb-40">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(2.5rem,7.5vw,6rem)] font-bold tracking-[-0.03em] leading-[0.98] text-accent">
              Updates
            </h2>
            <ViewAll href={NEWS} label="All updates" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {NEWSROOM.map((a, i) => (
              <ArticleCard key={a.slug} a={a} i={i} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ───── 4. Community: card-less text band with inline status ───── */}
        <section className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-accent">
                Community
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Meetups and open seminars are on the way.
              </h2>
              <p className="mt-3 text-pretty text-ink-3">
                Talks, study groups, and demos. Open to anyone who builds with AI.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-4">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
              First meetup in planning
            </span>
          </div>
        </section>

        {/* ───── 5. CTA: text layout; only the contact link is boxed in purple ───── */}
        <section className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-accent">
            Join the community
          </span>
          <h3 className="mt-5 font-display max-w-3xl text-pretty text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight leading-[1.15]">
            If you like building AI in the open, come build it with us.
          </h3>
          <p className="mt-6 max-w-2xl text-pretty text-ink-3 leading-relaxed">
            Come to a meetup, join a study group, contribute to one of our open-source
            projects, or just say hi. Whatever you’re building, there’s a seat for you
            here.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@wigtn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            contact@wigtn.com <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
