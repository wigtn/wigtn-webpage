"use client";

/** /team, labelled "About" in the nav: the crew roster and the partners
 * wall, under one title and nothing else.
 *
 * The page is "Who we are." and then the people. It briefly opened with the
 * record's capability list after the 2026-08-09 restructure; that duplicated
 * what the landing's What-we-do section already says, so the list went and
 * the title came back. No lead under the hero and no "Members" heading over
 * the roster: with a one-subject page, both were captions on the obvious.
 *
 * HistoryTimeline at the bottom of this file is retained but currently
 * unrendered; the deployed page excludes it on purpose. */

import { Fragment } from "react";
import { motion } from "framer-motion";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";
import { TEAM, MILESTONES, PARTNERS } from "./data";

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

      {/* ── Crew: one row per person, portrait + name left, role + bio right.
           Straight under the hero: the title is the section heading, so a
           "Members" h2 here would say it twice. ── */}
      <section className="max-w-5xl mx-auto px-6 pt-2 pb-28 md:pt-4 md:pb-36">
        <ul className="divide-y divide-line/[0.08]">
          {TEAM.map((m, i) => (
            <motion.li
              key={m.name}
              variants={rise}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="grid gap-6 py-10 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-10 md:py-12"
            >
              {/* left: portrait, name underneath */}
              <div className="flex flex-col items-center text-center">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-paper-tint ring-1 ring-inset ring-line/[0.08] md:h-36 md:w-36">
                  {/* Decorative: the adjacent h3 already announces the name. */}
                  <img
                    src={m.image}
                    alt=""
                    style={m.imagePosition ? { objectPosition: m.imagePosition } : undefined}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-ink md:text-lg">
                  {m.name}
                </h3>
              </div>

              {/* right: WIGTN title (team lead only), discipline, one-line bio */}
              <div className="text-center sm:text-left">
                {m.position && (
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {m.position}
                  </div>
                )}
                <div
                  className={`font-display text-xl font-bold tracking-tight text-ink md:text-2xl ${
                    m.position ? "mt-2" : ""
                  }`}
                >
                  {m.role}
                </div>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-3">
                  {m.bio}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* ── Partners: logo wall (text stand-ins until assets land) ──
           Moved here from the homepage. This page answers who we are, and who
           we work with is part of that answer; the homepage is a teaser whose
           sections all hand off to a page, and this one had nowhere to hand off
           to. It closes the page now that History is unrendered. */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">
          Partners
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 md:mt-16">
          {PARTNERS.map((name) => (
            <motion.div
              key={name}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex items-center justify-start"
            >
              {/* TODO: replace with <img> partner logo once assets exist */}
              <span className="text-xl font-semibold tracking-tight text-ink-2 md:text-2xl">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

/* ── History (연혁): retained but currently unrendered ──
 *
 * The alternating timeline this page carried until 2026-08-09. It came out of
 * the render by decision, not by neglect: the About page is What we do,
 * Members, Partners now, and the month-by-month record was retired from the
 * deployed site while MILESTONES itself stays in data.ts (the homepage's
 * retained MilestoneTimeline reads it too). Mount it again by rendering
 * <HistoryTimeline /> after Partners, with a Divider between them. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HistoryTimeline() {
  // Newest at the top, founding (2026.01) at the bottom; drop placeholder entries.
  const history = MILESTONES.filter((m) => !m.placeholder).slice().reverse();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
      <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">History</h2>

      {/* max-w-5xl, not 3xl: each side of the centre line is half of this,
          so a narrower rail chops titles and one-liners into three-word
          fragments. This keeps ~430px of measure per side. */}
      <div className="relative mx-auto mt-14 max-w-5xl md:mt-20">
        {/* center pipeline */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-brand/30"
        />
        <ul className="space-y-12 md:space-y-16">
          {history.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <motion.li
                key={m.date}
                variants={rise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="relative grid md:grid-cols-2 md:gap-16"
              >
                {/* node on the center line */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-brand ring-4 ring-paper"
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
