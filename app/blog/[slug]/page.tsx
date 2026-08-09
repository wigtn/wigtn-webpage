import type { Metadata } from "next";
import { SITE_URL } from "@/lib/brand";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { BLOG_FEED, getArticle } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"`: one page per blog post, served under
 * /blog (e.g. /blog/acl-2026-san-diego). The posts' original root slugs are
 * RETIRED entries in app/[slug], each forwarding here, so this segment is the
 * only place a story renders as an article.
 */
export function generateStaticParams() {
  return BLOG_FEED.map((a) => ({ slug: a.slug }));
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
    /* No trailing slash: the Pages build exports flat files, so `/blog/slug`
     * is the URL that resolves and `/blog/slug/` 404s. */
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `${SITE_URL}/blog/${article.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} />;
}
