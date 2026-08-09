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
 * Rows and feature navigate, they do not expand. Each is one Link to the
 * story page at /story/<slug>, and the "Read the full story" line inside a
 * row is a label on that link rather than a second control: a nested anchor
 * would be invalid HTML, and a reader who clicks the picture or the title
 * wants the same place the label names. The label said "Read on Blog" while
 * the pages sat under /blog; the blog closed before launch and the stories
 * are Story's own pages now. */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { STORIES, storyHref } from "./data";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";

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
          <Link
            href={storyHref(latest.storySlug)}
            className="group grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10"
          >
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Latest
                </span>
                <span className="font-mono text-xs text-ink-5">{latest.article.date}</span>
              </div>
              <h2 className="font-display mt-3 text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-tight tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
                {latest.article.title}
              </h2>
              <p className="mt-4 line-clamp-3 text-base leading-relaxed text-ink-3">
                {latest.article.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Read the full story
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
            <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-xl bg-ink/[0.04] md:order-2">
              <img
                src={latest.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </motion.div>

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
                <Link
                  href={storyHref(s.storySlug)}
                  className="group flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-ink/[0.04] sm:w-52 md:w-64">
                    <img
                      src={s.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {s.article.tag}
                      </span>
                      <span className="font-mono text-xs text-ink-5">{s.article.date}</span>
                    </div>
                    <h2 className="font-display mt-2 text-xl font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent md:text-2xl">
                      {s.article.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-3 md:text-base">
                      {s.article.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Read the full story
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
