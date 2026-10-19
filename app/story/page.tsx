import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { storyListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { StoryPage } from "@/mockups/research-led/StoryPage";

const DESCRIPTION =
  "What the team did, one row per event: conferences, hackathons, and where each one ended up. Each row opens the full account, photographs and all.";

export const metadata: Metadata = pageMetadata({
  title: "Story",
  description: DESCRIPTION,
  path: "/story",
});

export default function Page() {
  return (
    <>
      <JsonLd data={storyListSchema()} />
      <StoryPage />
    </>
  );
}
