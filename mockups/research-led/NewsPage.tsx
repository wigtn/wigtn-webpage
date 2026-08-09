"use client";

/**
 * /news, labelled "Updates" in the nav.
 *
 * Two groups: News, then Releases. What separates them is who the item is
 * about. A release is about a thing you can install and carries a version; an
 * announcement is about the team, and does not.
 *
 * News is empty today. Every post on this site is currently a release, because
 * the conference and hackathon write-ups moved to the report site's blog. The
 * section is here anyway, and renders nothing at all until a post earns it, so
 * the next announcement lands in the right place instead of arriving to a page
 * with nowhere to put it. An empty heading is worse than no heading, so the
 * whole block is conditional rather than the list inside it.
 *
 * Both groups use the same row: dated, no image. A package page screenshot is
 * not a photograph and does not earn a card, and an announcement that needs a
 * photograph is probably a blog post.
 *
 * The link out to the blog sits at the top rather than the bottom, because a
 * reader who came here looking for the ACL post should not have to read four
 * version numbers to find out it is elsewhere.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell, rise, VIEWPORT } from "./chrome";
import { NEWSROOM_FEED, articleHref, TECH_REPORT_SITE, type Article } from "./data";

const isRelease = (a: Article) => a.newsTopic === "release";

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
  const news = NEWSROOM_FEED.filter((a) => !isRelease(a));
  const releases = NEWSROOM_FEED.filter(isRelease);

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
          <p className="mx-auto mt-5 max-w-xl text-center text-ink-4">
            What the team announced, and what shipped. Conference and hackathon
            write-ups live on the{" "}
            <a
              href={`${TECH_REPORT_SITE}/blog/`}
              className="inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline"
            >
              blog
              <ArrowUpRight aria-hidden size={14} />
            </a>
            , next to the technical reports.
          </p>
        </div>

        {news.length > 0 && (
          <section className="mt-16 md:mt-20">
            <GroupHeading title="News" note="What the team announced" />
            <ul className="mt-2">
              {news.map((a, i) => (
                <UpdateRow key={a.slug} a={a} i={i} />
              ))}
            </ul>
          </section>
        )}

        {releases.length > 0 && (
          <section className={`pb-24 ${news.length > 0 ? "mt-20 md:mt-24" : "mt-16 md:mt-20"}`}>
            <GroupHeading title="Releases" note="What shipped, and where to get it" />
            <ul className="mt-2">
              {releases.map((a, i) => (
                <UpdateRow key={a.slug} a={a} i={i} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}

/* One row per item, in both groups: date and version in the left rail, then
 * title and summary. No kicker repeating "Release" under a heading that says
 * Releases, and none saying "News" under News either.
 *
 * The version cell is conditional, which is what lets announcements share this
 * component. A release has one and an announcement does not, so the left rail
 * is a date alone for news items and the rows still line up.
 *
 * The version used to live inside the title, back when a title was a sentence
 * about one release. Titles are product names now, and two of these products
 * number twice: "WIGTN Plugin v2: Codex" is our second plugin and v0.3.0 is
 * the version of it that shipped. Separating them puts each number where it
 * can be read on its own, and stacks the four versions into a column. */
function UpdateRow({ a, i }: { a: Article; i: number }) {
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
