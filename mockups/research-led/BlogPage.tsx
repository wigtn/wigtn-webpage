"use client";

/** The blog index. RETAINED BUT CURRENTLY UNROUTED: the section is closed.
 *
 * It was built as the card grid for the long-form stories, which made it a
 * second name for the Story section, so the app route came out on 2026-08-09
 * and the stories render under /story instead. What this page is FOR is the
 * content Story is not: business-track news with weight behind it (a program
 * acceptance, a signed collaboration, a university subcontract). None of
 * that exists yet, and a section is opened by its first real post, not ahead
 * of one.
 *
 * docs/blog-section.md is the decision record: what qualifies, what does
 * not, and the reopening steps. In short, and in this order: restore
 * app/blog/page.tsx and app/blog/[slug]/page.tsx from git history, write the
 * post with channel: "blog" (BLOG_FEED picks it up), add the nav item back,
 * then put /blog in the sitemap and drop the channel filter that keeps blog
 * articles out of it. Routes before posts: the sitemap routes every article
 * through hrefFor, so a post written ahead of its route is a sitemap entry
 * with no page behind it.
 *
 * Cards, not rows, because a post here carries a cover photograph and the
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
