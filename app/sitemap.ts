import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";
import {
  ARTICLES,
  MILESTONES,
  RELEASE_ROWS,
  STORY_FEED,
  hrefFor,
  type Article,
} from "@/mockups/research-led/data";

export const dynamic = "force-static";

/* "2026.10.03" or "2026.10" to a UTC date; a month alone is its first day. */
function siteDate(value: string): Date {
  const [year, month = 1, day = 1] = value.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function latest(...dates: string[]): Date {
  return siteDate(dates.reduce((a, b) => (a > b ? a : b)));
}

/* A release page lists every version, so it changes when a version ships,
 * not only when the post was written. */
function articleModified(article: Article): Date {
  return latest(article.date, ...(article.versions ?? []).map((v) => v.date));
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* lastModified comes from the data each page renders, not the build time:
   * a deploy that changes nothing on a page should not tell a crawler it did.
   * The homepage shows the projects, the releases and the papers, so it moves
   * with whichever of those is newest; About shows History. */
  const newestMilestone = MILESTONES.filter((m) => !m.placeholder).at(-1)!.date;
  const newestRelease = RELEASE_ROWS[0].date;
  const newestStory = STORY_FEED[0].date;

  /* Retired routes (/work, /news, /projects and the rest of RETIRED) still
   * resolve as redirect pages and none is listed here, because a redirect is
   * not a page worth indexing.
   *
   * No trailing slashes. The Pages build exports flat files, so `/notices` is
   * the URL that resolves and `/notices/` 404s. The root keeps its slash
   * because `/` is the root. */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: latest(newestMilestone, newestRelease), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/notices`, lastModified: siteDate(newestRelease), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/story`, lastModified: siteDate(newestStory), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/team`, lastModified: siteDate(newestMilestone), changeFrequency: "monthly", priority: 0.7 },
  ];

  /* hrefFor, not articleHref: a story post's page is /story/<slug>, and its
   * root slug is one of the redirects excluded above.
   *
   * The blog filter is load-bearing, not a restatement of today's data. The
   * section is closed and app/blog/* is deleted, but hrefFor still routes
   * `channel: "blog"` to /blog/<slug>, so the first post written under step 1
   * of docs/blog-section.md would be advertised here before step 2 restores
   * the routes. Remove this filter in that step, with the /blog index line
   * above; the posts need no line of their own. */
  const articles: MetadataRoute.Sitemap = ARTICLES.filter(
    (article) => !article.placeholder && article.channel !== "blog",
  ).map((article) => ({
    url: `${SITE_URL}${hrefFor(article)}`,
    lastModified: articleModified(article),
    changeFrequency: "monthly",
    priority: article.channel === "newsroom" || article.channel === "story" ? 0.7 : 0.6,
  }));

  return [...staticRoutes, ...articles];
}
