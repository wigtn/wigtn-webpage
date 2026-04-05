"use client";

import Image from "next/image";
import { Smartphone } from "lucide-react";

interface PhoneMockupProps {
  /** Path to a portrait screenshot (png/jpg) shown inside the frame. */
  screenshot?: string;
  /** Path to a portrait mp4 that autoplays muted+loop inside the frame. */
  video?: string;
  /** Alt text for the screenshot (falls back to "App preview"). */
  alt?: string;
  /** Tailwind gradient classes used as a placeholder when no media exists. */
  gradient?: string;
}

/**
 * Pure-CSS iPhone-style portrait frame with a dynamic-island notch.
 * Renders, in order of preference: video → screenshot → gradient placeholder
 * with a phone icon. Sized for desktop (280 × 560) with a compact mobile
 * variant (220 × 440).
 */
export function PhoneMockup({
  screenshot,
  video,
  alt = "App preview",
  gradient = "from-gray-700 to-gray-900",
}: PhoneMockupProps) {
  return (
    <div
      className="relative mx-auto rounded-[36px] border-[8px] border-[#1a1a1a] bg-black overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-[220px] h-[440px] md:w-[280px] md:h-[560px] flex-shrink-0"
      role="figure"
      aria-label={alt}
    >
      {/* Dynamic-island notch */}
      <div
        aria-hidden
        className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[80px] h-[24px] rounded-[12px] bg-[#1a1a1a] z-20"
      />

      {/* Media layer */}
      {video ? (
        <video
          src={video}
          poster={screenshot}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : screenshot ? (
        <Image
          src={screenshot}
          alt={alt}
          fill
          sizes="(max-width: 768px) 220px, 280px"
          className="object-cover"
          unoptimized
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
        >
          <Smartphone className="w-16 h-16 text-white/30" strokeWidth={1.2} />
        </div>
      )}
    </div>
  );
}
