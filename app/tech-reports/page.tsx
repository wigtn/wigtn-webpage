import type { Metadata } from "next";
import { TechReportsPage } from "@/mockups/research-led/TechReportsPage";

export const metadata: Metadata = {
  title: "Tech Reports | WIGTN",
  description:
    "Benchmarks, failure modes, and architecture notes from AI systems built by WIGTN.",
  alternates: {
    canonical: "/tech-reports/",
  },
  openGraph: {
    title: "Tech Reports | WIGTN",
    description:
      "Reproducible benchmarks and engineering notes from WIGTN's models, systems, and agentic tooling.",
    url: "https://wigtn.com/tech-reports/",
    type: "website",
  },
};

export default function Page() {
  return <TechReportsPage />;
}
