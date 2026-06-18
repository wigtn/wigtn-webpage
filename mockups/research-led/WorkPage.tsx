"use client";

/** /work — the full portfolio, grouped. The homepage only teases two of
 *  these; here is where "what we've done" lives. */

import { PageShell, PageHero } from "./chrome";
import { ArticleCard } from "./cards";
import { WORK_GROUPS } from "./data";

export function WorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Work"
        title="What we've built."
        lead="Peer-reviewed papers, open models, award-winning systems, and open-source tools — the portfolio behind the research."
      />
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-16">
        {WORK_GROUPS.filter((g) => g.items.length > 0).map((group) => (
          <section key={group.label}>
            <div className="mb-8 flex items-center gap-4">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
                {group.label}
              </span>
              <span className="h-px flex-1 bg-gray-200" />
              <span className="font-mono text-xs text-gray-400">{group.items.length}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((a, i) => (
                <ArticleCard key={a.slug} a={a} i={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
