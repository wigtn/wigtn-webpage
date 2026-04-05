"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Play,
} from "lucide-react";
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
  /** Zero-based position within its section — rendered as a large "01/02/…" prefix. */
  index: number;
  /** Right-side meta text (e.g. "EMNLP 2026 prep" or "TRAE Seoul · ByteDance"). */
  meta?: string | null;
  isLast?: boolean;
}

/**
 * Editorial project row used by both Open Source and Hackathon sections.
 *
 * Layout — kakaostyle-inspired 12-col grid on desktop:
 *   [1 col]  large light-gray index number (01, 02, …)
 *   [7 col]  title, tagline, tag · meta, action links
 *   [4 col]  4:3 thumbnail with hover scale
 * On mobile the three blocks stack vertically.
 *
 * If the project's media has a local heroVideo, the thumbnail is a `<video>`
 * that plays on hover and rewinds on leave. YouTube heroVideos are not
 * hover-played (too heavy for a list view) — they surface via the "Demo"
 * action link instead.
 */
export function ProjectRow({
  project,
  index,
  meta,
  isLast = false,
}: ProjectRowProps) {
  const { language } = useLanguage();
  const { processText } = useBudouX();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const tagColor = project.sectionBadge
    ? TAG_COLOR[project.sectionBadge]
    : "text-gray-600";

  const hasLocalVideo =
    project.media.heroVideoType === "local" && !!project.media.heroVideo;

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    // play() returns a promise that can reject if we leave before metadata
    // loads; swallow it so the console stays clean.
    v.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group py-10 md:py-14 ${
        isLast ? "" : "border-b border-black/[0.08]"
      }`}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        {/* Index number — editorial prefix */}
        <div className="col-span-12 md:col-span-1 order-1">
          <span className="block text-2xl md:text-3xl font-light text-gray-300 tabular-nums leading-none">
            {indexLabel}
          </span>
        </div>

        {/* Text block */}
        <div className="col-span-12 md:col-span-7 min-w-0 order-2">
          <Link
            href={`/projects/${project.slug}/`}
            className="inline-block"
          >
            <h3 className="text-2xl md:text-[2rem] font-semibold text-foreground group-hover:text-violet transition-colors leading-tight tracking-tight">
              {project.name}
            </h3>
          </Link>

          <p className="text-base md:text-lg text-gray-600 mt-3 leading-relaxed max-w-xl">
            {processText(project.tagline[language])}
          </p>

          {/* Tag · meta */}
          {(project.sectionBadge || meta) && (
            <div className="mt-4 flex items-center flex-wrap gap-x-2 text-[13px]">
              {project.sectionBadge && (
                <span className={`font-medium ${tagColor}`}>
                  {project.sectionBadge}
                </span>
              )}
              {project.sectionBadge && meta && (
                <span className="text-gray-300">·</span>
              )}
              {meta && <span className="text-gray-500">{meta}</span>}
            </div>
          )}

          {/* Action links */}
          <ActionLinks project={project} />
        </div>

        {/* Thumbnail */}
        <Link
          href={`/projects/${project.slug}/`}
          aria-label={`${project.name} — learn more`}
          className="col-span-12 md:col-span-4 order-3 block w-full overflow-hidden rounded-xl border border-black/[0.06] bg-gray-50"
          onMouseEnter={hasLocalVideo ? handleMouseEnter : undefined}
          onMouseLeave={hasLocalVideo ? handleMouseLeave : undefined}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {hasLocalVideo ? (
              <video
                ref={videoRef}
                src={project.media.heroVideo}
                poster={project.media.poster}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${project.name} demo`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <Image
                src={project.media.poster}
                alt={`${project.name} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                unoptimized
              />
            )}
          </div>
        </Link>
      </div>
    </article>
  );
}

/* ─────────────── Action links ─────────────── */

interface ActionLinkItem {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external: boolean;
}

/**
 * Renders a small horizontal row of clickable chips derived from
 * `project.links`, always ending in a "Details" link to the project's
 * detail page. This guarantees every row has at least one action, even
 * for projects with no external links (e.g. DataPulse).
 */
function ActionLinks({ project }: { project: Project }) {
  const items: ActionLinkItem[] = [];

  if (project.links.github) {
    items.push({
      key: "github",
      label: "Code",
      href: project.links.github,
      icon: Github,
      external: true,
    });
  }
  if (project.links.live) {
    items.push({
      key: "live",
      label: "Live",
      href: project.links.live,
      icon: ExternalLink,
      external: true,
    });
  }
  if (project.links.video) {
    items.push({
      key: "video",
      label: "Demo",
      href: project.links.video,
      icon: Play,
      external: true,
    });
  }
  if (project.links.huggingface) {
    items.push({
      key: "huggingface",
      label: "HF",
      href: project.links.huggingface,
      icon: ExternalLink,
      external: true,
    });
  }
  items.push({
    key: "details",
    label: "Details",
    href: `/projects/${project.slug}/`,
    icon: ArrowRight,
    external: false,
  });

  return (
    <div className="mt-6 flex items-center flex-wrap gap-x-5 gap-y-2">
      {items.map(({ key, label, href, icon: Icon, external }) => {
        const className =
          "inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-violet transition-colors";
        return external ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </a>
        ) : (
          <Link key={key} href={href} className={className}>
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
