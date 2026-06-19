"use client";

/** /work (nav: "Product") — coming soon. Nothing to show publicly yet. */

import { PageShell, PageHero } from "./chrome";

export function WorkPage() {
  return (
    <PageShell>
      <PageHero
        title="Product."
        titleClassName="text-brand-light"
        lead="Coming soon — our first product is in the works."
      />
      <section className="max-w-6xl mx-auto px-6 pb-32 pt-4">
        <p className="text-lg text-zinc-500">
          Stay tuned. We’ll announce it here when it’s ready.
        </p>
      </section>
    </PageShell>
  );
}
