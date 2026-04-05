"use client";

import { PROJECTS } from "@/constants/projects";
import { ProjectCard } from "@/components/projects";

/**
 * In Development — product-category projects in the `in-progress` phase.
 * Standard card grid only (no hero); communicates work-in-flight without
 * competing with Live Products visually.
 */
export function InDevelopment() {
  const items = PROJECTS.filter(
    (p) => p.category === "product" && p.phase === "in-progress",
  );

  if (items.length === 0) return null;

  return (
    <section id="in-development" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-section text-violet mb-2 tracking-wide">
          In Development
        </h2>
        <p className="text-lg md:text-xl text-foreground mb-8">
          Currently being built.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
