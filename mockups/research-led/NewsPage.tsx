"use client";

/**
 * /news — Apple-Newsroom-style layout. Hierarchy over variety: one large
 * featured story, then (when there are enough items) a 2-up secondary row,
 * then a calm uniform 3-up grid. When a filter narrows the feed, it drops to a
 * single uniform grid — variety only when the volume earns it. Cards use real
 * images / video thumbnails and link to the detail page (/slug/). Header and
 * footer come from the shared PageShell.
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell, rise, VIEWPORT } from "./chrome";
import { coverSrc, BrandCover } from "./cards";
import { NEWSROOM_FEED, articleHref, type Article, type NewsTopic } from "./data";

type Cat = NewsTopic; // award | release | announcement | community

function catOf(a: Article): Cat {
  return a.newsTopic ?? "announcement";
}

/* Card labels are unified to the newsroom category buckets (not per-article
 * tags like VIDEO / PAPER · ACL), matching the filter nav. */
const CAT_LABEL: Record<Cat, string> = {
  award: "Award",
  release: "Release",
  announcement: "Announcement",
  community: "Community",
};

const FILTERS: { key: "all" | Cat; label: string }[] = [
  { key: "all", label: "All Stories" },
  { key: "award", label: "Awards" },
  { key: "release", label: "Releases" },
  { key: "announcement", label: "Announcements" },
  { key: "community", label: "Community" },
];

/* Load-more: show the first three grid rows, then reveal two rows per click.
 * The button only appears once the grid actually overflows this initial count,
 * so a small feed shows everything and stays button-free. */
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
    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-light">
      {children}
    </span>
  );
}

export function NewsPage() {
  const [filter, setFilter] = useState<"all" | Cat>("all");
  const [shown, setShown] = useState(INITIAL_GRID);

  const featured = NEWSROOM_FEED.find((a) => coverSrc(a)) ?? NEWSROOM_FEED[0];
  const rest = NEWSROOM_FEED.filter((a) => a.slug !== featured?.slug);
  const visible = rest.filter((a) => filter === "all" || catOf(a) === filter);
  const showSoon = filter === "all" || filter === "community";
  const heroCover = featured ? coverSrc(featured) : undefined;

  function pick(key: "all" | Cat) {
    setFilter(key);
    setShown(INITIAL_GRID); // reset the load-more window per filter
  }

  // A 2-up secondary row only when there's enough volume to also fill a grid
  // below it; otherwise everything falls into one calm uniform grid.
  const useSecondary = visible.length >= 5;
  const lead = useSecondary ? visible.slice(0, 2) : [];
  const tailAll = useSecondary ? visible.slice(2) : visible;
  const tail = tailAll.slice(0, shown);
  const hidden = tailAll.length - tail.length;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6">
        {/* Masthead */}
        <div className="pt-28 md:pt-32">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            WIGTN Newsroom
          </p>
        </div>

        {/* ── Featured story — horizontal split (image + copy) ───── */}
        {featured && (
          <section className="mt-8">
            <Link
              href={articleHref(featured.slug)}
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
                {heroCover ? (
                  <img
                    src={heroCover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <BrandCover />
                )}
                {featured.video && <VideoDot />}
              </div>
              <div>
                <Kicker>{CAT_LABEL[catOf(featured)]}</Kicker>
                <h1 className="font-display mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white text-balance transition-colors group-hover:text-brand-light md:text-4xl">
                  {featured.title}
                </h1>
                <p className="mt-4 leading-relaxed text-zinc-400 md:text-lg">{featured.summary}</p>
                <div className="mt-5 text-sm text-zinc-500">
                  {featured.date}
                  {featured.place ? ` · ${featured.place}` : ""}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Category nav ───────────────────────────────────────── */}
        <nav className="mt-16 flex flex-wrap justify-center gap-x-7 gap-y-3 border-y border-white/10 py-4">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => pick(f.key)}
                aria-pressed={active}
                className={`border-b-2 pb-1 text-sm transition-colors ${
                  active
                    ? "border-brand-light font-semibold text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </nav>

        {/* ── Feed: (secondary 2-up) + uniform 3-up ──────────────── */}
        <section className="mt-14 space-y-14 pb-24">
          {lead.length > 0 && (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {lead.map((a, i) => (
                <StoryCard key={a.slug} a={a} i={i} scale="lg" />
              ))}
            </div>
          )}

          {tail.length > 0 && (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {tail.map((a, i) => (
                <StoryCard key={a.slug} a={a} i={lead.length + i} scale="md" />
              ))}
            </div>
          )}

          {hidden > 0 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setShown((s) => s + LOAD_STEP)}
                className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-brand hover:bg-brand/10"
              >
                More stories <span className="text-zinc-500">({hidden})</span>
              </button>
            </div>
          )}

          {visible.length === 0 && !showSoon && (
            <p className="py-10 text-center text-sm text-zinc-600">No stories in this category yet.</p>
          )}

          {/* Community — coming soon */}
          {showSoon && (
            <motion.div
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="rounded-[26px] border border-dashed border-white/15 bg-white/[0.015] px-8 py-14 text-center"
            >
              <Kicker>Community · Coming soon</Kicker>
              <h3 className="font-display mx-auto mt-3 max-w-xl text-2xl font-bold tracking-tight text-white md:text-3xl">
                Meetups &amp; open seminars
              </h3>
              <p className="mx-auto mt-3 max-w-md text-zinc-400 leading-relaxed">
                Our first open meetups are being scheduled — builders swapping real production
                lessons, in the open. Recaps and recordings will land here.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@wigtn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-light transition-colors hover:text-white"
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

type Scale = "lg" | "md";

/* Story card. `scale` tunes image ratio + headline size; `lg` (secondary row)
 * shows a two-line summary, `md` (grid) stays compact. */
function StoryCard({ a, i, scale }: { a: Article; i: number; scale: Scale }) {
  const cover = coverSrc(a);
  const lg = scale === "lg";
  return (
    <motion.div variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link href={articleHref(a.slug)} className="group block">
        <div
          className={`relative overflow-hidden rounded-[20px] ${lg ? "aspect-[16/10]" : "aspect-[4/3]"}`}
        >
          {cover ? (
            <img
              src={cover}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <BrandCover />
          )}
          {a.video && <VideoDot />}
        </div>
        <div className="mt-5">
          <Kicker>{CAT_LABEL[catOf(a)]}</Kicker>
          <h3
            className={`font-display mt-2 font-semibold leading-snug tracking-tight text-white text-balance transition-colors group-hover:text-brand-light ${
              lg ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {a.title}
          </h3>
          {lg && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">{a.summary}</p>}
          <div className="mt-3 text-sm text-zinc-500">
            {a.date}
            {a.place ? ` · ${a.place}` : ""}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
