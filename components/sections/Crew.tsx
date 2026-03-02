"use client";

import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

export function Crew() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-hero text-foreground">
          WIGTN Crew
        </h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          {processText(t.hero.tagline)}
        </p>
      </div>
    </section>
  );
}
