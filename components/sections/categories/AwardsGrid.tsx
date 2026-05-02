"use client";

import { Trophy } from "lucide-react";
import type { AchievementResult, Project } from "@/constants/projects";
import { CategoryCard, type BadgeTone, type CategoryCardLink } from "./CategoryCard";

interface AwardsGridProps {
  projects: readonly Project[];
}

/* Badge label + tone derived from the achievement result. The repo's
 * existing `sectionBadge` field can override the default label so a
 * project carrying e.g. "2nd Place" still wins over the inferred form. */
const RESULT_LABEL: Partial<Record<AchievementResult, string>> = {
  winner: "Winner",
  "grand-prize": "Grand Prize",
  "second-place": "Runner-up",
  "third-place": "3rd Place",
  finalist: "Finalist",
  accepted: "Accepted",
  participated: "Participated",
};

const RESULT_TONE: Partial<Record<AchievementResult, BadgeTone>> = {
  winner: "amber",
  "grand-prize": "amber",
  "second-place": "slate",
  "third-place": "slate",
  finalist: "slate",
  accepted: "violet",
  participated: "gray",
};

function linksFor(project: Project): CategoryCardLink[] {
  const out: CategoryCardLink[] = [];
  if (project.links.github) out.push({ kind: "github", href: project.links.github });
  if (project.links.live) out.push({ kind: "live", href: project.links.live });
  if (project.links.video) out.push({ kind: "video", href: project.links.video });
  if (project.links.news) out.push({ kind: "news", href: project.links.news });
  return out;
}

export function AwardsGrid({ projects }: AwardsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No awards yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {projects.map((project) => {
        const achievement = project.achievements?.[0];
        const result = achievement?.result;
        const label =
          (project.sectionBadge &&
            project.sectionBadge !== "Participated" &&
            project.sectionBadge !== "Upcoming"
            ? project.sectionBadge
            : null) ??
          (result ? RESULT_LABEL[result] : null) ??
          null;
        const tone: BadgeTone =
          (result && RESULT_TONE[result]) ?? "gray";

        const meta = achievement
          ? [achievement.event, achievement.organizer].filter(Boolean).join(" · ")
          : null;

        return (
          <CategoryCard
            key={project.id}
            slug={project.slug}
            name={project.name}
            description={project.tagline}
            meta={meta}
            badge={label ? { label, tone } : null}
            links={linksFor(project)}
            visual={
              <Trophy
                className={`w-10 h-10 ${
                  tone === "amber" ? "text-amber-500" : "text-gray-400"
                }`}
                strokeWidth={1.5}
              />
            }
          />
        );
      })}
    </div>
  );
}
