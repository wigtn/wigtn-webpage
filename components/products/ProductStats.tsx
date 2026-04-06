"use client";

import type { ProductStat } from "@/constants/projects";

interface ProductStatsProps {
  id?: string;
  label: string;
  stats: ProductStat[];
  statTranslations: Record<string, string>;
}

export function ProductStats({ id, label, stats, statTranslations }: ProductStatsProps) {
  const gridCols = stats.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <section id={id} className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-8 block tracking-wide">
          {label}
        </span>

        <div className={`grid grid-cols-2 ${gridCols} gap-6`}>
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="text-center p-6 rounded-2xl border border-gray-200"
            >
              <span className="text-3xl md:text-4xl font-bold text-foreground block mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">
                {statTranslations[stat.labelKey] || stat.labelKey}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
