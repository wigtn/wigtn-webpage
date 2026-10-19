import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { productsListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { NoticesPage } from "@/mockups/research-led/NoticesPage";

/* Same fix as /team: without its own metadata this page advertised the
 * homepage's canonical and og:url. See the comment there.
 *
 * This route was /news until 2026-08-09. The old URL still exports, as a
 * redirect to /story since 2026-10-20: see the "news" entry in RETIRED. */
const DESCRIPTION =
  "The release record: every version of everything WIGTN has shipped, dated from the registry that serves it.";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: DESCRIPTION,
  path: "/notices",
});

export default function Page() {
  return (
    <>
      <JsonLd data={productsListSchema()} />
      <NoticesPage />
    </>
  );
}
