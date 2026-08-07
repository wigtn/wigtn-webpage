import type { MetadataRoute } from "next";
import { ARTICLES, KO_SLUGS, articleHref, getArticle } from "@/mockups/research-led/data";

const SITE = "https://wigtn.com";

export const dynamic = "force-static";

function articleDate(value: string): Date {
  const [year, month = 1, day = 1] = value.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/news/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/work/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/team/`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = ARTICLES.filter((article) => !article.placeholder).map(
    (article) => ({
      url: `${SITE}${articleHref(article.slug)}`,
      lastModified: articleDate(article.date),
      changeFrequency: "monthly",
      priority: article.channel === "newsroom" ? 0.7 : 0.6,
    }),
  );

  /* Korean pages exist only for posts that carry Korean copy, so this maps
   * KO_SLUGS rather than the whole feed — the same list generateStaticParams
   * uses. Priorities sit just under their English counterparts to signal
   * English as primary. */
  const korean: MetadataRoute.Sitemap = [
    { url: `${SITE}/ko/news/`, changeFrequency: "weekly", priority: 0.85 },
    ...KO_SLUGS.map((slug) => ({
      url: `${SITE}${articleHref(slug, "ko")}`,
      lastModified: articleDate(getArticle(slug)!.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  return [...staticRoutes, ...articles, ...korean];
}
