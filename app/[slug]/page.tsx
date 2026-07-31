import type { Metadata } from "next";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { ARTICLES, getArticle, tx, NEWSROOM_SLUGS, KO_PREFIX } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"`: one page per article slug, served
 * at the site root (e.g. /wigvo/). Static routes (/news, /team, /work,
 * /projects) take precedence over this dynamic segment.
 */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
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

  const title = tx(article.title, "en");
  const description = tx(article.summary, "en");
  // Only newsroom articles have a Korean counterpart, so only they advertise
  // one. Pointing hreflang at a page that does not exist is worse than
  // omitting it.
  const hasKo = NEWSROOM_SLUGS.includes(article.slug);

  return {
    title: `${title} | WIGTN`,
    description,
    alternates: {
      canonical: `/${article.slug}/`,
      ...(hasKo && {
        languages: {
          en: `/${article.slug}/`,
          ko: `${KO_PREFIX}${article.slug}/`,
        },
      }),
    },
    openGraph: {
      title,
      description,
      url: `https://wigtn.com/${article.slug}/`,
      type: "article",
      locale: "en_US",
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
