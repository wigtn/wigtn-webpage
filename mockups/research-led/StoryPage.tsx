"use client";

/** /story: the press-release list. One row per event, from STORIES in data.ts:
 * thumbnail, tag, date, title, summary, and a link to the full account on the
 * blog.
 *
 * Rows navigate, they do not expand. The whole row is one Link to the blog
 * post, and the "Read on Blog" line inside it is a label on that link rather
 * than a second control: a nested anchor would be invalid HTML, and a reader
 * who clicks the picture or the title wants the same place the label names. */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { STORIES, BLOG_INDEX, blogHref } from "./data";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";

export function StoryPage() {
  return (
    <PageShell>
      <PageHero
        title="What happened."
        lead={
          <>
            One row per event: what it was, and how it ended. The full account
            of each, photographs and all, is on{" "}
            <Link
              href={BLOG_INDEX}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              the blog
            </Link>
            .
          </>
        }
        titleClassName="text-accent"
        leadClassName="max-w-3xl"
      />

      <section className="mx-auto max-w-5xl px-6 pb-28 md:pb-40">
        <ul className="border-t border-line/[0.08]">
          {STORIES.map((s, i) => (
            <li key={s.article.slug} className="border-b border-line/[0.08]">
              <motion.div
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                <Link
                  href={blogHref(s.blogSlug)}
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
                      Read on Blog
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
