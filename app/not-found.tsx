import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/mockups/research-led/chrome";
import { HOME } from "@/mockups/research-led/data";

/* GitHub Pages serves the exported 404.html for any path that has no file.
 * It was Next's bare default, with no header, footer or way back; this puts
 * it in the site's shell, laid out like RetiredPage, with the default's own
 * sentence. noindex, and no canonical: it is not a page of its own. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-6 py-32">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
          404
        </span>
        <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
          This page could not be found.
        </h1>
        <Link
          href={HOME}
          className="group mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-line/15 px-6 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:border-brand hover:bg-brand/10"
        >
          Back to home{" "}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </PageShell>
  );
}
