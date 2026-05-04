"use client";

import { Smartphone } from "lucide-react";
import type { Phase, Project } from "@/constants/projects";
import { CategoryCard, type BadgeTone, type CategoryCardLink } from "./CategoryCard";

interface ProductsGridProps {
  projects: readonly Project[];
}

const PHASE_BADGE: Record<Phase, { label: string; tone: BadgeTone }> = {
  completed: { label: "Live", tone: "emerald" },
  "under-review": { label: "Beta", tone: "amber" },
  "in-progress": { label: "Coming Soon", tone: "gray" },
  archived: { label: "Archived", tone: "gray" },
};

/* Per-phase gradient backgrounds — the badge tone telegraphs launch
 * status, the gradient reinforces it. Saturation kept low. */
const PHASE_GRADIENT: Record<Phase, string> = {
  completed: "bg-gradient-to-br from-emerald-50 to-emerald-100",
  "under-review": "bg-gradient-to-br from-amber-50 to-amber-100",
  "in-progress": "bg-gradient-to-br from-gray-50 to-gray-100",
  archived: "bg-gradient-to-br from-gray-50 to-gray-100",
};

const PHASE_ICON_TONE: Record<Phase, string> = {
  completed: "text-emerald-500",
  "under-review": "text-amber-500",
  "in-progress": "text-gray-400",
  archived: "text-gray-400",
};

function linksFor(project: Project): CategoryCardLink[] {
  const out: CategoryCardLink[] = [];
  if (project.links.github) out.push({ kind: "github", href: project.links.github });
  if (project.links.live) out.push({ kind: "live", href: project.links.live });
  if (project.links.video) out.push({ kind: "video", href: project.links.video });
  return out;
}

export function ProductsGrid({ projects }: ProductsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No products yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
      {projects.map((project) => (
        <CategoryCard
          key={project.id}
          slug={project.slug}
          name={project.name}
          description={project.tagline}
          meta={null}
          badge={PHASE_BADGE[project.phase]}
          links={linksFor(project)}
          visualClassName={PHASE_GRADIENT[project.phase]}
          visual={
            <Smartphone
              className={`w-16 h-16 ${PHASE_ICON_TONE[project.phase]}`}
              strokeWidth={1.25}
            />
          }
        />
      ))}
    </div>
  );
}
