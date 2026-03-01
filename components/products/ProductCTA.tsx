"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProductDetail } from "@/constants/products";
import { useBudouX } from "@/lib/hooks/useBudouX";

interface ProductCTAProps {
  product: ProductDetail;
  tagline: string;
  ctaLabel: string;
  backToHomeLabel: string;
}

export function ProductCTA({ product, tagline, ctaLabel, backToHomeLabel }: ProductCTAProps) {
  const { processText } = useBudouX();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          {processText(tagline)}
        </h2>

        <div className="flex flex-col items-center gap-4">
          {product.liveUrl ? (
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-violet text-white rounded-xl font-medium hover:bg-violet/90 transition-colors"
            >
              {ctaLabel}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-300 text-gray-500 rounded-xl font-medium cursor-not-allowed"
            >
              {ctaLabel}
            </button>
          )}

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-violet transition-colors"
          >
            {backToHomeLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
