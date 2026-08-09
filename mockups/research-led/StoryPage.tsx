"use client";

/** /story: the newest story promoted, the rest in press-release rows.
 *
 * The feature block answers the review question about what this page does
 * as it grows (#78): the same thing the report site does. Its hub promotes
 * the latest report as a two-column feature (text left, cover right) over
 * the index, and this page mirrors that: STORIES[0] gets the feature, the
 * rest get the rows, and when the rows outgrow a screen they take the same
 * numbered pager /notices uses rather than a grid.
 *
 * TWO DESTINATIONS PER ENTRY, and that is why the card is not one anchor.
 * An entry pairs two posts: the notice (the acceptance, the placing) and the
 * long-form story. The notice supplies the words on this page, the story
 * supplies the picture, and both have pages worth reaching. /notices is the
 * release ledger and carries neither, so this section is the only way in for
 * both, which is the whole reason the second link is here.
 *
 * An earlier shape wrapped the whole card in one Link to the story. Adding
 * the notice to that would have nested an anchor inside an anchor, which is
 * invalid HTML, so the card is a `group` div with the picture and the title
 * as links and the two destinations named in a row underneath. The hover
 * still lights the title from anywhere on the card, and a reader who clicks
 * the picture or the title still gets the story, which is the destination
 * they were promised. */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { STORIES, articleHref, storyHref, type Story } from "./data";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";

/* The two links under an entry. The story is the primary and keeps the
 * accent; the notice is secondary and quieter, because it is two paragraphs
 * and the story is the account with the photographs in it. */
function Destinations({ story, className = "" }: { story: Story; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      <Link
        href={storyHref(story.storySlug)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
      >
        Read the full story
        <ArrowUpRight size={15} />
      </Link>
      <Link
        href={articleHref(story.article.slug)}
        className="inline-flex items-center gap-1.5 text-sm text-ink-4 underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        The notice
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

export function StoryPage() {
  const [latest, ...earlier] = STORIES;

  return (
    <PageShell>
      <PageHero
        title="What happened."
        lead="One event at a time: what it was, and how it ended. Everything opens the full account, photographs and all."
        titleClassName="text-accent"
        leadClassName="max-w-3xl"
      />

      <section className="mx-auto max-w-5xl px-6 pb-28 md:pb-40">
        {/* Latest story, featured. `animate` rather than `whileInView`: the
            block is the first thing under the hero and should be moving by
            the time the eye lands on it, not waiting to be scrolled to. */}
        <motion.div variants={rise} custom={1} initial="hidden" animate="show">
          <div className="group grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Latest
                </span>
                <span className="font-mono text-xs text-ink-5">{latest.article.date}</span>
              </div>
              <h2 className="font-display mt-3 text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-tight tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
                <Link href={storyHref(latest.storySlug)}>{latest.article.title}</Link>
              </h2>
              <p className="mt-4 line-clamp-3 text-base leading-relaxed text-ink-3">
                {latest.article.summary}
              </p>
              <Destinations story={latest} className="mt-5" />
            </div>
            <Link
              href={storyHref(latest.storySlug)}
              aria-hidden
              tabIndex={-1}
              className="relative order-1 aspect-[16/10] overflow-hidden rounded-xl bg-ink/[0.04] md:order-2"
            >
              <img
                src={latest.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
              />
            </Link>
          </div>
        </motion.div>

        {/* Guarded rather than always rendered: with one story `earlier` is
            empty and the border-t is a 1px rule hanging under the feature
            with nothing below it. (Zero stories is left to fail the build on
            the destructure above. STORIES is a hand-kept table, and a /story
            page with no stories on it is not a page worth exporting.) */}
        {earlier.length > 0 && (
          <ul className="mt-16 border-t border-line/[0.08] md:mt-20">
            {earlier.map((s, i) => (
              <li key={s.article.slug} className="border-b border-line/[0.08]">
                <motion.div
                  variants={rise}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                >
                  <div className="group flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8">
                    {/* aria-hidden with tabIndex -1: the picture is decorative
                        (alt="") and goes to the same place as the title beside
                        it, so exposing it doubles every row in the tab order
                        and reads as an unnamed link to a screen reader. */}
                    <Link
                      href={storyHref(s.storySlug)}
                      aria-hidden
                      tabIndex={-1}
                      className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-ink/[0.04] sm:w-52 md:w-64"
                    >
                      <img
                        src={s.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                          {s.article.tag}
                        </span>
                        <span className="font-mono text-xs text-ink-5">{s.article.date}</span>
                      </div>
                      <h2 className="font-display mt-2 text-xl font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent md:text-2xl">
                        <Link href={storyHref(s.storySlug)}>{s.article.title}</Link>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-3 md:text-base">
                        {s.article.summary}
                      </p>
                      <Destinations story={s} className="mt-4" />
                    </div>
                  </div>
                </motion.div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
