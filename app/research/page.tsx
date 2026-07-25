import type { Metadata } from "next";
import { ResearchHubPage } from "@/mockups/research-hub/ResearchHubPage";

export const metadata: Metadata = {
  title: "WIGTN Research",
  description:
    "Research papers, model reports and engineering notes with the protocols, failure modes and artifacts behind each claim.",
  alternates: {
    canonical: "https://research.wigtn.com/",
  },
  openGraph: {
    title: "WIGTN Research",
    description:
      "Methods, measurements and failure modes from AI systems built by WIGTN.",
    url: "https://research.wigtn.com/",
    siteName: "WIGTN Research",
    type: "website",
  },
};

export default function ResearchPage() {
  return <ResearchHubPage />;
}
