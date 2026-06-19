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

        {/* Reference */}
        <div className="mt-20 md:mt-24">
          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
            Reference
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REFERENCES.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col rounded-2xl bg-white/[0.025] p-6 ring-1 ring-inset ring-white/[0.07] transition-all duration-300 hover:bg-white/[0.045] hover:ring-white/15"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-light">
                    {r.tag}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-500 transition-colors group-hover:text-brand-light"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{r.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{r.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
