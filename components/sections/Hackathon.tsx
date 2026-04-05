"use client";

import Link from "next/link";
import { Trophy, Sparkles, Clock } from "lucide-react";
import { PROJECTS_BY_SECTION } from "@/constants/projects";
import type { Project, Achievement, SectionBadge } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

interface BadgeStyle {
  container: string;
  pill: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BADGE_STYLES: Partial<Record<SectionBadge, BadgeStyle>> = {
  "Grand Prize": {
    container:
      "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 hover:border-amber-400 hover:shadow-amber-100",
    pill: "bg-amber-500 text-white",
    icon: Trophy,
  },
  Participated: {
    container: "bg-white border-gray-200 hover:border-gray-300",
    pill: "bg-gray-100 text-gray-700",
    icon: Sparkles,
  },
  Upcoming: {
    container: "bg-white border-2 border-dashed border-gray-300 hover:border-violet/60",
    pill: "bg-violet/10 text-violet",
    icon: Clock,
  },
};

const DEFAULT_STYLE: BadgeStyle = {
  container: "bg-white border-gray-200",
  pill: "bg-gray-100 text-gray-700",
  icon: Sparkles,
};

/**
 * Hackathon — 3-column grid (1 col on mobile) of competition entries.
 * Each card is styled by its `sectionBadge`: Grand Prize gets a gold
 * gradient, Participated is neutral, Upcoming uses a dashed border.
 */
export function Hackathon() {
  const items = PROJECTS_BY_SECTION.hackathon;
  if (items.length === 0) return null;

  return (
    <section id="hackathon" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-section text-violet mb-2 tracking-wide">
            Hackathon
          </h2>
          <p className="text-lg md:text-xl text-foreground">
            Where we show up — and what we bring home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((item) => (
            <HackathonCard key={item.id} project={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HackathonCard({ project }: { project: Project }) {
  const { language } = useLanguage();
  const { processText } = useBudouX();

  const style =
    (project.sectionBadge && BADGE_STYLES[project.sectionBadge]) ?? DEFAULT_STYLE;
  const Icon = style.icon;
  const achievement: Achievement | undefined = project.achievements?.[0];

  const eventLine = achievement
    ? [achievement.event, achievement.organizer].filter(Boolean).join(" · ")
    : null;

  return (
    <Link
      href={`/projects/${project.slug}/`}
      className={`group flex flex-col p-6 md:p-7 rounded-2xl transition-all ${style.container}`}
    >
      {/* Badge pill */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full ${style.pill}`}
        >
          <Icon className="w-3 h-3" />
          {project.sectionBadge}
        </span>
      </div>

      {/* Name + description */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-violet transition-colors mb-2">
        {project.name}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
        {processText(project.tagline[language])}
      </p>

      {/* Event line */}
      {eventLine && (
        <div className="pt-4 border-t border-gray-200/60 text-xs font-medium text-gray-500">
          {eventLine}
        </div>
      )}
    </Link>
  );
}
