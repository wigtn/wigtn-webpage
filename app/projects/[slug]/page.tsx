import type { Metadata } from "next";
import { PROJECTS } from "@/constants/projects";
import { LegacyRedirect } from "../LegacyRedirect";

/** Legacy route: old per-project detail pages. Still exported for every
 * old slug so previously shared/indexed URLs land on a redirect stub
 * instead of a 404. ProjectDetail.tsx is retained but no longer routed. */

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const metadata: Metadata = {
  title: "Projects | WIGTN",
  robots: { index: false },
};

export default function ProjectPage() {
  return <LegacyRedirect />;
}
