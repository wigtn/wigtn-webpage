import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

export const dynamic = "force-static";

/* AI crawlers and answer engines, allowed by name. The wildcard rule already
 * lets them in; naming them says it was decided, so a later blanket rule for
 * one of them has to be written on purpose. OpenAI, Anthropic and Perplexity
 * each run a training crawler, a search indexer and a user-triggered fetcher;
 * Google-Extended and Applebot-Extended are the opt-outs for AI use of what
 * Googlebot and Applebot already crawl. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

/* Everything is public. This replaces a hand-written public/robots.txt with
 * the same rules, so the sitemap URL comes from SITE_URL like every other
 * absolute URL on the site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
