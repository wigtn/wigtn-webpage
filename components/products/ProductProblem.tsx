"use client";

import { useBudouX } from "@/lib/hooks/useBudouX";

interface ProductProblemProps {
  label: string;
  text: string;
}

export function ProductProblem({ label, text }: ProductProblemProps) {
  const { processText } = useBudouX();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-6 block tracking-wide">
          {label}
        </span>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed max-w-3xl">
          {processText(text)}
        </p>
      </div>
    </section>
  );
}
