"use client";

import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

const ITEMS = [
  { title: "AI-Native Development Tools" },
  { title: "App-Based Services" },
  { title: "Open Source Plugins" },
];

export function WhatWeDo() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section id="what-we-do" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-6 block tracking-wide">WHAT WE DO</span>
        <h2 className="text-section text-foreground mb-4">Building the Future of Development</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">{processText(t.whatWeDo.description)}</p>

        <div className="space-y-8">
          {ITEMS.map((item, index) => (
            <div
              key={index}
              className="group pb-8 border-b border-slate-200 last:border-b-0 last:pb-0"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-violet transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600">{processText(t.whatWeDo.items[index])}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
