"use client";

/** /about — founder profile, company history (연혁), and the members. */

import { Fragment } from "react";
import { motion } from "framer-motion";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";
import { TEAM, MILESTONES } from "./data";

/* Section divider — hairline within the page gutter. */
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="border-t border-white/10" />
    </div>
  );
}

/* Founder's career — current (現) first, former (前) below. */
const FOUNDER_CAREER = [
  { status: "現", company: "BrainCrew", role: "Engineering Lead" },
  { status: "前", company: "SoundMind", role: "AI Research Engineer" },
  { status: "前", company: "Hyundai E&C", role: "Construction Engineer" },
  { status: "前", company: "DongKuk E&C", role: "Construction Engineer" },
  { status: "前", company: "Doosan E&C", role: "Construction Engineer" },
];

export function TeamPage() {
  const [founder, ...members] = TEAM;
  // Newest at the top, founding (2026.01) at the bottom; drop placeholder entries.
  const history = MILESTONES.filter((m) => !m.placeholder).slice().reverse();

  return (
    <PageShell>
      <PageHero
        title="Who we are."
        lead="An AI crew turning research into systems enterprises run."
        titleClassName="text-brand-light"
      />

      {/* ── Founder — portrait + name + title (left), career history (right) ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-28 md:pt-28 md:pb-36">
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-center md:gap-16">
          {/* left: portrait, name, title */}
          <div className="flex flex-col items-center text-center">
            <div className="h-44 w-44 overflow-hidden rounded-full bg-white/[0.04] ring-1 ring-inset ring-white/10 md:h-52 md:w-52">
              <img
                src={founder.image}
                alt={founder.name}
                style={{ objectPosition: "center 15%" }}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-white">
              {founder.name}
            </h2>
            <div className="mt-1.5 font-medium text-brand-light">Founder &amp; CEO</div>
          </div>

          {/* right: career history */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
              Career
            </div>
            <div className="mt-5 grid grid-cols-[auto_auto_1fr] items-baseline gap-x-5 gap-y-2.5 text-base md:text-lg">
              {FOUNDER_CAREER.map((c) => (
                <Fragment key={c.company}>
                  <span
                    className={
                      c.status === "現" ? "font-medium text-brand-light" : "text-zinc-600"
                    }
                  >
                    {c.status}
                  </span>
                  <span className="font-medium text-white">{c.company}</span>
                  <span className="text-zinc-400">{c.role}</span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Members — circular avatars in a row ── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
        <h2 className="text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">Members</h2>
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 md:mt-16">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              variants={rise}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex flex-col items-center text-center"
            >
              <div className="h-32 w-32 overflow-hidden rounded-full bg-white/[0.04] ring-1 ring-inset ring-white/10 md:h-40 md:w-40">
                <img
                  src={m.image}
                  alt={m.name}
                  style={m.imagePosition ? { objectPosition: m.imagePosition } : undefined}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-white md:text-lg">
                {m.name}
              </h3>
              <div className="mt-1 text-sm text-brand-light">{m.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── History (연혁) — left-aligned header, centered timeline ── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-28 md:pt-36 md:pb-36">
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-brand-light">History</h2>

        <div className="relative mx-auto mt-14 max-w-3xl md:mt-20">
          {/* center pipeline */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-brand-light/40"
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
                    className="absolute left-1/2 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-brand-light ring-4 ring-[#0A0A0A]"
                  />
                  <div className={left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}>
                    <div className="font-mono text-sm text-brand-light">{m.date}</div>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
                      {m.title}
                      {m.upcoming && <span className="ml-2 text-sm font-normal text-zinc-500">(Upcoming)</span>}
                    </h3>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-zinc-400">{m.text}</p>
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
