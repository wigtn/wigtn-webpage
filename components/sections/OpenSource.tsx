"use client";

import { PROJECTS_BY_SECTION } from "@/constants/projects";
import type { Project } from "@/constants/projects";
import { ProjectRow } from "@/components/projects";

/**
 * Resolves the right-side meta label for each Open Source row. Prefers an
 * explicit publication string (e.g. "EMNLP 2026 prep"); otherwise falls back
 * to "Active" for in-progress tools so every row has something on the right.
 */
function metaFor(project: Project): string | null {
  if (project.publication) return project.publication;
  if (project.phase === "in-progress") return "Active";
  return null;
}

/**
 * Open Source — single-column vertical list of research, papers, and tools.
 * Every row has a media block (video or image). No card backgrounds; rows
 * are separated by a thin divider.
 */
export function OpenSource() {
  const items = PROJECTS_BY_SECTION["open-source"];
  if (items.length === 0) return null;

  return (
    <section id="open-source" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-section text-violet mb-2 tracking-wide">
            Open Source
          </h2>
          <p className="text-lg md:text-xl text-foreground">
            Models we train, tools we build, papers we publish.
          </p>
        </div>

        <div>
          {items.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              meta={metaFor(project)}
              image={project.media.poster}
              video={
                project.media.heroVideoType === "local"
                  ? project.media.heroVideo
                  : undefined
              }
              isLast={i === items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
