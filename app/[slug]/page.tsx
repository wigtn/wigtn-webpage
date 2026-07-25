import type { Metadata } from "next";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { TechnicalReportDetail } from "@/mockups/research-led/TechnicalReportDetail";
import { ARTICLES, TECH_REPORTS, getArticle } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"` — one page per article slug, served
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

  return {
    title: `${article.title} | WIGTN`,
    description: article.summary,
    alternates: {
      canonical: `/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
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
  const article = getArticle(slug);

  if (article && TECH_REPORTS.some((entry) => entry.article.slug === slug)) {
    return <TechnicalReportDetail slug={slug} />;
  }

  return <ArticleDetail slug={slug} />;
}
