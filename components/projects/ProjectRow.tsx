"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { PhaseBadge } from "./PhaseBadge";

interface ProjectRowProps {
  project: Project;
}

/**
 * Compact row used in NowStrip and Research & OSS sections.
 * 64px thumbnail + name + tagline + phase badge, all as a single clickable row.
 */
export function ProjectRow({ project }: ProjectRowProps) {
  const { language } = useLanguage();
  const { processText } = useBudouX();

  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-violet/40 hover:shadow-sm transition-all"
    >
      {/* 64x64 square thumb */}
      <div
        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        {project.media.poster && (
          <Image
            src={project.media.poster}
            alt={project.name}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-base font-semibold text-foreground group-hover:text-violet transition-colors truncate">
            {project.name}
          </h4>
          {project.publication && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full text-red-700 bg-red-50 border border-red-200 whitespace-nowrap">
              {project.publication}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 truncate">
          {processText(project.tagline[language])}
        </p>
      </div>

      {/* Right: phase + arrow */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <PhaseBadge project={project} />
        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-violet transition-colors" />
      </div>
    </Link>
  );
}
