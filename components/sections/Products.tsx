"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PROJECTS_BY_SECTION, PHASE_LABEL } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { PhoneMockup } from "@/components/projects";

/**
 * Products — fixed, single-product showcase. WIGEX is the only live product
 * right now (WIGVU is parked), so there is no carousel: phone mockup on the
 * left, copy on the right, stacked on mobile. No card / section background —
 * content sits directly on the page.
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-6 md:py-10">
          {/* Phone mockup (left on desktop, top on mobile) */}
          <PhoneMockup
            screenshot={product.app?.screenshot}
            video={product.app?.video}
            alt={`${product.name} app preview`}
            gradient={product.gradient}
          />

          {/* Copy */}
          <div className="flex-1 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-gray-200 text-gray-600 mb-4">
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
              {statusLabel}
            </span>

            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {product.name}
            </h3>

            <p className="text-lg md:text-xl text-foreground/90 font-medium mb-4">
              {processText(product.tagline[language])}
            </p>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {processText(product.description[language])}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
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
