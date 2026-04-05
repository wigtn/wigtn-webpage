"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PROJECTS,
  SECTION_LABEL,
  type Project,
  type Section,
} from "@/constants/projects";
import { ProjectRow } from "@/components/projects";

/** Filter keys accepted via `?category=` query param. */
type FilterKey = "all" | Section;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "products", label: SECTION_LABEL.products },
  { key: "models", label: SECTION_LABEL.models },
  { key: "papers", label: SECTION_LABEL.papers },
  { key: "open-source", label: SECTION_LABEL["open-source"] },
  { key: "hackathon", label: SECTION_LABEL.hackathon },
];

const FILTER_KEYS = new Set<FilterKey>(FILTERS.map((f) => f.key));

/**
 * Resolves the ProjectRow list variant for a given project. Products fall
 * back to the "open-source" variant on this index page because their primary
 * presentation (phone mockup + App Store CTA) lives on the homepage — here we
 * just want a consistent row style across everything.
 */
function variantFor(
  project: Project,
): "models" | "papers" | "open-source" | "hackathon" {
  switch (project.section) {
    case "models":
      return "models";
    case "papers":
      return "papers";
    case "hackathon":
      return "hackathon";
    case "products":
    case "open-source":
    default:
      return "open-source";
  }
}

/**
 * Builds the right-side meta string per row — publication info wins, then
 * hackathon achievement "event · organizer", else null.
 */
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

/**
 * Client half of the /projects page. Renders the filter chip bar + the
 * filtered editorial list. The active filter is driven by the `?category=`
 * URL search param so state is shareable and preserved across refreshes.
 */
export function ProjectsIndex() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category");
  const active: FilterKey =
    rawCategory && FILTER_KEYS.has(rawCategory as FilterKey)
      ? (rawCategory as FilterKey)
      : "all";

  const filtered = useMemo(
    () =>
      active === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.section === active),
    [active],
  );

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
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h1 className="text-section text-violet mb-2 tracking-wide">
            Projects
          </h1>
          <p className="text-lg md:text-xl text-foreground">
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

        {/* List */}
        <div
          id="projects-tabpanel"
          role="tabpanel"
          aria-labelledby={`projects-tab-${active}`}
        >
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No projects in this category yet.
            </p>
          ) : (
            filtered.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={i}
                variant={variantFor(project)}
                meta={metaFor(project)}
                isLast={i === filtered.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
