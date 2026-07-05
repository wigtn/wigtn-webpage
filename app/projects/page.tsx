import type { Metadata } from "next";
import { LegacyRedirect } from "./LegacyRedirect";

/** Legacy route — the old light-theme projects index. Redirects to /work/.
 * ProjectsIndex.tsx is retained in the repo but no longer routed. */

export const metadata: Metadata = {
  title: "Projects | WIGTN",
  robots: { index: false },
};

export default function ProjectsPage() {
  return <LegacyRedirect />;
}
