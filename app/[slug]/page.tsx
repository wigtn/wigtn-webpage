import type { Metadata } from "next";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { RetiredPage } from "@/mockups/research-led/RetiredPage";
import { ARTICLES, RETIRED, getArticle, getRetired } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"`: one page per article slug, served at
 * the site root (e.g. /acl-2026-san-diego/). Static routes (/news, /team,
 * /projects) take precedence over this dynamic segment.
 *
 * Retired slugs are generated too. They are not articles any more, but the
 * URLs were indexed, so each one still exports a page that points at the new
 * home. See RETIRED in data.ts.
 */
export function generateStaticParams() {
  return [
    ...ARTICLES.filter((a) => !a.placeholder).map((a) => ({ slug: a.slug })),
    ...RETIRED.map((r) => ({ slug: r.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  /* Canonical points at the destination, and nothing else does. An earlier
   * version also set robots noindex, which contradicts it: canonical asks a
   * crawler to fold this URL's signal into the destination, noindex asks it to
   * drop the URL, and noindex wins. Dropping it loses the consolidation this
   * page exists to get. */
  const retired = getRetired(slug);
  if (retired) {
    return {
      title: `Moved: ${retired.title} | WIGTN`,
      description: `This page has moved to ${retired.to}`,
      alternates: { canonical: retired.to },
    };
  }

  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | WIGTN`,
    description: article.summary,
    /* No trailing slash. The Pages build exports flat files, so `/slug` is the
     * URL that resolves and `/slug/` 404s. Both of these used to carry one,
     * which pointed every article's canonical and og:url at a dead URL. */
    alternates: {
      canonical: `/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://wigtn.com/${article.slug}`,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const retired = getRetired(slug);
  if (retired) {
    return <RetiredPage to={retired.to} title={retired.title} note={retired.note} />;
  }
  return <ArticleDetail slug={slug} />;
}
