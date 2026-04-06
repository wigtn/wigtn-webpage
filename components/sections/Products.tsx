"use client";

import { Plane, Camera, BarChart3 } from "lucide-react";
import { PROJECTS_BY_SECTION, PHASE_LABEL } from "@/constants/projects";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { PhoneMockup } from "@/components/projects";

/** Parse the structured "key::value\nkey::value" description format. */
function parseDescription(raw: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const idx = line.indexOf("::");
    if (idx !== -1) {
      map[line.slice(0, idx)] = line.slice(idx + 2);
    }
  }
  return map;
}

const PHASE_ICONS = [
  { key: "before", icon: Plane },
  { key: "during", icon: Camera },
  { key: "after", icon: BarChart3 },
] as const;

/**
 * Products — fixed, single-product showcase. Phone mockup on the left,
 * 3-phase copy (Before / During / After) on the right, height-matched to
 * the phone frame. Stacked on mobile.
 */
export function Products() {
  const products = PROJECTS_BY_SECTION.products;
  const { processText } = useBudouX();

  const product = products[0];
  if (!product) return null;

  const statusLabel = PHASE_LABEL[product.phase];
  const statusDot =
    product.phase === "in-progress"
      ? "bg-amber-400 animate-pulse"
      : product.phase === "completed"
        ? "bg-emerald-400"
        : "bg-gray-400";

  const desc = parseDescription(product.description);

  return (
    <section id="products" className="min-h-screen snap-start py-16 md:py-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="mb-12 md:mb-16">
          <h2 className="text-section text-violet mb-2 tracking-wide">
            Our Products
          </h2>
          <p className="text-lg md:text-xl text-foreground">
            Mobile apps we&apos;re building right now.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16 py-6 md:py-10">
          {/* Phone mockup */}
          <PhoneMockup
            screenshot={product.app?.screenshot}
            video={product.app?.video}
            alt={`${product.name} app preview`}
            gradient={product.gradient}
          />

          {/* Copy — matches phone height on desktop */}
          <div className="flex-1 max-w-xl flex flex-col text-center md:text-left">
            {/* Header */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-gray-200 text-gray-600 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                {statusLabel}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-base md:text-lg text-foreground/80 font-medium">
                {processText(product.tagline)}
              </p>
            </div>

            {/* 3-phase timeline */}
            <div className="flex-1 flex flex-col justify-evenly gap-4 md:gap-0">
              {PHASE_ICONS.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-violet" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-0.5">
                      {desc[`${key}_title`]}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {processText(desc[key] ?? "")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
              {product.app?.appStoreUrl ? (
                <a
                  href={product.app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
                  title="Coming soon"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </button>
              )}
              {product.app?.playStoreUrl ? (
                <a
                  href={product.app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.144 1.24a1 1 0 0 1 0 1.724l-2.144 1.24-2.53-2.53 2.53-2.674zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/></svg>
                  Google Play
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
                  title="Coming soon"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.144 1.24a1 1 0 0 1 0 1.724l-2.144 1.24-2.53-2.53 2.53-2.674zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/></svg>
                  Google Play
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
