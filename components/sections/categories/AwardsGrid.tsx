"use client";

import Image from "next/image";
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

/* Tier-tinted gradient — used as the wrapper fallback when a project
 * has no poster image. With a poster the image full-bleeds and the
 * gradient is hidden behind it. */
const TONE_GRADIENT: Record<BadgeTone, string> = {
  amber: "bg-gradient-to-br from-amber-50 to-amber-100",
  slate: "bg-gradient-to-br from-slate-50 to-slate-100",
  gray: "bg-gradient-to-br from-gray-50 to-gray-100",
  violet: "bg-gradient-to-br from-violet/[0.04] to-violet/[0.10]",
  emerald: "bg-gradient-to-br from-emerald-50 to-emerald-100",
  sky: "bg-gradient-to-br from-sky-50 to-sky-100",
};

const TROPHY_TONE: Record<BadgeTone, string> = {
  amber: "text-amber-500",
  slate: "text-slate-400",
  gray: "text-gray-400",
  violet: "text-violet",
  emerald: "text-emerald-500",
  sky: "text-sky-500",
};

function linksFor(project: Project): CategoryCardLink[] {
  // Awards cards intentionally drop the `live` link — competition entries
  // don't need to advertise a live URL alongside the medal.
  const out: CategoryCardLink[] = [];
  if (project.links.github) out.push({ kind: "github", href: project.links.github });
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
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

        const hasPoster = Boolean(project.media.poster);

        return (
          <CategoryCard
            key={project.id}
            slug={project.slug}
            name={project.name}
            description={project.tagline}
            meta={meta}
            badge={label ? { label, tone } : null}
            links={linksFor(project)}
            // Image cards use `bg-gray-50` so any letter-boxed gap reads
            // as neutral; iconic fallbacks reuse the tier gradient.
            visualClassName={hasPoster ? "bg-gray-50" : TONE_GRADIENT[tone]}
            visual={
              hasPoster ? (
                <Image
                  src={project.media.poster}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center"
                  unoptimized
                />
              ) : (
                <Trophy
                  className={`w-20 h-20 ${TROPHY_TONE[tone]}`}
                  strokeWidth={1.25}
                />
              )
            }
          />
        );
      })}
    </div>
  );
}
