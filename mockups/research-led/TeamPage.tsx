"use client";

/** /team, labelled "About" in the nav: a short introduction signed by the
 * founder, the Partners & Clients wall, then the company's History, and
 * nothing else.
 *
 * The page answers who WIGTN is as a company: what it is, who it works with,
 * then what it has done, in order. It carried a member roster (portrait, role,
 * one-line bio per person) until 2026-10-19. That came off when the site
 * started presenting WIGTN as a company: the roster described individuals
 * and their careers outside WIGTN, which is not what a client reading this
 * page needs. Papers still name their authors where they are published.
 *
 * No visible hero either. The "Who we are." title came off the same day; the
 * introduction opens the page, and the h1 stays for the document outline and
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

      {/* ── Introduction, signed ──
           What WIGTN is, in the founder's voice, then the signature. The
           three teams are the ones the homepage's Our Service shows, and
           every claim here is one the page below or the homepage carries:
           the venues are History's, the founding line is MILESTONES'. The
           rule before the signature stands in for the dashes a printed
           letter would use, which the house voice does not. It opens the
           page; the top padding is PageHero's, which clears the sticky
           header. */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-28">
        <div className="max-w-3xl space-y-6 text-pretty text-xl leading-relaxed text-ink-2 md:text-2xl md:leading-relaxed">
          <p>
            WIGTN is an AI company in Seoul, organised as three teams. Solutions brings AI into
            the systems enterprises already run, from consulting to integration. Product builds
            tools of our own and releases them as open source. Research publishes what we find at
            ACL, EMNLP and NeurIPS.
          </p>
          <p>
            We started in January 2026 as five engineers publishing research without a lab
            behind us. We have kept the habit from that start: measure before we claim, and say
            where the claim stops.
          </p>
        </div>
        <p className="mt-10 flex items-center gap-3 text-sm font-medium tracking-tight text-ink-3 md:text-base">
          <span aria-hidden className="h-px w-8 bg-ink-4" />
          Founder &amp; CEO, Harrison Kim
        </p>
      </section>

      <Divider />

      {/* ── Partners & Clients: logo wall ──
           The title names both relationships at once, so no logo has to say
           which one it is. The list holds direct relationships only (see
           PARTNERS_AND_CLIENTS in data.ts); History says what each one was.
           Moved here from the homepage. This page answers who we are, and who
           we work with is part of that answer; the homepage is a teaser whose
           sections all hand off to a page, and this one had nowhere to hand off
           to. */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
        {/* The ampersand is Pretendard's. Space Grotesk draws a stylised one
            that reads as a stray symbol at heading size. */}
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">
          Partners <span className="font-sans">&amp;</span> Clients
        </h2>
        {/* One centred row with the same gap between every pair of
            neighbours, so the spacing is symmetric whatever each logo's
            width. Equal columns centred each logo in its own cell instead,
            which put the two wide logos close together and left the narrow
            one apart.
            One logo height per breakpoint, set as the list's font-size so
            the logos (h-[1em]) and the type stand-in scale together. Each
            step keeps the row inside the container: 28px at sm, 36px at md,
            48px at lg, 56px from xl. Below sm the logos stack in one
            centred column at 44px. */}
        <ul className="mt-14 flex flex-col items-center gap-y-14 text-[44px] sm:flex-row sm:justify-center sm:gap-x-12 sm:text-[28px] md:mt-16 md:text-[36px] lg:gap-x-24 lg:text-[48px] xl:text-[56px]">
          {PARTNERS_AND_CLIENTS.map((c) => (
            <motion.li
              key={c.name}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex h-[1em] items-center"
            >
              {c.logo ? (
                /* The artwork is near-black, so dark mode turns it white.
                   Each SVG's viewBox is trimmed to its artwork, so the gap
                   is measured from the ink, not from built-in margin. */
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-full w-auto dark:brightness-0 dark:invert"
                />
              ) : (
                /* Pretendard, not the display face: Space Grotesk's quirky
                   forms made a plain company name look like a logo it is
                   not. */
                <span className="font-sans text-[0.9em] font-bold leading-none tracking-tight text-ink">
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
 * From md up the entries alternate around a centre line. Below md there is
 * one column, so the line and its nodes move to the left edge and the text
 * sits to their right; a centred line would run through the text. */
function HistoryTimeline() {
  const history = MILESTONES.filter((m) => !m.placeholder).slice().reverse();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
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
                  {m.text && (
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-ink-3 [word-break:keep-all]">
                      <Clauses text={m.text} />
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
