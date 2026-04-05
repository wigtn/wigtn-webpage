"use client";

import { PROJECTS_BY_SECTION } from "@/constants/projects";
import type { Project } from "@/constants/projects";
import { ProjectRow } from "@/components/projects";

/**
 * Resolves the right-side meta label — the hackathon's event + organizer,
 * joined by "·". Falls back to null if a project somehow lacks an
 * achievement entry.
 */
function metaFor(project: Project): string | null {
  const achievement = project.achievements?.[0];
  if (!achievement) return null;
  return [achievement.event, achievement.organizer].filter(Boolean).join(" · ");
}

/**
 * Hackathon — same single-column vertical format as Open Source. The Tag
 * (Grand Prize / Participated / Upcoming) carries the award/status meaning
 * via text color; no background panels.
 */
export function Hackathon() {
  const items = PROJECTS_BY_SECTION.hackathon;
  if (items.length === 0) return null;

  return (
    <section id="hackathon" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-section text-violet mb-2 tracking-wide">
            Hackathon
          </h2>
          <p className="text-lg md:text-xl text-foreground">
            Where we show up — and what we bring home.
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
