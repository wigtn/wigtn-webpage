"use client";

import type { TechCategory } from "@/constants/projects";

interface ProductTechStackProps {
  id?: string;
  label: string;
  techStack: TechCategory[];
}

export function ProductTechStack({ id, label, techStack }: ProductTechStackProps) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-8 block tracking-wide">
          {label}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStack.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
