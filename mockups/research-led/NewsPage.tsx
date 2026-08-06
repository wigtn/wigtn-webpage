"use client";

/**
 * /news (labelled "Updates" in the nav): Apple-Newsroom-style layout, with one
 * rule that holds everywhere: **the filter owns the whole page**. The category
 * nav sits at the top, right under the masthead, so it reads as a control over
 * everything below it. On "All" the newest item runs as a large hero and
 * everything else falls into a uniform 3-up grid. Pick a category and the hero
 * drops away entirely, leaving a single uniform grid of every item in that
 * category, including the one that was the hero.
 *
 * That last part is the point. The hero used to be excluded from the filtered
 * list, so choosing "Announcements" while the sole announcement *was* the hero
 * rendered an empty state directly beneath the very story it claimed not to
 * have. Filtering the full feed removes that class of bug rather than special-
 * casing it.
 *
 * Filter tabs carry live counts so an empty or thin category is visible before
 * it's clicked. Cards use real images / video thumbnails and link to the detail
 * page (/slug/). Header and footer come from the shared PageShell.
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell, rise, VIEWPORT } from "./chrome";
import { coverSrc, BrandCover } from "./cards";
import { NEWSROOM_FEED, articleHref, type Article, type NewsTopic } from "./data";

type Cat = NewsTopic; // award | release | announcement | community
type Filter = "all" | Cat;

function catOf(a: Article): Cat {
  return a.newsTopic ?? "announcement";
}

/* Card labels are unified to the feed category buckets (not per-article
 * tags like VIDEO / PAPER · ACL), matching the filter nav. */
const CAT_LABEL: Record<Cat, string> = {
  award: "Award",
  release: "Release",
  announcement: "Announcement",
  community: "Community",
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "award", label: "Awards" },
  { key: "release", label: "Releases" },
  { key: "announcement", label: "Announcements" },
  { key: "community", label: "Community" },
];

/* Per-tab counts, computed once at module scope. NEWSROOM_FEED is a static
 * constant, so there is nothing to recompute per render. */
const COUNTS: Record<Filter, number> = NEWSROOM_FEED.reduce(
  (acc, a) => {
    acc[catOf(a)] += 1;
    return acc;
  },
  { all: NEWSROOM_FEED.length, award: 0, release: 0, announcement: 0, community: 0 },
);

/* Load-more: show the first three grid rows, then reveal two rows per click.
 * The button only appears once the grid actually overflows this count, so a
 * small feed shows everything and stays button-free. */
const INITIAL_GRID = 9;
const LOAD_STEP = 6;

function VideoDot() {
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-lg text-white ring-1 ring-inset ring-white/25 backdrop-blur">
      ▶
    </span>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
      {children}
    </span>
  );
}

export function NewsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(INITIAL_GRID);

  const isAll = filter === "all";

  // The hero is an "All" affordance only. Prefer the newest story that
  // actually has a cover (a hero-sized BrandCover placeholder carries the page
  // poorly), and fall back to the newest story outright.
  const hero = isAll ? NEWSROOM_FEED.find((a) => coverSrc(a)) ?? NEWSROOM_FEED[0] : undefined;
  const heroCover = hero ? coverSrc(hero) : undefined;

  // Filtered views draw from the entire feed; only "All" carves out the hero.
  const pool = isAll
    ? NEWSROOM_FEED.filter((a) => a.slug !== hero?.slug)
    : NEWSROOM_FEED.filter((a) => catOf(a) === filter);

  const grid = pool.slice(0, shown);
  const hidden = pool.length - grid.length;

  // Community has no published stories yet, so its tab (and the full feed)
  // carries a "coming soon" panel instead of an empty grid.
  const showSoon = isAll || filter === "community";

  function pick(key: Filter) {
    setFilter(key);
    setShown(INITIAL_GRID); // reset the load-more window per filter
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6">
        {/* Masthead */}
        <div className="pt-28 md:pt-32">
          {/* Masthead scale: ~3× the old 11px eyebrow. Tracking eases back as
              the type grows so the wordmark still fits a phone width, and the
              text-indent offsets the trailing letter-space so the centred
              wordmark sits on the true optical centre. Now the page's largest
              text on every filter, so it carries the h1 (article headlines
              below step down to h2) — category tabs render no hero. */}
          <h1 className="text-center text-[1.5rem] font-semibold uppercase leading-tight tracking-[0.22em] text-ink-4 [text-indent:0.22em] md:text-[2rem]">
            WIGTN Updates
          </h1>
        </div>

        {/* ── Category nav: sits directly under the masthead so the page's
             controls are the first thing after the title, not something you
             discover halfway down. Counts make a thin category visible before
             it's clicked, so no tab is a surprise dead end. ────────────── */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 border-y border-line/[0.08] py-4">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count = COUNTS[f.key];
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => pick(f.key)}
                aria-pressed={active}
                className={`border-b-2 pb-1 text-sm transition-colors ${
                  active
                    ? "border-accent font-semibold text-ink"
                    : "border-transparent text-ink-4 hover:text-ink-2"
                }`}
              >
                {f.label}
                <span className="ml-1.5 font-mono text-[11px] text-ink-5">{count}</span>
              </button>
            );
          })}
        </nav>

        {/* ── Hero: newest story, "All" only ───────────── */}
        {hero && (
          <section className="mt-12 md:mt-14">
            <Link
              href={articleHref(hero.slug)}
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
                {heroCover ? (
                  <img
                    src={heroCover}
                    alt=""
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <BrandCover />
                )}
                {hero.video && <VideoDot />}
              </div>
              <div>
                <Kicker>{CAT_LABEL[catOf(hero)]}</Kicker>
                <h2 className="font-display mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-ink text-balance transition-colors group-hover:text-accent md:text-4xl">
                  {hero.title}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-3 md:text-lg">{hero.summary}</p>
                <div className="mt-5 text-sm text-ink-4">
                  {hero.date}
                  {hero.place ? ` · ${hero.place}` : ""}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Uniform grid ───────────────────────────────────────── */}
        <section className={`space-y-14 pb-24 ${hero ? "mt-14" : "mt-12"}`}>
          {grid.length > 0 && (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((a, i) => (
                <StoryCard key={a.slug} a={a} i={i} />
              ))}
            </div>
          )}

          {hidden > 0 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setShown((s) => s + LOAD_STEP)}
                className="rounded-full border border-line/15 px-6 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:border-brand hover:bg-brand/10"
              >
                More stories <span className="text-ink-4">({hidden})</span>
              </button>
            </div>
          )}

          {pool.length === 0 && !showSoon && (
            <p className="py-10 text-center text-sm text-ink-5">No stories in this category yet.</p>
          )}

          {/* Community: coming soon */}
          {showSoon && (
            <motion.div
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="rounded-[26px] border border-dashed border-line/15 bg-paper-raised px-8 py-14 text-center"
            >
              <Kicker>Community · Coming soon</Kicker>
              <h3 className="font-display mx-auto mt-3 max-w-xl text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Meetups &amp; open seminars
              </h3>
              <p className="mx-auto mt-3 max-w-md text-ink-3 leading-relaxed">
                Our first open meetups are being scheduled: builders swapping real production
                lessons, in the open. Recaps and recordings will land here.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@wigtn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
              >
                Get notified <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </motion.div>
          )}
        </section>
      </div>
    </PageShell>
  );
}

/* Story card, one size everywhere. The hero is the only scale break on the
 * page; a third card size for six stories was more hierarchy than the volume
 * could carry. */
function StoryCard({ a, i }: { a: Article; i: number }) {
  const cover = coverSrc(a);
  return (
    <motion.div variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link href={articleHref(a.slug)} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
          {cover ? (
            <img
              src={cover}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <BrandCover />
          )}
          {a.video && <VideoDot />}
        </div>
        <div className="mt-5">
          <Kicker>{CAT_LABEL[catOf(a)]}</Kicker>
          <h3 className="font-display mt-2 text-lg font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
            {a.title}
          </h3>
          <div className="mt-3 text-sm text-ink-4">
            {a.date}
            {a.place ? ` · ${a.place}` : ""}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
