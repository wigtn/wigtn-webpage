"use client";

/** /work (nav: "Product") — product is coming soon; shows reference work. */

import { ArrowUpRight } from "lucide-react";
import { PageShell, PageHero } from "./chrome";
import { REFERENCES } from "./data";

export function WorkPage() {
  return (
    <PageShell>
      <PageHero
        title="Product."
        titleClassName="text-brand-light"
        lead="Coming soon — our first product is in the works."
      />
      <section className="max-w-6xl mx-auto px-6 pb-32 pt-4">
        <p className="text-lg text-zinc-500">
          Stay tuned. We’ll announce it here when it’s ready.
        </p>

        {/* Reference — Web Agency portfolio */}
        <div className="mt-24 md:mt-28">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
            Web Agency
          </div>
          <h2 className="mt-3 text-[clamp(2.5rem,7.5vw,6rem)] font-bold tracking-[-0.03em] leading-[0.98] text-brand-light">
            Reference
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {REFERENCES.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.025] ring-1 ring-inset ring-white/[0.07] transition-all duration-300 hover:bg-white/[0.045] hover:ring-white/15"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
                  {r.image ? (
                    <img
                      src={r.image}
                      alt={r.name}
                      className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-mono text-5xl font-bold text-brand/30 select-none">w.</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-light">
                      {r.type}
                    </span>
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 flex items-center gap-1.5 text-lg font-semibold tracking-tight text-white">
                    {r.name}
                    <ArrowUpRight
                      size={15}
                      className="text-zinc-500 transition-colors group-hover:text-brand-light"
                    />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{r.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
