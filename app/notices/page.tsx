import type { Metadata } from "next";
import { ORG_NAME, SITE_URL } from "@/lib/brand";
import { NoticesPage } from "@/mockups/research-led/NoticesPage";

/* Same fix as /team: without its own metadata this page advertised the
 * homepage's canonical and og:url. See the comment there.
 *
 * This route was /news until 2026-08-09. The old URL still exports, as a
 * redirect whose canonical points here: see the "news" entry in RETIRED. */
const DESCRIPTION =
  "What the team did: conferences, hackathons, awards, and what shipped. Findings live on WIG-log.";

export const metadata: Metadata = {
  title: `Notices | ${ORG_NAME}`,
  description: DESCRIPTION,
  alternates: {
    canonical: "/notices",
  },
  openGraph: {
    title: `Notices | ${ORG_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/notices`,
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default function Page() {
  return <NoticesPage />;
}
