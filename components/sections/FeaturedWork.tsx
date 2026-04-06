"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FEATURED_PROJECTS,
  PROJECTS,
  type Project,
  type Section,
} from "@/constants/projects";
import { ProjectRow } from "@/components/projects";

/**
 * Maps a project's section to the ProjectRow list variant. Products are not
 * currently featured (they live in the Products section on the homepage) but
 * the mapping is defined defensively so the curator can flag a product as
 * featured later without breaking the render.
 */
const VARIANT_FOR_SECTION: Record<
  Section,
  "models" | "papers" | "open-source" | "hackathon"
> = {
  products: "open-source",
  models: "models",
  papers: "papers",
  "open-source": "open-source",
  hackathon: "hackathon",
};

/**
 * Builds the right-side meta string for a featured row. Prefers publication
 * info (papers / models in prep), falls back to the hackathon achievement
 * "event · organizer", and finally to null for rows without context.
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
 * Featured Work — the homepage's single curated showcase that replaces the
 * old Open Source and Hackathon sections. Shows the projects flagged with
 * `featured: true` as editorial rows, with a "See all" link that routes to
 * the full /projects index page.
 */
export function FeaturedWork() {
  if (FEATURED_PROJECTS.length === 0) return null;

  const totalCount = PROJECTS.length;

  return (
    <section id="work" className="min-h-screen snap-start py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-section text-violet mb-2 tracking-wide">
              Featured Work
            </h2>
            <p className="text-lg md:text-xl text-foreground">
              The models, papers, and wins we&apos;re proudest of.
            </p>
          </div>
          <Link
            href="/projects/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-violet transition-colors"
          >
            See all {totalCount} projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div>
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              variant={VARIANT_FOR_SECTION[project.section]}
              meta={metaFor(project)}
              isLast={i === FEATURED_PROJECTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
