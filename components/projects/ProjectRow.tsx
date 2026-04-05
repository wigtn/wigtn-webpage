"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project, SectionBadge } from "@/constants/projects";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

/**
 * Tag text colors — no backgrounds. Used by Open Source and Hackathon rows.
 * Upcoming is muted + italic to signal "not yet started".
 */
const TAG_COLOR: Record<SectionBadge, string> = {
  Research: "text-[#185FA5]",
  Paper: "text-[#185FA5]",
  Tool: "text-[#0F6E56]",
  "Grand Prize": "text-[#854F0B]",
  Participated: "text-[#5F5E5A]",
  Upcoming: "text-[#888780] italic",
};

interface ProjectRowProps {
  project: Project;
  /** Right-side meta text (e.g. "EMNLP 2026 prep" or "TRAE Seoul · ByteDance"). */
  meta?: string | null;
  /** Optional local mp4 to autoplay. If omitted, falls back to the poster image. */
  video?: string;
  /** Poster/hero image used as the visual (and as video poster if video is set). */
  image: string;
  isLast?: boolean;
}

/**
 * Single vertical project row used by both Open Source and Hackathon sections.
 * Layout: tag + meta header, name, one-line description, then a full-width
 * media block. No background color — content sits on the page with a thin
 * bottom divider between rows.
 */
export function ProjectRow({
  project,
  meta,
  video,
  image,
  isLast = false,
}: ProjectRowProps) {
  const { language } = useLanguage();
  const { processText } = useBudouX();

  const tagColor = project.sectionBadge
    ? TAG_COLOR[project.sectionBadge]
    : "text-gray-600";

  return (
    <article
      className={`py-12 md:py-16 ${
        isLast ? "" : "border-b border-black/[0.06]"
      }`}
    >
      {/* Header: tag + meta */}
      <div className="flex items-center justify-between gap-4 mb-3">
        {project.sectionBadge && (
          <span className={`text-[13px] font-medium ${tagColor}`}>
            {project.sectionBadge}
          </span>
        )}
        {meta && (
          <span className="text-[13px] text-gray-500">{meta}</span>
        )}
      </div>

      {/* Name + description */}
      <Link
        href={`/projects/${project.slug}/`}
        className="group inline-block"
      >
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-violet transition-colors">
          {project.name}
        </h3>
      </Link>
      <p className="text-base md:text-lg text-gray-600 mt-2 mb-6 md:mb-8">
        {processText(project.tagline[language])}
      </p>

      {/* Media */}
      <Link
        href={`/projects/${project.slug}/`}
        aria-label={`${project.name} — learn more`}
        className="block rounded-xl overflow-hidden"
      >
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            aria-label={`${project.name} demo`}
            className="w-full h-auto block"
          />
        ) : (
          <Image
            src={image}
            alt={`${project.name} preview`}
            width={1600}
            height={900}
            className="w-full h-auto block"
            unoptimized
          />
        )}
      </Link>
    </article>
  );
}
