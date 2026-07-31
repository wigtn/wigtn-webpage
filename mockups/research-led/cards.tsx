"use client";

/** Shared article cards. Reused by the homepage and /work, /news. */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, Play } from "lucide-react";
import { articleHref, type Article } from "./data";
import { rise, VIEWPORT } from "./chrome";

/* Cover source: real image → YouTube thumbnail (for video notes) → none.
 * A missing cover falls back to <BrandCover/> so nothing renders empty. */
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
    <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-[150%] place-items-center rounded-full bg-black/45 ring-1 ring-inset ring-white/25 backdrop-blur transition-transform duration-300 group-hover:scale-110">
      <Play size={16} className="translate-x-[1px] fill-white text-white" />
    </span>
  );
}

/* Editorial "magazine cover" card, borderless. The visual carries a bold
 * title overlaid on a dark scrim; imageless articles get a branded gradient
 * cover instead of an empty placeholder. Meta sits quietly below the frame. */
export function ArticleCard({ a, i = 0 }: { a: Article; i?: number }) {
  const cover = coverSrc(a);
  return (
    <motion.div variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link href={articleHref(a.slug)} className="group block">
        {/* Cover */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          {cover ? (
            <img
              src={cover}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <BrandCover />
          )}
          {a.video && <PlayBadge />}

          {/* Legibility scrim */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
          />
          {/* Brand wash on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(520px circle at 50% 120%, rgba(117,59,189,0.28), transparent 60%)" }}
          />

          {a.placeholder && (
            <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-300 backdrop-blur">
              Placeholder
            </span>
          )}

          {/* Overlaid kicker + title */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-light">
              {a.tag}
            </span>
            <h3 className="mt-2 text-xl font-bold leading-[1.15] tracking-tight text-white [text-wrap:balance]">
              {a.title}
            </h3>
          </div>
        </div>

        {/* Meta below the frame */}
        <div className="mt-3 flex items-center gap-3 px-1 text-xs text-ink-4">
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
      <Link href={articleHref(a.slug)} className="group flex items-start gap-6 py-5">
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
