import type { Metadata } from "next";
import { DESCRIPTION, ORG_NAME } from "@/lib/brand";
import { pageMetadata } from "@/lib/metadata";
import { homeSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { ResearchLedHome } from "@/mockups/research-led/ResearchLedHome";

/* The homepage's metadata is its own rather than the layout's, so a page that
 * sets none (the 404) does not inherit a canonical claiming to be "/". */
export const metadata: Metadata = pageMetadata({
  title: ORG_NAME,
  description: DESCRIPTION,
  path: "/",
});

/**
 * Homepage: the research-led company site (promoted from the mockup).
 */
export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <ResearchLedHome />
    </>
  );
}
