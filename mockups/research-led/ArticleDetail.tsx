"use client";

/**
 * Article detail. One layout serves every kind (report / event /
 * community / insight); kind-specific bits render conditionally. Content
 * comes from data.ts by slug, standing in for a future MDX render.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Play, Clock, User } from "lucide-react";
import {
  HOME,
  articleHref,
  getArticle,
  ARTICLES,
  type Block,
  type Article,
  type GalleryImage,
} from "./data";
// `import Link from "next/link"` above shadows data's `Link` type, so
// `article.links` inline instead of importing that type here.
import { SiteHeader, SiteFooter, BackdropDecor, EVENT_ICON, rise } from "./chrome";

/* Media breaks out of the reading column.
 *
 * The article column is max-w-3xl because that lands the body near the 45-75
 * characters-per-line range that long-form reading wants; widening the text
 * to fill the window would push it past 100 and make the eye lose the next
 * line. But an image has no such limit, and pictures trapped at text width
 * are what makes a page read as narrow. So text keeps its measure and figures
 * are centred on the viewport instead of the column.
 *
 * left-1/2 + -translate-x-1/2 re-centres against the viewport; the width is
 * capped so it never runs edge to edge, and the vw fallback keeps a gutter on
 * screens narrower than the cap. */
const MEDIA_BREAKOUT =
  "relative left-1/2 w-[min(1080px,calc(100vw-4rem))] -translate-x-1/2";

const KIND_LABEL: Record<Article["kind"], string> = {
  report: "Research",
  event: "Events",
  community: "Community",
  insight: "Tech Insights",
};

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "h":
      return (
        <h2 className="mt-14 mb-4 text-[1.75rem] font-semibold tracking-tight text-ink">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-brand pl-5 text-xl font-medium leading-snug text-ink">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 text-[1.125rem] leading-[1.7] text-ink-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className={`my-12 ${MEDIA_BREAKOUT}`}>
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg border border-line/[0.08] object-cover"
          />
          {block.caption && (
            <figcaption className="mt-3 text-sm leading-relaxed text-ink-4">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "gallery": {
      /* Columns follow the count so a section can carry one photo or four
       * without a ragged last row: 1 runs full width, 2 sit side by side,
       * 3 go across, 4 form a 2x2 (a 3+1 row orphans the fourth), and 5 or
       * more fall back to threes. */
      const n = block.images.length;
      const cols =
        n === 1 ? "" : n === 2 || n === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3";
      /* Tailwind needs whole class names present at build time, so these are
       * looked up rather than interpolated. */
      const ASPECT: Record<NonNullable<GalleryImage["aspect"]>, string> = {
        "4/3": "aspect-[4/3]",
        "3/4": "aspect-[3/4]",
        "1/1": "aspect-square",
        "16/9": "aspect-video",
      };
      /* A lone image gets capped rather than stretched to the full breakout.
       * A single portrait photo at 1080px wide is 1440px tall, which pushes
       * everything after it off the screen; landscape can take more room. */
      const solo =
        n === 1
          ? block.images[0].aspect === "3/4"
            ? "max-w-[460px]"
            : block.images[0].aspect === "1/1"
              ? "max-w-[620px]"
              : ""
          : "";
      return (
        <figure className={`my-12 ${MEDIA_BREAKOUT}`}>
          <div className={`mx-auto grid gap-3 ${cols} ${solo}`}>
            {block.images.map((im, i) => (
              <div key={i}>
                <img
                  src={im.src}
                  alt={im.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full rounded-lg border border-line/[0.08] object-cover ${
                    ASPECT[im.aspect ?? "4/3"]
                  }`}
                />
                {im.caption && <p className="mt-2 text-xs leading-relaxed text-ink-4">{im.caption}</p>}
              </div>
            ))}
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm leading-relaxed text-ink-4">{block.caption}</figcaption>
          )}
        </figure>
      );
    }
    default:
      /* 20px, not 18. Line length is what limits a reading column, not pixel
       * width: at 18px the old 720px column ran ~89 characters, past the
       * 45-75 that long-form reading wants. Growing the type as the column
       * grows keeps the measure near 75 while the page reads wider. */
      return <p className="my-6 text-[1.25rem] leading-[1.75] text-ink-3">{block.text}</p>;
  }
}

export function ArticleDetail({ slug }: { slug: string }) {
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="relative min-h-screen bg-paper text-ink font-sans antialiased">
        <BackdropDecor />
        <SiteHeader />
        <main className="relative z-10 max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Article not found</h1>
          <Link href={HOME} className="mt-6 inline-flex items-center gap-2 text-accent hover:text-ink">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const EventIcon = article.icon ? EVENT_ICON[article.icon] : null;
  const related = ARTICLES.filter((a) => a.kind === article.kind && a.slug !== article.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans antialiased selection:bg-brand/20">
      <BackdropDecor />
      <SiteHeader />

      <main className="relative z-10">
        {/* 52rem, not max-w-3xl. Paired with the 20px body this lands the
            measure near 75 characters — wider page, same readability. */}
        <article className="max-w-[52rem] mx-auto px-6 pt-24 pb-8 md:pt-28">
          {/* Header */}
          <motion.header variants={rise} initial="hidden" animate="show">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-accent">
                {article.tag}
              </span>
              {article.placeholder && (
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-ink-4 border border-line/15 rounded-full px-2 py-0.5">
                  Placeholder
                </span>
              )}
            </div>
            <h1 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-tight leading-[1.1]">
              {article.title}
            </h1>
            {/* Standfirst sits above the body, so it has to be at least as
                large as it — 18px under a 20px body read as a mistake. */}
            <p className="mt-4 text-[1.375rem] leading-[1.6] text-ink-2">{article.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-4">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {article.date}
              </span>
              {article.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {article.readTime} read
                </span>
              )}
              {article.place && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {article.place}
                </span>
              )}
              {article.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} /> {article.author}
                </span>
              )}
            </div>

            {article.links && article.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {article.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-line/20 px-4 py-2 text-sm font-medium text-ink-2 hover:border-ink hover:text-ink transition-colors"
                  >
                    {l.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </motion.header>

          {/* Hero visual */}
          {/* Breakout lives on a plain wrapper, not on the motion element:
              framer-motion writes `transform` inline to animate, which would
              overwrite the -translate-x-1/2 half of the centring trick and
              shove the cover off the right edge of the page. */}
          <div className={`mt-8 ${MEDIA_BREAKOUT}`}>
            <motion.div
              variants={rise}
              custom={1}
              initial="hidden"
              animate="show"
              className="relative aspect-[16/8] rounded-lg overflow-hidden border border-line/[0.08] bg-gradient-to-br from-brand/20 via-brand/5 to-transparent flex items-center justify-center"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
              )}
              {article.video ? (
                <a
                  href={article.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Play video"
                  className="relative h-16 w-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
                >
                  <Play className="text-[#0A0A0A] ml-1" size={26} fill="currentColor" />
                </a>
              ) : article.image ? null : EventIcon ? (
                <EventIcon className="text-accent/70" size={56} strokeWidth={1.25} />
              ) : (
                <span className="font-mono text-7xl font-bold text-brand/30 select-none">w.</span>
              )}
            </motion.div>
          </div>

          {/* Body */}
          <motion.div variants={rise} custom={2} initial="hidden" animate="show" className="mt-4">
            {article.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </motion.div>

          {/* CTA strip */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line/[0.08] bg-paper-raised px-6 py-5">
            <p className="text-sm text-ink-3">Working on something like this? Let's talk.</p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@wigtn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-brand text-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-brand-dark transition-colors"
            >
              Talk to us <ArrowUpRight size={16} />
            </a>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-ink-4">
                More from {KIND_LABEL[article.kind]}
              </span>
              <span className="h-px flex-1 bg-line/[0.08]" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  variants={rise}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0px" }}
                >
                  <Link
                    href={articleHref(r.slug)}
                    className="group block rounded-lg border border-line/[0.08] bg-paper-raised p-6 hover:border-brand/50 hover:bg-paper-tint transition-all"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-accent">
                      {r.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                    <div className="mt-3 font-mono text-xs text-ink-5">{r.date}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
