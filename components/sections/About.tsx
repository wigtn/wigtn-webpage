"use client";

import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

export function About() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section id="about" className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-section text-violet mb-4 tracking-wide">About us</h2>
        <p className="text-lg md:text-xl text-foreground mb-8">
          We prove ourselves by what we build, not how long we&apos;ve built.
        </p>
        <div className="space-y-4">
          {t.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {processText(paragraph)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
