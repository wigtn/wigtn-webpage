"use client";

/** Shared article cards. Reused by the /blog index and any article rail. */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, Play } from "lucide-react";
import { hrefFor, type Article } from "./data";
import { rise, VIEWPORT } from "./chrome";

/* Cover source: real image → YouTube thumbnail (for video notes) → none.
 *
 * `undefined` means this article has no picture, and ArticleCard renders no
 * frame at all in that case. It used to fall back to <BrandCover/>, which was
 * right while the covered posts outnumbered the bare ones; a release ships no
 * cover on purpose, and the fallback turned the release rail into identical
 * gradient boxes standing in for pictures that are never coming. */
export function coverSrc(a: Article): string | undefined {
  if (a.image) return a.image;
  if (a.video && a.videoUrl) {
    const m = a.videoUrl.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
    if (m) return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`;
  }
  return undefined;
}

/* Branded fallback cover: aurora mesh + centered WIGTN mark. Used when an
 * article has no image and no video thumbnail. */
export function BrandCover() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 120% at 12% 0%, rgba(117,59,189,0.50), transparent 46%)," +
          "radial-gradient(100% 100% at 100% 100%, rgba(80,110,220,0.20), transparent 52%)," +
          "linear-gradient(160deg, #1a1130 0%, #0b0b0e 100%)",
      }}
    >
      <img
        src="/images/wigtn_mark_purple.png"
        alt=""
        className="absolute left-1/2 top-[40%] w-14 -translate-x-1/2 -translate-y-1/2 opacity-40 md:w-16"
      />
    </div>
  );
}

/* Centered play affordance for video covers. */
function PlayBadge() {
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/45 ring-1 ring-inset ring-white/25 backdrop-blur transition-transform duration-300 group-hover:scale-110">
      <Play size={16} className="translate-x-[1px] fill-white text-white" />
    </span>
  );
}

/* Homepage Notices card.
 *
 * This was a 4/5 portrait with the title burned into the bottom of the image
 * over a black scrim. The frame was taller than it was wide and every cover is
 * a landscape photograph, so `object-cover` threw away most of each one: the
 * Snowflake and TRAE covers lost their left and right thirds, and what was left
 * sat under a scrim dark enough to carry white text.
 *
 * So the picture gets a 16/10 frame and keeps its whole width, and the words
 * move out from on top of it. Nothing is overlaid now except the play badge,
 * which means the scrim is gone too, because its only job was legibility for
 * text that is no longer there.
 *
 * This is the same 16/10 frame the report site's own cards use, deliberately:
 * a reader moving between the two sites should not have to work out why one
 * set of pictures is shaped differently from the other. What separates these
 * is the meta row: a date and a place, pointing inside the site.
 *
 * All of that only applies when there is a picture. The blog posts on /blog
 * carry covers, so their cards draw the frame; a release ships no cover by
 * house rule, so its card draws a hairline instead. Do not reinstate the
 * gradient fallback for coverless cards: it was three copies of the same
 * non-picture standing where three different ones used to be.
 */
export function ArticleCard({ a, i = 0 }: { a: Article; i?: number }) {
  const cover = coverSrc(a);
  return (
    <motion.div variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link
        href={hrefFor(a)}
        /* A card with no picture gets a hairline where the frame was. Without
           it the three coverless cards read as loose paragraphs in a row
           rather than as three of one thing, and a rule is what this site uses
           to separate anything that is not a link out of the page. The
           `placeholder` badge lives inside the frame and so is not drawn here;
           no placeholder article has ever been coverless, and if one is, the
           badge is a build-time affordance rather than something a reader
           needs. */
        className={`group flex h-full flex-col ${cover ? "" : "border-t border-line/[0.10] pt-5"}`}
      >
        {cover && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink/[0.04]">
            <img
              src={cover}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
            {a.video && <PlayBadge />}

            {a.placeholder && (
              <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-300 backdrop-blur">
                Placeholder
              </span>
            )}
          </div>
        )}

        {/* Kicker and title, under the frame rather than on it */}
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.16em] text-accent ${
            cover ? "mt-4" : ""
          }`}
        >
          {a.tag}
        </span>
        <h3 className="font-display mt-2 text-lg font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
          {a.title}
        </h3>

        {/* mt-auto pins the meta row: these titles run one to three lines, and
            without it the dates in a grid row stop lining up. */}
        <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-ink-4">
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} /> {a.date}
          </span>
          {a.place && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} /> {a.place}
            </span>
          )}
          <ArrowUpRight
            size={14}
            className="ml-auto text-ink-5 transition-all group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </Link>
    </motion.div>
  );
}

/* Compact row, used in dense feeds. */
export function ArticleRow({ a, i = 0 }: { a: Article; i?: number }) {
  return (
    <motion.div variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link href={hrefFor(a)} className="group flex items-start gap-6 py-5">
        <span className="w-20 shrink-0 pt-1 font-mono text-xs text-ink-5">{a.date}</span>
        <div className="flex-1">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-accent">
            {a.tag}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-ink group-hover:text-accent transition-colors">
            {a.title}
          </h3>
          <p className="mt-1 text-sm text-ink-3 leading-relaxed">{a.summary}</p>
        </div>
        <ArrowUpRight size={18} className="mt-1 shrink-0 text-ink-5 group-hover:text-accent transition-colors" />
      </Link>
    </motion.div>
  );
}
