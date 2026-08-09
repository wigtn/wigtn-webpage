import type { Metadata } from "next";
import { ORG_NAME, SITE_URL } from "@/lib/brand";
import { StoryPage } from "@/mockups/research-led/StoryPage";

/* `openGraph` is replaced wholesale rather than deep-merged with the layout's,
 * so siteName, type and locale are repeated here on purpose.
 *
 * No trailing slash: the Pages build exports flat files, so `/story` resolves
 * and `/story/` 404s. */
const DESCRIPTION =
  "What the team did, one row per event: conferences, hackathons, and where each one ended up. The full account of each is on the blog.";

export const metadata: Metadata = {
  title: `Story | ${ORG_NAME}`,
  description: DESCRIPTION,
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: `Story | ${ORG_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/story`,
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default function Page() {
  return <StoryPage />;
}
