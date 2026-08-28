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
 * Sections: 1 Hero · 2 Our Service (the two lines of business, side by
 * side) · 3 CTA, a Divider between each pair. The evidence for section 2 is
 * inside it now, in the half that claims it. The landing held the record's capability list, a Notices rail and
 * a WIG-log rail until 2026-08-09; the release ledger is /notices, and the
 * stories live under /story. MilestoneTimeline is retained but currently
 * unrouted.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, Expand } from "lucide-react";
import { MILESTONES, PRACTICES, STORY_INDEX, type PracticeRow } from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, IndexRule, rise, VIEWPORT } from "./chrome";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/brand";
import type { Theme } from "@/lib/theme";

/* The one type scale for a section title on this page.
 *
 * The four of them had drifted to four different sizes, from 3rem on Friends to
 * 6rem on Notices, which read as four unrelated pages stacked rather than one
 * page with four parts. This is the size the services block was already using,
 * and it
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

/* ───── Our Service ─────────────────────────────────────────────────────────
 *
 * The two lines of business as two halves of one section. At rest they are
 * 50/50 and each shows its names; point at one and it takes 78 percent of the
 * width while the other folds to 22, where its name and label still read
 * horizontally without any rotated-spine trick.
 *
 * WHY ONE SECTION. They were two stacked bands, one practice each, and that was
 * honest but cost about 1,800px of page to say seven things. Side by side, the
 * whole business is 432px and the reader decides which half spends it. It also
 * puts the two claims on one line: we build it, we measure it.
 *
 * THE FORM IS ackerton.com's "Main Service Offerings", measured off the live
 * page on 2026-08-21 rather than recalled: a small heading with all the weight
 * on the right, four offerings in a screen third, a description that appears
 * only when something is pointed at, and a drawing drifting sideways behind it.
 * Theirs is their own wordmark; ours was too, until a wordmark under a header
 * that already carries it read as saying the name twice. It is Seoul now. What did not come across is their staircase of photographs. Our
 * only images are UI crops that already carry their own text, so a label on top
 * of one is text over text; the names live on the ground instead.
 *
 * EACH HALF OPENS INTO ITS OWN SHAPE, because the two are not the same kind of
 * thing. The web modules are a set with no order, so all four appear at once,
 * each running. The AX stages happen in sequence, so they sit on one line under
 * a rule with a dot per stage: the line says the order, which is the job the
 * carousel it replaces was doing with arrows, a counter and a dwell timer.
 *
 * THE NAMES ARE VISIBLE AT REST. Without them this section says two headings
 * and nothing else, and a reader who scrolls past without pointing learns
 * nothing about what we make. Opening replaces the names with the evidence for
 * them, which reads as the names growing rather than a panel arriving.
 *
 * PURPLE IS STATE, NOT DECORATION. The wordmark is brand at 8.5 percent, the
 * labels are accent, the open half takes a 3.8 percent wash, and the thing
 * under the pointer is the only text that turns. Every one of those is
 * answering "which one is this" or "which one is live".
 */

/* How wide the pointed-at half becomes, and the fixed parts of a half its items
 * have to make room for. The items are laid out at a width computed from these
 * rather than at whatever width the half has mid-animation: a four-column grid
 * that re-solves every frame reflows its text the whole way open, which reads
 * as the words settling rather than as the panel opening. */
const OPEN_SHARE = 0.78;
const NAME_COL = 240;
const INNER_PAD = 28;
const ITEMS_GAP = 40;
/* The page's own measure: max-w-6xl plus its px-6 gutter. The band ignores it,
 * the words in the band do not. */
const PAGE_W = 1152;
const PAGE_PAD = 24;

function Practices() {
  const frame = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [box, setBox] = useState<{ gutter: number; items: number } | null>(null);
  const still = useReducedMotion();

  /* The wordmark's one motion, and the reference's too: it slides as the
   * section passes rather than sitting dead. Transform only, so it never
   * lays out. */
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [34, -34]);

  /* Two numbers come off the band's own width, and both exist for the same
   * reason: the ground is full bleed and the words are not. The outer padding
   * is whatever puts a half's text on the page's left or right margin, and the
   * items get what is left of the open share after it. */
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const gutter = Math.max(PAGE_PAD, Math.round((w - PAGE_W) / 2) + PAGE_PAD);
      setBox({
        gutter,
        items: Math.max(0, Math.round(w * OPEN_SHARE) - gutter - INNER_PAD - NAME_COL - ITEMS_GAP),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle className="max-w-3xl">Our Service</SectionTitle>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-ink-3">
          One team, two things. We build the product end to end, and we measure whether the AI
          inside it moved anything. How we measure, applied to our own work and including the
          results that went nowhere, is on WIG-log.
        </p>
      </div>

      {/* Full bleed, because the reference's band runs to the edge and because a
          tinted half with the page showing down both sides is a card. Closing
          the pointer out of the whole band, not out of a half, is what returns
          it to 50/50: leaving one half by crossing into the other must not
          flicker through the resting state on the way. */}
      <div
        ref={frame}
        onPointerLeave={() => setOpen(null)}
        style={
          box
            ? ({ "--gutter": `${box.gutter}px`, "--items-w": `${box.items}px` } as CSSProperties)
            : undefined
        }
        className="relative mt-12 overflow-hidden border-y border-line/[0.14] md:mt-16 xl:flex xl:h-[27rem]"
      >
        <motion.div
          aria-hidden
          style={still ? undefined : { x: drift }}
          /* Only where the band is a band. Below xl the halves stack into a
             column about three thousand pixels tall, and a skyline pinned to
             the bottom of that is not a ground, it is an ornament at the end of
             a list. */
          /* Pushed below the band's edge by the ground line's own depth, so
             the drawing sits lower behind the text. What that costs is the
             water under the bridge, which is the one part of it that reads the
             same cut off as it does whole. */
          className={`pointer-events-none absolute inset-x-0 -bottom-9 z-0 hidden transition-opacity duration-500 xl:block ${
            open ? "opacity-40" : "opacity-100"
          }`}
        >
          <SeoulSkyline />
        </motion.div>

        {PRACTICES.map((practice, i) => {
          const isOpen = open === practice.slug;
          const folded = open !== null && !isOpen;
          const basis = open === null ? 50 : isOpen ? OPEN_SHARE * 100 : (1 - OPEN_SHARE) * 100;
          /* The outer padding is the page margin, until the half folds. At
           * 1440 that margin is 168px and a folded half is 317px wide, so
           * keeping it would leave 121px for a 240px name column and cut the
           * heading off mid-word. Folded, the padding drops to the inner one
           * and the block slides out to the wall it is being pushed against,
           * which is also what it looks like: pushed aside, not sheared. */
          const pad = folded
            ? "xl:pl-7 xl:pr-7"
            : i === 1
              ? "xl:pl-7 xl:[padding-right:var(--gutter)]"
              : "xl:pr-7 xl:[padding-left:var(--gutter)]";
          return (
            <div
              key={practice.slug}
              /* Mouse only. A touch pointer enters and never leaves, so on a
                 phone this would latch one half open for the rest of the visit;
                 there the layout is stacked and everything is open anyway. */
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(practice.slug)}
              /* Tab into a module link and the half it belongs to opens, so the
                 keyboard never lands on something invisible. */
              onFocusCapture={() => setOpen(practice.slug)}
              /* Tablets: a tap opens, because they have neither hover nor the
                 stacked layout. */
              onClick={() => setOpen(practice.slug)}
              style={{ flexBasis: `${basis}%` }}
              className={`relative overflow-hidden px-6 py-9 transition-[flex-basis,background-color,padding] duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none xl:flex xl:py-7 ${pad} ${
                i === 1 ? "border-t border-line/[0.14] xl:border-t-0" : ""
              } ${isOpen ? "bg-brand/[0.038]" : ""}`}
            >
              {/* The divider is brand in the middle and the page's own hairline
                  at both ends, so the colour is at the point the two halves meet
                  rather than along the whole edge. */}
              {i === 1 && (
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 z-[2] hidden w-px bg-gradient-to-b from-rule via-brand/50 to-rule xl:block"
                />
              )}

              <div className="relative z-[1] flex flex-col xl:w-60 xl:shrink-0">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  {practice.kicker}
                </span>
                <h3 className="mt-3.5 font-display text-[2rem] font-normal leading-[1.02] tracking-[-0.04em] text-ink">
                  {practice.title}
                </h3>
                <p className="mt-4 max-w-[26ch] text-pretty text-sm leading-relaxed text-ink-3">
                  {practice.lead}
                </p>

                {/* The names, and only until this half has something better to
                    show. Hidden on a phone, where the items themselves are
                    always on screen and a list of the same names above them
                    would just be the same list twice. */}
                <div
                  className={`mt-7 hidden flex-col gap-2 transition-[opacity,transform] duration-300 xl:flex ${
                    isOpen ? "pointer-events-none -translate-y-1.5 opacity-0" : "opacity-100"
                  }`}
                >
                  {practice.rows.map((row) => (
                    <span
                      key={row.slug}
                      className="font-display text-base tracking-[-0.02em] text-ink-2"
                    >
                      {row.name}
                    </span>
                  ))}
                </div>

                <span
                  className={`mt-auto hidden items-center gap-2.5 pt-8 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors xl:flex ${
                    isOpen ? "text-accent" : "text-ink-4"
                  }`}
                >
                  <i
                    aria-hidden
                    className={`h-px transition-all duration-500 ${
                      isOpen ? "w-14 bg-accent" : "w-8 bg-rule"
                    }`}
                  />
                  {practice.cue}
                </span>
              </div>

              <div
                
                className={`relative z-[1] mt-9 w-full xl:mt-0 xl:ml-10 xl:shrink-0 xl:[width:var(--items-w)] xl:transition-[opacity,transform] xl:duration-500 xl:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:xl:transition-none ${
                  isOpen ? "xl:translate-x-0 xl:opacity-100" : "xl:translate-x-4 xl:opacity-0"
                }`}
              >
                {practice.slug === "web" ? (
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:h-full xl:grid-cols-4 xl:gap-5">
                    {practice.rows.map((row) => (
                      <ModuleCard key={row.slug} row={row} live={isOpen && !still} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:gap-[2.125rem]">
                    {practice.rows.map((row, n) => (
                      <StageCard key={row.slug} row={row} last={n === practice.rows.length - 1} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* The ground of the band: Seoul.
 *
 * It replaced a WIGTN wordmark, which filled the space and said nothing the
 * header does not already say twice. This says where the team works, which is a
 * fact about the business the section describes and one the page states nowhere
 * else.
 *
 * THE DRAWING IS THE ARTWORK ITSELF, not a redraw of it. Two hand-authored SVG
 * versions came before this and neither held up next to the reference: a line
 * set of this kind lives on hundreds of small decisions about weight, spacing
 * and where a roof stops, and reproducing those by hand from a picture gets you
 * something that reads as a copy.
 *
 * WHAT IT SHIPS AS IS A MASK, not a picture. The source is black ink on white,
 * which would have been a black rectangle of a watermark that could not follow
 * the theme. Ink was turned into alpha (crop the card and its title away, then
 * a = 255 - luminance with a little gain so the antialiased edges survive being
 * painted at 22 percent), so the file carries shape only and the colour comes
 * from the brand token underneath it. That is what lets it be purple at 22
 * percent on paper and at 30 on ink without a second asset.
 *
 * 1900px wide and 320KB, which is roughly twice the size it is drawn at and
 * about what the four module clips weigh together. It is webp because a mask
 * needs its alpha channel and nothing else, and png kept every antialiased grey
 * at four times the weight.
 *
 * `contain` with a bottom-centre position, so the art keeps its own proportions
 * and stands on the band's bottom edge at every width instead of stretching
 * with the window. */
function SeoulSkyline() {
  const mask = "url(/images/seoul-landmarks.webp)";
  return (
    <div
      aria-hidden
      className="h-[25rem] w-full bg-brand/[0.11] dark:bg-brand/[0.18]"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "bottom center",
        maskPosition: "bottom center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}

/* One module: the screen it is, then what it does.
 *
 * The clip is fetched when its half first opens and never before. `preload
 * ="none"` plus a src that is not set until then means four videos are not
 * pulled down by a reader who scrolls past, and until one has decoded the
 * poster is on screen, which is the frame the clip starts from. Under
 * prefers-reduced-motion the clip is never loaded at all and the still stays.
 *
 * The card is the whole link. The name reaching for accent on hover is the only
 * signal it needs; a row of four arrows would be four arrows. */
function ModuleCard({ row, live }: { row: PracticeRow; live: boolean }) {
  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || !row.clip) return;
    if (live) {
      if (!v.src) v.src = row.clip;
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [live, row.clip]);

  return (
    <a
      href={row.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col focus-visible:outline-none"
    >
      <span className="relative block h-44 overflow-hidden bg-paper-tint ring-1 ring-inset ring-line/10 group-focus-visible:ring-accent xl:h-[9.375rem]">
        <video
          ref={video}
          poster={row.image}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full scale-[1.06] object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
        />
      </span>
      <span className="mt-4 font-display text-lg tracking-[-0.03em] text-ink transition-colors group-hover:text-accent">
        {row.name}
      </span>
      <span className="mt-2 text-pretty text-[12.5px] leading-relaxed text-ink-3">{row.line}</span>
      <span className="mt-auto pt-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-5">
        {row.meta}
      </span>
    </a>
  );
}

/* One stage of an engagement. Not a link, because there is nowhere to send
 * anyone: what it promises is a thing the client ends up holding, not a page.
 *
 * The rule running out of the right edge is the sequence. It stops at the last
 * stage rather than continuing, because Feedback is where the engagement ends. */
function StageCard({ row, last }: { row: PracticeRow; last: boolean }) {
  return (
    <div className="group relative pt-6">
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-px bg-gradient-to-r from-brand/40 to-rule ${
          last ? "right-0" : "-right-8 md:-right-6 xl:-right-[2.125rem]"
        }`}
      />
      <span
        aria-hidden
        className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-brand/60 transition-transform duration-300 group-hover:scale-[1.35] group-hover:bg-accent"
      />
      <h4 className="font-display text-2xl font-normal tracking-[-0.035em] text-ink transition-colors group-hover:text-accent">
        {row.name}
      </h4>
      <p className="mt-3 text-pretty text-[13px] leading-relaxed text-ink-3">{row.line}</p>
      <span className="mt-4 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-5">
        {row.meta}
      </span>
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
