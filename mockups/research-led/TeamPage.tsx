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
import { motion, useReducedMotion } from "framer-motion";
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
           The founder's letter, in his words (supplied 2026-10-20), then
           the signature. Centred, as a letter's opening page is. The three
           failures it names are the three papers: a parser that looks
           clean and retrieves badly (RCPS, EMNLP), speech recognition that
           writes words into silence (WIGVO, ACL), and a judge's
           improvement inside its own noise (MDI, NeurIPS). The signature
           carries no dash or rule in front of it. The measure is max-w-4xl:
           at 3xl the paragraphs ran long and narrow, and the second one left
           "at NeurIPS." alone on its last line. It opens the page; the top
           padding is PageHero's, which clears the sticky header. */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-4xl space-y-6 text-center text-pretty text-lg leading-relaxed text-ink-2 md:text-xl md:leading-relaxed">
          <p>
            WIGTN started in January 2026 as five engineers who kept running into the same
            problem in industry. AI could do much of what companies asked of it, and then it
            would fail in ways nobody had measured. A document parser whose output looked fine
            would quietly hurt retrieval. A voice system would invent words out of silence. An
            LLM judge would report an improvement that was only noise.
          </p>
          <p>
            So we worked on those problems, without a lab behind us. This year that work became
            a system demo at ACL, an industry paper at EMNLP, and a workshop paper at NeurIPS.
          </p>
          <p>
            Now we take it into enterprise systems, where a wrong answer costs more. We bring
            the same habit we started with: measure before we claim, and say where the claim
            stops. If you have a problem AI hasn’t solved for you yet, we’d like to hear about
            it.
          </p>
        </div>
        <p className="mt-10 text-center text-sm font-medium tracking-tight text-ink-3 md:text-base">
          Harrison Kim, Founder &amp; CEO
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
            width and the row sits on the page's centre. Equal columns
            centred each logo in its own cell instead, which put the two wide
            logos close together and left the narrow one apart.
            One unit per breakpoint, set as the list's font-size: 28px at
            sm, 36px at md, 48px at lg, 56px from xl, and 44px in the single
            stacked column below sm. Logo heights (Company.height) and the
            gap are both in that unit, so the spacing keeps its proportion to
            the logos at every width instead of jumping at a breakpoint. */}
        <ul className="mt-14 flex flex-col items-center gap-y-[1.25em] text-[44px] sm:flex-row sm:justify-center sm:gap-x-[1.75em] sm:text-[28px] md:mt-16 md:text-[36px] lg:text-[48px] xl:text-[56px]">
          {PARTNERS_AND_CLIENTS.map((c) => (
            <motion.li
              key={c.name}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex items-center"
              style={{ height: `${c.height ?? 1}em` }}
            >
              {c.logo ? (
                /* The artwork is dark, so dark mode turns it white. Each
                   SVG's viewBox is trimmed to its artwork, so the gap is
                   measured from the ink, not from built-in margin. */
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
 * sits to their right; a centred line would run through the text.
 *
 * Behind it, InkWash: the brand purple bleeding faintly into the page. The
 * nodes carry a soft halo of the same purple, so they read as drops on that
 * wash rather than as dots on a line. The layout and the copy are unchanged. */
function HistoryTimeline() {
  const history = MILESTONES.filter((m) => !m.placeholder).slice().reverse();

  return (
    /* Full bleed so the wash can spread past the page measure; overflow is
       clipped here so the displaced edges never add a horizontal scroll. */
    <div className="relative overflow-hidden">
      <InkWash />
      <section className="relative max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
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
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-brand shadow-[0_0_0_3px_rgb(var(--paper)),0_0_0_9px_rgb(var(--brand)/0.12)] md:left-1/2 md:-translate-x-1/2"
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
    </div>
  );
}

/* Purple ink in water, behind the History timeline.
 *
 * Four soft ellipses of the brand tones, run through one SVG filter: fractal
 * noise displaces their edges so they bleed unevenly the way pigment spreads
 * in water, and a blur softens what the displacement leaves. They sit where
 * the timeline does (upper left, middle right, lower left, a small one at
 * the foot), so the wash follows the eye down the record instead of tinting
 * the page evenly. Kept at 6 to 8 percent on paper and about twice that on
 * ink: a tint you notice is decoration, one you feel is atmosphere.
 *
 * It spreads once, when the section first comes into view: opacity and a
 * slight scale over 2.4 seconds, transform and opacity only, so the filtered
 * SVG is rasterised once and composited after. Under reduced motion it is
 * simply there. preserveAspectRatio="none" stretches the 1000-unit box to
 * whatever height the timeline has at each width. */
function InkWash() {
  const still = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 will-change-transform"
      initial={still ? false : { opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg className="h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <filter id="history-ink" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="11" />
            <feDisplacementMap in="SourceGraphic" scale="110" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>
        <g filter="url(#history-ink)">
          <ellipse cx="270" cy="230" rx="240" ry="120" className="fill-brand/[0.07] dark:fill-brand/[0.14]" />
          <ellipse cx="740" cy="470" rx="250" ry="130" className="fill-brand-light/[0.08] dark:fill-brand-light/[0.12]" />
          <ellipse cx="300" cy="720" rx="260" ry="120" className="fill-brand/[0.06] dark:fill-brand/[0.12]" />
          <ellipse cx="640" cy="900" rx="170" ry="70" className="fill-brand-light/[0.07] dark:fill-brand-light/[0.11]" />
        </g>
      </svg>
    </motion.div>
  );
}
