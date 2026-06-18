"use client";

/** /team — philosophy + the crew. Moved off the homepage to keep it short. */

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";
import { ABOUT, TEAM, TEAM_BADGES } from "./data";

export function TeamPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Team" title="Who we are." lead={ABOUT.heading} />

      <div className="max-w-6xl mx-auto px-6 pb-24">
        {/* Philosophy */}
        <div className="max-w-2xl">
          {ABOUT.paragraphs.map((para) => (
            <p key={para} className="mt-4 text-zinc-400 leading-relaxed">
              {para}
            </p>
          ))}
          <div className="mt-6 flex flex-wrap gap-2">
            {TEAM_BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Crew */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              variants={rise}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="group rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden hover:border-brand/50 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white/[0.03]">
                <img
                  src={m.image}
                  alt={m.name}
                  style={m.imagePosition ? { objectPosition: m.imagePosition } : undefined}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-light">
                  {m.role}
                </div>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white">{m.name}</h3>
                <div className="mt-1 text-sm text-zinc-400">{m.currentRole}</div>
                {m.credential && <div className="mt-0.5 text-xs text-zinc-600">{m.credential}</div>}
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{m.bio}</p>
                <div className="mt-4 flex items-center gap-3">
                  {m.github && (
                    <a href={m.github} target="_blank" rel="noreferrer" aria-label={`${m.name} GitHub`} className="text-zinc-500 hover:text-white transition-colors">
                      <Github size={18} />
                    </a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} LinkedIn`} className="text-zinc-500 hover:text-white transition-colors">
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
