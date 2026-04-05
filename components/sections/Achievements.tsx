"use client";

import Link from "next/link";
import { Trophy, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import type { Project, Achievement } from "@/constants/projects";

interface AchievementEntry {
  project: Project;
  achievement: Achievement;
}

/**
 * Achievements section — auto-collects every project that has at least one
 * entry in its `achievements` array (hackathon wins, paper acceptances, etc.)
 * and flattens them into a trophy-style strip.
 */
export function Achievements() {
  const entries: AchievementEntry[] = PROJECTS.flatMap((project) =>
    (project.achievements ?? []).map((achievement) => ({ project, achievement })),
  );

  if (entries.length === 0) return null;

  return (
    <section id="achievements" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-section text-violet mb-2 tracking-wide">
          Achievements
        </h2>
        <p className="text-lg md:text-xl text-foreground mb-8">
          Where we&apos;ve shown up and what we&apos;ve brought home.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(({ project, achievement }) => (
            <Link
              key={`${project.id}-${achievement.event}`}
              href={`/projects/${project.slug}/`}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    {achievement.result}
                    {achievement.note ? ` · ${achievement.note}` : ""}
                  </span>
                </div>
                <p className="text-base font-semibold text-foreground truncate">
                  {achievement.event}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {project.name}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
