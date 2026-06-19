import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { ARTICLES } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"` — one page per article slug, served
 * at the site root (e.g. /wigvo/). Static routes (/news, /team, /work,
 * /projects) take precedence over this dynamic segment.
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
