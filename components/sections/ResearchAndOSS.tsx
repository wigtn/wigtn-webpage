"use client";

import { PROJECTS } from "@/constants/projects";
import { ProjectRow } from "@/components/projects";

/**
 * Research & Open Source — research category + oss category, rendered as
 * compact rows. Lightweight by design so this section stays browsable even
 * as the list grows.
 */
export function ResearchAndOSS() {
  const research = PROJECTS.filter((p) => p.category === "research");
  const oss = PROJECTS.filter((p) => p.category === "oss");

  if (research.length === 0 && oss.length === 0) return null;

  return (
    <section id="research-oss" className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-section text-violet mb-2 tracking-wide">
          Research & Open Source
        </h2>
        <p className="text-lg md:text-xl text-foreground mb-10">
          Models we train, tools we open-source.
        </p>

        {research.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Research
            </h3>
            <div className="space-y-3">
              {research.map((p) => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}

        {oss.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Open Source
            </h3>
            <div className="space-y-3">
              {oss.map((p) => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
