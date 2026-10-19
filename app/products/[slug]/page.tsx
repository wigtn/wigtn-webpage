import type { Metadata } from "next";
import { RetiredPage, retiredMetadata } from "@/mockups/research-led/RetiredPage";
import { RETIRED_NESTED, getRetiredNested } from "@/mockups/research-led/data";

/* /products/<slug>: retired detail pages, each a redirect to where the
 * content lives now. See RETIRED_NESTED in data.ts. */
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return RETIRED_NESTED.products.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const retired = getRetiredNested("products", (await params).slug);
  return retired ? retiredMetadata(retired) : {};
}

export default async function Page({ params }: Props) {
  const retired = getRetiredNested("products", (await params).slug)!;
  return <RetiredPage to={retired.to} title={retired.title} note={retired.note} />;
}
