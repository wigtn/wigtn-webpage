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

/* External research / tech-report site, named WIG-log: its own GitHub Pages
 * app for now. When the custom domain is ready, change ONLY this constant to
 * "https://research.wigtn.com".
 *
 * WIG-log has two halves and this constant is the root of neither. Tech is
 * /tech/ and Feed is /feed/, both below. The root is the site's front door and
 * belongs to both halves, so link a half by its own index, not by this.
 *
 * Slugs match the report site's routes. As of 2026-08: wigvo, wigtnocr, wigss,
 * wigtn-coding, codex-selective-harness. That list is a convenience, not a
 * source of truth; the report site is. Do not derive a count of published
 * reports from it, and do not put such a count in copy this repo cannot
 * check. */
export const TECH_REPORT_SITE = "https://wigtn.github.io/wigtn-tech-report";

/* The report site builds with trailingSlash, so the bare URL 301s. Linking the
 * final URL saves that round trip.
 *
 * Reports moved from that site's root to /tech/ on 2026-08-09, when it split
 * into Tech and Feed and neither half kept the root. The old root URLs still
 * resolve, as redirects, but linking a redirect from here costs every reader a
 * hop for nothing. */
export const TECH_REPORT_INDEX = `${TECH_REPORT_SITE}/tech/`;
export const techReportHref = (slug: string) => `${TECH_REPORT_INDEX}${slug}/`;

/* The report site's other half. Conference and hackathon write-ups live under
 * /feed/ there, so redirects and links out of this site need their own builder
 * rather than techReportHref with the prefix hand-typed at each call site.
 *
 * The section was called Blog and served /blog/ until 2026-08-09, when the
 * report site took the name WIG-log and split itself into Tech and Feed. These
 * URLs are the ones that site exports now; a /blog/ link from here is stale. */
export const TECH_FEED_INDEX = `${TECH_REPORT_SITE}/feed/`;
export const techFeedHref = (slug: string) => `${TECH_FEED_INDEX}${slug}/`;

/* An asset served by the report site, addressed across origins.
 *
 * The homepage report cards show that site's own banners rather than copies.
 * The copies were the other option and they were rejected: three JPEGs checked
 * in here would be a second source for an image whose first source is one
 * repository away, and nothing would tell us when the two stopped matching.
 *
 * The cost of not copying is that this repo's build cannot see these files.
 * `next build` fails on a missing local import; it says nothing about a URL, so
 * a rename on the report site reaches production here as a broken frame. Two
 * things absorb that: `ReportCard` falls back to the house cover on error, and
 * `path` is a full path under the report site's `public/`, so it can be checked
 * against that repo by eye.
 *
 * The path starts at the site root, which on GitHub Pages is already under
 * /wigtn-tech-report. That prefix lives in TECH_REPORT_SITE, so pass the path
 * as it appears in the report repo's `public/` and nothing else. */
export const techReportAsset = (path: string) => `${TECH_REPORT_SITE}${path}`;

/* The blog on this site. Story posts (conference trips, hackathon write-ups)
 * are hosted here at /blog/<slug>; they lived on the report site's feed
 * between 2026-08-09 and the restructure that brought them back. No trailing
 * slash: this repo exports flat files, so /blog/x resolves and /blog/x/ 404s. */
export const BLOG_INDEX = "/blog";
export const blogHref = (slug: string) => `${BLOG_INDEX}/${slug}`;
