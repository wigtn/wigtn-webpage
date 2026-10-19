import type { Metadata } from "next";
import { ORG_NAME, SITE_URL } from "./brand";

/**
 * Per-page metadata, built one way for every route.
 *
 * Each page used to write its own `openGraph` block, and because Next replaces
 * `openGraph` wholesale rather than merging it with the layout's, every block
 * had to repeat siteName, type and locale by hand. Two pages never wrote one
 * and advertised the homepage's og:url; the story pages dropped siteName. This
 * builds canonical, Open Graph and the Twitter card from the same four facts,
 * so a page cannot set one and forget the others.
 */

export type SocialImage = {
  /* Site-relative or absolute. metadataBase resolves a relative one. */
  url: string;
  width: number;
  height: number;
  alt: string;
};

/* The card a page shares when it has no picture of its own. Rendered from
 * docs/og/default.html: the wordmark and the homepage headline. */
export const DEFAULT_SOCIAL_IMAGE: SocialImage = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: "WIGTN. We learn, build, and share AI in the open.",
};

/* `path` is the page's own URL, which is also its canonical: "/team",
 * "/story/acl-2026-san-diego". No trailing slash, because the Pages build
 * exports flat files and `/team/` 404s. A retired URL passes its destination
 * instead, which may be off-site. */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : new URL(path, SITE_URL).href;
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
}: {
  /* The page's own name. The layout's template adds " | WIGTN" to the
   * document title; the cards get the same string spelled out, because the
   * template does not reach them. The homepage passes ORG_NAME alone. */
  title: string;
  description: string;
  path: string;
  image?: SocialImage;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title === ORG_NAME ? ORG_NAME : `${title} | ${ORG_NAME}`;
  const url = absoluteUrl(path);

  return {
    title: title === ORG_NAME ? { absolute: ORG_NAME } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: ORG_NAME,
      type,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
