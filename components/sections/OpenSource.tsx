"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS_BY_SECTION } from "@/constants/projects";
import type { Project, SectionBadge } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

const BADGE_STYLE: Partial<Record<SectionBadge, string>> = {
  Research: "bg-blue-50 text-blue-700 border-blue-200",
  Paper: "bg-red-50 text-red-700 border-red-200",
  Tool: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

/**
 * Open Source — 2×2 grid (1 col on mobile) of research models, papers, and
 * public tooling. Each card leads to the project's detail page, and the
 * sub-category badge colors the card.
 */
export function OpenSource() {
  const items = PROJECTS_BY_SECTION["open-source"];
  if (items.length === 0) return null;

  return (
    <section id="open-source" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-section text-violet mb-2 tracking-wide">
            Open Source
          </h2>
          <p className="text-lg md:text-xl text-foreground">
            Models we train, tools we build, papers we publish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {items.map((item) => (
            <OSSCard key={item.id} project={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OSSCard({ project }: { project: Project }) {
  const { language } = useLanguage();
  const { processText } = useBudouX();
  const badgeStyle =
    (project.sectionBadge && BADGE_STYLE[project.sectionBadge]) ??
    "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group relative flex flex-col p-6 md:p-7 rounded-2xl bg-white border border-gray-200 hover:border-violet/40 hover:shadow-md transition-all"
    >
      {/* Top row: sub-badge + conference note */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {project.sectionBadge && (
          <span
            className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${badgeStyle}`}
          >
            {project.sectionBadge}
          </span>
        )}
        {project.publication && (
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            {project.publication}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-violet transition-colors mb-2">
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-1">
        {processText(project.tagline[language])}
      </p>

      {/* Footer arrow */}
      <div className="flex items-center justify-end mt-4 text-gray-400 group-hover:text-violet transition-colors">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
