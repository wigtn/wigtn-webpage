"use client";

import type { Project } from "@/constants/projects";
import { PHASE_LABEL } from "@/constants/projects";

interface PhaseBadgeProps {
  project: Project;
  /** "light" for dark backgrounds (card overlays), "dark" for light backgrounds. */
  variant?: "light" | "dark";
}

const PHASE_DOT: Record<string, string> = {
  "in-progress": "bg-emerald-400",
  "under-review": "bg-amber-400",
  completed: "bg-violet",
  archived: "bg-gray-400",
};

export function PhaseBadge({ project, variant = "dark" }: PhaseBadgeProps) {
  const label = PHASE_LABEL[project.category][project.phase];
  const pulse = project.phase === "in-progress" ? "animate-pulse" : "";
  const textCls =
    variant === "light" ? "text-white/80" : "text-gray-600";

  // Optional D-day for under-review items with a deadline
  let suffix: string | null = null;
  if (project.phase === "under-review" && project.timeline.deadline) {
    const d = new Date(project.timeline.deadline);
    if (!Number.isNaN(d.getTime())) {
      const diff = Math.ceil(
        (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      );
      if (diff > 0) suffix = `D-${diff}`;
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${textCls}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${PHASE_DOT[project.phase]} ${pulse}`}
      />
      {label}
      {suffix && (
        <span className="ml-1 opacity-70 font-mono">· {suffix}</span>
      )}
    </span>
  );
}
