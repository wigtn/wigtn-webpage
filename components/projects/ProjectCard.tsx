"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Project } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { PhaseBadge } from "./PhaseBadge";

interface ProjectCardProps {
  project: Project;
}

/**
 * Standard 16:10 thumbnail card.
 *
 * Idle state: poster image only.
 * Hover state (desktop): a short `hoverClip` video fades in over the poster
 * and loops while the cursor is on the card; it pauses and rewinds on leave.
 * Mobile: no hover; poster only. Whole card links to /projects/[slug]/.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  const { processText } = useBudouX();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [clipReady, setClipReady] = useState(false);

  const { media } = project;
  const hasClip = !!media.hoverClip;

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      /* autoplay blocked — leave poster visible */
    });
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setClipReady(false);
  };

  return (
    <Link
      href={`/projects/${project.slug}/`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group block rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-violet/40 hover:shadow-lg transition-all"
    >
      {/* 16:10 media area */}
      <div
        className={`relative w-full bg-gradient-to-br ${project.gradient}`}
        style={{ aspectRatio: "16 / 10" }}
      >
        <Image
          src={media.poster}
          alt={project.name}
          fill
          className={`object-cover transition-opacity duration-300 ${
            clipReady ? "opacity-0" : "opacity-100"
          }`}
          unoptimized
        />

        {hasClip && (
          <video
            ref={videoRef}
            src={media.hoverClip}
            muted
            loop
            playsInline
            preload="metadata"
            onPlaying={() => setClipReady(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}

        {/* Play icon hint when a video exists (hoverClip or heroVideo) */}
        {(hasClip || media.heroVideo) && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/70 transition-colors">
            <Play className="w-3.5 h-3.5 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-violet transition-colors">
            {project.name}
          </h3>
          <PhaseBadge project={project} />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {processText(project.tagline[language])}
        </p>

        {project.publication && (
          <div className="mt-3 inline-flex items-center px-2.5 py-1 text-[10px] font-medium rounded-full text-red-700 bg-red-50 border border-red-200">
            {project.publication}
          </div>
        )}
      </div>
    </Link>
  );
}
