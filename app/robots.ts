import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

export const dynamic = "force-static";

/* Everything is public. This replaces a hand-written public/robots.txt with
 * the same rules, so the sitemap URL comes from SITE_URL like every other
 * absolute URL on the site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
