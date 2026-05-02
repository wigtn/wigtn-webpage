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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {projects.map((project) => (
        <CategoryCard
          key={project.id}
          slug={project.slug}
          name={project.name}
          description={project.tagline}
          meta={null}
          badge={PHASE_BADGE[project.phase]}
          links={linksFor(project)}
          visual={
            <Smartphone className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
          }
        />
      ))}
    </div>
  );
}
