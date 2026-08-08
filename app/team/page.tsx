import type { Metadata } from "next";
import { ORG_NAME, SITE_URL } from "@/lib/brand";
import { TeamPage } from "@/mockups/research-led/TeamPage";

/* This page shipped with no metadata of its own, so it inherited the layout's
 * and told every crawler and every link preview that its canonical URL was
 * https://wigtn.com. Sharing /team produced the homepage card.
 *
 * `openGraph` is replaced wholesale rather than deep-merged with the layout's,
 * so siteName, type and locale are repeated here on purpose.
 *
 * No trailing slash: the Pages build exports flat files, so `/team` resolves
 * and `/team/` 404s. */
const DESCRIPTION =
  "Five engineers who publish peer-reviewed research and release everything it runs on, with no lab behind them.";

export const metadata: Metadata = {
  title: `About | ${ORG_NAME}`,
  description: DESCRIPTION,
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: `About | ${ORG_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/team`,
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default function Page() {
  return <TeamPage />;
}
