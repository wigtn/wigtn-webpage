"use client";

/** /team, labelled "About" in the nav: the company's History and the
 * Partners & Clients wall, under one title and nothing else.
 *
 * The page is "Who we are." answered as a company: what WIGTN has done, in
 * order, and who it works with. It carried a member roster (portrait, role,
 * one-line bio per person) until 2026-10-19. That came off when the site
 * started presenting WIGTN as a company: the roster described individuals
 * and their careers outside WIGTN, which is not what a client reading this
 * page needs. Papers still name their authors where they are published.
 *
 * No lead under the hero: History starts straight under it. */

import { Fragment } from "react";
import { motion } from "framer-motion";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";
import { MILESTONES, PARTNERS_AND_CLIENTS } from "./data";

/* Prefer wrapping at commas. Each clause is an inline-block, so the browser
 * takes the break between clauses before it breaks inside one; a clause too
 * long for the line still wraps normally. Keeps timeline one-liners from
 * splitting mid-phrase without hand-tuning each string to a character count.
 * Only HistoryTimeline reads it, and it stays with that section. */
function Clauses({ text }: { text: string }) {
  const clauses = text
    .split(", ")
    .map((c, i, all) => (i < all.length - 1 ? `${c},` : c));

  return (
    <>
      {clauses.map((clause, i) => (
        // Static, index-keyed list: clauses never reorder within a string.
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="inline-block">{clause}</span>
        </Fragment>
      ))}
    </>
  );
}

/* Section divider: hairline within the page gutter. */
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="border-t border-line/[0.08]" />
    </div>
  );
}

export function TeamPage() {
  return (
    <PageShell>
      <PageHero title="Who we are." titleClassName="text-accent" />

      <HistoryTimeline />

      <Divider />

      {/* ── Partners & Clients: logo wall ──
           The title names both relationships at once, so no logo has to say
           which one it is. The list holds direct relationships only (see
           PARTNERS_AND_CLIENTS in data.ts); History says what each one was.
           Moved here from the homepage. This page answers who we are, and who
           we work with is part of that answer; the homepage is a teaser whose
           sections all hand off to a page, and this one had nowhere to hand off
           to. It closes the page. */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">
          Partners &amp; Clients
        </h2>
        <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:mt-16">
          {PARTNERS_AND_CLIENTS.map((c) => (
            <motion.li
              key={c.name}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex h-6 items-center md:h-8"
            >
              {c.logo ? (
                /* The artwork is near-black, so dark mode turns it white.
                   object-contain keeps the aspect when a narrow column caps
                   the width below the height-derived one. */
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-full w-auto max-w-full object-contain object-left dark:brightness-0 dark:invert"
                />
              ) : (
                <span className="font-display text-2xl font-bold leading-none tracking-tight text-ink md:text-3xl">
                  {c.name}
                </span>
              )}
            </motion.li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

/* ── History (연혁) ──
 *
 * The vertical timeline, newest at the top and founding (2026.01) at the
 * bottom. Retired from the render on 2026-08-09 and mounted again on
 * 2026-10-19 in place of the roster, with MILESTONES narrowed to papers and
 * business relationships (see the comment there).
 *
 * From md up the entries alternate around a centre line. Below md there is
 * one column, so the line and its nodes move to the left edge and the text
 * sits to their right; a centred line would run through the text. */
function HistoryTimeline() {
  const history = MILESTONES.filter((m) => !m.placeholder).slice().reverse();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-2 pb-28 md:pt-4 md:pb-36">
      <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">History</h2>

      {/* max-w-5xl, not 3xl: each side of the centre line is half of this,
          so a narrower rail chops titles and one-liners into three-word
          fragments. This keeps ~430px of measure per side. */}
      <div className="relative mx-auto mt-14 max-w-5xl md:mt-20">
        {/* the line: left edge on mobile, centre from md */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-[7px] w-px bg-brand/30 md:left-1/2 md:-translate-x-1/2"
        />
        <ul className="space-y-12 md:space-y-16">
          {history.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <motion.li
                key={`${m.date} ${m.title}`}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="relative grid pl-9 md:grid-cols-2 md:gap-16 md:pl-0"
              >
                {/* node on the line */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-paper md:left-1/2 md:-translate-x-1/2"
                />
                <div className={left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}>
                  <div className="font-mono text-sm text-accent">{m.date}</div>
                  <h3 className="mt-1 text-pretty text-lg font-semibold tracking-tight text-ink [word-break:keep-all]">
                    {m.title}
                    {m.upcoming && (
                      <span className="ml-2 whitespace-nowrap text-sm font-normal text-ink-4">
                        (Upcoming)
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-ink-3 [word-break:keep-all]">
                    <Clauses text={m.text} />
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
