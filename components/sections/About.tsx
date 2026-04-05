"use client";

import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { HOME_STATS } from "@/constants/projects";

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

        {/* Stat bar */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-200">
          {HOME_STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
