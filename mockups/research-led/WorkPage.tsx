"use client";

/** /work: everything we've built and shared, grouped. */

import { PageShell, PageHero } from "./chrome";
import { WORK_GROUPS } from "./data";
import { ArticleCard } from "./cards";

export function WorkPage() {
  return (
    <PageShell>
      <PageHero
        title="Projects."
        titleClassName="text-accent"
        lead="Papers, open-source models and tools, and the hackathon builds we made together, all in the open."
      />
      <section className="max-w-6xl mx-auto px-6 pb-32 pt-4">
        {WORK_GROUPS.filter((g) => g.items.length > 0).map((g) => (
          <div key={g.label} className="mt-16 first:mt-4 md:mt-24">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em] leading-tight text-accent">
              {g.label}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
              {g.items.map((a, i) => (
                <ArticleCard key={a.slug} a={a} i={i} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
