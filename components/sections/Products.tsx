"use client";

import Link from "next/link";
import { ExternalLink, Plane, Camera, BarChart3 } from "lucide-react";
import { PROJECTS_BY_SECTION, PHASE_LABEL } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
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
  const { language } = useLanguage();
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

  const appStoreUrl = product.app?.appStoreUrl;
  const desc = parseDescription(product.description[language]);

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <h2 className="text-section text-violet mb-2 tracking-wide">
            Our Products
          </h2>
          <p className="text-lg md:text-xl text-foreground">
            Mobile apps we&apos;re building right now.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-16 py-6 md:py-10">
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
                {processText(product.tagline[language])}
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

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
              {appStoreUrl ? (
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet text-white text-sm font-medium hover:bg-violet/90 transition-colors"
                >
                  App Store
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
                  title="Coming soon"
                >
                  App Store
                </button>
              )}
              <Link
                href={`/projects/${product.slug}/`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:border-violet hover:text-violet transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
