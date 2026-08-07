/**
 * Locale primitives for the bilingual Updates surface.
 *
 * This module imports NOTHING, on purpose. `data.ts` value-imports the
 * colocated posts (`updates/<slug>/index.ts`), and those posts need `t` to
 * author their copy. If `t` lived in `data.ts` the two would form a real
 * ES-module cycle: `data.ts`'s body has not finished running when the post's
 * body runs, so `t` would still be in its temporal dead zone and the build
 * would die with "Cannot access 't' before initialization". Keeping the
 * primitives in a leaf module breaks the cycle — posts import from here,
 * never from `data.ts`.
 *
 * `data.ts` re-exports everything below, so existing `from "./data"` imports
 * keep working.
 */

export type Locale = "en" | "ko";

export const LOCALES: readonly Locale[] = ["en", "ko"];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * A user-visible string. A bare string is the same in both languages, which
 * is the right answer for brand tokens ("GitHub", "npm", "ACL 2026") and for
 * copy nobody has translated yet.
 */
export type I18nText = string | { en: string; ko: string };

/** Resolve for `locale`, falling back to English rather than rendering blank. */
export const tx = (value: I18nText, locale: Locale): string =>
  typeof value === "string" ? value : value[locale] || value.en;

/**
 * Authoring helper. Use this instead of writing `{ en: "...", ko: "..." }`
 * inline: an object literal collapses onto one line and a paragraph-length
 * pair becomes an 800-character row that neither language can be read in and
 * no reviewer can diff. `t(en, ko)` keeps one language per line.
 */
export const t = (en: string, ko: string): I18nText => ({ en, ko });

/** True when a value carries an actual translation rather than a bare string. */
export const isPair = (v: unknown): v is { en: string; ko: string } =>
  typeof v === "object" && v !== null && "ko" in v;
