import type { Metadata } from "next";
import { ORG_NAME, SITE_URL } from "@/lib/brand";
import { BlogPage } from "@/mockups/research-led/BlogPage";

/* `openGraph` is replaced wholesale rather than deep-merged with the layout's,
 * so siteName, type and locale are repeated here on purpose.
 *
 * No trailing slash: the Pages build exports flat files, so `/blog` resolves
 * and `/blog/` 404s. */
const DESCRIPTION =
  "Conference trips and hackathon weekends, written up with the photographs and the decisions they forced.";

export const metadata: Metadata = {
  title: `Blog | ${ORG_NAME}`,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${ORG_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default function Page() {
  return <BlogPage />;
}
