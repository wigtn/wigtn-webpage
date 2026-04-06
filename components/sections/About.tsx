"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { HOME_STATS } from "@/constants/projects";

const CAROUSEL_IMAGES = [
  "/images/carousel/wigtnocr-huggingface.png",
  "/images/carousel/wigvo_screenshot_call.png",
  "/images/carousel/timelens_hero.png",
];

export function About() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  // Duplicate images for seamless infinite loop
  const filmImages = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

  return (
    <section id="about" className="min-h-screen snap-start py-16 md:py-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-section text-violet mb-4 tracking-wide">About us</h2>
        <p className="text-lg md:text-xl text-foreground mb-8">
          {t.about.heading}
        </p>
        <div className="space-y-4">
          {t.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {processText(paragraph)}
            </p>
          ))}
        </div>

        {/* Stat bar — 10% smaller */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 py-6 border-y border-gray-200">
          {HOME_STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-gray-500 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Film carousel — full width, gradient edges */}
      <div className="relative mt-10 md:mt-12 overflow-hidden">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none" />
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />

        <div className="flex gap-4 animate-carousel">
          {filmImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] md:w-[360px] h-[180px] md:h-[220px] rounded-xl overflow-hidden border border-black/[0.06]"
            >
              <Image
                src={src}
                alt="Project preview"
                width={360}
                height={220}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
