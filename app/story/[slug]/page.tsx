import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ArticleDetail } from "@/mockups/research-led/ArticleDetail";
import { STORY_FEED, getArticle, getStory } from "@/mockups/research-led/data";

/**
 * Static params for `output: "export"`: one page per long-form story, served
 * under /story (e.g. /story/acl-2026-san-diego), below the /story rows that
 * summarize them. The posts' original root slugs are RETIRED entries in
 * app/[slug], each forwarding here, so this segment is the only place a
 * story renders as an article. The pages lived at /blog/<slug> for a day,
 * before the blog section closed.
 */
export function generateStaticParams() {
  return STORY_FEED.map((a) => ({ slug: a.slug }));
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

  /* The card is the story's cover, the picture its /story row shows. */
  const cover = getStory(article.slug)?.cover;
  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/story/${article.slug}`,
    type: "article",
    image: cover && {
      url: cover.src,
      width: cover.width,
      height: cover.height,
      alt: article.title,
    },
  });
}

export default async function StoryPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} />;
}
