"use client";

/** /blog: the story index. A card grid of channel:"blog" posts, newest first.
 *
 * Cards, not rows, because every blog post carries a cover photograph and the
 * picture is most of what a reader chooses by. The dense-row treatment lives
 * on /notices, where the entries are versions and have no pictures at all. */

import { BLOG_FEED } from "./data";
import { ArticleCard } from "./cards";
import { PageShell, PageHero } from "./chrome";

export function BlogPage() {
  return (
    <PageShell>
      <PageHero
        title="The full story."
        titleClassName="text-accent"
        lead="Conference trips and hackathon weekends, written up with the photographs and the decisions they forced."
      />
      <section className="max-w-6xl mx-auto px-6 pb-28 md:pb-40">
        <div className="grid items-stretch gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_FEED.map((a, i) => (
            <ArticleCard key={a.slug} a={a} i={i} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
