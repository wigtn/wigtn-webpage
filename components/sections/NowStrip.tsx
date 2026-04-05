"use client";

import { PROJECTS } from "@/constants/projects";
import { ProjectRow } from "@/components/projects";

/**
 * "Right now" strip — auto-collects every project currently in-progress or
 * under-review, regardless of category. Surfaces living work at a glance.
 */
export function NowStrip() {
  const active = PROJECTS.filter(
    (p) => p.phase === "in-progress" || p.phase === "under-review",
  );

  if (active.length === 0) return null;

  return (
    <section id="now" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-section text-violet tracking-wide">Right now</h2>
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            {active.length} active
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {active.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
