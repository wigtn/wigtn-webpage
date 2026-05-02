"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PROJECTS,
  SECTION_LABEL,
  PHASE_LABEL,
  type Project,
  type Section,
} from "@/constants/projects";
import { useBudouX } from "@/lib/hooks/useBudouX";

/**
 * Filter keys accepted via `?category=` query param.
 *
 * `research` is a composite that selects both `models` and `papers` projects;
 * the homepage menu treats them as a single research bucket since both are
 * publication-track outputs.
 */
type FilterKey = "all" | "research" | Section;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "products", label: "Services" },
  { key: "research", label: "Research" },
  { key: "hackathon", label: SECTION_LABEL.hackathon },
  { key: "open-source", label: "Tools" },
];

const FILTER_KEYS = new Set<FilterKey>(FILTERS.map((f) => f.key));

const RESEARCH_SECTIONS: Section[] = ["models", "papers"];

const SECTION_COLOR: Record<Section, string> = {
  products: "text-emerald-600",
  models: "text-amber-600",
  papers: "text-violet",
  "open-source": "text-sky-600",
  hackathon: "text-orange-600",
};

function metaFor(project: Project): string | null {
  if (project.publication) return project.publication;
  const achievement = project.achievements?.[0];
  if (achievement) {
    return [achievement.event, achievement.organizer]
      .filter(Boolean)
      .join(" · ");
  }
  return null;
}

/* ─────────────── Blog Card ─────────────── */

function BlogCard({ project }: { project: Project }) {
  const { processText } = useBudouX();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detailHref = `/projects/${project.slug}/`;
  const meta = metaFor(project);
  const sectionLabel = SECTION_LABEL[project.section];
  const sectionColor = SECTION_COLOR[project.section];
  const hasLocalVideo =
    project.media.heroVideoType === "local" && !!project.media.heroVideo;

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article className="group">
      <Link href={detailHref} className="block">
        {/* Thumbnail */}
        <div
          className="relative w-full overflow-hidden rounded-xl bg-gray-100"
          style={{ aspectRatio: "16 / 9" }}
          onMouseEnter={hasLocalVideo ? handleMouseEnter : undefined}
          onMouseLeave={hasLocalVideo ? handleMouseLeave : undefined}
        >
          {hasLocalVideo ? (
            <video
              ref={videoRef}
              src={project.media.heroVideo}
              poster={project.media.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <Image
              src={project.media.poster}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              unoptimized
            />
          )}
        </div>

        {/* Text content */}
        <div className="mt-4">
          {/* Category + phase */}
          <div className="flex items-center gap-2 text-[13px] mb-2">
            <span className={`font-medium ${sectionColor}`}>
              {sectionLabel}
            </span>
            {project.sectionBadge && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-gray-500">{project.sectionBadge}</span>
              </>
            )}
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-xs">
              {PHASE_LABEL[project.phase]}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-violet transition-colors leading-tight">
            {project.name}
          </h3>

          {/* Tagline */}
          <p className="text-[15px] text-gray-600 mt-2 leading-relaxed line-clamp-2">
            {processText(project.tagline)}
          </p>

          {/* Meta (publication / event) */}
          {meta && (
            <p className="text-xs text-gray-400 mt-3">{meta}</p>
          )}
        </div>
      </Link>
    </article>
  );
}

/* ─────────────── Projects Index ─────────────── */

export function ProjectsIndex() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category");
  const active: FilterKey =
    rawCategory && FILTER_KEYS.has(rawCategory as FilterKey)
      ? (rawCategory as FilterKey)
      : "all";

  const filtered = useMemo(() => {
    if (active === "all") return PROJECTS;
    if (active === "research") {
      return PROJECTS.filter((p) =>
        RESEARCH_SECTIONS.includes(p.section as Section),
      );
    }
    return PROJECTS.filter((p) => p.section === active);
  }, [active]);

  const setFilter = (key: FilterKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") {
      params.delete("category");
    } else {
      params.set("category", key);
    }
    const qs = params.toString();
    router.replace(qs ? `/projects/?${qs}` : "/projects/", { scroll: false });
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Projects
          </h1>
          <p className="text-base text-gray-500">
            Everything we&apos;ve shipped — {PROJECTS.length} projects and
            counting.
          </p>
        </div>

        {/* Filter chips */}
        <div
          role="tablist"
          aria-label="Project categories"
          className="flex flex-wrap gap-2 mb-10 md:mb-14"
        >
          {FILTERS.map((f) => {
            const isActive = f.key === active;
            return (
              <button
                key={f.key}
                id={`projects-tab-${f.key}`}
                role="tab"
                aria-selected={isActive}
                aria-controls="projects-tabpanel"
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  isActive
                    ? "border-violet bg-violet text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-violet hover:text-violet"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Blog-style card list */}
        <div
          id="projects-tabpanel"
          role="tabpanel"
          aria-labelledby={`projects-tab-${active}`}
          className="space-y-12"
        >
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No projects in this category yet.
            </p>
          ) : (
            filtered.map((project, i) => (
              <div key={project.id}>
                <BlogCard project={project} />
                {i < filtered.length - 1 && (
                  <hr className="mt-12 border-gray-100" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
