"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type {
  AchievementResult,
  Project,
  SectionBadge,
} from "@/constants/projects";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon, YouTubeIcon, HuggingFaceIcon } from "@/components/ui/icons";

/**
 * Tag text colors — no backgrounds. Used by the Open Source variant for the
 * "Research / Paper / Tool" sub-category label under the title.
 */
const TAG_COLOR: Record<SectionBadge, string> = {
  Research: "text-[#185FA5]",
  Paper: "text-[#185FA5]",
  Tool: "text-[#0F6E56]",
  "Grand Prize": "text-[#854F0B]",
  "2nd Place": "text-[#5F6470]",
  Participated: "text-[#5F5E5A]",
  Upcoming: "text-[#888780] italic",
};

type Medal = "gold" | "silver" | "bronze";

/**
 * Award chip (trophy + label) shown to the right of the title for hackathon
 * rows. Only rendered when the project has an awarded achievement.
 */
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

/**
 * Resolves the medal (or lack thereof) and human-readable label for a
 * hackathon project's primary achievement. Returns `null` when the project
 * was not awarded (participated / upcoming / no achievements).
 */
function getAwardInfo(
  project: Project,
): { medal: Medal | null; label: string } | null {
  const achievement = project.achievements?.[0];
  if (!achievement) return null;

  const result: AchievementResult = achievement.result;

  const medal: Medal | null =
    result === "winner" || result === "grand-prize"
      ? "gold"
      : result === "second-place"
        ? "silver"
        : result === "third-place"
          ? "bronze"
          : null;

  // Only awarded results get a tag. "participated" / "upcoming" have no tag.
  const labelByResult: Partial<Record<AchievementResult, string>> = {
    winner: "Winner",
    "grand-prize": "Grand Prize",
    "second-place": "2nd Place",
    "third-place": "3rd Place",
    finalist: "Finalist",
    accepted: "Accepted",
  };

  const defaultLabel = labelByResult[result];
  if (!defaultLabel) return null;

  // Prefer the project-level badge text (e.g. "Grand Prize") when present so
  // existing copy stays authoritative.
  const label =
    project.sectionBadge && project.sectionBadge !== "Participated" && project.sectionBadge !== "Upcoming"
      ? project.sectionBadge
      : defaultLabel;

  return { medal, label };
}

function AwardBadge({
  medal,
  label,
}: {
  medal: Medal | null;
  label: string;
}) {
  const style = medal
    ? MEDAL_STYLES[medal]
    : { emoji: null as string | null, chip: "border-gray-200 bg-gray-50 text-gray-700" };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border ${style.chip}`}
    >
      {style.emoji && (
        <span className="text-sm leading-none">{style.emoji}</span>
      )}
      {label}
    </span>
  );
}

/* ─────────────── Box action links ─────────────── */

interface BoxLink {
  key: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const LINK_DEFS = {
  github: { icon: <GitHubIcon className="w-4 h-4" />, label: "GitHub" },
  huggingface: { icon: <HuggingFaceIcon className="w-4 h-4 rounded-full" />, label: "HuggingFace" },
  video: { icon: <YouTubeIcon className="w-4 h-4 text-red-600" />, label: "YouTube" },
};

type LinkKey = keyof typeof LINK_DEFS;

function buildBoxLinks(project: Project, order: LinkKey[]): BoxLink[] {
  const links: BoxLink[] = [];
  for (const key of order) {
    const href = project.links[key];
    if (!href) continue;
    links.push({ key, href, ...LINK_DEFS[key] });
  }
  return links;
}

/**
 * Priority order per list variant. Controls which link sits leftmost in the
 * box row and signals the project's primary artifact.
 *   • models   — HuggingFace weights are the headline; GitHub is secondary.
 *   • papers   — the paper/venue isn't linked directly yet, so Live demo or
 *                YouTube walkthrough leads; GitHub is last.
 *   • open-source — code-first (GitHub), then Live (npm / deployed site).
 */
const LINK_ORDER: Record<"models" | "papers" | "open-source" | "hackathon", LinkKey[]> = {
  models: ["github", "video", "huggingface"],
  papers: ["github", "video", "huggingface"],
  "open-source": ["github", "video", "huggingface"],
  hackathon: ["github", "video", "huggingface"],
};

function BoxLinkButton({ link }: { link: BoxLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200/80 bg-white text-[13px] font-medium text-gray-600 shadow-sm hover:shadow-md hover:border-violet/30 hover:text-violet transition-all duration-200"
    >
      <span className="flex-shrink-0">{link.icon}</span>
      {link.label}
    </a>
  );
}

/* ─────────────── ProjectRow ─────────────── */

type Variant = "models" | "papers" | "open-source" | "hackathon";

const BOX_LINK_VARIANTS = new Set<Variant>(["models", "papers", "open-source", "hackathon"]);

interface ProjectRowProps {
  project: Project;
  /** Zero-based position within its section — rendered as a large "01/02/…" prefix. */
  index: number;
  /** Controls which actions and secondary UI render. */
  variant: Variant;
  /** Right-side meta text (e.g. "EMNLP 2026 prep" or "TRAE Seoul · ByteDance"). */
  meta?: string | null;
  isLast?: boolean;
}

/**
 * Editorial project row used by every list-style section (Featured Work on
 * the homepage and the /projects filter page).
 *
 * Layout — 12-col grid on desktop, stacked on mobile:
 *   [1 col]  large light-gray index number (01, 02, …)
 *   [7 col]  title (+ optional award badge), tagline, tag/meta, box actions
 *   [4 col]  4:3 thumbnail with hover scale
 *
 * The box action row in the text column is pushed to the bottom via `mt-auto`
 * so it visually aligns with the bottom edge of the thumbnail.
 *
 * Variant differences:
 *   • "models"      — boxes ordered 🤗 HuggingFace → GitHub → Live → YouTube.
 *   • "papers"      — boxes ordered Live → YouTube → HuggingFace → GitHub.
 *   • "open-source" — boxes ordered GitHub → Live → HuggingFace → YouTube.
 *   • "hackathon"   — only a Details box; no source-code link. An AwardBadge
 *                     (🏆 gold / 🥈 silver / 🥉 bronze / label-only) renders
 *                     next to the title when the project has an awarded
 *                     achievement.
 *
 * If the project's media has a local heroVideo, the thumbnail is a `<video>`
 * that plays on hover and rewinds on leave. YouTube heroVideos are not
 * hover-played (too heavy for a list view) — they surface via the YouTube
 * box link or the Details page.
 */
export function ProjectRow({
  project,
  index,
  variant,
  meta,
  isLast = false,
}: ProjectRowProps) {
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
  const detailHref = `/projects/${project.slug}/`;

  const boxLinks = BOX_LINK_VARIANTS.has(variant)
    ? buildBoxLinks(project, LINK_ORDER[variant as keyof typeof LINK_ORDER])
    : [];

  const awardInfo = variant === "hackathon" ? getAwardInfo(project) : null;

  return (
    <article
      className={`group py-5 md:py-7 ${
        isLast ? "" : "border-b border-black/[0.08]"
      }`}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        {/* Index number — editorial prefix */}
        <div className="col-span-12 md:col-span-1 order-1">
          <span className="block text-2xl md:text-3xl font-light text-gray-300 tabular-nums leading-none">
            {indexLabel}
          </span>
        </div>

        {/* Text block */}
        <div className="col-span-12 md:col-span-8 min-w-0 order-2 flex flex-col">
          <div>
            {/* Homepage status badge — sits ABOVE the title to give an
                executive scanner the credential before they read the name.
                Only renders when the project explicitly opts in via
                `homepageBadge`, so the /projects index pages stay clean. */}
            {project.homepageBadge && (
              <div className="mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet/[0.06] px-2.5 py-1 text-[11px] font-mono font-semibold tracking-[0.12em] uppercase text-violet">
                  {project.homepageBadge}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <Link href={detailHref} className="inline-block">
                <h3 className="text-2xl md:text-[2rem] font-semibold text-foreground group-hover:text-violet transition-colors leading-tight tracking-tight">
                  {project.name}
                </h3>
              </Link>
              {awardInfo && (
                <AwardBadge medal={awardInfo.medal} label={awardInfo.label} />
              )}
            </div>

            <p className="text-base md:text-lg text-gray-600 mt-3 leading-relaxed max-w-xl">
              {processText(project.tagline)}
            </p>

            {/* Metric pills — load-bearing numbers split out of the prose so
                they read at a glance. Only present on featured homepage rows
                that opt in via `homepageMetrics`. */}
            {project.homepageMetrics && project.homepageMetrics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.homepageMetrics.map((metric) => (
                  <span
                    key={metric}
                    className="inline-flex items-center rounded-md border border-black/[0.08] bg-white px-2 py-0.5 text-[11.5px] font-mono text-gray-700"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {/* Tag · meta — shown for every list variant except Hackathon,
                which uses AwardBadge next to the title + meta-only line. */}
            {variant !== "hackathon" && (project.sectionBadge || meta) && (
              <div className="mt-3 flex items-center flex-wrap gap-x-2 text-[13px]">
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
            {variant === "hackathon" && meta && (
              <div className="mt-3 text-[13px] text-gray-500">{meta}</div>
            )}
          </div>

          {/* Box actions — pushed to the bottom so they align with the
              thumbnail's bottom edge on desktop. On mobile they just follow
              the text naturally. */}
          <div className="mt-4 md:mt-auto md:pt-4 flex flex-wrap gap-2">
            {boxLinks.map((link) => (
              <BoxLinkButton key={link.key} link={link} />
            ))}
          </div>
        </div>

        {/* Thumbnail */}
        <Link
          href={detailHref}
          aria-label={`${project.name} — learn more`}
          className="col-span-12 md:col-span-3 order-3 block w-full overflow-hidden rounded-xl border border-black/[0.06] bg-gray-50 self-start"
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
