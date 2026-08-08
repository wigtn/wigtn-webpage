import type { MetadataRoute } from "next";
import { ARTICLES, articleHref } from "@/mockups/research-led/data";

const SITE = "https://wigtn.com";

export const dynamic = "force-static";

function articleDate(value: string): Date {
  const [year, month = 1, day = 1] = value.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* /work is retired: it grouped the technical articles that moved to the
   * tech-report site, and its one surviving group is a filter on /news. The URL
   * still resolves to a redirect page, which is deliberately not listed here. */
  /* No trailing slashes. The Pages build exports flat files, so `/news` is the
   * URL that resolves and `/news/` 404s. This sitemap advertised the slashed
   * form for both sub-pages, which meant two of its ten entries pointed at
   * nothing. The root keeps its slash because `/` is the root. */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/news`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/team`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = ARTICLES.filter((article) => !article.placeholder).map(
    (article) => ({
      url: `${SITE}${articleHref(article.slug)}`,
      lastModified: articleDate(article.date),
      changeFrequency: "monthly",
      priority: article.channel === "newsroom" ? 0.7 : 0.6,
    }),
  );

  return [...staticRoutes, ...articles];
}
