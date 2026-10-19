import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { TeamPage } from "@/mockups/research-led/TeamPage";

/* This page shipped with no metadata of its own, so it inherited the layout's
 * and told every crawler and every link preview that its canonical URL was
 * https://wigtn.com. Sharing /team produced the homepage card. */
const DESCRIPTION =
  "What WIGTN is, the partners and clients it works with, and its history from founding to accepted papers and signed partnerships.";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: DESCRIPTION,
  path: "/team",
});

export default function Page() {
  return <TeamPage />;
}
