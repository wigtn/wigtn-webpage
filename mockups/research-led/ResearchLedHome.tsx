"use client";

/**
 * Homepage. Positioning is the blend the hero states: an independent AI team
 * that builds for clients and publishes what it learns in the open.
 * ------------------------------------------------------------------
 * Type-led layout. Built on current patterns:
 *   - Display grotesk (Space Grotesk) headlines + mono (JetBrains Mono)
 *     micro-labels; Pretendard body
 *   - Warm off-white base (#F8F8F5), single accent = Pantone 265 (`brand`,
 *     leaning on `accent` for legibility on light)
 *   - Everything that is not a link out of the page is separated by a
 *     hairline, not boxed.
 * Sections: 1 Hero · 2 What we do (the services) · 3 Our modules · 4 CTA,
 * a Divider between each pair. Section 3 is evidence for section 2's first
 * line and sits between the claim and the request on purpose. The landing held the record's capability list, a Notices rail and
 * a WIG-log rail until 2026-08-09; the release ledger is /notices, and the
 * stories live under /story. MilestoneTimeline is retained but currently
 * unrouted.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, Expand } from "lucide-react";
import { MILESTONES, PRACTICES, STORY_INDEX, type PracticeRow } from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, IndexRule, rise, VIEWPORT } from "./chrome";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/brand";
import type { Theme } from "@/lib/theme";

/* The one type scale for a section title on this page.
 *
 * The four of them had drifted to four different sizes, from 3rem on Friends to
 * 6rem on Notices, which read as four unrelated pages stacked rather than one
 * page with four parts. This is the size "What we do" was already using, and it
 * is the one that survives at the top of a viewport without pushing its own
 * content off it.
 *
 * A title here is the section's name and nothing else. That rule cost Tech
 * Reports its old h2: the name was in a nine-pixel eyebrow above a sentence
 * playing the part of the heading, so the sentence moved down to the lead,
 * where it was always doing a lead's job, and the eyebrow went away rather than
 * repeat the h2 directly under it. */
function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-[-0.03em] leading-[1.02] text-accent ${className}`}
    >
      {children}
    </h2>
  );
}

/* Read-everything link. Only MilestoneTimeline below uses it now, which keeps
 * it alive exactly as long as that retained section is. */
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
 * The 7.0s intro assembles the wordmark by ~3.5s, types the tagline out to
 * "Huh, it works!" by ~4.6s, then spends its last ~2s fading everything back
 * to an empty backdrop. That closing fade is what makes it loopable: the last
 * frame and the first frame are the same empty backdrop, so a replay reads as
 * one continuous take instead of a cut. It runs muted on a native loop.
 *
 * Except under prefers-reduced-motion. Motion that starts on its own, runs
 * past five seconds, and offers no way to stop it fails WCAG 2.2.2, and a
 * decorative banner has no business shipping a pause button. Those visitors
 * get one still frame instead: 4.6s is the first frame where the tagline is
 * fully typed and the caret is not drawn.
 *
 * Switching theme swaps to the other cut and resumes at the same timestamp,
 * so the loop does not jump back to the start under the viewer.
 * ───────────────────────────────────────────────────────────────────────── */
const INTRO_HOLD_AT = 4.6;

const INTRO_SRC: Record<Theme, string> = {
  light: "/WIGTN%20Intro/04_Dynamic-White.mp4",
  dark: "/WIGTN%20Intro/03_Dynamic-Black.mp4",
};

function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const resumeAtRef = useRef(0);
  const themeRef = useRef<Theme | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [stillOnly, setStillOnly] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      const next: Theme = root.classList.contains("dark") ? "dark" : "light";
      const current = themeRef.current;
      if (current && current !== next && videoRef.current) {
        resumeAtRef.current = videoRef.current.currentTime;
      }
      themeRef.current = next;
      setTheme(next);
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setStillOnly(query.matches);
    syncMotion();
    query.addEventListener("change", syncMotion);
    return () => query.removeEventListener("change", syncMotion);
  }, []);

  const restorePlayback = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (stillOnly) {
        video.currentTime = INTRO_HOLD_AT;
        return;
      }
      video.currentTime = resumeAtRef.current;
      void video.play().catch(() => {});
    },
    [stillOnly],
  );

  // Do not give the browser a media URL until the pre-paint theme class has
  // been read. This keeps the alternate 1 MB clip out of the request/decode
  // path and makes the server/client markup deterministic. Both effects flush
  // in the same commit, so the motion preference is settled by the time this
  // guard clears and no one sees a frame of loop they asked not to get.
  if (!theme) return null;

  return (
    <video
      // Remount on either axis. `loop` is live, but autoplay is decided once,
      // when the element first reaches readiness, so flipping the OS
      // preference has to rebuild the element to be acted on at all.
      key={`${theme}-${stillOnly}`}
      ref={videoRef}
      src={INTRO_SRC[theme]}
      autoPlay={!stillOnly}
      loop={!stillOnly}
      muted
      playsInline
      aria-hidden
      onLoadedMetadata={restorePlayback}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    />
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

/* ───── What we do ──────────────────────────────────────────────────────────
 *
 * Two lines of business, each a heading over its own evidence.
 *
 * It used to be a sticky left header beside two cards with keyword tags, which
 * is the shape every agency site uses and said nothing either line could not
 * have said. The tags in particular ("Design", "Build", "Deploy") are the sort
 * of thing that survives on a page precisely because nobody can disagree with
 * it. What replaced them is a row per thing we have actually built, and every
 * row opens: the web rows into the running demo, the AX rows into the report
 * that carries the method and the limits.
 *
 * The form is palantir.com's "Our Software" block, measured off the live page
 * on 2026-08-16 rather than recalled: a small heading, rows separated by
 * full-width hairlines, an enormous name at weight 400 with roughly -0.05em
 * tracking, a `/0.1` index hard right, and one line under it.
 *
 * WEIGHT 400 IS A DELIBERATE BREAK from the rest of this page, where every
 * heading is bold. At this size bold turns a row into a banner; the reference
 * is light at 80px and that is most of why it reads as an index of what a firm
 * can do rather than a stack of adverts.
 *
 * The picture is hover-only, which is the reference's behaviour rather than a
 * flourish added to it: each of their rows carries a clip sized to nothing
 * until the row is pointed at. Ours does the same with a still, and only the
 * web rows have one. An AX row is a published paper and inventing a picture
 * for it would be dressing.
 *
 * No pin and no scroll machinery. Rows reveal on entry with the page's `rise`
 * and nothing else moves.
 */
function Practices() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <SectionTitle className="max-w-3xl">What we do</SectionTitle>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-ink-3">
          No product of our own to sell. What we offer is the team, on your problem.
        </p>
      </section>

      {/* Alternating ground, which is how the reference separates its own
          sections. It says these are two things rather than one long list, and
          it does it without touching the type: right-aligning the second
          practice was tried and it split each block in half, left the rows
          with a void down one side, and made a two-line name start somewhere
          new on its second line.
          The band is full-bleed rather than inset, because a tinted rectangle
          with the page showing down both sides is a card, and this page does
          not use cards. */}
      {PRACTICES.map((practice, n) => (
        <div
          key={practice.index}
          className={`${n % 2 === 1 ? "bg-paper-sunken" : ""} py-16 md:py-24`}
        >
          <div className="mx-auto max-w-6xl px-6">
          {/* The practice name is a heading, not a micro-label. It was set in
              the 11px mono the page uses for eyebrows, which is right for
              "01 Web Agency" as a marker beside something else and wrong for
              the thing that names half the business. The index keeps the mono
              and stays small; the name takes a heading size and the row
              weight, so the hierarchy runs title → practice → row. */}
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-ink-5">{practice.index}</span>
              <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-normal tracking-[-0.03em] text-ink">
                {practice.name}
              </h3>
            </div>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-2">
              {practice.lead}
            </p>

            <div className="mt-9 md:mt-12">
              {practice.rows.map((row, i) => (
                <PracticeRowView key={row.slug} row={row} i={i} />
              ))}
              <div className="border-t border-line/[0.14]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function PracticeRowView({ row, i }: { row: PracticeRow; i: number }) {
  return (
    <motion.a
      href={row.href}
      target="_blank"
      rel="noreferrer"
      variants={rise}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="group relative block border-t border-line/[0.14] py-7 md:py-9"
    >
      {/* The receipt, on the rows that have one. It sits over the row's right
          half, clipped, and arrives with a slow push in. `pointer-events-none`
          so it never takes the cursor off the row that summoned it, and hidden
          below lg because at that width it would cover the sentence it is
          illustrating rather than sit beside it. The row has to read with the
          picture never shown, and on a phone it never is. */}
      {row.image && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 hidden h-[13.5rem] w-[21.5rem] -translate-y-1/2 overflow-hidden rounded-sm opacity-0 shadow-[0_30px_70px_-40px_rgba(21,21,21,0.7)] ring-1 ring-inset ring-line/15 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
        >
          <img
            src={row.image}
            alt=""
            loading="lazy"
            decoding="async"
            /* The zoom is on the image, not the frame: scaling the frame moves
               its shadow and edges too, which reads as the whole panel
               breathing rather than the picture settling. */
            className="h-full w-full scale-[1.06] object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-focus-visible:scale-100"
          />
        </span>
      )}

      <span className="absolute right-0 top-7 font-mono text-xs text-ink-5 transition-colors group-hover:text-ink md:top-9">
        {`/0.${i + 1}`}
      </span>

      <h3
        className={`font-display text-[clamp(1.9rem,5.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.05em] text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 ${
          row.image ? "max-w-[85%] lg:max-w-[58%]" : "max-w-[85%]"
        }`}
      >
        {row.role}
      </h3>

      <p
        className={`mt-3 text-pretty leading-relaxed text-ink-3 ${
          row.image ? "max-w-3xl lg:max-w-[58%]" : "max-w-3xl"
        }`}
      >
        {row.blurb}
      </p>

      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-5 transition-colors group-hover:text-accent">
        {row.meta}
        <ArrowUpRight aria-hidden size={12} />
      </span>
    </motion.a>
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
            {/* Clamped to 1/2 lines, so entries with long History copy supply
                a rail-sized teaser rather than getting silently truncated. */}
            <h3 className="mt-2 line-clamp-1 text-sm font-semibold leading-snug text-ink">
              {m.railTitle ?? m.title}
            </h3>
            <p
              className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                m.placeholder ? "italic text-ink-5" : "text-ink-4"
              }`}
            >
              {m.railText ?? m.text}
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
            <ViewAll href={STORY_INDEX} label="Read the full story" />
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
          {/* Intro video: top banner, muted, looping (one still frame under
              prefers-reduced-motion). Sits ABOVE the content (no overlap),
              shown crisp (no opacity/blend filter).
              The clip is baked onto a solid backdrop, so each theme needs its
              own cut: White on paper, Black on ink. A single media element is
              mounted after hydration from the pre-paint theme class; switching
              theme preserves its position instead of replaying another clip. */}
          <div className="relative h-[44vh] min-h-[300px] w-full overflow-hidden md:h-[56vh]">
            {/* Lightweight first-paint fallback while the single active video
                hydrates and decodes its first frame. */}
            <div aria-hidden className="absolute inset-0 grid place-items-center bg-paper">
              <img src="/images/WIGTN_LOGO_NAVY.png" alt="" className="h-auto w-44 dark:hidden md:w-56" />
              <img src="/images/WIGTN_LOGO_WHITE.png" alt="" className="hidden h-auto w-44 dark:block md:w-56" />
            </div>
            <IntroVideo />
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
            WIGTN builds web products and AI systems for clients, and publishes
            what it learns in the open: peer-reviewed papers, released models, and
            reports that say what they do not show.
          </motion.p>
          </div>
        </section>

        <Practices />


        <Divider />

        {/* ───── 4. CTA: text layout; only the contact link is boxed in purple ───── */}
        <section className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-accent">
            Work with us
          </span>
          <h3 className="mt-5 font-display max-w-3xl text-pretty text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight leading-[1.15]">
            If you have work for a team like this, we would rather hear from you
            than not.
          </h3>
          <p className="mt-6 max-w-2xl text-pretty text-ink-3 leading-relaxed">
            Bring us a site to build or a workflow that wants AI in it. Or read a
            report and tell us where it is wrong, use one of the models, open an
            issue. All of it is more useful to us than silence.
          </p>
          <a
            href={CONTACT_HREF}
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            {CONTACT_EMAIL} <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
