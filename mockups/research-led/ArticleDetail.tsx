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
  hrefFor,
  getArticle,
  ARTICLES,
  type Block,
  type Article,
  type GalleryImage,
} from "./data";
// `import Link from "next/link"` above shadows data's `Link` type, so
// `article.links` inline instead of importing that type here.
import { SiteHeader, SiteFooter, BackdropDecor, EVENT_ICON, rise } from "./chrome";
import { CONTACT_HREF } from "@/lib/brand";

/* Media stays in the reading column.
 *
 * Figures used to break out to min(1080px, 100vw - 4rem), centred on the
 * viewport, on the argument that pictures trapped at text width read as
 * narrow. On the story pages, the only picture-heavy pages, the effect was
 * the opposite: every figure jutted half a column past the margins the eye
 * had been tracking, and the page read as misaligned rather than generous.
 * So a figure's width is the column's width now, and the solo caps in the
 * gallery branch keep a lone portrait or square from towering over it. */

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
        <figure className="my-12">
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
      /* A lone image gets capped rather than stretched to the full column.
       * A single portrait photo at column width is taller than a viewport,
       * which pushes everything after it off the screen; landscape can take
       * the whole measure. */
      const solo =
        n === 1
          ? block.images[0].aspect === "3/4"
            ? "max-w-[460px]"
            : block.images[0].aspect === "1/1"
              ? "max-w-[620px]"
              : ""
          : "";
      return (
        <figure className="my-12">
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
  /* A note drops the standfirst, the read time, the byline, the contact strip
   * and the related rail. See `layout` in data.ts for why that list and not a
   * word count. What a note keeps is the tag, the title, the date and place,
   * the body, and the links: everything that is the post rather than around
   * it. */
  const isNote = article.layout === "note";
  /* Same kind AND same channel. Kind alone would hand a blog post the short
   * news notes as "related" and link them at root slugs, and hand a release
   * page the blog posts at slugs that are RETIRED redirects now. A rail should
   * offer more of what the reader is already reading. */
  const related = isNote
    ? []
    : ARTICLES.filter(
        (a) =>
          a.kind === article.kind &&
          a.channel === article.channel &&
          a.slug !== article.slug,
      ).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans antialiased selection:bg-brand/20">
      <BackdropDecor />
      <SiteHeader />

      <main className="relative z-10">
        {/* 52rem, not max-w-3xl. Paired with the 20px body this lands the
            measure near 75 characters: wider page, same readability. */}
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
              {/* Release only. It sits opposite the tag rather than in the meta
                  row below, because a reader who came here from the Releases
                  list arrived with a version in mind and should see it confirmed
                  in the same glance as the title. */}
              {article.version && (
                <span className="ml-auto font-mono text-sm text-ink-4">{article.version}</span>
              )}
            </div>
            {/* A note's title tops out near where an article's starts. At
                3rem over two paragraphs the heading was the page and the post
                was the caption. */}
            <h1
              className={`mt-3 font-bold tracking-tight leading-[1.1] ${
                isNote
                  ? "text-[clamp(1.6rem,3.2vw,2.1rem)]"
                  : "text-[clamp(1.9rem,4.5vw,3rem)]"
              }`}
            >
              {article.title}
            </h1>
            {/* Standfirst sits above the body, so it has to be at least as
                large as it: 18px under a 20px body read as a mistake. A note
                has none, because `summary` is the row's subtitle on /notices
                and on a two-paragraph post it says what the first paragraph is
                about to say, one size larger. */}
            {!isNote && (
              <p className="mt-4 text-[1.375rem] leading-[1.6] text-ink-2">{article.summary}</p>
            )}

            <div
              className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-4 ${
                isNote ? "mt-4" : "mt-6"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {article.date}
              </span>
              {/* Both are dropped on a note. "1 min read" over fifty words is
                  a label longer than the thing it measures, and the byline is
                  "WIGTN" on every post this site has ever published. */}
              {!isNote && article.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {article.readTime} read
                </span>
              )}
              {article.place && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {article.place}
                </span>
              )}
              {!isNote && article.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} /> {article.author}
                </span>
              )}
            </div>

            {/* Where to get the thing, and where the measurements are.
                The report link is filled rather than outlined: on a release
                page every other button hands the reader an artifact, and this
                one hands them the evidence, which is the click worth making
                obvious. It is matched by label because `links` has no type
                field, and adding one to thread a boolean through four posts
                would be more machinery than the string comparison it replaces. */}
            {article.links && article.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {article.links.map((l) => {
                  const isReport = l.label === "Tech report";
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        isReport
                          ? "inline-flex items-center gap-1.5 rounded-sm bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                          : "inline-flex items-center gap-1.5 rounded-sm border border-line/20 px-4 py-2 text-sm font-medium text-ink-2 hover:border-ink hover:text-ink transition-colors"
                      }
                    >
                      {l.label} <ArrowUpRight size={14} />
                    </a>
                  );
                })}
              </div>
            )}
          </motion.header>

          {/* Hero visual, for a post that actually has one.
              This used to read `newsTopic !== "release"`, on the reasoning that
              a release has no picture but a story does, and a story's
              photograph is half the point. Both halves were true and the
              second one stopped being true here: the stories moved to the
              WIG-log feed, and every post left on this site is a release or a
              short notice. So the topic test only ever fired for a post with
              no picture, and drew the thing it was written to prevent, a
              gradient panel standing in for a photograph and pushing the first
              real sentence most of a screen down.
              The test is now on the picture itself. A post that carries an
              `image`, or a video to link, gets the frame; one that carries
              neither gets its first paragraph. */}
          {(article.image || article.video) && (
          /* The wrapper used to carry the media breakout; the cover sits in
              the column now like every other figure, and the plain div stays
              only to hold the margin outside the animated element. */
          <div className="mt-8">
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
          )}

          {/* Body */}
          <motion.div variants={rise} custom={2} initial="hidden" animate="show" className="mt-4">
            {article.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </motion.div>

          {/* CTA strip. Not on a note: a panel asking the reader to get in
              touch, set directly under two sentences saying a hackathon was
              won, is longer than the post and changes what the page is for. */}
          {!isNote && (
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line/[0.08] bg-paper-raised px-6 py-5">
              <p className="text-sm text-ink-3">Working on something like this? Let's talk.</p>
              <a
                href={CONTACT_HREF}
                className="inline-flex items-center gap-2 rounded-sm bg-brand text-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-brand-dark transition-colors"
              >
                Talk to us <ArrowUpRight size={16} />
              </a>
            </div>
          )}
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
            {/* Equal-height cards: the grid row already stretches its items,
                but the motion wrapper and the Link have to pass that height
                down, and the date is pinned with mt-auto. Otherwise a
                two-line title makes its card taller than its neighbours. */}
            <div className="grid items-stretch gap-6 md:grid-cols-3">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  variants={rise}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0px" }}
                  className="h-full"
                >
                  <Link
                    href={hrefFor(r)}
                    className="group flex h-full flex-col rounded-lg border border-line/[0.08] bg-paper-raised p-6 transition-all hover:border-brand/50 hover:bg-paper-tint"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-accent">
                      {r.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                    <div className="mt-auto pt-3 font-mono text-xs text-ink-5">{r.date}</div>
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
