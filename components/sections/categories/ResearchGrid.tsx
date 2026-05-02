"use client";

import Image from "next/image";
import type { Project } from "@/constants/projects";
import { CategoryCard, type BadgeTone, type CategoryCardLink } from "./CategoryCard";

interface ResearchGridProps {
  projects: readonly Project[];
}

/* ─────────────── Logo overrides ───────────────
 *
 * project.media.poster is sometimes a screenshot (e.g. a HuggingFace
 * model card) rather than a clean logo. For the Research tab we prefer
 * the actual logo — fall back to media.poster if no override is given. */
const LOGO_OVERRIDES: Record<string, string> = {
  wigtnocr: "/images/carousel/wigtnocr-logo.png",
};

function badgeFor(publication?: string): { label: string; tone: BadgeTone } | null {
  if (!publication) return null;
  const lower = publication.toLowerCase();
  if (lower.includes("accepted")) return { label: "Accepted", tone: "violet" };
  if (lower.includes("in preparation") || lower.includes("in prep"))
    return { label: "In Prep", tone: "slate" };
  if (lower.includes("submitted")) return { label: "Submitted", tone: "slate" };
  return null;
}

function venueFor(publication?: string): string | null {
  if (!publication) return null;
  return publication.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

function linksFor(project: Project): CategoryCardLink[] {
  const out: CategoryCardLink[] = [];
  if (project.links.github) out.push({ kind: "github", href: project.links.github });
  if (project.links.huggingface) out.push({ kind: "huggingface", href: project.links.huggingface });
  if (project.links.video) out.push({ kind: "video", href: project.links.video });
  return out;
}

export function ResearchGrid({ projects }: ResearchGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No research projects yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {projects.map((project) => {
        const logoSrc = LOGO_OVERRIDES[project.slug] ?? project.media.poster;
        return (
          <CategoryCard
            key={project.id}
            slug={project.slug}
            name={project.name}
            description={project.tagline}
            meta={venueFor(project.publication)}
            badge={badgeFor(project.publication)}
            links={linksFor(project)}
            visual={
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <Image
                  src={logoSrc}
                  alt={`${project.name} logo`}
                  fill
                  sizes="96px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            }
          />
        );
      })}
    </div>
  );
}
