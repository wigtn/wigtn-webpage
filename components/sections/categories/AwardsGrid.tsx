"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import type { AchievementResult, Project } from "@/constants/projects";
import { CategoryCard, type BadgeTone, type CategoryCardLink } from "./CategoryCard";

interface AwardsGridProps {
  projects: readonly Project[];
}

/* ─────────────── Display order ───────────────
 *
 * Sorted by event date (most recent first), not by prize tier. Hard-
 * coded slug map keeps the data file (`projects.ts`) untouched while
 * still letting Awards control its own row order independently. If a
 * future hackathon project lands without an entry in this map, it
 * falls to the end. */
const ORDER: Record<string, number> = {
  "wigtn-flake": 0, // Snowflake AI & Data Hackathon Korea 2026 — most recent
  timelens: 1, // Google Gemini Live Agent Challenge
  wigent: 2, // ByteDance Build with TRAE Seoul (March 2026)
};

/* ─────────────── Badge label + tier-tone ───────────────
 *
 * Badge label derived from achievement result with project.sectionBadge
 * as override. Tier-tone keys the visual style: amber for the win
 * tier, slate for runner-up tier, ghost-gray for participation. */
const RESULT_LABEL: Partial<Record<AchievementResult, string>> = {
  winner: "Winner",
  "grand-prize": "Grand Prize",
  "second-place": "2nd Place",
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

/* Footer-badge tier styles — three visual weights so a glance reads
 * the medal level. Solid-amber for the strongest signal, soft-slate
 * for the middle, ghost outline for participation. */
const FOOTER_BADGE_CLASS: Record<BadgeTone, string> = {
  amber:
    "bg-amber-100 text-amber-800 border border-amber-200 font-semibold",
  slate:
    "bg-slate-100 text-slate-700 border border-slate-200 font-semibold",
  gray: "text-gray-500 border border-gray-200 font-medium",
  violet: "bg-violet/[0.08] text-violet border border-violet/30 font-semibold",
  emerald:
    "bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold",
  sky: "bg-sky-100 text-sky-800 border border-sky-200 font-semibold",
};

/* Tier-tinted gradient — only used as the wrapper fallback when a
 * project has no poster image. With a poster the image full-bleeds
 * and the gradient is hidden behind it. */
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

  // Stable sort — consistent rendering order regardless of array order
  // in the underlying data file.
  const ordered = [...projects].sort(
    (a, b) => (ORDER[a.slug] ?? 99) - (ORDER[b.slug] ?? 99),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
      {ordered.map((project) => {
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
            // Top-left visual-area badge intentionally null — the medal
            // is now a footer badge so it doesn't overlay the image.
            badge={null}
            links={linksFor(project)}
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
            awardBadge={
              label ? (
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] tracking-[0.08em] uppercase ${FOOTER_BADGE_CLASS[tone]}`}
                >
                  {label}
                </span>
              ) : null
            }
          />
        );
      })}
    </div>
  );
}
