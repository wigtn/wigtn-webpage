import type { Metadata } from "next";
import { ORG_NAME, SITE_URL } from "@/lib/brand";
import { NewsPage } from "@/mockups/research-led/NewsPage";

/* Same fix as /team: without its own metadata this page advertised the
 * homepage's canonical and og:url. See the comment there. */
const DESCRIPTION =
  "What the team did: conferences, hackathons, awards, and what shipped. Findings live on the tech report site.";

export const metadata: Metadata = {
  title: `Updates | ${ORG_NAME}`,
  description: DESCRIPTION,
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: `Updates | ${ORG_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/news`,
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default function Page() {
  return <NewsPage />;
}
