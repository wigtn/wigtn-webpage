"use client";

/** /news — events, insights, and (placeholder) community in one feed. */

import { PageShell, PageHero } from "./chrome";
import { ArticleCard } from "./cards";
import { NEWS_FEED } from "./data";

export function NewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="News"
        title="What's happening."
        lead="Conference acceptances, awards, talks, and the videos we publish along the way."
      />
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS_FEED.map((a, i) => (
            <ArticleCard key={a.slug} a={a} i={i} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
