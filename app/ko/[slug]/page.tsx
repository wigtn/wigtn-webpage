import type { Metadata } from "next";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { KO_SLUGS, getArticle, tx } from "@/mockups/research-led/data";

/**
 * Korean article pages.
 *
 * Params come from KO_SLUGS — the posts that actually carry Korean copy —
 * not from the whole newsroom. Exporting a shell for every post would put
 * English prose at a /ko/ URL carrying lang="ko" and og:locale ko_KR, which
 * is worse than having no Korean page at all.
 */
export function generateStaticParams() {
  return KO_SLUGS.map((slug) => ({ slug }));
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
    title: `${tx(article.title, "ko")} | WIGTN`,
    description: tx(article.summary, "ko"),
    alternates: {
      canonical: `/ko/${article.slug}/`,
      languages: { en: `/${article.slug}/`, ko: `/ko/${article.slug}/` },
    },
    openGraph: {
      title: tx(article.title, "ko"),
      description: tx(article.summary, "ko"),
      url: `https://wigtn.com/ko/${article.slug}/`,
      locale: "ko_KR",
      type: "article",
    },
  };
}

export default async function KoreanArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} locale="ko" />;
}
