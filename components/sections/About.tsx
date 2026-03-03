"use client";

import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

export function About() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section id="about" className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-section text-violet mb-4 tracking-wide">ABOUT</h2>
        <p className="text-lg md:text-xl text-foreground mb-8">
          {processText(t.about.heading)}
        </p>
        <div className="space-y-4 max-w-2xl">
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
