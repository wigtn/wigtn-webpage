/**
 * Link constants a post is allowed to import.
 *
 * This module exists so that a post under `updates/` can build a URL without
 * importing a value from `data.ts`. `data.ts` imports every post module, so a
 * post importing a *value* back closes a runtime cycle: by the time the post's
 * object literal evaluates, `data.ts` is still mid-evaluation and the constant
 * is in its temporal dead zone. Importing a *type* is fine, because types are
 * erased, which is why posts still do `import type`.
 *
 * Most of what lives here is off-site (the WIG-log halves), but the rule is
 * about the import graph, not about origins: BLOG_INDEX below is a local
 * route, and it is here because posts link each other's blog pages.
 *
 * Keeping the constants in a leaf module with no imports of its own removes
 * the cycle entirely, so the single-point-of-change promise below survives.
 */

/* External research / tech-report site, named WIG-log, live on its custom
 * domain since 2026-08. If the domain ever moves again, change ONLY this
 * constant.
 *
 * The reports live at the site root: tech.wigtn.com is the report index and
 * tech.wigtn.com/<slug>/ is a report. A Tech/Feed split (/tech/ and /feed/)
 * was planned on that site and never shipped; both paths 404 there, checked
 * 2026-08-09, and the feed's stories live on this site under /story. These
 * constants track what production serves, not the plan.
 *
 * Slugs match the report site's routes. As of 2026-08: wigvo, wigtnocr,
 * wigss, wigtn-coding, codex-selective-harness. That list is a convenience,
 * not a source of truth; the report site is. Do not derive a count of
 * published reports from it, and do not put such a count in copy this repo
 * cannot check. */
export const TECH_REPORT_SITE = "https://tech.wigtn.com";

/* The report site builds with trailingSlash, so the bare URL 301s. Linking
 * the final URL saves that round trip. */
export const TECH_REPORT_INDEX = `${TECH_REPORT_SITE}/`;
export const techReportHref = (slug: string) => `${TECH_REPORT_SITE}/${slug}/`;

/* TECH_FEED_INDEX, techFeedHref and techReportAsset were deleted with their
 * last consumers: the feed half never shipped on the report site, and the
 * homepage rail that showed its cross-origin banners is gone. Git history
 * has all three. */

/* The Story section: press-release rows at /story, and the full account of
 * each event at /story/<slug>. The long-form posts lived on the report
 * site's feed for a day, then briefly at /blog here, before the blog closed
 * and Story took both the rows and the pages. No trailing slash: this repo
 * exports flat files, so /story/x resolves and /story/x/ 404s. */
export const STORY_INDEX = "/story";
export const storyHref = (slug: string) => `${STORY_INDEX}/${slug}`;

/* The blog. CLOSED, for now: the section was built for community and
 * partnership news (a program acceptance, a signed collaboration), none of
 * which exists yet, and until it does a blog that mirrors Story is two names
 * for one list. The constants stay because BlogPage and the "blog" channel
 * stay in the source, unrouted, waiting for the first real post. */
export const BLOG_INDEX = "/blog";
export const blogHref = (slug: string) => `${BLOG_INDEX}/${slug}`;
