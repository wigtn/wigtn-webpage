"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { ProductDetailTranslations } from "@/constants/translations";
import { useBudouX } from "@/lib/hooks/useBudouX";

/**
 * Minimal product shape this hero needs. Kept narrow so it can be called
 * with either a legacy ProductDetail or a Project's detail block.
 */
interface HeroProduct {
  name: string;
  gradient: string;
  liveUrl?: string;
}

interface ProductHeroProps {
  product: HeroProduct;
  translations: ProductDetailTranslations;
  ctaLabel: string;
  /** Optional poster image shown full-bleed above the content (portfolio fallback). */
  posterImage?: string;
  /** Optional hero video (local or youtube) that autoplays on mount. */
  heroVideo?: string;
  heroVideoType?: "youtube" | "local";
}

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function ProductHero({
  product,
  translations,
  ctaLabel,
  posterImage,
  heroVideo,
  heroVideoType,
}: ProductHeroProps) {
  const { processText } = useBudouX();
  const youtubeId = heroVideo && heroVideoType === "youtube" ? getYouTubeEmbedId(heroVideo) : null;

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Optional media banner — video takes precedence, else poster */}
        {(heroVideo || posterImage) && (
          <div
            className={`relative w-full rounded-2xl overflow-hidden mb-10 bg-gradient-to-br ${product.gradient}`}
            style={{ aspectRatio: "16 / 9" }}
          >
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                tabIndex={-1}
              />
            ) : heroVideo && heroVideoType === "local" ? (
              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : posterImage ? (
              <Image
                src={posterImage}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : null}
          </div>
        )}

        <div className="flex flex-col items-start gap-6">
          {/* Icon + Name + Badge */}
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-sm`}
            >
              <span className="text-2xl md:text-3xl font-bold text-white">
                {product.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>
                <span className="px-3 py-1 text-xs text-violet bg-violet/10 rounded-full font-medium">
                  {translations.statusBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-semibold text-foreground leading-tight max-w-3xl">
            {processText(translations.tagline)}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            {processText(translations.description)}
          </p>

          {/* CTA Button */}
          {product.liveUrl ? (
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet text-white rounded-xl font-medium hover:bg-violet/90 transition-colors"
            >
              {ctaLabel}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-medium cursor-not-allowed"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
