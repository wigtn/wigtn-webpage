"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { getYouTubeId } from "@/lib/utils/video";
import { PhaseBadge } from "./PhaseBadge";

interface ProjectHeroCardProps {
  project: Project;
  /** If true, the hero video (youtube iframe or local mp4) autoplays as background. */
  autoplayVideo?: boolean;
}

const TEXT_SHADOW = {
  textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)",
};

/**
 * Full-width hero card used for featured projects at the top of a section.
 * At most one per section should autoplay video to protect perf/attention.
 */
export function ProjectHeroCard({
  project,
  autoplayVideo = true,
}: ProjectHeroCardProps) {
  const { language } = useLanguage();
  const { processText } = useBudouX();

  const { media } = project;
  const youtubeId =
    autoplayVideo && media.heroVideo && media.heroVideoType === "youtube"
      ? getYouTubeId(media.heroVideo)
      : null;

  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group relative block w-full rounded-2xl overflow-hidden"
      style={{ height: "clamp(360px, 50vh, 520px)" }}
    >
      {/* Background: youtube > local video > poster > gradient */}
      {youtubeId ? (
        <div className="absolute inset-0 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "177.78vh",
              height: "100vh",
              minWidth: "100%",
              minHeight: "100%",
            }}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
      ) : autoplayVideo && media.heroVideo && media.heroVideoType === "local" ? (
        <video
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : media.poster ? (
        <Image
          src={media.poster}
          alt={project.name}
          fill
          className="object-cover"
          unoptimized
          priority
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        <div className="flex items-start justify-end">
          <PhaseBadge project={project} variant="light" />
        </div>

        <div className="max-w-2xl" style={TEXT_SHADOW}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {project.name}
          </h3>
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
            {processText(project.tagline[language])}
          </p>

          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium group-hover:bg-white/20 transition-colors">
            View details
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
