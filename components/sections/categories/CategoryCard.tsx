"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import {
  GitHubIcon,
  YouTubeIcon,
  HuggingFaceIcon,
} from "@/components/ui/icons";

/**
 * CategoryCard — the single card shape used by every tab in the
 * <Categories /> section. The four tabs (Research, Awards, Open Source,
 * Products) all render the same card layout so switching tabs feels like
 * filtering a uniform grid, not jumping between unrelated UI paradigms.
 *
 * Card layout, top to bottom:
 *   1. Visual area  — `aspect-[16/10]` tile. Each tab passes its own
 *                     `visualClassName` (background / padding); the
 *                     `visual` ReactNode is centered inside.
 *   2. Title        — semibold, hover→violet.
 *   3. Description  — one to two lines, gray-600.
 *   4. Meta         — venue / event / platform line, gray-500 small.
 *   5. Links row    — pill-style chips. All chips same height/padding so
 *                     the hit target is uniform regardless of label
 *                     length (was a problem with inline text+icon).
 *
 * Cards in a grid stretch to equal height via `h-full + flex flex-col`,
 * and the chip row sits at the bottom (`mt-auto`) so cards align even
 * when descriptions differ in length.
 */

export type BadgeTone =
  | "violet"
  | "amber"
  | "slate"
  | "emerald"
  | "sky"
  | "gray";

export interface CategoryCardLink {
  kind: "github" | "video" | "huggingface" | "live" | "npm" | "news";
  href: string;
  label?: string;
}

interface CategoryCardProps {
  /** Project slug — used to build the detail-page href. */
  slug: string;
  /** Project name — primary heading on the card. */
  name: string;
  /** One- or two-line description. Clamps to 2 lines so cards align. */
  description: string;
  /** Venue / event / platform — gray meta line below the description. */
  meta?: string | null;
  /** ReactNode rendered inside the visual area. */
  visual: ReactNode;
  /** Tailwind classes appended to the visual-area wrapper — each tab
   *  controls its own background and padding. Defaults to a neutral
   *  gray fill. Examples:
   *    - Research:   "bg-gray-50"           (image full-bleeds inside)
   *    - Awards:     "bg-gradient-to-br from-amber-50 to-amber-100"
   *    - OpenSource: "bg-gradient-to-br from-sky-50 to-sky-100"   */
  visualClassName?: string;
  /** Top-left badge above the visual area. */
  badge?: { label: string; tone: BadgeTone } | null;
  /** External links rendered at the bottom of the card. */
  links?: CategoryCardLink[];
}

const BADGE_TONE: Record<BadgeTone, string> = {
  violet: "border-violet/40 bg-violet/[0.08] text-violet",
  amber: "border-amber-300 bg-amber-50 text-amber-800",
  slate: "border-slate-300 bg-slate-50 text-slate-700",
  emerald: "border-emerald-300 bg-emerald-50 text-emerald-800",
  sky: "border-sky-300 bg-sky-50 text-sky-800",
  gray: "border-black/[0.10] bg-white text-gray-600",
};

const LINK_ICON: Record<
  CategoryCardLink["kind"],
  { icon: React.ReactNode; label: string }
> = {
  github: { icon: <GitHubIcon className="w-4 h-4" />, label: "GitHub" },
  video: {
    // YouTube red kept regardless of hover — brand recognition first.
    icon: <YouTubeIcon className="w-4 h-4 text-red-600" />,
    label: "Video",
  },
  huggingface: {
    icon: <HuggingFaceIcon className="w-4 h-4 rounded-full" />,
    label: "HF",
  },
  live: { icon: <ArrowUpRight className="w-4 h-4" />, label: "Live" },
  npm: {
    icon: <span className="text-[10px] font-mono leading-none">npm</span>,
    label: "npm",
  },
  news: {
    icon: <Newspaper className="w-4 h-4" strokeWidth={1.75} />,
    label: "News",
  },
};

export function CategoryCard({
  slug,
  name,
  description,
  meta,
  visual,
  visualClassName = "bg-gray-50",
  badge,
  links,
}: CategoryCardProps) {
  return (
    <Link
      href={`/projects/${slug}/`}
      className="group flex flex-col h-full rounded-xl border border-black/[0.07] bg-white overflow-hidden transition-[border,box-shadow,transform] duration-300 hover:-translate-y-[2px] hover:border-violet/40 hover:shadow-[0_18px_40px_-22px_rgba(76,29,149,0.28)]"
    >
      {/* Visual area — 16:10 aspect, fills the card width. The wrapper
          background / padding is controlled per-tab via `visualClassName`
          so Research can full-bleed an image while Awards can drop a
          medal-tinted gradient behind a Lucide icon. */}
      <div
        className={`relative aspect-[16/10] flex items-center justify-center overflow-hidden ${visualClassName}`}
      >
        {badge && (
          <span
            className={`absolute top-3 left-3 z-10 inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-mono font-semibold tracking-[0.12em] uppercase ${BADGE_TONE[badge.tone]}`}
          >
            {badge.label}
          </span>
        )}

        {visual}
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-6 gap-1.5">
        <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight group-hover:text-violet transition-colors">
          {name}
        </h3>
        <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
          {description}
        </p>
        {meta && (
          <p className="text-[11.5px] text-gray-500 mt-0.5">{meta}</p>
        )}

        {/* Pill-style link chips. Uniform padding + height regardless of
            label length, so the hit target is consistent across "Video"
            (long) and "HF" (short). Sits at the card bottom via mt-auto
            so cards with shorter descriptions still align. */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
            {links.map((link) => {
              const meta = LINK_ICON[link.kind];
              return (
                <a
                  key={`${link.kind}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
                  onClick={(e) => e.stopPropagation()}
                >
                  {meta.icon}
                  <span>{link.label ?? meta.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
