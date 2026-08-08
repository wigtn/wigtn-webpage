"use client";

/**
 * Research-led homepage. Positioning is the record: peer-reviewed work,
 * open models, reports that state their own limits.
 * ------------------------------------------------------------------
 * Type-led layout. Built on current patterns:
 *   - Display grotesk (Space Grotesk) headlines + mono (JetBrains Mono)
 *     micro-labels; Pretendard body
 *   - Warm off-white base (#F8F8F5), single accent = Pantone 265 (`brand`,
 *     leaning on `accent` for legibility on light)
 *   - Cards only where a card is a destination: Updates and Tech Reports. This
 *     used to read "card-less, hairlines not boxes", which the Updates grid
 *     already contradicted and the report grid finished off. Everything that is
 *     not a link out of the page is still separated by a hairline, not boxed.
 *   - "What we do": sticky left header + compact right capability list
 * Sections: 1 Hero · 2 What we do · 3 Updates · 4 Tech Reports · 5 CTA, every
 * pair of them separated by a Divider. Partners lives on /team.
 * MilestoneTimeline is retained but currently unrouted.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, Expand } from "lucide-react";
import {
  CAPABILITIES,
  MILESTONES,
  NEWSROOM,
  NEWS,
  TECH_REPORTS,
  TECH_REPORT_SITE,
} from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, IndexRule, rise, VIEWPORT } from "./chrome";
import { ArticleCard, ReportCard } from "./cards";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/brand";
import type { Theme } from "@/lib/theme";

/* The one type scale for a section title on this page.
 *
 * The four of them had drifted to four different sizes, from 3rem on Friends to
 * 6rem on Updates, which read as four unrelated pages stacked rather than one
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

const INTRO_SRC: Record<Theme, string> = {
  light: "/WIGTN%20Intro/04_Dynamic-White.mp4",
  dark: "/WIGTN%20Intro/03_Dynamic-Black.mp4",
};

type IntroResume = { time: number; shouldPlay: boolean; held: boolean };

function holdIntro(video: HTMLVideoElement) {
  if (video.dataset.held) return;
  video.dataset.held = "1";
  video.pause();
  video.currentTime = INTRO_HOLD_AT;
}

function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const resumeRef = useRef<IntroResume>({ time: 0, shouldPlay: true, held: false });
  const themeRef = useRef<Theme | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      const next: Theme = root.classList.contains("dark") ? "dark" : "light";
      const current = themeRef.current;
      if (current && current !== next) {
        const video = videoRef.current;
        if (video) {
          const held = Boolean(video.dataset.held) || video.ended || video.currentTime >= INTRO_HOLD_AT;
          resumeRef.current = {
            time: held ? INTRO_HOLD_AT : Math.min(video.currentTime, INTRO_HOLD_AT),
            shouldPlay: !video.paused && !held,
            held,
          };
        }
      }
      themeRef.current = next;
      setTheme(next);
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const holdAtMark = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= INTRO_HOLD_AT || video.ended) holdIntro(video);
  }, []);

  const restorePlayback = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const resume = resumeRef.current;
    video.currentTime = resume.held ? INTRO_HOLD_AT : Math.min(resume.time, INTRO_HOLD_AT);
    if (resume.held) {
      video.dataset.held = "1";
      video.pause();
    } else if (resume.shouldPlay) {
      void video.play().catch(() => {});
    }
  }, []);

  // Do not give the browser a media URL until the pre-paint theme class has
  // been read. This keeps the alternate 1 MB clip out of the request/decode
  // path and makes the server/client markup deterministic.
  if (!theme) return null;

  return (
    <video
      key={theme}
      ref={videoRef}
      src={INTRO_SRC[theme]}
      muted
      playsInline
      aria-hidden
      onLoadedMetadata={restorePlayback}
      onTimeUpdate={holdAtMark}
      onEnded={holdAtMark}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
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
            WIGTN is an independent AI research team. Five engineers with no lab
            behind them, publishing peer-reviewed work, releasing the models and code
            it runs on, and writing down what each result does not show.
          </motion.p>
          </div>
        </section>

        {/* ───── 2. What we do: sticky left header + compact right list (no cards) ───── */}
        {/* pb matches the pt of the section after it, so the Divider below sits
            centred in the gap the way the other three do. It had none, because
            until that Divider existed the next section's pt was the whole
            gap. */}
        <section
          id="capabilities"
          className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-40 md:pb-40 scroll-mt-24"
        >
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            {/* left: sticky header + eyebrow + CTA, anchors the column while the list scrolls */}
            <div className="md:sticky md:top-24 md:self-start">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-4">
                Activities · 01–04
              </span>
              <SectionTitle className="mt-4">What we do</SectionTitle>
              <p className="mt-5 max-w-xs text-pretty leading-relaxed text-ink-3">
                Peer-reviewed papers, open weights, and reports that say what they do not show.
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

        <Divider />

        {/* The partners wall used to sit here, titled "Friends & Collaborators".
            It moved to /team, which is the page about who we are; who we work
            with is the same question, and the homepage is a teaser whose job is
            to hand the reader on. See TeamPage. */}

        {/* ───── 3. Updates: featured items as article cards ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-40 md:pb-40">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle>Updates</SectionTitle>
            <ViewAll href={NEWS} label="All updates" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {NEWSROOM.map((a, i) => (
              <ArticleCard key={a.slug} a={a} i={i} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ───── 4. Reports: three covers pointing off-site ─────
             This slot used to advertise meetups that had not happened yet, next
             to three pillars that had. The report site is the thing this site
             most needs to hand a reader off to, and it exists.

             It was a text band until the cards went in. The band stated that
             the reports exist and asked the reader to take that on faith; the
             covers name three of them, and the one under Updates had already
             shown that a reader will click a cover and will not click a line of
             body copy. The heading and the link survive the change, so the band
             is still there for anyone who reads rather than looks.

             The list is TECH_REPORTS in data.ts, hand-kept. Read its comment
             before editing: nothing in this build checks it against the report
             site. ────────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          {/* Same title row as Updates, down to the class list: title left, the
              link to the full index right, both sitting on the baseline. The
              link used to hang off the bottom of the copy block instead, which
              put the two sections' "see everything" links at different heights
              on the same page. */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle>Tech Reports</SectionTitle>
            <a
              href={`${TECH_REPORT_SITE}/`}
              className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-accent transition-colors hover:text-ink"
            >
              Read the reports{" "}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
          {/* One lead, one paragraph. It was split in two and stacked, which
              put a paragraph break inside a single thought and left a ragged
              gap under the title for no reason.

              It used to end "In English and Korean." The report site dropped
              its Korean routes in wigtn-tech-report#5 and now ships English
              only, so the sentence was promising a language the destination no
              longer serves. */}
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-ink-2">
            The work, with its method and its limits: what we measured, what failed
            first, and what each result still does not answer.
          </p>

          <div className="mt-12 grid items-stretch gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {TECH_REPORTS.map((r, i) => (
              <ReportCard key={r.slug} r={r} i={i} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ───── 5. CTA: text layout; only the contact link is boxed in purple ───── */}
        <section className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-accent">
            Work with us
          </span>
          <h3 className="mt-5 font-display max-w-3xl text-pretty text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight leading-[1.15]">
            If you build AI in the open, we would rather hear from you than not.
          </h3>
          <p className="mt-6 max-w-2xl text-pretty text-ink-3 leading-relaxed">
            Read a report and tell us where it is wrong, use one of the models, open an
            issue, or write to us about work you think we should be doing. All of it is
            more useful to us than silence.
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
