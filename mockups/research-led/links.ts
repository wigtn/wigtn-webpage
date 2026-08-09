/**
 * Off-site link constants.
 *
 * This module exists so that a post under `updates/` can build a tech-report
 * URL without importing a value from `data.ts`. `data.ts` imports every post
 * module, so a post importing a *value* back closes a runtime cycle: by the
 * time the post's object literal evaluates, `data.ts` is still mid-evaluation
 * and the constant is in its temporal dead zone. Importing a *type* is fine,
 * because types are erased, which is why posts still do `import type`.
 *
 * Keeping the constants in a leaf module with no imports of its own removes
 * the cycle entirely, so the single-point-of-change promise below survives.
 */

/* External research / tech-report site: its own GitHub Pages app for now.
 * When the custom domain is ready, change ONLY this constant to
 * "https://research.wigtn.com".
 *
 * Slugs match the report site's routes. As of 2026-08: wigvo, wigtnocr, wigss,
 * wigtn-coding, codex-selective-harness. That list is a convenience, not a
 * source of truth; the report site is. Do not derive a count of published
 * reports from it, and do not put such a count in copy this repo cannot
 * check. */
export const TECH_REPORT_SITE = "https://wigtn.github.io/wigtn-tech-report";

/* The report site builds with trailingSlash, so the bare URL 301s. Linking the
 * final URL saves that round trip. */
export const techReportHref = (slug: string) => `${TECH_REPORT_SITE}/${slug}/`;

/* The report site's other half. Conference and hackathon write-ups live under
 * /blog/ there, so redirects and links out of this site need their own builder
 * rather than techReportHref with the prefix hand-typed at each call site. */
export const techBlogHref = (slug: string) => `${TECH_REPORT_SITE}/blog/${slug}/`;

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
