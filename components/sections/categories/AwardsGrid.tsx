"use client";

import Image from "next/image";
import Link from "next/link";
import type {
  AchievementResult,
  Project,
} from "@/constants/projects";

interface AwardsGridProps {
  projects: readonly Project[];
}

type Medal = "gold" | "silver" | "bronze";

const MEDAL_STYLES: Record<Medal, { emoji: string; chip: string }> = {
  gold: {
    emoji: "🏆",
    chip: "border-amber-300 bg-amber-50 text-amber-800",
  },
  silver: {
    emoji: "🥈",
    chip: "border-slate-300 bg-slate-50 text-slate-700",
  },
  bronze: {
    emoji: "🥉",
    chip: "border-orange-300 bg-orange-50 text-orange-800",
  },
};

const RESULT_TO_MEDAL: Partial<Record<AchievementResult, Medal>> = {
  winner: "gold",
  "grand-prize": "gold",
  "second-place": "silver",
  "third-place": "bronze",
};

const RESULT_LABEL: Partial<Record<AchievementResult, string>> = {
  winner: "Winner",
  "grand-prize": "Grand Prize",
  "second-place": "2nd Place",
  "third-place": "3rd Place",
  finalist: "Finalist",
  accepted: "Accepted",
  participated: "Participated",
};

/**
 * Awards view — 3-col card grid (1-col mobile). Hackathon wins are
 * visual-impact-first, so cards beat a list. Medal emoji + colored chip
 * carries the result; event name + organizer carries the venue.
 */
export function AwardsGrid({ projects }: AwardsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No awards yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {projects.map((project) => {
        const achievement = project.achievements?.[0];
        const medal = achievement ? RESULT_TO_MEDAL[achievement.result] : undefined;
        const label = achievement
          ? project.sectionBadge && project.sectionBadge !== "Participated" && project.sectionBadge !== "Upcoming"
            ? project.sectionBadge
            : RESULT_LABEL[achievement.result] ?? "—"
          : "—";

        return (
          <Link
            key={project.id}
            href={`/projects/${project.slug}/`}
            className="group flex flex-col rounded-xl border border-black/[0.07] bg-white overflow-hidden transition-[border,box-shadow,transform] duration-300 hover:-translate-y-[2px] hover:border-violet/40 hover:shadow-[0_18px_40px_-22px_rgba(76,29,149,0.28)]"
          >
            {/* Hero image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
              {project.media.poster && (
                <Image
                  src={project.media.poster}
                  alt={`${project.name} — ${achievement?.event ?? "project"}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  unoptimized
                />
              )}

              {/* Medal badge top-left */}
              {achievement && (
                <span
                  className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold ${
                    medal ? MEDAL_STYLES[medal].chip : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {medal && <span aria-hidden>{MEDAL_STYLES[medal].emoji}</span>}
                  {label}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 md:p-5">
              <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight group-hover:text-violet transition-colors">
                {project.name}
              </h3>
              <p className="mt-1.5 text-[12.5px] md:text-[13px] text-gray-600 leading-snug line-clamp-2">
                {project.tagline}
              </p>
              {achievement && (
                <p className="mt-3 text-[11.5px] text-gray-500">
                  {[achievement.event, achievement.organizer]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
