"use client";

/** /team: the crew roster and the community history (연혁). */

import { Fragment } from "react";
import { motion } from "framer-motion";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";
import { TEAM, MILESTONES } from "./data";

/* Prefer wrapping at commas. Each clause is an inline-block, so the browser
 * takes the break between clauses before it breaks inside one; a clause too
 * long for the line still wraps normally. Keeps timeline one-liners from
 * splitting mid-phrase without hand-tuning each string to a character count. */
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
  // Newest at the top, founding (2026.01) at the bottom; drop placeholder entries.
  const history = MILESTONES.filter((m) => !m.placeholder).slice().reverse();

  return (
    <PageShell>
      <PageHero
        title="Who we are."
        lead="A community of AI builders sharing research, code, and everything we learn."
        titleClassName="text-accent"
        leadClassName="max-w-4xl"
      />

      {/* ── Crew: one row per person — portrait + name left, role + bio right ── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-28 md:pt-24 md:pb-36">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-accent">
          Team Member
        </h2>

        <ul className="mt-10 divide-y divide-line/[0.08] md:mt-14">
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

              {/* right: WIGTN title (organizer only), discipline, one-line bio */}
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

      {/* ── History (연혁): left-aligned header, centered timeline ── */}
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
    </PageShell>
  );
}
