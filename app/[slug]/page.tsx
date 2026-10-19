import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { postSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { RetiredPage } from "@/mockups/research-led/RetiredPage";
import {
  ARTICLES,
  RETIRED,
  articleHref,
  getArticle,
  getRetired,
  hrefFor,
  releaseCoverFor,
} from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"`: one page per article slug, served at
 * the site root (e.g. /acl-2026-san-diego/). Static routes (/notices, /team)
 * take precedence over this dynamic segment, which is why /news can be a
 * retired slug here now that its own route is gone.
 *
 * Retired slugs are generated too. They are not articles any more, but the
 * URLs were indexed, so each one still exports a page that points at the new
 * home. See RETIRED in data.ts.
 *
 * Articles that live off the root are excluded: a story post renders at
 * /story/<slug> and a blog post would render at /blog/<slug>, while their
 * root slugs are RETIRED entries that forward there. Without the filter each
 * of those slugs is emitted twice, once as an article and once as a
 * redirect, for a URL that must only ever be the redirect. Next dedupes the
 * params, so the duplicate does not fail the build; what it does is make the
 * page's output depend on getRetired being checked before getArticle below.
 *
 * The test is the routing predicate rather than a list of channel names, so
 * it stays true for the next channel that renders off the root. It was
 * `channel !== "blog"` while the stories were blog posts, and it kept that
 * spelling when they moved to the story channel, which left it guarding
 * nothing.
 */
export function generateStaticParams() {
  return [
    ...ARTICLES.filter((a) => !a.placeholder && hrefFor(a) === articleHref(a.slug)).map((a) => ({
      slug: a.slug,
    })),
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
   * page exists to get.
   *
   * og:url points at the destination as well. Without it a redirect page
   * inherited the layout's, and a shared link to /news previewed as the
   * homepage. */
  const retired = getRetired(slug);
  if (retired) {
    return pageMetadata({
      title: `Moved: ${retired.title}`,
      description: `This page has moved to ${retired.to}`,
      path: retired.to,
    });
  }

  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  /* A release page's card is its product's cover art from the Product panel;
   * a notice, and WigtnOCR, which has no panel row, share the default. No
   * trailing slash on the path: the Pages build exports flat files, so
   * `/slug` resolves and `/slug/` 404s. */
  const cover = releaseCoverFor(article.slug);
  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/${article.slug}`,
    type: "article",
    image: cover && {
      url: cover.src,
      width: cover.width,
      height: cover.height,
      alt: `${cover.name} cover art`,
    },
  });
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
  const article = getArticle(slug);
  return (
    <>
      {article && <JsonLd data={postSchema(article)} />}
      <ArticleDetail slug={slug} />
    </>
  );
}
