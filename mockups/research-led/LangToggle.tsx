"use client";

/**
 * EN / KO switch.
 *
 * Only Updates is translated, and only the posts that actually carry Korean
 * copy, so this renders nothing anywhere else rather than offering a link
 * that would dump the reader on an English page labelled Korean — or on a
 * `/ko/` URL that was never exported.
 *
 * It derives the counterpart from the current path rather than a lookup
 * table, so it stays correct for the feed (/news/ <-> /ko/news/) and every
 * article detail (/<slug>/ <-> /ko/<slug>/) without being told about them.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KO_PREFIX, KO_NEWS, KO_SLUGS, NEWS, tx, type Locale } from "./data";
import { UI } from "./ui";

/* Compare paths with a single trailing slash regardless of how the router
 * hands them over. `trailingSlash` is a build-config decision that has
 * already flipped once in this repo; this should not care. */
const norm = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** The counterpart URL for `pathname`, or null when there is no Korean page. */
export function counterpartHref(pathname: string, locale: Locale): string | null {
  const path = norm(pathname);

  if (locale === "ko") {
    if (path === norm(KO_NEWS)) return NEWS;
    const slug = path.slice(norm(KO_PREFIX).length).replace(/\/$/, "");
    /* Every /ko page has an English original, so this never returns null. */
    return KO_SLUGS.includes(slug) ? `/${slug}/` : NEWS;
  }

  if (path === norm(NEWS)) return KO_NEWS;
  const slug = path.replace(/^\//, "").replace(/\/$/, "");
  return KO_SLUGS.includes(slug) ? `${KO_PREFIX}${slug}/` : null;
}

export function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const href = counterpartHref(pathname, locale);
  if (!href) return null;

  return (
    <Link
      href={href}
      hrefLang={locale === "ko" ? "en" : "ko"}
      className="rounded-full border border-line/15 px-3 py-1 font-mono text-[11px] text-ink-4 transition-colors hover:border-line/30 hover:text-ink-2"
    >
      {tx(UI.langSwitch, locale)}
    </Link>
  );
}
