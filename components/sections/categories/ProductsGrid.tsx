"use client";

import Image from "next/image";
import Link from "next/link";
import type { Phase, Project } from "@/constants/projects";

interface ProductsGridProps {
  projects: readonly Project[];
}

/**
 * Products view — card grid with explicit launch-status badges.
 *
 * Status badge maps from `project.phase`:
 *   completed     → LIVE        (violet, strong)
 *   under-review  → BETA        (gray, neutral)
 *   in-progress   → COMING SOON (gray, neutral)
 *   archived      → ARCHIVED    (gray, italic)
 *
 * `COMING SOON` on an unreleased product is honest signal, not weakness;
 * the product card lives behind the Products tab so readers opt in.
 */
const PHASE_BADGE: Record<Phase, { label: string; cls: string }> = {
  completed: {
    label: "LIVE",
    cls: "bg-violet text-white border-violet",
  },
  "under-review": {
    label: "BETA",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "in-progress": {
    label: "COMING SOON",
    cls: "bg-white text-gray-600 border-black/[0.10]",
  },
  archived: {
    label: "ARCHIVED",
    cls: "bg-gray-50 text-gray-500 border-gray-200 italic",
  },
};

export function ProductsGrid({ projects }: ProductsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No products yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {projects.map((project) => {
        const badge = PHASE_BADGE[project.phase];
        return (
          <Link
            key={project.id}
            href={`/projects/${project.slug}/`}
            className="group flex flex-col rounded-xl border border-black/[0.07] bg-white overflow-hidden transition-[border,box-shadow,transform] duration-300 hover:-translate-y-[2px] hover:border-violet/40 hover:shadow-[0_18px_40px_-22px_rgba(76,29,149,0.28)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
              {project.media.poster && (
                <Image
                  src={project.media.poster}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  unoptimized
                />
              )}

              <span
                className={`absolute top-3 right-3 inline-flex items-center rounded-md border px-2.5 py-1 text-[10.5px] font-mono font-semibold tracking-[0.12em] uppercase ${badge.cls}`}
              >
                {badge.label}
              </span>
            </div>

            <div className="flex flex-col flex-1 p-4 md:p-5">
              <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight group-hover:text-violet transition-colors">
                {project.name}
              </h3>
              <p className="mt-1.5 text-[12.5px] md:text-[13px] text-gray-600 leading-snug line-clamp-3">
                {project.tagline}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
