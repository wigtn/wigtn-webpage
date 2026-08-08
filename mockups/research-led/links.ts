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
 * wigtn-coding, codex-selective-harness. That list is a
 * convenience, not a source of truth; the report site is. Do not derive a
 * count of published reports from it, and do not put such a count in copy that
 * this repo cannot check. */
export const TECH_REPORT_SITE = "https://wigtn.github.io/wigtn-tech-report";

/* The report site builds with trailingSlash, so the bare URL 301s. Linking the
 * final URL saves that round trip. */
export const techReportHref = (slug: string) => `${TECH_REPORT_SITE}/${slug}/`;
