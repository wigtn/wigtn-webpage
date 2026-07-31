import type { Metadata } from "next";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import {
  NEWSROOM_SLUGS,
  getArticle,
  tx,
  KO_PREFIX,
} from "@/mockups/research-led/data";

/**
 * Korean article detail. Unlike the English route, this generates pages only
 * for `NEWSROOM_SLUGS`: the back catalogue (papers, model releases, the older
 * report-channel posts) has no Korean copy, so exporting shells for them would
 * publish English text under a /ko/ URL.
 *
 * The static route /ko/news/ takes precedence over this dynamic segment, the
 * same way /news/ does at the root.
 */
export function generateStaticParams() {
  return NEWSROOM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const title = tx(article.title, "ko");
  const description = tx(article.summary, "ko");

  return {
    title: `${title} | WIGTN`,
    description,
    alternates: {
      canonical: `${KO_PREFIX}${slug}/`,
      languages: { en: `/${slug}/`, ko: `${KO_PREFIX}${slug}/` },
    },
    openGraph: {
      title,
      description,
      url: `https://wigtn.com${KO_PREFIX}${slug}/`,
      type: "article",
      locale: "ko_KR",
    },
  };
}

export default async function KoArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} locale="ko" />;
}
