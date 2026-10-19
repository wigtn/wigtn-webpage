"use client";

/** /team, labelled "About" in the nav: the Partners & Clients wall, then the
 * company's History, and nothing else.
 *
 * The page answers who WIGTN is as a company: who it works with, then what
 * it has done, in order. It carried a member roster (portrait, role,
 * one-line bio per person) until 2026-10-19. That came off when the site
 * started presenting WIGTN as a company: the roster described individuals
 * and their careers outside WIGTN, which is not what a client reading this
 * page needs. Papers still name their authors where they are published.
 *
 * No visible hero either. The "Who we are." title came off the same day, so
 * the logo wall opens the page; the h1 stays for the document outline and
 * screen readers, visually hidden. */

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ORG_NAME } from "@/lib/brand";
import { PageShell, rise, VIEWPORT } from "./chrome";
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
      <h1 className="sr-only">About {ORG_NAME}</h1>

      {/* ── Partners & Clients: logo wall ──
           The title names both relationships at once, so no logo has to say
           which one it is. The list holds direct relationships only (see
           PARTNERS_AND_CLIENTS in data.ts); History says what each one was.
           Moved here from the homepage. This page answers who we are, and who
           we work with is part of that answer; the homepage is a teaser whose
           sections all hand off to a page, and this one had nowhere to hand off
           to. It opens the page; the top padding is PageHero's, which clears
           the sticky header. */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">
          Partners &amp; Clients
        </h2>
        {/* Equal columns, each logo centred in its own: the row is centred on
            the page, and the middle logo sits on the History centre line
            below. One logo height per breakpoint, set as the li's font-size
            so the logos (h-[1em]) and the type stand-in (0.94em) scale
            together.
            Each step is the largest that fits its narrowest column: 28px at
            sm, 36px at md, 48px at lg, 56px from xl (a 322px-wide logo in a
            346px column). One stacked column below sm takes 44px. */}
        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 text-[44px] sm:grid-cols-3 sm:text-[28px] md:mt-16 md:text-[36px] lg:text-[48px] xl:text-[56px]">
          {PARTNERS_AND_CLIENTS.map((c) => (
            <motion.li
              key={c.name}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex h-[1em] items-center justify-center"
            >
              {c.logo ? (
                /* The artwork is near-black, so dark mode turns it white.
                   Each SVG's viewBox is trimmed to its artwork, so centring
                   the box centres the logo. */
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-full w-auto max-w-full object-contain dark:brightness-0 dark:invert"
                />
              ) : (
                <span className="font-display text-[0.94em] font-bold leading-none tracking-tight text-ink">
                  {c.name}
                </span>
              )}
            </motion.li>
          ))}
        </ul>
      </section>

      <Divider />

      <HistoryTimeline />
    </PageShell>
  );
}

/* ── History (연혁) ──
 *
 * The vertical timeline, newest at the top and founding (2026.01) at the
 * bottom. Retired from the render on 2026-08-09 and mounted again on
 * 2026-10-19 in place of the roster, with MILESTONES narrowed to papers and
 * business relationships (see the comment there). It closes the page, under
 * Partners & Clients.
 *
 * Each entry is a card: a thumbnail (photo, logo, or the label in type; see
 * Milestone.image) beside the date and title. A short connector runs from
 * the node on the line to the card, so the node reads as the card's anchor
 * rather than a dot floating beside text. Both sit at the card's vertical
 * middle.
 *
 * From md up the cards alternate around a centre line and mirror, so the
 * thumbnails face the line, and each card rises 40px into the one before it:
 * they sit on opposite sides, so the overlap only closes the gap a strict
 * one-row-per-card layout leaves. Below md there is one column: the line and
 * its nodes move to the left edge and every card sits to their right. */
function HistoryTimeline() {
  const history = MILESTONES.filter((m) => !m.placeholder).slice().reverse();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
      <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">History</h2>

      <div className="relative mx-auto mt-14 max-w-5xl md:mt-20">
        {/* the line: left edge on mobile, centre from md. It runs past the
            first and last nodes, so both ends fade out instead of stopping. */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-[7px] w-px bg-gradient-to-b from-transparent via-brand/50 to-transparent md:left-1/2 md:-translate-x-1/2"
        />
        <ul className="space-y-8 md:-space-y-10">
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
                className="relative grid pl-10 md:grid-cols-2 md:gap-20 md:pl-0"
              >
                {/* connector, from the line to the card edge (40px either way) */}
                <span
                  aria-hidden
                  className={`absolute left-[7px] top-1/2 h-px w-[33px] bg-brand/50 md:w-10 ${
                    left ? "md:left-[calc(50%-40px)]" : "md:left-1/2"
                  }`}
                />
                {/* node on the line, at the card's middle */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-brand ring-4 ring-paper md:left-1/2 md:-translate-x-1/2"
                />
                <div
                  className={`flex items-center gap-4 rounded-2xl border border-line/10 bg-paper-raised p-3 md:gap-5 ${
                    left ? "md:flex-row-reverse md:text-right" : "md:col-start-2"
                  }`}
                >
                  <Thumb m={m} />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-sm text-accent">{m.date}</div>
                    <h3 className="mt-1 text-pretty text-base font-semibold tracking-tight text-ink [word-break:keep-all] md:text-lg">
                      {m.title}
                      {m.upcoming && (
                        <span className="ml-2 whitespace-nowrap text-sm font-normal text-ink-4">
                          (Upcoming)
                        </span>
                      )}
                    </h3>
                    {m.text && (
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-ink-3 [word-break:keep-all]">
                        <Clauses text={m.text} />
                      </p>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* The card's picture, one fixed 4:3 box whatever fills it, so every card in
 * the column is the same height. Decorative: the title beside it names the
 * same thing. Logos keep their own colours on white in both themes; a logo
 * turned white for dark mode would need a second rule per file, and the tile
 * is small enough not to glare. */
function Thumb({ m }: { m: (typeof MILESTONES)[number] }) {
  const box =
    "grid h-[72px] w-24 shrink-0 place-items-center overflow-hidden rounded-xl ring-1 ring-inset ring-line/10 md:h-24 md:w-32";

  if (m.image) {
    return (
      <div className={box}>
        <img src={m.image} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }
  if (m.logo) {
    return (
      <div className={`${box} bg-white p-3 md:p-4`}>
        <img src={m.logo} alt="" className="h-full w-full object-contain" />
      </div>
    );
  }
  return (
    <div className={`${box} bg-brand/10 px-2`}>
      <span className="text-center font-display text-sm font-bold leading-tight tracking-tight text-accent md:text-base">
        {m.label}
      </span>
    </div>
  );
}
