import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { ARTICLES } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"` — one page per mock article slug.
 * The client <ArticleDetail> looks the article up by slug itself, so no
 * non-serializable data crosses the server→client boundary.
 */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} />;
}
