import type { Metadata } from "next";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { ARTICLES, KO_SLUGS, getArticle, tx } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"`: one page per article slug, served
 * at the site root (e.g. /wigvo/). Static routes (/news, /team, /work,
 * /projects) take precedence over this dynamic segment.
 */
export function generateStaticParams() {
  return ARTICLES.filter((a) => !a.placeholder).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${tx(article.title, "en")} | WIGTN`,
    description: tx(article.summary, "en"),
    alternates: {
      canonical: `/${article.slug}/`,
      /* Only advertise a Korean alternate for posts that actually have one;
       * pointing hreflang at a page that was never exported is worse than
       * having no alternate at all. */
      ...(KO_SLUGS.includes(article.slug)
        ? {
            languages: {
              en: `/${article.slug}/`,
              ko: `/ko/${article.slug}/`,
            },
          }
        : {}),
    },
    openGraph: {
      title: tx(article.title, "en"),
      description: tx(article.summary, "en"),
      url: `https://wigtn.com/${article.slug}/`,
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
  return <ArticleDetail slug={slug} />;
}
