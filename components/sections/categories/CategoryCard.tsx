"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
 *   1. Visual area  — fixed-height tile with the project logo / icon
 *                     centred via `object-contain`. Top-left corner
 *                     carries an optional badge that NEVER overlaps the
 *                     visual itself (it sits above the content area).
 *   2. Title        — semibold, hover→violet.
 *   3. Description  — one to two lines, gray-600.
 *   4. Meta         — venue / event / platform line, gray-500 small.
 *   5. Links row    — GitHub / Video / HF / Live / npm icons.
 *
 * Cards in a grid stretch to equal height via `h-full + flex flex-col`.
 */

export type BadgeTone =
  | "violet"
  | "amber"
  | "slate"
  | "emerald"
  | "sky"
  | "gray";

export interface CategoryCardLink {
  kind: "github" | "video" | "huggingface" | "live" | "npm";
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
  /** ReactNode rendered inside the visual area. Each tab decides what
   *  this is — a project logo `<Image>`, a Lucide icon, or text initials.
   *  Centred inside a fixed 140px-tall `bg-gray-50` tile. */
  visual: ReactNode;
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
  github: { icon: <GitHubIcon className="w-3.5 h-3.5" />, label: "GitHub" },
  video: {
    icon: <YouTubeIcon className="w-3.5 h-3.5 text-red-600" />,
    label: "Video",
  },
  huggingface: {
    icon: <HuggingFaceIcon className="w-3.5 h-3.5 rounded-full" />,
    label: "HF",
  },
  live: { icon: <ArrowUpRight className="w-3.5 h-3.5" />, label: "Live" },
  npm: {
    icon: <span className="text-[10px] font-mono">npm</span>,
    label: "npm",
  },
};

export function CategoryCard({
  slug,
  name,
  description,
  meta,
  visual,
  badge,
  links,
}: CategoryCardProps) {
  return (
    <Link
      href={`/projects/${slug}/`}
      className="group flex flex-col h-full rounded-xl border border-black/[0.07] bg-white overflow-hidden transition-[border,box-shadow,transform] duration-300 hover:-translate-y-[2px] hover:border-violet/40 hover:shadow-[0_18px_40px_-22px_rgba(76,29,149,0.28)]"
    >
      {/* Visual area — uniform 140px tile. Badge sits in the corner so it
          never overlaps the centred visual. The visual itself is whatever
          ReactNode the tab provides (logo, icon, or initials). */}
      <div className="relative h-[140px] bg-gray-50/80 flex items-center justify-center px-4">
        {badge && (
          <span
            className={`absolute top-3 left-3 inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-mono font-semibold tracking-[0.12em] uppercase ${BADGE_TONE[badge.tone]}`}
          >
            {badge.label}
          </span>
        )}

        {visual}
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-5 gap-1.5">
        <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight group-hover:text-violet transition-colors">
          {name}
        </h3>
        <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
          {description}
        </p>
        {meta && (
          <p className="text-[11.5px] text-gray-500 mt-0.5">{meta}</p>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mt-auto pt-3">
            {links.map((link) => {
              const meta = LINK_ICON[link.kind];
              return (
                <a
                  key={`${link.kind}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} — ${link.label ?? meta.label}`}
                  className="inline-flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-violet transition-colors"
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
