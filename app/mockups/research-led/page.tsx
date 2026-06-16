import { ResearchLedHome } from "@/mockups/research-led/ResearchLedHome";

/**
 * Route wrapper so the research-led renewal mockup is viewable in the
 * browser at /mockups/research-led during `npm run dev`. The mockup
 * component itself lives under /mockups so it stays clearly separated
 * from the real, shipping site under /app and /components.
 */
export default function ResearchLedMockupPage() {
  return <ResearchLedHome />;
}
