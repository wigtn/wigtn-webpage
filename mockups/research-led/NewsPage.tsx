"use client";

/**
 * /news, labelled "Updates" in the nav.
 *
 * The feed carries two kinds of thing and they are not the same size. A
 * conference trip report runs eleven minutes and earns photographs; "WIGSS is
 * on npm" runs two and earns a line. A uniform card grid put them side by side
 * at identical weight, which told the reader they were equivalent. They are not.
 *
 * So the page is one hero and two titled groups:
 *
 *   Hero      the newest item, whatever kind it is
 *   Stories   conferences, hackathons, anything with a scene to describe
 *   Releases  what shipped, as dated rows with no image
 *
 * The split is `newsTopic === "release"`, which the data already carries, so
 * nothing new has to be maintained to keep a post in the right group.
 *
 * This replaces a five-tab category filter. With seven items in two natural
 * groups, one tab read 0 and another read 1, and the filter was doing less work
 * than two headings do for free. If the feed grows past what one page can hold,
 * the filter is the thing to bring back, not a "load more" under a list of six.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell, rise, VIEWPORT } from "./chrome";
import { coverSrc, BrandCover } from "./cards";
import { NEWSROOM_FEED, articleHref, type Article } from "./data";

const isRelease = (a: Article) => a.newsTopic === "release";

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

function GroupHeading({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line/[0.08] pb-4">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      <span className="text-sm text-ink-4">{note}</span>
    </div>
  );
}

export function NewsPage() {
  /* The hero is whatever is newest. Prefer one with a cover, because a
   * hero-sized BrandCover carries the top of the page poorly, and fall back to
   * the newest outright. */
  const hero = NEWSROOM_FEED.find((a) => coverSrc(a)) ?? NEWSROOM_FEED[0];
  const rest = NEWSROOM_FEED.filter((a) => a.slug !== hero?.slug);
  const stories = rest.filter((a) => !isRelease(a));
  const releases = rest.filter(isRelease);

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6">
        <div className="pt-28 md:pt-32">
          {/* Masthead scale: tracking eases back as the type grows so the
              wordmark still fits a phone width, and the text-indent offsets the
              trailing letter-space so it sits on the true optical centre. */}
          <h1 className="text-center text-[1.5rem] font-semibold uppercase leading-tight tracking-[0.22em] text-ink-4 [text-indent:0.22em] md:text-[2rem]">
            WIGTN Updates
          </h1>
        </div>

        {/* ── Hero: the newest item ─────────────────────────────── */}
        {hero && (
          <section className="mt-12 border-t border-line/[0.08] pt-12 md:mt-14">
            <Link
              href={articleHref(hero.slug)}
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
                {coverSrc(hero) ? (
                  <img
                    src={coverSrc(hero)}
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
                <Kicker>Latest</Kicker>
                <h2 className="font-display mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-ink text-balance transition-colors group-hover:text-accent md:text-4xl">
                  {hero.title}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-3 md:text-lg">{hero.summary}</p>
                <div className="mt-5 text-sm text-ink-4">
                  {hero.date}
                  {hero.place ? ` · ${hero.place}` : ""}
                  {hero.readTime ? ` · ${hero.readTime}` : ""}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Stories: the ones with a scene to describe ────────── */}
        {stories.length > 0 && (
          <section className="mt-24 md:mt-32">
            <GroupHeading title="Stories" note="Conferences, hackathons, what changed after" />
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((a, i) => (
                <StoryCard key={a.slug} a={a} i={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── Releases: dated rows, no images. A package page screenshot is
             not a photograph and does not earn a card. ─────────────────── */}
        {releases.length > 0 && (
          <section className="mt-24 md:mt-32">
            <GroupHeading title="Releases" note="What shipped, and where to get it" />
            <ul className="mt-2">
              {releases.map((a, i) => (
                <ReleaseRow key={a.slug} a={a} i={i} />
              ))}
            </ul>
          </section>
        )}

        <div className="pb-24" />
      </div>
    </PageShell>
  );
}

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
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
            {a.title}
          </h3>
          <div className="mt-3 text-sm text-ink-4">
            {a.date}
            {a.place ? ` · ${a.place}` : ""}
            {a.readTime ? ` · ${a.readTime}` : ""}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* One row per release: date, title, summary. The title already carries the
 * version and the month, so the row needs no kicker repeating "Release". */
function ReleaseRow({ a, i }: { a: Article; i: number }) {
  return (
    <motion.li variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link
        href={articleHref(a.slug)}
        className="group grid gap-1 border-b border-line/[0.06] py-6 md:grid-cols-[7.5rem_1fr] md:gap-8"
      >
        <span className="font-mono text-sm text-ink-5 md:pt-1">{a.date}</span>
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
            {a.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-4">{a.summary}</p>
        </div>
      </Link>
    </motion.li>
  );
}
