"use client";

import type { ProductFeature } from "@/constants/products";
import { useBudouX } from "@/lib/hooks/useBudouX";

interface ProductFeaturesProps {
  label: string;
  solutionText: string;
  features: ProductFeature[];
  featureTranslations: Record<string, string>;
}

export function ProductFeatures({
  label,
  solutionText,
  features,
  featureTranslations,
}: ProductFeaturesProps) {
  const { processText } = useBudouX();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-6 block tracking-wide">
          {label}
        </span>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed max-w-3xl mb-12">
          {processText(solutionText)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.descriptionKey}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-violet/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-violet" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {processText(featureTranslations[feature.descriptionKey] || "")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
