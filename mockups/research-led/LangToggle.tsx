"use client";

/**
 * EN / KO switch.
 *
 * Only the Updates surface is translated, so this renders nothing anywhere
 * else rather than offering a link that would dump the reader on an English
 * page labelled Korean. It derives the counterpart URL from the current path,
 * which keeps it correct for both the feed (/news/ <-> /ko/news/) and every
 * article detail (/<slug>/ <-> /ko/<slug>/) without a lookup table.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KO_PREFIX, NEWS, KO_NEWS, type Locale } from "./data";
import { NEWSROOM_SLUGS } from "./data";

/** The counterpart URL for `pathname`, or null when there is no Korean page. */
export function counterpartHref(pathname: string, locale: Locale): string | null {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;

  if (locale === "ko") {
    if (path === KO_NEWS) return NEWS;
    const slug = path.slice(KO_PREFIX.length).replace(/\/$/, "");
    return NEWSROOM_SLUGS.includes(slug) ? `/${slug}/` : NEWS;
  }

  if (path === NEWS) return KO_NEWS;
  const slug = path.replace(/^\//, "").replace(/\/$/, "");
  return NEWSROOM_SLUGS.includes(slug) ? `${KO_PREFIX}${slug}/` : null;
}

export function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const href = counterpartHref(pathname, locale);
  if (!href) return null;

  const other = locale === "ko" ? "EN" : "KO";
  return (
    <Link
      href={href}
      // `hrefLang` tells crawlers the target language; the visible label is
      // the language you switch TO, which is the convention readers expect.
      hrefLang={locale === "ko" ? "en" : "ko"}
      aria-label={locale === "ko" ? "View in English" : "한국어로 보기"}
      className="grid h-9 shrink-0 place-items-center rounded-full border border-line/15 px-3 font-mono text-[11px] font-semibold tracking-wider text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      {other}
    </Link>
  );
}
