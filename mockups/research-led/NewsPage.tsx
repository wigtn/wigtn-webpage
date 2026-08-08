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
 *   Hero      the newest story
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
  /* The hero is the newest story, not the newest item. Two reasons, both
   * learned from the version before this one:
   *
   * Picking "newest with a cover" let an imageless post be demoted while an
   * older one sat under a kicker reading "Latest", which is a lie the layout
   * tells on its own.
   *
   * Picking a release meant the Releases list beneath, which is titled and
   * looks complete, silently omitted its newest entry, and that release ran as
   * a 16/10 card carrying a package-page screenshot, which is the thing this
   * page is arranged to stop doing.
   *
   * A story always has a cover today. The fallback is here for the day one
   * does not. */
  const stories = NEWSROOM_FEED.filter((a) => !isRelease(a));
  const hero = stories[0] ?? NEWSROOM_FEED[0];
  const rest = stories.filter((a) => a.slug !== hero?.slug);
  const releases = NEWSROOM_FEED.filter(isRelease);
  const heroCover = hero ? coverSrc(hero) : undefined;

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

        {/* ── Hero: the newest story ────────────────────────────── */}
        {hero && (
          <section className="mt-12 border-t border-line/[0.08] pt-12 md:mt-14">
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
        {rest.length > 0 && (
          <section className="mt-24 md:mt-32">
            <GroupHeading title="Stories" note="Conferences, hackathons, what changed after" />
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <StoryCard key={a.slug} a={a} i={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── Releases: dated rows, no images. A package page screenshot is
             not a photograph and does not earn a card. ─────────────────── */}
        {releases.length > 0 && (
          <section className="mt-24 pb-24 md:mt-32">
            <GroupHeading title="Releases" note="What shipped, and where to get it" />
            <ul className="mt-2">
              {releases.map((a, i) => (
                <ReleaseRow key={a.slug} a={a} i={i} />
              ))}
            </ul>
          </section>
        )}

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

/* One row per release: date and version in the left rail, then title and
 * summary. No kicker repeating "Release" under a heading that says Releases.
 *
 * The version used to live inside the title, back when a title was a sentence
 * about one release. Titles are product names now, and two of these products
 * number twice: "WIGTN Plugin v2: Codex" is our second plugin and v0.3.0 is
 * the version of it that shipped. Separating them puts each number where it
 * can be read on its own, and stacks the four versions into a column. */
function ReleaseRow({ a, i }: { a: Article; i: number }) {
  return (
    <motion.li variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {/* The link wraps the title only. Wrapping the whole row gave the link a
          300-to-400 character accessible name, which is a paragraph per item in
          a screen reader's link list. The row is still fully clickable through
          the title's stretched hit area. */}
      <div className="group relative grid gap-1 border-b border-line/[0.06] py-6 md:grid-cols-[7.5rem_1fr] md:gap-8">
        <div className="font-mono text-sm text-ink-5 md:pt-1">
          <span>{a.date}</span>
          {a.version && (
            <span className="ml-2 text-ink-5/70 md:ml-0 md:mt-1 md:block">{a.version}</span>
          )}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
            <Link href={articleHref(a.slug)} className="after:absolute after:inset-0">
              {a.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-4">{a.summary}</p>
        </div>
      </div>
    </motion.li>
  );
}
